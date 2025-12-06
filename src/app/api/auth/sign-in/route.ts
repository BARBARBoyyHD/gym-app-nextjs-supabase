import { createClient } from "@/lib/supabase/server";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { checkRateLimit, RateLimitConfig } from "@/middleware/rate-limit-middleware";

// Rate limiting configuration for sign-in endpoint (more restrictive as it's sensitive to brute force)
const signInRateLimitConfig: RateLimitConfig = {
  windowMs: 1* 60 * 1000, // 1 minutes
  max: 5, // Limit each IP to 5 attempts per window for sign-in
  message: 'Too many login attempts from this IP, please try again later.'
};

export async function POST(req: NextRequest) {
  // Apply rate limiting for sign-in attempts
  const rateLimitResult = await checkRateLimit(req, signInRateLimitConfig);
  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();

    const { email, password } = await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return errorResponse({
        success: false,
        status: error.status || 500,
        message: "User login failed",
        error: error.message,
      });
    }

    return successResponse({
      success: true,
      status: 200,
      message: "User logged in successfully",
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: "An unknown error occurred during login.",
        error: error.message,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "An unknown error occurred during login.",
      error: "Internal Server Error",
    });
  }
}