import { RegulationDefinition } from "../domain.layer/models/regulationDefinition/regulationDefinition.model";
import { RegulationRequirement } from "../domain.layer/models/regulationRequirement/regulationRequirement.model";
import { CrossFrameworkMapping } from "../domain.layer/models/crossFrameworkMapping/crossFrameworkMapping.model";
import {
  ALL_REGULATION_SEEDS,
  CROSS_MAPPINGS_SEED,
  RequirementSeed,
} from "../structures/regulations";
import { logger } from "../utils/logger";

export class RegulationSeederService {
  async isSeeded(): Promise<boolean> {
    const count = await RegulationDefinition.count();
    return count > 0;
  }

  async seed(): Promise<void> {
    const alreadySeeded = await this.isSeeded();
    if (alreadySeeded) {
      logger.info("Regulation seed data already exists — skipping");
      return;
    }

    logger.info("Seeding regulation definitions and requirements...");

    for (const seed of ALL_REGULATION_SEEDS) {
      const regulation = await RegulationDefinition.create({
        code: seed.code,
        name: seed.name,
        type: seed.type,
        category: seed.category,
        jurisdiction: seed.jurisdiction,
        issuer: seed.issuer,
        version: seed.version,
        description: seed.description,
        effectiveDate: seed.effectiveDate || null,
        metadata: seed.metadata || null,
        isActive: true,
      });

      await this.seedRequirements(regulation.id, seed.requirements, null);
      logger.info(`Seeded regulation: ${seed.name} (${seed.code})`);
    }

    await this.seedCrossMappings();
    logger.info("Regulation seeding complete");
  }

  private async seedRequirements(
    regulationId: string,
    requirements: RequirementSeed[],
    parentId: string | null
  ): Promise<void> {
    for (const req of requirements) {
      const record = await RegulationRequirement.create({
        regulationId,
        parentId,
        code: req.code,
        title: req.title,
        description: req.description || "",
        level: req.level,
        orderNo: req.orderNo,
        category: req.category || null,
        keyQuestions: req.keyQuestions || null,
        evidenceExamples: req.evidenceExamples || null,
        implementationGuidance: req.implementationGuidance || null,
        isActive: true,
      });

      if (req.children && req.children.length > 0) {
        await this.seedRequirements(regulationId, req.children, record.id);
      }
    }
  }

  private async seedCrossMappings(): Promise<void> {
    logger.info("Seeding cross-framework mappings...");

    // Build a lookup: "REG_CODE:REQ_CODE" → requirement ID
    const allReqs = await RegulationRequirement.findAll({
      include: [{ model: RegulationDefinition, attributes: ["code"] }],
    });

    const lookup = new Map<string, string>();
    for (const req of allReqs) {
      const regCode = (req as any).regulation?.code;
      if (regCode) {
        lookup.set(`${regCode}:${req.code}`, req.id);
      }
    }

    let created = 0;
    let skipped = 0;

    for (const mapping of CROSS_MAPPINGS_SEED) {
      const sourceId = lookup.get(mapping.source);
      const targetId = lookup.get(mapping.target);

      if (!sourceId || !targetId) {
        skipped++;
        continue;
      }

      try {
        await CrossFrameworkMapping.create({
          sourceRequirementId: sourceId,
          targetRequirementId: targetId,
          relevance: mapping.relevance,
          mappingType: mapping.type,
          notes: mapping.notes || null,
        });
        created++;
      } catch (err: any) {
        if (err.name === "SequelizeUniqueConstraintError") {
          skipped++;
        } else {
          logger.error(`Failed to create mapping ${mapping.source} → ${mapping.target}: ${err.message}`);
        }
      }
    }

    logger.info(`Cross-mappings: ${created} created, ${skipped} skipped`);
  }

  async unseed(): Promise<void> {
    await CrossFrameworkMapping.destroy({ where: {} });
    await RegulationRequirement.destroy({ where: {} });
    await RegulationDefinition.destroy({ where: {} });
    logger.info("Regulation seed data removed");
  }
}

export const regulationSeederService = new RegulationSeederService();
