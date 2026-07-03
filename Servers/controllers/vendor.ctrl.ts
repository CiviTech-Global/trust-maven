import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { vendorService } from "../services/vendor.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class VendorController {
  findAll = controllerWrapper(
    async (req) => {
      const { riskLevel, status, search, page, limit } = req.query;
      const result = await vendorService.findAll(req.user!.organizationId, {
        riskLevel: riskLevel as string | undefined,
        status: status as string | undefined,
        search: search as string | undefined,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      return { status: 200, data: result.vendors, pagination: result.pagination };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const vendor = await vendorService.findById(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: vendor };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { name, description, riskLevel, contactInfo, status } = req.body;
      if (!name) throw new ValidationException("Name is required");
      const vendor = await vendorService.create(
        { name, description, riskLevel, contactInfo, status },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: vendor };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const vendor = await vendorService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: vendor };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      await vendorService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Vendor deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  getAssessments = controllerWrapper(
    async (req) => {
      const assessments = await vendorService.getAssessments(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: assessments };
    },
    { functionName: "getAssessments", eventType: "Read" }
  );

  createAssessment = controllerWrapper(
    async (req) => {
      const vendorId = req.params.id as string;
      const { title, assessmentType, questionnaire, findings, summary, riskRating, score, nextReviewDate } = req.body;
      if (!title || !assessmentType) throw new ValidationException("Title and assessment type are required");
      const assessment = await vendorService.createAssessment(
        { vendorId, title, assessmentType, questionnaire, findings, summary, riskRating, score, nextReviewDate },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: assessment };
    },
    { functionName: "createAssessment", eventType: "Create" }
  );

  deleteAssessment = controllerWrapper(
    async (req) => {
      await vendorService.deleteAssessment(req.params.assessmentId as string, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Assessment deleted" };
    },
    { functionName: "deleteAssessment", eventType: "Delete" }
  );
}

export const vendorController = new VendorController();
