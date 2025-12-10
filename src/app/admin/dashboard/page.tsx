"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/use-Fetch";
import { Members } from "@/types/member";
import { Membership } from "@/types/membership";
import { Payment } from "@/types/payment";
import {
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { MetricCard } from "@/components/admin/dashboard/MetricCard";
import {
  RecentActivity,
  type RecentActivityItem,
} from "@/components/admin/dashboard/RecentActivity";

// Define types for dashboard metrics
interface DashboardMetrics {
  totalMembers: number;
  activeMemberships: number;
  monthlyRevenue: number;
  newMembersThisMonth: number;
}

// Define the type for recent activity
interface RecentActivityItem {
  id: string;
  type: "member" | "payment" | "membership";
  title: string;
  time: string;
  amount?: number;
}

export default function DashboardPage() {
  const [refreshing, setRefreshing] = useState(false);

  // Fetch members data
  const {
    data: membersData,
    isLoading: membersLoading,
    isError: membersError,
    refetch: refetchMembers,
  } = useGetData<Members>({
    endpoint: "/api/admin/members/get",
    queryKeyBase: "dashboard-members",
    params: { limit: 1000 }, // Get all members for count
  });

  // Fetch memberships data
  const {
    data: membershipsData,
    isLoading: membershipsLoading,
    isError: membershipsError,
    refetch: refetchMemberships,
  } = useGetData<Membership>({
    endpoint: "/api/admin/memberships/get",
    queryKeyBase: "dashboard-memberships",
    params: { limit: 1000 }, // Get all memberships for count
  });

  // Fetch payments data
  const {
    data: paymentsData,
    isLoading: paymentsLoading,
    isError: paymentsError,
    refetch: refetchPayments,
  } = useGetData<Payment>({
    endpoint: "/api/admin/payments/get",
    queryKeyBase: "dashboard-payments",
    params: { limit: 1000 }, // Get all payments for revenue
  });

  // Calculate dashboard metrics
  const totalMembers = membersData?.total_count || 0;
  const totalMemberships = membershipsData?.data?.length || 0;
  const activeMemberships =
    membershipsData?.data?.filter((m: any) => m.status === "active").length ||
    0;

  const monthlyRevenue =
    paymentsData?.data?.reduce((sum: number, payment: any) => {
      // Assuming we only want payments from current month
      const paymentDate = new Date(payment.paid_at);
      const now = new Date();
      if (
        paymentDate.getMonth() === now.getMonth() &&
        paymentDate.getFullYear() === now.getFullYear()
      ) {
        return sum + payment.amount;
      }
      return sum;
    }, 0) || 0;

  // Calculate new members this month
  const newMembersThisMonth =
    membersData?.data?.filter((member: any) => {
      const memberDate = new Date(member.created_at);
      const now = new Date();
      return (
        memberDate.getMonth() === now.getMonth() &&
        memberDate.getFullYear() === now.getFullYear()
      );
    }).length || 0;

  // Combine all loading states
  const isLoading = membersLoading || membershipsLoading || paymentsLoading;
  const isError = membersError || membershipsError || paymentsError;

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
    await Promise.all([
      refetchMembers(),
      refetchMemberships(),
      refetchPayments(),
    ]);
    setRefreshing(false);
  };

  // Show error state
  if (isError) {
    return (
      <div className="m-6 p-6 bg-dark-secondary rounded-xl border border-brand/30">
        <div className="text-center p-8">
          <h2 className="text-xl font-bold text-white mb-2">
            Error Loading Dashboard Data
          </h2>
          <p className="text-white/70 mb-4">Failed to load dashboard metrics</p>
          <Button
            onClick={() => {
              refetchMembers();
              refetchMemberships();
              refetchPayments();
            }}
            className="bg-brand hover:bg-brand/90 text-black"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="m-6 p-6 bg-dark-secondary rounded-xl border border-brand/30"
      role="main"
      aria-label="Admin Dashboard"
    >
      {/* Dashboard Header */}
      <div className="mb-8 flex justify-between items-center" role="banner">
        <div>
          <h1 className="text-2xl font-bold" aria-level="1">
            Dashboard
          </h1>
          <p className="text-white/70">Overview of gym management metrics</p>
        </div>
        <Button
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
          onClick={handleRefresh}
          disabled={refreshing}
          aria-label={refreshing ? "Refreshing data" : "Refresh dashboard data"}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {/* Stats Grid */}
      <section aria-label="Key Metrics Overview" className="mb-8">
        <div
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Total Members Card */}
          <div role="listitem">
            <MetricCard
              title="Total Members"
              value={totalMembers}
              icon={<Users className="h-5 w-5 text-brand" />}
              description={`+${newMembersThisMonth} this month`}
              isLoading={membersLoading}
              aria-label="Total Members metric card"
            />
          </div>

          {/* Active Memberships Card */}
          <div role="listitem">
            <MetricCard
              title="Active Memberships"
              value={activeMemberships}
              icon={<TrendingUp className="h-5 w-5 text-brand" />}
              description={`of ${totalMemberships} total`}
              isLoading={membershipsLoading}
              aria-label="Active Memberships metric card"
            />
          </div>

          {/* Monthly Revenue Card */}
          <div role="listitem">
            <MetricCard
              title="Monthly Revenue"
              value={`$${monthlyRevenue.toFixed(2)}`}
              icon={<DollarSign className="h-5 w-5 text-brand" />}
              description={`from ${paymentsData?.data?.length || 0} payments`}
              isLoading={paymentsLoading}
              aria-label="Monthly Revenue metric card"
            />
          </div>

          {/* New This Month Card */}
          <div role="listitem">
            <MetricCard
              title="New This Month"
              value={newMembersThisMonth}
              icon={<Calendar className="h-5 w-5 text-brand" />}
              description={`+${(
                (newMembersThisMonth / (totalMembers || 1)) *
                100
              ).toFixed(1)}% of total`}
              isLoading={membersLoading}
              aria-label="New This Month metric card"
            />
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity
            activities={recentActivity}
            isLoading={membersLoading || membershipsLoading || paymentsLoading}
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
                    <h3 className="text-white/70 text-sm mb-1">
                      Member Retention Rate
                    </h3>
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
                    <p className="text-white/70 text-xs mt-1">
                      85% active memberships
                    </p>
                  </div>
                  <div role="article">
                    <h3 className="text-white/70 text-sm mb-1">
                      Most Popular Plan
                    </h3>
                    <p className="text-white">Annual Membership</p>
                  </div>
                  <div role="article">
                    <h3 className="text-white/70 text-sm mb-1">
                      Average Monthly Growth
                    </h3>
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
