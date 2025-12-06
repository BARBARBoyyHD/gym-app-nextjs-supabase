# Design: Standardize PUT and DELETE Routes to Use ID in URL Path

## Context
The project currently uses inconsistent patterns for PUT and DELETE operations. Some APIs expect the resource ID in the request body while others expect it in the URL path. This creates confusion for developers and doesn't follow standard RESTful API conventions. This design standardizes on the RESTful approach where the resource ID is part of the URL path.

## Goals / Non-Goals

### Goals
- Standardize all PUT routes to use ID in URL path (`/api/{name}/put/[id]/route.ts`)
- Standardize all DELETE routes to use ID in URL path (`/api/{name}/delete/[id]/route.ts`)
- Align implementation with RESTful API conventions
- Ensure consistency across all API implementations
- Update all related documentation

### Non-Goals
- Change the underlying business logic in handlers
- Modify GET and POST route patterns
- Change authentication or authorization mechanisms

## Decisions

### Decision: RESTful API Design with ID in URL Path
- Why: Following RESTful API conventions where the resource identifier is part of the URL path
- Alternative considered: Keeping ID in request body vs. ID in URL path
- Chosen: ID in URL path as it's more RESTful and intuitive (`/api/members/put/123` to update member #123)

### Decision: Update All Existing Implementations
- Why: Ensure complete consistency across the entire codebase
- Alternative considered: Supporting both patterns simultaneously
- Chosen: Single, consistent pattern to avoid confusion

## Approach
1. Update all PUT routes to expect ID in URL path
2. Update all DELETE routes to expect ID in URL path
3. Update handlers if needed to support the new pattern
4. Update all documentation and guidelines
5. Update validation schemas and middleware if required

## Risks / Trade-offs
- Risk: Breaking changes for API consumers if they're already using the current endpoints
  - Mitigation: Proper communication and migration path
- Risk: Complex refactoring of existing routes
  - Mitigation: Step-by-step approach with thorough testing
- Risk: Inconsistent state during migration
  - Mitigation: Complete migration in single release

## Validation
- All PUT routes accessible at `/api/{name}/put/[id]/route.ts`
- All DELETE routes accessible at `/api/{name}/delete/[id]/route.ts`
- All routes function correctly with new ID path parameter
- Documentation accurately reflects the new structure