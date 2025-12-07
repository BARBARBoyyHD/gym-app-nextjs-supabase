import { deleteHandler } from "@/handlers/deleteHandlers";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";

// DELETE /api/admin/memberships/delete/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for DELETE requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 5 DELETE requests per window (more restrictive for destructive operations)
    message: 'Too many requests to delete memberships, please try again later.'
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
        message: 'Membership ID is required',
      });
    }

    // Check if ID is a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return errorResponse({
        success: false,
        status: 400,
        message: 'Invalid membership ID format',
      });
    }

    return deleteHandler({
      table: "memberships",
      id,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: "Error deleting membership",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}