import { Op } from "sequelize";
import { RegulationDefinition } from "../domain.layer/models/regulationDefinition/regulationDefinition.model";
import { RegulationRequirement } from "../domain.layer/models/regulationRequirement/regulationRequirement.model";
import { OrganizationRegulation } from "../domain.layer/models/organizationRegulation/organizationRegulation.model";
import { RequirementImplementation } from "../domain.layer/models/requirementImplementation/requirementImplementation.model";
import { User } from "../domain.layer/models/user/user.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class ComplianceHubService {
  // ── Organization Regulation Adoption ──────────────────────────

  async getAdoptedRegulations(organizationId: string) {
    return OrganizationRegulation.findAll({
      where: { organizationId },
      include: [{ model: RegulationDefinition }],
      order: [["adoptedAt", "DESC"]],
    });
  }

  async adoptRegulation(
    organizationId: string,
    regulationId: string,
    data: { targetComplianceDate?: string; notes?: string },
    userId: string
  ) {
    const regulation = await RegulationDefinition.findByPk(regulationId);
    if (!regulation) throw new Error("Regulation not found");

    const existing = await OrganizationRegulation.findOne({
      where: { organizationId, regulationId },
    });
    if (existing) throw new Error("Regulation already adopted");

    const orgReg = await OrganizationRegulation.create({
      organizationId,
      regulationId,
      adoptedAt: new Date().toISOString().split("T")[0],
      targetComplianceDate: data.targetComplianceDate || null,
      status: "active",
      notes: data.notes || null,
    });

    // Create RequirementImplementation records for all requirements
    const requirements = await RegulationRequirement.findAll({
      where: { regulationId, isActive: true },
    });

    const implRecords = requirements.map((req) => ({
      organizationId,
      requirementId: req.id,
      status: "not_started",
    }));

    if (implRecords.length > 0) {
      await RequirementImplementation.bulkCreate(implRecords, {
        ignoreDuplicates: true,
      });
    }

    await auditService.log({
      organizationId,
      userId,
      entityType: "organization_regulation",
      entityId: orgReg.id,
      action: AuditAction.CREATE,
      changes: { regulationCode: regulation.code, regulationName: regulation.name },
    });

    return orgReg;
  }

  async deprecateRegulation(organizationId: string, orgRegId: string, userId: string) {
    const orgReg = await OrganizationRegulation.findOne({
      where: { id: orgRegId, organizationId },
    });
    if (!orgReg) throw new Error("Organization regulation not found");

    await orgReg.update({ status: "deprecated" });

    await auditService.log({
      organizationId,
      userId,
      entityType: "organization_regulation",
      entityId: orgRegId,
      action: AuditAction.UPDATE,
      changes: { status: "deprecated" },
    });

    return orgReg;
  }

  // ── Implementation Status ─────────────────────────────────────

  async getImplementationStatus(organizationId: string, orgRegId: string) {
    const orgReg = await OrganizationRegulation.findOne({
      where: { id: orgRegId, organizationId },
      include: [{ model: RegulationDefinition }],
    });
    if (!orgReg) throw new Error("Organization regulation not found");

    const requirements = await RegulationRequirement.findAll({
      where: { regulationId: orgReg.regulationId, isActive: true },
      order: [["level", "ASC"], ["orderNo", "ASC"]],
    });

    const implementations = await RequirementImplementation.findAll({
      where: {
        organizationId,
        requirementId: { [Op.in]: requirements.map((r) => r.id) },
      },
      include: [
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
        { model: User, as: "reviewer", attributes: ["id", "firstName", "lastName"] },
      ],
    });

    const implMap = new Map(implementations.map((i) => [i.requirementId, i]));

    const requirementsWithStatus = requirements.map((req) => {
      const impl = implMap.get(req.id);
      return {
        ...req.toJSON(),
        implementation: impl ? impl.toJSON() : null,
      };
    });

    // Calculate summary
    let implemented = 0;
    let inProgress = 0;
    let notStarted = 0;
    let notApplicable = 0;

    for (const impl of implementations) {
      if (impl.status === "implemented") implemented++;
      else if (impl.status === "in_progress") inProgress++;
      else if (impl.status === "not_applicable") notApplicable++;
      else notStarted++;
    }

    // Count requirements without any implementation record
    notStarted += requirements.length - implementations.length;

    const applicableReqs = requirements.length - notApplicable;
    const compliancePercent = applicableReqs > 0
      ? Math.round((implemented / applicableReqs) * 100)
      : 0;

    return {
      regulation: orgReg.regulation,
      orgRegulation: orgReg,
      summary: {
        totalRequirements: requirements.length,
        implemented,
        inProgress,
        notStarted,
        notApplicable,
        compliancePercent,
      },
      requirements: requirementsWithStatus,
    };
  }

  async updateRequirementImplementation(
    organizationId: string,
    implId: string,
    data: {
      status?: string;
      ownerId?: string;
      reviewerId?: string;
      approverId?: string;
      implementationNotes?: string;
      evidenceLinks?: string[];
      dueDate?: string;
      controlIds?: string[];
    },
    userId: string
  ) {
    const impl = await RequirementImplementation.findOne({
      where: { id: implId, organizationId },
    });
    if (!impl) throw new Error("Requirement implementation not found");

    const updateData: any = { ...data };

    // Set completedAt when status changes to implemented
    if (data.status === "implemented" && impl.status !== "implemented") {
      updateData.completedAt = new Date();
    } else if (data.status && data.status !== "implemented") {
      updateData.completedAt = null;
    }

    await impl.update(updateData);

    await auditService.log({
      organizationId,
      userId,
      entityType: "requirement_implementation",
      entityId: implId,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return impl;
  }

  // ── Bulk Operations ────────────────────────────────────────────

  async bulkDeprecateRegulations(organizationId: string, ids: string[], userId: string) {
    const orgRegs = await OrganizationRegulation.findAll({
      where: { id: { [Op.in]: ids }, organizationId },
    });

    if (orgRegs.length === 0) throw new Error("No matching regulations found");

    const updated = await OrganizationRegulation.update(
      { status: "deprecated" },
      { where: { id: { [Op.in]: ids }, organizationId } }
    );

    for (const orgReg of orgRegs) {
      await auditService.log({
        organizationId,
        userId,
        entityType: "organization_regulation",
        entityId: orgReg.id,
        action: AuditAction.UPDATE,
        changes: { status: "deprecated", bulk: true },
      });
    }

    return { updated: updated[0] };
  }

  async bulkUpdateRegulationStatus(
    organizationId: string,
    ids: string[],
    status: string,
    userId: string
  ) {
    const validStatuses = ["active", "planned", "deprecated"];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
    }

    const orgRegs = await OrganizationRegulation.findAll({
      where: { id: { [Op.in]: ids }, organizationId },
    });

    if (orgRegs.length === 0) throw new Error("No matching regulations found");

    const updated = await OrganizationRegulation.update(
      { status },
      { where: { id: { [Op.in]: ids }, organizationId } }
    );

    for (const orgReg of orgRegs) {
      await auditService.log({
        organizationId,
        userId,
        entityType: "organization_regulation",
        entityId: orgReg.id,
        action: AuditAction.UPDATE,
        changes: { status, bulk: true },
      });
    }

    return { updated: updated[0] };
  }

  // ── Dashboard ─────────────────────────────────────────────────

  async getDashboard(organizationId: string) {
    const adoptedRegs = await OrganizationRegulation.findAll({
      where: { organizationId, status: "active" },
      include: [{ model: RegulationDefinition }],
    });

    const regulationStats = [];
    const areaScores = new Map<string, { total: number; implemented: number }>();
    const topGaps: { requirement: string; regulation: string; code: string }[] = [];

    for (const adopted of adoptedRegs) {
      const regulation = adopted.regulation;
      const area = this.categoryToArea(regulation.category);

      const requirements = await RegulationRequirement.findAll({
        where: { regulationId: regulation.id, isActive: true },
      });

      const implementations = await RequirementImplementation.findAll({
        where: {
          organizationId,
          requirementId: { [Op.in]: requirements.map((r) => r.id) },
        },
      });

      const implMap = new Map(implementations.map((i) => [i.requirementId, i.status]));

      let implemented = 0;
      let notApplicable = 0;

      for (const req of requirements) {
        const status = implMap.get(req.id) || "not_started";
        if (status === "implemented") implemented++;
        else if (status === "not_applicable") notApplicable++;
        else if (status === "not_started" && topGaps.length < 10) {
          topGaps.push({
            requirement: req.title,
            regulation: regulation.name,
            code: req.code,
          });
        }
      }

      const applicableReqs = requirements.length - notApplicable;
      const compliancePercent = applicableReqs > 0
        ? Math.round((implemented / applicableReqs) * 100)
        : 0;

      regulationStats.push({
        id: regulation.id,
        code: regulation.code,
        name: regulation.name,
        category: regulation.category,
        compliance: compliancePercent,
        totalRequirements: requirements.length,
        implemented,
      });

      if (!areaScores.has(area)) {
        areaScores.set(area, { total: 0, implemented: 0 });
      }
      const areaData = areaScores.get(area)!;
      areaData.total += applicableReqs;
      areaData.implemented += implemented;
    }

    const areas = Array.from(areaScores.entries()).map(([area, data]) => ({
      area,
      score: data.total > 0 ? Math.round((data.implemented / data.total) * 100) : 0,
    }));

    const totalApplicable = Array.from(areaScores.values()).reduce((s, a) => s + a.total, 0);
    const totalImplemented = Array.from(areaScores.values()).reduce((s, a) => s + a.implemented, 0);
    const overallScore = totalApplicable > 0
      ? Math.round((totalImplemented / totalApplicable) * 100)
      : 0;

    return {
      adoptedRegulations: regulationStats,
      areaScores: areas,
      overallScore,
      topGaps,
    };
  }

  async getAreaCompliance(organizationId: string, area: string) {
    const categoryKey = this.areaToCategory(area);

    const adoptedRegs = await OrganizationRegulation.findAll({
      where: { organizationId, status: "active" },
      include: [{
        model: RegulationDefinition,
        where: { category: categoryKey },
      }],
    });

    const regulations = [];
    let totalApplicable = 0;
    let totalImplemented = 0;

    for (const adopted of adoptedRegs) {
      const regulation = adopted.regulation;

      const requirements = await RegulationRequirement.findAll({
        where: { regulationId: regulation.id, isActive: true },
      });

      const implementations = await RequirementImplementation.findAll({
        where: {
          organizationId,
          requirementId: { [Op.in]: requirements.map((r) => r.id) },
        },
      });

      const implMap = new Map(implementations.map((i) => [i.requirementId, i]));

      let implemented = 0;
      let notApplicable = 0;
      const gaps: { id: string; code: string; title: string }[] = [];

      for (const req of requirements) {
        const impl = implMap.get(req.id);
        const status = impl?.status || "not_started";
        if (status === "implemented") implemented++;
        else if (status === "not_applicable") notApplicable++;
        else {
          gaps.push({ id: req.id, code: req.code, title: req.title });
        }
      }

      const applicableReqs = requirements.length - notApplicable;
      totalApplicable += applicableReqs;
      totalImplemented += implemented;

      regulations.push({
        regulation: { id: regulation.id, code: regulation.code, name: regulation.name },
        totalRequirements: requirements.length,
        implemented,
        coverage: applicableReqs > 0 ? Math.round((implemented / applicableReqs) * 100) : 0,
        gaps: gaps.slice(0, 10),
      });
    }

    return {
      area,
      regulations,
      overallCoverage: totalApplicable > 0 ? Math.round((totalImplemented / totalApplicable) * 100) : 0,
    };
  }

  private categoryToArea(category: string): string {
    const map: Record<string, string> = {
      information_security: "Information Security",
      privacy: "Privacy & Data Protection",
      ai_governance: "AI Governance",
      it_governance: "IT Governance",
      risk_management: "Risk Management",
      financial_audit: "Financial & Audit",
      business_continuity: "Business Continuity",
      third_party_risk: "Third-Party Risk",
    };
    return map[category] || category;
  }

  private areaToCategory(area: string): string {
    const map: Record<string, string> = {
      "Information Security": "information_security",
      "Privacy & Data Protection": "privacy",
      "AI Governance": "ai_governance",
      "IT Governance": "it_governance",
      "Risk Management": "risk_management",
      "Financial & Audit": "financial_audit",
      "Business Continuity": "business_continuity",
      "Third-Party Risk": "third_party_risk",
    };
    return map[area] || area;
  }
}

export const complianceHubService = new ComplianceHubService();
