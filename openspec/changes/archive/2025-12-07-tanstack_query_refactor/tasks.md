# Tasks for TanStack Query Refactoring

1. Update the members page (`/admin/members/page.tsx`) to use `useGetData` hook
   - Replace the current manual fetch implementation with the `useGetData` hook
   - Ensure pagination and search functionality still works
   - Verify all UI elements remain functional

2. Update the edit member page (`/admin/members/[id]/page.tsx`) to use `useGetSingleData` hook
   - Replace the current manual fetch implementation with the `useGetSingleData` hook
   - Ensure the member data loads correctly
   - Verify that form population still works

3. Review other admin pages for manual fetch implementations
   - Check if any other admin pages use manual fetch implementations
   - Refactor them to use the appropriate TanStack Query hooks

4. Test the refactored pages
   - Verify data loading still works correctly
   - Ensure search and pagination functionality remains intact
   - Test error handling scenarios
   - Check loading states display properly

5. Update any other related components if needed
   - Ensure all data dependencies are maintained
   - Check for any required type adjustments