import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { tprmService } from "../services/tprm.service";

function ensureUser(req: AuthenticatedRequest) {
  if (!req.user) throw new Error("Authentication required");
  return req.user;
}

export class TprmController {
  async getQuestionnaire(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const assessmentType = (req.query.type as string) || "security";
      const template = tprmService.generateQuestionnaire(assessmentType);
      res.json({ success: true, data: template });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async calculateScore(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { questionnaire } = req.body;
      if (!questionnaire || !Array.isArray(questionnaire)) {
        res.status(400).json({ success: false, message: "questionnaire array is required" });
        return;
      }
      const result = tprmService.scoreQuestionnaire(questionnaire);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getRiskTrend(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const trend = await tprmService.getVendorRiskTrend(req.params.vendorId as string, user.organizationId);
      res.json({ success: true, data: trend });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getOverdueAssessments(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const overdue = await tprmService.getOverdueAssessments(user.organizationId);
      res.json({ success: true, data: overdue });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const tprmController = new TprmController();
