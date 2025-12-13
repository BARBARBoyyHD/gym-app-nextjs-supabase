"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetSingleData, useUpdateData } from "@/hooks/use-Fetch";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Membership } from "@/types/membership";

interface EditMembershipStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  membershipId: string;
  onEditSuccess: () => void;
}

export function EditMembershipStatusModal({ 
  isOpen, 
  onClose, 
  membershipId, 
  onEditSuccess 
}: EditMembershipStatusModalProps) {
  const [formData, setFormData] = useState({
    status: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the update hook
  const {
    mutate: updateMembership,
    reset: resetUpdate
  } = useUpdateData<Membership>('/api/admin/memberships/put', 'memberships', { page: 1, limit: 10 });

  // Fetch the membership data when modal opens or membershipId changes
  const {
    data: membership,
    isLoading: isMembershipLoading,
    isError: isMembershipError,
    refetch,
  } = useGetSingleData<Membership>(
    membershipId, // Use the actual UUID for the API call
    "/api/admin/memberships/get",
    "memberships"
  );

  // Populate form with membership data when it's loaded
  useEffect(() => {
    if (membership) {
      setFormData({
        status: membership.status,
      });
    }
  }, [membership]);

  // Refresh data when modal opens and we have a membershipId
  useEffect(() => {
    if (isOpen && membershipId) {
      refetch();
    }
  }, [isOpen, membershipId, refetch]);

  const handleChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user selects an option
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    resetUpdate(); // Reset any previous errors

    try {
      // Prepare the data to match API expectations
      const updatesPayload: Partial<Membership> = {};
      if (formData.status !== undefined) updatesPayload.status = formData.status;

      // Call the update mutation with the membership ID and updates
      updateMembership({
        id: membershipId, // Use the actual UUID for the API call
        updates: updatesPayload
      }, {
        onSuccess: () => {
          toast.success("Membership status updated successfully!");
          onEditSuccess();
          onClose();
          setIsSubmitting(false);
        },
        onError: (error: Error) => {
          toast.error("Failed to update membership status: " + error.message);
          setIsSubmitting(false);
        }
      });
    } catch (error: unknown) {
      toast.error("An unexpected error occurred: " + (error instanceof Error ? error.message : "Unknown error"));
      setIsSubmitting(false);
    }
  };

  // Show loading state while fetching membership data
  if (isMembershipLoading && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-dark-secondary border-brand/30">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Membership Status</DialogTitle>
            <DialogDescription className="text-white/70">
              Loading membership data...
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Show error state if there was an error fetching
  if (isMembershipError && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-dark-secondary border-brand/30">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Membership Status</DialogTitle>
            <DialogDescription className="text-white/70">
              Error loading membership data
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-red-500 mb-4">Failed to load membership data</p>
            <div className="flex gap-2 justify-center">
              <Button 
                variant="outline" 
                onClick={() => refetch()}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Retry
              </Button>
              <Button 
                onClick={onClose}
                className="bg-brand hover:bg-brand/90 text-black"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-dark-secondary border-brand/30">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Membership Status</DialogTitle>
          <DialogDescription className="text-white/70">
            Update the membership status here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status" className="text-white/80">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange(value, 'status')}
              disabled={isSubmitting}
            >
              <SelectTrigger className={`bg-black/30 border border-white/20 focus:border-brand focus:ring-brand/30 ${errors.status ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-dark-secondary border-white/20">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
          </div>

          <div className="flex gap-2 pt-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-brand hover:bg-brand/90 text-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}