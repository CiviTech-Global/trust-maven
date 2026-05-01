import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { frameworkService } from "../services/framework.service";

export class FrameworkController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { search } = req.query;
      const frameworks = await frameworkService.findAll(req.user!.organizationId, {
        search: search as string | undefined,
      });
      res.json({ success: true, data: frameworks });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const framework = await frameworkService.findById(req.params.id as string, req.user!.organizationId);
      res.json({ success: true, data: framework });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { name, version, description, requirements } = req.body;
      if (!name) {
        res.status(400).json({ success: false, message: "Name is required" });
        return;
      }
      const framework = await frameworkService.create(
        { name, version, description, requirements },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: framework });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const framework = await frameworkService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: framework });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await frameworkService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "Framework deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getComplianceCoverage(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const coverage = await frameworkService.getComplianceCoverage(req.params.id as string, req.user!.organizationId);
      res.json({ success: true, data: coverage });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getAllComplianceSummary(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const summaries = await frameworkService.getAllComplianceSummary(req.user!.organizationId);
      res.json({ success: true, data: summaries });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const frameworkController = new FrameworkController();
