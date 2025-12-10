import { errorResponse } from "@/utils/response";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply rate limiting for GET requests
  const rateLimitResult = await checkRateLimit(req, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per window
    message: 'Too many requests to view course details, please try again later.'
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();
    const courseId = params.id;

    // Fetch the specific course by ID
    const { data, error } = await supabase
      .from("courses")
      .select("id, title, description, category, created_at")
      .eq("id", courseId)
      .single();

    if (error) {
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }

    if (!data) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Course not found",
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
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