export interface PaginationParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: string | number | boolean | null | undefined;
}

export interface FetchResponse<T> {
  data: T[]
  total_count: number
  page: number
  limit: number
  message?: string
  success?: boolean
}