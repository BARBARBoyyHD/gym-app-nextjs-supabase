# Change: Add Payment Modal and Table Following Members Structure

## Why
The gym app currently has a payments page but lacks the UI components to display and manage payments effectively. We need to implement a payment table and modal for creating/editing payments that follows the same structure as the members page to maintain consistency across the admin interface.

## What Changes
- Add a payment table to the payments page with filtering and pagination
- Implement a payment modal for creating and editing payments
- Ensure UI consistency with existing members and membership plans pages
- Add proper form validation for payment data

## Impact
- Affected specs: 
  - admin_members_ui (reference for UI structure)
  - membership_plans_ui (reference for modal structure)
  - payment-crud (API operations)
- Affected code: 
  - src/app/admin/payments/page.tsx (new UI implementation)
  - New modal component for payment creation/editing
  - New table component for payments display