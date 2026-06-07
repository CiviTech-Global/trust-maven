import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { policyService } from "../services/policy.service";

export class PolicyController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { status, search } = req.query;
      const policies = await policyService.findAll(req.user!.organizationId, {
        status: status as string | undefined,
        search: search as string | undefined,
      });
      res.json({ success: true, data: policies });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const policy = await policyService.findById(id, req.user!.organizationId);
      res.json({ success: true, data: policy });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { title, content, version, status, ownerId } = req.body;
      if (!title) {
        res.status(400).json({ success: false, message: "Title is required" });
        return;
      }
      const policy = await policyService.create(
        { title, content, version, status, ownerId },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: policy });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const policy = await policyService.update(
        id,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: policy });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await policyService.delete(id, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "Policy deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const policyController = new PolicyController();
