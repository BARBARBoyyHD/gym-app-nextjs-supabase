import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-utils";

/**
 * API Authentication Middleware
 * This middleware can be used to enforce authentication on specific API routes
 */
export async function apiAuthMiddleware(request: NextRequest): Promise<NextResponse> {
  // Check if user is authenticated
  const authResult = await requireAuth(request);

  if (authResult) {
    // If requireAuth returns an error response, return that
    return authResult;
  }

  // If authenticated, continue to the next middleware/route handler
  return NextResponse.next();
}

// Default export for use in config
export default apiAuthMiddleware;