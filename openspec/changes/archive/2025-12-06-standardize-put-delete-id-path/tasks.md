# Tasks: Standardize PUT and DELETE Routes to Use ID in URL Path

## Phase 1: Update PUT Routes
- [x] Update courses PUT route from `/api/admin/courses/put/route.ts` to `/api/admin/courses/put/[id]/route.ts`
- [x] Update payments PUT route from `/api/admin/payments/put/route.ts` to `/api/admin/payments/put/[id]/route.ts`
- [x] Verify membership-plan PUT route at `/api/admin/membership-plan/put/[id]/route.ts` is correctly implemented
- [x] Update any other PUT routes that don't follow the pattern

## Phase 2: Update DELETE Routes
- [x] Update courses DELETE route from `/api/admin/courses/delete/route.ts` to `/api/admin/courses/delete/[id]/route.ts`
- [x] Update payments DELETE route from `/api/admin/payments/delete/route.ts` to `/api/admin/payments/delete/[id]/route.ts`
- [x] Update membership-plan DELETE route from `/api/admin/membership-plan/delete/route.ts` to `/api/admin/membership-plan/delete/[id]/route.ts`
- [x] Verify members DELETE route at `/api/admin/members/delete/[id]/route.ts` is correctly implemented

## Phase 3: Update Documentation
- [x] Update API structure guidelines to reflect new patterns
- [x] Update OpenSpec API guidelines
- [x] Update main project documentation (QWEN.md)
- [x] Update any other documentation referencing the old patterns

## Phase 4: Validation
- [x] Test all updated PUT routes to ensure they work with ID in URL path
- [x] Test all updated DELETE routes to ensure they work with ID in URL path
- [x] Verify all authentication and middleware work correctly with new patterns
- [x] Confirm handlers function properly with ID from URL parameters