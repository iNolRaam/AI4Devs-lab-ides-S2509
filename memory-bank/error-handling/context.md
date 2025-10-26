# Context — Error Handling Feature

Scope: Implement the error experience for Add Candidate across frontend and backend.

Authoritative PRD reference: `memory-bank/LTI_App_PRD.md`, Section 4.6 Error handling

Excerpt (acceptance criteria):
- Network/server errors show a friendly, actionable message (e.g., “We couldn’t save the candidate. Please try again.”).
- Field errors are mapped back to inputs; non-field errors appear in a toast/banner.
- Errors are logged for observability without leaking PII.

Related features: add-candidate-entry-point, candidate-registration-form, validation, successful-submission.

Notes:
- Maintain accessibility via aria-live regions and focus management.
- Avoid logging PII; prefer correlation IDs and codes.
- ERR-1 (requestId middleware) implemented and reviewed; next step is ERR-2 (canonical error codes/types).
