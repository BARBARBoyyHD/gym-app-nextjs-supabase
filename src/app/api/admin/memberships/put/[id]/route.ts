import { NextRequest } from "next/server";
import { putHandler } from "@/handlers/putHandlers";
import { errorResponse } from "@/utils/response";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { updateMembershipSchema } from "@/lib/validation/membershipValidate";
import { ZodError } from "zod";

// PUT /api/admin/memberships/put/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for PUT requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per window
    message: "Too many requests to update memberships, please try again later.",
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
        message: "Membership ID is required",
      });
    }

    // Check if ID is a valid UUID
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Invalid membership ID format",
      });
    }

    const { member_id, plan_id, start_date, end_date, status } =
      await request.json();

    // Validate the input data using Zod schema for updates
    const validatedUpdateData = updateMembershipSchema.parse({
      member_id,
      plan_id,
      start_date,
      end_date,
      status,
    });

    // Build update payload
    const updatePayload: Record<string, unknown> = {};
    if (validatedUpdateData.member_id !== undefined)
      updatePayload.member_id = validatedUpdateData.member_id;
    if (validatedUpdateData.plan_id !== undefined)
      updatePayload.plan_id = validatedUpdateData.plan_id;
    if (validatedUpdateData.start_date !== undefined)
      updatePayload.start_date = new Date(validatedUpdateData.start_date);
    if (validatedUpdateData.end_date !== undefined)
      updatePayload.end_date = new Date(validatedUpdateData.end_date);
    if (validatedUpdateData.status !== undefined)
      updatePayload.status = validatedUpdateData.status;

    return putHandler({
      table: "memberships",
      id: id,
      data: updatePayload,
      message: "Membership updated successfully",
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
      message: "Error updating membership",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
