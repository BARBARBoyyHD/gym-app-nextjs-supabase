# Design: Update API Structure Documentation to Use /api/admin Prefix

## Context
The project has implemented a consistent API structure where administrative endpoints are located under `/api/admin/{name}/...`, but the documentation and guidelines still reference the outdated `/api/{name}/...` pattern without the `/admin/` prefix. This creates confusion and inconsistency between documentation and implementation.

## Goals / Non-Goals

### Goals
- Update all API structure documentation to reflect the correct `/api/admin/` prefix
- Ensure consistency between documentation and actual implementation
- Maintain accurate API design guidelines
- Update all related references in the codebase

### Non-Goals
- Modify the actual API implementation (which is already correct)
- Change the runtime behavior of the APIs
- Modify authentication or authorization logic

## Decisions

### Decision: Documentation Updates Only
- Why: The API implementation is already correct with the `/api/admin/` prefix structure
- What: Only update documentation and guidelines to match the implementation
- Impact: Improves consistency and developer understanding

## Approach
1. Identify all files containing API structure references
2. Update documentation to use `/api/admin/{name}/...` pattern
3. Ensure all examples and guidelines reflect the correct structure
4. Verify all references are consistent

## Risks / Trade-offs
- Risk: Confusion during transition if some documentation is missed
  - Mitigation: Comprehensive search and replace, followed by validation
- Risk: Incomplete updates leading to mixed patterns
  - Mitigation: Thorough review and validation of all changes

## Validation
- Verify all documentation references now use the correct pattern
- Ensure no references to the old pattern remain
- Confirm implementation and documentation are now aligned