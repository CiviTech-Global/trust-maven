import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { auditService } from "../services/audit.service";

export class AuditLogController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
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
      res.json({ success: true, data: logs });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findByEntity(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { type, id } = req.params;
      const logs = await auditService.findByEntity(type as string, id as string, req.user!.organizationId);
      res.json({ success: true, data: logs });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const auditLogController = new AuditLogController();
