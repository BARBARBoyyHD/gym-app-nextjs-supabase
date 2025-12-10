import { errorResponse } from "@/utils/response";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";

export async function GET(req: NextRequest) {
  // Apply rate limiting for GET requests - allow more requests as these are read-only
  const rateLimitResult = await checkRateLimit(req, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per window
    message: 'Too many requests to view courses, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url); // Extract URL search parameters

    // Extracting search parameters
    const search = searchParams.get("search") || undefined;

    // Check if we need to group by category
    const groupByCategory = searchParams.get("groupByCategory") === "true";

    if (groupByCategory) {
      // Fetch all courses and group them by category
      let query = supabase
        .from("courses")
        .select("id, title, description, category, created_at", {
          count: "exact",
          head: false
        });

      // Apply search filter if provided
      if (search) {
        query = query.or(
          `title.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%`
        );
      }

      const { data, error, count } = await query;

      if (error) {
        return errorResponse({
          success: false,
          status: 500,
          message: error.message,
        });
      }

      // Group courses by category
      const groupedCourses: Record<string, typeof data> = {};
      data.forEach(course => {
        if (!groupedCourses[course.category]) {
          groupedCourses[course.category] = [];
        }
        groupedCourses[course.category].push(course);
      });

      return new Response(
        JSON.stringify({
          success: true,
          data: groupedCourses,
          total_count: count,
          grouped_by: "category",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Fetch courses without grouping (standard pagination)
      const page = parseInt(searchParams.get("page") || "1"); // Default to page 1
      const limit = parseInt(searchParams.get("limit") || "10"); // Default to 10 items

      // Extracting optional sort parameters
      const sortBy = searchParams.get("sortBy") || "created_at";
      const sortOrder =
        (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

      // Calculate offset for pagination
      const offset = (page - 1) * limit;

      // Build query
      let query = supabase
        .from("courses")
        .select("id, title, description, category, created_at", {
          count: "exact",
          head: false
        })
        .range(offset, offset + limit - 1)
        .order(sortBy, { ascending: sortOrder === "asc" });

      // Apply search filter if provided
      if (search) {
        query = query.or(
          `title.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%`
        );
      }

      const { data, error, count } = await query;

      if (error) {
        return errorResponse({
          success: false,
          status: 500,
          message: error.message,
        });
      }

      return new Response(
        JSON.stringify({
          success: true,
          data: data,
          total_count: count,
          page: page,
          limit: limit,
          total_pages: Math.ceil((count || 0) / limit),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
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