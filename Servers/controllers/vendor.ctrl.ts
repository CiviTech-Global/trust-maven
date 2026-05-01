import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { vendorService } from "../services/vendor.service";

export class VendorController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { riskLevel, status, search } = req.query;
      const vendors = await vendorService.findAll(req.user!.organizationId, {
        riskLevel: riskLevel as string | undefined,
        status: status as string | undefined,
        search: search as string | undefined,
      });
      res.json({ success: true, data: vendors });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const vendor = await vendorService.findById(req.params.id as string, req.user!.organizationId);
      res.json({ success: true, data: vendor });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { name, description, riskLevel, contactInfo, status } = req.body;
      if (!name) {
        res.status(400).json({ success: false, message: "Name is required" });
        return;
      }
      const vendor = await vendorService.create(
        { name, description, riskLevel, contactInfo, status },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: vendor });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const vendor = await vendorService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: vendor });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await vendorService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "Vendor deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // Assessments
  async getAssessments(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const assessments = await vendorService.getAssessments(req.params.id as string, req.user!.organizationId);
      res.json({ success: true, data: assessments });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createAssessment(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const vendorId = req.params.id as string;
      const { title, assessmentType, questionnaire, findings, summary, riskRating, score, nextReviewDate } = req.body;
      if (!title || !assessmentType) {
        res.status(400).json({ success: false, message: "Title and assessment type are required" });
        return;
      }
      const assessment = await vendorService.createAssessment(
        { vendorId, title, assessmentType, questionnaire, findings, summary, riskRating, score, nextReviewDate },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: assessment });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteAssessment(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await vendorService.deleteAssessment(req.params.assessmentId as string, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "Assessment deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const vendorController = new VendorController();
