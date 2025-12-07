import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSingleHandler } from "@/handlers/getHandlers";
import { errorResponse } from "@/utils/response";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";

// GET /api/admin/memberships/get/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for GET requests - allow more requests as these are read-only
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: "Too many requests to view membership, please try again later.",
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
        message: "Membership ID is required",
      });
    }

    return await getSingleHandler({
      table: "memberships", // Supabase table name
      column:
        "id, member_id:members(id,full_name), plan_id:membership_plans(id, name), start_date, end_date, status, created_at",

      id,
      client,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: "Error retrieving membership",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
