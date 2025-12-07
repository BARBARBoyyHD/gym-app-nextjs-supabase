"use client";

import { useState } from "react";
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
import { usePostData } from "@/hooks/use-Fetch";
import { Members,CreateMemberInput } from "@/types/member";
import { toast } from "sonner";

type MemberInput = z.infer<typeof memberSchema>;

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

export function AddMemberModal({ 
  isOpen, 
  onClose, 
  onAddSuccess 
}: AddMemberModalProps) {
  const [formData, setFormData] = useState<MemberInput>({
    full_name: "",
    email: "",
    phone: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the post hook for creating new members
  const {
    mutate: createMember,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
    reset: resetCreate
  } = usePostData<CreateMemberInput>('/api/admin/members/post', 'members');

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
    resetCreate(); // Reset any previous errors
    
    try {
      // Validate form data
      memberSchema.parse(formData);
      
      // Call the create mutation
      createMember(formData, {
        onSuccess: () => {
          toast.success("Member created successfully!");
          onAddSuccess();
          onClose();
          setIsSubmitting(false);
          // Reset form
          setFormData({
            full_name: "",
            email: "",
            phone: "",
          });
        },
        onError: (error: Error) => {
          toast.error("Failed to create member: " + error.message);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-dark-secondary border-brand/30">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Member</DialogTitle>
          <DialogDescription className="text-white/70">
            Add a new member to the gym. Click save when you're done.
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
              {isSubmitting ? "Creating..." : "Create Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}