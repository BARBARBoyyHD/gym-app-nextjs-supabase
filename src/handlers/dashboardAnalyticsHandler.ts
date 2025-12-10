import { SupabaseClient } from "@supabase/supabase-js";
import { successResponse, errorResponse } from "@/utils/response";

export interface DashboardAnalyticsParams {
  dateFilterType?: "day" | "week" | "month" | "custom";
  startDate?: string;
  endDate?: string;
}

export interface DashboardAnalyticsData {
  totalMembers: number;
  activeMemberships: number;
  monthlyRevenue: number;
  newMembersThisMonth: number;
  expiredMemberships: number;
  totalCourses: number;
}

export async function dashboardAnalyticsHandler(
  client: SupabaseClient,
  params: DashboardAnalyticsParams = {}
): Promise<any> {
  try {
    // Process date parameters
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    // Determine date range based on filter type
    const now = new Date();

    if (params.dateFilterType) {
      // Apply date filtering only if a filter type is specified
      switch (params.dateFilterType) {
        case "day":
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
          break;
        case "week":
          const dayOfWeek = now.getDay();
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - dayOfWeek);
          startDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate());
          endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 7);
          break;
        case "month":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
          break;
        case "custom":
          if (params.startDate && params.endDate) {
            startDate = new Date(params.startDate);
            endDate = new Date(params.endDate);
            // Ensure endDate is inclusive
            endDate.setDate(endDate.getDate() + 1);
          } else {
            return errorResponse({
              success: false,
              status: 400,
              message: "Custom date range requires both startDate and endDate parameters",
            });
          }
          break;
        default:
          // Default to current month if no filter provided
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
          break;
      }
    } else {
      // If no filter is specified, return all-time metrics
      // We'll use a very early start date
      startDate = new Date(2000, 0, 1); // January 1, 2000 - representing "all time"
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1); // End of current month
    }

    // Format dates for Supabase queries (UTC)
    const startISO = startDate.toISOString();
    const endISO = endDate.toISOString();

    // Query total members - all time (not filtered by date range)
    const { count: totalMembersCount, error: totalMembersError } = await client
      .from("members")
      .select("*", { count: "exact" });

    if (totalMembersError) {
      console.error("Error fetching total members:", totalMembersError);
      throw new Error(`Error fetching total members: ${totalMembersError.message}`);
    }

    // Query active memberships - memberships that are currently active (not based on date range)
    // A membership is active if its status is 'active' and end_date is in the future
    const { count: activeMembershipsCount, error: activeMembershipsError } = await client
      .from("memberships")
      .select("*", { count: "exact" })
      .eq("status", "active")
      .gte("end_date", new Date().toISOString()); // Hasn't ended yet (end date is in the future)

    if (activeMembershipsError) {
      console.error("Error fetching active memberships:", activeMembershipsError);
      throw new Error(`Error fetching active memberships: ${activeMembershipsError.message}`);
    }

    // Query total revenue from payments in date range
    // Using ISO strings for date comparison
    console.log("Payment query - startISO:", startISO, "endISO:", endISO);

    const { data: paymentsData, error: paymentsError } = await client
      .from("payments")
      .select("amount, paid_at")
      .gte("paid_at", startISO)
      .lt("paid_at", endISO);

    if (paymentsError) {
      console.error("Error fetching payments:", paymentsError);
      throw new Error(`Error fetching payments: ${paymentsError.message}`);
    }

    console.log("Payment query result:", paymentsData);

    // Calculate revenue, ensuring amount is treated as a number
    const monthlyRevenue = paymentsData?.reduce((sum, payment) => {
      // Ensure payment.amount is a number, handling both string and number values
      const amount = typeof payment.amount === 'string' ? parseFloat(payment.amount) : Number(payment.amount);
      console.log("Processing payment amount:", payment.amount, "Parsed:", amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0) || 0;

    console.log("Calculated monthlyRevenue:", monthlyRevenue);

    // Query new members in date range
    const { count: newMembersCount, error: newMembersError } = await client
      .from("members")
      .select("*", { count: "exact" })
      .gte("created_at", startISO)
      .lt("created_at", endISO);

    if (newMembersError) {
      console.error("Error fetching new members:", newMembersError);
      throw new Error(`Error fetching new members: ${newMembersError.message}`);
    }

    // Query expired memberships - memberships that are expired (not based on date range)
    // A membership is expired if its status is 'expired'
    const { count: expiredMembershipsCount, error: expiredMembershipsError } = await client
      .from("memberships")
      .select("*", { count: "exact" })
      .eq("status", "expired");

    if (expiredMembershipsError) {
      console.error("Error fetching expired memberships:", expiredMembershipsError);
      throw new Error(`Error fetching expired memberships: ${expiredMembershipsError.message}`);
    }

    // Query total courses
    const { count: totalCoursesCount, error: totalCoursesError } = await client
      .from("courses")
      .select("*", { count: "exact" });

    if (totalCoursesError) {
      console.error("Error fetching courses:", totalCoursesError);
      throw new Error(`Error fetching courses: ${totalCoursesError.message}`);
    }

    // Prepare the result
    const result: DashboardAnalyticsData = {
      totalMembers: totalMembersCount || 0,
      activeMemberships: activeMembershipsCount || 0,
      monthlyRevenue,
      newMembersThisMonth: newMembersCount || 0,
      expiredMemberships: expiredMembershipsCount || 0,
      totalCourses: totalCoursesCount || 0,
    };

    return successResponse({
      success: true,
      status: 200,
      message: "Dashboard analytics retrieved successfully",
      data: result,
    });
  } catch (error: unknown) {
    console.error("Dashboard analytics handler error:", error);
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: `Dashboard analytics error: ${error.message}`,
      });
    }
    return errorResponse({
      success: false,
      status: 500,
      message: "An unknown error occurred during dashboard analytics request",
    });
  }
}