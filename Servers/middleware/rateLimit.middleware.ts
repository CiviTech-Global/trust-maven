/**
 * Tiered Rate Limiting Middleware
 *
 * Provides different rate limits for different endpoint types:
 * - Auth: 5 requests / 15 min (brute force protection)
 * - File operations: 50 requests / 15 min (expensive I/O)
 * - General API: 200 requests / 15 min (standard CRUD)
 */

import { rateLimit } from "express-rate-limit";
import { logger } from "../utils/logger";

interface RateLimitConfig {
  windowMinutes: number;
  maxRequests: number;
  message: string;
}

const CONFIGS: Record<string, RateLimitConfig> = {
  auth: {
    windowMinutes: 15,
    maxRequests: 5,
    message: "Too many authentication attempts. Please try again in 15 minutes.",
  },
  fileOperations: {
    windowMinutes: 15,
    maxRequests: 50,
    message: "Too many file operation requests. Please try again in 15 minutes.",
  },
  general: {
    windowMinutes: 15,
    maxRequests: 200,
    message: "Too many requests. Please try again in 15 minutes.",
  },
};

function createLimiter(config: RateLimitConfig) {
  return rateLimit({
    windowMs: config.windowMinutes * 60 * 1000,
    max: config.maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn(`Rate limit exceeded: ${req.ip} on ${req.path}`);
      res.status(429).json({
        success: false,
        message: config.message,
        code: "RATE_LIMITED",
      });
    },
  });
}

/** Strict limiter for login/register/reset-password */
export const authLimiter = createLimiter(CONFIGS.auth);

/** @deprecated Use authLimiter instead */
export const authRateLimit = authLimiter;

/** Moderate limiter for file uploads/downloads */
export const fileOperationsLimiter = createLimiter(CONFIGS.fileOperations);

/** Standard limiter for general API endpoints */
export const generalApiLimiter = createLimiter(CONFIGS.general);

/** @deprecated Use generalApiLimiter instead */
export const apiRateLimit = generalApiLimiter;
