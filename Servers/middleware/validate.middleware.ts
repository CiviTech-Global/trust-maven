/**
 * Zod Validation Middleware
 *
 * Provides request validation using Zod schemas.
 * Validates body, params, and/or query against provided schemas.
 * Returns 400 with structured error details on validation failure.
 */

import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

interface ValidationSchemas {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

/**
 * Creates middleware that validates request data against Zod schemas.
 *
 * @example
 * import { z } from "zod";
 * const createRiskSchema = z.object({
 *   title: z.string().min(1).max(255),
 *   domain: z.enum(["financial", "cybersecurity", "strategic", "operational", "regulatory"]),
 * });
 * router.post("/", validate({ body: createRiskSchema }), controller.create);
 */
export function validate(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: Array<{ path: string; field: string; message: string }> = [];

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        errors.push(...formatZodErrors(result.error, "body"));
      } else {
        req.body = result.data; // Use parsed/transformed data
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        errors.push(...formatZodErrors(result.error, "params"));
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        errors.push(...formatZodErrors(result.error, "query"));
      }
    }

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        errors,
      });
      return;
    }

    next();
  };
}

function formatZodErrors(error: ZodError, source: string) {
  return error.issues.map((issue) => ({
    path: source,
    field: issue.path.join("."),
    message: issue.message,
  }));
}
