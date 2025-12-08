import { NextRequest } from "next/server";
import { errorResponse } from "@/utils/response";
import { deleteHandler } from "@/handlers/deleteHandlers";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for DELETE requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 DELETE requests per window
    message: 'Too many requests to delete membership plans, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
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

    return deleteHandler({
      table: "membership_plans",
      id,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: "Error deleting membership plan",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}