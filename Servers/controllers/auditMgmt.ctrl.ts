import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { auditMgmtService } from "../services/auditMgmt.service";

export class AuditMgmtController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { status, auditType, search } = req.query;
      const audits = await auditMgmtService.findAllAudits(req.user!.organizationId, {
        status: status as string | undefined,
        auditType: auditType as string | undefined,
        search: search as string | undefined,
      });
      res.json({ success: true, data: audits });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const audit = await auditMgmtService.findAuditById(req.params.id as string, req.user!.organizationId);
      res.json({ success: true, data: audit });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { title, description, auditType, status, leadAuditorId, scope, startDate, endDate } = req.body;
      if (!title || !auditType || !startDate) {
        res.status(400).json({ success: false, message: "Title, audit type, and start date are required" });
        return;
      }
      const audit = await auditMgmtService.createAudit(
        { title, description, auditType, status, leadAuditorId, scope, startDate, endDate },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: audit });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const audit = await auditMgmtService.updateAudit(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: audit });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await auditMgmtService.deleteAudit(req.params.id as string, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "Audit deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async createFinding(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { title, description, severity, status, responsibleId, controlId, riskId, dueDate, remediationNotes } = req.body;
      if (!title || !severity) {
        res.status(400).json({ success: false, message: "Title and severity are required" });
        return;
      }
      const finding = await auditMgmtService.createFinding(
        req.params.id as string,
        { title, description, severity, status, responsibleId, controlId, riskId, dueDate, remediationNotes },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: finding });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateFinding(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const finding = await auditMgmtService.updateFinding(
        req.params.id as string,
        req.params.findingId as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: finding });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async deleteFinding(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await auditMgmtService.deleteFinding(
        req.params.id as string,
        req.params.findingId as string,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, message: "Finding deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getOverdueFindings(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const findings = await auditMgmtService.getOverdueFindings(req.user!.organizationId);
      res.json({ success: true, data: findings });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const auditMgmtController = new AuditMgmtController();
