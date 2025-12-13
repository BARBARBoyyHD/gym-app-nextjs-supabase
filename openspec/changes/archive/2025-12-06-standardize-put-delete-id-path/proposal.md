# Change Proposal: Standardize PUT and DELETE Routes to Use ID in URL Path

## Overview
This proposal outlines the changes needed to standardize all PUT and DELETE API routes to follow the pattern where the ID is specified in the URL path (`/api/{name}/put/[id]/route.ts` and `/api/{name}/delete/[id]/route.ts`), rather than in the request body.

## Current State
Currently, the project has inconsistent patterns for PUT and DELETE routes:
- Some PUT routes expect ID in the request body: `/api/{name}/put/route.ts`
- Some PUT routes expect ID in the URL path: `/api/{name}/put/[id]/route.ts`
- Some DELETE routes expect ID in the request body: `/api/{name}/delete/route.ts`
- Some DELETE routes expect ID in the URL path: `/api/{name}/delete/[id]/route.ts`

Documentation is also inconsistent about which pattern to follow.

## Desired State
All PUT and DELETE routes should follow RESTful conventions where the resource ID is part of the URL path:
- PUT routes: `/api/{name}/put/[id]/route.ts` (update a specific resource)
- DELETE routes: `/api/{name}/delete/[id]/route.ts` (delete a specific resource)

## Requirements
- Update all PUT routes to use ID in URL path
- Update all DELETE routes to use ID in URL path
- Update documentation to reflect the correct patterns
- Maintain consistency across all API implementations

## Scope
- Update all existing PUT and DELETE API route implementations
- Update all documentation and guidelines
- Ensure all handlers support the new pattern
- Update any related validation schemas

## Success Criteria
- All PUT routes follow the `/api/{name}/put/[id]/route.ts` pattern
- All DELETE routes follow the `/api/{name}/delete/[id]/route.ts` pattern
- Documentation consistently reflects the new standard
- All APIs function correctly with the new structure