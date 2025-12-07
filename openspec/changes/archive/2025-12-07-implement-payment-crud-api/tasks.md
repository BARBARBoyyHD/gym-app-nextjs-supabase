# Tasks: Implement Payment CRUD API

## Implementation Tasks

1. **Create API directory structure**
   - Create `src/app/api/admin/payments` directory
   - Create subdirectories: `get`, `post`, `put`, `delete`
   - Create `get/[id]`, `put/[id]`, and `delete/[id]` subdirectories for individual payment operations

2. **Implement GET all payments endpoint**
   - Create `src/app/api/admin/payments/get/route.ts`
   - Use `getHandler` from `src/handlers/getHandlers.ts`
   - Support pagination, search, and sorting
   - Require admin JWT authentication

3. **Implement GET single payment endpoint**
   - Create `src/app/api/admin/payments/get/[id]/route.ts`
   - Use `getSingleHandler` from `src/handlers/getHandlers.ts`
   - Handle not found scenarios properly
   - Require admin JWT authentication

4. **Implement POST payment endpoint**
   - Create `src/app/api/admin/payments/post/route.ts`
   - Use `postHandler` from `src/handlers/postHandlers.ts`
   - Validate required fields (memberId, membershipPlanId, amount, etc.)
   - Require admin JWT authentication

5. **Implement PUT payment endpoint for specific payment**
   - Create `src/app/api/admin/payments/put/[id]/route.ts`
   - Use `putHandler` from `src/handlers/putHandlers.ts`
   - Handle updates with proper validation using path parameter
   - Require admin JWT authentication

6. **Implement DELETE payment endpoint for specific payment**
   - Create `src/app/api/admin/payments/delete/[id]/route.ts`
   - Use `deleteHandler` from `src/handlers/deleteHandlers.ts`
   - Handle deletion with proper validation using path parameter
   - Require admin JWT authentication

7. **Create validation schemas for Payment entities**
   - Create `src/lib/validation/paymentValidate.ts` with create and update schemas
   - Follow the same pattern as other validation files in the project

8. **Update documentation**
   - Update any necessary README or API documentation
   - Add payment endpoints to project.md

9. **Create tests for the new API endpoints**
   - Write unit tests for each endpoint
   - Ensure proper test coverage for validation scenarios