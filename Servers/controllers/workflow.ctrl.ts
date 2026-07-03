import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { workflowEngineService } from "../services/workflowEngine.service";
import { WorkflowDefinition } from "../domain.layer/models/workflowDefinition/workflowDefinition.model";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException, NotFoundException } from "../domain.layer/exceptions/custom.exception";

export class WorkflowController {
  findAll = controllerWrapper(
    async (req) => {
      const { entityType } = req.query;
      const where: Record<string, unknown> = { organizationId: req.user!.organizationId };
      if (entityType) where.entityType = entityType;
      const workflows = await WorkflowDefinition.findAll({
        where,
        order: [["updatedAt", "DESC"]],
      });
      return { status: 200, data: workflows };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const workflow = await WorkflowDefinition.findOne({
        where: { id: req.params.id as string, organizationId: req.user!.organizationId },
      });
      if (!workflow) throw new NotFoundException("Workflow not found");
      return { status: 200, data: workflow };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const workflow = await workflowEngineService.createWorkflow(
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: workflow };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const workflow = await workflowEngineService.updateWorkflow(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: workflow };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      const workflow = await WorkflowDefinition.findOne({
        where: { id: req.params.id as string, organizationId: req.user!.organizationId },
      });
      if (!workflow) throw new NotFoundException("Workflow not found");
      await workflow.destroy();
      return { status: 200, message: "Workflow deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  clone = controllerWrapper(
    async (req) => {
      const { name } = req.body;
      if (!name) throw new ValidationException("New name is required");
      const workflow = await workflowEngineService.cloneWorkflow(
        req.params.id as string,
        name,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: workflow };
    },
    { functionName: "clone", eventType: "Create" }
  );

  setDefault = controllerWrapper(
    async (req) => {
      await workflowEngineService.setDefaultForType(req.params.id as string, req.user!.organizationId);
      return { status: 200, message: "Default workflow updated" };
    },
    { functionName: "setDefault", eventType: "Update" }
  );

  exportWorkflow = controllerWrapper(
    async (req) => {
      const data = await workflowEngineService.exportWorkflow(req.params.id as string, req.user!.organizationId);
      return { status: 200, data };
    },
    { functionName: "exportWorkflow", eventType: "Read" }
  );

  importWorkflow = controllerWrapper(
    async (req) => {
      const workflow = await workflowEngineService.importWorkflow(
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: workflow };
    },
    { functionName: "importWorkflow", eventType: "Create" }
  );

  validateWorkflow = controllerWrapper(
    async (req) => {
      const { states, transitions } = req.body;
      const errors = workflowEngineService.validateDefinition(states, transitions);
      return { status: 200, data: { valid: errors.length === 0, errors } };
    },
    { functionName: "validateWorkflow", eventType: "Read" }
  );

  getTransitions = controllerWrapper(
    async (req) => {
      const { currentState } = req.query;
      if (!currentState) throw new ValidationException("currentState query param required");
      const transitions = await workflowEngineService.getAllowedTransitions(
        req.params.id as string,
        currentState as string
      );
      return { status: 200, data: transitions };
    },
    { functionName: "getTransitions", eventType: "Read" }
  );

  executeTransition = controllerWrapper(
    async (req) => {
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
      return { status: 200, data: result };
    },
    { functionName: "executeTransition", eventType: "Update" }
  );

  getExecutionHistory = controllerWrapper(
    async (req) => {
      const { entityId } = req.query;
      const history = await workflowEngineService.getExecutionHistory(
        req.params.id as string,
        entityId as string | undefined,
        req.user!.organizationId
      );
      return { status: 200, data: history };
    },
    { functionName: "getExecutionHistory", eventType: "Read" }
  );

  getDefaultForType = controllerWrapper(
    async (req) => {
      const { entityType } = req.params;
      const custom = await workflowEngineService.getWorkflow(
        req.user!.organizationId,
        entityType as string
      );
      if (custom) return { status: 200, data: custom };
      const globalDefault = await workflowEngineService.getDefaultWorkflow(entityType as string);
      return { status: 200, data: globalDefault };
    },
    { functionName: "getDefaultForType", eventType: "Read" }
  );
}

export const workflowController = new WorkflowController();
