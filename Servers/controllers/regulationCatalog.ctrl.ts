import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { regulationCatalogService } from "../services/regulationCatalog.service";

export class RegulationCatalogController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { category, type, jurisdiction, search } = req.query;
      const regulations = await regulationCatalogService.findAll({
        category: category as string | undefined,
        type: type as string | undefined,
        jurisdiction: jurisdiction as string | undefined,
        search: search as string | undefined,
      });
      res.json({ success: true, data: regulations });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await regulationCatalogService.getRequirementTree(req.params.id as string);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getRequirements(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const requirements = await regulationCatalogService.getRequirementFlat(req.params.id as string);
      res.json({ success: true, data: requirements });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getRequirement(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await regulationCatalogService.getRequirement(req.params.reqId as string);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getOverlap(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await regulationCatalogService.getFrameworkOverlap(
        req.params.id1 as string,
        req.params.id2 as string
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const regulationCatalogController = new RegulationCatalogController();
