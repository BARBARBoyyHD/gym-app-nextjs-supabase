# OpenSpec API Development Guidelines

## Handler Pattern Requirement

When implementing API routes, always use the handlers located in the `src/handlers` folder. This approach prevents code duplication and ensures consistency across all API endpoints.

### Implementation Rules

1. **Check for Existing Handlers First**: Before implementing any API logic, review the handlers in `src/handlers/` to see if there's existing functionality that can be reused.

2. **Create Reusable Handlers**: If implementing new functionality, consider whether it can be abstracted into a reusable handler function.

3. **Import Handlers**: Each API route should import and utilize the appropriate handlers rather than implementing business logic directly in the route file.

4. **Follow the Pattern**: API routes should primarily handle:
   - Request validation
   - Parameter extraction
   - Response formatting
   - Error handling specific to the route
   - Calling the appropriate handler functions

### API Structure Requirements

All API endpoints must follow this specific directory structure:

```
/api/admin/{name}/get/route.ts                    # GET all records
/api/admin/{name}/get/[id]/route.ts              # GET single record by ID
/api/admin/{name}/post/route.ts                  # POST new record
/api/admin/{name}/put/[id]/route.ts              # PUT to update a specific record
/api/admin/{name}/delete/[id]/route.ts           # DELETE a specific record
```

### Import Convention

Use absolute imports from the `src` directory without including `src` in the import path:

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

### Benefits

- **DRY Principle**: Eliminates code duplication across API routes
- **Maintainability**: Changes to business logic only need to be made in one place
- **Consistency**: Ensures uniform behavior across all API endpoints
- **Scalability**: Provides a clear, structured approach for new API endpoints
- **Import Simplicity**: Uses clean, absolute imports from the src root

### Example Pattern

```typescript
// In your API route file
import { someHandler } from '@/handlers/someHandler';

export async function GET(request: NextRequest) {
  try {
    // Extract and validate parameters
    // ...

    // Call the appropriate handler
    const result = await someHandler(params);

    // Format and return response
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Handle errors appropriately
  }
}
```

### Enforcement

This is a mandatory requirement for all API implementations in this project. When applying OpenSpec changes to create API routes, always ensure handlers are used instead of duplicating logic and follow the specified folder structure and import conventions.