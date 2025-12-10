import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  isLoading?: boolean;
  change?: string;
  changeType?: "positive" | "negative";
  "aria-label"?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  description,
  isLoading = false,
  change,
  changeType,
  "aria-label": ariaLabel
}) => {
  return (
    <Card
      className="bg-dark-secondary border-white/20 hover:border-brand/50 transition-colors"
      aria-label={ariaLabel || title}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-white/70">{title}</CardTitle>
        <span className="sr-only">{title} icon</span>
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div role="status" aria-live="polite">
            <Skeleton className="h-8 w-24 bg-white/20" />
          </div>
        ) : (
          <div className="text-2xl font-bold text-white" aria-label={`${title} value`}>
            {value}
          </div>
        )}
        {description && !isLoading && (
          <p className="text-xs text-white/50 mt-1" aria-label={`${title} description`}>
            {description}
          </p>
        )}
        {change && !isLoading && (
          <p
            className={`text-xs mt-1 ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}
            aria-label={`${title} change`}
          >
            {changeType === 'positive' ? '↑' : '↓'} {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};