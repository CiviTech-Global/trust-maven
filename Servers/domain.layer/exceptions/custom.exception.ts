/**
 * Custom Exception System for TrustMaven
 *
 * Provides typed exceptions that map to HTTP status codes.
 * Used with controllerWrapper for automatic error response formatting.
 */

export interface ExceptionMetadata {
  [key: string]: unknown;
}

export class AppException extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly metadata: ExceptionMetadata;

  constructor(message: string, statusCode: number, code: string, metadata: ExceptionMetadata = {}) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.metadata = metadata;
    Object.setPrototypeOf(this, AppException.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      metadata: this.metadata,
    };
  }
}

/** 400 - Invalid input data */
export class ValidationException extends AppException {
  constructor(message: string, field?: string, value?: unknown) {
    super(message, 400, "VALIDATION_ERROR", { field, value });
    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}

/** 404 - Resource not found */
export class NotFoundException extends AppException {
  constructor(message: string, resource?: string, identifier?: unknown) {
    super(message, 404, "NOT_FOUND", { resource, identifier });
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

/** 401 - Authentication required or failed */
export class UnauthorizedException extends AppException {
  constructor(message = "Authentication required") {
    super(message, 401, "UNAUTHORIZED");
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}

/** 403 - Insufficient permissions */
export class ForbiddenException extends AppException {
  constructor(message = "Access denied", resource?: string, action?: string) {
    super(message, 403, "FORBIDDEN", { resource, action });
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}

/** 409 - Resource conflict (duplicate, etc.) */
export class ConflictException extends AppException {
  constructor(message: string, resource?: string, conflictField?: string) {
    super(message, 409, "CONFLICT", { resource, conflictField });
    Object.setPrototypeOf(this, ConflictException.prototype);
  }
}

/** 422 - Business rule violation */
export class BusinessLogicException extends AppException {
  constructor(message: string, rule?: string, context?: unknown) {
    super(message, 422, "BUSINESS_LOGIC_ERROR", { rule, context });
    Object.setPrototypeOf(this, BusinessLogicException.prototype);
  }
}

/** 500 - Database-level error */
export class DatabaseException extends AppException {
  constructor(message: string, operation?: string, table?: string) {
    super(message, 500, "DATABASE_ERROR", { operation, table });
    Object.setPrototypeOf(this, DatabaseException.prototype);
  }
}

/** Type guard */
export function isAppException(error: unknown): error is AppException {
  return error instanceof AppException;
}
