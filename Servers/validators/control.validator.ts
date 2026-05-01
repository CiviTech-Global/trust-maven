import { z } from "zod";

const controlTypes = ["preventive", "detective", "corrective", "directive"] as const;
const effectivenessLevels = ["effective", "partially_effective", "ineffective"] as const;
const testingMethods = ["inquiry", "observation", "inspection", "reperformance"] as const;
const testFrequencies = ["monthly", "quarterly", "semi_annually", "annually"] as const;
const monitoringStatuses = ["healthy", "at_risk", "failing", "not_monitored"] as const;

export const createControlSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  type: z.enum(controlTypes),
  effectiveness: z.enum(effectivenessLevels).optional().default("effective"),
  designEffectiveness: z.enum(effectivenessLevels).optional(),
  operatingEffectiveness: z.enum(effectivenessLevels).optional(),
  testingMethod: z.enum(testingMethods).nullable().optional(),
  testFrequency: z.enum(testFrequencies).nullable().optional(),
  nextTestDue: z.string().date().nullable().optional(),
  riskId: z.string().uuid().nullable().optional(),
  ownerId: z.string().uuid().nullable().optional(),
});

export const updateControlSchema = createControlSchema.partial();

export const controlIdParams = z.object({
  id: z.string().uuid("Invalid control ID"),
});

export const recordMonitoringEventSchema = z.object({
  status: z.enum(["pass", "fail", "error", "skipped"]),
  notes: z.string().max(2000).optional(),
  evidence: z.string().max(2000).nullable().optional(),
});
