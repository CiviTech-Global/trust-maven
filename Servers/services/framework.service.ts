import { Op, WhereOptions } from "sequelize";
import { Framework } from "../domain.layer/models/framework/framework.model";
import { ControlFrameworkMapping } from "../domain.layer/models/controlFrameworkMapping/controlFrameworkMapping.model";
import { Control } from "../domain.layer/models/control/control.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class FrameworkService {
  async findAll(organizationId: string, filters?: { search?: string }) {
    const where: WhereOptions = { organizationId } as any;
    if (filters?.search) {
      (where as any).name = { [Op.iLike]: `%${filters.search}%` };
    }

    return Framework.findAll({
      where,
      order: [["name", "ASC"]],
    });
  }

  async findById(id: string, organizationId: string) {
    const framework = await Framework.findOne({ where: { id, organizationId } });
    if (!framework) throw new Error("Framework not found");
    return framework;
  }

  async create(
    data: { name: string; version?: string; description?: string; requirements?: unknown[] },
    organizationId: string,
    userId: string
  ) {
    const framework = await Framework.create({ ...data, organizationId });

    await auditService.log({
      organizationId,
      userId,
      entityType: "framework",
      entityId: framework.id,
      action: AuditAction.CREATE,
      changes: { name: data.name, version: data.version },
    });

    return framework;
  }

  async update(
    id: string,
    data: Partial<{ name: string; version: string; description: string; requirements: unknown[] }>,
    organizationId: string,
    userId: string
  ) {
    const framework = await Framework.findOne({ where: { id, organizationId } });
    if (!framework) throw new Error("Framework not found");

    await framework.update(data);

    await auditService.log({
      organizationId,
      userId,
      entityType: "framework",
      entityId: framework.id,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return framework;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const framework = await Framework.findOne({ where: { id, organizationId } });
    if (!framework) throw new Error("Framework not found");

    await ControlFrameworkMapping.destroy({ where: { frameworkId: id } });
    await framework.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "framework",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }

  async getComplianceCoverage(id: string, organizationId: string) {
    const framework = await Framework.findOne({ where: { id, organizationId } });
    if (!framework) throw new Error("Framework not found");

    const requirements = (framework.requirements || []) as { id: string; title: string; description?: string }[];
    const totalRequirements = requirements.length;

    const mappings = await ControlFrameworkMapping.findAll({
      where: { frameworkId: id },
      include: [{ model: Control, attributes: ["id", "title", "type", "effectiveness", "designEffectiveness", "operatingEffectiveness"] }],
    });

    // Group mappings by requirementId
    const coveredRequirements = new Set(mappings.map((m) => m.requirementId));
    const coveredCount = coveredRequirements.size;
    const coveragePercent = totalRequirements > 0 ? Math.round((coveredCount / totalRequirements) * 100) : 0;

    // Identify gaps
    const gaps = requirements.filter((r) => !coveredRequirements.has(r.id));

    // Build requirement detail with mapped controls
    const requirementDetails = requirements.map((req) => {
      const reqMappings = mappings.filter((m) => m.requirementId === req.id);
      return {
        ...req,
        covered: reqMappings.length > 0,
        controls: reqMappings.map((m) => m.control),
      };
    });

    return {
      framework: { id: framework.id, name: framework.name, version: framework.version },
      totalRequirements,
      coveredCount,
      coveragePercent,
      gaps,
      requirementDetails,
    };
  }

  async getAllComplianceSummary(organizationId: string) {
    const frameworks = await this.findAll(organizationId);
    const summaries = await Promise.all(
      frameworks.map(async (f) => {
        const requirements = (f.requirements || []) as unknown[];
        const totalRequirements = requirements.length;

        const mappingCount = await ControlFrameworkMapping.count({
          where: { frameworkId: f.id },
          distinct: true,
          col: "requirementId",
        });

        return {
          id: f.id,
          name: f.name,
          version: f.version,
          totalRequirements,
          coveredCount: mappingCount,
          coveragePercent: totalRequirements > 0 ? Math.round((mappingCount / totalRequirements) * 100) : 0,
        };
      })
    );
    return summaries;
  }
}

export const frameworkService = new FrameworkService();
