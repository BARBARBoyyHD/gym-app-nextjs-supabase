# Tasks: Add Payment API and Course API

## Phase 1: Payment API Implementation
- [x] Create payment API route directory structure:
  - [x] `src/app/api/admin/payments/get/route.ts`
  - [x] `src/app/api/admin/payments/get/[id]/route.ts`
  - [x] `src/app/api/admin/payments/post/route.ts`
  - [x] `src/app/api/admin/payments/put/[id]/route.ts`
  - [x] `src/app/api/admin/payments/delete/[id]/route.ts`
- [x] Implement payment POST handler in `src/handlers/postHandlers.ts`
- [x] Implement payment GET handler in `src/handlers/getHandlers.ts`
- [x] Implement payment PUT handler in `src/handlers/putHandlers.ts`
- [x] Implement payment DELETE handler in `src/handlers/deleteHandlers.ts`

## Phase 2: Course API Implementation
- [x] Create course API route directory structure:
  - [x] `src/app/api/admin/courses/get/route.ts`
  - [x] `src/app/api/admin/courses/get/[id]/route.ts`
  - [x] `src/app/api/admin/courses/post/route.ts`
  - [x] `src/app/api/admin/courses/put/[id]/route.ts`
  - [x] `src/app/api/admin/courses/delete/[id]/route.ts`
- [x] Implement course POST handler in `src/handlers/postHandlers.ts`
- [x] Implement course GET handler in `src/handlers/getHandlers.ts`
- [x] Implement course PUT handler in `src/handlers/putHandlers.ts`
- [x] Implement course DELETE handler in `src/handlers/deleteHandlers.ts`

## Phase 3: Documentation Updates
- [ ] Update `openspec/project.md` to include new endpoints
- [ ] Ensure all handlers follow the existing OpenSpec API Development Guidelines

## Phase 4: Validation
- [ ] Test all payment API endpoints manually
- [ ] Test all course API endpoints manually
- [ ] Verify proper authentication/authorization
- [ ] Validate that all endpoints return proper responses