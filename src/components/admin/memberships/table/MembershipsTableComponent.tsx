"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Membership } from "@/types/membership";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<
  Membership & {
    member_id: { id: string; full_name: string } | string;
    plan_id: { id: string; name: string } | string;
  }
>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div className="font-medium text-white">{id.substring(0, 8)}...</div>
      );
    },
  },
  {
    accessorKey: "member_id",
    header: "Member",
    cell: ({ row }) => {
      const member = row.getValue("member_id");
      const memberName =
        typeof member === "object" && member !== null && "full_name" in member
          ? (member as { full_name: string }).full_name
          : "N/A";

      return <div className="text-white">{memberName}</div>;
    },
  },
  {
    accessorKey: "plan_id",
    header: "Plan",
    cell: ({ row }) => {
      const plan = row.getValue("plan_id");
      const planName =
        typeof plan === "object" && plan !== null && "name" in plan
          ? (plan as { name: string }).name
          : "N/A";
      return <div className="text-white">{planName}</div>;
    },
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      const start_date = row.getValue("start_date") as string;
      const date = new Date(start_date);
      return (
        <div className="text-white">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      const end_date = row.getValue("end_date") as string;
      const date = new Date(end_date);
      return (
        <div className="text-white">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let statusColor = "text-green-500";

      if (status === "expired") {
        statusColor = "text-red-500";
      } else if (status === "cancelled") {
        statusColor = "text-gray-500";
      } else if (status === "pending") {
        statusColor = "text-yellow-500";
      }

      return (
        <div className={`text-white ${statusColor}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const membership = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(membership.id)}
            >
              Copy Membership ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
