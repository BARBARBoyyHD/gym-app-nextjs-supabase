import { createClient } from "@/lib/supabase/server";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { checkRateLimit, RateLimitConfig } from "@/middleware/rate-limit-middleware";

// Rate limiting configuration for sign-up endpoint (moderately restrictive)
const signUpRateLimitConfig: RateLimitConfig = {
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 registration attempts per hour to prevent spam
  message: 'Too many registration attempts from this IP, please try again later.'
};

export async function POST(req: NextRequest) {
  // Apply rate limiting for sign-up attempts
  const rateLimitResult = await checkRateLimit(req, signUpRateLimitConfig);
  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();
    const { email, password } = await req.json();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'member' // Set default role as member
        }
      }
    });

    if (error) {
      return errorResponse({
        success: false,
        status: error.status || 500,
        message: "User registration failed",
        error: error.message,
      });
    }

    return successResponse({
      success: true,
      status: 200,
      message: "User registered successfully",
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: "An unknown error occurred during registration.",
        error: error.message,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "An unknown error occurred during registration.",
      error: "Internal Server Error",
    });
  }
}
