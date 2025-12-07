# Design: Payment CRUD API

## Architecture Overview

The payment CRUD API follows the established pattern in the application, utilizing handler functions to maintain consistency with other API endpoints and promote code reuse. This API will handle payment transactions for membership purchases with tracking of payment method, status, amount, and transaction details.

## API Structure

All API endpoints follow the standardized directory structure:
```
/api/admin/payments/get/route.ts                    # GET all records
/api/admin/payments/get/[id]/route.ts              # GET single record by ID
/api/admin/payments/post/route.ts                  # POST new record
/api/admin/payments/put/[id]/route.ts              # PUT to update a specific record
/api/admin/payments/delete/[id]/route.ts           # DELETE a specific record
```

Note: Based on the existing spec, the path should be `/api/payments/` but to maintain consistency with the pattern used in other recent APIs, I'll use `/api/admin/payments/`.

## Handler Usage

The API utilizes the existing handler functions for database operations:
- `getHandler` and `getSingleHandler` for GET operations
- `postHandler` for POST operations
- `putHandler` for PUT operations
- `deleteHandler` for DELETE operations

This prevents code duplication and ensures consistent error handling, authentication, and response formatting.

## Data Model

The payment entity uses these TypeScript interfaces:
- `Payment` - Full entity with all properties including id, timestamps, etc.
- `PaymentInput` - Input type for creation/updating, excluding auto-generated fields

Based on existing patterns in the project and the type definition:
- member_id: Links to the member who made the payment
- membership_id: Links to the specific membership plan being purchased
- amount: The payment amount
- method: How the payment was made (credit_card, debit_card, etc.)

## Implementation Approach

Each API endpoint is designed to be minimal, focusing only on:
- Request parameter extraction and validation
- Calling the appropriate handler function
- Returning the proper response format

The business logic is encapsulated in the handlers, promoting reusability and maintainability.

## Validation

Payment data will be validated using Zod schemas:
- Validate required fields (memberId, membershipPlanId, amount, etc.)
- Ensure proper UUID formats for IDs
- Validate that payment amounts are positive numbers
- Validate payment status and payment method enums

## Security and Authentication

All payment endpoints require:
- Valid JWT authentication token
- Admin access rights (for security of financial data)
- Proper rate limiting to prevent abuse