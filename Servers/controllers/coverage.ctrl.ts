import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { Control } from "../domain.layer/models/control/control.model";
import { RiskControlMapping } from "../domain.layer/models/riskControlMapping/riskControlMapping.model";
import { RiskAssessment } from "../domain.layer/models/riskAssessment/riskAssessment.model";
import { Op } from "sequelize";

export class CoverageController {
  async getControlCoverage(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const orgId = req.user!.organizationId;

      const risks = await Risk.findAll({
        where: { organizationId: orgId },
        include: [{ model: RiskAssessment, as: "assessments", attributes: ["likelihood", "impact"] }],
      });

      const totalRisks = risks.length;
      let coveredRisks = 0;
      let highRiskGaps = 0;

      const gapDetails: { id: string; title: string; domain: string; score: number }[] = [];

      for (const risk of risks) {
        const mapping = await RiskControlMapping.findOne({ where: { riskId: risk.id } });
        if (mapping) {
          coveredRisks++;
        } else {
          const score = risk.assessments?.length
            ? risk.assessments[0].likelihood * risk.assessments[0].impact
            : 0;
          gapDetails.push({ id: risk.id, title: risk.title, domain: risk.domain, score });
          if (score >= 12) highRiskGaps++;
        }
      }

      const coveragePercent = totalRisks > 0 ? Math.round((coveredRisks / totalRisks) * 100) : 100;
      const gaps = totalRisks - coveredRisks;

      res.json({
        success: true,
        data: {
          totalRisks,
          coveredRisks,
          gaps,
          coveragePercent,
          highRiskGaps,
          gapDetails: gapDetails.slice(0, 20),
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const coverageController = new CoverageController();
