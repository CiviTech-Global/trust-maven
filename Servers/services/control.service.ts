import { Op, WhereOptions } from "sequelize";
import { Control } from "../domain.layer/models/control/control.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { User } from "../domain.layer/models/user/user.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class ControlService {
  async findAll(
    organizationId: string,
    filters?: { type?: string; effectiveness?: string; riskId?: string; search?: string }
  ) {
    const where: WhereOptions = { organizationId } as any;

    if (filters?.type) (where as any).type = filters.type;
    if (filters?.effectiveness) (where as any).effectiveness = filters.effectiveness;
    if (filters?.riskId) (where as any).riskId = filters.riskId;
    if (filters?.search) {
      (where as any).title = { [Op.iLike]: `%${filters.search}%` };
    }

    return Control.findAll({
      where,
      include: [
        { model: Risk, attributes: ["id", "title"] },
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id: string, organizationId: string) {
    const control = await Control.findOne({
      where: { id, organizationId },
      include: [
        { model: Risk, attributes: ["id", "title"] },
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
      ],
    });
    if (!control) throw new Error("Control not found");
    return control;
  }

  async findByRisk(riskId: string) {
    return Control.findAll({
      where: { riskId },
      include: [
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async create(
    data: { title: string; description?: string; type: string; effectiveness?: string; riskId?: string; ownerId?: string; designEffectiveness?: string; operatingEffectiveness?: string; testingMethod?: string; lastTestedAt?: string; nextTestDue?: string; testFrequency?: string },
    organizationId: string,
    userId: string
  ) {
    const control = await Control.create({
      ...data,
      organizationId,
      ownerId: data.ownerId || userId,
    });

    await auditService.log({
      organizationId,
      userId,
      entityType: "control",
      entityId: control.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return control;
  }

  async update(
    id: string,
    data: Partial<{ title: string; description: string; type: string; effectiveness: string; riskId: string; ownerId: string; designEffectiveness: string; operatingEffectiveness: string; testingMethod: string; lastTestedAt: string; nextTestDue: string; testFrequency: string }>,
    organizationId: string,
    userId: string
  ) {
    const control = await Control.findOne({ where: { id, organizationId } });
    if (!control) throw new Error("Control not found");

    await control.update(data);

    await auditService.log({
      organizationId,
      userId,
      entityType: "control",
      entityId: control.id,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return control;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const control = await Control.findOne({ where: { id, organizationId } });
    if (!control) throw new Error("Control not found");

    await control.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "control",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }
}

export const controlService = new ControlService();
