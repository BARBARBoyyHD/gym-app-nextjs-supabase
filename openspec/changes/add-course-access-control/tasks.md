# Tasks: Add Role-Based Access Control for Courses

## 1. Database Query Implementation
- [ ] Create server action to check membership status by email: `src/actions/checkMembershipStatus.ts`
- [ ] Query members table by email to get member ID
- [ ] Join with memberships table to get plan ID and status
- [ ] Verify membership is active and not expired
- [ ] Return plan details and access level

## 2. API Route Creation
- [ ] Create protected API route for course access: `src/app/api/courses/protected/[id]/route.ts`
- [ ] Implement authentication middleware to extract user email
- [ ] Call membership check function to verify access level
- [ ] Return course data if access granted, error if not

## 3. Middleware Implementation
- [ ] Create course access middleware: `src/middleware/course-access-middleware.ts`
- [ ] Extract user session from request
- [ ] Validate user's membership plan against course access requirements
- [ ] Allow or redirect based on access level

## 4. UI Updates
- [ ] Update CourseDetailPage to check access before displaying content
- [ ] Implement access denied UI for unauthorized users
- [ ] Add upgrade prompt for users without proper access
- [ ] Update CourseCard to show access indicators

## 5. Plan Configuration
- [ ] Define which course categories require which membership levels
- [ ] Create configuration mapping for plan-to-course access
- [ ] Implement flexible system to assign access levels to courses

## 6. Testing
- [ ] Create tests for membership status checking function
- [ ] Test API route access control logic
- [ ] Verify middleware properly restricts access
- [ ] Test error handling for unauthorized access attempts