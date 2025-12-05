import { createClient } from "@/lib/supabase/server";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return errorResponse({
        success: false,
        status: error.status || 500,
        message: "User sign-out failed",
        error: error.message,
      });
    }

    return successResponse({
      success: true,
      status: 200,
      message: "User signed out successfully",
      data: null,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: "An unknown error occurred during sign-out.",
        error: error.message,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "An unknown error occurred during sign-out.",
      error: "Internal Server Error",
    });
  }
}