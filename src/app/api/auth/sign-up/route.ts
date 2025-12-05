import { createClient } from "@/lib/supabase/server";

import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { email, password } = await req.json();

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return errorResponse({
        success: false,
        status: error.status || 500,
        message: "User registration failed",
        error: error.message,
      });
    }

    return successResponse({
      success: true,
      status: 200,
      message: "User registered successfully",
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: "An unknown error occurred during registration.",
        error: error.message,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "An unknown error occurred during registration.",
      error: "Internal Server Error",
    });
  }
}
