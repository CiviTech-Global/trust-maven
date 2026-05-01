import { RiskDomain, RiskStatus, TreatmentStrategy, ProjectStatus, AssessmentType, ApprovalStatus, TestFrequency, TestingMethod, MonitoringStatus } from "../enums";

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
  categoryId: string | null;
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
  monitoringStatus: MonitoringStatus;
  lastMonitoredAt: string | null;
  consecutiveFailures: number;
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

export interface RiskCategory {
  id: string;
  name: string;
  description: string | null;
  parentId: string | null;
  level: number;
  sortOrder: number;
  code: string | null;
  isActive: boolean;
  children?: RiskCategory[];
}

export interface RiskQuantification {
  id: string;
  riskId: string;
  assessorId: string;
  singleLossExpectancy: number;
  annualRateOfOccurrence: number;
  annualLossExpectancy: number;
  confidenceLevel: string;
  lossEventFrequencyMin: number | null;
  lossEventFrequencyMax: number | null;
  lossMagnitudeMin: number | null;
  lossMagnitudeMax: number | null;
  methodology: string;
  assumptions: string | null;
  assessedAt: string;
  assessor?: { id: string; firstName: string; lastName: string };
}

export interface ControlMonitoringEvent {
  id: string;
  controlId: string;
  status: string;
  executedAt: string;
  executedById: string | null;
  notes: string | null;
  evidence: string | null;
  executedBy?: { id: string; firstName: string; lastName: string };
  createdAt: string;
}

export interface AuditRecord {
  id: string;
  title: string;
  description: string | null;
  auditType: string;
  status: string;
  leadAuditorId: string | null;
  scope: string | null;
  startDate: string;
  endDate: string | null;
  leadAuditor?: { id: string; firstName: string; lastName: string };
  findings?: AuditFinding[];
  createdAt: string;
  updatedAt: string;
}

export interface AuditFinding {
  id: string;
  auditId: string;
  title: string;
  description: string | null;
  severity: string;
  status: string;
  responsibleId: string | null;
  controlId: string | null;
  riskId: string | null;
  dueDate: string | null;
  remediationNotes: string | null;
  closedAt: string | null;
  responsible?: { id: string; firstName: string; lastName: string };
  control?: { id: string; title: string };
  risk?: { id: string; title: string };
  audit?: { id: string; title: string };
  createdAt: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string | null;
  entityType: string;
  columns: { field: string; label: string }[];
  filters: { field: string; operator: string; value: string }[];
  groupBy: string | null;
  sortBy: string | null;
  sortOrder: string;
  isShared: boolean;
  createdById: string;
  createdBy?: { id: string; firstName: string; lastName: string };
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
