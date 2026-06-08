import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { fairAnalysisService } from "../services/fairAnalysis.service";

function ensureUser(req: AuthenticatedRequest) {
  if (!req.user) throw new Error("Authentication required");
  return req.user;
}

export class FairAnalysisController {
  async findByRisk(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const analyses = await fairAnalysisService.findByRisk(req.params.riskId as string, user.organizationId);
      res.json({ success: true, data: analyses });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const analysis = await fairAnalysisService.findById(req.params.id as string, user.organizationId);
      res.json({ success: true, data: analysis });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const { riskId, methodology, lossEventFrequency, lossMagnitude, threatEventFrequency, vulnerability, lossMagnitudeMin, lossMagnitudeMostLikely, lossMagnitudeMax, assumptions, simulationRuns } = req.body;
      if (!riskId) {
        res.status(400).json({ success: false, message: "riskId is required" });
        return;
      }
      const analysis = await fairAnalysisService.create(
        { riskId, methodology, lossEventFrequency, lossMagnitude, threatEventFrequency, vulnerability, lossMagnitudeMin, lossMagnitudeMostLikely, lossMagnitudeMax, assumptions, simulationRuns },
        user.organizationId,
        user.userId
      );
      res.status(201).json({ success: true, data: analysis });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const analysis = await fairAnalysisService.update(
        req.params.id as string,
        req.body,
        user.organizationId,
        user.userId
      );
      res.json({ success: true, data: analysis });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      await fairAnalysisService.delete(req.params.id as string, user.organizationId, user.userId);
      res.json({ success: true, message: "FairAnalysis deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async runSimulation(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const result = await fairAnalysisService.runMonteCarlo(req.params.id as string, user.organizationId);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getExposureSummary(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const summary = await fairAnalysisService.getExposureSummary(user.organizationId);
      res.json({ success: true, data: summary });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const fairAnalysisController = new FairAnalysisController();
