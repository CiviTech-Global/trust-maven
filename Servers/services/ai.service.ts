import { Risk } from "../domain.layer/models/risk/risk.model";
import { RiskAssessment } from "../domain.layer/models/riskAssessment/riskAssessment.model";
import { RiskTreatment } from "../domain.layer/models/riskTreatment/riskTreatment.model";
import { Op } from "sequelize";

const DOMAIN_KEYWORDS: Record<string, Array<{ pattern: RegExp; likelihood: number; impact: number; reasoning: string }>> = {
  cybersecurity: [
    { pattern: /ransomware|breach|data.?leak|hack|malware|phishing|zero.?day|ddos/i, likelihood: 4, impact: 5, reasoning: "Cybersecurity risk with active threat indicators suggests high likelihood and critical impact" },
    { pattern: /vulnerability|patch|exploit|backup|firewall|intrusion/i, likelihood: 3, impact: 4, reasoning: "Common cybersecurity vulnerability with moderate-to-high risk profile" },
    { pattern: /training|awareness|endpoint|antivirus/i, likelihood: 3, impact: 3, reasoning: "Standard cybersecurity operational risk with moderate impact" },
  ],
  financial: [
    { pattern: /fraud|embezzlement|misappropriation|insider.?trading/i, likelihood: 3, impact: 5, reasoning: "Financial fraud risk carries severe potential impact with moderate likelihood" },
    { pattern: /credit|market|liquidity|interest.?rate|currency|inflation/i, likelihood: 3, impact: 4, reasoning: "Market-driven financial risk with moderate likelihood and high impact" },
    { pattern: /budget|cost|overrun|revenue|forecast|expense/i, likelihood: 4, impact: 3, reasoning: "Operational financial risk with higher likelihood of occurrence" },
  ],
  regulatory: [
    { pattern: /fine|penalty|sanction|non.?complian|citation|cease.?and.?desist/i, likelihood: 3, impact: 5, reasoning: "Regulatory enforcement action carries severe penalties and reputational damage" },
    { pattern: /gdpr|hipaa|sox|pci|k.?yc|aml|data.?privacy/i, likelihood: 3, impact: 4, reasoning: "Regulatory compliance risk with significant fines and legal exposure" },
    { pattern: /audit|reporting|disclosure|filing|license|permit/i, likelihood: 4, impact: 3, reasoning: "Regulatory reporting and audit risks are common with moderate consequences" },
  ],
  strategic: [
    { pattern: /merger|acquisition|divestiture|ipo|restructuring/i, likelihood: 2, impact: 5, reasoning: "Major strategic transactions have low likelihood but transformative impact" },
    { pattern: /competition|market.?share|entrant|substitute|pricing/i, likelihood: 3, impact: 4, reasoning: "Competitive strategy risks have moderate likelihood with significant market impact" },
    { pattern: /reputation|brand|public.?relation|crisis|social.?media/i, likelihood: 3, impact: 4, reasoning: "Reputational risks can escalate quickly with lasting brand impact" },
  ],
  operational: [
    { pattern: /outage|downtime|disruption|failure|incident|crash/i, likelihood: 3, impact: 4, reasoning: "Operational disruption risk with moderate likelihood and significant impact" },
    { pattern: /supply.?chain|vendor|third.?party|outsource/i, likelihood: 4, impact: 3, reasoning: "Supply chain risks are increasingly common with moderate business impact" },
    { pattern: /employee|turnover|hiring|talent|retention|workforce/i, likelihood: 4, impact: 2, reasoning: "Workforce-related operational risks occur frequently with manageable impact" },
  ],
};

const DEFAULT_DOMAIN_SCORES: Record<string, { likelihood: number; impact: number; reasoning: string }> = {
  cybersecurity: { likelihood: 3, impact: 4, reasoning: "Cybersecurity risks typically carry moderate likelihood with high impact potential" },
  financial: { likelihood: 3, impact: 3, reasoning: "Financial risks generally have balanced likelihood and impact profiles" },
  regulatory: { likelihood: 3, impact: 4, reasoning: "Regulatory risks have moderate likelihood with potentially severe consequences" },
  strategic: { likelihood: 3, impact: 4, reasoning: "Strategic risks often have lower frequency but higher impact" },
  operational: { likelihood: 3, impact: 3, reasoning: "Operational risks cover a wide range of day-to-day business disruptions" },
};

export class AiService {
  async suggestRiskScore(riskId: string, organizationId: string): Promise<{
    suggestedLikelihood: number;
    suggestedImpact: number;
    reasoning: string;
    confidence: "high" | "medium" | "low";
  }> {
    const risk = await Risk.findOne({ where: { id: riskId, organizationId } });
    if (!risk) throw new Error("Risk not found");

    const domain = risk.domain as string;
    const textToMatch = `${risk.title} ${risk.description || ""}`;

    const domainRules = DOMAIN_KEYWORDS[domain] || [];
    const matchedRule = domainRules.find((r) => r.pattern.test(textToMatch));

    if (matchedRule) {
      return {
        suggestedLikelihood: matchedRule.likelihood,
        suggestedImpact: matchedRule.impact,
        reasoning: matchedRule.reasoning,
        confidence: "high",
      };
    }

    const recentAssessments = await RiskAssessment.findAll({
      where: {
        riskId: risk.id,
      },
      order: [["assessedAt", "DESC"]],
      limit: 1,
    });

    if (recentAssessments.length > 0) {
      const last = recentAssessments[0];
      return {
        suggestedLikelihood: last.likelihood,
        suggestedImpact: last.impact,
        reasoning: `Based on most recent assessment score (${last.likelihood}x${last.impact}=${last.likelihood * last.impact})`,
        confidence: "medium",
      };
    }

    const defaultScore = DEFAULT_DOMAIN_SCORES[domain] || DEFAULT_DOMAIN_SCORES.operational;
    return {
      suggestedLikelihood: defaultScore.likelihood,
      suggestedImpact: defaultScore.impact,
      reasoning: defaultScore.reasoning,
      confidence: "low",
    };
  }

