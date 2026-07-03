import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { complianceHubService } from "../services/complianceHub.service";
import { regulationIntelligenceService } from "../services/regulationIntelligence.service";
import { controllerWrapper } from "../utils/controllerWrapper";

export class ComplianceHubController {
  getDashboard = controllerWrapper(
    async (req) => {
      const dashboard = await complianceHubService.getDashboard(
        req.user!.organizationId
      );
      return { status: 200, data: dashboard };
    },
    { functionName: "getDashboard", eventType: "Read" }
  );

  getAreaCompliance = controllerWrapper(
    async (req) => {
      const result = await complianceHubService.getAreaCompliance(
        req.user!.organizationId,
        req.params.area as string
      );
      return { status: 200, data: result };
    },
    { functionName: "getAreaCompliance", eventType: "Read" }
  );

  getGapAnalysis = controllerWrapper(
    async (req) => {
      const result = await regulationIntelligenceService.getSmartGapAnalysis(
        req.user!.organizationId,
        req.params.regulationId as string
      );
      return { status: 200, data: result };
    },
    { functionName: "getGapAnalysis", eventType: "Read" }
  );

  translateFramework = controllerWrapper(
    async (req) => {
      const result = await regulationIntelligenceService.translateCompliance(
        req.user!.organizationId,
        req.params.from as string,
        req.params.to as string
      );
      return { status: 200, data: result };
    },
    { functionName: "translateFramework", eventType: "Read" }
  );

  recommend = controllerWrapper(
    async (req) => {
      const { industry, size, jurisdictions, existingFrameworks } = req.query;
      const result = await regulationIntelligenceService.recommendFrameworkStack({
        industry: industry as string | undefined,
        size: size as string | undefined,
        jurisdictions: jurisdictions ? (jurisdictions as string).split(",") : undefined,
        existingFrameworks: existingFrameworks ? (existingFrameworks as string).split(",") : undefined,
      });
      return { status: 200, data: result };
    },
    { functionName: "recommend", eventType: "Read" }
  );

  getUnifiedStatus = controllerWrapper(
    async (req) => {
      const result = await regulationIntelligenceService.getUnifiedComplianceStatus(
        req.user!.organizationId
      );
      return { status: 200, data: result };
    },
    { functionName: "getUnifiedStatus", eventType: "Read" }
  );
}

export const complianceHubController = new ComplianceHubController();
