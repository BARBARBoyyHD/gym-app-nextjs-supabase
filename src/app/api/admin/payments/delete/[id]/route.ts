import { NextRequest } from "next/server";
import { errorResponse } from "@/utils/response";
import { deleteHandler } from "@/handlers/deleteHandlers";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { createClient } from "@/lib/supabase/server";

// DELETE /api/admin/payments/delete/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for DELETE requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 DELETE requests per window
    message: 'Too many requests to delete payments, please try again later.'
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

    return deleteHandler({
      table: "payments",
      id,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: "Error deleting payment",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}