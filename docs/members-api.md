# Database Migration & API Documentation for Members API

## Required Database Changes

To properly implement the search functionality by phone number and the validation requirements, you need to add a phone column to the members table in your Supabase database.

### SQL Migration

Run the following SQL command in your Supabase SQL Editor:

```sql
-- Add phone column to members table
ALTER TABLE members
ADD COLUMN phone TEXT;
```

### Update Supabase Types

After running the migration, you should update your Supabase types by:

1. Running the Supabase CLI command to regenerate types:
```bash
npx supabase gen types typescript --project-id [YOUR_PROJECT_ID] --schema public > src/types/supabase.ts
```

Or if you're using the Supabase extension in VS Code, use the "Supabase: Gen New Types" command.

### Update Member Type

After regenerating the types, you can update the Member type in `src/types/member.ts` to use the actual Supabase type instead of the custom one with the phone field.

## API Endpoints

The Members CRUD API is now available at:
- `GET /api/members` - Get all members with pagination and search
- `POST /api/members` - Create a new member
- `PUT /api/members` - Update an existing member
- `DELETE /api/members` - Delete a member

## POST Request Validation

When creating a member via POST /api/members, the following validations are enforced:

### Required Fields
- `full_name` (string, max 100 chars) - Cannot be empty
- `email` (string) - Must be a valid email format

### Optional Fields
- `phone` (string) - If provided, must be a valid phone number format

## PUT Request Validation

When updating a member via PUT /api/members, the following validations are enforced:

### Optional Fields
- `full_name` (string, max 100 chars) - If provided, cannot be empty
- `email` (string) - If provided, must be a valid email format
- `phone` (string) - If provided, must be a valid phone number format

### Required Query Parameter
- `id` (string, UUID format) - The ID of the member to update

## DELETE Request Validation

When deleting a member via DELETE /api/members, the following validation is enforced:

### Required Query Parameter
- `id` (string, UUID format) - The ID of the member to delete

## Query Parameters for GET /api/members

- `page` (optional, default: 1) - Page number for pagination
- `limit` (optional, default: 10) - Number of items per page (max: 100)
- `search` (optional) - Search term for full_name, email, and phone
- `sort_by` (optional, default: created_at) - Column to sort by
- `sort_order` (optional, default: desc) - Sort order (asc or desc)

## Example Usage

### Get all members with pagination
```
GET /api/members?page=1&limit=10
```

### Search members
```
GET /api/members?search=john
```

### Get members with pagination and search
```
GET /api/members?page=1&limit=5&search=john&sort_by=full_name&sort_order=asc
```

### Create a new member (POST)
```
POST /api/members
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

### Update an existing member (PUT)
```
PUT /api/members?id=123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json

{
  "full_name": "Jane Doe",
  "email": "jane@example.com"
}
```

### Delete a member (DELETE)
```
DELETE /api/members?id=123e4567-e89b-12d3-a456-426614174000
```