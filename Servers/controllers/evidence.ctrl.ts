import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { evidenceService } from "../services/evidence.service";

export class EvidenceController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { entityType, entityId, status, search } = req.query;
      const items = await evidenceService.findAll(req.user!.organizationId, {
        entityType: (entityType || undefined) as string | undefined,
        entityId: (entityId || undefined) as string | undefined,
        status: (status || undefined) as string | undefined,
        search: (search || undefined) as string | undefined,
      });
      res.json({ success: true, data: items });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const item = await evidenceService.findById(req.params.id as string, req.user!.organizationId);
      res.json({ success: true, data: item });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { title, entityType, entityId, description, filePath, fileType, status, notes } = req.body;
      if (!title || !entityType || !entityId) {
        res.status(400).json({ success: false, message: "title, entityType, entityId are required" });
        return;
      }
      const item = await evidenceService.create(
        { title, entityType, entityId, description, filePath, fileType, status, notes },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: item });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const item = await evidenceService.update(req.params.id as string, req.body, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, data: item });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await evidenceService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "Evidence deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getSummary(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const summary = await evidenceService.getSummary(req.user!.organizationId);
      res.json({ success: true, data: summary });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const evidenceController = new EvidenceController();
