import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-utils";

/**
 * API Authentication Middleware
 * This middleware can be used to enforce authentication on specific API routes
 */
export async function apiAuthMiddleware(request: NextRequest): Promise<NextResponse> {
  // Check if user is authenticated
  const authResult = await requireAuth();
  
  if (authResult) {
    // If requireAuth returns an error response, return that
    return NextResponse.json(
      { 
        success: false, 
        message: authResult.body ? JSON.parse(authResult.body as string).message : "Authentication required" 
      },
      { status: authResult.status || 401 }
    );
  }

  // If authenticated, continue to the next middleware/route handler
  return NextResponse.next();
}

// Default export for use in config
export default apiAuthMiddleware;