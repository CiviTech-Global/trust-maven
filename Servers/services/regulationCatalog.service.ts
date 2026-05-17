import { Op, WhereOptions } from "sequelize";
import { RegulationDefinition } from "../domain.layer/models/regulationDefinition/regulationDefinition.model";
import { RegulationRequirement } from "../domain.layer/models/regulationRequirement/regulationRequirement.model";
import { CrossFrameworkMapping } from "../domain.layer/models/crossFrameworkMapping/crossFrameworkMapping.model";

export class RegulationCatalogService {
  async findAll(filters?: {
    category?: string;
    type?: string;
    jurisdiction?: string;
    search?: string;
  }) {
    const where: WhereOptions = { isActive: true } as any;

    if (filters?.category) (where as any).category = filters.category;
    if (filters?.type) (where as any).type = filters.type;
    if (filters?.jurisdiction) (where as any).jurisdiction = filters.jurisdiction;
    if (filters?.search) {
      (where as any).name = { [Op.iLike]: `%${filters.search}%` };
    }

    return RegulationDefinition.findAll({
      where,
      order: [["category", "ASC"], ["name", "ASC"]],
      attributes: { exclude: ["metadata"] },
    });
  }

  async findById(id: string) {
    const regulation = await RegulationDefinition.findByPk(id);
    if (!regulation) throw new Error("Regulation not found");
    return regulation;
  }

  async findByCode(code: string) {
    const regulation = await RegulationDefinition.findOne({ where: { code } });
    if (!regulation) throw new Error("Regulation not found");
    return regulation;
  }

  async getRequirementTree(regulationId: string) {
    const regulation = await this.findById(regulationId);

    const requirements = await RegulationRequirement.findAll({
      where: { regulationId, isActive: true },
      order: [["level", "ASC"], ["orderNo", "ASC"]],
    });

    const tree = this.buildTree(requirements);
    return { regulation, requirements: tree };
  }

  async getRequirementFlat(regulationId: string) {
    return RegulationRequirement.findAll({
      where: { regulationId, isActive: true },
      order: [["level", "ASC"], ["orderNo", "ASC"]],
    });
  }

  async getRequirement(requirementId: string) {
    const requirement = await RegulationRequirement.findByPk(requirementId, {
      include: [
        { model: RegulationDefinition, attributes: ["id", "code", "name"] },
      ],
    });
    if (!requirement) throw new Error("Requirement not found");

    const crossMappings = await this.getCrossMappings(requirementId);
    return { requirement, crossMappings };
  }

  async getCrossMappings(requirementId: string) {
    // Get mappings where this requirement is source OR target (bidirectional)
    const asSource = await CrossFrameworkMapping.findAll({
      where: { sourceRequirementId: requirementId },
      include: [
        {
          model: RegulationRequirement,
          as: "targetRequirement",
          include: [{ model: RegulationDefinition, attributes: ["id", "code", "name"] }],
        },
      ],
    });

    const asTarget = await CrossFrameworkMapping.findAll({
      where: { targetRequirementId: requirementId },
      include: [
        {
          model: RegulationRequirement,
          as: "sourceRequirement",
          include: [{ model: RegulationDefinition, attributes: ["id", "code", "name"] }],
        },
      ],
    });

    const mappings = [
      ...asSource.map((m) => ({
        id: m.id,
        requirement: m.targetRequirement,
        regulation: (m.targetRequirement as any)?.regulation,
        relevance: m.relevance,
        mappingType: m.mappingType,
        notes: m.notes,
        direction: "outgoing" as const,
      })),
      ...asTarget.map((m) => ({
        id: m.id,
        requirement: m.sourceRequirement,
        regulation: (m.sourceRequirement as any)?.regulation,
        relevance: m.relevance,
        mappingType: m.mappingType,
        notes: m.notes,
        direction: "incoming" as const,
      })),
    ];

    return mappings;
  }

  async getFrameworkOverlap(regId1: string, regId2: string) {
    const [reg1, reg2] = await Promise.all([
      this.findById(regId1),
      this.findById(regId2),
    ]);

    const [reqs1, reqs2] = await Promise.all([
      RegulationRequirement.findAll({ where: { regulationId: regId1, isActive: true } }),
      RegulationRequirement.findAll({ where: { regulationId: regId2, isActive: true } }),
    ]);

    const req1Ids = reqs1.map((r) => r.id);
    const req2Ids = reqs2.map((r) => r.id);

    // Find all cross-mappings between these two regulations
    const mappings = await CrossFrameworkMapping.findAll({
      where: {
        [Op.or]: [
          { sourceRequirementId: { [Op.in]: req1Ids }, targetRequirementId: { [Op.in]: req2Ids } },
          { sourceRequirementId: { [Op.in]: req2Ids }, targetRequirementId: { [Op.in]: req1Ids } },
        ],
      },
      include: [
        {
          model: RegulationRequirement,
          as: "sourceRequirement",
          attributes: ["id", "code", "title", "level"],
        },
        {
          model: RegulationRequirement,
          as: "targetRequirement",
          attributes: ["id", "code", "title", "level"],
        },
      ],
    });

    // Calculate overlap
    const mappedReq1Ids = new Set<string>();
    const mappedReq2Ids = new Set<string>();

    const normalizedMappings = mappings.map((m) => {
      const isForward = req1Ids.includes(m.sourceRequirementId);
      const source = isForward ? m.sourceRequirement : m.targetRequirement;
      const target = isForward ? m.targetRequirement : m.sourceRequirement;

      mappedReq1Ids.add(isForward ? m.sourceRequirementId : m.targetRequirementId);
      mappedReq2Ids.add(isForward ? m.targetRequirementId : m.sourceRequirementId);

      return {
        source: { id: source.id, code: source.code, title: source.title },
        target: { id: target.id, code: target.code, title: target.title },
        relevance: m.relevance,
        mappingType: m.mappingType,
        notes: m.notes,
      };
    });

    const overlapPercentage =
      reqs1.length > 0
        ? Math.round((mappedReq1Ids.size / reqs1.length) * 100)
        : 0;

    return {
      regulation1: { id: reg1.id, code: reg1.code, name: reg1.name, totalRequirements: reqs1.length },
      regulation2: { id: reg2.id, code: reg2.code, name: reg2.name, totalRequirements: reqs2.length },
      mappings: normalizedMappings,
      overlapPercentage,
      mappedCountReg1: mappedReq1Ids.size,
      mappedCountReg2: mappedReq2Ids.size,
    };
  }

  private buildTree(
    requirements: RegulationRequirement[]
  ): (RegulationRequirement & { children: any[] })[] {
    const map = new Map<string, any>();
    const roots: any[] = [];

    for (const req of requirements) {
      map.set(req.id, { ...req.toJSON(), children: [] });
    }

    for (const req of requirements) {
      const node = map.get(req.id);
      if (req.parentId && map.has(req.parentId)) {
        map.get(req.parentId).children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}

export const regulationCatalogService = new RegulationCatalogService();
