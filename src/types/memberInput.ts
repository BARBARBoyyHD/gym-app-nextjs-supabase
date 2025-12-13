// Define the input type for creating a new member with validation
export interface CreateMemberInput {
  name: string;
  email: string;
  phone?: string;
  joined_date?: string;
}

// Define the validation errors type
export interface ValidationError {
  field: string;
  message: string;
}

// Define the validation result type
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Define the type for updating a member
export interface UpdateMemberInput {
  name?: string;
  email?: string;
  phone?: string;
  joined_date?: string;
}