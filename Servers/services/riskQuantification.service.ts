import { RiskQuantification } from "../domain.layer/models/riskQuantification/riskQuantification.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { User } from "../domain.layer/models/user/user.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class RiskQuantificationService {
  async findByRisk(riskId: string, organizationId: string) {
    return RiskQuantification.findAll({
      where: { riskId, organizationId },
      include: [
        { model: User, as: "assessor", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["assessedAt", "DESC"]],
    });
  }

  async findById(id: string, organizationId: string) {
    const quant = await RiskQuantification.findOne({
      where: { id, organizationId },
      include: [
        { model: Risk, attributes: ["id", "title", "domain"] },
        { model: User, as: "assessor", attributes: ["id", "firstName", "lastName"] },
      ],
    });
    if (!quant) throw new Error("Risk quantification not found");
    return quant;
  }

  async create(
    data: {
      riskId: string;
      singleLossExpectancy: number;
      annualRateOfOccurrence: number;
      confidenceLevel?: string;
      lossEventFrequencyMin?: number;
      lossEventFrequencyMax?: number;
      lossMagnitudeMin?: number;
      lossMagnitudeMax?: number;
      methodology?: string;
      assumptions?: string;
      assessedAt?: string;
    },
    organizationId: string,
    userId: string
  ) {
    const risk = await Risk.findOne({ where: { id: data.riskId, organizationId } });
    if (!risk) throw new Error("Risk not found");

    const quant = await RiskQuantification.create({
      ...data,
      organizationId,
      assessorId: userId,
      assessedAt: data.assessedAt || new Date().toISOString().split("T")[0],
    });

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_quantification",
      entityId: quant.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return quant;
  }

  async update(
    id: string,
    data: Partial<{
      singleLossExpectancy: number;
      annualRateOfOccurrence: number;
      confidenceLevel: string;
      lossEventFrequencyMin: number;
      lossEventFrequencyMax: number;
      lossMagnitudeMin: number;
      lossMagnitudeMax: number;
      methodology: string;
      assumptions: string;
    }>,
    organizationId: string,
    userId: string
  ) {
    const quant = await RiskQuantification.findOne({ where: { id, organizationId } });
    if (!quant) throw new Error("Risk quantification not found");

    await quant.update(data);

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_quantification",
      entityId: id,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return quant;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const quant = await RiskQuantification.findOne({ where: { id, organizationId } });
    if (!quant) throw new Error("Risk quantification not found");

    await quant.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_quantification",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }

  async getExposureSummary(organizationId: string) {
    const quants = await RiskQuantification.findAll({
      where: { organizationId },
      include: [{ model: Risk, attributes: ["id", "title", "domain"] }],
      order: [["createdAt", "DESC"]],
    });

    let totalALE = 0;
    const byDomain: Record<string, number> = {};

    const items = quants.map((q) => {
      const sle = parseFloat(q.singleLossExpectancy as any) || 0;
      const aro = parseFloat(q.annualRateOfOccurrence as any) || 0;
      const ale = Math.round(sle * aro * 100) / 100;
      totalALE += ale;

      const domain = (q.risk as any)?.domain || "unknown";
      byDomain[domain] = (byDomain[domain] || 0) + ale;

      return { id: q.id, riskId: q.riskId, riskTitle: (q.risk as any)?.title, sle, aro, ale, domain };
    });

    const top5 = [...items].sort((a, b) => b.ale - a.ale).slice(0, 5);

    return { totalALE: Math.round(totalALE * 100) / 100, top5, byDomain };
  }
}

export const riskQuantificationService = new RiskQuantificationService();
