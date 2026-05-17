import { Op } from "sequelize";
import { RegulationDefinition } from "../domain.layer/models/regulationDefinition/regulationDefinition.model";
import { RegulationRequirement } from "../domain.layer/models/regulationRequirement/regulationRequirement.model";
import { OrganizationRegulation } from "../domain.layer/models/organizationRegulation/organizationRegulation.model";
import { RequirementImplementation } from "../domain.layer/models/requirementImplementation/requirementImplementation.model";
import { CrossFrameworkMapping } from "../domain.layer/models/crossFrameworkMapping/crossFrameworkMapping.model";

interface OrgProfile {
  industry?: string;
  size?: string;
  jurisdictions?: string[];
  existingFrameworks?: string[];
}

interface RecommendationResult {
  recommended: RegulationDefinition[];
  reasoning: string[];
  coverageMatrix: { area: string; frameworks: string[] }[];
}

export class RegulationIntelligenceService {
  async recommendFrameworkStack(orgProfile: OrgProfile): Promise<RecommendationResult> {
    const allRegulations = await RegulationDefinition.findAll({
      where: { isActive: true },
      order: [["category", "ASC"]],
    });

    const recommended: RegulationDefinition[] = [];
    const reasoning: string[] = [];
    const existing = new Set(orgProfile.existingFrameworks || []);
    const jurisdictions = new Set(orgProfile.jurisdictions || []);

    // Rule-based recommendation engine
    for (const reg of allRegulations) {
      if (existing.has(reg.code)) continue;

      let shouldRecommend = false;
      let reason = "";

      // Universal recommendations
      if (reg.code === "ISO_27001_2022") {
        shouldRecommend = true;
        reason = "ISO 27001 is the foundational information security standard recommended for all organizations";
      } else if (reg.code === "ISO_31000") {
        shouldRecommend = true;
        reason = "ISO 31000 provides the universal risk management framework applicable across all GRC areas";
      }

      // Industry-based recommendations
      if (orgProfile.industry) {
        const industry = orgProfile.industry.toLowerCase();

        if (["fintech", "finance", "banking", "insurance"].includes(industry)) {
          if (reg.code === "SOX") {
            shouldRecommend = true;
            reason = "SOX is required for publicly traded financial companies";
          }
          if (reg.code === "SOC2_TYPE2") {
            shouldRecommend = true;
            reason = "SOC 2 Type II is essential for financial services demonstrating security controls";
          }
        }

        if (["saas", "technology", "cloud", "software"].includes(industry)) {
          if (reg.code === "SOC2_TYPE2") {
            shouldRecommend = true;
            reason = "SOC 2 Type II is the de facto standard for SaaS and technology companies";
          }
          if (reg.code === "NIST_CSF_2") {
            shouldRecommend = true;
            reason = "NIST CSF 2.0 provides a comprehensive cybersecurity framework for technology companies";
          }
        }

        if (["healthcare", "pharma"].includes(industry)) {
          if (reg.code === "NIST_CSF_2") {
            shouldRecommend = true;
            reason = "NIST CSF is widely adopted in healthcare for cybersecurity risk management";
          }
        }
      }

      // Jurisdiction-based recommendations
      if (jurisdictions.has("EU") || jurisdictions.has("EEA")) {
        if (reg.code === "GDPR") {
          shouldRecommend = true;
          reason = "GDPR compliance is mandatory for organizations processing EU personal data";
        }
      }

      if (jurisdictions.has("US")) {
        if (reg.code === "NIST_CSF_2") {
          shouldRecommend = true;
          reason = "NIST CSF 2.0 is the primary US cybersecurity framework";
        }
        if (reg.code === "SOC2_TYPE2") {
          shouldRecommend = true;
          reason = "SOC 2 is widely required by US business customers and partners";
        }
      }

      // Size-based recommendations
      if (orgProfile.size === "enterprise" || orgProfile.size === "large") {
        if (reg.code === "SOX" && !shouldRecommend) {
          shouldRecommend = true;
          reason = "SOX may apply to large/public enterprises for financial reporting controls";
        }
      }

      // Global presence
      if (jurisdictions.size > 1) {
        if (reg.code === "GDPR" && !shouldRecommend) {
          shouldRecommend = true;
          reason = "GDPR applies to any organization processing data of EU residents, relevant for global operations";
        }
      }

      if (shouldRecommend) {
        recommended.push(reg);
        reasoning.push(reason);
      }
    }

    // Build coverage matrix
    const areaMap = new Map<string, string[]>();
    for (const reg of [...recommended, ...allRegulations.filter((r) => existing.has(r.code))]) {
      const area = this.categoryToArea(reg.category);
      if (!areaMap.has(area)) areaMap.set(area, []);
      areaMap.get(area)!.push(reg.name);
    }

    const coverageMatrix = Array.from(areaMap.entries()).map(([area, frameworks]) => ({
      area,
      frameworks,
    }));

    return { recommended, reasoning, coverageMatrix };
  }

