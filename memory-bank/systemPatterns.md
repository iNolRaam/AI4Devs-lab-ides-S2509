# System Patterns

Common design and architectural patterns used in the project.

## Architectural Style

- Client–Server split with a React SPA frontend and an Express/Node.js backend.
- Layered architecture on the server: routing (Express) → controllers/handlers → data access (Prisma) → PostgreSQL.
- RESTful API conventions (resource-oriented routes, proper HTTP verbs/status codes).

## Data and Persistence

- Repository/Data Mapper via Prisma Client for type-safe database access.
- Prisma schema and migrations as the single source of truth for data models.
- Environment-driven database configuration (12‑Factor: config via env vars).

## Cross-Cutting Concerns

- Error handling middleware for centralized error responses.
- TypeScript across frontend and backend for type safety and developer ergonomics.
- Testing with Jest (unit/integration); Supertest for HTTP assertions in the backend.

## Operational Patterns

- Dockerized PostgreSQL for local development with Docker Compose.
- `.env` and `dotenv` for runtime configuration (never commit secrets; use placeholders in examples).
- Monorepo layout with separate `frontend/` and `backend/` packages.

## Frontend Patterns

- React with Create React App (CRA) and TypeScript.
- Component-based UI, testing via React Testing Library and Jest.

## Documentation Patterns

- Memory Bank as the living source of project context: project brief → product context → system and tech context → active context → progress.

Last updated: 2025-10-26