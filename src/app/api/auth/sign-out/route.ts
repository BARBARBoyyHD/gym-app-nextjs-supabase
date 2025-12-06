import { createClient } from "@/lib/supabase/server";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { checkRateLimit, RateLimitConfig } from "@/middleware/rate-limit-middleware";

// Rate limiting configuration for sign-out endpoint (less restrictive but still limiting abusive behavior)
const signOutRateLimitConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 sign-out attempts per window (high since this is less sensitive)
  message: 'Too many sign-out attempts from this IP, please try again later.'
};

export async function POST(req: NextRequest) {
  // Apply rate limiting for sign-out attempts
  const rateLimitResult = await checkRateLimit(req, signOutRateLimitConfig);
  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return errorResponse({
        success: false,
        status: error.status || 500,
        message: "User sign-out failed",
        error: error.message,
      });
    }

    return successResponse({
      success: true,
      status: 200,
      message: "User signed out successfully",
      data: null,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: "An unknown error occurred during sign-out.",
        error: error.message,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "An unknown error occurred during sign-out.",
      error: "Internal Server Error",
    });
  }
}