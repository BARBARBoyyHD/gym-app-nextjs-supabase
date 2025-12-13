export interface Members {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export type CreateMemberInput = Omit<
  Members,
  "id" | "created_at" | "updated_at"
>;

// Define the query parameters for searching and filtering members
export interface MemberQueryParams {
  page?: number;
  limit?: number;
  search?: string; // For searching across full_name, email, and phone
  sortBy?: keyof Members;
  sortOrder?: "asc" | "desc";
}

// Define the response type for paginated member results
export interface PaginatedMembersResponse {
  data: Members[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
