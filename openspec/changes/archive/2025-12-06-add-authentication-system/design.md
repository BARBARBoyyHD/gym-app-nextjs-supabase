## Context
The gym membership app requires a secure authentication system for admin users who can manage memberships, courses, and members. Regular members do not have login access. This system will use Supabase Auth as the primary authentication service.

## Goals / Non-Goals
- Goals:
  - Implement secure authentication with email/password for admin users
  - Create protected routes for admin users
  - Ensure session management with proper security measures
  - Implement admin profile management features

- Non-Goals:
  - Social authentication (Google, Facebook, etc.)
  - Password reset via email (though may be added later)
  - Two-factor authentication (for MVP)

## Decisions
- Decision: Use Supabase Auth for admin user management
  - Why: Integrated with our Supabase database, handles secure password storage, session management, and JWT validation
  - Alternative considered: Custom auth system vs. Supabase Auth
  - Chosen: Supabase Auth due to better security, easier maintenance, and integration with RLS


- Decision: Store admin user information in Supabase profiles table with RLS
  - Why: Allows access control through database policies
  - Alternative considered: Session-based authentication only
  - Chosen: Database-stored authentication for better consistency and security

## Risks / Trade-offs
- Risk: JWT token theft could allow unauthorized access
  - Mitigation: Implement proper session timeout, secure cookie storage, and HTTPS-only transmission

- Risk: Admin role could be assigned incorrectly during registration
  - Mitigation: Admin roles only assigned manually by existing admins or during seed data setup

- Risk: Authentication state inconsistency between client and server
  - Mitigation: Use Supabase's built-in auth client that syncs with server state

## Migration Plan
1. First, implement the core Supabase Auth integration
2. Add admin user profile table with role information
3. Create auth middleware for protecting routes
4. Implement the UI components for login, registration, and profile
5. Test thoroughly with admin access scenarios

## Open Questions
- How should the first admin user be created? (likely via direct DB insertion during initial setup)
- Should we implement a "forgot password" feature in the MVP?