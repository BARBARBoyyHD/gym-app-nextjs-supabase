// Simple in-memory rate limiter for development
// In production, you would use Redis or similar for distributed rate limiting
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number; // timestamp when the limit resets
  };
}

const rateLimitStore: RateLimitStore = {};

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  max: number; // Maximum number of requests allowed
  message?: string; // Custom message to return when limit is exceeded
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  message?: string;
}

export function rateLimit(config: RateLimitConfig) {
  return function (ip: string): RateLimitResult {
    const now = Date.now();

    // Check if this IP exists in the store
    if (!rateLimitStore[ip]) {
      // Create new entry for this IP
      rateLimitStore[ip] = {
        count: 1,
        resetTime: now + config.windowMs
      };

      return {
        success: true,
        remaining: config.max - 1,
        resetTime: rateLimitStore[ip].resetTime
      };
    }

    const ipRecord = rateLimitStore[ip];

    // If the window has passed, reset the counter
    if (now > ipRecord.resetTime) {
      rateLimitStore[ip] = {
        count: 1,
        resetTime: now + config.windowMs
      };

      return {
        success: true,
        remaining: config.max - 1,
        resetTime: rateLimitStore[ip].resetTime
      };
    }
    
    // Increment the counter
    ipRecord.count++;
    
    // Check if they've exceeded the limit
    if (ipRecord.count > config.max) {
      return {
        success: false,
        remaining: 0,
        resetTime: ipRecord.resetTime,
        message: config.message || `Too many requests, please try again later.`
      };
    }
    
    return {
      success: true,
      remaining: config.max - ipRecord.count,
      resetTime: ipRecord.resetTime
    };
  };
}