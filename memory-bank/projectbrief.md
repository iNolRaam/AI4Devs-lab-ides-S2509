# Project Brief — LTI Talent Tracking System

This document defines the core goals, scope, and success criteria for the LTI (Learning Talent Insights) Talent Tracking System. The project is a full‑stack web application with a React frontend and an Express (Node.js) backend using Prisma as the ORM for PostgreSQL. Content is authored in English for consistency across code, docs, and tooling.

## Goals

- Provide a simple, modern web UI for tracking talent information and related workflows.
- Expose a RESTful backend API built with Express and TypeScript.
- Use PostgreSQL as the system of record, accessed through Prisma ORM.
- Containerize the database for local development with Docker Compose.
- Establish a clean developer experience with TypeScript, automated tests (Jest), and basic error handling.

## Non-Goals (for the current phase)

- Complex role‑based access control and multitenancy.
- Advanced analytics, dashboards, and reporting.
- Cloud infrastructure provisioning or production CI/CD pipelines.
- Real-time features (websockets) or offline-first capabilities.

## In-Scope (MVP)

- Bootstrapped React app (Create React App) for the frontend UI.
- Express server exposing at least a health/root endpoint and scaffolding for CRUD routes.
- PostgreSQL database (via Docker) configured via environment variables.
- Prisma schema and migrations to manage database models (initial User model present).
- Unit/integration test scaffolding for both backend and frontend using Jest.

## Constraints and Assumptions

- Local development is supported on Windows (with bash available) and other common OSes.
- Environment configuration is provided via `.env` (never committed with secrets) and `dotenv` at runtime.
- Database runs in a local Docker container; application services run with Node/npm scripts.
- Documentation is maintained in the Memory Bank and kept up to date with active work.

## Success Criteria

- Frontend and backend start reliably with documented scripts; root endpoints respond successfully.
- PostgreSQL database is accessible using environment variables and Prisma client.
- Prisma schema compiles; migrations can be applied without errors.
- A minimal “hello” flow (root endpoint) is covered by tests; the project has a green basic test suite.

## High-Level Deliverables

- React frontend (TypeScript) running on http://localhost:3000.
- Express backend (TypeScript) running on http://localhost:3010.
- Dockerized PostgreSQL database reachable at localhost:5432 for local dev.
- Memory Bank documentation kept current: project brief, product context, system patterns, tech context, active context, progress, and copilot rules.

Last updated: 2025-10-26