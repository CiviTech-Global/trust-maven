import { Op, WhereOptions } from "sequelize";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { RiskAssessment } from "../domain.layer/models/riskAssessment/riskAssessment.model";
import { RiskTreatment } from "../domain.layer/models/riskTreatment/riskTreatment.model";
import { User } from "../domain.layer/models/user/user.model";
import { Project } from "../domain.layer/models/project/project.model";
import { auditService } from "./audit.service";
import { notificationService } from "./notification.service";
import { AuditAction } from "../types";

export class RiskService {
  async findAll(
    organizationId: string,
    filters?: { domain?: string; status?: string; projectId?: string; search?: string }
  ) {
    const where: WhereOptions = { organizationId } as any;

    if (filters?.domain) (where as any).domain = filters.domain;
    if (filters?.status) (where as any).status = filters.status;
    if (filters?.projectId) (where as any).projectId = filters.projectId;
    if (filters?.search) {
      (where as any).title = { [Op.iLike]: `%${filters.search}%` };
    }

    return Risk.findAll({
      where,
      include: [
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
        { model: Project, attributes: ["id", "name"] },
        { model: RiskAssessment, order: [["assessedAt", "DESC"]], limit: 1 },
        { model: RiskTreatment },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id: string, organizationId: string) {
    const risk = await Risk.findOne({
      where: { id, organizationId },
      include: [
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
        { model: Project, attributes: ["id", "name"] },
        { model: RiskAssessment, include: [{ model: User, as: "assessor", attributes: ["id", "firstName", "lastName"] }] },
        { model: RiskTreatment, include: [{ model: User, as: "responsible", attributes: ["id", "firstName", "lastName"] }] },
      ],
    });
    if (!risk) throw new Error("Risk not found");
    return risk;
  }

  async create(
    data: { title: string; description?: string; domain: string; projectId?: string; ownerId?: string; riskAppetiteThreshold?: number },
    organizationId: string,
    userId: string
  ) {
    const risk = await Risk.create({
      ...data,
      organizationId,
      ownerId: data.ownerId || userId,
    });

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk",
      entityId: risk.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    if (data.ownerId && data.ownerId !== userId) {
      await notificationService.create(data.ownerId, {
        title: "Risk Assigned",
        message: `You have been assigned as owner of risk: ${data.title}`,
        type: "assignment",
        relatedEntityType: "risk",
        relatedEntityId: risk.id,
      });
    }

    return risk;
  }

  async update(
    id: string,
    data: Partial<{ title: string; description: string; domain: string; status: string; projectId: string; ownerId: string; riskAppetiteThreshold: number }>,
    organizationId: string,
    userId: string
  ) {
    const risk = await Risk.findOne({ where: { id, organizationId } });
    if (!risk) throw new Error("Risk not found");

    await risk.update(data);

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk",
      entityId: risk.id,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return risk;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const risk = await Risk.findOne({ where: { id, organizationId } });
    if (!risk) throw new Error("Risk not found");

    await risk.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }
}

export const riskService = new RiskService();
