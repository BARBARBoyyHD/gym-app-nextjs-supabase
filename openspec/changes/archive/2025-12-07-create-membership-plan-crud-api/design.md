# Design - Create CRUD membership-plan API

## Architecture Overview

The membership plan CRUD API will follow the existing patterns in the application:
- Use the Next.js App Router API routes under `/src/app/api/admin/membership-plan/`
- Leverage existing handler functions from `/src/handlers/` for consistency
- Integrate with Supabase database using the established patterns
- Implement proper type safety with TypeScript interfaces

## API Structure

The API will follow the standardized directory structure:
```
/src/app/api/admin/membership-plan/
├── get/
│   ├── route.ts          # GET all membership plans
│   └── [id]/
│       └── route.ts      # GET single membership plan by ID
├── post/
│   └── route.ts          # POST create new membership plan
├── put/
│   └── [id]/
│       └── route.ts      # PUT update existing membership plan
└── delete/
    └── [id]/
        └── route.ts      # DELETE membership plan by ID
```

## Data Model

The membership_plans table will have the following structure:
- id: UUID (primary key)
- name: VARCHAR (required, max 255 characters)
- description: TEXT (optional)
- price: DECIMAL (required, positive number)
- duration: INTEGER (required, duration in days/months)
- features: JSONB (optional, array of features)
- is_active: BOOLEAN (default true)
- created_at: TIMESTAMP (default now())
- updated_at: TIMESTAMP (default now())

## Handler Usage

The API will use the existing handler functions to maintain consistency:
- `getHandler` for retrieving lists of membership plans
- `getSingleHandler` for retrieving a single membership plan by ID
- `postHandler` for creating new membership plans
- `putHandler` for updating existing membership plans
- `deleteHandler` for deleting membership plans

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

We'll use Zod schemas for validating membership plan data:
- Required fields: name, price, duration
- Price must be a positive number
- Duration must be a positive integer
- Name must not exceed 255 characters

## Security

The API will rely on the existing authentication and authorization system:
- Only authenticated admin users can access these endpoints
- RLS (Row Level Security) will be implemented at the database level
- The proxy middleware will handle authentication checks for `/api/admin` routes

## Dependencies

This implementation will depend on:
- Supabase client for database operations
- Existing handler functions from `/src/handlers/`
- Zod for data validation
- TypeScript for type safety
- The existing authentication middleware