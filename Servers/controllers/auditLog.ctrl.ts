import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { auditService } from "../services/audit.service";
import { controllerWrapper } from "../utils/controllerWrapper";

export class AuditLogController {
  findAll = controllerWrapper(
    async (req) => {
      const { entityType, entityId, userId, from, to, page, limit } = req.query;
      const logs = await auditService.findAll(req.user!.organizationId, {
        entityType: entityType as string | undefined,
        entityId: entityId as string | undefined,
        userId: userId as string | undefined,
        from: from as string | undefined,
        to: to as string | undefined,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      return { status: 200, data: logs };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findByEntity = controllerWrapper(
    async (req) => {
      const { type, id } = req.params;
      const logs = await auditService.findByEntity(type as string, id as string, req.user!.organizationId);
      return { status: 200, data: logs };
    },
    { functionName: "findByEntity", eventType: "Read" }
  );
}

export const auditLogController = new AuditLogController();
