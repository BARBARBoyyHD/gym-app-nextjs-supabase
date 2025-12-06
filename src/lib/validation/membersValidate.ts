import * as z from "zod";

export const memberSchema = z.object({
  full_name: z
    .string({ error: "Full name is required" })
    .min(3, "Full name is too short")
    .max(100, "Full name is too long"),

  email: z.string({ error: "Email is required" }).email("Invalid email format"),

  phone: z
    .string({ error: "Phone is required" })
    .min(10, "Phone number must be at least 10 digits")
    .max(16, "Phone number must be less than 16 digits"),
});

export const updateMemberSchema = z.object({
  full_name: z
    .string({ error: "Full name is required" })
    .min(3, "Full name is too short")
    .max(100, "Full name is too long"),

  email: z.string({ error: "Email is required" }).email("Invalid email format"),

  phone: z
    .string({ error: "Phone is required" })
    .min(10, "Phone number must be at least 10 digits")
    .max(16, "Phone number must be less than 16 digits"),
});
