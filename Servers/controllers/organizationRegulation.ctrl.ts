import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { complianceHubService } from "../services/complianceHub.service";

export class OrganizationRegulationController {
  async getAdopted(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const adopted = await complianceHubService.getAdoptedRegulations(
        req.user!.organizationId
      );
      res.json({ success: true, data: adopted });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async adopt(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { regulationId, targetComplianceDate, notes } = req.body;
      if (!regulationId) {
        res.status(400).json({ success: false, message: "regulationId is required" });
        return;
      }
      const result = await complianceHubService.adoptRegulation(
        req.user!.organizationId,
        regulationId as string,
        { targetComplianceDate, notes },
        req.user!.userId
      );
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deprecate(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await complianceHubService.deprecateRegulation(
        req.user!.organizationId,
        req.params.id as string,
        req.user!.userId
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await complianceHubService.getImplementationStatus(
        req.user!.organizationId,
        req.params.id as string
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async bulkDeprecate(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { ids } = req.body;
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        res.status(400).json({ success: false, message: "ids array is required" });
        return;
      }
      const result = await complianceHubService.bulkDeprecateRegulations(
        req.user!.organizationId,
        ids,
        req.user!.userId
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async bulkUpdateStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { ids, status } = req.body;
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        res.status(400).json({ success: false, message: "ids array is required" });
        return;
      }
      if (!status) {
        res.status(400).json({ success: false, message: "status is required" });
        return;
      }
      const result = await complianceHubService.bulkUpdateRegulationStatus(
        req.user!.organizationId,
        ids,
        status,
        req.user!.userId
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateImplementation(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await complianceHubService.updateRequirementImplementation(
        req.user!.organizationId,
        req.params.implId as string,
        req.body,
        req.user!.userId
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const organizationRegulationController = new OrganizationRegulationController();
