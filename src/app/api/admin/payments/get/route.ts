import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getHandler } from '@/handlers/getHandlers';
import { errorResponse } from '@/utils/response';
import { checkRateLimit } from '@/middleware/rate-limit-middleware';

// GET /api/admin/payments/get
export async function GET(request: NextRequest) {
  // Apply rate limiting for GET requests - allow more requests as these are read-only
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per window
    message: 'Too many requests to list payments, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return errorResponse({
        success: false,
        status: 401,
        message: "User not authenticated",
      });
    }

    // Extract query parameters for pagination, search, etc.
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const search = searchParams.get('search') || undefined;
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc';

    // Using the generic getHandler to fetch payments
    return await getHandler({
      table: 'payments', // Supabase table name
      column: 'id,member_id,members(id,full_name),membership_id,memberships(id,plan_id,membership_plans(id,name)),amount,method,paid_at,created_at',
      client: supabase,
      search,
      searchColumns: ['status', 'method', 'transaction_id'], // Columns to search against
      page,
      limit,
      sortBy,
      sortOrder,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: 'Error retrieving payments',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}