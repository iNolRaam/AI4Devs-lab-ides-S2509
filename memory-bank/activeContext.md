# Active Context — Current Focus and Decisions

Last reviewed: 2025-10-26

## Current Focus

- Memory Bank synced. Three features are defined and ready for implementation:
	- add-candidate-entry-point (ACEP)
	- candidate-registration-form (CRF)
	- validation (VAL)
- successful-submission (SS) is completed and documented; focus remains on ACEP, CRF, and VAL for implementation.
- Backend root response vs test mismatch remains: tests expect "Hello World!", server returns "Hola LTI!".
- Prisma migration for Candidate model exists; ensure local DB is migrated before API integration.
- Prepare to move into PHASE 3 (Code Generation) via /implement <TASK_ID>.

## Feature snapshots

- successful-submission
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
- Prisma schema includes User and Candidate; migration folder present.
- Docker Compose provides local Postgres for development.

## Next steps (actionable)

1) Align backend greeting to make tests green (or update tests consistently).
2) Apply Prisma migrations locally; generate client; add seed if needed.
3) Implement initial candidate API: POST /api/candidates (server validation included).
4) Wire frontend form submission + error mapping; connect Dashboard entry point.
5) Execute tasks via Kiro‑Lite:
	 - /implement ACEP-1, ACEP-2, ACEP-3
	 - /implement CRF-1 … CRF-8
	 - /implement VAL-1 … VAL-5

## Active Decisions

- English for code/docs; TypeScript everywhere; Jest for tests.
- 12‑Factor config via env; secrets never committed (use .env locally, .env.example in repo).
- Dockerized Postgres for local dev; production deployment out of scope.

## Useful commands

- /update memory bank — refresh active context and progress
- /implement <TASK_ID> — perform one task from tasks.md
- /review complete — mark an implementation turn complete
