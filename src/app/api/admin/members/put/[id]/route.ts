import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";
import { putHandler } from "@/handlers/putHandlers";
import { updateMemberSchema } from "@/lib/validation/membersValidate";
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
    message: "Too many requests to update members, please try again later.",
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
    const { full_name, email, phone } = await request.json();

    // Validate the input data using Zod schema for updates
    const validatedData = updateMemberSchema.parse({ full_name, email, phone });

    // Only include fields that are present in the request
    const updateData: Record<string, unknown> = {};
    if (validatedData.full_name !== undefined)
      updateData.full_name = validatedData.full_name;
    if (validatedData.email !== undefined)
      updateData.email = validatedData.email;
    if (validatedData.phone !== undefined)
      updateData.phone = validatedData.phone;

    // Proceed with update
    return putHandler({
      table: "members",
      id: id,
      data: updateData,
      message: "Member updated successfully",
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
      message: "Error updating member",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
