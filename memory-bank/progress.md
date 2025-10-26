# Progress — Status, Next Steps, and Issues


Last reviewed: 2025-10-26

## What Works Today

- Backend Express server boots and serves root endpoint at http://localhost:3010.
- Error handling middleware present; TypeScript setup in place.
- Jest test scaffolding for backend (Supertest) and frontend (React Testing Library).
- Prisma schema initialized with `User` and `Candidate` models; migrations configured.
- Docker Compose provides local PostgreSQL for development.
- Frontend React app (CRA) present; build scripts available.
- "Add Candidate" entry point and registration form implemented and tested per PRD/design/tasks.

## What’s Left to Build

- Align backend root response with tests for green baseline.
- Define/implement initial API endpoints (users, candidates) and connect to Prisma.
- Apply Prisma migrations and add seeds if needed.
- Wire frontend to backend health/API endpoints.
- Add basic CI checks (lint, typecheck, test) and ensure formatting.
- Improve error handling/logging; add config validation.

## Current Status

- MVP feature set for candidate entry and registration is complete and integrated.
- Moving toward first functional API + UI integration.

## Known Issues and Risks

- Test mismatch: backend returns "Hola LTI!" while tests expect "Hello World!" (fix by updating one side).
- Secrets must not be committed; DB credentials via env vars and `.env.example` pattern.
