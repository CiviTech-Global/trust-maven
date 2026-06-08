import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { workflowEngineService } from "../services/workflowEngine.service";
import { WorkflowDefinition } from "../domain.layer/models/workflowDefinition/workflowDefinition.model";

export class WorkflowController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { entityType } = req.query;
      const where: Record<string, unknown> = { organizationId: req.user!.organizationId };
      if (entityType) where.entityType = entityType;
      const workflows = await WorkflowDefinition.findAll({
        where,
        order: [["updatedAt", "DESC"]],
      });
      res.json({ success: true, data: workflows });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const workflow = await WorkflowDefinition.findOne({
        where: { id: req.params.id as string, organizationId: req.user!.organizationId },
      });
      if (!workflow) {
        res.status(404).json({ success: false, message: "Workflow not found" });
        return;
      }
      res.json({ success: true, data: workflow });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const workflow = await workflowEngineService.createWorkflow(
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: workflow });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const workflow = await workflowEngineService.updateWorkflow(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: workflow });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const workflow = await WorkflowDefinition.findOne({
        where: { id: req.params.id as string, organizationId: req.user!.organizationId },
      });
      if (!workflow) {
        res.status(404).json({ success: false, message: "Workflow not found" });
        return;
      }
      await workflow.destroy();
      res.json({ success: true, message: "Workflow deleted" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async clone(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ success: false, message: "New name is required" });
        return;
      }
      const workflow = await workflowEngineService.cloneWorkflow(
        req.params.id as string,
        name,
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: workflow });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async setDefault(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await workflowEngineService.setDefaultForType(req.params.id as string, req.user!.organizationId);
      res.json({ success: true, message: "Default workflow updated" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async exportWorkflow(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const data = await workflowEngineService.exportWorkflow(req.params.id as string, req.user!.organizationId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async importWorkflow(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const workflow = await workflowEngineService.importWorkflow(
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: workflow });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async validateWorkflow(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { states, transitions } = req.body;
      const errors = workflowEngineService.validateDefinition(states, transitions);
      res.json({ success: true, data: { valid: errors.length === 0, errors } });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getTransitions(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { currentState } = req.query;
      if (!currentState) {
        res.status(400).json({ success: false, message: "currentState query param required" });
        return;
      }
      const transitions = await workflowEngineService.getAllowedTransitions(
        req.params.id as string,
        currentState as string
      );
      res.json({ success: true, data: transitions });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async executeTransition(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { entityType, entityId, fromState, toState, comment } = req.body;
      const result = await workflowEngineService.executeTransition(
        req.params.id as string,
        entityType,
        entityId,
        fromState,
        toState,
        req.user!.userId,
        req.user!.organizationId,
        comment
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getExecutionHistory(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { entityId } = req.query;
      const history = await workflowEngineService.getExecutionHistory(
        req.params.id as string,
        entityId as string | undefined,
        req.user!.organizationId
      );
      res.json({ success: true, data: history });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getDefaultForType(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { entityType } = req.params;
      const custom = await workflowEngineService.getWorkflow(
        req.user!.organizationId,
        entityType as string
      );
      if (custom) {
        res.json({ success: true, data: custom });
        return;
      }
      const globalDefault = await workflowEngineService.getDefaultWorkflow(entityType as string);
      res.json({ success: true, data: globalDefault });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const workflowController = new WorkflowController();
