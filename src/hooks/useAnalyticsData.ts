"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DashboardAnalyticsData } from "@/handlers/dashboardAnalyticsHandler";

export interface AnalyticsResponse {
  success: boolean;
  status: number;
  data: DashboardAnalyticsData;
  message: string;
}

// Custom hook for analytics data
export const useAnalyticsData = (
  params: Record<string, string>
): UseQueryResult<AnalyticsResponse, Error> => {
  return useQuery({
    queryKey: ["dashboard-analytics", params],
    queryFn: async () => {
      // Build query string from params
      const queryString = new URLSearchParams(params).toString();
      const url = `/api/admin/dashboard/analytics?${queryString}`;

      const response = await fetch(url, { method: "GET" });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch analytics data");
      }

      return data;
    },
  });
};