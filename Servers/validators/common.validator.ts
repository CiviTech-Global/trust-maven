import { z } from "zod";

/** Reusable UUID param validation */
export const uuidParams = z.object({
  id: z.string().uuid("Invalid ID format"),
});

/** Reusable pagination query validation */
export const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  search: z.string().max(255).optional(),
  sortBy: z.string().max(50).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

/** KRI schemas */
export const createKRISchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().max(2000).optional(),
  category: z.string().max(100).optional(),
  currentValue: z.number(),
  thresholdGreen: z.number(),
  thresholdAmber: z.number(),
  thresholdRed: z.number(),
  direction: z.enum(["above_is_good", "below_is_good"]),
  unit: z.string().max(50).optional(),
  frequency: z.string().max(50).optional(),
  riskId: z.string().uuid().nullable().optional(),
});

export const updateKRISchema = createKRISchema.partial();

/** Framework schemas */
export const createFrameworkSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  version: z.string().max(50).optional(),
  description: z.string().max(2000).optional(),
  requirements: z.array(z.record(z.unknown())).optional().default([]),
});

export const updateFrameworkSchema = createFrameworkSchema.partial();

/** Risk Quantification schemas */
export const createQuantificationSchema = z.object({
  singleLossExpectancy: z.number().min(0),
  annualRateOfOccurrence: z.number().min(0),
  confidenceLevel: z.enum(["low", "medium", "high"]).optional().default("medium"),
  lossEventFrequencyMin: z.number().min(0).nullable().optional(),
  lossEventFrequencyMax: z.number().min(0).nullable().optional(),
  lossMagnitudeMin: z.number().min(0).nullable().optional(),
  lossMagnitudeMax: z.number().min(0).nullable().optional(),
  methodology: z.string().max(100).optional().default("simple_ale"),
  assumptions: z.string().max(5000).nullable().optional(),
  assessedAt: z.string().date().optional(),
});

export const updateQuantificationSchema = createQuantificationSchema.partial();

/** Report Template schemas */
export const createReportTemplateSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().max(2000).optional(),
  entityType: z.enum(["risk", "control", "audit", "vendor", "kri"]),
  columns: z.array(z.object({ field: z.string(), label: z.string() })),
  filters: z.array(z.object({
    field: z.string(),
    operator: z.string(),
    value: z.unknown(),
  })).optional().default([]),
  groupBy: z.string().nullable().optional(),
  sortBy: z.string().nullable().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
  isShared: z.boolean().optional().default(false),
});

export const updateReportTemplateSchema = createReportTemplateSchema.partial();

/** Risk Category schemas */
export const createRiskCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().max(2000).nullable().optional(),
  parentId: z.string().uuid().nullable().optional(),
  code: z.string().max(50).nullable().optional(),
  sortOrder: z.number().int().min(0).optional().default(0),
});

export const updateRiskCategorySchema = createRiskCategorySchema.partial();
