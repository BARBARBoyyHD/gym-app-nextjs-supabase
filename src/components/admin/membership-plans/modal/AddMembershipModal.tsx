"use client";

import { useState } from "react";
import { createMembershipPlanSchema, CreateMembershipPlanInput } from "@/lib/validation/membershipPlansValidate";
import { z } from "zod";
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
import { usePostData } from "@/hooks/use-Fetch";
import { toast } from "sonner";
import { MembershipPlan } from "@/types/membership_plan";

type MembershipPlanInput = z.infer<typeof createMembershipPlanSchema>;

interface AddMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

export function AddMembershipModal({ 
  isOpen, 
  onClose, 
  onAddSuccess 
}: AddMembershipModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    duration_day: 30,  // Changed to match DB column name
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the post hook for creating new membership plans
  const {
    mutate: createPlan,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
    reset: resetCreate
  } = usePostData<MembershipPlanInput>('/api/admin/membership-plan/post', 'membership-plans');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;


    setFormData({
      ...formData,
      [name]: name === "price" || name === "duration_day" ? Number(value) : value,
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
      // Prepare the data to match API expectations
      const payload:MembershipPlanInput = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        duration_day : formData.duration_day,  // Using "duration" to match API expectation while using duration_day from form
      };

      // Call the create mutation
      createPlan(payload, {
        onSuccess: () => {
          toast.success("Membership plan created successfully!");
          onAddSuccess();
          onClose();
          setIsSubmitting(false);
          // Reset form
          setFormData({
            name: "",
            description: "",
            price: 0,
            duration_day: 30,
          });
        },
        onError: (error: Error) => {
          toast.error("Failed to create membership plan: " + error.message);
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      toast.error("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-dark-secondary border-brand/30">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Membership Plan</DialogTitle>
          <DialogDescription className="text-white/70">
            Add a new membership plan for the gym. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/80">Plan Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
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
              value={formData.description}
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
                value={formData.price}
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
                value={formData.duration_day}
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
              {isSubmitting ? "Creating..." : "Create Plan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}