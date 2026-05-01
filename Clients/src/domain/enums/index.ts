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
