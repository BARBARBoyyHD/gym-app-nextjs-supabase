// Generic validation utilities with TypeScript generics

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Individual validation functions for specific fields
export function validateFullName(value: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (value === undefined || value === null) {
    return { isValid: true, errors };
  }

  if (typeof value !== "string") {
    errors.push({ field: "full_name", message: "Full name must be a string" });
    return { isValid: false, errors };
  }

  const trimmed = value.trim();

  if (trimmed.length === 0) {
    errors.push({
      field: "full_name",
      message: "Full name must be a non-empty string",
    });
  } else if (trimmed.length > 100) {
    errors.push({
      field: "full_name",
      message: "Full name must not exceed 100 characters",
    });
  }

  // NEW STRICT CHECK
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(trimmed)) {
    errors.push({
      field: "full_name",
      message: "Full name must contain only letters and spaces",
    });
  }

  return { isValid: errors.length === 0, errors };
}

export function validateName(value: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (value === undefined || value === null) {
    errors.push({ field: "name", message: "Name is required" });
    return { isValid: false, errors };
  }

  if (typeof value !== "string") {
    errors.push({ field: "name", message: "Name must be a string" });
    return { isValid: false, errors };
  }

  if (value.trim().length === 0) {
    errors.push({ field: "name", message: "Name must be a non-empty string" });
  } else if (value.trim().length > 100) {
    errors.push({
      field: "name",
      message: "Name must not exceed 100 characters",
    });
  }

  return { isValid: errors.length === 0, errors };
}

export function validateEmail(value: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (typeof value !== "string") {
    errors.push({ field: "email", message: "Email must be a string" });
    return { isValid: false, errors };
  }

  if (value.trim().length === 0) {
    errors.push({ field: "email", message: "Email is required" });
    return { isValid: false, errors };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    errors.push({ field: "email", message: "Email format is invalid" });
  }

  return { isValid: errors.length === 0, errors };
}


export function validatePhone(value: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (value === undefined || value === null) {
    // If value is undefined or null, it's acceptable for optional fields
    return { isValid: true, errors };
  }

  if (typeof value !== "string") {
    errors.push({ field: "phone", message: "Phone must be a string" });
    return { isValid: false, errors };
  }

  const phoneRegex = /^[0-9+\-\s().]+$/;
  if (!phoneRegex.test(value)) {
    errors.push({ field: "phone", message: "Phone number format is invalid" });
  } else if (value.replace(/[^0-9]/g, "").length < 10) {
    errors.push({
      field: "phone",
      message: "Phone number is too short (minimum 10 digits)",
    });
  }

  return { isValid: errors.length === 0, errors };
}
