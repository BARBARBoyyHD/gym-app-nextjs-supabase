
import { errorResponse } from "@/utils/response";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";
import { getHandler } from "@/handlers/getHandlers";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";

export async function GET(req: NextRequest) {
  // Apply rate limiting for GET requests - allow more requests as these are read-only
  const rateLimitResult = await checkRateLimit(req, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per window
    message: 'Too many requests to view members, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url); // Extract URL search parameters

    // Extracting search and pagination/sort parameters
    const search = searchParams.get("search") || undefined;
    const email = searchParams.get("email") || undefined; // Extract email parameter
    const page = parseInt(searchParams.get("page") || "1"); // Default to page 1
    const limit = parseInt(searchParams.get("limit") || "10"); // Default to 10 items

    // Extracting optional sort parameters
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

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
        // Email does not exist, continue with regular getHandler
        return await getHandler({
          table: "members",
          column: "id, full_name, email, phone",
          client: supabase,
          // Pass the new parameters to getHandler
          search: search,
          // Define the columns you want to search against
          // If the FK column in 'books' is 'author_id'
          searchColumns: ["full_name", "email", "phone"],
          page: page,
          limit: limit,
          sortBy: sortBy,
          sortOrder: sortOrder,
        });
      }
    } else {
      // No email parameter was provided, use regular getHandler
      return await getHandler({
        table: "members",
        column: "id, full_name, email, phone",
        client: supabase,
        // Pass the new parameters to getHandler
        search: search,
        // Define the columns you want to search against
        // If the FK column in 'books' is 'author_id'
        searchColumns: ["full_name", "email", "phone"],
        page: page,
        limit: limit,
        sortBy: sortBy,
        sortOrder: sortOrder,
      });
    }
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