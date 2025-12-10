"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// Define the type matching the API response
interface MembershipPlanRow {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration_day: number;
  created_at: string;
}

interface EditMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  membershipPlanId: number;
  onEditSuccess: () => void;
}

export function EditMembershipModal({ 
  isOpen, 
  onClose, 
  membershipPlanId, 
  onEditSuccess 
}: EditMembershipModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    duration_day: 0,  // Changed to match DB column name
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialLoadRef = useRef(true);

  // Use the update hook
  const {
    mutate: updatePlan,
    reset: resetUpdate
  } = useUpdateData<MembershipPlanRow>('/api/admin/membership-plan/put', 'membership-plans', { page: 1, limit: 10 });

  // Fetch the membership plan data when modal opens or membershipPlanId changes
  const {
    data: membershipPlan,
    isLoading: isPlanLoading,
    isError: isPlanError,
    refetch,
  } = useGetSingleData<MembershipPlanRow>(
    membershipPlanId.toString(), // Convert to string for the API call
    "/api/admin/membership-plan/get",
    "membership-plan"
  );

  // Populate form with membership plan data when it's loaded
  useEffect(() => {
    if (membershipPlan && initialLoadRef.current) {
      initialLoadRef.current = false;
      setFormData({
        name: membershipPlan.name,
        description: membershipPlan.description || "",
        price: membershipPlan.price,
        duration_day: membershipPlan.duration_day,  // Map API response field to form field
      });
    }
  }, [membershipPlan]);

  // Refresh data when modal opens and we have a membershipPlanId
  useEffect(() => {
    if (isOpen && membershipPlanId) {
      refetch();
    }
  }, [isOpen, membershipPlanId, refetch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Special handling for the price and duration_day fields which should be numbers
    let processedValue: string | number | undefined = value;
    if (name === 'price' || name === 'duration_day') {
      processedValue = value === '' ? undefined : parseFloat(value) || 0;
    } else if (value === '') {
      processedValue = undefined; // For optional fields, set to undefined if empty
    }

    setFormData({
      ...formData,
      [name]: processedValue,
    });

    // Clear error when user starts typing
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
      // Map form field "duration_day" to API field "duration"
      const updatesPayload: Partial<MembershipPlanRow> & { duration?: number } = {};
      if (formData.name !== undefined) updatesPayload.name = formData.name;
      if (formData.description !== undefined) updatesPayload.description = formData.description;
      if (formData.price !== undefined) updatesPayload.price = formData.price;
      if (formData.duration_day !== undefined) updatesPayload.duration = formData.duration_day;  // Map form field to API field

      // Call the update mutation with the membership plan ID and updates
      updatePlan({
        id: membershipPlanId.toString(), // Convert to string for the API call
        updates: updatesPayload
      }, {
        onSuccess: () => {
          toast.success("Membership plan updated successfully!");
          onEditSuccess();
          onClose();
          setIsSubmitting(false);
        },
        onError: (error: Error) => {
          toast.error("Failed to update membership plan: " + error.message);
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      toast.error("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  // Show loading state while fetching membership plan data
  if (isPlanLoading && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-dark-secondary border-brand/30">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Membership Plan</DialogTitle>
            <DialogDescription className="text-white/70">
              Loading plan data...
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
  if (isPlanError && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-dark-secondary border-brand/30">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Membership Plan</DialogTitle>
            <DialogDescription className="text-white/70">
              Error loading plan data
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-red-500 mb-4">Failed to load membership plan data</p>
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
          <DialogTitle className="text-white">Edit Membership Plan</DialogTitle>
          <DialogDescription className="text-white/70">
            Make changes to the membership plan&apos;s information here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/80">Plan Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className={`bg-black/30 border border-white/20 focus:border-brand focus:ring-brand/30 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter plan name"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white/80">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className={`bg-black/30 border border-white/20 focus:border-brand focus:ring-brand/30 ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter plan description"
              disabled={isSubmitting}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white/80">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price || ""}
                onChange={handleChange}
                className={`bg-black/30 border border-white/20 focus:border-brand focus:ring-brand/30 ${errors.price ? 'border-red-500' : ''}`}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={isSubmitting}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration_day" className="text-white/80">Duration (days)</Label>
              <Input
                id="duration_day"
                name="duration_day"
                type="number"
                value={formData.duration_day || ""}
                onChange={handleChange}
                className={`bg-black/30 border border-white/20 focus:border-brand focus:ring-brand/30 ${errors.duration_day ? 'border-red-500' : ''}`}
                placeholder="30"
                min="1"
                disabled={isSubmitting}
              />
              {errors.duration_day && <p className="text-red-500 text-sm mt-1">{errors.duration_day}</p>}
            </div>
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