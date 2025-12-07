# Design Document for TanStack Query Refactoring

## Current State vs. Target State

### Current State
- Admin pages use direct `useQuery` calls with manual fetch implementations
- Each page has its own fetch logic
- API response handling is duplicated across pages

### Target State
- Admin pages use the standardized hooks from `use-Fetch.ts`
- Consistent data fetching patterns across all admin pages
- Centralized error handling and loading states

## Architecture Overview
The refactoring will replace the current manual implementations with the existing reusable TanStack Query hooks. The existing hooks are well-designed with proper error handling, loading states, and caching strategies.

## Data Flow (After Refactoring)
1. Page component calls reusable hook (e.g., `useGetData` or `useGetSingleData`)
2. Hook handles the fetch operation and returns standardized response
3. Page component handles the response data and UI rendering
4. Error and loading states are handled consistently

## Implementation Details

### Members Page Refactoring
- Replace current `useQuery` with `useGetData<Members>`
- Pass appropriate endpoint, queryKeyBase, and parameters
- Adapt the response structure (current implementation expects PaginatedMembersResponse but the hook returns FetchResponse<Members>)

### Edit Member Page Refactoring
- Replace current `useQuery` with `useGetSingleData<Members>`
- Pass member ID, appropriate endpoint, and query key
- Adapt the response structure for single member data

## Error Handling
- The existing hooks already include comprehensive error handling
- Error states will be standardized across all pages
- Toast notifications will remain consistent

## Performance Considerations
- The existing hooks include proper caching strategies
- Query invalidation is handled automatically for mutations
- Background refetching will be more consistent

## Migration Strategy
- Update pages one at a time to minimize risk
- Maintain exact functionality while updating implementation
- Test each page after refactoring to ensure no regressions