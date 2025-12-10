import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { errorResponse, successResponse } from "@/utils/response";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";

// POST /api/course/check/email/post
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
    const { email, courseId } = await request.json();

    // Validate required fields
    if (!email || !courseId) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Email and Course ID are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Invalid email format",
      });
    }

    // Validate courseId format (UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(courseId)) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Invalid course ID format",
      });
    }

    // Initialize Supabase client
    const supabase = await createClient();

    // First, check if the user with this email exists
    const { data: userData, error: userError } = await supabase
      .from("members")
      .select("id")
      .eq("email", email)
      .single();

    if (userError || !userData) {
      return errorResponse({
        success: false,
        status: 404,
        message: "User not found",
      });
    }

    // Get the user ID
    const userId = userData.id;

    // Check if the user has an active membership
    const { data: membershipData, error: membershipError } = await supabase
      .from("memberships")
      .select(`
        id,
        plan_id,
        start_date,
        end_date,
        status,
        membership_plans (
          id,
          name,
          course_access
        )
      `)
      .eq("member_id", userId)
      .eq("status", "active")
      .order("end_date", { ascending: false })
      .limit(1);

    if (membershipError || !membershipData || membershipData.length === 0) {
      return successResponse({
        success: true,
        status: 200,
        message: "User does not have an active membership",
        data: {
          hasAccess: false,
          reason: "no_active_membership"
        },
      });
    }

    const membership = membershipData[0];
    const membershipPlan = membership.membership_plans;

    // Verify the membership is still valid (not expired)
    const currentDate = new Date();
    const endDate = new Date(membership.end_date);
    
    if (currentDate > endDate) {
      return successResponse({
        success: true,
        status: 200,
        message: "Membership has expired",
        data: {
          hasAccess: false,
          reason: "membership_expired"
        },
      });
    }

    // Check if the course exists
    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("id, title")
      .eq("id", courseId)
      .single();

    if (courseError || !courseData) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Course not found",
      });
    }

    // Check if the membership plan includes access to this course
    // This assumes that course_access might be a boolean indicating if the plan provides access to all courses
    // or it could be an array of course IDs that the plan provides access to
    let hasAccess = false;
    let reason = "unknown";

    // If course_access is true, then the plan provides access to all courses
    if (membershipPlan.course_access === true) {
      hasAccess = true;
      reason = "plan_includes_all_courses";
    } else {
      // Check if the specific course is in the allowed courses list
      // For now, assuming course_access is a boolean - if false, no course access
      hasAccess = membershipPlan.course_access === true;
      reason = hasAccess ? "plan_includes_course" : "plan_does_not_include_course";
    }

    return successResponse({
      success: true,
      status: 200,
      message: hasAccess ? "Access granted" : "Access denied",
      data: {
        hasAccess,
        reason,
        user: {
          id: userId,
          email
        },
        course: {
          id: courseData.id,
          title: courseData.title
        },
        membership: {
          id: membership.id,
          plan: {
            id: membershipPlan.id,
            name: membershipPlan.name
          },
          status: membership.status,
          startDate: membership.start_date,
          endDate: membership.end_date,
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