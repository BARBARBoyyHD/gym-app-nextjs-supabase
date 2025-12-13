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

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

## API Development Guidelines

When creating API routes, follow these key patterns:

### API Structure
All API endpoints should use this directory structure:
- `/api/admin/{name}/get/route.ts` - GET all records
- `/api/admin/{name}/get/[id]/route.ts` - GET single record by ID
- `/api/admin/{name}/post/route.ts` - POST new record
- `/api/admin/{name}/put/[id]/route.ts` - PUT to update a specific record
- `/api/admin/{name}/delete/[id]/route.ts` - DELETE a specific record

### Import Pattern
Use absolute imports from src without including src in the path:
- ✅ Correct: `import { handler } from '@/handlers/handlerName'`
- ❌ Incorrect: `import { handler } from '@/src/handlers/handlerName'`

### Handler Usage
Always use handlers in `/src/handlers/` to avoid duplicating logic:
- Use `getHandler` and `getSingleHandler` for GET operations
- Use `postHandler` for POST operations
- Use `putHandler` for PUT operations (in `/put/[id]/route.ts`)
- Use `deleteHandler` for DELETE operations (in `/delete/[id]/route.ts`)