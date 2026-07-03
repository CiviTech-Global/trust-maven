import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { policyService } from "../services/policy.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class PolicyController {
  findAll = controllerWrapper(
    async (req) => {
      const { status, search, page, limit } = req.query;
      const result = await policyService.findAll(req.user!.organizationId, {
        status: status as string | undefined,
        search: search as string | undefined,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      return { status: 200, data: result.policies, pagination: result.pagination };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      const policy = await policyService.findById(id, req.user!.organizationId);
      return { status: 200, data: policy };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { title, content, version, status, ownerId } = req.body;
      if (!title) throw new ValidationException("Title is required");
      const policy = await policyService.create(
        { title, content, version, status, ownerId },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: policy };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      const { comment, ...policyData } = req.body;
      const policy = await policyService.update(
        id,
        policyData,
        req.user!.organizationId,
        req.user!.userId,
        comment
      );
      return { status: 200, data: policy };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      await policyService.delete(id, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Policy deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );
}

export const policyController = new PolicyController();
