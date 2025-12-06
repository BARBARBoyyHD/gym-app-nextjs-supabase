import { createClient } from "@/lib/supabase/server";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { checkRateLimit, RateLimitConfig } from "@/middleware/rate-limit-middleware";

// Rate limiting configuration for profile endpoints
const profileRateLimitConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 profile requests per window (both GET and PUT)
  message: 'Too many profile requests from this IP, please try again later.'
};

export async function GET(req: NextRequest) {
  // Apply rate limiting for profile GET requests
  const rateLimitResult = await checkRateLimit(req, profileRateLimitConfig);
  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return errorResponse({
        success: false,
        status: 401,
        message: "User not authenticated",
        error: userError?.message || "No user found",
      });
    }

    // Return user profile information
    return successResponse({
      success: true,
      status: 200,
      message: "User profile retrieved successfully",
      data: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: "An unknown error occurred while retrieving user profile.",
        error: error.message,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "An unknown error occurred while retrieving user profile.",
      error: "Internal Server Error",
    });
  }
}

export async function PUT(req: NextRequest) {
  // Apply rate limiting for profile PUT requests
  const rateLimitResult = await checkRateLimit(req, profileRateLimitConfig);
  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return errorResponse({
        success: false,
        status: 401,
        message: "User not authenticated",
        error: userError?.message || "No user found",
      });
    }

    const { full_name, ...userData } = await req.json();

    // Update user profile
    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name,
        ...userData
      }
    });

    if (error) {
      return errorResponse({
        success: false,
        status: error.status || 500,
        message: "Failed to update user profile",
        error: error.message,
      });
    }

    return successResponse({
      success: true,
      status: 200,
      message: "User profile updated successfully",
      data: {
        id: data.user.id,
        email: data.user.email,
        user_metadata: data.user.user_metadata,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: "An unknown error occurred while updating user profile.",
        error: error.message,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "An unknown error occurred while updating user profile.",
      error: "Internal Server Error",
    });
  }
}