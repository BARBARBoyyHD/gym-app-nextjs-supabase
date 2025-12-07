# Design - Align APIs with ERD

## Architecture Overview

The missing memberships API will follow the established patterns in the application:
- Use the Next.js App Router API routes under `/src/app/api/memberships/`
- Leverage existing handler functions from `/src/handlers/` for consistency
- Integrate with Supabase database using the established patterns
- Implement proper type safety with TypeScript interfaces

## API Structure

The API will follow the standardized directory structure:
```
/src/app/api/memberships/
├── get/
│   ├── route.ts          # GET all memberships
│   └── [id]/
│       └── route.ts      # GET single membership by ID
├── post/
│   └── route.ts          # POST create new membership
├── put/
│   └── [id]/
│       └── route.ts      # PUT update existing membership
└── delete/
    └── [id]/
        └── route.ts      # DELETE membership by ID
```

## Data Model

Based on the ERD, the memberships table has the following structure:
- id: UUID (primary key)
- member_id: UUID (foreign key to members table)
- plan_id: INTEGER (foreign key to membership_plans table)
- start_date: DATE (required)
- end_date: DATE (required)
- status: TEXT (values: 'active', 'expired') (required)
- created_at: TIMESTAMPTZ (default now())

## Handler Usage

The API will use the existing handler functions to maintain consistency:
- `getHandler` for retrieving lists of memberships
- `getSingleHandler` for retrieving a single membership by ID
- `postHandler` for creating new memberships
- `putHandler` for updating existing memberships
- `deleteHandler` for deleting memberships

## Error Handling

The API will follow the established error response format:
```json
{
  "success": false,
  "status": 400,
  "message": "Error message",
  "error": "Detailed error info"
}
```

## Validation

We'll use Zod schemas for validating membership data:
- Required fields: member_id, plan_id, start_date, end_date, status
- Foreign key validation for member_id and plan_id
- Date validation to ensure end_date is after start_date
- Status must be either 'active' or 'expired'

## Security

The API will rely on the existing authentication and authorization system:
- Only authenticated admin users can access these endpoints
- RLS (Row Level Security) will be implemented at the database level
- The proxy middleware will handle authentication checks

## Dependencies

This implementation will depend on:
- Supabase client for database operations
- Existing handler functions from `/src/handlers/`
- Zod for data validation
- TypeScript for type safety
- The existing authentication middleware