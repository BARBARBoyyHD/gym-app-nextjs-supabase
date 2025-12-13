"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetData, useGetSingleData, usePostData } from "@/hooks/use-Fetch";
import { createPaymentSchema } from "@/lib/validation/paymentValidate";
import { Members } from "@/types/member";
import { Membership } from "@/types/membership";
import { MembershipPlan } from "@/types/membership_plan";
import { PaymentInput } from "@/types/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
  membershipId?: string; // Optional: Pre-fill with specific membership ID
  member_id?: string; // Optional: Pre-fill with specific member ID
}

export function AddPaymentModal({
  isOpen,
  onClose,
  onAddSuccess,
  membershipId,
  member_id,
}: AddPaymentModalProps) {
  // Fetch members and membership plans for dropdown
  const { data: membersData, isLoading: membersLoading } = useGetData<
    Members[]
  >({
    endpoint: "/api/admin/members/get",
    queryKeyBase: "members",
    params: { limit: 1000 }, // Get all members
  });

  const { data: plansData } = useGetData<MembershipPlan[]>({
    endpoint: "/api/admin/membership-plans/get",
    queryKeyBase: "membership-plans",
    params: { limit: 1000 }, // Get all plans
  });

  // Fetch membership details if membershipId is provided

  const { data: membershipData, isLoading: membershipLoading } = useGetSingleData<Membership>(
    membershipId || '',
    '/api/admin/memberships/get',
    'membership',
    { enabled: !!membershipId }
  );


  // Define the form
  const form = useForm<z.infer<typeof createPaymentSchema>>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      member_id: member_id || "",
      membership_id: membershipId || "", // Use the membershipId prop directly
      amount: 0,
      method: "cash",
    },
  });

  // Reset form when modal opens/closes or when membership data changes
  useEffect(() => {
    if (isOpen) {
      // Extract member ID from the membership data
      const extractedmember_id =
        typeof membershipData?.member_id === "object"
          ? (membershipData?.member_id as { id: string }).id
          : membershipData?.member_id;

      form.reset({
        member_id: member_id || extractedmember_id || "",
        membership_id: membershipId || "", // Use the membershipId prop directly
        amount: 0,
        method: "cash",
      });
    }
  }, [isOpen, member_id, membershipData, membershipId, form]);

  // Define mutation for creating a payment
  const createPaymentMutation = usePostData<PaymentInput>(
    "/api/admin/payments/post",
    "payments"
  );

  // Handle form submission
  function onSubmit(values: z.infer<typeof createPaymentSchema>) {
    const paymentData: PaymentInput = {
      member_id: values.member_id,
      membership_id: values.membership_id,
      amount: values.amount,
      method: values.method,
      paid_at: new Date().toISOString(), // Add the required paid_at field
    };

    createPaymentMutation.mutate(paymentData, {
      onSuccess: () => {
        onAddSuccess();
        onClose();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-dark-secondary border border-brand/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Add Payment
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="member_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Member</FormLabel>
                  {membersLoading || membershipLoading ? (
                    <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!!member_id} // Disable if member_id is provided as prop
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`bg-black/30 border border-white/20 ${
                            !!member_id ? "opacity-50" : ""
                          }`}
                        >
                          <SelectValue
                            placeholder="Select a member"
                            className="text-white"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-dark-secondary border border-white/20">
                        {membersData?.data?.[0]?.map((member: Members) => (
                          <SelectItem
                            key={member.id}
                            value={member.id}
                            className="text-white"
                          >
                            {member.full_name} ({member.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="membership_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Membership</FormLabel>
                  {membershipLoading ? (
                    <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!!membershipId} // Disable if membershipId is provided as prop
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`bg-black/30 border border-white/20 ${
                            !!membershipId ? "opacity-50" : ""
                          }`}
                        >
                          <SelectValue
                            placeholder="Select a membership"
                            className="text-white"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-dark-secondary border border-white/20">
                        {membershipId ? (
                          <SelectItem
                            key={membershipId}
                            value={membershipId}
                            className="text-white"
                          >
                            Membership: {membershipId.substring(0, 8)}...
                          </SelectItem>
                        ) : (
                          plansData?.data?.[0]?.map((plan) => (
                            <SelectItem
                              key={plan.id}
                              value={plan.id}
                              className="text-white"
                            >
                              {plan.name} (${plan.price})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="bg-black/30 border border-white/20 text-white"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Payment Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-black/30 border border-white/20">
                        <SelectValue className="text-white" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-dark-secondary border border-white/20">
                      <SelectItem value="credit_card" className="text-white">
                        Credit Card
                      </SelectItem>
                      <SelectItem value="debit_card" className="text-white">
                        Debit Card
                      </SelectItem>
                      <SelectItem value="paypal" className="text-white">
                        PayPal
                      </SelectItem>
                      <SelectItem value="bank_transfer" className="text-white">
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value="cash" className="text-white">
                        Cash
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="border border-white/30 text-white hover:bg-white/10"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand hover:bg-brand/90 text-black"
                disabled={createPaymentMutation.isPending}
              >
                {createPaymentMutation.isPending
                  ? "Creating..."
                  : "Add Payment"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
