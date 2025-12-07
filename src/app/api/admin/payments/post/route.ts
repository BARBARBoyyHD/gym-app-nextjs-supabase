import { NextRequest } from "next/server";
import { postHandler } from "@/handlers/postHandlers";
import { errorResponse } from "@/utils/response";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { createClient } from "@/lib/supabase/server";
import { createPaymentSchema } from "@/lib/validation/paymentValidate";
import { ZodError } from "zod";

// POST /api/admin/payments/post
export async function POST(request: NextRequest) {
  // Apply rate limiting for POST requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per window
    message: "Too many requests to create payments, please try again later.",
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return errorResponse({
        success: false,
        status: 401,
        message: "User not authenticated",
      });
    }

    const { member_id, membership_id, amount, method } = await request.json();

    // Validate the input data using Zod schema
    const validatedData = createPaymentSchema.parse({
      member_id,
      membership_id,
      amount,
      method,
    });

    // Build the payload with proper field names mapping to database columns
    const postPayload = {
      ...validatedData,
    };

    return postHandler({
      table: "payments",
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
      message: "Error creating payment",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
