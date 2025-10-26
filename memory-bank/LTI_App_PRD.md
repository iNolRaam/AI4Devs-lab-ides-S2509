# Product Requirements Document (PRD)

Title: Add Candidate to ATS
Version: 1.0
Owner: Recruiting Platform Team
Date: 2025-10-26

## 1. Summary
Recruiters need a simple, reliable way to add new candidates into the ATS so they can manage personal data and hiring workflows efficiently. This PRD defines the first release of “Add Candidate” with a validated form and CV upload.

## 2. Goals & Non‑Goals
- Goals
  - Enable recruiters to add a candidate from the main dashboard.
  - Capture core candidate data with client- and server-side validation.
  - Allow CV upload (PDF or DOCX, ≤ 5 MB) and persist candidate record.
  - Provide clear success and error feedback.
  - Ensure the feature is responsive, accessible, and secure for PII.
- Non‑Goals
  - Candidate portal/self-registration.
  - Advanced parsing of CV files or automatic profile enrichment.
  - Bulk import of candidates.

## 3. Personas
- Recruiter (primary): Creates and manages candidate records.
- System Admin (secondary): Ensures access control and data policies (configuration out of scope for v1).

## 4. User Stories & Acceptance Criteria

### 4.1 Add Candidate entry point
As a recruiter, I can clearly find an action on my dashboard to add a candidate.
- Acceptance Criteria
  - A primary button or link labeled “Add Candidate” is visible on the recruiter dashboard.
  - The control meets contrast and focus states per WCAG 2.1 AA.
  - Clicking it opens the candidate creation form without a full page reload.

### 4.2 Candidate registration form
As a recruiter, I can enter the required candidate details.
- Required fields: First Name, Last Name, Email, Phone, Address, Education, Work Experience
- Acceptance Criteria
  - The form displays inputs for each required field with labels and placeholders.
  - Required fields are visually indicated and enforced.
  - Field help and examples are available for Email and Phone.

### 4.3 Validation
As a recruiter, I receive immediate validation feedback before submit.
- Acceptance Criteria
  - Client-side: Required fields cannot be empty.
  - Client-side: Email must match a valid email format.
  - Client-side: CV file (if provided) must be PDF or DOCX and ≤ 5 MB; invalid files are rejected with a clear message.
  - Server-side: Same validations are enforced; server returns field-level errors in a structured format.

### 4.4 CV upload
As a recruiter, I can attach a candidate CV for future reference.
- Acceptance Criteria
  - Allowed types: application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document (DOCX).
  - Max file size: 5 MB; larger files show a non-blocking error and prevent submission.
  - Upload uses secure transport; file is stored and linked to the candidate record.

### 4.5 Successful submission
As a recruiter, I see confirmation that the candidate was added.
- Acceptance Criteria
  - On success, a confirmation message is displayed: “Candidate added successfully.”
  - The UX offers next actions: “View Candidate” and “Add Another Candidate.”
  - The new candidate is retrievable via search/list within 5 seconds.

### 4.6 Error handling
As a recruiter, I’m informed if something goes wrong.
- Acceptance Criteria
  - Network/server errors show a friendly, actionable message (e.g., “We couldn’t save the candidate. Please try again.”).
  - Field errors are mapped back to inputs; non-field errors appear in a toast/banner.
  - Errors are logged for observability without leaking PII.

### 4.7 Accessibility & responsiveness
As a recruiter, I can use the feature across devices and with assistive tech.
- Acceptance Criteria
  - Complies with WCAG 2.1 AA for forms: labels, landmarks, keyboard navigation, focus order, and error announcements via ARIA.
  - Responsive layouts support ≥320px width and common desktop breakpoints.
  - Works on latest Chrome, Edge, Firefox, and Safari (last 2 versions).

## 5. Functional Requirements
- UI/Navigation
  - Add Candidate entry point on recruiter dashboard.
  - Candidate form page/modal with required fields and CV upload control.
- Validation
  - Client-side: HTML5 + custom logic for email/file rules.
  - Server-side: Input schema validation; consistent error codes and messages.
- File Handling
  - Accept PDF/DOCX only; enforce 5 MB limit pre- and post-upload.
  - Store file securely and associate a URL/reference with the candidate record.
- Data Persistence
  - Create a candidate record with all submitted fields and CV link; record timestamps and creator user id.
- Feedback
  - Inline field errors, global error banner/toast, and success confirmation.

## 6. Non‑Functional Requirements
- Security & Privacy
  - Encrypt in transit (HTTPS); protect upload endpoints from malicious files by MIME/extension checks.
  - PII handling: restrict access to authorized recruiter roles; follow least privilege.
  - Audit trail: record who created the candidate and when.
- Performance & Reliability
  - Form renders within 1s on broadband; submission completes in ≤2s p95 under normal load.
  - File uploads up to 5 MB handled within reasonable timeouts.
- Accessibility
  - WCAG 2.1 AA compliance for forms and notifications.
- Compatibility
  - Modern browsers (last 2 versions) and responsive design for mobile/tablet/desktop.
- Observability
  - Log request outcomes and validation failures; basic metrics: submissions, failure rates, upload size distribution.

## 7. Data Model (v1)
- Candidate
  - id (UUID)
  - firstName (string, required)
  - lastName (string, required)
  - email (string, required, unique, valid format)
  - phone (string, required)
  - address (string, required)
  - education (string, required)
  - workExperience (string, required)
  - cvUrl (string, optional) — storage reference to CV
  - createdAt (datetime)
  - createdByUserId (string/UUID)

## 8. UX Content
- Primary action: “Add Candidate”
- Success: “Candidate added successfully.”
- Generic error: “We couldn’t save the candidate. Please try again.”
- File validation: “Upload a PDF or DOCX up to 5 MB.”

## 9. Edge Cases
- Duplicate email: surface a clear error suggesting to view existing candidate.
- Empty uploads or canceled uploads: do not block form editing; show status.
- Intermittent connectivity: preserve unsent form state where possible.
- Large text entries: trim and cap fields sensibly; show character counters if needed.

## 10. Analytics & Success Metrics
- Activation: % of recruiters who add at least one candidate/week.
- Efficiency: Median time from form open to successful submit.
- Quality: Client/server validation failure rate (<5%).
- Reliability: Submission success rate (≥99%).

## 11. Dependencies & Risks
- Dependencies
  - AuthN/Z for recruiter role.
  - Persistent storage (database) and file storage for CVs.
- Risks
  - PII exposure if access control misconfigured.
  - Browser/file API inconsistencies for MIME detection — mitigate via server validation.

## 12. Release Plan
- v1: Single candidate add with validation and CV upload (this PRD).
- v1.x (Future)
  - Autocomplete for Education and Work Experience (using existing system data).
  - Bulk import (CSV) with validation.
  - CV parsing to prefill fields.

## 13. Open Questions
- Should email uniqueness be enforced system-wide at creation time?
- Preferred storage for CVs (object storage vs. database BLOB)?
- Retention policy for CV files and candidate PII?