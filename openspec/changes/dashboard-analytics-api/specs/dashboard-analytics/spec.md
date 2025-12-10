# Dashboard Analytics API

## ADDED Requirements

### Requirement: Dashboard Analytics Endpoint
The system MUST provide an analytics endpoint at `/api/admin/dashboard/analytics` that returns key metrics for gym administration.

#### Scenario: Admin requests dashboard analytics data
- **WHEN** an authenticated admin user makes a GET request to `/api/admin/dashboard/analytics`
- **THEN** the system returns a response with key metrics including total members, active memberships, monthly revenue, new members this month, expired memberships, and total courses
- **AND** the response follows the standard response format with success, status, data, and message fields

### Requirement: Date Range Filtering
The system MUST support date range filtering for dashboard analytics data.

#### Scenario: Admin filters dashboard data by date range
- **WHEN** an admin user makes a request to `/api/admin/dashboard/analytics` with date filter parameters
- **THEN** the system returns metrics calculated within the specified date range
- **AND** the system supports filtering by day, week, month, or custom date range
- **AND** the date parameters must be valid ISO 8601 date strings

### Requirement: Total Members Count
The system MUST return the total count of members in the specified date range.

#### Scenario: Get total members
- **WHEN** the system processes a dashboard analytics request
- **THEN** it includes in the response data the total number of members
- **AND** for custom date ranges, it counts only members created within that range

### Requirement: Active Memberships Count
The system MUST return the count of active memberships in the specified date range.

#### Scenario: Get active memberships
- **WHEN** the system processes a dashboard analytics request
- **THEN** it includes in the response data the total number of active memberships
- **AND** a membership is considered active if its start date is before or during the range and its end date is after or during the range

### Requirement: Monthly Revenue Calculation
The system MUST return the total revenue from payments in the specified date range.

#### Scenario: Get monthly revenue
- **WHEN** the system processes a dashboard analytics request
- **THEN** it includes in the response data the total revenue from payments
- **AND** payments are included based on their paid_at date falling within the specified range

### Requirement: New Members This Month Count
The system MUST return the count of new members added within the specified date range.

#### Scenario: Get new members this month
- **WHEN** the system processes a dashboard analytics request
- **THEN** it includes in the response data the count of new members who joined
- **AND** a member is counted as "new" if their created_at date falls within the specified range

### Requirement: Expired Memberships Count
The system MUST return the count of expired memberships in the specified date range.

#### Scenario: Get expired memberships
- **WHEN** the system processes a dashboard analytics request
- **THEN** it includes in the response data the count of expired memberships
- **AND** a membership is considered expired if its status is 'expired' and its end date falls within the specified range

### Requirement: Total Courses Count
The system MUST return the total count of courses in the specified date range.

#### Scenario: Get total courses
- **WHEN** the system processes a dashboard analytics request
- **THEN** it includes in the response data the total number of courses
- **AND** for custom date ranges, it counts only courses created within that range

### Requirement: Dashboard Analytics Response Format
The system MUST return the dashboard analytics data in a consistent response format.

#### Scenario: Dashboard analytics response
- **WHEN** the system processes a dashboard analytics request
- **THEN** it returns a response with the following structure:
```
{
  "success": boolean,
  "status": number,
  "data": {
    "totalMembers": number,
    "activeMemberships": number,
    "monthlyRevenue": number,
    "newMembersThisMonth": number,
    "expiredMemberships": number,
    "totalCourses": number
  },
  "message": string
}
```

### Requirement: Error Handling for Dashboard Analytics
The system MUST handle errors appropriately for the dashboard analytics endpoint.

#### Scenario: Dashboard analytics API error
- **WHEN** an error occurs during dashboard analytics data retrieval
- **THEN** the system returns an error response with success=false and an appropriate status code
- **AND** the response follows the standard error format

### Requirement: Authentication for Dashboard Analytics
The system MUST require authentication for accessing dashboard analytics.

#### Scenario: Unauthenticated dashboard analytics request
- **WHEN** an unauthenticated user requests dashboard analytics
- **THEN** the system returns a 401 Unauthorized response
- **AND** no analytics data is returned