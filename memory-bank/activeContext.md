# Active Context — Current Focus and Decisions

Last reviewed: 2025-10-26


## Current Focus

	- add-candidate-entry-point (ACEP)
	- candidate-registration-form (CRF)
	- validation (VAL)
	- error-handling (ERR)
 Memory Bank synced. Four features are defined and ready for implementation:

## Feature snapshots

- successful-submission
 successful-submission (SS) is completed and documented; focus remains on ACEP, CRF, VAL, and ERR for implementation.
 ERR-1 (Request ID middleware) implemented and reviewed; ERR-2 (Canonical error codes/types) completed and tested; ERR-3 (Error normalizer utility) completed with unit tests.
 Backend root response vs test mismatch resolved: tests and server both use "Hola LTI!".
 Prisma migration for Candidate model exists; ensure local DB is migrated before API integration.
 Error-handling foundation is complete and tested: ERR-1 (Request ID middleware), ERR-2 (Canonical error codes/types), ERR-3 (Error normalizer utility), ERR-4 (central error middleware), ERR-5 (structured logging with redaction), ERR-6 (frontend AppError + decoder), ERR-7 (accessible ErrorBanner), ERR-8 (field error mapping + focus), ERR-9 (CV type/size validation), and ERR-10 (backend error DTO integration tests + route normalization) are implemented with tests.
 Prepare to move into remaining tasks via /implement <TASK_ID>.
	- Status: Completed (2025-10-26)
	- Outcome: confirmation message shown, next actions available (View Candidate, Add Another), candidate retrievable within 5s, a11y considerations applied.

- add-candidate-entry-point
	- Goal: prominent, accessible "Add Candidate" action on Dashboard → opens Candidate Form via client-side navigation.
	- Tasks: ACEP-1, ACEP-2, ACEP-3.

- candidate-registration-form
	- Goal: accessible, responsive form with required fields and guidance; integrates with backend API.
	- Tasks: CRF-1 … CRF-8 (UI, validation, API, persistence, edge cases).

- validation
	- Goal: client- and server-side validation including email and optional CV file type/size.
	- Tasks: VAL-1 … VAL-5 (client rules, file checks, server schema, mapping, tests).

## Recent Observations

- Express backend boots on :3010; Jest scaffolding present across FE/BE.
- UUID generation now uses node:crypto randomUUID to avoid test ESM issues.
- Prisma schema includes User and Candidate; migration folder present.
- Docker Compose provides local Postgres for development.
- Candidate POST now throws typed errors (ValidationError, DuplicateEmailError); central error middleware returns standardized DTO with X-Request-Id.
- Multer LIMIT_FILE_SIZE is mapped to FILE_TOO_LARGE (413); invalid file type tagged as INVALID_FILE_TYPE in fileFilter.

## Next steps (actionable)

1) Apply Prisma migrations locally; generate client; add seed if needed.
2) Wire frontend Candidate Form submission + error mapping; connect Dashboard entry point.
3) Execute remaining ERR tasks via Kiro‑Lite:
	- /implement ERR-11 (propagate X-Request-Id to frontend logs/telemetry)
	- /implement ERR-13 (smoke test UI happy + error)
	- /implement ERR-12 (docs and developer guide)

## Active Decisions

- English for code/docs; TypeScript everywhere; Jest for tests.
- 12‑Factor config via env; secrets never committed (use .env locally, .env.example in repo).
- Dockerized Postgres for local dev; production deployment out of scope.

## Useful commands

- /update memory bank — refresh active context and progress
- /implement <TASK_ID> — perform one task from tasks.md
- /review complete — mark an implementation turn complete
