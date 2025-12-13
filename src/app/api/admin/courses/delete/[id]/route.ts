import { deleteHandler } from "@/handlers/deleteHandlers";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // Apply rate limiting for DELETE requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 DELETE requests per window
    message: 'Too many requests to delete courses, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    return deleteHandler({
      table: "courses",
      id,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: "Error deleting course",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}