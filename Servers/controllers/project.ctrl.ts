import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { projectService } from "../services/project.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class ProjectController {
  findAll = controllerWrapper(
    async (req) => {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const result = await projectService.findAll(req.user!.organizationId, page, limit);
      return { status: 200, data: result.projects, pagination: result.pagination };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      const project = await projectService.findById(id, req.user!.organizationId);
      return { status: 200, data: project };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { name, description, status, startDate, endDate } = req.body;
      if (!name) throw new ValidationException("Name is required");
      const project = await projectService.create(
        { name, description, status, startDate, endDate },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: project };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      const project = await projectService.update(
        id,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: project };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      await projectService.delete(id, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Project deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );
}

export const projectController = new ProjectController();
