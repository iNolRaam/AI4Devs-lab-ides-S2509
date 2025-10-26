## 🚀 Architecture and design

- You must use the clean architecture + DDD patterns.
 - Use TDD practices.
 - Use TypeScript best practices.
 - Use React best practices for the FrontEnd.
 - Use Node and Express best practices for the BackEnd.
 - Use PostgreSQL best practices for database design and access.
- You must follow the SOLID principles, KISS, and YAGNI principles.

## ✅ Coding conventions

- Use TypeScript in both backend and frontend; prefer explicit types for public APIs.
- Enforce formatting with Prettier and linting with ESLint; keep configs consistent across packages.
- Keep functions small and pure where possible; prefer composition over inheritance.
- Write tests alongside features (Jest). Backend HTTP tests should use Supertest.
- Use English for code, comments, commit messages, and documentation.

## 📁 Project structure

- Monorepo with `frontend/` (CRA + TS) and `backend/` (Express + TS).
- Backend layering: routes → handlers/controllers → services → data (Prisma) → PostgreSQL.
- Prisma schema in `backend/prisma/schema.prisma`; manage changes via migrations.

## 🔐 Secrets and configuration

- Do not commit secrets. Use `.env` locally with placeholders in `.env.example`.
- All configuration via environment variables (12‑Factor). Validate essential vars on startup.
- Prefer referencing database credentials from env in `docker-compose.yml` (avoid hardcoding).

## 🚨 Never Upload Secrets

- Do not store API keys or `.env` in repo.
- Use `.env.example` with placeholders.
- If a secret is leaked: rotate credentials, purge history, notify team.

## 🧪 Testing strategy

- Maintain a green baseline: align tests and implementation (e.g., root greeting string).
- Cover: route handlers, services, Prisma data access (with test DB or mocks), and critical UI flows.
- Keep tests fast and deterministic; avoid network calls in unit tests.

## 📦 Dependencies

- Pin to stable versions; avoid unnecessary libraries. Periodically update minors/patches.
- Prefer standard libraries and proven tools (Express, Prisma, Testing Library) over bespoke code.

## 🔄 Git and workflow

- Branch naming: `feat/*`, `fix/*`, `docs/*`, `chore/*`.
- Conventional commits encouraged (e.g., `feat(api): add users list endpoint`).
- Small PRs with clear descriptions and checklists.

## 🧭 Documentation & Memory Bank

- Update Memory Bank when context changes, after notable commits, or when requested.
- Prioritize `activeContext.md` and `progress.md` during active work.
- Keep documentation concise, actionable, and in English.

Last updated: 2025-10-26