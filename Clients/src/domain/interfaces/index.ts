import { RiskDomain, RiskStatus, TreatmentStrategy, ProjectStatus } from "../enums";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId: string;
  role: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  settings: Record<string, unknown>;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  domain: RiskDomain;
  status: RiskStatus;
  projectId: string | null;
  ownerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RiskAssessment {
  id: string;
  riskId: string;
  assessorId: string;
  likelihood: number;
  impact: number;
  riskScore: number;
  methodology: string;
  notes: string;
  assessedAt: string;
}

export interface RiskTreatment {
  id: string;
  riskId: string;
  strategy: TreatmentStrategy;
  description: string;
  status: string;
  responsibleId: string | null;
  dueDate: string | null;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  ownerId: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
