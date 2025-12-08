"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUpdateData, useGetSingleData } from "@/hooks/use-Fetch";
import { Payment, PaymentInput } from "@/types/payment";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetData } from "@/hooks/use-Fetch";
import { Members } from "@/types/member";
import { MembershipPlan } from "@/types/membership_plan";
import { updatePaymentSchema } from "@/lib/validation/paymentValidate";
import * as z from "zod";

const PaymentFormSchema = updatePaymentSchema;

interface EditPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  onEditSuccess: () => void;
}

export function EditPaymentModal({ isOpen, onClose, paymentId, onEditSuccess }: EditPaymentModalProps) {
  const queryClient = useQueryClient();

  // Fetch payment data
  const { data: paymentData, isLoading: paymentLoading } = useGetSingleData<Payment>(
    paymentId,
    "/api/admin/payments/get",
    "payment",
    { enabled: isOpen && !!paymentId }
  );

  // Fetch members and membership plans for dropdown
  const { data: membersData, isLoading: membersLoading } = useGetData<{ data: Members[] }>({
    endpoint: "/api/admin/members/get",
    queryKeyBase: "members",
    params: { limit: 1000 } // Get all members
  });

  const { data: plansData, isLoading: plansLoading } = useGetData<{ data: MembershipPlan[] }>({
    endpoint: "/api/admin/membership-plans/get",
    queryKeyBase: "membership-plans",
    params: { limit: 1000 } // Get all plans
  });

  // Define the form
  const form = useForm<z.infer<typeof updatePaymentSchema>>({
    resolver: zodResolver(updatePaymentSchema),
    defaultValues: {
      memberId: "",
      membershipPlanId: "",
      amount: 0,
      currency: "USD",
      status: "pending",
      transactionId: "",
      paymentMethod: "credit_card",
    },
  });

  // Set form values when payment data is loaded
  if (paymentData?.data && !form.formState.isDirty) {
    form.reset({
      memberId: paymentData.data.memberId,
      membershipPlanId: paymentData.data.membershipPlanId,
      amount: paymentData.data.amount,
      currency: paymentData.data.currency,
      status: paymentData.data.status,
      transactionId: paymentData.data.transactionId,
      paymentMethod: paymentData.data.paymentMethod,
    });
  }

  // Define mutation for updating a payment
  const updatePaymentMutation = useUpdateData<PaymentInput>("/api/admin/payments/put", "payments");

  // Handle form submission
  function onSubmit(values: z.infer<typeof updatePaymentSchema>) {
    const paymentData: PaymentInput = {
      ...values,
      amount: Number(values.amount),
    };

    updatePaymentMutation.mutate(
      { id: paymentId, updates: paymentData },
      {
        onSuccess: () => {
          onEditSuccess();
          onClose();
        },
      }
    );
  }

  if (paymentLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] bg-dark-secondary border border-brand/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Edit Payment</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center py-8">
            <div className="h-8 w-8 rounded-full border-4 border-brand border-t-transparent animate-spin"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-dark-secondary border border-brand/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Edit Payment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="memberId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Member</FormLabel>
                  {membersLoading ? (
                    <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/30 border border-white/20">
                          <SelectValue placeholder="Select a member" className="text-white" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-dark-secondary border border-white/20">
                        {membersData?.data?.map((member) => (
                          <SelectItem key={member.id} value={member.id} className="text-white">
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
              name="membershipPlanId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Membership Plan</FormLabel>
                  {plansLoading ? (
                    <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/30 border border-white/20">
                          <SelectValue placeholder="Select a membership plan" className="text-white" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-dark-secondary border border-white/20">
                        {plansData?.data?.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id} className="text-white">
                            {plan.name} (${plan.price})
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
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Currency</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. USD"
                      className="bg-black/30 border border-white/20 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-black/30 border border-white/20">
                        <SelectValue className="text-white" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-dark-secondary border border-white/20">
                      <SelectItem value="pending" className="text-white">Pending</SelectItem>
                      <SelectItem value="completed" className="text-white">Completed</SelectItem>
                      <SelectItem value="failed" className="text-white">Failed</SelectItem>
                      <SelectItem value="refunded" className="text-white">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transactionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Transaction ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter transaction ID"
                      className="bg-black/30 border border-white/20 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-black/30 border border-white/20">
                        <SelectValue className="text-white" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-dark-secondary border border-white/20">
                      <SelectItem value="credit_card" className="text-white">Credit Card</SelectItem>
                      <SelectItem value="debit_card" className="text-white">Debit Card</SelectItem>
                      <SelectItem value="paypal" className="text-white">PayPal</SelectItem>
                      <SelectItem value="bank_transfer" className="text-white">Bank Transfer</SelectItem>
                      <SelectItem value="cash" className="text-white">Cash</SelectItem>
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
                disabled={updatePaymentMutation.isPending}
              >
                {updatePaymentMutation.isPending ? "Updating..." : "Update Payment"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}