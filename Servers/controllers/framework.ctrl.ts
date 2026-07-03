import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { frameworkService } from "../services/framework.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class FrameworkController {
  findAll = controllerWrapper(
    async (req) => {
      const { search, page, limit } = req.query;
      const result = await frameworkService.findAll(req.user!.organizationId, {
        search: search as string | undefined,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      return { status: 200, data: result.frameworks, pagination: result.pagination };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const framework = await frameworkService.findById(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: framework };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { name, version, description, requirements } = req.body;
      if (!name) throw new ValidationException("Name is required");
      const framework = await frameworkService.create(
        { name, version, description, requirements },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: framework };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const framework = await frameworkService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: framework };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      await frameworkService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Framework deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  getComplianceCoverage = controllerWrapper(
    async (req) => {
      const coverage = await frameworkService.getComplianceCoverage(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: coverage };
    },
    { functionName: "getComplianceCoverage", eventType: "Read" }
  );

  getAllComplianceSummary = controllerWrapper(
    async (req) => {
      const summaries = await frameworkService.getAllComplianceSummary(req.user!.organizationId);
      return { status: 200, data: summaries };
    },
    { functionName: "getAllComplianceSummary", eventType: "Read" }
  );
}

export const frameworkController = new FrameworkController();
