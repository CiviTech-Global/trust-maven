import { z } from "zod";

const riskLevels = ["critical", "high", "medium", "low", "negligible"] as const;
const vendorStatuses = ["active", "inactive", "under_review", "offboarded"] as const;

export const createVendorSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().max(2000).optional(),
  riskLevel: z.enum(riskLevels).optional().default("medium"),
  status: z.enum(vendorStatuses).optional().default("active"),
  contactInfo: z.record(z.unknown()).optional(),
});

export const updateVendorSchema = createVendorSchema.partial();

export const createVendorAssessmentSchema = z.object({
  title: z.string().min(1).max(255),
  assessmentType: z.string().max(100).optional(),
  riskRating: z.string().max(50).optional(),
  score: z.number().min(0).max(100).optional(),
  summary: z.string().max(5000).optional(),
  questionnaire: z.record(z.unknown()).optional(),
  findings: z.array(z.record(z.unknown())).optional(),
});

export const vendorIdParams = z.object({
  id: z.string().uuid("Invalid vendor ID"),
});
