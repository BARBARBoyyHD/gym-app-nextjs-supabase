import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  DollarSign,
  TrendingUp
} from "lucide-react";

// Define the type for recent activity
export interface RecentActivityItem {
  id: string;
  type: "member" | "payment" | "membership";
  title: string;
  time: string;
  amount?: number;
}

interface RecentActivityProps {
  activities: RecentActivityItem[];
  isLoading?: boolean;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  isLoading = false
}) => {
  if (isLoading) {
    // Render loading skeletons
    return (
      <Card
        className="bg-dark-secondary border-white/20"
        role="status"
        aria-live="polite"
        aria-label="Loading recent activity"
      >
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-start p-3 rounded-lg"
                aria-label="Loading activity item"
              >
                <div className="mr-4 mt-1">
                  <div className="p-2 rounded-full bg-white/20">
                    <div className="h-4 w-4 bg-white/20 rounded"></div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 w-3/4 bg-white/20 rounded mb-2"></div>
                  <div className="h-3 w-1/2 bg-white/20 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="bg-dark-secondary border-white/20"
      aria-label="Recent activity"
    >
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start p-3 rounded-lg hover:bg-white/5 transition-colors"
              role="listitem"
              aria-label={`${activity.type} activity: ${activity.title}`}
            >
              <div className="mr-4 mt-1" aria-label={`${activity.type} type indicator`}>
                <div
                  className={`p-2 rounded-full ${
                    activity.type === "member" ? "bg-blue-500/20" :
                    activity.type === "payment" ? "bg-green-500/20" : "bg-purple-500/20"
                  }`}
                >
                  {activity.type === "member" && (
                    <Users className="h-4 w-4 text-blue-400" aria-label="Member icon" />
                  )}
                  {activity.type === "payment" && (
                    <DollarSign className="h-4 w-4 text-green-400" aria-label="Payment icon" />
                  )}
                  {activity.type === "membership" && (
                    <TrendingUp className="h-4 w-4 text-purple-400" aria-label="Membership icon" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate" aria-label="Activity title">
                  {activity.title}
                </p>
                <p className="text-sm text-white/60 truncate" aria-label="Activity time">
                  {activity.time}
                  {activity.amount !== undefined && (
                    <span className="ml-2 text-green-400" aria-label={`Amount: ${activity.amount}`}>
                      +${activity.amount.toFixed(2)}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};