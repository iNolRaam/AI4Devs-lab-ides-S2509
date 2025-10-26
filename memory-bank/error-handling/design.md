# Design — Error Handling for "Add Candidate"

Status: Draft for review (awaiting /approve design)
Owner: Recruiting Platform Team
Date: 2025-10-26
Source PRD: `memory-bank/error-handling/prd.md` (seeded from LTI_App_PRD §4.6)

## Overview & goals

This design introduces a consistent, accessible, and observable error-handling experience across the Add Candidate flow. It standardizes the backend error response schema and defines the frontend error mapping/rendering so that:

- Recruiters see friendly, actionable messages for network/server issues.
- Field-level validation and business-rule errors map back to inputs.
- Non-field errors appear in a global banner/toast announced via ARIA.
- Errors are logged with correlation IDs without leaking PII.

Out of scope: offline queuing, advanced retries, and full-blown observability stacks.

## Architecture

```mermaid
flowchart LR
	subgraph FE[Frontend (React + TS)]
		F1[Candidate Form]
		F2[Error Mapper (decode API errors)]
		F3[Field Error UI]
		F4[Global Error Banner/Toast\naria-live="polite"]
		F5[API Client]
	end

	subgraph BE[Backend (Express + TS)]
		B1[Route: POST /api/candidates]
		B2[Controller/Handler]
		B3[Service / Validation]
		B4[Error Normalizer]
		B5[Central Error Middleware]
		B6[Logger (structured, no PII)]
	end

	F1 -->|submit| F5 --> B1 --> B2 --> B3
	B3 -->|throws Domain/Validation error| B4 --> B5 -->|JSON error contract| F2
	F2 -->|fieldErrors| F3
	F2 -->|non-field| F4
	B5 --> B6
```

Key points
- All thrown/rejected errors in route handlers must pass through the Error Normalizer and Central Error Middleware to emit a single standard JSON shape.
- Each incoming request receives a `requestId` (UUID) attached to `req` and included in error responses; if a reverse proxy sets `X-Request-Id`, we reuse it.
- The frontend’s API client decodes responses into a typed `AppError` that includes `fieldErrors` for quick mapping to inputs.

## Tech stack & decisions

- TypeScript everywhere to model error contracts and avoid stringly-typed checks.
- Express middleware chain:
	- `requestId` middleware: sets `req.requestId` from `X-Request-Id` or generates a UUID.
	- `errorNormalizer` utility: maps known error classes (ValidationError, DuplicateEmailError, FileTooLargeError) and unknown errors to a canonical error DTO.
	- `errorMiddleware` (terminal): sets status, serializes safe JSON, logs structured event.
- Logging: start with `console` JSON logs; optionally swap to a structured logger (e.g., pino) later without changing the error DTO.
- Frontend:
	- Create a small `decodeError(response)` helper returning a typed `AppError`.
	- Global `ErrorBanner` component with `role="alert"` and `aria-live="polite"`.
	- Field error components reuse the existing form library patterns (labels, `aria-describedby`).
- Internationalization: messages are English-only for v1; keep codes stable to enable i18n later.

## API and error contracts

### Error response DTO (server → client)

```
{
	errorId: string,            // uuid for this error occurrence
	status: number,             // HTTP status code
	code: string,               // e.g., VALIDATION_ERROR | DUPLICATE_EMAIL | FILE_TOO_LARGE | INTERNAL_ERROR
	message: string,            // safe, user-facing message
	fieldErrors?: { [field: string]: string }, // map of field -> message
	details?: {                 // non-PII details; optional
		correlationId?: string,   // mirrors errorId or upstream request id
		hint?: string
	}
}
```

Rules
- Never include PII (email, phone, address, names, file contents) in `message`, `details`, or logs.
- Prefer stable `code` values for programmatic handling; `message` is human-facing.
- Validation errors use HTTP 400; duplicate email uses 409; file too large uses 413; unknown errors use 500.

### Canonical error codes
- VALIDATION_ERROR (400)
- DUPLICATE_EMAIL (409)
- FILE_TOO_LARGE (413)
- INVALID_FILE_TYPE (415)
- INTERNAL_ERROR (500)

### Header conventions
- Request: `X-Request-Id` (optional from upstream)
- Response (on error and success): `X-Request-Id: <uuid>`

## Frontend mapping and UX

- API client checks `response.ok`; on error, parse JSON to `AppError`.
- If `fieldErrors` is present, render per-input messages and set focus to the first invalid field.
- If only a non-field error exists, show `ErrorBanner` with dismiss and optional retry.
- CV control shows inline errors for size/type violations; block submission until resolved.
- Accessibility
	- `ErrorBanner`: `role="alert"`, `aria-live="polite"`, visible text, keyboard focusable dismiss.
	- Inputs link to errors via `aria-describedby`; error summary at the top for screen readers (optional for v1 but recommended).

## Backend behavior

- Validation layer returns a `ValidationError` with a map of field → message.
- Business rule checks (e.g., email uniqueness) throw typed errors (e.g., `DuplicateEmailError`).
- Error middleware maps all errors to the DTO and logs one structured line:
	- keys: `ts`, `level`, `requestId`, `status`, `code`, `message`, `route`, `method`.
- Redact request bodies before logging (never log raw body; at most, sizes and safe metadata).

## Non-functional requirements

- Accessibility: WCAG 2.1 AA; polite announcements; sensible focus management.
- Observability: counters (success/failure), distribution of file sizes; error rate by `code`.
- Performance: negligible overhead (<1ms median per request in dev) for error handling path.
- Security & privacy: strict redaction; whitelisted log fields only; no PII in errors.

## Testing strategy (to be implemented in tasks phase)

- Backend
	- Unit: error normalizer maps known errors → DTO; unknown → INTERNAL_ERROR 500.
	- Integration: POST /api/candidates returns 400 with fieldErrors; 409 on duplicate email; 413 on oversized file.
- Frontend
	- Unit: `decodeError` produces `AppError`; `ErrorBanner` announces and is dismissible.
	- E2E-ish (component): submitting invalid form maps errors to fields and focuses first invalid.

## Acceptance mapping (PRD §4.6)

- Friendly global message on network/server failures → ErrorBanner with generic fallback.
- Field errors mapped back to inputs → `fieldErrors` + UI wiring.
- Errors logged without PII → structured logs with `requestId`, `code`, `status` only.

## Rollout & risks

- Start with candidate creation only; extend pattern to other endpoints once proven.
- Risk: accidental PII logging — mitigate with redaction and code review checks.
- Risk: inconsistent codes across services — mitigate by centralizing code constants.