  async suggestTreatmentStrategy(riskId: string, organizationId: string): Promise<{
    suggestedStrategies: Array<{ strategy: string; label: string; reasoning: string }>;
  }> {
    const risk = await Risk.findOne({
      where: { id: riskId, organizationId },
      include: [
        { model: RiskAssessment, order: [["assessedAt", "DESC"]], limit: 1 },
        { model: RiskTreatment },
      ],
    });
    if (!risk) throw new Error("Risk not found");

    const domain = risk.domain as string;
    const latestAssessment = (risk as any).assessments?.[0] as RiskAssessment | undefined;
    const currentScore = latestAssessment ? latestAssessment.likelihood * latestAssessment.impact : null;
    const existingTreatments = (risk as any).treatments as RiskTreatment[] | undefined;
    const usedStrategies = new Set((existingTreatments || []).map((t) => t.strategy));

    const suggestions: Array<{ strategy: string; label: string; reasoning: string }> = [];

    const domainStrategyScores: Record<string, Array<{ strategy: string; minScore: number; maxScore: number; reasoning: string }>> = {
      cybersecurity: [
        { strategy: "mitigate", minScore: 15, maxScore: 25, reasoning: "High-score cybersecurity risks require technical controls (firewalls, EDR, IAM, encryption) to reduce likelihood and impact" },
        { strategy: "transfer", minScore: 15, maxScore: 25, reasoning: "Consider cyber insurance to transfer residual financial exposure" },
        { strategy: "mitigate", minScore: 8, maxScore: 14, reasoning: "Moderate cybersecurity risks benefit from implementing security controls and best practices" },
        { strategy: "accept", minScore: 1, maxScore: 7, reasoning: "Low-score cybersecurity risks can be accepted with monitoring, cost of controls may exceed risk" },
      ],
      financial: [
        { strategy: "mitigate", minScore: 15, maxScore: 25, reasoning: "Implement internal controls, segregation of duties, and automated monitoring systems" },
        { strategy: "transfer", minScore: 10, maxScore: 25, reasoning: "Use hedging, insurance, or derivatives to transfer financial exposure" },
        { strategy: "avoid", minScore: 15, maxScore: 25, reasoning: "Consider avoiding high-risk financial activities that exceed risk appetite" },
        { strategy: "accept", minScore: 1, maxScore: 9, reasoning: "Low-impact financial risks can be accepted as cost of doing business" },
      ],
      regulatory: [
        { strategy: "mitigate", minScore: 12, maxScore: 25, reasoning: "Implement compliance management system, document controls, and conduct regular audits" },
        { strategy: "transfer", minScore: 15, maxScore: 25, reasoning: "Engage external compliance advisors or legal counsel for specialized regulatory matters" },
        { strategy: "accept", minScore: 1, maxScore: 11, reasoning: "Low-score regulatory risks can be accepted with ongoing monitoring of regulatory changes" },
      ],
      strategic: [
        { strategy: "mitigate", minScore: 12, maxScore: 25, reasoning: "Develop contingency plans, diversify strategy, and implement governance oversight" },
        { strategy: "accept", minScore: 8, maxScore: 25, reasoning: "Strategic risks are inherent to business — accept with board-level monitoring" },
        { strategy: "avoid", minScore: 16, maxScore: 25, reasoning: "High-score strategic risks exceeding risk appetite should be avoided or restructured" },
        { strategy: "mitigate", minScore: 1, maxScore: 11, reasoning: "Low strategic risks benefit from standard monitoring and management attention" },
      ],
      operational: [
        { strategy: "mitigate", minScore: 10, maxScore: 25, reasoning: "Strengthen processes, implement redundancy, and improve operational procedures" },
        { strategy: "transfer", minScore: 12, maxScore: 25, reasoning: "Outsource or insure against operational disruptions where feasible" },
        { strategy: "accept", minScore: 1, maxScore: 9, reasoning: "Low operational risks can be accepted with standard process controls" },
      ],
    };

    const score = currentScore || 12;
    const rules = domainStrategyScores[domain] || domainStrategyScores.operational;

    for (const rule of rules) {
      if (score >= rule.minScore && score <= rule.maxScore) {
        if (!usedStrategies.has(rule.strategy) && suggestions.length < 3) {
          suggestions.push({
            strategy: rule.strategy,
            label: rule.strategy.charAt(0).toUpperCase() + rule.strategy.slice(1),
            reasoning: rule.reasoning,
          });
        }
      }
    }

    if (suggestions.length === 0) {
      suggestions.push({
        strategy: "mitigate",
        label: "Mitigate",
        reasoning: "Default recommendation — implement controls to reduce risk likelihood and/or impact",
      });
    }

    return { suggestedStrategies: suggestions };
  }
}

export const aiService = new AiService();
