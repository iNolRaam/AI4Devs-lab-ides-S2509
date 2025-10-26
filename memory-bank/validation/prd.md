# PRD: Candidate Validation

## Summary
This feature ensures robust client- and server-side validation for candidate data entry, including field requirements, email format, and CV file type/size. Validation feedback is immediate and actionable, supporting a reliable candidate creation workflow.

## Goals
- Enforce required fields and valid formats for candidate registration.
- Validate CV uploads for type (PDF/DOCX) and size (≤ 5 MB).
- Provide clear, structured error feedback for all validation failures.
- Support both client-side and server-side validation.

## Acceptance Criteria
- Required fields cannot be empty (client/server).
- Email must match a valid format (client/server).
- CV file (if provided) must be PDF or DOCX and ≤ 5 MB; invalid files are rejected with a clear message (client/server).
- Server returns field-level errors in a structured format.
- Validation errors are mapped to form fields; non-field errors appear in a toast/banner.
- Validation logic is covered by automated tests.
