import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";
import { putHandler } from "@/handlers/putHandlers";
import { checkRateLimit } from "@/middleware/rate-limit-middleware";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting for PUT requests
  const rateLimitResult = await checkRateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per window (updates might be more frequent)
    message: "Too many requests to update payments, please try again later.",
  });

  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const {
      memberId,
      membershipPlanId,
      amount,
      currency,
      status,
      transactionId,
      paymentMethod,
    } = await request.json();

    return putHandler({
      table: "payments",
      id: id,
      message: "Payment updated successfully",
      data: {
        member_id: memberId,
        membership_plan_id: membershipPlanId,
        amount,
        currency,
        status,
        transaction_id: transactionId,
        payment_method: paymentMethod,
      },
    });
  } catch (error) {
    return errorResponse({
      success: false,
      status: 500,
      message: "Error updating payment",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}