"use client";

import { useState, useEffect } from "react";
import { memberSchema } from "@/lib/validation/membersValidate";
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
import { useGetSingleData, useUpdateData } from "@/hooks/use-Fetch";
import { Members } from "@/types/member";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type MemberInput = z.infer<typeof memberSchema>;

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: string;
  onEditSuccess: () => void;
}

export function EditMemberModal({ 
  isOpen, 
  onClose, 
  memberId, 
  onEditSuccess 
}: EditMemberModalProps) {
  const [formData, setFormData] = useState<MemberInput>({
    full_name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // Use the update hook
  const {
    mutate: updateMember,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
    reset: resetUpdate
  } = useUpdateData<Members>('/api/admin/members', 'members', { page: 1, limit: 10 });

  // Fetch the member data when modal opens or memberId changes
  const {
    data: member,
    isLoading: isMemberLoading,
    isError: isMemberError,
    refetch,
  } = useGetSingleData<Members>(
    memberId,
    "/api/admin/members/get",
    "member"
  );

  // Populate form with member data when it's loaded
  useEffect(() => {
    if (member) {
      setFormData({
        full_name: member.full_name,
        email: member.email,
        phone: member.phone || "",
      });
    }
  }, [member]);

  // Refresh data when modal opens and we have a memberId
  useEffect(() => {
    if (isOpen && memberId) {
      refetch();
    }
  }, [isOpen, memberId, refetch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      // Validate form data
      memberSchema.parse(formData);

      // Call the update mutation with the member ID and updates
      updateMember({
        id: memberId,
        updates: formData
      }, {
        onSuccess: () => {
          toast.success("Member updated successfully!");
          onEditSuccess();
          onClose();
          setIsSubmitting(false);
        },
        onError: (error: Error) => {
          toast.error("Failed to update member: " + error.message);
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

  // Show loading state while fetching member data
  if (isMemberLoading && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-dark-secondary border-brand/30">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Member</DialogTitle>
            <DialogDescription className="text-white/70">
              Loading member data...
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
  if (isMemberError && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-dark-secondary border-brand/30">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Member</DialogTitle>
            <DialogDescription className="text-white/70">
              Error loading member data
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-red-500 mb-4">Failed to load member data</p>
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
          <DialogTitle className="text-white">Edit Member</DialogTitle>
          <DialogDescription className="text-white/70">
            Make changes to the member&apos;s information here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-white/80">Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`bg-black/30 border border-white/20 focus:border-brand focus:ring-brand/30 ${errors.full_name ? 'border-red-500' : ''}`}
              placeholder="Enter full name"
              disabled={isSubmitting}
            />
            {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`bg-black/30 border border-white/20 focus:border-brand focus:ring-brand/30 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter email address"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white/80">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`bg-black/30 border border-white/20 focus:border-brand focus:ring-brand/30 ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="Enter phone number"
              disabled={isSubmitting}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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