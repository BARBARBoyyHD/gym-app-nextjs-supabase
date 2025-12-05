// Response type definitions for API responses

export type SuccessType<T = unknown> = {
  success: true;
  status: number;
  message: string;
  data: T;
};

export type ErrorType = {
  success?: false;
  status?: number;
  message?: string;
  error?: Error | string | unknown;
};