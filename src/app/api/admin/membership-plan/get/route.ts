import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getHandler } from '@/handlers/getHandlers';
import { errorResponse } from '@/utils/response';
import { checkRateLimit } from '@/middleware/rate-limit-middleware';

// GET /api/admin/membership-plan/get
export async function GET(request: NextRequest) {
  // Apply rate limiting for GET requests - allow more requests as these are read-only
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests to list membership plans, please try again later.'
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

    // Using the generic getHandler to fetch membership plans
    return await getHandler({
      table: 'membership_plans', // Supabase table name
      column: 'id,name,description,price,duration_day,created_at',
      client,
      search,
      searchColumns: ['name', 'description'], // Columns to search against
      page,
      limit,
      sortBy,
      sortOrder,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: 'Error retrieving membership plans',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}