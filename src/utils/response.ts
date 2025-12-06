import type { SuccessType } from "@/types/responseType";
import type { ErrorType } from "@/types/responseType";
import type { ZodIssue } from "zod";
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
  errors,
}: ErrorType) {
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
      error,
      errors, // <-- includes Zod validation issues
    },
    { status }
  );
}