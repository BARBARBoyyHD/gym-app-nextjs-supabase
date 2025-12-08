"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetData, usePostData } from "@/hooks/use-Fetch";
import { createMembershipSchema as membershipSchema } from "@/lib/validation/membershipValidate";
import { Members } from "@/types/member";
import { MembershipInput } from "@/types/membership";
import { MembershipPlan } from "@/types/membership_plan";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

type MembershipInputType = z.infer<typeof membershipSchema>;

interface AddMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
  prefillMemberId?: string;
  prefillMemberName?: string;
}

export function AddMembershipModal({
  isOpen,
  onClose,
  onAddSuccess,
  prefillMemberId,
}: AddMembershipModalProps) {
  const [formData, setFormData] = useState<MembershipInputType>({
    member_id: prefillMemberId || "",
    plan_id: 0,
    start_date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
    end_date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
    status: "pending",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all members for the dropdown
  const {
    data: membersData,
    isLoading: membersLoading,
    isError: membersError
  } = useGetData<Members>({
    endpoint: "/api/admin/members/get",
    queryKeyBase: "members",
    params: { limit: 100 }, // Get all members
  });

  // Update member_id when prefillMemberId changes
  useEffect(() => {
    if (prefillMemberId && prefillMemberId !== formData.member_id) {
      setFormData(prev => ({
        ...prev,
        member_id: prefillMemberId
      }));
    }
  }, [prefillMemberId]);

  // Fetch all membership plans for the dropdown
  const {
    data: plansData,
    isLoading: plansLoading,
    isError: plansError
  } = useGetData<MembershipPlan>({
    endpoint: "/api/admin/membership-plan/get",
    queryKeyBase: "membership_plans",
    params: { limit: 100 }, // Get all plans
  });

  // Use the post hook for creating new memberships
  const {
    mutate: createMembership,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
    reset: resetCreate
  } = usePostData<MembershipInput>('/api/admin/memberships/post', 'memberships');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => {
      if (name === 'plan_id') {
        // Handle plan_id as a number
        const planIdNum = parseInt(value, 10);
        return {
          ...prev,
          plan_id: planIdNum
        };
      } else {
        // Handle all other fields as strings
        return {
          ...prev,
          [name]: value
        };
      }
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
    resetCreate(); // Reset any previous errors

    try {
      // Validate form data
      membershipSchema.parse(formData);

      // Call the create mutation
      createMembership(formData, {
        onSuccess: () => {
          toast.success("Membership created successfully!");
          onAddSuccess();
          onClose();
          setIsSubmitting(false);
          // Reset form
          setFormData({
            member_id: "",
            plan_id: 0,
            start_date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
            end_date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
            status: "pending",
          });
        },
        onError: (error: Error) => {
          toast.error("Failed to create membership: " + error.message);
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path && err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please fix the form errors");
      } else {
        toast.error("An unexpected error occurred");
      }
      setIsSubmitting(false);
    }
  };

  const members = membersData?.data || [];
  const plans = plansData?.data || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-dark-secondary border-brand/30">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Membership</DialogTitle>
          <DialogDescription className="text-white/70">
            Add a new membership with member and plan details. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="member_id" className="text-white/80">Member</Label>
            <select
              id="member_id"
              name="member_id"
              value={formData.member_id}
              onChange={handleChange}
              className={`w-full p-2 bg-black/30 border border-white/20 rounded focus:border-brand focus:ring-brand/30 ${errors.member_id ? 'border-red-500' : ''}`}
              disabled={isSubmitting || membersLoading}
            >
              <option value="">Select a member</option>
              {membersLoading ? (
                <option>Loading members...</option>
              ) : membersError ? (
                <option>Error loading members</option>
              ) : (
                members.map((member: Members) => (
                  <option key={member.id} value={member.id}>
                    {member.full_name} ({member.email})
                  </option>
                ))
              )}
            </select>
            {errors.member_id && <p className="text-red-500 text-sm mt-1">{errors.member_id}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan_id" className="text-white/80">Membership Plan</Label>
            <select
              id="plan_id"
              name="plan_id"
              value={formData.plan_id}
              onChange={handleChange}
              className={`w-full p-2 bg-black/30 border border-white/20 rounded focus:border-brand focus:ring-brand/30 ${errors.plan_id ? 'border-red-500' : ''}`}
              disabled={isSubmitting || plansLoading}
            >
              <option value="">Select a plan</option>
              {plansLoading ? (
                <option>Loading plans...</option>
              ) : plansError ? (
                <option>Error loading plans</option>
              ) : (
                plans.map((plan: MembershipPlan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - ${plan.price} ({plan.duration_day} days)
                  </option>
                ))
              )}
            </select>
            {errors.plan_id && <p className="text-red-500 text-sm mt-1">{errors.plan_id}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="start_date" className="text-white/80">Start Date</Label>
            <Input
              id="start_date"
              name="start_date"
              type="date"
              value={formData.start_date.split('T')[0]} // Format date for input
              onChange={handleChange}
              className={`bg-black/30 border border-white/20 focus:border-brand focus:ring-brand/30 ${errors.start_date ? 'border-red-500' : ''}`}
              disabled={isSubmitting}
            />
            {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="end_date" className="text-white/80">End Date</Label>
            <Input
              id="end_date"
              name="end_date"
              type="date"
              value={formData.end_date.split('T')[0]} // Format date for input
              onChange={handleChange}
              className={`bg-black/30 border border-white/20 focus:border-brand focus:ring-brand/30 ${errors.end_date ? 'border-red-500' : ''}`}
              disabled={isSubmitting}
            />
            {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-white/80">Status</Label>
            <div className="flex space-x-4">
              {(['active', 'pending', 'cancelled'] as const).map((status) => (
                <label key={status} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={handleChange}
                    className="text-brand focus:ring-brand"
                  />
                  <span className="text-white capitalize">{status}</span>
                </label>
              ))}
            </div>
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
              disabled={isSubmitting || isCreatePending}
            >
              {(isSubmitting || isCreatePending) ? "Creating..." : "Create Membership"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}