# Tasks: Add User-Facing Course Page

## 1. API Implementation
- [ ] Create public API route to fetch courses from Supabase: `src/app/api/courses/get/route.ts`
- [ ] Implement proper error handling and rate limiting for the public API
- [ ] Ensure the API returns courses with proper category grouping

## 2. UI Components
- [ ] Create a CourseCard component to display individual courses
- [ ] Create a CourseCategorySection component to group courses by category
- [ ] Implement responsive grid layout for course display

## 3. Page Implementation
- [ ] Create the main courses page at `src/app/courses/page.tsx`
- [ ] Fetch courses data using the new API route
- [ ] Implement category filtering functionality
- [ ] Add proper loading and error states

## 4. Styling & Design
- [ ] Apply existing design system with brand colors
- [ ] Ensure responsive layout works on mobile and desktop
- [ ] Implement consistent styling with other user-facing pages

## 5. Integration
- [ ] Add navigation link to courses page in main navbar
- [ ] Ensure the page follows the same layout pattern as other pages (Navbar, Footer)
- [ ] Test with actual Supabase data

## 6. Testing
- [ ] Create basic tests for the new API route
- [ ] Verify the UI renders correctly with different course data
- [ ] Test error handling scenarios