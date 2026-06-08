import { Op } from "sequelize";
import { WorkflowDefinition, WorkflowState, WorkflowTransition } from "../domain.layer/models/workflowDefinition/workflowDefinition.model";
import { WorkflowExecution } from "../domain.layer/models/workflowExecution/workflowExecution.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

const HARDCODED_TRANSITIONS: Record<string, Record<string, string[]>> = {
  policy: {
    draft: ["review"],
    review: ["approved", "draft"],
    approved: ["retired", "draft"],
    retired: [],
  },
  common_control_implementation: {
    not_started: ["draft"],
    draft: ["in_progress"],
    in_progress: ["awaiting_review"],
    awaiting_review: ["awaiting_approval", "needs_rework"],
    awaiting_approval: ["implemented", "needs_rework"],
    needs_rework: ["in_progress", "draft"],
    implemented: [],
    not_applicable: [],
  },
};

export class WorkflowEngineService {
  async getWorkflow(orgId: string, entityType: string): Promise<WorkflowDefinition | null> {
    const workflow = await WorkflowDefinition.findOne({
      where: {
        organizationId: orgId,
        entityType,
        isActive: true,
      },
      order: [["isDefault", "DESC"], ["version", "DESC"]],
    });
    return workflow;
  }

  async getDefaultWorkflow(entityType: string): Promise<WorkflowDefinition | null> {
    return WorkflowDefinition.findOne({
      where: { entityType, isActive: true, isDefault: true },
    });
  }

  async getAllowedTransitions(workflowId: string, currentState: string): Promise<WorkflowTransition[]> {
    const workflow = await WorkflowDefinition.findByPk(workflowId);
    if (!workflow) throw new Error("Workflow not found");
    return workflow.transitions.filter((t) => t.from === currentState);
  }

  async executeTransition(
    workflowId: string,
    entityType: string,
    entityId: string,
    fromState: string,
    toState: string,
    userId: string,
    orgId: string,
    comment?: string
  ): Promise<{ success: boolean; newState: string; message: string }> {
    const workflow = await WorkflowDefinition.findOne({
      where: { id: workflowId, organizationId: orgId, isActive: true },
    });
    if (!workflow) throw new Error("Workflow not found or inactive");

    const transition = workflow.transitions.find(
      (t) => t.from === fromState && t.to === toState
    );
    if (!transition) {
      return {
        success: false,
        newState: fromState,
        message: `Transition from "${fromState}" to "${toState}" is not allowed`,
      };
    }

    if (transition.requireComment && !comment) {
      return {
        success: false,
        newState: fromState,
        message: "A comment is required for this transition",
      };
    }

    await WorkflowExecution.create({
      organizationId: orgId,
      workflowDefinitionId: workflowId,
      entityType,
      entityId,
      fromState,
      toState,
      transitionedBy: userId,
      comment: comment || null,
    });

    await auditService.log({
      organizationId: orgId,
      userId,
      entityType,
      entityId,
      action: AuditAction.UPDATE,
      changes: { fromState, toState },
    });

    return {
      success: true,
      newState: toState,
      message: transition.label || `Transitioned from ${fromState} to ${toState}`,
    };
  }

