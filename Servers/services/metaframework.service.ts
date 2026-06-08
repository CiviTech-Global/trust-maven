import { Op } from "sequelize";
import { CommonControl } from "../domain.layer/models/commonControl/commonControl.model";
import { CommonControlMapping } from "../domain.layer/models/commonControlMapping/commonControlMapping.model";
import { CommonControlImplementation } from "../domain.layer/models/commonControlImplementation/commonControlImplementation.model";
import { RegulationDefinition } from "../domain.layer/models/regulationDefinition/regulationDefinition.model";
import { RegulationRequirement } from "../domain.layer/models/regulationRequirement/regulationRequirement.model";
import { OrganizationRegulation } from "../domain.layer/models/organizationRegulation/organizationRegulation.model";
import { RequirementImplementation } from "../domain.layer/models/requirementImplementation/requirementImplementation.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class MetaframeworkService {
  // ── Common Controls CRUD ────────────────────────────────────

  async listCommonControls(filters?: {
    domain?: string;
    search?: string;
    weight?: string;
  }) {
    const where: Record<string, unknown> = { isActive: true };
    if (filters?.domain) where.domain = filters.domain;
    if (filters?.weight) where.controlWeight = filters.weight;
    if (filters?.search) {
      where[Op.or as any] = [
        { title: { [Op.iLike]: `%${filters.search}%` } },
        { code: { [Op.iLike]: `%${filters.search}%` } },
        { description: { [Op.iLike]: `%${filters.search}%` } },
      ];
    }
    return CommonControl.findAll({
      where,
      order: [["domain", "ASC"], ["code", "ASC"]],
    });
  }

  async getCommonControl(id: string) {
    const control = await CommonControl.findByPk(id, {
      include: [
        {
          model: CommonControlMapping,
          include: [
            {
              model: RegulationRequirement,
              include: [
                { model: RegulationDefinition, attributes: ["id", "code", "name"] },
              ],
            },
          ],
        },
      ],
    });
    if (!control) throw new Error("Common control not found");
    return control;
  }

  async getCommonControlByCode(code: string) {
    const control = await CommonControl.findOne({
      where: { code },
      include: [{ model: CommonControlMapping }],
    });
    if (!control) throw new Error("Common control not found");
    return control;
  }

  // ── STRM Mappings ───────────────────────────────────────────

  async getMappingsForRequirement(requirementId: string) {
    return CommonControlMapping.findAll({
      where: { requirementId },
      include: [{ model: CommonControl }],
    });
  }

  async getMappingsForControl(commonControlId: string) {
    return CommonControlMapping.findAll({
      where: { commonControlId },
      include: [
        {
          model: RegulationRequirement,
          as: "requirement",
          include: [
            { model: RegulationDefinition, as: "regulation", attributes: ["id", "code", "name"] },
          ],
        },
      ],
    });
  }

  async listDomains() {
    const controls = await CommonControl.findAll({
      attributes: ["domain"],
      group: ["domain"],
      order: [["domain", "ASC"]],
      raw: true,
    });
    return controls.map((c: any) => c.domain);
  }

  // ── Per-Organization Implementation ─────────────────────────

  async getOrganizationImplementations(
    organizationId: string,
    filters?: { status?: string; domain?: string }
  ) {
    const where: Record<string, unknown> = { organizationId };
    if (filters?.status) where.status = filters.status;

    const implementations = await CommonControlImplementation.findAll({
      where,
      include: [
        {
          model: CommonControl,
          where: filters?.domain ? { domain: filters.domain } : undefined,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const total = await CommonControl.count({ where: { isActive: true } });
    const implemented = implementations.filter(
      (i) => i.status === "implemented"
    ).length;
    const inProgress = implementations.filter(
      (i) =>
        i.status === "in_progress" ||
        i.status === "awaiting_review" ||
        i.status === "awaiting_approval"
    ).length;

    return {
      implementations,
      summary: {
        total,
        implemented,
        inProgress,
        notStarted: total - implemented - inProgress,
        compliancePercent:
          total > 0 ? Math.round((implemented / total) * 100) : 0,
      },
    };
  }

  async updateImplementation(
    organizationId: string,
    commonControlId: string,
    data: {
      status?: string;
      ownerId?: string;
      reviewerId?: string;
      approverId?: string;
      implementationNotes?: string;
      implementationDetails?: string;
      evidenceIds?: string[];
      dueDate?: string;
    },
    userId: string
  ) {
    const [impl, created] = await CommonControlImplementation.findOrCreate({
      where: { organizationId, commonControlId },
      defaults: {
        organizationId,
        commonControlId,
        status: "not_started",
      },
    });

    const prevStatus = impl.status;
    const changedFields: Record<string, unknown> = {};

    if (data.status !== undefined && data.status !== prevStatus) {
      changedFields.status = data.status;
      if (data.status === "implemented") {
        changedFields.completedAt = new Date();
      } else if (prevStatus === "implemented") {
        changedFields.completedAt = null;
      }
    }
    if (data.ownerId !== undefined) changedFields.ownerId = data.ownerId;
    if (data.reviewerId !== undefined) changedFields.reviewerId = data.reviewerId;
    if (data.approverId !== undefined) changedFields.approverId = data.approverId;
    if (data.implementationNotes !== undefined)
      changedFields.implementationNotes = data.implementationNotes;
    if (data.implementationDetails !== undefined)
      changedFields.implementationDetails = data.implementationDetails;
    if (data.evidenceIds !== undefined)
      changedFields.evidenceIds = data.evidenceIds;
    if (data.dueDate !== undefined) changedFields.dueDate = data.dueDate;

    await impl.update(changedFields);

    await auditService.log({
      organizationId,
      userId,
      entityType: "common_control_implementation",
      entityId: impl.id,
      action: created ? AuditAction.CREATE : AuditAction.UPDATE,
      changes: changedFields,
    });

    // Cascade: update all RequirementImplementation records mapped through this common control
    if (data.status === "implemented" || data.status === "not_applicable") {
      await this.cascadeToRequirements(
        organizationId,
        commonControlId,
        data.status,
        userId
      );
    }

    return impl;
  }

  private async cascadeToRequirements(
    organizationId: string,
    commonControlId: string,
    commonControlStatus: string,
    userId: string
  ) {
    const mappings = await CommonControlMapping.findAll({
      where: { commonControlId },
    });

    for (const mapping of mappings) {
      const reqStatus =
        commonControlStatus === "implemented" ? "implemented" : "not_applicable";

      await RequirementImplementation.upsert({
        organizationId,
        requirementId: mapping.requirementId,
        status: reqStatus,
        completedAt:
          reqStatus === "implemented" ? new Date() : null,
      } as any);
    }
  }

  // ── Jumpstart: Check existing implementations on adoption ────

  async getJumpstartCoverage(
    organizationId: string,
    regulationId: string
  ) {
    const requirements = await RegulationRequirement.findAll({
      where: { regulationId, isActive: true },
    });
    const reqIds = requirements.map((r) => r.id);

    const mappings = await CommonControlMapping.findAll({
      where: { requirementId: { [Op.in]: reqIds } },
      include: [{ model: CommonControl }],
    });

    const commonControlIds = [
      ...new Set(mappings.map((m) => m.commonControlId)),
    ];

    const implementations = await CommonControlImplementation.findAll({
      where: {
        organizationId,
        commonControlId: { [Op.in]: commonControlIds },
      },
    });

    const implementedMap = new Map(
      implementations
        .filter((i) => i.status === "implemented")
        .map((i) => [i.commonControlId, true])
    );

    const covered: Array<{
      requirementId: string;
      requirementCode: string;
      requirementTitle: string;
      commonControlId: string;
      commonControlCode: string;
      commonControlTitle: string;
      relationshipType: string;
      strength: number;
    }> = [];

    const uncovered: Array<{
      requirementId: string;
      requirementCode: string;
      requirementTitle: string;
      suggestedCommonControlId: string;
      suggestedCommonControlCode: string;
      suggestedCommonControlTitle: string;
    }> = [];

    const reqMap = new Map(requirements.map((r) => [r.id, r]));

    for (const mapping of mappings) {
      const isImplied = implementedMap.has(mapping.commonControlId);
      const req = reqMap.get(mapping.requirementId);
      if (!req) continue;

      if (isImplied) {
        covered.push({
          requirementId: req.id,
          requirementCode: req.code,
          requirementTitle: req.title,
          commonControlId: mapping.commonControlId,
          commonControlCode: mapping.commonControl.code,
          commonControlTitle: mapping.commonControl.title,
          relationshipType: mapping.relationshipType,
          strength: mapping.strength,
        });
      } else {
        uncovered.push({
          requirementId: req.id,
          requirementCode: req.code,
          requirementTitle: req.title,
          suggestedCommonControlId: mapping.commonControlId,
          suggestedCommonControlCode: mapping.commonControl.code,
          suggestedCommonControlTitle: mapping.commonControl.title,
        });
      }
    }

    const uniqueCovered = [
      ...new Set(covered.map((c) => c.requirementId)),
    ].length;
    const uniqueUncovered = [
      ...new Set(uncovered.map((u) => u.requirementId)),
    ].length;
    const total = requirements.length;

    return {
      totalRequirements: total,
      coveredCount: uniqueCovered,
      uncoveredCount: uniqueUncovered,
      coveragePercent:
        total > 0 ? Math.round((uniqueCovered / total) * 100) : 0,
      covered,
      uncovered,
    };
  }

  // ── Compliance Summary Across All Adopted Regulations ────────

  async getUnifiedComplianceStatus(organizationId: string) {
    const adopted = await OrganizationRegulation.findAll({
      where: { organizationId, status: "active" },
      include: [{ model: RegulationDefinition }],
    });

    const results: Array<{
      regulationId: string;
      regulationCode: string;
      regulationName: string;
      totalRequirements: number;
      implementedViaCommonControls: number;
      directImplementations: number;
      compliancePercent: number;
    }> = [];

    for (const orgReg of adopted) {
      const requirements = await RegulationRequirement.findAll({
        where: {
          regulationId: orgReg.regulationId,
          isActive: true,
        },
      });
      const reqIds = requirements.map((r) => r.id);

      const directImpls = await RequirementImplementation.findAll({
        where: {
          organizationId,
          requirementId: { [Op.in]: reqIds },
        },
      });
      const directImplemented = directImpls.filter(
        (i) => i.status === "implemented"
      ).length;

      const mappings = await CommonControlMapping.findAll({
        where: { requirementId: { [Op.in]: reqIds } },
      });
      const ccIds = [...new Set(mappings.map((m) => m.commonControlId))];
      const ccImpls = await CommonControlImplementation.findAll({
        where: {
          organizationId,
          commonControlId: { [Op.in]: ccIds },
          status: "implemented",
        },
      });

      const ccImplReqIds = new Set(
        mappings
          .filter((m) => ccImpls.some((c) => c.commonControlId === m.commonControlId))
          .map((m) => m.requirementId)
      );

      const totalCovered = new Set([
        ...directImpls
          .filter((i) => i.status === "implemented")
          .map((i) => i.requirementId),
        ...ccImplReqIds,
      ]);

      results.push({
        regulationId: orgReg.regulationId,
        regulationCode: (orgReg as any).regulation.code,
        regulationName: (orgReg as any).regulation.name,
        totalRequirements: requirements.length,
        implementedViaCommonControls: ccImplReqIds.size,
        directImplementations: directImplemented,
        compliancePercent:
          requirements.length > 0
            ? Math.round((totalCovered.size / requirements.length) * 100)
            : 0,
      });
    }

    const totalReqs = results.reduce((s, r) => s + r.totalRequirements, 0);
    const totalCovered = results.reduce(
      (s, r) => s + Math.round((r.compliancePercent / 100) * r.totalRequirements),
      0
    );

    return {
      regulations: results,
      overallCompliancePercent:
        totalReqs > 0 ? Math.round((totalCovered / totalReqs) * 100) : 0,
    };
  }
}

export const metaframeworkService = new MetaframeworkService();
