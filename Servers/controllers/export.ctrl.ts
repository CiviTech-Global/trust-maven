import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { exportService } from "../services/export.service";

export class ExportController {
  async exportRisks(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { domain, status } = req.query;
      const csv = await exportService.exportRisksCSV(req.user!.organizationId, {
        domain: domain as string | undefined,
        status: status as string | undefined,
      });
      const date = new Date().toISOString().split("T")[0];
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="risks-${date}.csv"`);
      res.send(csv);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async exportAuditLogs(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { from, to } = req.query;
      const csv = await exportService.exportAuditCSV(req.user!.organizationId, {
        from: from as string | undefined,
        to: to as string | undefined,
      });
      const date = new Date().toISOString().split("T")[0];
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="audit-logs-${date}.csv"`);
      res.send(csv);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const exportController = new ExportController();
