# Task Breakdown: Candidate Validation

---
ID: VAL-1
Title: Implement Client-Side Field Validation
Description: Add client-side validation for required fields and email format in the candidate registration form. Show inline errors mapped to fields.
Acceptance Criteria:
- Required fields cannot be empty
- Email must match valid format
- Errors are shown inline and mapped to fields
Effort: M
Status: Completed
Files/Modules: frontend/src/components/CandidateForm.tsx

---
ID: VAL-2
Title: Validate CV File Type and Size (Client)
Description: Validate CV file type (PDF/DOCX) and size (≤ 5 MB) before upload. Show clear error messages for invalid files.
Acceptance Criteria:
- Only PDF/DOCX files ≤ 5 MB are accepted
- Invalid files are rejected with a clear message
Effort: S
Status: Completed
Files/Modules: frontend/src/components/CandidateForm.tsx

---
ID: VAL-3
Title: Implement Server-Side Validation
Description: Add server-side validation for all candidate fields and CV file. Return structured field-level errors for any validation failures.
Acceptance Criteria:
- Server enforces same validation as client
- Field errors returned in structured format
Effort: M
Status: Completed
Files/Modules: backend/src/index.ts

---
ID: VAL-4
Title: Map Server Errors to UI
Description: Map server-side validation errors to form fields and display non-field errors in a toast/banner.
Acceptance Criteria:
- Field errors are mapped to inputs
- Non-field errors appear in toast/banner
Effort: S
Status: Completed
Files/Modules: frontend/src/components/CandidateForm.tsx

---
ID: VAL-5
Title: Automated Tests for Validation Logic
Description: Write unit and integration tests to cover all validation logic (client and server).
Acceptance Criteria:
- Tests cover required fields, email format, CV file type/size
- Tests verify error mapping and feedback
Effort: M
Status: Completed
Files/Modules: frontend/src/components/CandidateForm.test.tsx, backend/src/tests/
