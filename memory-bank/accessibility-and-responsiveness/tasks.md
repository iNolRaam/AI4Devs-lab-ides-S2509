# Task Breakdown: Accessibility & Responsiveness

Phase: Task Breakdown (awaiting /approve tasks)
Owner: Recruiting Platform Team
Date: 2025-10-26

---
ID: A11Y-1
Title: Landmarks and page structure
Description: Ensure the Add Candidate page has a `<main>` landmark, a single top-level heading (h1), and logical sectioning for the form and success panel.
Acceptance Criteria:
- Form is wrapped in `<main>` with a descriptive `<h1>`
- Success panel rendered within a semantic region (e.g., `<section>` with heading)
- No duplicate h1s on the page
Effort: S
Status: Not started
Files/Modules: frontend/src/App.tsx, frontend/src/components/CandidateForm.tsx, frontend/src/components/Dashboard.tsx

---
ID: A11Y-2
Title: Form labeling and required semantics
Description: Provide explicit labels for all inputs; indicate required fields accessibly using native `required` and/or `aria-required`.
Acceptance Criteria:
- Each input has an associated `<label for>` or `aria-labelledby`
- Required fields expose programmatic required state
- Email/Phone help text provided and linked via `aria-describedby`
Effort: M
Status: Not started
Files/Modules: frontend/src/components/CandidateForm.tsx

---
ID: A11Y-3
Title: Inline field errors with aria-describedby
Description: Tie validation messages to inputs via `aria-describedby`; render concise inline error text.
Acceptance Criteria:
- On error, each invalid input references its error element via `aria-describedby`
- Errors update dynamically without duplicate announcements
Effort: M
Status: Not started
Files/Modules: frontend/src/components/CandidateForm.tsx, frontend/src/components/ErrorBanner.tsx

---
ID: A11Y-4
Title: Global error banner announcements
Description: Ensure non-field errors use an ErrorBanner with `role="alert"` and appropriate `aria-live`.
Acceptance Criteria:
- ErrorBanner announces on appearance in screen readers
- Banner is reachable by keyboard and contains descriptive heading/text
Effort: S
Status: Not started
Files/Modules: frontend/src/components/ErrorBanner.tsx, frontend/src/components/CandidateForm.tsx

---
ID: A11Y-5
Title: Focus management for submit flows
Description: Manage focus transitions for success and failure paths.
Acceptance Criteria:
- On load/open, focus moves to the page h1 (or form legend) to announce context
- On submit error, focus moves to the first invalid field (preferred) or the error banner
- On submit success, focus moves to the success panel heading
Effort: M
Status: Not started
Files/Modules: frontend/src/components/CandidateForm.tsx

---
ID: A11Y-6
Title: File input name and constraints messaging
Description: Ensure the CV file input has an accessible name and nearby constraint text linked via `aria-describedby` (PDF/DOCX ≤ 5 MB).
Acceptance Criteria:
- File input is labeled and focusable; constraint text is read on focus
- Invalid file type/size errors are announced and tied to the input
Effort: S
Status: Not started
Files/Modules: frontend/src/components/CandidateForm.tsx

---
ID: A11Y-7
Title: Responsive layout and touch target sizing
Description: Ensure the form is usable at ≥320px width without horizontal scroll; verify target sizes where applicable.
Acceptance Criteria:
- Single-column layout works at 320px/375px widths; no horizontal scroll for core content
- Controls are usable with touch (~44×44 px) and keyboard
Effort: M
Status: Not started
Files/Modules: frontend/src/App.css, frontend/src/index.css, frontend/src/components/CandidateForm.tsx

---
ID: A11Y-8
Title: Success panel with polite live region
Description: Announce success via `aria-live="polite"` and provide a semantic heading; move focus on success.
Acceptance Criteria:
- Success message is announced; heading is focusable target for post-submit success
- Next actions are keyboard reachable and have visible focus
Effort: S
Status: Not started
Files/Modules: frontend/src/components/CandidateForm.tsx, frontend/src/components/Dashboard.tsx

---
ID: A11Y-9
Title: Keyboard nav and visible focus styles
Description: Verify tab order, ensure no outline is removed, and focus is clearly visible on all interactive elements.
Acceptance Criteria:
- No keyboard traps; Tab/Shift+Tab cycles logically
- Focus styles meet contrast guidance and are visible on buttons/links/inputs
Effort: S
Status: Not started
Files/Modules: frontend/src/App.css, frontend/src/index.css, relevant components

---
ID: A11Y-10
Title: Automated a11y tests (jest-axe)
Description: Add automated accessibility checks for key components (CandidateForm, ErrorBanner, Success Panel) using `jest-axe`.
Acceptance Criteria:
- Tests fail on common violations; includes at least one negative test and fixes
- Run as part of frontend test suite locally
Effort: M
Status: Not started
Files/Modules: frontend/package.json, frontend/src/components/*.test.tsx, frontend/src/tests/*.test.ts

---
ID: A11Y-11
Title: E2E behavioral tests for focus/announcements
Description: Add RTL tests to validate focus movement on error/success and aria-live announcements wiring.
Acceptance Criteria:
- Tests assert focus target after submit error and after success
- Tests assert error banner and inline error existence and relationships
Effort: M
Status: Not started
Files/Modules: frontend/src/components/CandidateForm.test.tsx, frontend/src/components/ErrorBanner.test.tsx, frontend/src/components/Dashboard.test.tsx

---
ID: A11Y-12
Title: Documentation & Memory Bank updates
Description: Capture implemented a11y patterns in `copilot-rules.md`; update `activeContext.md` and feature docs.
Acceptance Criteria:
- `copilot-rules.md` gains a11y conventions adopted
- `activeContext.md` and feature files reflect completion status and any follow-ups
Effort: S
Status: Not started
Files/Modules: memory-bank/copilot-rules.md, memory-bank/activeContext.md, memory-bank/accessibility-and-responsiveness/*

---
Notes:
- No backend schema changes anticipated; error middleware already normalizes responses and returns `X-Request-Id`.
- If `jest-axe` is added, pin versions and keep test surface minimal to avoid flakes.
