import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { userService } from "../services/user.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class UserController {
  findAll = controllerWrapper(
    async (req) => {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const result = await userService.findAll(req.user!.organizationId, page, limit);
      return { status: 200, data: result.users, pagination: result.pagination };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      const user = await userService.findById(id, req.user!.organizationId);
      return { status: 200, data: user };
    },
    { functionName: "findById", eventType: "Read" }
  );

  update = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      const { firstName, lastName } = req.body;
      const user = await userService.update(id, { firstName, lastName }, req.user!.organizationId);
      return { status: 200, data: user };
    },
    { functionName: "update", eventType: "Update" }
  );

  create = controllerWrapper(
    async (req) => {
      const { email, firstName, lastName, roleId } = req.body;
      if (!email || !firstName || !lastName) throw new ValidationException("Email, first name, and last name are required");
      const user = await userService.create(
        { email, firstName, lastName, roleId },
        req.user!.organizationId
      );
      return { status: 201, data: user };
    },
    { functionName: "create", eventType: "Create" }
  );

  updateRole = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      const { roleId } = req.body;
      if (!roleId) throw new ValidationException("Role ID is required");
      const user = await userService.updateRole(id, roleId, req.user!.organizationId);
      return { status: 200, data: user };
    },
    { functionName: "updateRole", eventType: "Update" }
  );

  deactivate = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      await userService.deactivate(id, req.user!.organizationId);
      return { status: 200, message: "User deactivated" };
    },
    { functionName: "deactivate", eventType: "Update" }
  );

  activate = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      await userService.activate(id, req.user!.organizationId);
      return { status: 200, message: "User activated" };
    },
    { functionName: "activate", eventType: "Update" }
  );
}

export const userController = new UserController();