  async getUnifiedComplianceStatus(organizationId: string) {
    const adoptedRegs = await OrganizationRegulation.findAll({
      where: { organizationId, status: "active" },
      include: [{ model: RegulationDefinition }],
    });

    const byArea = new Map<string, {
      area: string;
      regulations: string[];
      totalReqs: number;
      implementedReqs: number;
    }>();

    const byRegulation: {
      regulation: { id: string; code: string; name: string };
      totalRequirements: number;
      implemented: number;
      inProgress: number;
      notStarted: number;
      notApplicable: number;
      gaps: number;
      compliancePercent: number;
    }[] = [];

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
      let inProgress = 0;
      let notStarted = 0;
      let notApplicable = 0;

      for (const req of requirements) {
        const status = implMap.get(req.id) || "not_started";
        if (status === "implemented") implemented++;
        else if (status === "in_progress") inProgress++;
        else if (status === "not_applicable") notApplicable++;
        else notStarted++;
      }

      const applicableReqs = requirements.length - notApplicable;
      const compliancePercent = applicableReqs > 0
        ? Math.round((implemented / applicableReqs) * 100)
        : 0;

      byRegulation.push({
        regulation: { id: regulation.id, code: regulation.code, name: regulation.name },
        totalRequirements: requirements.length,
        implemented,
        inProgress,
        notStarted,
        notApplicable,
        gaps: notStarted + inProgress,
        compliancePercent,
      });

      if (!byArea.has(area)) {
        byArea.set(area, { area, regulations: [], totalReqs: 0, implementedReqs: 0 });
      }
      const areaData = byArea.get(area)!;
      areaData.regulations.push(regulation.name);
      areaData.totalReqs += applicableReqs;
      areaData.implementedReqs += implemented;
    }

    const areaResults = Array.from(byArea.values()).map((a) => ({
      area: a.area,
      regulations: a.regulations,
      overallCompliance: a.totalReqs > 0 ? Math.round((a.implementedReqs / a.totalReqs) * 100) : 0,
    }));

