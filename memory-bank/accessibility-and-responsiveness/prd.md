# PRD — Accessibility & Responsiveness for "Add Candidate"

Version: 1.0
Owner: Recruiting Platform Team
Date: 2025-10-26
Status: DRAFT (Phase 0 — PRD Intake)

## 1. Summary
Ensure the Add Candidate flow (dashboard entry point, candidate form, validation, success/error feedback) is accessible (WCAG 2.1 AA) and responsive across devices. This PRD scopes the a11y and responsive requirements specifically, so the feature is usable via keyboard and assistive tech and adapts from ≥320px mobile widths to desktop breakpoints.

## 2. Goals & Non‑Goals
- Goals
  - Achieve WCAG 2.1 AA compliance for the Add Candidate experience (entry point, form, feedback).
  - Provide robust keyboard navigation, focus management, labels, landmarks, and ARIA error announcements.
  - Responsive layouts at ≥320px and common desktop breakpoints without loss of function/content.
  - Verify support on latest Chrome, Edge, Firefox, Safari (last 2 versions).
- Non‑Goals
  - Global accessibility retrofit of entire product outside the Add Candidate flow.
  - Visual redesign beyond what’s required to meet a11y and responsiveness.

## 3. Personas
- Recruiter using keyboard and/or screen reader.
- QA/Accessibility reviewer validating WCAG conformance.

## 4. User Stories & Acceptance Criteria (from LTI PRD §4.7)
As a recruiter, I can use the feature across devices and with assistive tech.
- Acceptance Criteria
  - Complies with WCAG 2.1 AA for forms: labels, landmarks, keyboard navigation, focus order, and error announcements via ARIA.
  - Responsive layouts support ≥320px width and common desktop breakpoints.
  - Works on latest Chrome, Edge, Firefox, and Safari (last 2 versions).

## 5. Functional Requirements (scoped to a11y/responsiveness)
- Entry Point
  - Primary “Add Candidate” control is keyboard focusable, has visible focus, correct role/name, and sufficient contrast.
- Form
  - Semantic labels (label/for or aria-labelledby), required fields indicated accessibly.
  - Inline errors associated with inputs via aria-describedby; errors announced via aria-live.
  - Logical tab order; initial focus managed when form opens; focus moved to confirmation on success.
  - File input for CV has accessible name and constraints messaging.
- Feedback
  - Success message in a semantic container and announced via aria-live="polite".
  - Error banner/toast is reachable, dismissible (if dismissable), and announced.
- Responsiveness
  - Layout adapts for small screens (≥320px) without horizontal scroll for core content.
  - Controls are usable with touch (min target size guidance) and keyboard.

## 6. Non‑Functional Requirements
- Accessibility
  - WCAG 2.1 AA conformance evidence: test checklist + automated checks (axe) + manual screen reader pass.
- Compatibility
  - Modern browsers (last 2 versions). Mobile form factors validated via responsive mode.
- Observability
  - Error logging does not leak PII; requestId correlation preserved.

## 7. Dependencies & Risks
- Dependencies
  - Existing Add Candidate UI/validation/error-handling foundations.
  - Testing tools: React Testing Library, jest-axe (or axe-core), screen reader manual checks.
- Risks
  - Hidden a11y regressions due to visual-only tweaks.
  - Flaky automated a11y checks; mitigate with deterministic rendering and focused test IDs.

## 8. Out of Scope
- Global theming/contrast changes beyond minimum needed to pass AA for new/modified controls.
- Non-Add-Candidate screens.

## 9. Open Questions
- Should we add an automated a11y gate (jest-axe) to CI for this flow?
- Do we need a dedicated skip link or is landmark structure sufficient for this page?

---

Provide clarifications or edits, then approve with `/approve prd` to proceed to the Design Doc (Phase 1).
