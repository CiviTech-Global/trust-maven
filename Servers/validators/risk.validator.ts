import { z } from "zod";

const riskDomains = ["financial", "cybersecurity", "strategic", "operational", "regulatory"] as const;
const riskStatuses = ["identified", "assessed", "treated", "accepted", "closed"] as const;

export const createRiskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  domain: z.enum(riskDomains),
  status: z.enum(riskStatuses).optional().default("identified"),
  projectId: z.string().uuid().nullable().optional(),
  ownerId: z.string().uuid().nullable().optional(),
  categoryId: z.string().uuid().nullable().optional(),
  riskAppetiteThreshold: z.number().int().min(1).max(25).nullable().optional(),
  reviewCycleDays: z.number().int().min(1).max(365).nullable().optional(),
});

export const updateRiskSchema = createRiskSchema.partial();

export const riskIdParams = z.object({
  id: z.string().uuid("Invalid risk ID"),
});
