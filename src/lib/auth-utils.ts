import { createClient } from "@/lib/supabase/server";
import { errorResponse } from "@/utils/response";

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
}

/**
 * Gets the authenticated user
 * @returns AuthUser object or null if not authenticated
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email || '',
    user_metadata: user.user_metadata || {}
  };
}

/**
 * Middleware function to check for authentication
 * @returns Response with error if not authenticated, null if authorized
 */
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    return errorResponse({
      success: false,
      status: 401,
      message: "Authentication required",
      error: "User not authenticated"
    });
  }

  return null; // User is authenticated
}