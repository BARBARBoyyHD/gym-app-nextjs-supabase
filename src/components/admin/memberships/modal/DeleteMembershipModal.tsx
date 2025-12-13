"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteData } from "@/hooks/use-Fetch";
import { toast } from "sonner";

interface DeleteMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  membershipId: string;
  membershipName: string; // For display purposes
  onConfirm: () => void; // Callback to refetch data after deletion
}

export function DeleteMembershipModal({ 
  isOpen, 
  onClose, 
  membershipId, 
  membershipName,
  onConfirm 
}: DeleteMembershipModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Use the delete hook
  const {
    mutate: deleteMembership,
    reset: resetDelete
  } = useDeleteData('/api/admin/memberships/delete', 'memberships');

  const handleDelete = async () => {
    setIsDeleting(true);
    resetDelete(); // Reset any previous errors

    try {
      deleteMembership(membershipId, {
        onSuccess: () => {
          toast.success("Membership deleted successfully!");
          onConfirm();
          onClose();
          setIsDeleting(false);
        },
        onError: (error: Error) => {
          toast.error("Failed to delete membership: " + error.message);
          setIsDeleting(false);
        }
      });
    } catch (error: unknown) {
      toast.error("An unexpected error occurred: " + (error instanceof Error ? error.message : "Unknown error"));
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-dark-secondary border-brand/30">
        <DialogHeader>
          <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
          <DialogDescription className="text-white/70">
            Are you sure you want to delete this membership? This action cannot be undone. 
            The member will lose access to the associated plan.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-white">
            Membership: <span className="font-semibold">{membershipName}</span>
          </p>
        </div>
        
        <div className="flex gap-2 pt-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? "Deleting..." : "Delete Membership"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}