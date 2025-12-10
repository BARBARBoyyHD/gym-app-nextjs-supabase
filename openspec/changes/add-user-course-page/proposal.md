# Change: Add User-Facing Course Page

## Why
The current gym app has admin functionality for managing courses but lacks a user-facing page to browse courses by category. Users need access to a course listing page that displays available courses from the Supabase database, categorized appropriately. This will allow members to view available courses and potentially enroll in them as a future feature.

## What Changes
- Create a new user-facing course page at `/courses` that lists courses by category
- Implement API route to fetch courses from Supabase (public access, no authentication required)
- Create UI components to display courses in a categorized, grid layout similar to the existing dashboard patterns
- Ensure the page uses the same design system as the rest of the application

## Impact
- Affected specs: Will add new course page UI spec
- Affected code: New page component, API route, and UI components
- New capability: Public access to course listings (distinct from admin course management)