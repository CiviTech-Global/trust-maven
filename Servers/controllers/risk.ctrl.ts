import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { riskService } from "../services/risk.service";
import { riskAssessmentService } from "../services/riskAssessment.service";
import { riskTreatmentService } from "../services/riskTreatment.service";
import { riskControlMappingService } from "../services/riskControlMapping.service";
import { aiService } from "../services/ai.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class RiskController {
  findAll = controllerWrapper(
    async (req) => {
      const { domain, status, projectId, search, page, limit } = req.query;
      const result = await riskService.findAll(req.user!.organizationId, {
        domain: domain as string | undefined,
        status: status as string | undefined,
        projectId: projectId as string | undefined,
        search: search as string | undefined,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      return { status: 200, data: result.risks, pagination: result.pagination };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      const risk = await riskService.findById(id, req.user!.organizationId);
      return { status: 200, data: risk };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { title, description, domain, projectId, ownerId } = req.body;
      if (!title || !domain) throw new ValidationException("Title and domain are required");
      const risk = await riskService.create(
        { title, description, domain, projectId, ownerId },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: risk };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      const risk = await riskService.update(
        id,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: risk };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      await riskService.delete(id, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Risk deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  getAssessments = controllerWrapper(
    async (req) => {
      const riskId = req.params.riskId as string;
      const assessments = await riskAssessmentService.findByRisk(riskId);
      return { status: 200, data: assessments };
    },
    { functionName: "getAssessments", eventType: "Read" }
  );

  createAssessment = controllerWrapper(
    async (req) => {
      const riskId = req.params.riskId as string;
      const { likelihood, impact, methodology, notes } = req.body;
      if (!likelihood || !impact) throw new ValidationException("Likelihood and impact are required");
      const assessment = await riskAssessmentService.create(
        { riskId, likelihood, impact, methodology, notes },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: assessment };
    },
    { functionName: "createAssessment", eventType: "Create" }
  );

  updateAssessment = controllerWrapper(
    async (req) => {
      const assessmentId = req.params.assessmentId as string;
      const assessment = await riskAssessmentService.update(
        assessmentId,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: assessment };
    },
    { functionName: "updateAssessment", eventType: "Update" }
  );

  deleteAssessment = controllerWrapper(
    async (req) => {
      const assessmentId = req.params.assessmentId as string;
      await riskAssessmentService.delete(
        assessmentId,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, message: "Assessment deleted" };
    },
    { functionName: "deleteAssessment", eventType: "Delete" }
  );

  getTreatments = controllerWrapper(
    async (req) => {
      const riskId = req.params.riskId as string;
      const treatments = await riskTreatmentService.findByRisk(riskId);
      return { status: 200, data: treatments };
    },
    { functionName: "getTreatments", eventType: "Read" }
  );

  createTreatment = controllerWrapper(
    async (req) => {
      const riskId = req.params.riskId as string;
      const { strategy, description, responsibleId, dueDate } = req.body;
      if (!strategy || !description) throw new ValidationException("Strategy and description are required");
      const treatment = await riskTreatmentService.create(
        { riskId, strategy, description, responsibleId, dueDate },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: treatment };
    },
    { functionName: "createTreatment", eventType: "Create" }
  );

  updateTreatment = controllerWrapper(
    async (req) => {
      const treatmentId = req.params.treatmentId as string;
      const treatment = await riskTreatmentService.update(
        treatmentId,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: treatment };
    },
    { functionName: "updateTreatment", eventType: "Update" }
  );

  deleteTreatment = controllerWrapper(
    async (req) => {
      const treatmentId = req.params.treatmentId as string;
      await riskTreatmentService.delete(
        treatmentId,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, message: "Treatment deleted" };
    },
    { functionName: "deleteTreatment", eventType: "Delete" }
  );

  approveAssessment = controllerWrapper(
    async (req) => {
      const assessmentId = req.params.assessmentId as string;
      const assessment = await riskAssessmentService.approve(
        assessmentId,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: assessment };
    },
    { functionName: "approveAssessment", eventType: "Update" }
  );

  rejectAssessment = controllerWrapper(
    async (req) => {
      const assessmentId = req.params.assessmentId as string;
      const assessment = await riskAssessmentService.reject(
        assessmentId,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: assessment };
    },
    { functionName: "rejectAssessment", eventType: "Update" }
  );

  approveTreatment = controllerWrapper(
    async (req) => {
      const treatmentId = req.params.treatmentId as string;
      const treatment = await riskTreatmentService.approve(
        treatmentId,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: treatment };
    },
    { functionName: "approveTreatment", eventType: "Update" }
  );

  rejectTreatment = controllerWrapper(
    async (req) => {
      const treatmentId = req.params.treatmentId as string;
      const treatment = await riskTreatmentService.reject(
        treatmentId,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: treatment };
    },
    { functionName: "rejectTreatment", eventType: "Update" }
  );

  getRiskControlMappings = controllerWrapper(
    async (req) => {
      const riskId = req.params.riskId as string;
      const mappings = await riskControlMappingService.findByRisk(riskId);
      return { status: 200, data: mappings };
    },
    { functionName: "getRiskControlMappings", eventType: "Read" }
  );

  addRiskControlMapping = controllerWrapper(
    async (req) => {
      const riskId = req.params.riskId as string;
      const controlId = req.params.controlId as string;
      const mapping = await riskControlMappingService.create(
        { riskId, controlId },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: mapping };
    },
    { functionName: "addRiskControlMapping", eventType: "Create" }
  );

  removeRiskControlMapping = controllerWrapper(
    async (req) => {
      const controlId = req.params.controlId as string;
      await riskControlMappingService.delete(
        controlId,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, message: "Control unlinked from risk" };
    },
    { functionName: "removeRiskControlMapping", eventType: "Delete" }
  );

  bulkUpdate = controllerWrapper(
    async (req) => {
      const { ids, data } = req.body;
      if (!ids || !Array.isArray(ids) || !ids.length) throw new ValidationException("Risk IDs array is required");
      const result = await riskService.bulkUpdate(ids, data, req.user!.organizationId, req.user!.userId);
      return { status: 200, data: result };
    },
    { functionName: "bulkUpdate", eventType: "Update" }
  );

  bulkDelete = controllerWrapper(
    async (req) => {
      const { ids } = req.body;
      if (!ids || !Array.isArray(ids) || !ids.length) throw new ValidationException("Risk IDs array is required");
      for (const id of ids) {
        await riskService.delete(id, req.user!.organizationId, req.user!.userId);
      }
      return { status: 200, data: { deleted: ids.length } };
    },
    { functionName: "bulkDelete", eventType: "Delete" }
  );

  suggestScore = controllerWrapper(
    async (req) => {
      const riskId = req.params.riskId as string;
      const suggestion = await aiService.suggestRiskScore(riskId, req.user!.organizationId);
      return { status: 200, data: suggestion };
    },
    { functionName: "suggestScore", eventType: "Read" }
  );

  suggestTreatment = controllerWrapper(
    async (req) => {
      const riskId = req.params.riskId as string;
      const suggestion = await aiService.suggestTreatmentStrategy(riskId, req.user!.organizationId);
      return { status: 200, data: suggestion };
    },
    { functionName: "suggestTreatment", eventType: "Read" }
  );
}

export const riskController = new RiskController();
