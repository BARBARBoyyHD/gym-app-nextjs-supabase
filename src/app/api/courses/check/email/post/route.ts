import type { CheckEmailAccessCourseSchema } from "@/lib/validation/coursesValidate";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Define the interface for the request body
interface CourseAccessRequestBody {
  email: string;
  courseId?: string; // Optional: if checking access for a specific course
  courseCategory?: string; // Optional: if checking access based on course category
}

// Define the interfaces for the Supabase response objects
interface MembershipPlan {
  id: number;
  name: string;
}

interface Membership {
  id: string;
  member_id: string;
  status: string;
  plan_id: MembershipPlan;
}

interface Member {
  id: string;
  email: string;
}

// POST /api/courses/check/email/post
export async function POST(request: NextRequest) {
  // Apply rate limiting for POST requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 100 requests per window
    message:
      "Too many requests to check course access, please try again later.",
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const supabase = await createClient();
    const requestBody: CourseAccessRequestBody = await request.json();

    // Validate the email
    const validatedData: CheckEmailAccessCourseSchema = {
      email: requestBody.email,
    };

    // Check if the user exists
    const { data: findEmails, error: findEmailError } = await supabase
      .from("members")
      .select("id,email")
      .eq("email", validatedData.email)
      .single();

    if (findEmailError || !findEmails) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Email not found",
      });
    }

    // Check the user's membership
    const { data: findMemberships, error: findMembershipError } = await supabase
      .from("memberships")
      .select("id,member_id,status,plan_id:membership_plans(id,name)") // Reference membership_plans table with specific fields
      .eq("member_id", findEmails.id)
      .single();

    if (findMembershipError || !findMemberships) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Membership not found",
      });
    }

    // Type assertion to handle the foreign key relationship properly
    const planIdData = Array.isArray(findMemberships.plan_id)
      ? findMemberships.plan_id[0]
      : findMemberships.plan_id as MembershipPlan;

    // Ensure planIdData is properly typed as MembershipPlan
    const membershipPlan: MembershipPlan = planIdData as MembershipPlan;

    // Check if the membership is active
    if (findMemberships.status !== 'active') {
      return errorResponse({
        success: false,
        status: 403,
        message: "Access denied: Membership is not active",
      });
    }

    // Check if the plan name contains "Bronze" - Bronze plan members don't have access to specific courses
    if (membershipPlan.name && membershipPlan.name.toLowerCase().includes("bronze")) {
      return errorResponse({
        success: false,
        status: 403,
        message: "Access denied: Bronze plan members do not have access to premium courses",
      });
    }

    // If checking access for a specific course, we might need additional logic based on course requirements
    // For now, we'll return success for non-Bronze plan members with active memberships
    return successResponse({
      success: true,
      status: 200,
      message: "Email has access to the course",
      data: {
        email: findEmails.email,
        id: findEmails.id,
        activeMembership: {
          id: findMemberships.id,
          member_id: findMemberships.member_id,
          status: findMemberships.status,
          plan_id: membershipPlan
        },
        // Return all memberships for potential future use
        allMemberships: [findMemberships]
      }
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
