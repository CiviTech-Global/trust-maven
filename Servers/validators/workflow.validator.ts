import { z } from "zod";

const entityTypes = [
  "common_control_implementation",
  "policy",
  "requirement_implementation",
  "risk",
  "vendor_assessment",
] as const;

const stateSchema = z.object({
  name: z.string().min(1),
  label: z.string().min(1),
  color: z.string().min(1),
  type: z.enum(["initial", "active", "terminal"]),
  assigneeRole: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

const transitionSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  label: z.string().min(1),
  actions: z.array(z.string()).optional(),
  requireComment: z.boolean().optional(),
  allowedRoles: z.array(z.string()).optional(),
  hooks: z.object({
    notify: z.array(z.string()),
    autoAssign: z.string(),
    setFields: z.record(z.any()),
  }).optional(),
});

export const createWorkflowSchema = z.object({
  name: z.string().min(1).max(255),
  entityType: z.enum(entityTypes),
  states: z.array(stateSchema).min(1),
  transitions: z.array(transitionSchema),
  isActive: z.boolean().optional().default(true),
  isDefault: z.boolean().optional().default(false),
});

export const updateWorkflowSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  entityType: z.enum(entityTypes).optional(),
  states: z.array(stateSchema).min(1).optional(),
  transitions: z.array(transitionSchema).optional(),
  isActive: z.boolean().optional(),
  isDefault: z.boolean().optional(),
});

export const workflowIdParams = z.object({
  id: z.string().uuid("Invalid workflow ID"),
});

export const executeTransitionSchema = z.object({
  entityType: z.string().min(1),
  entityId: z.string().uuid(),
  fromState: z.string().min(1),
  toState: z.string().min(1),
  comment: z.string().optional(),
});
