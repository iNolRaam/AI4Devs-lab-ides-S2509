# Active Context — Current Focus and Decisions

Last reviewed: 2025-10-26

## Current Focus

- Establish and update Memory Bank documentation in English (this task).
- Align backend root response and tests (test expects "Hello World!" but server returns "Hola LTI!").
- Verify Prisma schema and plan initial migrations for the `User` model.
- Ensure local PostgreSQL via Docker Compose is configured through environment variables.

## Recent Changes and Observations

- Backend Express server is running at port 3010 with basic error handling middleware.
- Jest test scaffolding exists in both backend and frontend.
- Prisma schema includes a `User` model; Prisma tooling is configured in npm scripts.
- Docker Compose provides a local PostgreSQL service for development.

## Next Steps

- Decide on the canonical greeting/health response and update either tests or implementation so they match.
- Add initial API route structure beyond the root endpoint (e.g., `/api/users`).
- Configure `.env` for database credentials (use placeholders in repo; do not commit secrets) and ensure `DATABASE_URL` is set.
- Run Prisma generate/migrate and add a seed path if needed.
- Document API contracts (OpenAPI hints present via dependencies) and wire Swagger if desired.
- Connect frontend to backend with a simple fetch call to the health endpoint.

## Active Decisions

- Documentation language is English across Memory Bank files.
- TypeScript is the baseline for both FE and BE; tests use Jest.
- Environment-driven configuration; secrets never committed.
- Keep dockerized Postgres for local dev; production deployment concerns are out of current scope.
