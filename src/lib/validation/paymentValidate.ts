import { z } from "zod";

// Schema for creating new payments
export const createPaymentSchema = z.object({
  member_id: z.string().uuid("Member ID must be a valid UUID"),
  membership_id: z.string().uuid("Membership ID must be a valid UUID"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  method: z.enum(
    ["credit_card", "debit_card", "paypal", "bank_transfer", "cash"],
    "Follow the enum options for payment method"
  ),
});

// Type inference
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
