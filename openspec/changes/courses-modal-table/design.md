# Courses Management - Design Document

## Architecture Overview

The courses management system will follow the existing patterns in the application, using:

1. **Data Layer**: Using existing `use-Fetch` hooks for all data operations
2. **UI Components**: 
   - Table component using existing UI patterns
   - Modal forms for add/edit operations
   - Confirmation modal for delete operations
3. **API Integration**: Connecting to existing course API routes

## Components Structure

```
src/components/admin/courses/
├── CourseListComponents.tsx          # Main courses table component
├── table/
│   └── CourseTableComponents.tsx     # Table columns definition
├── modal/
│   ├── AddCourseModal.tsx            # Modal for adding new courses
│   └── EditCourseModal.tsx           # Modal for editing existing courses
```

## Data Flow

1. `CourseListComponents` fetches course data using `useGetData`
2. User interactions trigger modals which use `usePostData`, `useUpdateData`, and `useDeleteData`
3. After successful operations, data is automatically refreshed using query invalidation

## UI/UX Patterns

The implementation will follow existing patterns:
- Modal forms with form validation
- Responsive table with sorting and pagination
- Loading states and error handling
- Toast notifications for success/error feedback
- Confirmation dialogs for destructive actions

## Validation

All form inputs will be validated using the existing Zod schemas (`courseSchema` and `updateCourseSchema`) that are already defined in the application.

## State Management

- Component state for modal open/close
- Form state managed by React Hook Form
- Server state managed by React Query via the use-Fetch hooks