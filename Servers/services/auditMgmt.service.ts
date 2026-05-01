import { Op, WhereOptions } from "sequelize";
import { Audit } from "../domain.layer/models/audit/audit.model";
import { AuditFinding } from "../domain.layer/models/auditFinding/auditFinding.model";
import { User } from "../domain.layer/models/user/user.model";
import { Control } from "../domain.layer/models/control/control.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class AuditMgmtService {
  // Audits
  async findAllAudits(
    organizationId: string,
    filters?: { status?: string; auditType?: string; search?: string }
  ) {
    const where: WhereOptions = { organizationId } as any;

    if (filters?.status) (where as any).status = filters.status;
    if (filters?.auditType) (where as any).auditType = filters.auditType;
    if (filters?.search) {
      (where as any).title = { [Op.iLike]: `%${filters.search}%` };
    }

    return Audit.findAll({
      where,
      include: [
        { model: User, as: "leadAuditor", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["startDate", "DESC"]],
    });
  }

  async findAuditById(id: string, organizationId: string) {
    const audit = await Audit.findOne({
      where: { id, organizationId },
      include: [
        { model: User, as: "leadAuditor", attributes: ["id", "firstName", "lastName"] },
      ],
    });
    if (!audit) throw new Error("Audit not found");

    const findings = await AuditFinding.findAll({
      where: { auditId: id, organizationId },
      include: [
        { model: User, as: "responsible", attributes: ["id", "firstName", "lastName"] },
        { model: Control, attributes: ["id", "title"] },
        { model: Risk, attributes: ["id", "title"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    return { ...audit.toJSON(), findings };
  }

  async createAudit(
    data: {
      title: string;
      description?: string;
      auditType: string;
      status?: string;
      leadAuditorId?: string;
      scope?: string;
      startDate: string;
      endDate?: string;
    },
    organizationId: string,
    userId: string
  ) {
    const audit = await Audit.create({ ...data, organizationId });

    await auditService.log({
      organizationId,
      userId,
      entityType: "audit",
      entityId: audit.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return audit;
  }

  async updateAudit(
    id: string,
    data: Partial<{
      title: string;
      description: string;
      auditType: string;
      status: string;
      leadAuditorId: string;
      scope: string;
      startDate: string;
      endDate: string;
    }>,
    organizationId: string,
    userId: string
  ) {
    const audit = await Audit.findOne({ where: { id, organizationId } });
    if (!audit) throw new Error("Audit not found");

    await audit.update(data);

    await auditService.log({
      organizationId,
      userId,
      entityType: "audit",
      entityId: id,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return audit;
  }

  async deleteAudit(id: string, organizationId: string, userId: string) {
    const audit = await Audit.findOne({ where: { id, organizationId } });
    if (!audit) throw new Error("Audit not found");

    await AuditFinding.destroy({ where: { auditId: id } });
    await audit.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "audit",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }

  // Findings
  async createFinding(
    auditId: string,
    data: {
      title: string;
      description?: string;
      severity: string;
      status?: string;
      responsibleId?: string;
      controlId?: string;
      riskId?: string;
      dueDate?: string;
      remediationNotes?: string;
    },
    organizationId: string,
    userId: string
  ) {
    const audit = await Audit.findOne({ where: { id: auditId, organizationId } });
    if (!audit) throw new Error("Audit not found");

    const finding = await AuditFinding.create({
      ...data,
      auditId,
      organizationId,
    });

    await auditService.log({
      organizationId,
      userId,
      entityType: "audit_finding",
      entityId: finding.id,
      action: AuditAction.CREATE,
      changes: { auditId, ...data },
    });

    return finding;
  }

  async updateFinding(
    auditId: string,
    findingId: string,
    data: Partial<{
      title: string;
      description: string;
      severity: string;
      status: string;
      responsibleId: string;
      controlId: string;
      riskId: string;
      dueDate: string;
      remediationNotes: string;
    }>,
    organizationId: string,
    userId: string
  ) {
    const finding = await AuditFinding.findOne({
      where: { id: findingId, auditId, organizationId },
    });
    if (!finding) throw new Error("Finding not found");

    // Set closedAt when status transitions to closed
    const updateData: any = { ...data };
    if (data.status === "closed" && finding.status !== "closed") {
      updateData.closedAt = new Date();
    }

    await finding.update(updateData);

    await auditService.log({
      organizationId,
      userId,
      entityType: "audit_finding",
      entityId: findingId,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return finding;
  }

  async deleteFinding(auditId: string, findingId: string, organizationId: string, userId: string) {
    const finding = await AuditFinding.findOne({
      where: { id: findingId, auditId, organizationId },
    });
    if (!finding) throw new Error("Finding not found");

    await finding.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "audit_finding",
      entityId: findingId,
      action: AuditAction.DELETE,
    });
  }

  async getOverdueFindings(organizationId: string) {
    const now = new Date().toISOString().split("T")[0];
    return AuditFinding.findAll({
      where: {
        organizationId,
        dueDate: { [Op.lt]: now },
        status: { [Op.notIn]: ["closed", "remediated", "accepted"] },
      },
      include: [
        { model: Audit, attributes: ["id", "title"] },
        { model: User, as: "responsible", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["dueDate", "ASC"]],
    });
  }
}

export const auditMgmtService = new AuditMgmtService();
