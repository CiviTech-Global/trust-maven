import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { riskQuantificationService } from "../services/riskQuantification.service";

export class RiskQuantificationController {
  async findByRisk(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const quants = await riskQuantificationService.findByRisk(req.params.riskId as string, req.user!.organizationId);
      res.json({ success: true, data: quants });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { singleLossExpectancy, annualRateOfOccurrence, confidenceLevel, methodology, assumptions, assessedAt, lossEventFrequencyMin, lossEventFrequencyMax, lossMagnitudeMin, lossMagnitudeMax } = req.body;
      if (singleLossExpectancy === undefined || annualRateOfOccurrence === undefined) {
        res.status(400).json({ success: false, message: "SLE and ARO are required" });
        return;
      }
      const quant = await riskQuantificationService.create(
        { riskId: req.params.riskId as string, singleLossExpectancy, annualRateOfOccurrence, confidenceLevel, methodology, assumptions, assessedAt, lossEventFrequencyMin, lossEventFrequencyMax, lossMagnitudeMin, lossMagnitudeMax },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: quant });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const quant = await riskQuantificationService.update(
        req.params.qId as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: quant });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await riskQuantificationService.delete(req.params.qId as string, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "Quantification deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getExposureSummary(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const summary = await riskQuantificationService.getExposureSummary(req.user!.organizationId);
      res.json({ success: true, data: summary });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const riskQuantificationController = new RiskQuantificationController();
