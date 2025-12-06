import { getSingleHandler } from "@/handlers/getHandlers";
import { createClient } from "@/lib/supabase/server";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { requireAdmin } from "@/lib/auth-utils";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // Apply rate limiting for GET requests - allow more requests as these are read-only
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests to view course, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  // Check if the user is an admin
  const adminCheck = await requireAdmin();
  if (adminCheck) {
    return adminCheck;
  }

  try {
    const supabase = await createClient();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Get a specific course by ID
    return getSingleHandler({
      table: "courses",
      column: "*",  // Including all relevant columns
      id: id,
      client: supabase,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: "Error retrieving course",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}