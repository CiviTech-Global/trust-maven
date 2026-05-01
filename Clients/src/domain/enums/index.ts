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

export enum ProjectStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  ON_HOLD = "on_hold",
  COMPLETED = "completed",
  ARCHIVED = "archived",
}

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  RISK_MANAGER = "risk_manager",
  ANALYST = "analyst",
  AUDITOR = "auditor",
  VIEWER = "viewer",
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

export enum AssessmentType {
  INHERENT = "inherent",
  RESIDUAL = "residual",
}

export enum ApprovalStatus {
  DRAFT = "draft",
  PENDING_APPROVAL = "pending_approval",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum TestFrequency {
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  SEMI_ANNUALLY = "semi_annually",
  ANNUALLY = "annually",
}

export enum TestingMethod {
  INQUIRY = "inquiry",
  OBSERVATION = "observation",
  INSPECTION = "inspection",
  REPERFORMANCE = "reperformance",
}

export enum MonitoringStatus {
  HEALTHY = "healthy",
  AT_RISK = "at_risk",
  FAILING = "failing",
  NOT_MONITORED = "not_monitored",
}

export enum MonitoringEventStatus {
  PASS = "pass",
  FAIL = "fail",
  ERROR = "error",
  SKIPPED = "skipped",
}

export enum ConfidenceLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum QuantificationMethodology {
  SIMPLE_ALE = "simple_ale",
  FAIR = "fair",
}

export enum AuditType {
  INTERNAL = "internal",
  EXTERNAL = "external",
}

export enum AuditMgmtStatus {
  PLANNED = "planned",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum FindingSeverity {
  CRITICAL = "critical",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
  INFORMATIONAL = "informational",
}

export enum FindingStatus {
  OPEN = "open",
  IN_REMEDIATION = "in_remediation",
  REMEDIATED = "remediated",
  ACCEPTED = "accepted",
  CLOSED = "closed",
}

export enum ReportEntityType {
  RISK = "risk",
  CONTROL = "control",
  AUDIT = "audit",
  VENDOR = "vendor",
  KRI = "kri",
}

export enum ReportSortOrder {
  ASC = "asc",
  DESC = "desc",
}
