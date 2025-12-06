import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { requireAuth } from "@/lib/auth-utils";

export async function middleware(request: NextRequest) {
  // Use the existing session update function for all requests
  const response = await updateSession(request);

  // Additional authentication and authorization checks for API routes
  const pathname = request.nextUrl.pathname;

  // Define routes that require authentication (excluding public auth endpoints)
  const authRequiredPaths = [
    '/api/members',
    '/api/courses',
    '/api/payments',
    '/api/memberships',
    '/api/membership-plan'
  ];

  const isAuthRequiredRoute = authRequiredPaths.some(path =>
    pathname.startsWith(path)
  );

  // Check if this is an API route that requires authentication
  if (pathname.startsWith('/api/') && isAuthRequiredRoute) {
    // Exclude auth endpoints themselves from the auth check
    if (!pathname.startsWith('/api/auth')) {
      // For protected API routes, check if user is authenticated
      const authResult = await requireAuth();

      if (authResult) {
        // Return the authentication error
        return new NextResponse(
          JSON.stringify({
            success: false,
            ...JSON.parse(authResult.body as string)
          }),
          {
            status: authResult.status,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth endpoints (so they can be accessed)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};