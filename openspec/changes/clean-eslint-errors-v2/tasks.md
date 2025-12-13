# Tasks: Clean ESLint Warnings and Errors - V2

## 1. Replace HTML links with Next.js Link components
- [x] Location: `src/components/Navbar.tsx` line 18
- [x] Location: `src/components/auth/LoginComponents.tsx` line 45
- [x] Issue: Direct `<a>` elements used for internal navigation
- [x] Solution: Import and use `<Link />` from `next/link` instead

## 2. Fix unescaped entities in components
- [x] Location: `src/app/contact/page.tsx` line 19
- [x] Location: `src/components/admin/members/modal/AddMemberModal.tsx` line 119
- [x] Location: `src/components/admin/members/modal/EditMemberModal.tsx` lines 204 (two occurrences)
- [x] Location: `src/components/admin/membership-plans/modal/AddMembershipModal.tsx` line 117
- [x] Location: `src/components/admin/membership-plans/modal/EditMembershipModal.tsx` line 215 (two occurrences)
- [x] Location: `src/components/admin/memberships/modal/AddMembershipModal.tsx` line 176
- [x] Location: `src/components/auth/LoginComponents.tsx` line 97
- [x] Location: `src/components/section/Contact.tsx` line 19
- [x] Location: `src/components/section/Facility.tsx` line 29
- [x] Location: `src/components/section/GetStarted.tsx` line 45
- [x] Location: `src/components/section/GroupTraining.tsx` line 32
- [x] Location: `src/components/section/Testimony.tsx` lines 27, 29, 32, 40, 42, 45, 53, 55, 58 (multiple quote characters)
- [x] Issue: Unescaped apostrophes or quotes in JSX text
- [x] Solution: Replace with appropriate HTML entities (`&apos;`, `&quot;`, etc.)

## 3. Remove unused imports and variables
- Location: `src/app/api/admin/members/post/route.ts` line 33 - `formattedErrors`
- Location: `src/app/api/admin/membership-plan/delete/[id]/route.ts` line 2 - `successResponse`
- Location: `src/app/api/admin/membership-plan/put/[id]/route.ts` line 2 - `successResponse`
- Location: `src/app/api/admin/payments/delete/[id]/route.ts` line 2 - `successResponse`
- Location: `src/components/admin/courses/CourseListComponents.tsx` line 23 - `Course`
- Location: `src/components/admin/courses/modal/DeleteCourseModal.tsx` line 6 - `Course`
- Location: `src/components/admin/courses/modal/EditCourseModal.tsx` line 25 - `isLoading`
- Location: `src/components/admin/members/modal/AddMemberModal.tsx` lines 17, 45, 46, 47 - `Members`, `isCreatePending`, `isCreateError`, `createError`
- Location: `src/components/admin/members/modal/EditMemberModal.tsx` lines 45, 50, 51, 52 - `router`, `isUpdatePending`, `isUpdateError`, `updateError`
- Location: `src/components/admin/membership-plans/MembershipPlansListComponents.tsx` lines 4, 18, 46, 47, 48, 105 - various unused imports
- Location: `src/components/admin/membership-plans/modal/EditMembershipModal.tsx` lines 4, 29, 57, 58, 59, 150 - various unused imports
- Location: `src/components/admin/memberships/modal/AddMembershipModal.tsx` lines 68, 85, 86 - `formData.member_id`, `isCreateError`, `createError`
- Location: `src/components/admin/payments/PaymentListComponents.tsx` line 23 - `Payment`
- Location: `src/components/admin/payments/modal/AddPaymentModal.tsx` lines 12, 19, 38, 38 - `Membership`, `PaymentFormSchema`, `plansData`, `plansLoading`
- Location: `src/components/admin/payments/modal/EditPaymentModal.tsx` lines 8, 19, 29 - `toast`, `PaymentFormSchema`, `queryClient`
- Location: `src/components/admin/payments/table/PaymentTableComponents.tsx` lines 5, 6, 7 - `Payment`, `Members`, `MembershipPlan`
- Location: `src/lib/rate-limiter.ts` line 28 - `windowStart`
- Location: `src/middleware/api-auth-middleware.ts` line 8 - `request`
- Location: `src/types/memberInput.ts` line 1 - `BaseInput`
- Location: `src/types/membership.ts` line 1 - `BaseInput`
- Location: `src/types/payment.ts` lines 2, 3 - `Members`, `MembershipPlan`
- Location: `src/utils/response.ts` line 3 - `ZodIssue`
- Location: `src/utils/validation.ts` line 14 - `ValidationRule`
- Issue: Various unused imports and variables
- Solution: Remove the unused imports and variables

## 4. Fix react-hooks/set-state-in-effect errors
- Location: `src/components/admin/members/modal/EditMemberModal.tsx` line 71
- Location: `src/components/admin/membership-plans/modal/EditMembershipModal.tsx` line 78
- Location: `src/components/admin/memberships/modal/AddMembershipModal.tsx` line 63
- Issue: setState functions called synchronously within effects
- Solution: Check if the values have changed before setting the new state

## 5. Address @typescript-eslint/no-explicit-any errors
- Location: `src/components/admin/courses/CourseListComponents.tsx` lines 79, 80
- Location: `src/components/admin/members/MemberListComponents.tsx` lines 74, 93
- Location: `src/components/admin/membership-plans/modal/EditMembershipModal.tsx` line 128
- Location: `src/components/admin/payments/PaymentListComponents.tsx` line 70
- Location: `src/components/admin/payments/modal/AddPaymentModal.tsx` line 45
- Issue: Use of 'any' type which reduces type safety
- Solution: Replace with appropriate specific types

## 6. Fix react-hooks/purity errors
- Location: `src/components/ui/sidebar.tsx` line 611
- Issue: Use of impure function Math.random() during render
- Solution: Move the randomization out of the render function or memoize it properly