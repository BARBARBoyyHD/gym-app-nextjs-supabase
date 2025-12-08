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
import { useGetData, useGetSingleData, useUpdateData } from "@/hooks/use-Fetch";
import { updatePaymentSchema } from "@/lib/validation/paymentValidate";
import { Members } from "@/types/member";
import { MembershipPlan } from "@/types/membership_plan";
import { Payment, PaymentInput } from "@/types/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface EditPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  onEditSuccess: () => void;
}

export function EditPaymentModal({
  isOpen,
  onClose,
  paymentId,
  onEditSuccess,
}: EditPaymentModalProps) {
  // Fetch payment data
  const { data: paymentData, isLoading: paymentLoading } =
    useGetSingleData<Payment>(paymentId, "/api/admin/payments/get", "payment", {
      enabled: isOpen && !!paymentId,
    });

  // Fetch members and membership plans for dropdown
  const { data: membersData, isLoading: membersLoading } = useGetData<
    Members[]
  >({
    endpoint: "/api/admin/members/get",
    queryKeyBase: "members",
    params: { limit: 1000 }, // Get all members
  });

  const { data: plansData, isLoading: plansLoading } = useGetData<
    MembershipPlan[]
  >({
    endpoint: "/api/admin/membership-plans/get",
    queryKeyBase: "membership-plans",
    params: { limit: 1000 }, // Get all plans
  });

  // Define the form
  const form = useForm<z.infer<typeof updatePaymentSchema>>({
    resolver: zodResolver(updatePaymentSchema),
    defaultValues: {
      member_id: "",
      membership_id: "",
      amount: 0,
      method: "cash",
    },
  });

  // Set form values when payment data is loaded
  if (paymentData && !form.formState.isDirty) {
    form.reset({
      member_id: paymentData.member_id || "",
      membership_id: paymentData.membership_id || "",
      amount: paymentData.amount || 0,
      method: paymentData.method || "cash",
    });
  }

  // Define mutation for updating a payment
  const updatePaymentMutation = useUpdateData<PaymentInput>(
    "/api/admin/payments/put",
    "payments"
  );

  // Handle form submission
  function onSubmit(values: z.infer<typeof updatePaymentSchema>) {
    const paymentData: PaymentInput = {
      member_id: values.member_id,
      membership_id: values.membership_id,
      amount: values.amount,
      method: values.method,
      paid_at: new Date().toISOString(), // Add the required paid_at field
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
            <DialogTitle className="text-xl font-bold text-white">
              Edit Payment
            </DialogTitle>
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
          <DialogTitle className="text-xl font-bold text-white">
            Edit Payment
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
                  {membersLoading ? (
                    <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/30 border border-white/20">
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
                  {plansLoading ? (
                    <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/30 border border-white/20">
                          <SelectValue
                            placeholder="Select a membership"
                            className="text-white"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-dark-secondary border border-white/20">
                        {plansData?.data?.[0]?.map((plan: MembershipPlan) => (
                          <SelectItem
                            key={plan.id}
                            value={plan.id.toString()}
                            className="text-white"
                          >
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
              name="method"
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
                disabled={updatePaymentMutation.isPending}
              >
                {updatePaymentMutation.isPending
                  ? "Updating..."
                  : "Update Payment"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
