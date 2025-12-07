import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSingleHandler } from '@/handlers/getHandlers';
import { errorResponse } from '@/utils/response';
import { checkRateLimit } from '@/middleware/rate-limit-middleware';

// GET /api/admin/membership-plan/get/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for GET requests - allow more requests as these are read-only
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per window
    message: 'Too many requests to view membership plan, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const client = await createClient();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Validate the ID parameter
    if (!id) {
      return errorResponse({
        success: false,
        status: 400,
        message: 'Membership plan ID is required',
      });
    }

    return await getSingleHandler({
      table: 'membership_plans', // Supabase table name
      column: 'id,name,description,price,duration_day,created_at',
      id,
      client,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: 'Error retrieving membership plan',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}