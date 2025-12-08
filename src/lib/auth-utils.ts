import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/config/supabaseKey";

/**
 * Creates a Supabase client for use in middleware.
 */
export function createMiddlewareClient(request: NextRequest) {
  // Create the Supabase client
  const supabase = createServerClient(
    SUPABASE_URL!,
    SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  return { supabase };
}

/**
 * Checks if the user is authenticated in middleware.
 * @returns Promise that resolves to a NextResponse if not authenticated, or null if authenticated
 */
export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  try {
    const { supabase } = createMiddlewareClient(request);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Return an error response if user is not authenticated
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    // Return null if user is authenticated
    return null;
  } catch (error) {
    // Return an error response if there's an exception
    return NextResponse.json(
      { success: false, message: "Authentication error" },
      { status: 401 }
    );
  }
}