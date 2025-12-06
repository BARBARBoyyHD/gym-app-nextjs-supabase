import { errorResponse } from "@/utils/response";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";
import { getHandler } from "@/handlers/getHandlers";

export async function GET(req: NextRequest) {
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
      table: "payments",
      column: "*",
      client: supabase,
      // Pass the new parameters to getHandler
      search: search,
      // Define the columns you want to search against
      searchColumns: ["transaction_id", "status", "payment_method"],
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