import { putHandler } from "@/handlers/putHandlers";
import { updateCourseSchema } from "@/lib/validation/coursesValidate";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for PUT requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per window
    message: "Too many requests to update courses, please try again later.",
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { title, description, category, video_embed_url } =
      await request.json();

    // Validate the update data using Zod schema for updates
    const validatedUpdateData = updateCourseSchema.parse({
      title,
      description,
      category,
      video_embed_url,
    });

    // Build update payload
    const updatePayload: Record<string, unknown> = {};
    if (validatedUpdateData.title !== undefined)
      updatePayload.title = validatedUpdateData.title;
    if (validatedUpdateData.description !== undefined)
      updatePayload.description = validatedUpdateData.description;
    if (validatedUpdateData.category !== undefined)
      updatePayload.category = validatedUpdateData.category;
    if (validatedUpdateData.video_embed_url !== undefined)
      updatePayload.video_url = validatedUpdateData.video_embed_url;

    return putHandler({
      table: "courses",
      id: id,
      data: updatePayload,
      message: "Course updated successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      // Handle Zod validation errors

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
      message: "Error updating course",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
