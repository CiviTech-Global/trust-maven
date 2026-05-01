import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { userService } from "../services/user.service";

export class UserController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const users = await userService.findAll(req.user!.organizationId);
      res.json({ success: true, data: users });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const user = await userService.findById(id);
      res.json({ success: true, data: user });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const { firstName, lastName } = req.body;
      const user = await userService.update(id, { firstName, lastName });
      res.json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { email, firstName, lastName, roleId } = req.body;
      if (!email || !firstName || !lastName) {
        res.status(400).json({ success: false, message: "Email, first name, and last name are required" });
        return;
      }
      const user = await userService.create(
        { email, firstName, lastName, roleId },
        req.user!.organizationId
      );
      res.status(201).json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateRole(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const { roleId } = req.body;
      if (!roleId) {
        res.status(400).json({ success: false, message: "Role ID is required" });
        return;
      }
      const user = await userService.updateRole(id, roleId, req.user!.organizationId);
      res.json({ success: true, data: user });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async deactivate(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await userService.deactivate(id, req.user!.organizationId);
      res.json({ success: true, message: "User deactivated" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async activate(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await userService.activate(id, req.user!.organizationId);
      res.json({ success: true, message: "User activated" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const userController = new UserController();
