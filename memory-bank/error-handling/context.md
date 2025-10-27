# Context — Error Handling Feature

Scope: Implement the error experience for Add Candidate across frontend and backend.

Authoritative PRD reference: `memory-bank/LTI_App_PRD.md`, Section 4.6 Error handling

Excerpt (acceptance criteria):

Related features: add-candidate-entry-point, candidate-registration-form, validation, successful-submission.

Notes:

## Error Handling Implementation Summary

This feature implements a comprehensive error handling strategy for the Add Candidate workflow:

- **Backend:**
	- Errors are normalized using `errorNormalizer.ts` for consistent codes and messages.
	- The `requestId` middleware tags each request for traceability and secure logging.
	- Candidate persistence errors are captured and surfaced with actionable messages.

- **Frontend:**
	- Network/server errors display friendly, actionable messages to users.
	- Field errors are mapped to inputs; non-field errors show in a toast/banner.
	- Accessibility is maintained via aria-live regions and focus management.

- **Logging:**
	- Errors are logged for observability, using correlation IDs and avoiding PII.

Reference: PRD Section 4.6, related modules in backend/src and frontend/src.
