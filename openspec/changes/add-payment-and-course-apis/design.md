# Design: Add Payment API and Course API

## Architectural Approach

### Payment API
The payment API will follow the existing handler pattern already established in the application. It will leverage the Supabase database integration and existing authentication system.

#### Components
- API routes following the established pattern (`/api/payments/{method}/route.ts`)
- Handlers in `src/handlers/` directory using the Supabase client
- Type definitions from `src/types/payment.ts`
- Response formatting using existing utility functions

#### Security
- All payment endpoints will require authentication (JWT)
- Payment data access will be restricted to admin users
- Payment records will be linked to members for audit trail

### Course API
Similarly, the course API will follow the same architectural pattern as the payment API.

#### Components
- API routes following the established pattern (`/api/courses/{method}/route.ts`)
- Handlers in `src/handlers/` directory using the Supabase client
- Type definitions from `src/types/course.ts`
- Response formatting using existing utility functions

#### Security
- Course creation and modification will be restricted to admin users
- Course listing may be made available to members in future iterations

## Database Integration
Both APIs will integrate with the Supabase PostgreSQL database using the existing client pattern. The database schema for payments and courses is already defined in the documentation, with RLS policies to be applied.

## Error Handling
Both APIs will use the existing error response format consistent with other APIs in the application:
```json
{
  "success": false,
  "error": "Error message explaining what went wrong"
}
```

## Extensibility
The handlers will be designed to be reusable and extensible for future similar entities. The pattern will follow the existing handler architecture already established for members, memberships, and membership plans.