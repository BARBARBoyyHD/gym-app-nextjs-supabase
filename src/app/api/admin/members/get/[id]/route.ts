import { getSingleHandler } from "@/handlers/getHandlers";
import { createClient } from "@/lib/supabase/server";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // Apply rate limiting for GET requests - allow more requests as these are read-only
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests to view member, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { searchParams } = new URL(request.url);

    // Extract email parameter from query
    const email = searchParams.get("email") || undefined;

    // If a specific email is provided, check if it already exists
    if (email) {
      const { data: existingMember, error: fetchError } = await supabase
        .from('members')
        .select('id, full_name, email, phone')
        .eq('email', email)
        .single(); // Use .single() to expect exactly one result

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is the code for "Row not found"
        // If there was an error other than "not found", return error
        return errorResponse({
          success: false,
          status: 500,
          message: fetchError.message,
        });
      }

      if (existingMember) {
        // Email already exists
        return errorResponse({
          success: false,
          status: 409, // 409 Conflict status code for email already exists
          message: "Email already exists",
        });
      } else {
        // Email does not exist, return success with empty data
        return successResponse({
          success: true,
          status: 200,
          message: "Email does not exist",
          data: null,
        });
      }
    }

    // Get a specific user by ID (original functionality)
    return getSingleHandler({
      table: "members",
      column: "id, full_name, email, phone",  // Including all relevant columns
      id: id,
      client: supabase,
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: "Error retrieving member",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}