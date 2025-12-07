import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getHandler } from '@/handlers/getHandlers';
import { errorResponse } from '@/utils/response';
import { checkRateLimit } from '@/middleware/rate-limit-middleware';

// GET /api/admin/memberships/get
export async function GET(request: NextRequest) {
  // Apply rate limiting for GET requests - allow more requests as these are read-only
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests to list memberships, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const client = await createClient();

    // Extract query parameters for pagination, search, etc.
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const search = searchParams.get('search') || undefined;
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc';

    // Using the generic getHandler to fetch memberships
    return await getHandler({
      table: 'memberships', // Supabase table name
      column: 'id, member_id:members(id, full_name), plan_id:membership_plans(id, name), start_date, end_date, status, created_at', 
      client,
      search,
      searchColumns: ['status'], // Columns to search against
      page,
      limit,
      sortBy,
      sortOrder,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: 'Error retrieving memberships',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}