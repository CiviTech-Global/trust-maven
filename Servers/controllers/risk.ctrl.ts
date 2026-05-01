import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { riskService } from "../services/risk.service";
import { riskAssessmentService } from "../services/riskAssessment.service";
import { riskTreatmentService } from "../services/riskTreatment.service";

export class RiskController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { domain, status, projectId, search } = req.query;
      const risks = await riskService.findAll(req.user!.organizationId, {
        domain: domain as string | undefined,
        status: status as string | undefined,
        projectId: projectId as string | undefined,
        search: search as string | undefined,
      });
      res.json({ success: true, data: risks });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const risk = await riskService.findById(id, req.user!.organizationId);
      res.json({ success: true, data: risk });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { title, description, domain, projectId, ownerId } = req.body;
      if (!title || !domain) {
        res.status(400).json({ success: false, message: "Title and domain are required" });
        return;
      }
      const risk = await riskService.create(
        { title, description, domain, projectId, ownerId },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: risk });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const risk = await riskService.update(
        id,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: risk });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await riskService.delete(id, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "Risk deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // Assessment endpoints
  async getAssessments(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const riskId = req.params.riskId as string;
      const assessments = await riskAssessmentService.findByRisk(riskId);
      res.json({ success: true, data: assessments });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createAssessment(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const riskId = req.params.riskId as string;
      const { likelihood, impact, methodology, notes } = req.body;
      if (!likelihood || !impact) {
        res.status(400).json({ success: false, message: "Likelihood and impact are required" });
        return;
      }
      const assessment = await riskAssessmentService.create(
        { riskId, likelihood, impact, methodology, notes },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: assessment });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Treatment endpoints
  async getTreatments(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const riskId = req.params.riskId as string;
      const treatments = await riskTreatmentService.findByRisk(riskId);
      res.json({ success: true, data: treatments });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createTreatment(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const riskId = req.params.riskId as string;
      const { strategy, description, responsibleId, dueDate } = req.body;
      if (!strategy || !description) {
        res.status(400).json({ success: false, message: "Strategy and description are required" });
        return;
      }
      const treatment = await riskTreatmentService.create(
        { riskId, strategy, description, responsibleId, dueDate },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: treatment });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateTreatment(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const treatmentId = req.params.treatmentId as string;
      const treatment = await riskTreatmentService.update(
        treatmentId,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: treatment });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async deleteTreatment(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const treatmentId = req.params.treatmentId as string;
      await riskTreatmentService.delete(
        treatmentId,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, message: "Treatment deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const riskController = new RiskController();