  async createWorkflow(
    data: {
      name: string;
      entityType: string;
      states: WorkflowState[];
      transitions: WorkflowTransition[];
      isActive?: boolean;
      isDefault?: boolean;
    },
    orgId: string,
    userId: string
  ): Promise<WorkflowDefinition> {
    const errors = this.validateDefinition(data.states, data.transitions);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join("; ")}`);
    }

    if (data.isDefault) {
      await WorkflowDefinition.update(
        { isDefault: false },
        { where: { organizationId: orgId, entityType: data.entityType } }
      );
    }

    const workflow = await WorkflowDefinition.create({
      ...data,
      organizationId: orgId,
    });

    await auditService.log({
      organizationId: orgId,
      userId,
      entityType: "workflow_definition",
      entityId: workflow.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return workflow;
  }

  async updateWorkflow(
    id: string,
    data: Partial<{
      name: string;
      entityType: string;
      states: WorkflowState[];
      transitions: WorkflowTransition[];
      isActive: boolean;
      isDefault: boolean;
    }>,
    orgId: string,
    userId: string
  ): Promise<WorkflowDefinition> {
    const workflow = await WorkflowDefinition.findOne({
      where: { id, organizationId: orgId },
    });
    if (!workflow) throw new Error("Workflow not found");

    if (data.states && data.transitions) {
      const errors = this.validateDefinition(data.states, data.transitions);
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join("; ")}`);
      }
    }

    if (data.isDefault) {
      await WorkflowDefinition.update(
        { isDefault: false },
        { where: { organizationId: orgId, entityType: data.entityType || workflow.entityType, id: { [Op.ne]: id } } }
      );
    }

    const changedFields: Record<string, unknown> = {};
    if (data.name !== undefined) changedFields.name = data.name;
    if (data.entityType !== undefined) changedFields.entityType = data.entityType;
    if (data.states !== undefined) changedFields.states = data.states;
    if (data.transitions !== undefined) changedFields.transitions = data.transitions;
    if (data.isActive !== undefined) changedFields.isActive = data.isActive;
    if (data.isDefault !== undefined) changedFields.isDefault = data.isDefault;

    await workflow.update(changedFields);

    await auditService.log({
      organizationId: orgId,
      userId,
      entityType: "workflow_definition",
      entityId: workflow.id,
      action: AuditAction.UPDATE,
      changes: changedFields,
    });

    return workflow.reload();
  }

  async cloneWorkflow(id: string, newName: string, orgId: string, userId: string): Promise<WorkflowDefinition> {
    const source = await WorkflowDefinition.findOne({
      where: { id, organizationId: orgId },
    });
    if (!source) throw new Error("Workflow not found");

    return this.createWorkflow(
      {
        name: newName,
        entityType: source.entityType,
        states: JSON.parse(JSON.stringify(source.states)),
        transitions: JSON.parse(JSON.stringify(source.transitions)),
        isActive: true,
        isDefault: false,
      },
      orgId,
      userId
    );
  }

  async setDefaultForType(id: string, orgId: string): Promise<void> {
    const workflow = await WorkflowDefinition.findOne({
      where: { id, organizationId: orgId },
    });
    if (!workflow) throw new Error("Workflow not found");

    await WorkflowDefinition.update(
      { isDefault: false },
      { where: { organizationId: orgId, entityType: workflow.entityType } }
    );

    await workflow.update({ isDefault: true });
  }

  async exportWorkflow(id: string, orgId: string): Promise<object> {
    const workflow = await WorkflowDefinition.findOne({
      where: { id, organizationId: orgId },
      attributes: { exclude: ["id", "organizationId", "createdAt", "updatedAt"] },
    });
    if (!workflow) throw new Error("Workflow not found");

    return {
      name: workflow.name,
      entityType: workflow.entityType,
      states: workflow.states,
      transitions: workflow.transitions,
      version: workflow.version,
      exportedAt: new Date().toISOString(),
    };
  }

  async importWorkflow(json: any, orgId: string, userId: string): Promise<WorkflowDefinition> {
    const errors = this.validateDefinition(json.states, json.transitions);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join("; ")}`);
    }

    return this.createWorkflow(
      {
        name: json.name || "Imported Workflow",
        entityType: json.entityType || "policy",
        states: json.states,
        transitions: json.transitions,
        isActive: true,
        isDefault: false,
      },
      orgId,
      userId
    );
  }

  validateDefinition(states: WorkflowState[], transitions: WorkflowTransition[]): string[] {
    const errors: string[] = [];
    const stateNames = new Set(states.map((s) => s.name));

    if (!states || states.length === 0) {
      errors.push("At least one state is required");
      return errors;
    }

    const initialStates = states.filter((s) => s.type === "initial");
    if (initialStates.length !== 1) {
      errors.push("Exactly one initial state is required");
    }

    if (!transitions || transitions.length === 0) {
      errors.push("At least one transition is required");
      return errors;
    }

    for (const t of transitions) {
      if (!stateNames.has(t.from)) {
        errors.push(`Transition references unknown state "${t.from}"`);
      }
      if (!stateNames.has(t.to)) {
        errors.push(`Transition references unknown state "${t.to}"`);
      }
    }

    const reachable = new Set<string>();
    if (initialStates.length === 1) {
      reachable.add(initialStates[0].name);
      let changed = true;
      while (changed) {
        changed = false;
        for (const t of transitions) {
          if (reachable.has(t.from) && !reachable.has(t.to)) {
            reachable.add(t.to);
            changed = true;
          }
        }
      }

      for (const state of states) {
        if (state.type !== "initial" && !reachable.has(state.name)) {
          errors.push(`State "${state.name}" is not reachable from initial state`);
        }
      }
    }

    return errors;
  }

  async getExecutionHistory(workflowId: string, entityId?: string, orgId?: string) {
    const where: Record<string, unknown> = { workflowDefinitionId: workflowId };
    if (entityId) where.entityId = entityId;
    if (orgId) where.organizationId = orgId;

    return WorkflowExecution.findAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: 100,
    });
  }
}

export const workflowEngineService = new WorkflowEngineService();
