# Design: Members API

## Architecture Overview

The members API follows the established pattern in the application, utilizing handler functions to maintain consistency with other API endpoints and promote code reuse. This API will manage gym member information including personal details, contact information, and profile data.

## API Structure

All API endpoints follow the standardized directory structure:
```
/api/members/get/route.ts                    # GET all records
/api/members/get/[id]/route.ts              # GET single record by ID
/api/members/post/route.ts                  # POST new record
/api/members/put/[id]/route.ts              # PUT to update a specific record
/api/members/delete/[id]/route.ts           # DELETE a specific record
```

## Handler Usage

The API utilizes the existing handler functions for database operations:
- `getHandler` and `getSingleHandler` for GET operations
- `postHandler` for POST operations
- `putHandler` for PUT operations
- `deleteHandler` for DELETE operations

This prevents code duplication and ensures consistent error handling, authentication, and response formatting.

## Data Model

The member entity uses these TypeScript interfaces:
- `Member` - Full entity with all properties including id, timestamps, etc.
- `MemberInput` - Input type for creation/updating, excluding auto-generated fields

Based on existing type definitions in `src/types/member.ts` and `src/types/memberInput.ts`:
- id: Unique identifier for the member
- name: Member's full name
- email: Member's email address
- phone: Member's phone number (optional)
- joined_date: When the member joined the gym
- Other fields as defined in the Supabase schema

## Implementation Approach

Each API endpoint is designed to be minimal, focusing only on:
- Request parameter extraction and validation
- Calling the appropriate handler function
- Returning the proper response format

The business logic is encapsulated in the handlers, promoting reusability and maintainability.

## Relationships

The members API will interact with:
- Memberships API (members have memberships)
- The Supabase database (users table)
- Potentially other APIs for metrics, check-ins, etc.

These relationships will be managed at the database level through foreign key constraints.