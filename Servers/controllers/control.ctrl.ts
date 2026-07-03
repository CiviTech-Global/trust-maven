import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { controlService } from "../services/control.service";
import { controlFrameworkMappingService } from "../services/controlFrameworkMapping.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class ControlController {
  findAll = controllerWrapper(
    async (req) => {
      const { type, effectiveness, riskId, search, page, limit } = req.query;
      const result = await controlService.findAll(req.user!.organizationId, {
        type: type as string | undefined,
        effectiveness: effectiveness as string | undefined,
        riskId: riskId as string | undefined,
        search: search as string | undefined,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      return { status: 200, data: result.controls, pagination: result.pagination };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      const control = await controlService.findById(id, req.user!.organizationId);
      return { status: 200, data: control };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { title, description, type, effectiveness, riskId, ownerId, designEffectiveness, operatingEffectiveness, testingMethod, lastTestedAt, nextTestDue, testFrequency } = req.body;
      if (!title || !type) throw new ValidationException("Title and type are required");
      const control = await controlService.create(
        { title, description, type, effectiveness, riskId, ownerId, designEffectiveness, operatingEffectiveness, testingMethod, lastTestedAt, nextTestDue, testFrequency },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: control };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      const control = await controlService.update(
        id,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: control };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      await controlService.delete(id, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Control deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  getFrameworkMappings = controllerWrapper(
    async (req) => {
      const controlId = req.params.id as string;
      const mappings = await controlFrameworkMappingService.findByControl(controlId);
      return { status: 200, data: mappings };
    },
    { functionName: "getFrameworkMappings", eventType: "Read" }
  );

  addFrameworkMapping = controllerWrapper(
    async (req) => {
      const controlId = req.params.id as string;
      const { frameworkId, requirementId } = req.body;
      if (!frameworkId || !requirementId) throw new ValidationException("Framework ID and requirement ID are required");
      const mapping = await controlFrameworkMappingService.create(
        { controlId, frameworkId, requirementId },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: mapping };
    },
    { functionName: "addFrameworkMapping", eventType: "Create" }
  );

  removeFrameworkMapping = controllerWrapper(
    async (req) => {
      const mappingId = req.params.mappingId as string;
      await controlFrameworkMappingService.delete(
        mappingId,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, message: "Framework mapping removed" };
    },
    { functionName: "removeFrameworkMapping", eventType: "Delete" }
  );
}

export const controlController = new ControlController();
