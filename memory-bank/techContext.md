# Tech Context — Stack, Setup, and Constraints

## Stack Overview

- Frontend: React (Create React App), TypeScript, React Testing Library, Jest.
- Backend: Node.js, Express, TypeScript, Jest, Supertest.
- ORM: Prisma 5 (type-safe DB client and migrations).
- Database: PostgreSQL (Dockerized for local development).
- Tooling: ESLint, Prettier, dotenv, ts-node-dev.

## Repository Layout

- `frontend/`: CRA app with TypeScript; `src/` holds UI code and tests; `public/` static assets; `build/` production bundle.
- `backend/`: Express app in TypeScript; `src/` server code and tests; `prisma/` for `schema.prisma`; compiled output emitted to `dist/`.
- `docker-compose.yml`: Local PostgreSQL service for development.
- `memory-bank/`: Living documentation for project context and rules.

## Key Ports and Endpoints

- Frontend dev server: http://localhost:3000
- Backend server: http://localhost:3010 (root/health endpoint exists)
- PostgreSQL: localhost:5432 (credentials configured via env)

## Configuration

- Environment variables provided via `.env` files and `dotenv` at runtime.
- Prisma uses `DATABASE_URL` for connection; schema is in `backend/prisma/schema.prisma`.
- Do not commit secrets. Provide safe placeholders with `.env.example` when needed.

## Development Notes (derived from repo; not step-by-step)

- Install dependencies separately in `frontend/` and `backend/`.
- Use TypeScript build for backend before starting in production mode; dev mode uses `ts-node-dev`.
- Prisma commands available via npm scripts (e.g., `prisma:generate`).

## Constraints

- Windows environment with bash is supported; prefer shell-agnostic scripts.
- Keep dependencies minimal and pinned to stable versions.
- Follow TypeScript best practices and consistent linting/formatting.

Last updated: 2025-10-26