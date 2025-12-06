import { z } from "zod";

// Validation schema for creating a new course
export const courseSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
 
  category: z
    .string()
    .min(1, "Category is required")
    .max(100, "Category must be less than 100 characters"),
  video_embed_url: z
    .string()
    .url("Video URL must be a valid URL")
    .optional()
    .or(z.literal(""))
    .or(z.null()),
});

// Validation schema for updating a course (all fields are optional)
export const updateCourseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 1 character")
    .max(255, "Title must be less than 255 characters")
    .optional(),
  description: z
    .string()
    .min(1, "Description must be at least 1 character")
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  category: z
    .string()
    .min(1, "Category must be at least 1 character")
    .max(100, "Category must be less than 100 characters")
    .optional(),
  video_embed_url: z
    .string()
    .url("Video URL must be a valid URL")
    .optional()
    .or(z.literal(""))
    .or(z.null()),
});

export type CourseSchema = z.infer<typeof courseSchema>;
export type UpdateCourseSchema = z.infer<typeof updateCourseSchema>;