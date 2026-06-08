export interface WorkflowState {
  name: string;
  label: string;
  color: string;
  type: "initial" | "active" | "terminal";
  assigneeRole?: string;
  metadata?: Record<string, unknown>;
}

export interface WorkflowTransition {
  from: string;
  to: string;
  label: string;
  actions?: string[];
  requireComment?: boolean;
  allowedRoles?: string[];
  hooks?: {
    notify: string[];
    autoAssign: string;
    setFields: Record<string, any>;
  };
}

export type EntityType =
  | "common_control_implementation"
  | "policy"
  | "requirement_implementation"
  | "risk"
  | "vendor_assessment";

export interface WorkflowDefinition {
  id: string;
  organizationId: string;
  name: string;
  entityType: EntityType;
  states: WorkflowState[];
  transitions: WorkflowTransition[];
  isActive: boolean;
  isDefault: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowExecution {
  id: string;
  organizationId: string;
  workflowDefinitionId: string;
  entityType: string;
  entityId: string;
  fromState: string;
  toState: string;
  transitionedBy: string;
  comment: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}
