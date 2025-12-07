import { z } from "zod";

// Base schema with common fields for memberships
const baseMembershipSchema = z.object({
  member_id: z.string().uuid("Member ID must be a valid UUID"),
  plan_id: z.number("Plan ID must be a number").positive("Plan ID must be positive"),
  start_date: z.string().date("Start date must be a valid date"),
  end_date: z.string().date("End date must be a valid date"),
  status: z
    .enum(["active", "inactive", "expired", "pending"], "Status must be valid")
    .default("active"),
});

// Schema for creating new memberships
export const createMembershipSchema = baseMembershipSchema.refine(
  (data) => new Date(data.end_date) >= new Date(data.start_date),
  {
    message: "End date must be after or equal to start date",
    path: ["end_date"], // Path of error
  }
);

// Schema for updating existing memberships with additional validation for date comparison
export const updateMembershipSchema = baseMembershipSchema.partial().refine(
  (data) => {
    // Only validate date comparison if both dates are provided
    if (data.start_date && data.end_date) {
      return new Date(data.end_date) >= new Date(data.start_date);
    }
    return true; // Skip validation if one or both dates are not provided
  },
  {
    message: "End date must be after or equal to start date",
    path: ["end_date"], // Path of error
  }
);

// Type inference
export type CreateMembershipInput = z.infer<typeof createMembershipSchema>;
export type UpdateMembershipInput = z.infer<typeof updateMembershipSchema>;
