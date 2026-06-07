import { z } from "zod";

const policyStatuses = ["draft", "review", "approved", "retired"] as const;

export const createPolicySchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().optional(),
  version: z.string().optional().default("1.0"),
  status: z.enum(policyStatuses).optional().default("draft"),
  ownerId: z.string().uuid().nullable().optional(),
});

export const updatePolicySchema = createPolicySchema.partial();

export const policyIdParams = z.object({
  id: z.string().uuid("Invalid policy ID"),
});
