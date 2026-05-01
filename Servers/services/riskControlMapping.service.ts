import { RiskControlMapping } from "../domain.layer/models/riskControlMapping/riskControlMapping.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { Control } from "../domain.layer/models/control/control.model";
import { User } from "../domain.layer/models/user/user.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class RiskControlMappingService {
  async findByRisk(riskId: string) {
    return RiskControlMapping.findAll({
      where: { riskId },
      include: [
        { model: Control, include: [{ model: User, as: "owner", attributes: ["id", "firstName", "lastName"] }] },
        { model: User, as: "mappedBy", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["mappedAt", "DESC"]],
    });
  }

  async findByControl(controlId: string) {
    return RiskControlMapping.findAll({
      where: { controlId },
      include: [
        { model: Risk, attributes: ["id", "title", "domain", "status"] },
        { model: User, as: "mappedBy", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["mappedAt", "DESC"]],
    });
  }

  async create(data: { riskId: string; controlId: string }, organizationId: string, userId: string) {
    const risk = await Risk.findOne({ where: { id: data.riskId, organizationId } });
    if (!risk) throw new Error("Risk not found");

    const control = await Control.findOne({ where: { id: data.controlId, organizationId } });
    if (!control) throw new Error("Control not found");

    const existing = await RiskControlMapping.findOne({
      where: { riskId: data.riskId, controlId: data.controlId },
    });
    if (existing) throw new Error("This control is already linked to this risk");

    const mapping = await RiskControlMapping.create({
      riskId: data.riskId,
      controlId: data.controlId,
      mappedById: userId,
    });

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_control_mapping",
      entityId: mapping.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return mapping;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const mapping = await RiskControlMapping.findByPk(id, {
      include: [{ model: Risk }],
    });
    if (!mapping) throw new Error("Mapping not found");
    if (mapping.risk.organizationId !== organizationId) throw new Error("Mapping not found");

    await mapping.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_control_mapping",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }
}

export const riskControlMappingService = new RiskControlMappingService();
