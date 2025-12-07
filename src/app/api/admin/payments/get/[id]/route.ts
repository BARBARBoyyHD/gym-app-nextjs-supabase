import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSingleHandler } from '@/handlers/getHandlers';
import { errorResponse } from '@/utils/response';
import { checkRateLimit } from '@/middleware/rate-limit-middleware';

// GET /api/admin/payments/get/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for GET requests - allow more requests as these are read-only
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests to view payment, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Check if user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return errorResponse({
        success: false,
        status: 401,
        message: "User not authenticated",
      });
    }

    // Validate the ID parameter
    if (!id) {
      return errorResponse({
        success: false,
        status: 400,
        message: 'Payment ID is required',
      });
    }

    return await getSingleHandler({
      table: 'payments', // Supabase table name
      column: 'id, member_id, plan_id, amount, currency, status, transaction_id, method, created_at, updated_at',
      id,
      client: supabase,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: 'Error retrieving payment',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}