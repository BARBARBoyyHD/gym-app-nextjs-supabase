# Dashboard Analytics API Design

## Architecture Overview
The dashboard analytics API will provide aggregated metrics about gym operations with date range filtering. It will leverage the existing handler pattern and integrate with Supabase for data retrieval.

## Technical Components

### 1. Handler Layer: `dashboardAnalyticsHandler.ts`
This will be the core business logic layer that performs data aggregation and metric calculations.

Key responsibilities:
- Query Supabase tables for members, memberships, and payments
- Filter data based on date range parameters
- Calculate metrics as specified in requirements
- Format response according to API standards
- Handle errors appropriately

### 2. API Route: `/api/admin/dashboard/analytics`
This will be the endpoint that exposes the dashboard analytics functionality.

Key responsibilities:
- Validate request parameters (date ranges)
- Extract query parameters from request URL
- Call the dashboard analytics handler
- Format and return the response or error

### 3. Response Structure
The API will return a consistent response structure:

```typescript
interface DashboardAnalyticsResponse {
  success: boolean;
  status: number;
  data: {
    totalMembers: number;
    activeMemberships: number;
    monthlyRevenue: number;
    newMembersThisMonth: number;
    expiredMemberships: number;
    totalCourses: number;
  };
  message: string;
}
```

### 4. Date Range Implementation
The API will support the following date range filters:
- `dateFilterType`: "day", "week", "month", or "custom"
- For "custom", additional parameters: `startDate` and `endDate`

## Supabase Query Logic

### Total Members
```sql
SELECT COUNT(*) FROM members WHERE created_at >= :start_date AND created_at <= :end_date
```

### Active Memberships
```sql
SELECT COUNT(*) FROM memberships WHERE status = 'active' AND start_date <= :end_date AND end_date >= :start_date
```

### Monthly Revenue
```sql
SELECT SUM(amount) FROM payments WHERE paid_at >= :start_date AND paid_at <= :end_date
```

### New Members This Month
```sql
SELECT COUNT(*) FROM members WHERE created_at >= :start_date AND created_at <= :end_date
```

### Expired Memberships
```sql
SELECT COUNT(*) FROM memberships WHERE status = 'expired' AND end_date >= :start_date AND end_date <= :end_date
```

## Error Handling
- Handle database connection errors
- Handle invalid date parameters
- Follow existing error response format
- Log errors appropriately for debugging

## Security Considerations
- Ensure only admin users can access the endpoint
- Validate and sanitize all input parameters
- Implement proper Supabase RLS checks
- Follow existing authentication patterns

## Performance Considerations
- Use efficient database queries with proper indexing
- Consider caching for frequently accessed data
- Optimize query performance for large datasets
- Implement pagination if needed for very large data sets