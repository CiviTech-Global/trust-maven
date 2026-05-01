import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { riskCategoryService } from "../services/riskCategory.service";

export class RiskCategoryController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const categories = await riskCategoryService.findAll(req.user!.organizationId);
      res.json({ success: true, data: categories });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findTree(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tree = await riskCategoryService.findTree(req.user!.organizationId);
      res.json({ success: true, data: tree });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const category = await riskCategoryService.findById(req.params.id as string, req.user!.organizationId);
      res.json({ success: true, data: category });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { name, description, parentId, code, sortOrder } = req.body;
      if (!name) {
        res.status(400).json({ success: false, message: "Name is required" });
        return;
      }
      const category = await riskCategoryService.create(
        { name, description, parentId, code, sortOrder },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: category });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const category = await riskCategoryService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: category });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await riskCategoryService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "Category deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async seedDefaults(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await riskCategoryService.seedDefaults(req.user!.organizationId, req.user!.userId);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const riskCategoryController = new RiskCategoryController();
