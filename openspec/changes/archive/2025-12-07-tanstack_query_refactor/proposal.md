# Refactor Admin Pages to use Existing TanStack Query Hooks

## Overview
This proposal outlines the refactoring of existing admin pages to use the already implemented TanStack Query hooks in the `use-Fetch.ts` file. The goal is to make the admin frontend cleaner and more maintainable by using reusable components instead of manual fetch implementations.

## Objectives
- Refactor existing admin pages to use the existing `useGetData` and `useGetSingleData` hooks
- Remove manual fetch implementations in favor of the standardized hooks
- Ensure consistent data fetching patterns across admin pages
- Improve code maintainability and reduce duplication

## Scope
The implementation will refactor:
- Members page to use `useGetData` hook
- Edit member page to use `useGetSingleData` hook
- Any other admin pages using manual fetch implementations

## Non-Goals
- Creating new hooks (the hooks already exist)
- Changing the underlying API endpoints
- Implementing new features beyond data fetching

## Implementation Approach
1. Update the members page to use `useGetData` hook instead of manual implementation
2. Update the edit member page to use `useGetSingleData` hook instead of manual implementation
3. Update create and other admin pages as appropriate
4. Ensure all functionality remains the same with improved code structure

## Dependencies
- Existing `use-Fetch.ts` hooks
- Existing data types and API endpoints
- Authentication system to ensure only admins can access pages

## Success Criteria
- All admin pages use the standardized TanStack Query hooks
- Existing functionality remains intact
- Code is cleaner and more maintainable
- Error handling and loading states continue to work properly