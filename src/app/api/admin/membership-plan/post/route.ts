import { NextRequest } from 'next/server';
import { postHandler } from '@/handlers/postHandlers';
import { createMembershipPlanSchema } from '@/lib/validation/membershipPlansValidate';
import { errorResponse } from '@/utils/response';
import { ZodError } from 'zod';
import { checkRateLimit } from '@/middleware/rate-limit-middleware';

// POST /api/admin/membership-plan/post
export async function POST(request: NextRequest) {
  // Apply rate limiting for POST requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 10 requests per window
    message: 'Too many requests to create membership plans, please try again later.',
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const {
      name,
      description,
      price,
      duration_day,
    } = await request.json();

    // Validate the input data using Zod schema
    const validatedData = createMembershipPlanSchema.parse({
      name,
      description,
      price,
      duration_day,
    });

    // Build the payload with proper field names mapping to database columns
    const postPayload: Record<string, unknown> = {
      name: validatedData.name,
      description: validatedData.description,
      price: validatedData.price,
      duration_day: validatedData.duration_day, // Map duration from API to duration_day in DB
    };

    return postHandler({
      table: 'membership_plans',
      data: postPayload,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      // Handle Zod validation errors with prettier messages
      return errorResponse({
        success: false,
        status: 400,
        message: 'Validation failed',
        errors: error.issues,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: 'Error creating membership plan',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}