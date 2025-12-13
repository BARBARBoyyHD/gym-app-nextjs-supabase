import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, RateLimitConfig as LibRateLimitConfig } from '@/lib/rate-limiter';

// Re-export RateLimitConfig so other modules can import it
export type RateLimitConfig = LibRateLimitConfig;

// Default rate limit configuration for members endpoints
const defaultConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
};

export function createRateLimitHandler(config: RateLimitConfig = defaultConfig) {
  const limiter = rateLimit(config);

  return function rateLimitMiddleware(req: NextRequest): NextResponse | null {
    // Get the IP address from the request
    // In a real application, you might need to handle different proxy headers
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded
      ? (forwarded as string).split(',')[0]?.trim() || '127.0.0.1'
      : req.headers.get('x-real-ip') ||
        '127.0.0.1';

    const result = limiter(ip);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          resetTime: result.resetTime,
        },
        { status: 429 } // 429 Too Many Requests
      );
    }

    return null; // Continue with the request if rate limit is not exceeded
  };
}

// Alternative: Function that can be used directly in API routes
export async function checkRateLimit(
  req: NextRequest,
  config: RateLimitConfig = defaultConfig
): Promise<NextResponse | null> {
  const limiter = rateLimit(config);

  // Get the IP address from the request
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded
    ? (forwarded as string).split(',')[0]?.trim() || '127.0.0.1'
    : req.headers.get('x-real-ip') ||
      '127.0.0.1';

  const result = limiter(ip);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message: result.message,
        resetTime: result.resetTime,
      },
      { status: 429 } // 429 Too Many Requests
    );
  }

  return null; // Continue with the request if rate limit is not exceeded
}