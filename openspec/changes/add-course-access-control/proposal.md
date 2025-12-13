# Change: Add Role-Based Access Control for Courses

## Why
The current gym app allows all users to access courses without any membership verification. To implement a tiered access system, users with specific membership plans (e.g., Silver, Gold) should have access to courses based on their membership level. This will enable the business to offer premium content to higher-tier members while maintaining a free tier for basic access.

## What Changes
- Create a new API route to check course access permissions based on user email and membership plan
- Implement protected routes for courses that verify authentication and membership status
- Add database query logic to match member's email to their plan ID and verify active status
- Update course UI components to handle access restrictions gracefully

## Impact
- Affected specs: Will add new course access control spec
- Affected code: New API routes, middleware, and updated UI components
- New capability: Role-based access control for courses based on membership plan
- Security: Enhanced protection of premium content through membership verification