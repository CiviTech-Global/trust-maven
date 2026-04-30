import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";

export function attachOrgContext(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  if (req.user?.organizationId) {
    req.query.organizationId = req.user.organizationId;
  }
  next();
}
