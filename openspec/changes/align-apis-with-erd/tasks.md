# Tasks - Align APIs with ERD

## Implementation Tasks

- [ ] Create directory structure for memberships API endpoints under `/src/app/api/memberships/`
  - [ ] `/get/route.ts` for listing all memberships
  - [ ] `/get/[id]/route.ts` for getting a single membership
  - [ ] `/post/route.ts` for creating a new membership
  - [ ] `/put/[id]/route.ts` for updating a membership
  - [ ] `/delete/[id]/route.ts` for deleting a membership

- [ ] Implement validation schemas for membership data using Zod
  - [ ] Create Zod schema for membership creation
  - [ ] Create Zod schema for membership updates
  - [ ] Include validation for foreign key relationships (member_id, plan_id)

- [ ] Implement GET endpoint to list all memberships
  - [ ] Use getHandler from handlers
  - [ ] Add pagination, search (on member name, plan name), and sorting capabilities
  - [ ] Ensure proper error handling

- [ ] Implement GET endpoint for a single membership
  - [ ] Use getSingleHandler from handlers
  - [ ] Validate the ID parameter
  - [ ] Return appropriate error if not found

- [ ] Implement POST endpoint to create new memberships
  - [ ] Use postHandler from handlers
  - [ ] Validate required fields (member_id, plan_id, start_date, end_date)
  - [ ] Validate foreign key relationships
  - [ ] Return created membership with 201 status

- [ ] Implement PUT endpoint to update existing memberships
  - [ ] Use putHandler from handlers
  - [ ] Validate membership data before update
  - [ ] Include validation for foreign key relationships
  - [ ] Return updated membership

- [ ] Implement DELETE endpoint to remove memberships
  - [ ] Use deleteHandler from handlers
  - [ ] Ensure appropriate access control
  - [ ] Return success message on deletion

- [ ] Add proper TypeScript interfaces if not already defined
  - [ ] Ensure interfaces match ERD specifications

- [ ] Add appropriate error handling and response formatting
  - [ ] Ensure consistent error response format
  - [ ] Handle validation errors appropriately
  - [ ] Handle database errors appropriately

- [ ] Implement rate limiting for all membership endpoints
  - [ ] Apply appropriate rate limits for different operations