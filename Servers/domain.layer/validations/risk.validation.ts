import { z } from "zod";

export const createRiskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  domain: z.enum(["financial", "cybersecurity", "strategic", "operational", "regulatory"]),
  projectId: z.string().uuid().optional().nullable(),
  ownerId: z.string().uuid().optional().nullable(),
});

export const updateRiskSchema = createRiskSchema.partial().extend({
  status: z.enum(["identified", "assessed", "treated", "accepted", "closed"]).optional(),
});

export const createAssessmentSchema = z.object({
  likelihood: z.number().int().min(1).max(5),
  impact: z.number().int().min(1).max(5),
  methodology: z.string().optional(),
  notes: z.string().optional(),
});

export const createTreatmentSchema = z.object({
  strategy: z.enum(["avoid", "mitigate", "transfer", "accept"]),
  description: z.string().min(1, "Description is required"),
  responsibleId: z.string().uuid().optional().nullable(),
  dueDate: z.string().optional().nullable(),
});

export type CreateRiskInput = z.infer<typeof createRiskSchema>;
export type UpdateRiskInput = z.infer<typeof updateRiskSchema>;
export type CreateAssessmentInput = z.infer<typeof createAssessmentSchema>;
export type CreateTreatmentInput = z.infer<typeof createTreatmentSchema>;
