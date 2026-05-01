import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { projectService } from "../services/project.service";

export class ProjectController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const projects = await projectService.findAll(req.user!.organizationId);
      res.json({ success: true, data: projects });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const project = await projectService.findById(id, req.user!.organizationId);
      res.json({ success: true, data: project });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { name, description, status, startDate, endDate } = req.body;
      if (!name) {
        res.status(400).json({ success: false, message: "Name is required" });
        return;
      }
      const project = await projectService.create(
        { name, description, status, startDate, endDate },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: project });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const project = await projectService.update(
        id,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: project });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await projectService.delete(id, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "Project deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const projectController = new ProjectController();
