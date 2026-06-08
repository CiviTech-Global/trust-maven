import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { entityService } from "../services/entity.service";

function ensureUser(req: AuthenticatedRequest) {
  if (!req.user) throw new Error("Authentication required");
  return req.user;
}

export class EntityController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const parentId = req.query.parentId === undefined ? null : (req.query.parentId as string | undefined);
      const entities = await entityService.findAll(user.organizationId, parentId);
      res.json({ success: true, data: entities });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const entity = await entityService.findById(req.params.id as string, user.organizationId);
      res.json({ success: true, data: entity });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const { name, type, parentId, attributes, riskScore } = req.body;
      if (!name || !type) {
        res.status(400).json({ success: false, message: "name and type are required" });
        return;
      }
      const entity = await entityService.create(
        { name, type, parentId, attributes, riskScore },
        user.organizationId,
        user.userId
      );
      res.status(201).json({ success: true, data: entity });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const entity = await entityService.update(
        req.params.id as string,
        req.body,
        user.organizationId,
        user.userId
      );
      res.json({ success: true, data: entity });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      await entityService.delete(req.params.id as string, user.organizationId, user.userId);
      res.json({ success: true, message: "Entity deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getTree(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const parentId = req.query.parentId === undefined ? null : (req.query.parentId as string | undefined);
      const tree = await entityService.getTree(user.organizationId, parentId);
      res.json({ success: true, data: tree });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAncestors(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const ancestors = await entityService.getAncestors(req.params.id as string, user.organizationId);
      res.json({ success: true, data: ancestors });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async rollupScore(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const result = await entityService.rollupScore(req.params.id as string, user.organizationId);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async linkRisk(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const { riskId } = req.body;
      if (!riskId) {
        res.status(400).json({ success: false, message: "riskId is required" });
        return;
      }
      const entity = await entityService.linkRisk(req.params.id as string, riskId, user.organizationId);
      res.json({ success: true, data: entity });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getLinkedRisks(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const risks = await entityService.getLinkedRisks(req.params.id as string, user.organizationId);
      res.json({ success: true, data: risks });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const entityController = new EntityController();
