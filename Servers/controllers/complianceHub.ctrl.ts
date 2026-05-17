import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { complianceHubService } from "../services/complianceHub.service";
import { regulationIntelligenceService } from "../services/regulationIntelligence.service";

export class ComplianceHubController {
  async getDashboard(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const dashboard = await complianceHubService.getDashboard(
        req.user!.organizationId
      );
      res.json({ success: true, data: dashboard });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAreaCompliance(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await complianceHubService.getAreaCompliance(
        req.user!.organizationId,
        req.params.area as string
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getGapAnalysis(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await regulationIntelligenceService.getSmartGapAnalysis(
        req.user!.organizationId,
        req.params.regulationId as string
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async translateFramework(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await regulationIntelligenceService.translateCompliance(
        req.user!.organizationId,
        req.params.from as string,
        req.params.to as string
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async recommend(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { industry, size, jurisdictions, existingFrameworks } = req.query;
      const result = await regulationIntelligenceService.recommendFrameworkStack({
        industry: industry as string | undefined,
        size: size as string | undefined,
        jurisdictions: jurisdictions ? (jurisdictions as string).split(",") : undefined,
        existingFrameworks: existingFrameworks ? (existingFrameworks as string).split(",") : undefined,
      });
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getUnifiedStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await regulationIntelligenceService.getUnifiedComplianceStatus(
        req.user!.organizationId
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const complianceHubController = new ComplianceHubController();
