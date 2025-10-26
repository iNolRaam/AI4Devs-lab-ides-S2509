# Design Doc: Successful Submission

## Overview & Goals
This feature ensures recruiters receive clear confirmation after successfully adding a candidate, with actionable next steps and rapid data availability.

## Architecture (Mermaid)
```mermaid
flowchart TD
    A[Candidate Form Submit] --> B[Backend API: POST /api/candidates]
    B --> C[Persist Candidate + CV]
    C --> D[Return Success Response]
    D --> E[Frontend: Show Confirmation]
    E --> F[Next Actions: View Candidate | Add Another]
```

## Tech Stack & Decisions
- Frontend: React (TypeScript)
- Backend: Express (TypeScript)
- Data: Prisma ORM, PostgreSQL
- Feedback: Inline confirmation, next-action buttons

## Data Models / APIs
- API: POST /api/candidates → returns { success: true, candidateId }
- Candidate model: see PRD section 7

## Non-functional Requirements
- Confirmation appears within 2s of submit
- Next actions are accessible via keyboard and screen reader
- Candidate retrievable via search/list within 5s
- WCAG 2.1 AA compliance for confirmation and next actions

(To be expanded in later phases)