    return { byArea: areaResults, byRegulation };
  }

  async getSmartGapAnalysis(organizationId: string, targetRegulationId: string) {
    const targetReg = await RegulationDefinition.findByPk(targetRegulationId);
    if (!targetReg) throw new Error("Regulation not found");

    const targetReqs = await RegulationRequirement.findAll({
      where: { regulationId: targetRegulationId, isActive: true },
    });

    // Get current implementations for all adopted regulations
    const existingImpls = await RequirementImplementation.findAll({
      where: { organizationId, status: "implemented" },
    });
    const implementedReqIds = new Set(existingImpls.map((i) => i.requirementId));

    // Get all cross-mappings from target requirements to any requirement
    const targetReqIds = targetReqs.map((r) => r.id);

    const crossMappings = await CrossFrameworkMapping.findAll({
      where: {
        [Op.or]: [
          { sourceRequirementId: { [Op.in]: targetReqIds } },
          { targetRequirementId: { [Op.in]: targetReqIds } },
        ],
      },
      include: [
        {
          model: RegulationRequirement,
          as: "sourceRequirement",
          include: [{ model: RegulationDefinition, attributes: ["id", "code", "name"] }],
        },
        {
          model: RegulationRequirement,
          as: "targetRequirement",
          include: [{ model: RegulationDefinition, attributes: ["id", "code", "name"] }],
        },
      ],
    });

    const alreadyCovered: any[] = [];
    const leverageable: any[] = [];
    const newWork: any[] = [];

    for (const req of targetReqs) {
      // Check if directly implemented
      const directImpl = existingImpls.find((i) => i.requirementId === req.id);
      if (directImpl) {
        alreadyCovered.push({
          requirement: { id: req.id, code: req.code, title: req.title },
          coveredVia: "direct_implementation",
        });
        continue;
      }

      // Check cross-mappings for coverage
      const relatedMappings = crossMappings.filter(
        (m) => m.sourceRequirementId === req.id || m.targetRequirementId === req.id
      );

      const coveringMappings = relatedMappings.filter((m) => {
        const otherReqId = m.sourceRequirementId === req.id
          ? m.targetRequirementId
          : m.sourceRequirementId;
        return implementedReqIds.has(otherReqId);
      });

      if (coveringMappings.some((m) => m.relevance === "high" && (m.mappingType === "equivalent" || m.mappingType === "overlapping"))) {
        const bestMapping = coveringMappings[0];
        const otherReq = bestMapping.sourceRequirementId === req.id
          ? bestMapping.targetRequirement
          : bestMapping.sourceRequirement;

        alreadyCovered.push({
          requirement: { id: req.id, code: req.code, title: req.title },
          coveredVia: {
            regulation: (otherReq as any)?.regulation?.name,
            requirement: { code: otherReq.code, title: otherReq.title },
            relevance: bestMapping.relevance,
            mappingType: bestMapping.mappingType,
          },
        });
      } else if (coveringMappings.length > 0) {
        leverageable.push({
          requirement: { id: req.id, code: req.code, title: req.title },
          partialCoverageFrom: coveringMappings.map((m) => {
            const otherReq = m.sourceRequirementId === req.id
              ? m.targetRequirement
              : m.sourceRequirement;
            return {
              regulation: (otherReq as any)?.regulation?.name,
              requirement: { code: otherReq.code, title: otherReq.title },
              relevance: m.relevance,
              mappingType: m.mappingType,
            };
          }),
        });
      } else {
        newWork.push({
          requirement: { id: req.id, code: req.code, title: req.title, description: req.description },
        });
      }
    }

    return {
      regulation: { id: targetReg.id, code: targetReg.code, name: targetReg.name },
      totalRequirements: targetReqs.length,
      alreadyCovered,
      leverageable,
      newWork,
      summary: {
        coveredCount: alreadyCovered.length,
        leverageableCount: leverageable.length,
        newWorkCount: newWork.length,
        estimatedCoveragePercent: targetReqs.length > 0
          ? Math.round((alreadyCovered.length / targetReqs.length) * 100)
          : 0,
      },
    };
  }

  async translateCompliance(organizationId: string, fromRegId: string, toRegId: string) {
    const [fromReg, toReg] = await Promise.all([
      RegulationDefinition.findByPk(fromRegId),
      RegulationDefinition.findByPk(toRegId),
    ]);
    if (!fromReg || !toReg) throw new Error("Regulation not found");

    const [fromReqs, toReqs] = await Promise.all([
      RegulationRequirement.findAll({ where: { regulationId: fromRegId, isActive: true } }),
      RegulationRequirement.findAll({ where: { regulationId: toRegId, isActive: true } }),
    ]);

    const fromReqIds = fromReqs.map((r) => r.id);
    const toReqIds = toReqs.map((r) => r.id);

    // Get implementations for source regulation
    const fromImpls = await RequirementImplementation.findAll({
      where: { organizationId, requirementId: { [Op.in]: fromReqIds } },
    });
    const implStatusMap = new Map(fromImpls.map((i) => [i.requirementId, i.status]));

    // Get cross-mappings between the two
    const crossMappings = await CrossFrameworkMapping.findAll({
      where: {
        [Op.or]: [
          { sourceRequirementId: { [Op.in]: fromReqIds }, targetRequirementId: { [Op.in]: toReqIds } },
          { sourceRequirementId: { [Op.in]: toReqIds }, targetRequirementId: { [Op.in]: fromReqIds } },
        ],
      },
      include: [
        { model: RegulationRequirement, as: "sourceRequirement", attributes: ["id", "code", "title"] },
        { model: RegulationRequirement, as: "targetRequirement", attributes: ["id", "code", "title"] },
      ],
    });

    const directMappings = crossMappings.map((m) => {
      const isForward = fromReqIds.includes(m.sourceRequirementId);
      const fromReq = isForward ? m.sourceRequirement : m.targetRequirement;
      const toReq = isForward ? m.targetRequirement : m.sourceRequirement;
      const fromStatus = implStatusMap.get(fromReq.id) || "not_started";

      return {
        from: { id: fromReq.id, code: fromReq.code, title: fromReq.title, status: fromStatus },
        to: { id: toReq.id, code: toReq.code, title: toReq.title },
        relevance: m.relevance,
        mappingType: m.mappingType,
      };
    });

    // Find gaps (target requirements with no mapping from source)
    const mappedToReqIds = new Set(
      directMappings.map((m) => m.to.id)
    );
    const gaps = toReqs
      .filter((r) => !mappedToReqIds.has(r.id))
      .map((r) => ({ id: r.id, code: r.code, title: r.title }));

    const transferable = directMappings.filter(
      (m) => m.from.status === "implemented" && (m.relevance === "high")
    ).length;

    return {
      from: { id: fromReg.id, code: fromReg.code, name: fromReg.name },
      to: { id: toReg.id, code: toReg.code, name: toReg.name },
      directMappings,
      gaps,
      coverageTransferPercentage: toReqs.length > 0
        ? Math.round((transferable / toReqs.length) * 100)
        : 0,
    };
  }

  private categoryToArea(category: string): string {
    const areaMap: Record<string, string> = {
      information_security: "Information Security",
      privacy: "Privacy & Data Protection",
      ai_governance: "AI Governance",
      it_governance: "IT Governance",
      risk_management: "Risk Management",
      financial_audit: "Financial & Audit",
      business_continuity: "Business Continuity",
      third_party_risk: "Third-Party Risk",
    };
    return areaMap[category] || category;
  }
}

export const regulationIntelligenceService = new RegulationIntelligenceService();
