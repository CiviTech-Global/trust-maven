import { Risk } from "../domain.layer/models/risk/risk.model";
import { RiskAssessment } from "../domain.layer/models/riskAssessment/riskAssessment.model";
import { RiskTreatment } from "../domain.layer/models/riskTreatment/riskTreatment.model";
import { User } from "../domain.layer/models/user/user.model";
import { Project } from "../domain.layer/models/project/project.model";
import { AuditLog } from "../domain.layer/models/auditLog/auditLog.model";
import { Op } from "sequelize";

function escapeCSV(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toCSV(headers: string[], rows: string[][]): string {
  const headerLine = headers.map(escapeCSV).join(",");
  const dataLines = rows.map((row) => row.map(escapeCSV).join(","));
  return [headerLine, ...dataLines].join("\n");
}

export class ExportService {
  async exportRisksCSV(organizationId: string, filters?: { domain?: string; status?: string }) {
    const where: any = { organizationId };
    if (filters?.domain) where.domain = filters.domain;
    if (filters?.status) where.status = filters.status;

    const risks = await Risk.findAll({
      where,
      include: [
        { model: User, as: "owner", attributes: ["firstName", "lastName"] },
        { model: Project, attributes: ["name"] },
        { model: RiskAssessment, order: [["assessedAt", "DESC"]], limit: 1 },
        { model: RiskTreatment },
      ],
      order: [["createdAt", "DESC"]],
    });

    const headers = [
      "Title", "Description", "Domain", "Status", "Project",
      "Owner", "Likelihood", "Impact", "Risk Score",
      "Treatments Count", "Created At", "Updated At",
    ];

    const rows = risks.map((risk: any) => {
      const assessment = risk.assessments?.[0];
      const score = assessment ? assessment.likelihood * assessment.impact : null;
      return [
        risk.title,
        risk.description || "",
        risk.domain,
        risk.status,
        risk.project?.name || "",
        risk.owner ? `${risk.owner.firstName} ${risk.owner.lastName}` : "",
        assessment?.likelihood?.toString() || "",
        assessment?.impact?.toString() || "",
        score?.toString() || "",
        (risk.treatments?.length ?? 0).toString(),
        new Date(risk.createdAt).toISOString(),
        new Date(risk.updatedAt).toISOString(),
      ];
    });

    return toCSV(headers, rows);
  }

  async exportAuditCSV(organizationId: string, dateRange?: { from?: string; to?: string }) {
    const where: any = { organizationId };
    if (dateRange?.from || dateRange?.to) {
      where.createdAt = {};
      if (dateRange.from) where.createdAt[Op.gte] = new Date(dateRange.from);
      if (dateRange.to) where.createdAt[Op.lte] = new Date(dateRange.to);
    }

    const logs = await AuditLog.findAll({
      where,
      include: [{ model: User, attributes: ["firstName", "lastName", "email"] }],
      order: [["createdAt", "DESC"]],
    });

    const headers = ["Date", "User", "Email", "Action", "Entity Type", "Entity ID", "Changes"];

    const rows = logs.map((log: any) => [
      new Date(log.createdAt).toISOString(),
      log.user ? `${log.user.firstName} ${log.user.lastName}` : "",
      log.user?.email || "",
      log.action,
      log.entityType,
      log.entityId,
      JSON.stringify(log.changes || {}),
    ]);

    return toCSV(headers, rows);
  }
}

export const exportService = new ExportService();
