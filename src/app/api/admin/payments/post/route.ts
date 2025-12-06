import { NextResponse } from "next/server";
import { errorResponse, successResponse } from "@/utils/response";
import { createClient } from "@/lib/supabase/server";
import { PaymentInput } from "@/types/payment";
import { postHandler } from "@/handlers/postHandlers";

export async function POST(request: Request) {
  try {
    const {
      memberId,
      membershipPlanId,
      amount,
      currency,
      status,
      transactionId,
      paymentMethod,
    } = await request.json();

    return postHandler({
      table: "payments",
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
      message: "Error creating payment",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}