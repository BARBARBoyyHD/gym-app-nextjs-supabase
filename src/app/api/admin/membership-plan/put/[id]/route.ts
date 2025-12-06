import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";
import { putHandler } from "@/handlers/putHandlers";
import { requireAuth } from "@/lib/auth-utils";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for PUT requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per window (updates might be more frequent)
    message: "Too many requests to update membership plans, please try again later.",
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
    const { name, description, price, duration, features, isActive } = await request.json();

    return putHandler({
      table: "membership_plans",
      id: id,
      message: "Membership plan updated successfully",
      data: {
        name,
        description,
        price,
        duration,
        features,
        is_active: isActive,
      },
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: "Error updating membership plan",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}