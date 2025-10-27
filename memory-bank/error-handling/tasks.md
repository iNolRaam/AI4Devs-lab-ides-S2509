# Task Breakdown: Error Handling for "Add Candidate"

Phase: Task Breakdown (awaiting /approve tasks)
Owner: Recruiting Platform Team
Date: 2025-10-26

---
ID: ERR-1
Title: Request ID Middleware
Description: Attach a unique requestId (reuse X-Request-Id when present) to each backend request and response headers for correlation.
Acceptance Criteria:
- All responses include `X-Request-Id` header
- `req` exposes `requestId` for downstream usage
- Covered by unit/integration tests
Effort: S
Status: Completed
Files/Modules: backend/src/index.ts, backend/src/middleware/requestId.ts, backend/src/tests/

---
ID: ERR-2
Title: Canonical Error Codes and Types
Description: Define stable error code constants and typed error classes (ValidationError, DuplicateEmailError, FileTooLargeError, InvalidFileTypeError, InternalError fallback).
Acceptance Criteria:
- Exported codes: VALIDATION_ERROR, DUPLICATE_EMAIL, FILE_TOO_LARGE, INVALID_FILE_TYPE, INTERNAL_ERROR
- Typed error classes with status mapping
- Unit tests for mapping
Effort: S
Status: Completed
Files/Modules: backend/src/errors.ts, backend/src/tests/

---
ID: ERR-3
Title: Error Normalizer Utility
Description: Implement a pure function that converts thrown errors into the standard DTO shape (errorId, status, code, message, fieldErrors?, details?).
Acceptance Criteria:
- Known errors map to expected codes/status
- Unknown errors map to INTERNAL_ERROR 500 with generic message
- No PII included in output
Effort: M
Status: Completed
Files/Modules: backend/src/utils/errorNormalizer.ts, backend/src/tests/errorNormalizer.test.ts

---
ID: ERR-4
Title: Central Error Middleware
Description: Add terminal Express error-handling middleware that uses the normalizer, sets status, writes JSON error body, emits structured log, and sets `X-Request-Id`.
Acceptance Criteria:
- Middleware responds with the DTO for all thrown errors
- Logs a single structured line per error (console JSON ok)
- Integration tests verify status/body/headers
Effort: M
Status: Completed
Files/Modules: backend/src/middleware/error.ts, backend/src/index.ts, backend/src/tests/

---
ID: ERR-5
Title: Structured Logging With Redaction
Description: Emit structured logs that exclude PII; include requestId, code, status, route, method. Redact request body.
Acceptance Criteria:
- Logs contain only whitelisted keys
- No PII present (names, email, phone, address, file content)
- Unit test asserts redaction behavior
Effort: S
Status: Complete
Files/Modules: backend/src/utils/logging.ts, backend/src/middleware/error.ts, backend/src/tests/

---
ID: ERR-6
Title: Frontend AppError Type and Decoder
Description: Create a typed `AppError` and a `decodeError(Response)` helper to parse server error DTOs (and handle network failures) into a consistent shape.
Acceptance Criteria:
- Type definitions for AppError and FieldErrors
- Network failures produce a generic AppError with code INTERNAL_ERROR
- Unit tests cover decode paths
Effort: S
Status: Completed
Files/Modules: frontend/src/api/client.ts, frontend/src/tests/api.client.test.ts

---
ID: ERR-7
Title: Global Error Banner/Toast Component (Accessible)
Description: Implement an `ErrorBanner` with role="alert" and aria-live="polite" to display non-field errors with dismiss and optional retry.
Acceptance Criteria:
- Renders visible message; keyboard accessible dismiss
- Announces via screen readers
- Unit tests for rendering and dismissal
Effort: M
Status: Completed
Files/Modules: frontend/src/components/ErrorBanner.tsx, frontend/src/tests/ErrorBanner.test.tsx

---
ID: ERR-8
Title: Map Field Errors to Candidate Form Inputs
Description: Wire server `fieldErrors` and client validation to show inline messages, and move focus to the first invalid input on submit failure.
Acceptance Criteria:
- Inline error text linked via aria-describedby
- Focus management to first invalid control
- Works alongside existing client-side checks
Effort: M
Status: Not started
Files/Modules: frontend/src/components/CandidateForm.tsx, frontend/src/components/CandidateForm.test.tsx

---
ID: ERR-9
Title: CV Control Error Messages (Type/Size)
Description: Ensure invalid file type/size produce clear inline errors at the CV input; prevent submission until fixed.
Acceptance Criteria:
- Shows specific messages for size > 5MB and invalid MIME
- Blocks submit when invalid
- Tests cover both conditions
Effort: S
Status: Not started
Files/Modules: frontend/src/components/CandidateForm.tsx, frontend/src/components/CandidateForm.test.tsx

---
ID: ERR-10
Title: Backend Integration Tests for Candidate POST Errors
Description: Add Supertest-based tests verifying DTO for 400 validation, 409 duplicate email, 413 file too large, and 500 fallback.
Acceptance Criteria:
- Each scenario returns correct status/code/body and X-Request-Id
- No PII in body
- Tests live under backend/src/tests/
Effort: M
Status: Not started
Files/Modules: backend/src/tests/candidates.error.test.ts

---
ID: ERR-11
Title: Propagate X-Request-Id to Frontend Logs/Telemetry
Description: Read `X-Request-Id` from error responses and include it in client console logs (dev) and any telemetry hooks.
Acceptance Criteria:
- AppError includes `requestId` when present
- Console log shows requestId on handled errors in dev
- Unit test ensures propagation
Effort: S
Status: Not started
Files/Modules: frontend/src/api/client.ts, frontend/src/tests/

---
ID: ERR-12
Title: Documentation & Developer Guide
Description: Document the error contract, logger behavior, and UI patterns. Add examples and do/don'ts (no PII).
Acceptance Criteria:
- README updates or a dedicated docs section
- Copy-paste examples for backend errors and frontend mapping
- Referenced from Memory Bank
Effort: S
Status: Not started
Files/Modules: README.md, memory-bank/error-handling/design.md

---
ID: ERR-13
Title: Smoke Test the Full Flow (Happy + Error)
Description: Minimal end-to-end-ish test ensuring an invalid submit shows errors and a network/server failure triggers the banner.
Acceptance Criteria:
- Component/integration test covers both pathways
- Assertions on focus management and aria-live behavior
Effort: M
Status: Not started
Files/Modules: frontend/src/components/CandidateForm.test.tsx

---
Notes:
- Do not implement code until /implement <TASK_ID> is issued.
- Sequencing suggestion: ERR-1 → ERR-2 → ERR-3 → ERR-4 → ERR-5 (backend foundation), then ERR-6 → ERR-7 → ERR-8/ERR-9 → ERR-11 → ERR-10 → ERR-13 → ERR-12.
