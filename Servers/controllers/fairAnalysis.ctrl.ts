import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { fairAnalysisService } from "../services/fairAnalysis.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class FairAnalysisController {
  findByRisk = controllerWrapper(
    async (req) => {
      const analyses = await fairAnalysisService.findByRisk(req.params.riskId as string, req.user!.organizationId);
      return { status: 200, data: analyses };
    },
    { functionName: "findByRisk", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const analysis = await fairAnalysisService.findById(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: analysis };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { riskId, methodology, lossEventFrequency, lossMagnitude, threatEventFrequency, vulnerability, lossMagnitudeMin, lossMagnitudeMostLikely, lossMagnitudeMax, assumptions, simulationRuns } = req.body;
      if (!riskId) throw new ValidationException("riskId is required");
      const analysis = await fairAnalysisService.create(
        { riskId, methodology, lossEventFrequency, lossMagnitude, threatEventFrequency, vulnerability, lossMagnitudeMin, lossMagnitudeMostLikely, lossMagnitudeMax, assumptions, simulationRuns },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: analysis };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const analysis = await fairAnalysisService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: analysis };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      await fairAnalysisService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "FairAnalysis deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  runSimulation = controllerWrapper(
    async (req) => {
      const result = await fairAnalysisService.runMonteCarlo(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: result };
    },
    { functionName: "runSimulation", eventType: "Create" }
  );

  getExposureSummary = controllerWrapper(
    async (req) => {
      const summary = await fairAnalysisService.getExposureSummary(req.user!.organizationId);
      return { status: 200, data: summary };
    },
    { functionName: "getExposureSummary", eventType: "Read" }
  );
}

export const fairAnalysisController = new FairAnalysisController();
