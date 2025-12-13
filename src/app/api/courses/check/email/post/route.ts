import type { CheckEmailAccessCourseSchema } from "@/lib/validation/coursesValidate";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/courses/check/email/post
export async function POST(request: NextRequest) {
  // Apply rate limiting for POST requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 100 requests per window
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

    const {data: findEmails, error: findEmailError} = await supabase
    .from("members")
    .select("id,email")
    .eq("email", validatedData.email)
    .limit(1); // Use limit(1) instead of single() to avoid coercion error

    if (findEmailError) {
      return errorResponse({
        success: false,
        status: 500,
        message: "Error checking membership access",
        error: findEmailError.message,
      });
    }

    if (!findEmails || findEmails.length === 0) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Email not found",
      });
    }

    const findEmail = findEmails[0];

    const {data: findMembershipsArray, error: findMembershipsError} = await supabase
    .from("memberships")
    .select("id,member_id,status,plan_id:membership_plans(id, name)")
    .eq("member_id", findEmail.id);

    if (findMembershipsError) {
      return errorResponse({
        success: false,
        status: 500,
        message: "Error checking membership access",
        error: findMembershipsError.message,
      });
    }

    if (!findMembershipsArray || findMembershipsArray.length === 0) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Membership not found",
      });
    }

    // Find the active membership, or just use the first one if no active is found
    type Membership = {
      id: string;
      member_id: string;
      status: 'active' | 'expired' | 'cancelled' | 'pending';
      plan_id: Array<{
        id: number;
        name: string;
      }> | null;
    };

    const activeMembership = findMembershipsArray.find((membership: Membership) => membership.status === 'active') || findMembershipsArray[0];
    const findMemberships = activeMembership;

    // Check if plan name contains "Bronze" (case-insensitive)
    // Note: From the query, plan_id is an array of objects with id and name due to RLS
    if (!findMemberships.plan_id || findMemberships.plan_id.length === 0 || !findMemberships.plan_id[0]?.name) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Membership plan not found or invalid",
      });
    }

    const planName = findMemberships.plan_id[0].name;
    const lowerCasePlanName = planName.toLowerCase();
    const hasBronzePlan = lowerCasePlanName.includes("bronze");

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
        activeMembership: {
          id: findMemberships.id,
          member_id: findMemberships.member_id,
          status: findMemberships.status,
          plan_id: findMemberships.plan_id
        },
        allMemberships: findMembershipsArray
      },
    });
  } catch (error) {
    console.error("Error checking membership access:", error);
    return errorResponse({
      success: false,
      status: 500,
      message: "Error checking membership access",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}