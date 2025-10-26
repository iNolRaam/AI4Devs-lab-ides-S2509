# PRD: Candidate Registration Form

## 1. Summary
Recruiters need a reliable, accessible form to add new candidates to the ATS, capturing all required personal and professional details. This feature focuses on the candidate registration form, including validation and user guidance.

## 2. Goals & Non-Goals
- Goals:
  - Display a form for entering candidate details.
  - Enforce required fields and provide clear validation feedback.
  - Offer field help/examples for Email and Phone.
  - Ensure accessibility and responsive design.
- Non-Goals:
  - CV upload (handled in a separate feature).
  - Advanced parsing or autofill of candidate data.
  - Bulk candidate import.

## 3. Personas
- Recruiter: Enters candidate data.
- System Admin: Ensures compliance (out of scope for v1).

## 4. User Stories & Acceptance Criteria
- As a recruiter, I see a form with inputs for First Name, Last Name, Email, Phone, Address, Education, and Work Experience.
  - Acceptance:
    - All required fields are present, labeled, and have placeholders.
    - Required fields are visually indicated and enforced.
    - Email and Phone fields provide help/examples.
    - Validation errors are shown inline and mapped to fields.
    - Form is accessible (WCAG 2.1 AA) and responsive.

## 5. Functional Requirements
- UI: Form with labeled inputs for all required fields.
- Validation: Client-side required fields, email format, phone format.
- Feedback: Inline errors, help text, and success confirmation.

## 6. Non-Functional Requirements
- Accessibility: WCAG 2.1 AA compliance.
- Responsiveness: Works on mobile, tablet, desktop.
- Performance: Form renders within 1s.
- Compatibility: Latest Chrome, Edge, Firefox, Safari.

## 7. Data Model
- Candidate
  - firstName (string, required)
  - lastName (string, required)
  - email (string, required, valid format)
  - phone (string, required)
  - address (string, required)
  - education (string, required)
  - workExperience (string, required)

## 8. Edge Cases
- Duplicate email: Show error and suggest viewing existing candidate.
- Large text entries: Trim/cap fields, show counters if needed.
- Intermittent connectivity: Preserve unsent form state.

## 9. Success Metrics
- % recruiters who add a candidate/week.
- Median time from form open to submit.
- Validation failure rate <5%.
- Submission success rate ≥99%.
