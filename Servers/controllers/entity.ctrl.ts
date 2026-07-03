import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { entityService } from "../services/entity.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class EntityController {
  findAll = controllerWrapper(
    async (req) => {
      const parentId = req.query.parentId === undefined ? null : (req.query.parentId as string | undefined);
      const entities = await entityService.findAll(req.user!.organizationId, parentId);
      return { status: 200, data: entities };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const entity = await entityService.findById(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: entity };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { name, type, parentId, attributes, riskScore } = req.body;
      if (!name || !type) throw new ValidationException("name and type are required");
      const entity = await entityService.create(
        { name, type, parentId, attributes, riskScore },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: entity };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const entity = await entityService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: entity };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      await entityService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Entity deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  getTree = controllerWrapper(
    async (req) => {
      const parentId = req.query.parentId === undefined ? null : (req.query.parentId as string | undefined);
      const tree = await entityService.getTree(req.user!.organizationId, parentId);
      return { status: 200, data: tree };
    },
    { functionName: "getTree", eventType: "Read" }
  );

  getAncestors = controllerWrapper(
    async (req) => {
      const ancestors = await entityService.getAncestors(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: ancestors };
    },
    { functionName: "getAncestors", eventType: "Read" }
  );

  rollupScore = controllerWrapper(
    async (req) => {
      const result = await entityService.rollupScore(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: result };
    },
    { functionName: "rollupScore", eventType: "Update" }
  );

  linkRisk = controllerWrapper(
    async (req) => {
      const { riskId } = req.body;
      if (!riskId) throw new ValidationException("riskId is required");
      const entity = await entityService.linkRisk(req.params.id as string, riskId, req.user!.organizationId);
      return { status: 200, data: entity };
    },
    { functionName: "linkRisk", eventType: "Update" }
  );

  getLinkedRisks = controllerWrapper(
    async (req) => {
      const risks = await entityService.getLinkedRisks(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: risks };
    },
    { functionName: "getLinkedRisks", eventType: "Read" }
  );
}

export const entityController = new EntityController();
