# API Development Guidelines

## Handler Pattern

When creating API routes, use the handler functions located in the `handlers` folder instead of duplicating logic in every route file. This ensures consistency, reduces code duplication, and makes maintenance easier.

### Current Implementation Pattern

- API routes are located in `src/app/api/`
- Common logic should be abstracted to handlers in `src/handlers/`
- Import and reuse handler functions across different API routes

### Expected Structure

For each API endpoint:
1. Define the route file in `src/app/api/[endpoint]` using the appropriate HTTP method
2. Import common handler functions from `src/handlers/`
3. Use the handlers to implement the business logic
4. Handle request/response formatting at the route level

### Benefits

- Reduces code duplication
- Ensures consistent error handling
- Makes updates easier (change logic in one place)
- Improves testability

### Future Implementation

When creating new API routes, always check the `handlers` folder first for reusable functionality before implementing new logic.