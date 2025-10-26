# Task Breakdown: Candidate Registration Form

---
- ID: CRF-1
  Title: Add Candidate Form UI
  Description: Create a responsive form UI with labeled inputs for all required candidate fields (first name, last name, email, phone, address, education, work experience).
  Acceptance Criteria:
    - Form displays all required fields with labels and placeholders.
    - Required fields are visually indicated.
    - Responsive layout for desktop, tablet, mobile.
  Effort: M
  Files/Modules: frontend/src/components/CandidateForm.tsx, frontend/src/App.tsx

---
- ID: CRF-2
  Title: Client-side Validation
  Description: Implement client-side validation for required fields, email format, and phone format. Show inline errors mapped to fields.
  Acceptance Criteria:
    - Required fields cannot be empty.
    - Email must match valid format; phone must match example format.
    - Inline errors are shown and mapped to fields.
  Effort: M
  Files/Modules: frontend/src/components/CandidateForm.tsx

---
- ID: CRF-3
  Title: Field Help & Examples
  Description: Add help text and examples for Email and Phone fields.
  Acceptance Criteria:
    - Email and Phone fields display help text/examples.
    - Help text is accessible and visible on focus.
  Effort: S
  Files/Modules: frontend/src/components/CandidateForm.tsx

---
- ID: CRF-4
  Title: Accessibility Compliance
  Description: Ensure form meets WCAG 2.1 AA for labels, landmarks, keyboard navigation, focus order, and error announcements.
  Acceptance Criteria:
    - All form controls have accessible labels.
    - Keyboard navigation and focus order are logical.
    - Error messages are announced via ARIA.
  Effort: M
  Files/Modules: frontend/src/components/CandidateForm.tsx

---
- ID: CRF-5
  Title: API Integration
  Description: Connect form to backend API to submit candidate data. Handle success and error responses.
  Acceptance Criteria:
    - Form submits data to backend API.
    - On success, show confirmation and next actions.
    - On error, show actionable message and map field errors.
  Effort: M
  Files/Modules: frontend/src/components/CandidateForm.tsx, backend/src/index.ts

---
- ID: CRF-6
  Title: Server-side Validation
  Description: Validate candidate data on backend; return structured field-level errors.
  Acceptance Criteria:
    - Backend enforces same validation as client.
    - Field errors returned in structured format.
    - Duplicate email returns clear error.
  Effort: M
  Files/Modules: backend/src/index.ts

---
- ID: CRF-7
  Title: Data Persistence
  Description: Store candidate record in database with all submitted fields and timestamps.
  Acceptance Criteria:
    - Candidate record is created with all fields and createdAt/createdByUserId.
    - Data is retrievable via search/list.
  Effort: M
  Files/Modules: backend/prisma/schema.prisma, backend/src/index.ts

---
- ID: CRF-8
  Title: Edge Case Handling
  Description: Handle large text entries, intermittent connectivity, and preserve unsent form state.
  Acceptance Criteria:
    - Large text fields are trimmed/capped; counters shown if needed.
    - Form state is preserved on connectivity issues.
  Effort: M
  Files/Modules: frontend/src/components/CandidateForm.tsx
