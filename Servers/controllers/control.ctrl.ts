import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { controlService } from "../services/control.service";
import { controlFrameworkMappingService } from "../services/controlFrameworkMapping.service";

export class ControlController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { type, effectiveness, riskId, search } = req.query;
      const controls = await controlService.findAll(req.user!.organizationId, {
        type: type as string | undefined,
        effectiveness: effectiveness as string | undefined,
        riskId: riskId as string | undefined,
        search: search as string | undefined,
      });
      res.json({ success: true, data: controls });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const control = await controlService.findById(id, req.user!.organizationId);
      res.json({ success: true, data: control });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { title, description, type, effectiveness, riskId, ownerId, designEffectiveness, operatingEffectiveness, testingMethod, lastTestedAt, nextTestDue, testFrequency } = req.body;
      if (!title || !type) {
        res.status(400).json({ success: false, message: "Title and type are required" });
        return;
      }
      const control = await controlService.create(
        { title, description, type, effectiveness, riskId, ownerId, designEffectiveness, operatingEffectiveness, testingMethod, lastTestedAt, nextTestDue, testFrequency },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: control });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const control = await controlService.update(
        id,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: control });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await controlService.delete(id, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "Control deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // Framework mappings
  async getFrameworkMappings(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const controlId = req.params.id as string;
      const mappings = await controlFrameworkMappingService.findByControl(controlId);
      res.json({ success: true, data: mappings });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async addFrameworkMapping(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const controlId = req.params.id as string;
      const { frameworkId, requirementId } = req.body;
      if (!frameworkId || !requirementId) {
        res.status(400).json({ success: false, message: "Framework ID and requirement ID are required" });
        return;
      }
      const mapping = await controlFrameworkMappingService.create(
        { controlId, frameworkId, requirementId },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: mapping });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async removeFrameworkMapping(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const mappingId = req.params.mappingId as string;
      await controlFrameworkMappingService.delete(
        mappingId,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, message: "Framework mapping removed" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const controlController = new ControlController();
