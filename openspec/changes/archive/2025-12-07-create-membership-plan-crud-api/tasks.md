# Tasks - Create CRUD membership-plan API

## Implementation Tasks

- [x] Create directory structure for membership plan API endpoints under `/src/app/api/admin/membership-plan/`
  - [x] `/get/route.ts` for listing all membership plans
  - [x] `/get/[id]/route.ts` for getting a single membership plan
  - [x] `/post/route.ts` for creating a new membership plan
  - [x] `/put/[id]/route.ts` for updating a membership plan
  - [x] `/delete/[id]/route.ts` for deleting a membership plan

- [x] Create database schema for membership_plans table (if not already created)
  - [x] Define columns: id, name, description, price, duration, features, created_at, updated_at
  - [x] Ensure proper RLS policies for admin access

- [x] Implement GET endpoint to list all membership plans
  - [x] Use getHandler from handlers
  - [x] Add pagination, search, and sorting capabilities
  - [x] Ensure proper error handling

- [x] Implement GET endpoint for a single membership plan
  - [x] Use getSingleHandler from handlers
  - [x] Validate the ID parameter
  - [x] Return appropriate error if not found

- [x] Implement POST endpoint to create new membership plans
  - [x] Use postHandler from handlers
  - [x] Validate required fields (name, price, duration)
  - [x] Return created membership plan with 201 status

- [x] Implement PUT endpoint to update existing membership plans
  - [x] Use putHandler from handlers
  - [x] Validate membership plan data before update
  - [x] Return updated membership plan

- [x] Implement DELETE endpoint to remove membership plans
  - [x] Use deleteHandler from handlers
  - [x] Ensure appropriate access control
  - [x] Return success message on deletion

- [x] Add TypeScript interfaces for membership plan entities
  - [x] Define MembershipPlan interface with all properties
  - [x] Define MembershipPlanInput interface for creation/updating

- [x] Add validation for membership plan data using Zod
  - [x] Create Zod schema for membership plan creation
  - [x] Create Zod schema for membership plan updates
  - [x] Implement validation in API routes

- [x] Add appropriate error handling and response formatting
  - [x] Ensure consistent error response format
  - [x] Handle validation errors appropriately
  - [x] Handle database errors appropriately

- [x] Test all endpoints to ensure they work as expected
  - [x] Verify GET endpoints return data in correct format
  - [x] Verify POST endpoint creates records properly
  - [x] Verify PUT endpoint updates records properly
  - [x] Verify DELETE endpoint removes records properly