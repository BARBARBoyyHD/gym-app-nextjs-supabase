import { errorResponse } from "@/utils/response";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";
import { getHandler } from "@/handlers/getHandlers";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { requireAdmin } from "@/lib/auth-utils";

export async function GET(req: NextRequest) {
  // Apply rate limiting for GET requests - allow more requests as these are read-only
  const rateLimitResult = await checkRateLimit(req, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests to view courses, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  // Check if the user is an admin (not required for viewing courses, but we'll still verify)
  const adminCheck = await requireAdmin();
  if (adminCheck) {
    // For GET requests that don't modify data, we can allow non-admins with appropriate permissions
    // But for consistency with other admin-only APIs, we'll require admin access
    return adminCheck;
  }

  try {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url); // Extract URL search parameters

    // Extracting search and pagination/sort parameters
    const search = searchParams.get("search") || undefined;
    const page = parseInt(searchParams.get("page") || "1"); // Default to page 1
    const limit = parseInt(searchParams.get("limit") || "10"); // Default to 10 items

    // Extracting optional sort parameters
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

    // No email parameter was provided, use regular getHandler
    return await getHandler({
      table: "courses",
      column: "*",
      client: supabase,
      // Pass the new parameters to getHandler
      search: search,
      // Define the columns you want to search against
      searchColumns: ["title", "description", "instructor", "category"],
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }
    return errorResponse({
      success: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
}