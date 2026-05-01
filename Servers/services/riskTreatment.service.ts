import { RiskTreatment } from "../domain.layer/models/riskTreatment/riskTreatment.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { User } from "../domain.layer/models/user/user.model";
import { auditService } from "./audit.service";
import { notificationService } from "./notification.service";
import { AuditAction } from "../types";

export class RiskTreatmentService {
  async findByRisk(riskId: string) {
    return RiskTreatment.findAll({
      where: { riskId },
      include: [{ model: User, as: "responsible", attributes: ["id", "firstName", "lastName"] }],
      order: [["createdAt", "DESC"]],
    });
  }

  async create(
    data: { riskId: string; strategy: string; description: string; responsibleId?: string; dueDate?: string },
    organizationId: string,
    userId: string
  ) {
    const risk = await Risk.findOne({ where: { id: data.riskId, organizationId } });
    if (!risk) throw new Error("Risk not found");

    const treatment = await RiskTreatment.create({
      ...data,
      responsibleId: data.responsibleId || userId,
    });

    if (risk.status === "assessed") {
      await risk.update({ status: "treated" });
    }

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_treatment",
      entityId: treatment.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    if (data.responsibleId && data.responsibleId !== userId) {
      await notificationService.create(data.responsibleId, {
        title: "Treatment Assigned",
        message: `You have been assigned as responsible for a treatment on risk: ${risk.title}`,
        type: "assignment",
        relatedEntityType: "risk",
        relatedEntityId: data.riskId,
      });
    }

    return treatment;
  }

  async update(
    id: string,
    data: Partial<{ strategy: string; description: string; status: string; responsibleId: string; dueDate: string }>,
    organizationId: string,
    userId: string
  ) {
    const treatment = await RiskTreatment.findByPk(id, {
      include: [{ model: Risk }],
    });
    if (!treatment) throw new Error("Treatment not found");
    if (treatment.risk.organizationId !== organizationId) throw new Error("Treatment not found");

    await treatment.update(data);

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_treatment",
      entityId: treatment.id,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return treatment;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const treatment = await RiskTreatment.findByPk(id, {
      include: [{ model: Risk }],
    });
    if (!treatment) throw new Error("Treatment not found");
    if (treatment.risk.organizationId !== organizationId) throw new Error("Treatment not found");

    await treatment.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_treatment",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }
}

export const riskTreatmentService = new RiskTreatmentService();
