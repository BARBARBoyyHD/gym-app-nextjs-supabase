# API Structure and Import Guidelines

## API Folder Structure

All API endpoints in this project should follow the same consistent structure:

```
/api/admin/{name}/get/route.ts                    # GET all records
/api/admin/{name}/get/[id]/route.ts              # GET single record by ID
/api/admin/{name}/post/route.ts                  # POST new record
/api/admin/{name}/put/[id]/route.ts              # PUT to update a specific record
/api/admin/{name}/delete/[id]/route.ts           # DELETE a specific record
```

## Import Conventions

### Absolute Imports

All imports should use absolute paths from the `src` directory, without including `src` in the import path:

✅ **Correct:**
```typescript
import { someFunction } from '@/types/someType';
import { someHandler } from '@/handlers/someHandler';
import { someUtil } from '@/utils/someUtil';
import { someLib } from '@/lib/someLib';
```

❌ **Incorrect:**
```typescript
import { someFunction } from '@/src/types/someType';  // Don't include src in path
import { someFunction } from '../../types/someType';  // Don't use relative paths
```

### Handler Usage

When creating API routes, always use the existing handlers in the `handlers` folder to avoid code duplication:

- Use `getHandler` and `getSingleHandler` for GET operations in `/get` routes
- Use `postHandler` for POST operations in `/post` routes
- Use `putHandler` for PUT operations in `/admin/{name}/put/[id]` routes
- Use `deleteHandler` for DELETE operations in `/admin/{name}/delete/[id]` routes

## Benefits

This structure provides:
- Consistent API design across all endpoints
- Reusable and maintainable code
- Clear separation of concerns
- Scalable architecture

## Examples

See existing endpoints like `/api/admin/members` and `/api/admin/membership-plan` for reference implementations.