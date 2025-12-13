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
import { useState } from "react";
import { AddPaymentModal } from "../../payments/modal/AddPaymentModal";

// Wrapper component to handle the table row actions with modal
function MembershipActions({
  membership,
  onEditStatus,
  onDelete
}: {
  membership: Membership & {
    member_id: { id: string; full_name: string } | string;
    plan_id: { id: string; name: string } | string;
  };
  onEditStatus: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Extract member ID from the membership data
  const memberId = typeof membership.member_id === 'object'
    ? (membership.member_id as { id: string }).id
    : membership.member_id;

  // Extract membership plan name for display
  const planName = typeof membership.plan_id === 'object'
    ? (membership.plan_id as { name: string }).name
    : "Unknown Plan";

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <>
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
          <DropdownMenuItem onClick={() => onEditStatus(membership.id)}>Edit Status</DropdownMenuItem>
          <DropdownMenuItem onClick={openPaymentModal}>Add Payment</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500 focus:bg-red-500/20"
            onClick={() => onDelete(membership.id, `${planName} - ${typeof membership.member_id === 'object' ? (membership.member_id as { full_name: string }).full_name : "Member"}`)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        onAddSuccess={() => {
          // Optionally refresh data or show a success message
          closePaymentModal();
        }}
        membershipId={membership.id}
        member_id={memberId}
      />
    </>
  );
}

// Function to create columns with callbacks
export function createColumns(
  onEditStatus: (id: string) => void,
  onDelete: (id: string, name: string) => void
): ColumnDef<
  Membership & {
    member_id: { id: string; full_name: string } | string;
    plan_id: { id: string; name: string } | string;
  }
>[] {
  return [
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
          <MembershipActions
            membership={membership}
            onEditStatus={onEditStatus}
            onDelete={onDelete}
          />
        );
      },
    },
  ];
}