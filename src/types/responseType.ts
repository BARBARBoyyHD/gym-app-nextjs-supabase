import type { ZodIssue } from "zod";

export type ErrorType = {
  success?: boolean;
  status?: number;
  message?: string;
  error?: Error | string | unknown;
  errors?: ZodIssue[]; // ⬅️ Typed!
};


export type SuccessType<T = unknown> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};

