"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import {
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  RefreshCw,
  Calendar as CalendarIcon
} from "lucide-react";
import { MetricCard } from "@/components/admin/dashboard/MetricCard";
import { RecentActivity } from "@/components/admin/dashboard/RecentActivity";


// Define date filter type
type DateFilterType = "day" | "week" | "month" | "custom";

// Define the type for recent activity
interface RecentActivityItem {
  id: string;
  type: "member" | "payment" | "membership";
  title: string;
  time: string;
  amount?: number;
}

export default function DashboardLayout() {
  const [refreshing, setRefreshing] = useState(false);
  const [dateFilterType, setDateFilterType] = useState<DateFilterType | null>("month");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Build query parameters based on selected date filter
  const queryParams: Record<string, string> = {};
  if (dateFilterType) {
    queryParams.dateFilterType = dateFilterType as string;
  }
  if (dateFilterType === "custom" && startDate && endDate) {
    queryParams.startDate = startDate;
    queryParams.endDate = endDate;
  }

  // Fetch dashboard analytics data
  const {
    data: analyticsData,
    isLoading: analyticsLoading,
    isError: analyticsError,
    refetch: refetchAnalytics
  } = useAnalyticsData(queryParams);

  // Generate recent activity (this would normally come from an API)
  const recentActivity: RecentActivityItem[] = [
    {
      id: "1",
      type: "member",
      title: "John Smith joined",
      time: "2 minutes ago",
    },
    {
      id: "2",
      type: "payment",
      title: "Payment received",
      time: "15 minutes ago",
      amount: 99.99,
    },
    {
      id: "3",
      type: "membership",
      title: "Anna Johnson renewed membership",
      time: "1 hour ago",
    },
    {
      id: "4",
      type: "payment",
      title: "Payment received",
      time: "2 hours ago",
      amount: 79.99,
    },
    {
      id: "5",
      type: "member",
      title: "Robert Davis joined",
      time: "3 hours ago",
    },
  ];

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetchAnalytics();
    setRefreshing(false);
  };

  // Handle date filter change
  const handleDateFilterChange = (filterType: DateFilterType | null) => {
    setDateFilterType(filterType);
    if (filterType !== "custom") {
      setStartDate("");
      setEndDate("");
    }
  };

  // Show error state
  if (analyticsError) {
    return (
      <div className="p-6 bg-dark-secondary rounded-xl border border-brand/30">
        <div className="text-center p-8">
          <h2 className="text-xl font-bold text-white mb-2">Error Loading Dashboard Data</h2>
          <p className="text-white/70 mb-4">Failed to load dashboard metrics</p>
          <Button
            onClick={() => refetchAnalytics()}
            className="bg-brand hover:bg-brand/90 text-black"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-dark-secondary rounded-xl border border-brand/30" role="main" aria-label="Admin Dashboard">
      {/* Dashboard Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" role="banner">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-white/70">Overview of gym management metrics</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Date Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
            {(["day", "week", "month"] as DateFilterType[]).map((filter) => (
              <Button
                key={filter}
                variant={dateFilterType === filter ? "default" : "outline"}
                className={dateFilterType === filter
                  ? "bg-brand hover:bg-brand/90 text-black"
                  : "border-white/20 text-white hover:bg-white/10"
                }
                onClick={() => handleDateFilterChange(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
            <Button
              variant={dateFilterType === null ? "default" : "outline"}
              className={dateFilterType === null
                ? "bg-brand hover:bg-brand/90 text-black"
                : "border-white/20 text-white hover:bg-white/10"
              }
              onClick={() => handleDateFilterChange(null)}
            >
              All Time
            </Button>
            <Button
              variant={dateFilterType === "custom" ? "default" : "outline"}
              className={dateFilterType === "custom"
                ? "bg-brand hover:bg-brand/90 text-black"
                : "border-white/20 text-white hover:bg-white/10"
              }
              onClick={() => handleDateFilterChange("custom")}
            >
              Custom
            </Button>
          </div>

          {/* Custom Date Range Inputs */}
          {dateFilterType === "custom" && (
            <div className="flex gap-2 items-center">
              <div className="flex items-center">
                <label htmlFor="startDate" className="mr-2 text-white/70 text-sm">From:</label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-dark-tertiary border border-white/20 rounded px-2 py-1 text-white text-sm"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="endDate" className="mr-2 text-white/70 text-sm">To:</label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-dark-tertiary border border-white/20 rounded px-2 py-1 text-white text-sm"
                />
              </div>
            </div>
          )}

          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={handleRefresh}
            disabled={refreshing}
            aria-label={refreshing ? "Refreshing data" : "Refresh dashboard data"}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <section aria-label="Key Metrics Overview" className="mb-8">
        <div
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Total Members Card */}
          <div role="listitem">
            <MetricCard
              title="Total Members"
              value={analyticsData?.data?.totalMembers || 0}
              icon={<Users className="h-5 w-5 text-brand" />}
              description={dateFilterType ? "Total members up to selected date" : "All Time Total"}
              isLoading={analyticsLoading}
              aria-label="Total Members metric card"
            />
          </div>

          {/* Active Memberships Card */}
          <div role="listitem">
            <MetricCard
              title="Active Memberships"
              value={analyticsData?.data?.activeMemberships || 0}
              icon={<TrendingUp className="h-5 w-5 text-brand" />}
              description="Currently active memberships"
              isLoading={analyticsLoading}
              aria-label="Active Memberships metric card"
            />
          </div>

          {/* Monthly Revenue Card */}
          <div role="listitem">
            <MetricCard
              title="Monthly Revenue"
              value={`$${(analyticsData?.data?.monthlyRevenue || 0).toFixed(2)}`}
              icon={<DollarSign className="h-5 w-5 text-brand" />}
              description="Revenue in selected period"
              isLoading={analyticsLoading}
              aria-label="Monthly Revenue metric card"
            />
          </div>

          {/* New This Month Card */}
          <div role="listitem">
            <MetricCard
              title="New This Period"
              value={analyticsData?.data?.newMembersThisMonth || 0}
              icon={<Calendar className="h-5 w-5 text-brand" />}
              description="New members in selected period"
              isLoading={analyticsLoading}
              aria-label="New This Period metric card"
            />
          </div>

          {/* Expired Memberships Card */}
          <div role="listitem">
            <MetricCard
              title="Expired Memberships"
              value={analyticsData?.data?.expiredMemberships || 0}
              icon={<CalendarIcon className="h-5 w-5 text-brand" />}
              description="Memberships that expired in period"
              isLoading={analyticsLoading}
              aria-label="Expired Memberships metric card"
            />
          </div>

          {/* Total Courses Card */}
          <div role="listitem">
            <MetricCard
              title="Total Courses"
              value={analyticsData?.data?.totalCourses || 0}
              icon={<CalendarIcon className="h-5 w-5 text-brand" />}
              description="Total courses offered"
              isLoading={analyticsLoading}
              aria-label="Total Courses metric card"
            />
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity
            activities={recentActivity}
            isLoading={analyticsLoading}
          />
        </div>

        <div>
          {/* Additional metrics or graph could go here */}
          <section aria-label="Gym Overview Metrics">
            <Card className="bg-dark-secondary border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-white">Gym Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div role="article">
                    <h3 className="text-white/70 text-sm mb-1">Member Retention Rate</h3>
                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand rounded-full"
                        style={{ width: "85%" }}
                        aria-valuenow={85}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        role="progressbar"
                        aria-label="Member retention rate percentage"
                      ></div>
                    </div>
                    <p className="text-white/70 text-xs mt-1">85% active memberships</p>
                  </div>
                  <div role="article">
                    <h3 className="text-white/70 text-sm mb-1">Most Popular Plan</h3>
                    <p className="text-white">Annual Membership</p>
                  </div>
                  <div role="article">
                    <h3 className="text-white/70 text-sm mb-1">Average Monthly Growth</h3>
                    <p className="text-white">12 new members</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
