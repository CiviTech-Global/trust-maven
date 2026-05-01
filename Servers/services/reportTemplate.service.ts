import { Op } from "sequelize";
import { ReportTemplate } from "../domain.layer/models/reportTemplate/reportTemplate.model";
import { User } from "../domain.layer/models/user/user.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class ReportTemplateService {
  async findAll(organizationId: string, userId: string) {
    return ReportTemplate.findAll({
      where: {
        organizationId,
        [Op.or]: [{ createdById: userId }, { isShared: true }],
      },
      include: [
        { model: User, as: "createdBy", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id: string, organizationId: string) {
    const template = await ReportTemplate.findOne({
      where: { id, organizationId },
      include: [
        { model: User, as: "createdBy", attributes: ["id", "firstName", "lastName"] },
      ],
    });
    if (!template) throw new Error("Report template not found");
    return template;
  }

  async create(
    data: {
      name: string;
      description?: string;
      entityType: string;
      columns?: { field: string; label: string }[];
      filters?: { field: string; operator: string; value: string }[];
      groupBy?: string;
      sortBy?: string;
      sortOrder?: string;
      isShared?: boolean;
    },
    organizationId: string,
    userId: string
  ) {
    const template = await ReportTemplate.create({
      ...data,
      organizationId,
      createdById: userId,
    });

    await auditService.log({
      organizationId,
      userId,
      entityType: "report_template",
      entityId: template.id,
      action: AuditAction.CREATE,
      changes: { name: data.name, entityType: data.entityType },
    });

    return template;
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      columns: { field: string; label: string }[];
      filters: { field: string; operator: string; value: string }[];
      groupBy: string;
      sortBy: string;
      sortOrder: string;
      isShared: boolean;
    }>,
    organizationId: string,
    userId: string
  ) {
    const template = await ReportTemplate.findOne({ where: { id, organizationId } });
    if (!template) throw new Error("Report template not found");

    await template.update(data);

    await auditService.log({
      organizationId,
      userId,
      entityType: "report_template",
      entityId: id,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return template;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const template = await ReportTemplate.findOne({ where: { id, organizationId } });
    if (!template) throw new Error("Report template not found");

    await template.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "report_template",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }
}

export const reportTemplateService = new ReportTemplateService();
