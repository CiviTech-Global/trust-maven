import { RiskDomain, RiskStatus, TreatmentStrategy, ProjectStatus, AssessmentType, ApprovalStatus, TestFrequency, TestingMethod } from "../enums";

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
  riskAppetiteThreshold: number | null;
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
  assessmentType: AssessmentType;
  approvalStatus: ApprovalStatus;
  approvedById: string | null;
  approvedAt: string | null;
}

export interface RiskTreatment {
  id: string;
  riskId: string;
  strategy: TreatmentStrategy;
  description: string;
  status: string;
  responsibleId: string | null;
  dueDate: string | null;
  approvalStatus: ApprovalStatus;
  approvedById: string | null;
  approvedAt: string | null;
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

export interface Control {
  id: string;
  title: string;
  description: string;
  type: string;
  effectiveness: string;
  designEffectiveness: string;
  operatingEffectiveness: string;
  testingMethod: TestingMethod | null;
  lastTestedAt: string | null;
  nextTestDue: string | null;
  testFrequency: TestFrequency | null;
  riskId: string | null;
  ownerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  entityType: string;
  entityId: string;
  action: string;
  changes: Record<string, unknown>;
  createdAt: string;
  user?: { id: string; firstName: string; lastName: string; email: string };
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  relatedEntityType: string | null;
  relatedEntityId: string | null;
  createdAt: string;
}

export interface RiskControlMapping {
  id: string;
  riskId: string;
  controlId: string;
  mappedById: string | null;
  mappedAt: string;
}

export interface ControlFrameworkMapping {
  id: string;
  controlId: string;
  frameworkId: string;
  requirementId: string;
  mappedAt: string;
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
