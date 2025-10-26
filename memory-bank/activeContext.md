# Active Context — Current Focus and Decisions


Last reviewed: 2025-10-26

## Current Focus

- Memory Bank updated: Features "add-candidate-entry-point" and "candidate-registration-form" are complete and documented.
- Next: Align backend root response and tests (test expects "Hello World!" but server returns "Hola LTI!").
- Plan and implement initial API endpoints (e.g., `/api/users`).
- Ensure Prisma schema and migrations are ready for candidate data.

## Recent Changes and Observations

- Backend Express server running at port 3010; error handling middleware present.
- Jest test scaffolding in backend and frontend.
- Prisma schema includes `User` model; candidate model planned/added.
- Docker Compose provides local PostgreSQL for development.
- "Add Candidate" entry point and registration form implemented per PRD/design/tasks.

## Next Steps

- Fix backend root response/test mismatch.
- Add API route structure for users/candidates.
- Configure `.env` for DB credentials (use placeholders, never commit secrets).
- Run Prisma generate/migrate and seed if needed.
- Document API contracts and wire Swagger if desired.
- Connect frontend to backend health endpoint.

## Active Decisions

- Documentation language: English.
- TypeScript baseline for FE/BE; Jest for tests.
- Environment-driven config; secrets never committed.
- Dockerized Postgres for local dev; production deployment out of scope.
