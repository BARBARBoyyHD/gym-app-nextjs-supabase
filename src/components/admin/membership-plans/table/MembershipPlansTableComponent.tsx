"use client";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";


// Define the type matching the API response
interface MembershipPlanRow {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration_day: number;
  created_at: string;
}

export const columns: ColumnDef<MembershipPlanRow>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      return <div className="font-medium text-white">{id}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white/70 hover:text-white"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-white">{row.getValue("name") as string}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string | null;
      return <div className="text-white max-w-xs truncate">{description || 'No description'}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white/70 hover:text-white"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return <div className="text-white">{price.toLocaleString('en-ID', { style: 'currency', currency: 'IDR' })}</div>;
    },
  },
  {
    accessorKey: "duration_day",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white/70 hover:text-white"
        >
          Duration (days)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const duration = row.getValue("duration_day") as number;
      return <div className="text-white">{duration} days</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at") as string);
      return (
        <div className="text-white">
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const membershipPlan = row.original as MembershipPlanRow;

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
              onClick={() => navigator.clipboard.writeText(membershipPlan.id.toString())}
            >
              Copy Plan ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.dispatchEvent(new CustomEvent('openEditMembershipPlanModal', { detail: membershipPlan.id }))}>
              Edit Plan
            </DropdownMenuItem>
            <DropdownMenuItem>
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];