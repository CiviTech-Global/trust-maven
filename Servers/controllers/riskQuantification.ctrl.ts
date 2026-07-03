import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { riskQuantificationService } from "../services/riskQuantification.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class RiskQuantificationController {
  findByRisk = controllerWrapper(
    async (req) => {
      const quants = await riskQuantificationService.findByRisk(req.params.riskId as string, req.user!.organizationId);
      return { status: 200, data: quants };
    },
    { functionName: "findByRisk", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { singleLossExpectancy, annualRateOfOccurrence, confidenceLevel, methodology, assumptions, assessedAt, lossEventFrequencyMin, lossEventFrequencyMax, lossMagnitudeMin, lossMagnitudeMax } = req.body;
      if (singleLossExpectancy === undefined || annualRateOfOccurrence === undefined) {
        throw new ValidationException("SLE and ARO are required");
      }
      const quant = await riskQuantificationService.create(
        { riskId: req.params.riskId as string, singleLossExpectancy, annualRateOfOccurrence, confidenceLevel, methodology, assumptions, assessedAt, lossEventFrequencyMin, lossEventFrequencyMax, lossMagnitudeMin, lossMagnitudeMax },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: quant };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const quant = await riskQuantificationService.update(
        req.params.qId as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: quant };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      await riskQuantificationService.delete(req.params.qId as string, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Quantification deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  getExposureSummary = controllerWrapper(
    async (req) => {
      const summary = await riskQuantificationService.getExposureSummary(req.user!.organizationId);
      return { status: 200, data: summary };
    },
    { functionName: "getExposureSummary", eventType: "Read" }
  );
}

export const riskQuantificationController = new RiskQuantificationController();
