import { z } from 'zod';

// Base schema with common fields for membership plans
const baseMembershipPlanSchema = z.object({
  name: z
    .string( 'Name is required' )
    .min(3, 'Name is required' )
    .max(255, 'Name must not exceed 255 characters' ),
  description: z
    .string()
    .optional()
    .nullable(),
  price: z
    .number( 'Price is required' )
    .positive('Price must be a positive number'),
  duration_day: z
    .number('Duration is required' )
    .int('Duration must be a whole number')
    .positive('Duration must be a positive number'),
});

// Schema for creating new membership plans
export const createMembershipPlanSchema = baseMembershipPlanSchema;

// Schema for updating existing membership plans
export const updateMembershipPlanSchema = baseMembershipPlanSchema.partial();

// Type inference
export type CreateMembershipPlanInput = z.infer<typeof createMembershipPlanSchema>;
export type UpdateMembershipPlanInput = z.infer<typeof updateMembershipPlanSchema>;