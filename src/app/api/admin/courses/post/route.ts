import { postHandler } from "@/handlers/postHandlers";
import { courseSchema } from "@/lib/validation/coursesValidate";
import { errorResponse } from "@/utils/response";
import { ZodError } from "zod";
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";

// Handler for creating a new course
export async function POST(request: NextRequest) {
  // Apply rate limiting for POST requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per window
    message: "Too many requests to create courses, please try again later.",
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const { title, description, category, video_embed_url } =
      await request.json();
    const validatedData = courseSchema.parse({
      title,
      description,
      category,
      video_embed_url,
    });
    const postPayload: Record<string, unknown> = {};
    if (validatedData.title !== undefined)
      postPayload.title = validatedData.title;
    if (validatedData.description !== undefined)
      postPayload.description = validatedData.description;
    if (validatedData.category !== undefined)
      postPayload.category = validatedData.category;
    if (validatedData.video_embed_url !== undefined)
      postPayload.video_url = validatedData.video_embed_url;

    return postHandler({
      table: "courses",
      data: postPayload,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Validation failed",
        errors: error.issues,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "Error creating course",
    });
  }
}
