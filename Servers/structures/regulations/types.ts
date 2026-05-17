export interface RequirementSeed {
  code: string;
  title: string;
  level: number;
  orderNo: number;
  description?: string;
  category?: string;
  keyQuestions?: string[];
  evidenceExamples?: string[];
  implementationGuidance?: string;
  children?: RequirementSeed[];
}

export interface RegulationSeed {
  code: string;
  name: string;
  type: "framework" | "regulation" | "standard";
  category: string;
  jurisdiction: string;
  issuer: string;
  version: string;
  description: string;
  effectiveDate?: string;
  metadata?: Record<string, unknown>;
  requirements: RequirementSeed[];
}

export interface CrossMappingSeed {
  source: string; // "REG_CODE:REQ_CODE" e.g. "ISO_27001_2022:4.1"
  target: string;
  relevance: "high" | "medium" | "low";
  type: "equivalent" | "overlapping" | "related" | "partial";
  notes?: string;
}
