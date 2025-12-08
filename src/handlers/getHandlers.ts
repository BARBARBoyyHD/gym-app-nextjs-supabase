import { errorResponse, successResponse } from "@/utils/response";
import { SupabaseClient } from "@supabase/supabase-js";

// handler/getHandler.ts

interface GetHandlerProps {
  table: string;
  column: string;
  id?: string;
  client: SupabaseClient;

  // New optional properties for search and pagination/sorting
  search?: string; // The search term
  searchColumns?: string[]; // Columns to search against (e.g., ['author', 'publisher', 'title'])
  page?: number;
  limit?: number;
  sortBy?: string; // Column to sort by
  sortOrder?: "asc" | "desc"; // Sort order
}

// handler/getHandler.ts
// ... (imports and interface definition from above)

export async function getHandler({
  table,
  column,
  client,
  search,
  searchColumns,
  page,
  limit,
  sortBy = "created_at",
  sortOrder = "desc",
}: GetHandlerProps) {
  try {
    let query = client.from(table).select(column || "*");

    // Apply search if provided
    if (search && searchColumns && searchColumns.length > 0) {
      // Build a condition string to search across multiple columns
      const conditions = searchColumns
        .map((col) => {
          // convert members(full_name) → members.full_name
          const formatted = col.replace(/\((.*)\)/, ".$1");
          return `${formatted}.ilike.%${search}%`;
        })
        .join(",");

      query = query.or(conditions);
    }

    // Apply ordering
    query = query.order(sortBy, { ascending: sortOrder === "asc" });

    // Apply pagination if both page and limit are provided
    if (page !== undefined && limit !== undefined) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Supabase query failed for table '${table}':`, error);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      return successResponse({
        success: true,
        status: 200,
        message: "No records found",
        data: [],
      });
    }

    return successResponse({
      success: true,
      status: 200,
      message: "Success",
      data: data,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Supabase/PostgREST Error:", error.message);
      return errorResponse({
        success: false,
        status: 500,
        message: `Error retrieving ${table}: ${error.message}`,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "An unknown error occurred during database operation.",
    });
  }
}

export async function getSingleHandler({
  table,
  column,
  id,
  client,
}: GetHandlerProps) {
  try {
    const { data, error } = await client
      .from(table)
      .select(column || "*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(
        `Supabase error retrieving single record from ${table} with id ${id}:`,
        error
      );
      // Differentiate between "not found" and other errors
      if (
        error.code === "PGRST116" ||
        error.message.includes("Row not found")
      ) {
        return errorResponse({
          success: false,
          status: 404,
          message: "Data not found",
        });
      } else {
        // Return the actual error for other issues (like RLS policies, permissions, etc.)
        return errorResponse({
          success: false,
          status: 500,
          message: `Database error: ${error.message}`,
        });
      }
    }

    if (!data) {
      console.warn(
        `No data returned for ${table} with id ${id}, but no error occurred`
      );
      return errorResponse({
        success: false,
        status: 404,
        message: "Data not found",
      });
    }

    return successResponse({
      success: true,
      status: 200,
      message: "Success",
      data,
    });
  } catch (error: unknown) {
    console.error(
      `Unexpected error retrieving single record from ${table} with id ${id}:`,
      error
    );
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
      message: "An unexpected error occurred",
    });
  }
}
