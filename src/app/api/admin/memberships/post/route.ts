import { NextRequest } from "next/server";
import { postHandler } from "@/handlers/postHandlers";
import { errorResponse } from "@/utils/response";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { createMembershipSchema } from "@/lib/validation/membershipValidate";
import { ZodError } from "zod";

// POST /api/admin/memberships/post
export async function POST(request: NextRequest) {
  // Apply rate limiting for POST requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 10 requests per window
    message: "Too many requests to create memberships, please try again later.",
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const body = await request.json();

    // Validate the input data using Zod schema
    const validatedData = createMembershipSchema.parse(body);

    // Build the payload with proper field names mapping to database columns
    const postPayload = {
      ...validatedData,
    };

    return postHandler({
      table: "memberships",
      data: postPayload,
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
      message: "Error creating membership",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
