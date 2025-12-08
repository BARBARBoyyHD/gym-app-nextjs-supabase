import { postHandler } from "@/handlers/postHandlers";
import { memberSchema } from "@/lib/validation/membersValidate";
import { errorResponse } from "@/utils/response";
import { ZodError } from "zod";
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";

// Handler for creating a new member
export async function POST(request: NextRequest) {
  // Apply rate limiting for POST requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per window
    message: "Too many requests to create members, please try again later.",
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const rawData = await request.json();

    // Validate the input data using Zod schema
    const validatedData = memberSchema.parse(rawData);

    return postHandler({
      table: "members", // Changed to 'users' table since members are stored there
      data: validatedData,
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
      message: "Error creating member",
    });
  }
}
