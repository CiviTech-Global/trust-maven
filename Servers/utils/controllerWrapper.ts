/**
 * Controller Wrapper Utility
 *
 * Standardizes request/response handling across all controllers:
 * - Automatic try/catch with proper error responses
 * - Structured logging (processing → success/failure)
 * - Custom exception handling with correct HTTP status codes
 * - Consistent response format: { success: true, data } or { success: false, message, code }
 */

import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { isAppException } from "../domain.layer/exceptions/custom.exception";
import { logger } from "./logger";

export type EventType = "Create" | "Read" | "Update" | "Delete";

export interface ControllerResult<T = unknown> {
  status: number;
  data?: T;
  message?: string;
}

export interface WrapperOptions {
  /** Controller function name for logging */
  functionName: string;
  /** CRUD event type for audit context */
  eventType: EventType;
}

/**
 * Wraps an async controller handler with standardized logging and error handling.
 *
 * @example
 * export const getAll = controllerWrapper(
 *   async (req) => {
 *     const items = await service.findAll(req.user!.organizationId);
 *     return { status: 200, data: items };
 *   },
 *   { functionName: "getAll", eventType: "Read" }
 * );
 */
export function controllerWrapper<T = unknown>(
  handler: (req: AuthenticatedRequest, res: Response) => Promise<ControllerResult<T>>,
  options: WrapperOptions,
) {
  return async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { functionName, eventType } = options;
    const userId = req.user?.userId || "anonymous";
    const orgId = req.user?.organizationId || "unknown";

    logger.info(`[${eventType}] ${functionName} started | user=${userId} org=${orgId}`);

    try {
      const result = await handler(req, res);

      logger.info(`[${eventType}] ${functionName} succeeded | status=${result.status}`);

      if (result.status === 204) {
        res.status(204).send();
        return;
      }

      res.status(result.status).json({
        success: true,
        data: result.data,
        ...(result.message ? { message: result.message } : {}),
      });
    } catch (error: unknown) {
      if (isAppException(error)) {
        logger.warn(`[${eventType}] ${functionName} failed | ${error.code}: ${error.message}`);
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
          code: error.code,
          ...(Object.keys(error.metadata).length > 0 ? { details: error.metadata } : {}),
        });
        return;
      }

      const err = error instanceof Error ? error : new Error(String(error));
      logger.error(`[${eventType}] ${functionName} unhandled error: ${err.message}`);
      res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
        code: "INTERNAL_ERROR",
      });
    }
  };
}
