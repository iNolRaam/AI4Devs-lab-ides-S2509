# Product Context — Why This Exists and Who It Serves

The LTI Talent Tracking System exists to centralize and streamline how talent data is captured, reviewed, and acted upon. It replaces ad-hoc spreadsheets and fragmented tools with a cohesive, web-based experience that is simple to operate and easy to evolve.

## Problem Statement

- Talent information is often scattered across files and channels, making it difficult to track progress and trends.
- Manual processes slow down feedback loops and introduce inconsistency and data loss.
- Stakeholders need a single source of truth to view, record, and update progress.

## Value Proposition

- A modern, responsive web UI backed by a consistent API and a relational database.
- Clear separation of concerns: React for the user experience, Express for API logic, and PostgreSQL for durable storage.
- Developer-friendly stack (TypeScript, Prisma) to reduce defects and accelerate iteration.

## Target Users and Needs

- Coordinators and mentors who need to view/update talent records quickly.
- Analysts who need structured data to understand outcomes and trends.
- Talent participants who may eventually need self-service views (future scope).

## Experience Goals

- Fast, predictable interactions with minimal friction.
- Clear, accessible forms and lists with sensible defaults.
- Feedback on actions (e.g., create/update) and meaningful error messaging.
- Stable URLs and consistent API contracts for integration.

## Success Metrics (initial)

- Reduced time to record or update a single talent record.
- Lower rate of data errors/inconsistencies in the database.
- Improved test coverage of core flows over time.

Last updated: 2025-10-26