import type { SuccessType } from "@/types/responseType";
import type { ErrorType } from "@/types/responseType";
import { NextResponse } from "next/server";

export function successResponse<T>({
  success,
  status,
  message,
  data,
}: SuccessType<T>) {
  return NextResponse.json({ success, status, message, data }, { status });
}

export function errorResponse({
  success = false,
  status = 500,
  message,
  error,
}: ErrorType) {
  // If message isn't given, try to extract it from the error
  let errorMessage = message;

  if (!errorMessage) {
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else {
      errorMessage = "Unknown error occurred";
    }
  }

  return NextResponse.json(
    {
      success,
      status,
      message: errorMessage,
    },
    { status }
  );
}