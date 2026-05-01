import { z } from "zod";

const auditTypes = ["internal", "external"] as const;
const auditStatuses = ["planned", "in_progress", "completed", "cancelled"] as const;
const findingSeverities = ["critical", "high", "medium", "low", "informational"] as const;
const findingStatuses = ["open", "in_remediation", "remediated", "accepted", "closed"] as const;

export const createAuditSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  auditType: z.enum(auditTypes),
  status: z.enum(auditStatuses).optional().default("planned"),
  scope: z.string().max(2000).optional(),
  startDate: z.string().date(),
  endDate: z.string().date().nullable().optional(),
  leadAuditorId: z.string().uuid().nullable().optional(),
});

export const updateAuditSchema = createAuditSchema.partial();

export const createFindingSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  severity: z.enum(findingSeverities),
  status: z.enum(findingStatuses).optional().default("open"),
  responsibleId: z.string().uuid().nullable().optional(),
  controlId: z.string().uuid().nullable().optional(),
  riskId: z.string().uuid().nullable().optional(),
  dueDate: z.string().date().nullable().optional(),
  remediationNotes: z.string().max(5000).nullable().optional(),
});

export const updateFindingSchema = createFindingSchema.partial();

export const auditIdParams = z.object({
  id: z.string().uuid("Invalid audit ID"),
});

export const findingIdParams = z.object({
  id: z.string().uuid("Invalid audit ID"),
  findingId: z.string().uuid("Invalid finding ID"),
});
