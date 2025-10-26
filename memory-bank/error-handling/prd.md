# PRD — Error Handling for "Add Candidate"

Version: 0.1 (Draft)
Owner: Recruiting Platform Team
Date: 2025-10-26
Related: memory-bank/LTI_App_PRD.md (Section 4.6 Error handling)

## 1. Summary
Deliver a consistent, friendly, and accessible error-handling experience across the Add Candidate flow. Ensure network/server errors show actionable messages, field-level errors map back to inputs, non-field errors surface in a toast/banner, and all errors are observable without leaking PII.

## 2. Goals & Non-Goals
- Goals
  - Standardize backend error response schema for the candidate APIs.
  - Map server field errors to form inputs; surface non-field errors via banner/toast.
  - Provide clear, human-safe messages and log contextual details without PII.
  - Ensure accessibility (ARIA live announcements) and responsiveness.
- Non-Goals
  - Full offline capability or advanced retry/queue mechanisms.
  - Complex SLO dashboards; basic logging/metrics only for v1.

## 3. Personas
- Recruiter: Submits the form, needs clear guidance on how to correct issues.
- Engineer/Support: Needs correlation IDs and structured logs to debug incidents.

## 4. User Stories & Acceptance Criteria (seeded from LTI_App_PRD §4.6)
- As a recruiter, I’m informed if something goes wrong.
  - Network/server errors show a friendly, actionable message (e.g., “We couldn’t save the candidate. Please try again.”).
  - Field errors are mapped back to inputs; non-field errors appear in a toast/banner.
  - Errors are logged for observability without leaking PII.

Additional acceptance for this feature slice:
- Duplicate email scenario surfaces a specific message and suggests viewing the existing candidate.
- File too large/invalid type errors are shown inline for the CV control and block submission.
- Screen reader users hear error summaries and can navigate to errored fields.

## 5. Functional Requirements
- Frontend
  - Global error banner/toast component with ARIA live region (polite) for non-field errors.
  - Field error rendering tied to server `fieldErrors` keys; focus management on submit failures.
  - Retry and dismiss actions where sensible; banner does not obstruct form editing.
- Backend
  - Central error middleware emits a consistent error payload.
  - Validation errors provide `fieldErrors`; business errors expose a safe `message` and `code`.
  - All errors include a `requestId`/`errorId` for correlation; sensitive data is never logged.

## 6. Error Contract (Proposed)
```
{
  "errorId": "uuid",
  "status": 400,
  "code": "VALIDATION_ERROR" | "DUPLICATE_EMAIL" | "FILE_TOO_LARGE" | "INTERNAL_ERROR" | string,
  "message": "Safe, user-friendly message",
  "fieldErrors": { "email"?: "Email already exists", "cv"?: "Upload a PDF or DOCX up to 5 MB." },
  "details": { "correlationId"?: "uuid", "hint"?: string } // non-PII only
}
```

## 7. Non‑Functional Requirements
- Accessibility: WCAG 2.1 AA; aria-live announcements; proper labels and descriptions for errors.
- Observability: Log `errorId`, `code`, `status`, and timing; exclude PII. Basic counters: submissions, failure rates, upload size distribution.
- Performance: Error processing adds negligible overhead; no blocking UI spinners for banner/toast.

## 8. Edge Cases
- Intermittent network: preserve inputs; banner shows retry guidance.
- Multiple field errors: show all at once; assistive tech announces a summary.
- Unknown server error: fall back to generic message and capture `errorId` for support.

## 9. Open Questions
- Preferred list of canonical error codes (beyond the proposed set)?
- Should we standardize a `requestId` header/prop from a gateway for correlation?
- Where should duplicate email resolution link to (search vs. candidate view)?

## 10. Success Metrics
- <5% client/server validation failure rate (excluding expected validation catch).
- ≥99% submission success on valid inputs.
- Error banner/toast interaction rate (dismiss/retry) tracked for usability insights.

## 11. Dependencies & Risks
- Depends on existing validation and submission flows (ACEP/CRF/VAL).
- Risk of PII leakage if logs are not carefully scrubbed—mitigate by redaction and whitelisting.

## 12. Approval
- Status: Draft — awaiting feedback and /approve prd.
