import { NextRequest } from 'next/server';
import { putHandler } from '@/handlers/putHandlers';
import { errorResponse } from '@/utils/response';
import { checkRateLimit } from '@/middleware/rate-limit-middleware';
import { createClient } from '@/lib/supabase/server';
import { updatePaymentSchema } from '@/lib/validation/paymentValidate';
import { ZodError } from 'zod';

// PUT /api/admin/payments/put/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for PUT requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per window (updates might be more frequent)
    message: 'Too many requests to update payments, please try again later.',
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

    // Check if ID is a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return errorResponse({
        success: false,
        status: 400,
        message: 'Invalid payment ID format',
      });
    }

    const body = await request.json();

    // Validate the input data using Zod schema for updates
    const validatedUpdateData = updatePaymentSchema.parse(body);

    // Build update payload
    const updatePayload: Record<string, unknown> = {};
    if (validatedUpdateData.member_id !== undefined) updatePayload.member_id = validatedUpdateData.member_id;
    if (validatedUpdateData.plan_id !== undefined) updatePayload.plan_id = validatedUpdateData.plan_id;
    if (validatedUpdateData.amount !== undefined) updatePayload.amount = validatedUpdateData.amount;
    if (validatedUpdateData.currency !== undefined) updatePayload.currency = validatedUpdateData.currency;
    if (validatedUpdateData.status !== undefined) updatePayload.status = validatedUpdateData.status;
    if (validatedUpdateData.transaction_id !== undefined) updatePayload.transaction_id = validatedUpdateData.transaction_id;
    if (validatedUpdateData.method !== undefined) updatePayload.method = validatedUpdateData.method;

    return putHandler({
      table: 'payments',
      id: id,
      data: updatePayload,
      message: 'Payment updated successfully',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      // Handle Zod validation errors with prettier messages
      return errorResponse({
        success: false,
        status: 400,
        message: 'Validation failed',
        errors: error.issues,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: 'Error updating payment',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}