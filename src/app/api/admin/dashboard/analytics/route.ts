import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { dashboardAnalyticsHandler } from "@/handlers/dashboardAnalyticsHandler";
import { errorResponse } from "@/utils/response";

export async function GET(request: NextRequest) {
  // Initialize Supabase client using the server-side client with proper authentication checks
  const supabase = await createClient();

  // Check if user is authenticated and has admin access
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return errorResponse({
      success: false,
      status: 401,
      message: "User not authenticated",
    });
  }

  // Check if user has admin role (you might have different role checking logic)
  // For now, we'll assume authenticated users can access this, but you may add role checks
  // const { data: userData } = await supabase
  //   .from('members')
  //   .select('role')
  //   .eq('id', user.id)
  //   .single();
  //
  // if (!userData || userData.role !== 'admin') {
  //   return errorResponse({
  //     success: false,
  //     status: 403,
  //     message: "Access forbidden: admin role required",
  //   });
  // }

  // Extract query parameters for date filtering
  const { searchParams } = new URL(request.url);
  const dateFilterTypeParam = searchParams.get("dateFilterType") as "day" | "week" | "month" | "custom" | null;
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  // Default to "month" filter if no filter type is specified
  const dateFilterType = dateFilterTypeParam || "month";

  // Validate date parameters if custom filter is used
  if (dateFilterType === "custom" && (!startDate || !endDate)) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Custom date range requires both startDate and endDate parameters",
    });
  }

  // Validate that dates are in valid format if provided
  if (startDate && isNaN(Date.parse(startDate))) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Invalid startDate format. Please provide a valid ISO date string.",
    });
  }

  if (endDate && isNaN(Date.parse(endDate))) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Invalid endDate format. Please provide a valid ISO date string.",
    });
  }

  // Prepare parameters object
  const params = {
    dateFilterType: dateFilterType,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  };

  // Call the dashboard analytics handler
  return await dashboardAnalyticsHandler(supabase, params);
}