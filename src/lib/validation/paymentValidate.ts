import { z } from "zod";

// Base schema with common fields for payments
const basePaymentSchema = z.object({
  member_id: z.string().uuid("Member ID must be a valid UUID"),
  membership_id: z.string().uuid("Plan ID must be a valid UUID"),
  amount: z.number().positive("Amount must be a positive number"),
  method: z.enum(
    ["credit_card", "debit_card", "paypal", "bank_transfer", "cash"],
    "Payment method must be valid"
  ),
});

// Schema for creating new payments
export const createPaymentSchema = basePaymentSchema;

// Schema for updating existing payments
export const updatePaymentSchema = basePaymentSchema.partial();

// Type inference
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
