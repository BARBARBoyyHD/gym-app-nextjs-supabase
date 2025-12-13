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
import { PaymentWithDetails } from "@/types/payment";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<PaymentWithDetails>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id");
      const idString = typeof id === "string" ? id : String(id);
      return (
        <div className="font-medium text-white">
          {idString.substring(0, 8)}...
        </div>
      );
    },
  },
  {
    accessorKey: "members.full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white/70 hover:text-white"
        >
          Member Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const member = row.original.members;
      return <div className="text-white">{member?.full_name || "N/A"}</div>;
    },
  },
  {
    accessorKey: "memberships.membership_plans.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white/70 hover:text-white"
        >
          Membership Plan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const membership = row.original.memberships;
      return (
        <div className="text-white">
          {membership?.membership_plans?.name || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white/70 hover:text-white"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amountValue = row.getValue("amount");
      const amount =
        typeof amountValue === "number" ? amountValue : Number(amountValue);
      // Format the amount as currency (assuming IDR based on the value 99999)
      return (
        <div className="text-white">
          Rp{isNaN(amount) ? "0" : amount.toLocaleString("id-ID")}
        </div>
      );
    },
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => {
      const method = row.getValue("method");
      const methodStr = typeof method === "string" ? method : String(method);
      return <div className="text-white capitalize">{methodStr}</div>;
    },
  },
  {
    accessorKey: "paid_at",
    header: "Paid Date",
    cell: ({ row }) => {
      const paid_at = row.getValue("paid_at");
      const dateStr = typeof paid_at === "string" ? paid_at : String(paid_at);
      const date = new Date(dateStr);
      return (
        <div className="text-white">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}{" "}
          {date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("openEditPaymentModal", {
                    detail: payment.id,
                  })
                )
              }
            >
              Edit Payment
            </DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
