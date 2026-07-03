import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { riskCategoryService } from "../services/riskCategory.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class RiskCategoryController {
  findAll = controllerWrapper(
    async (req) => {
      const categories = await riskCategoryService.findAll(req.user!.organizationId);
      return { status: 200, data: categories };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findTree = controllerWrapper(
    async (req) => {
      const tree = await riskCategoryService.findTree(req.user!.organizationId);
      return { status: 200, data: tree };
    },
    { functionName: "findTree", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const category = await riskCategoryService.findById(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: category };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { name, description, parentId, code, sortOrder } = req.body;
      if (!name) throw new ValidationException("Name is required");
      const category = await riskCategoryService.create(
        { name, description, parentId, code, sortOrder },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: category };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const category = await riskCategoryService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: category };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      await riskCategoryService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Category deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  seedDefaults = controllerWrapper(
    async (req) => {
      const result = await riskCategoryService.seedDefaults(req.user!.organizationId, req.user!.userId);
      return { status: 200, data: result };
    },
    { functionName: "seedDefaults", eventType: "Create" }
  );
}

export const riskCategoryController = new RiskCategoryController();
