import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";
import { putHandler } from "@/handlers/putHandlers";
import { updateMembershipPlanSchema } from "@/lib/validation/membershipPlansValidate";
import { ZodError } from "zod";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for PUT requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 20 requests per window (updates might be more frequent)
    message: "Too many requests to update membership plans, please try again later.",
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Validate the ID parameter
    if (!id) {
      return errorResponse({
        success: false,
        status: 400,
        message: 'Membership plan ID is required',
      });
    }

    // Basic UUID validation

    const {
      name,
      description,
      price,
      duration_day,

    } = await request.json();

    // Validate the input data using Zod schema for updates
    const validatedUpdateData = updateMembershipPlanSchema.parse({
      name,
      description,
      price,
      duration_day,

    });

    // Build update payload
    const updatePayload: Record<string, unknown> = {};
    if (validatedUpdateData.name !== undefined) updatePayload.name = validatedUpdateData.name;
    if (validatedUpdateData.description !== undefined) updatePayload.description = validatedUpdateData.description;
    if (validatedUpdateData.price !== undefined) updatePayload.price = validatedUpdateData.price;
    if (validatedUpdateData.duration_day !== undefined) updatePayload.duration_day = validatedUpdateData.duration_day; // Map duration to duration_day for DB
 
    return putHandler({
      table: "membership_plans",
      id: id,
      data: updatePayload,
      message: "Membership plan updated successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      // Handle Zod validation errors with prettier messages
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
      message: "Error updating membership plan",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}