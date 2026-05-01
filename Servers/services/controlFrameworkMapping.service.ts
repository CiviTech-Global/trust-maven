import { ControlFrameworkMapping } from "../domain.layer/models/controlFrameworkMapping/controlFrameworkMapping.model";
import { Control } from "../domain.layer/models/control/control.model";
import { Framework } from "../domain.layer/models/framework/framework.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class ControlFrameworkMappingService {
  async findByControl(controlId: string) {
    return ControlFrameworkMapping.findAll({
      where: { controlId },
      include: [
        { model: Framework, attributes: ["id", "name", "version"] },
      ],
      order: [["mappedAt", "DESC"]],
    });
  }

  async findByFramework(frameworkId: string) {
    return ControlFrameworkMapping.findAll({
      where: { frameworkId },
      include: [
        { model: Control, attributes: ["id", "title", "type", "effectiveness"] },
      ],
      order: [["mappedAt", "DESC"]],
    });
  }

  async create(
    data: { controlId: string; frameworkId: string; requirementId: string },
    organizationId: string,
    userId: string
  ) {
    const control = await Control.findOne({ where: { id: data.controlId, organizationId } });
    if (!control) throw new Error("Control not found");

    const framework = await Framework.findOne({ where: { id: data.frameworkId, organizationId } });
    if (!framework) throw new Error("Framework not found");

    const mapping = await ControlFrameworkMapping.create({
      controlId: data.controlId,
      frameworkId: data.frameworkId,
      requirementId: data.requirementId,
    });

    await auditService.log({
      organizationId,
      userId,
      entityType: "control_framework_mapping",
      entityId: mapping.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return mapping;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const mapping = await ControlFrameworkMapping.findByPk(id, {
      include: [{ model: Control }],
    });
    if (!mapping) throw new Error("Mapping not found");
    if (mapping.control.organizationId !== organizationId) throw new Error("Mapping not found");

    await mapping.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "control_framework_mapping",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }
}

export const controlFrameworkMappingService = new ControlFrameworkMappingService();
