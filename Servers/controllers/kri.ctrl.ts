import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { kriService } from "../services/kri.service";

export class KRIController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { category, status, riskId, search } = req.query;
      const kris = await kriService.findAll(req.user!.organizationId, {
        category: category as string | undefined,
        status: status as string | undefined,
        riskId: riskId as string | undefined,
        search: search as string | undefined,
      });
      res.json({ success: true, data: kris });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const kri = await kriService.findById(req.params.id as string, req.user!.organizationId);
      res.json({ success: true, data: kri });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { name, description, category, currentValue, thresholdGreen, thresholdAmber, thresholdRed, direction, unit, frequency, riskId, ownerId } = req.body;
      if (!name || !category || currentValue === undefined || thresholdGreen === undefined || thresholdAmber === undefined || thresholdRed === undefined) {
        res.status(400).json({ success: false, message: "Name, category, currentValue, and all thresholds are required" });
        return;
      }
      const kri = await kriService.create(
        { name, description, category, currentValue, thresholdGreen, thresholdAmber, thresholdRed, direction, unit, frequency, riskId, ownerId },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: kri });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const kri = await kriService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: kri });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await kriService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "KRI deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getSummary(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const summary = await kriService.getSummary(req.user!.organizationId);
      res.json({ success: true, data: summary });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getBreached(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const breached = await kriService.getBreachedKRIs(req.user!.organizationId);
      res.json({ success: true, data: breached });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const kriController = new KRIController();
