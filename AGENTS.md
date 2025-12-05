<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.
Automatically use context7 for code generation and library documentation.


Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

## Project Context Understanding
Before performing any work in this project, AI assistants must:
- Always check the `/docs` directory first to understand the project's documentation, architecture, and context
- Review existing documentation to understand the system design, API specifications, and business requirements
- Familiarize themselves with the project structure by examining files in the `/docs` directory
- Use the documentation to inform all subsequent actions and decisions

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->