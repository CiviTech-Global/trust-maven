import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { evidenceService } from "../services/evidence.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class EvidenceController {
  findAll = controllerWrapper(
    async (req) => {
      const { entityType, entityId, status, search, page, limit } = req.query;
      const result = await evidenceService.findAll(req.user!.organizationId, {
        entityType: (entityType || undefined) as string | undefined,
        entityId: (entityId || undefined) as string | undefined,
        status: (status || undefined) as string | undefined,
        search: (search || undefined) as string | undefined,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      return { status: 200, data: result.evidence, pagination: result.pagination };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const item = await evidenceService.findById(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: item };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { title, entityType, entityId, description, filePath, fileType, status, notes } = req.body;
      if (!title || !entityType || !entityId) throw new ValidationException("title, entityType, entityId are required");
      const item = await evidenceService.create(
        { title, entityType, entityId, description, filePath, fileType, status, notes },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: item };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const item = await evidenceService.update(req.params.id as string, req.body, req.user!.organizationId, req.user!.userId);
      return { status: 200, data: item };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      await evidenceService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Evidence deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  getSummary = controllerWrapper(
    async (req) => {
      const summary = await evidenceService.getSummary(req.user!.organizationId);
      return { status: 200, data: summary };
    },
    { functionName: "getSummary", eventType: "Read" }
  );
}

export const evidenceController = new EvidenceController();
