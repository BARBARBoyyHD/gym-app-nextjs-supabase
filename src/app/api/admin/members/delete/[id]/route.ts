import { NextRequest, NextResponse } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";
import { createClient } from "@/lib/supabase/server";
import { deleteHandler } from "@/handlers/deleteHandlers";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { requireAuth } from "@/lib/auth-utils";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for DELETE requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 DELETE requests per window (more restrictive for destructive operations)
    message: 'Too many requests to delete members, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  // Check if the user is authenticated
  const authResult = await requireAuth();
  if (authResult) {
    return authResult;
  }

  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    return deleteHandler({
      table: "members",
      id: id,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: "Error deleting member",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
