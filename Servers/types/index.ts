export enum RiskDomain {
  FINANCIAL = "financial",
  CYBERSECURITY = "cybersecurity",
  STRATEGIC = "strategic",
  OPERATIONAL = "operational",
  REGULATORY = "regulatory",
}

export enum RiskStatus {
  IDENTIFIED = "identified",
  ASSESSED = "assessed",
  TREATED = "treated",
  ACCEPTED = "accepted",
  CLOSED = "closed",
}

export enum TreatmentStrategy {
  AVOID = "avoid",
  MITIGATE = "mitigate",
  TRANSFER = "transfer",
  ACCEPT = "accept",
}

export enum TreatmentStatus {
  PLANNED = "planned",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export enum ControlType {
  PREVENTIVE = "preventive",
  DETECTIVE = "detective",
  CORRECTIVE = "corrective",
}

export enum ControlEffectiveness {
  EFFECTIVE = "effective",
  PARTIALLY_EFFECTIVE = "partially_effective",
  INEFFECTIVE = "ineffective",
}

export enum ProjectStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  ON_HOLD = "on_hold",
  COMPLETED = "completed",
  ARCHIVED = "archived",
}

export enum PolicyStatus {
  DRAFT = "draft",
  REVIEW = "review",
  APPROVED = "approved",
  RETIRED = "retired",
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export enum AuditAction {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  RISK_MANAGER = "risk_manager",
  ANALYST = "analyst",
  AUDITOR = "auditor",
  VIEWER = "viewer",
}

export interface JwtPayload {
  userId: string;
  email: string;
  organizationId: string;
  role: UserRole;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
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
