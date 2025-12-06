import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";
import { putHandler } from "@/handlers/putHandlers";
import { updateCourseSchema } from "@/lib/validation/coursesValidate";
import { ZodError } from "zod";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { requireAuth } from "@/lib/auth-utils";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for PUT requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per window (updates might be more frequent)
    message: "Too many requests to update courses, please try again later.",
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  // Check if the user is authenticated
  const authResult = await requireAuth();
  if (authResult) {
    return authResult;
  }

  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const {
      title,
      description,
      instructor,
      duration,
      level,
      category,
      price,
      thumbnailUrl,
      videoUrl,
    } = await request.json();

    // Validate the update data using Zod schema for updates
    const validatedUpdateData = updateCourseSchema.parse({
      title,
      description,
      instructor,
      duration,
      level,
      category,
      price,
      thumbnailUrl,
      videoUrl,
    });

    // Build update payload
    const updatePayload: Record<string, unknown> = {};
    if (validatedUpdateData.title !== undefined) updatePayload.title = validatedUpdateData.title;
    if (validatedUpdateData.description !== undefined) updatePayload.description = validatedUpdateData.description;
    if (validatedUpdateData.instructor !== undefined) updatePayload.instructor = validatedUpdateData.instructor;
    if (validatedUpdateData.duration !== undefined) updatePayload.duration = validatedUpdateData.duration;
    if (validatedUpdateData.level !== undefined) updatePayload.level = validatedUpdateData.level;
    if (validatedUpdateData.category !== undefined) updatePayload.category = validatedUpdateData.category;
    if (validatedUpdateData.price !== undefined) updatePayload.price = validatedUpdateData.price;
    if (validatedUpdateData.thumbnailUrl !== undefined) updatePayload.thumbnail_url = validatedUpdateData.thumbnailUrl;
    if (validatedUpdateData.videoUrl !== undefined) updatePayload.video_url = validatedUpdateData.videoUrl;

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