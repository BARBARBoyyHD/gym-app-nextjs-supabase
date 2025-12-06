# Design: Membership Plan CRUD API

## Architecture Overview

The membership plan API follows the established pattern in the application, utilizing handler functions to maintain consistency with other API endpoints and promote code reuse.

## API Structure

All API endpoints follow the standardized directory structure:
```
/api/membership-plan/get/route.ts                    # GET all records
/api/membership-plan/get/[id]/route.ts              # GET single record by ID
/api/membership-plan/post/route.ts                  # POST new record
/api/membership-plan/put/[id]/route.ts              # PUT to update a specific record
/api/membership-plan/delete/[id]/route.ts           # DELETE a specific record
```

## Handler Usage

The API utilizes the existing handler functions for database operations:
- `getHandler` and `getSingleHandler` for GET operations
- `postHandler` for POST operations
- `putHandler` for PUT operations
- `deleteHandler` for DELETE operations

This prevents code duplication and ensures consistent error handling, authentication, and response formatting.

## Data Model

The membership plan entity uses these TypeScript interfaces:
- `MembershipPlan` - Full entity with all properties including id, timestamps, etc.
- `MembershipPlanInput` - Input type for creation/updating, excluding auto-generated fields

## Implementation Approach

Each API endpoint is designed to be minimal, focusing only on:
- Request parameter extraction and validation
- Calling the appropriate handler function
- Returning the proper response format

The business logic is encapsulated in the handlers, promoting reusability and maintainability.