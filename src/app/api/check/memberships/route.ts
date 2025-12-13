import type { CheckEmailAccessCourseSchema } from "@/lib/validation/coursesValidate";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/check/memberships
export async function POST(request: NextRequest) {
  // Apply rate limiting for POST requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per window
    message:
      "Too many requests to check membership access, please try again later.",
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

    const { data: findEmails, error: findEmailError } = await supabase
      .from("members")
      .select("id,email")
      .eq("email", validatedData.email)
      .limit(1); // Limit to one result to avoid coercion error

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
        error: "Email not found",
      });
    }

    const findEmail = findEmails[0];

    // Get the most recent membership for the member (regardless of status)
    const { data: findMemberships, error: findMembershipsError } = await supabase
      .from("memberships")
      .select(
        "id,member_id,status,plan_id:membership_plans(id, name),start_date,end_date"
      )
      .eq("member_id", findEmail.id)
      .order("end_date", { ascending: false }) // Order by end date (most recent/expiring first)
      .limit(1); // Get only the first result

    if (findMembershipsError) {
      return errorResponse({
        success: false,
        status: 500,
        message: "Error checking membership access",
        error: findMembershipsError.message,
      });
    }

    // Get the first membership (or null if none exist)
    const membership = findMemberships && findMemberships.length > 0 ? findMemberships[0] : null;

    return successResponse({
      success: true,
      status: 200,
      message: "Membership check successful",
      data: {
        id: findEmail.id,
        email: findEmail.email,
        start_date: membership?.start_date || null,
        end_date: membership?.end_date || null,
        status: membership?.status || "inactive",
        plan: membership?.plan_id || null,
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
