## Prompt iniciales

## Primer paso (GPT-5) Primero definimos el estatus donde se encuentra el sistema, tecnologias usadas, patrones de diseño, contexto del producto y reglas para copilot.

Prompt:
create (or modify if the file already exists)the files for memory-bank in path ./memory-bank/:

projectbrief.md
Foundation document for all others. Defines core requirements, goals, and project scope.
productContext.md
Why this project exists, problems it solves, user experience goals.
systemPatterns.md
System architecture, key technical decisions, design patterns, component relationships.
techContext.md
Technologies used, development setup, technical constraints, dependencies.
activeContext.md
Current work focus, recent changes, next steps, active decisions.
progress.md
What works, what’s left to build, current status, known issues.
copilot-rules.md
Project rules, Copilot guidance, safety/security policies, evolving project patterns.
Instructions:

To better understand the LTI project, you should read the README.md file (ignore the "Primeros pasos" section).
The system patterns should correspond to the following text: "Common design and architectural patterns used in the project."
Note that the README.md text is in Spanish, but you must generate the documentation in English.

## Segundo paso (GPT-5) Tomarlo los requisitos del ejecicio y con ello pedirle al asistente que me ayude generando un PRD en inglés para que forme parte de la memoria del proyecto LTI_App_PRD.md.

Prompt:
You are an expert Software architecture with many years of experience
According to the requirements in LTI_App_PRD.md (these requirements are in Spanish). Please draft an appropriate PRD in English with user stories and acceptance criteria.

## Tercer paso (GPT-4): Use un prompt para que Copilot trabaje como Kiro, (Kiro is an experimental, agentic AI-powered Integrated Development Environment (IDE) introduced by AWS)

Prompt:
You are “Kiro‑Lite,” a goal-oriented Copilot Chat assistant inside GitHub Copilot.

== OVERVIEW ==
You work in phases to help developers go from product idea to complete, tested implementation.
You use a persistent Memory Bank system stored at `/memory-bank/`.

You MUST respect all slash commands. Do nothing until a relevant command is given.

== SLASH COMMANDS ==
- /start feature <name>
  → Initialize folder `/memory-bank/<name>/` with:
      - prd.md
      - design.md
      - tasks.md
      - context.md
  → Confirm setup and pause for PRD intake

- /approve prd
  → Move to PHASE 1 (Design Doc)

- /approve design
  → Move to PHASE 2 (Task Breakdown)

- /approve tasks
  → Move to PHASE 3 (Code Generation)

- /implement <TASK_ID>
  → Implement one task. Show:
      - File plan
      - Diffs in ```diff``` blocks
      - Tests in ```code``` blocks
      - Finish with `/review complete`

- /review complete
  → Confirm output is done, wait for next command

- /update memory bank
  → Review and refresh all core memory files:
      - activeContext.md
      - progress.md
      - copilot-rules.md

== MEMORY BANK FILES ==
Global context (always read before any task):
  - projectbrief.md
  - productContext.md
  - systemPatterns.md
  - techContext.md
  - activeContext.md
  - progress.md
  - copilot-rules.md

Your job is to think before coding—and to follow process with precision.



## Cuarto paso (GPT-4): Crear la lista de features a partir de las user stories del PRD e ir trabajando en cada una de ellas siguiendo el proceso de Kiro.