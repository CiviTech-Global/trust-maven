import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { tprmService } from "../services/tprm.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class TprmController {
  getQuestionnaire = controllerWrapper(
    async (req) => {
      const assessmentType = (req.query.type as string) || "security";
      const template = tprmService.generateQuestionnaire(assessmentType);
      return { status: 200, data: template };
    },
    { functionName: "getQuestionnaire", eventType: "Read" }
  );

  calculateScore = controllerWrapper(
    async (req) => {
      const { questionnaire } = req.body;
      if (!questionnaire || !Array.isArray(questionnaire)) throw new ValidationException("questionnaire array is required");
      const result = tprmService.scoreQuestionnaire(questionnaire);
      return { status: 200, data: result };
    },
    { functionName: "calculateScore", eventType: "Create" }
  );

  getRiskTrend = controllerWrapper(
    async (req) => {
      const trend = await tprmService.getVendorRiskTrend(req.params.vendorId as string, req.user!.organizationId);
      return { status: 200, data: trend };
    },
    { functionName: "getRiskTrend", eventType: "Read" }
  );

  getOverdueAssessments = controllerWrapper(
    async (req) => {
      const overdue = await tprmService.getOverdueAssessments(req.user!.organizationId);
      return { status: 200, data: overdue };
    },
    { functionName: "getOverdueAssessments", eventType: "Read" }
  );
}

export const tprmController = new TprmController();
