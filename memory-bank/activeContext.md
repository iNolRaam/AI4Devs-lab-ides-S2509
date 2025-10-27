# Active Context — Current Focus and Decisions

Last reviewed: 2025-10-26


## Current Focus

	- add-candidate-entry-point (ACEP)
	- candidate-registration-form (CRF)
	- validation (VAL)
	- error-handling (ERR)
 All four features (ACEP, CRF, VAL, ERR) are implemented and tested.

## Feature snapshots

- successful-submission
 successful-submission (SS) is completed and documented; core delivery (ACEP, CRF, VAL, ERR) is implemented and verified by tests.
 ERR-1 (Request ID middleware) implemented and reviewed; ERR-2 (Canonical error codes/types) completed and tested; ERR-3 (Error normalizer utility) completed with unit tests.
 Backend root response vs test mismatch resolved: tests and server both use "Hola LTI!".
 Prisma migration for Candidate model exists; ensure local DB is migrated before API integration.
 Error-handling foundation is complete and tested: ERR-1 … ERR-13 are implemented with tests/docs.
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
 - Frontend decoder includes requestId and logs a single dev-only console.error with { requestId, errorId, status, code, message } for handled errors.
 - Test status: backend 31/31; frontend 20/20.

## Next steps (actionable)

1) Apply Prisma migrations locally; generate client; add seed if needed.
2) Wire frontend Candidate Form submission + error mapping; connect Dashboard entry point.
3) Error-handling (ERR) feature is complete; maintain tests and docs going forward.

## Active Decisions

- English for code/docs; TypeScript everywhere; Jest for tests.
- 12‑Factor config via env; secrets never committed (use .env locally, .env.example in repo).
- Dockerized Postgres for local dev; production deployment out of scope.

## Useful commands

- /update memory bank — refresh active context and progress
- /implement <TASK_ID> — perform one task from tasks.md
- /review complete — mark an implementation turn complete
