import type { CheckEmailAccessCourseSchema } from "@/lib/validation/coursesValidate";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/courses/check/email/post
export async function POST(request: NextRequest) {
  // Apply rate limiting for POST requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: "Too many requests to check course access, please try again later.",
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();
    const { email } = await request.json();

    const validatedData: CheckEmailAccessCourseSchema = {
      email,
    };

    const {data: findEmail, error: findEmailError} = await supabase
    .from("members")
    .select("id,email")
    .eq("email", validatedData.email)
    .single();

    if (findEmailError) {
      return errorResponse({
        success: false,
        status: 500,
        message: "Error checking email access",
        error: findEmailError.message,
      });
    }

    if (!findEmail) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Email not found",
      });
    }

    const {data: findMemberships, error: findMembershipsError} = await supabase
    .from("memberships")
    .select("id,member_id,status,plan_id:membership_plans(id, name)")
    .eq("member_id", findEmail.id)
    .single();

    if (findMembershipsError) {
      return errorResponse({
        success: false,
        status: 500,
        message: "Error checking membership",
        error: findMembershipsError.message,
      });
    }

    if (!findMemberships) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Membership not found",
      });
    }

    // Check if plan name contains "Bronze" (case-insensitive)
    const planName = findMemberships.plan_id.name.toLowerCase();
    const hasBronzePlan = planName.includes("bronze");

    if (hasBronzePlan) {
      return errorResponse({
        success: false,
        status: 403,
        message: "Access denied: Bronze plan does not have course access",
      });
    }

    return successResponse({
      success: true,
      status: 200,
      message: "Email has access to the course",
      data: {
        id: findEmail.id,
        email: findEmail.email,
        memberships: {
          id: findMemberships.id,
          member_id: findMemberships.member_id,
          status: findMemberships.status,
          plan_id: findMemberships.plan_id
        }
      },
    });
  } catch (error) {
    console.error("Error checking course access:", error);
    return errorResponse({
      success: false,
      status: 500,
      message: "Error checking course access",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}