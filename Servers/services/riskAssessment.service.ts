import { RiskAssessment } from "../domain.layer/models/riskAssessment/riskAssessment.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { User } from "../domain.layer/models/user/user.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class RiskAssessmentService {
  async findByRisk(riskId: string) {
    return RiskAssessment.findAll({
      where: { riskId },
      include: [{ model: User, as: "assessor", attributes: ["id", "firstName", "lastName"] }],
      order: [["assessedAt", "DESC"]],
    });
  }

  async create(
    data: { riskId: string; likelihood: number; impact: number; methodology?: string; notes?: string },
    organizationId: string,
    userId: string
  ) {
    const risk = await Risk.findOne({ where: { id: data.riskId, organizationId } });
    if (!risk) throw new Error("Risk not found");

    const assessment = await RiskAssessment.create({
      ...data,
      assessorId: userId,
      assessedAt: new Date(),
    });

    if (risk.status === "identified") {
      await risk.update({ status: "assessed" });
    }

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_assessment",
      entityId: assessment.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return assessment;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const assessment = await RiskAssessment.findByPk(id, {
      include: [{ model: Risk }],
    });
    if (!assessment) throw new Error("Assessment not found");
    if (assessment.risk.organizationId !== organizationId) throw new Error("Assessment not found");

    await assessment.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_assessment",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }
}

export const riskAssessmentService = new RiskAssessmentService();
