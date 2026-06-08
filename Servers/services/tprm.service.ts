import { Op } from "sequelize";
import { Vendor } from "../domain.layer/models/vendor/vendor.model";
import { VendorAssessment } from "../domain.layer/models/vendorAssessment/vendorAssessment.model";

interface QuestionnaireItem {
  question: string;
  answer: string;
  score?: number;
  notes?: string;
  weight?: number;
}

export class TprmService {
  scoreQuestionnaire(questionnaire: QuestionnaireItem[]): { totalScore: number; maxScore: number; percentage: number; items: QuestionnaireItem[] } {
    let totalScore = 0;
    let maxScore = 0;

    const scored = questionnaire.map((item) => {
      const maxItemScore = item.weight || 10;
      const score = item.score ?? this.autoScoreAnswer(item.answer, maxItemScore);
      maxScore += maxItemScore;
      totalScore += score;
      return { ...item, score };
    });

    return {
      totalScore,
      maxScore,
      percentage: maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0,
      items: scored,
    };
  }

  private autoScoreAnswer(answer: string, maxScore: number): number {
    const lower = answer.toLowerCase();
    const positiveWords = ["yes", "implemented", "enabled", "configured", "active", "compliant", "true"];
    const negativeWords = ["no", "not implemented", "not enabled", "not configured", "inactive", "false", "none"];

    if (positiveWords.some((w) => lower.includes(w))) return maxScore;
    if (negativeWords.some((w) => lower.includes(w))) return 0;

    return maxScore / 2;
  }

  async calculateRiskScore(vendorId: string, orgId: string): Promise<{ compositeScore: number; trend: "improving" | "declining" | "stable"; assessmentCount: number }> {
    const vendor = await Vendor.findOne({ where: { id: vendorId, organizationId: orgId } });
    if (!vendor) throw new Error("Vendor not found");

    const assessments = await VendorAssessment.findAll({
      where: { vendorId, organizationId: orgId, status: "completed" },
      order: [["assessedAt", "DESC"]],
    });

    if (assessments.length === 0) {
      return { compositeScore: 0, trend: "stable", assessmentCount: 0 };
    }

    let weightedSum = 0;
    let totalWeight = 0;

    assessments.forEach((assessment, index) => {
      if (assessment.score === null || assessment.score === undefined) return;
      const recencyWeight = Math.max(1, assessments.length - index);
      weightedSum += assessment.score * recencyWeight;
      totalWeight += recencyWeight;
    });

    const compositeScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

    let trend: "improving" | "declining" | "stable" = "stable";
    if (assessments.length >= 3) {
      const recent = assessments.slice(0, 3).filter((a) => a.score !== null).map((a) => a.score as number);
      const older = assessments.slice(-3).filter((a) => a.score !== null).map((a) => a.score as number);
      const recentAvg = recent.reduce((s, v) => s + v, 0) / recent.length;
      const olderAvg = older.reduce((s, v) => s + v, 0) / older.length;
      const diff = recentAvg - olderAvg;
      trend = diff > 5 ? "improving" : diff < -5 ? "declining" : "stable";
    }

    return { compositeScore, trend, assessmentCount: assessments.length };
  }

  async getVendorRiskTrend(vendorId: string, orgId: string) {
    const vendor = await Vendor.findOne({ where: { id: vendorId, organizationId: orgId } });
    if (!vendor) throw new Error("Vendor not found");

    const assessments = await VendorAssessment.findAll({
      where: { vendorId, organizationId: orgId, status: "completed" },
      order: [["assessedAt", "ASC"]],
    });

    return assessments
      .filter((a) => a.score !== null)
      .map((a) => ({
        id: a.id,
        title: a.title,
        assessmentType: a.assessmentType,
        score: a.score,
        riskRating: a.riskRating,
        assessedAt: a.assessedAt,
      }));
  }

  generateQuestionnaire(assessmentType: string): { type: string; questions: { question: string; weight: number; category: string }[] } {
    const templates: Record<string, { question: string; weight: number; category: string }[]> = {
      security: [
        { question: "Do you have a formal information security policy?", weight: 8, category: "Policy" },
        { question: "Is multi-factor authentication enforced?", weight: 10, category: "Access Control" },
        { question: "Are regular vulnerability scans performed?", weight: 9, category: "Vulnerability Management" },
        { question: "Is data encrypted at rest and in transit?", weight: 10, category: "Encryption" },
        { question: "Do you have an incident response plan?", weight: 8, category: "Incident Response" },
        { question: "Are background checks performed on employees?", weight: 5, category: "HR Security" },
        { question: "Is access reviewed quarterly?", weight: 7, category: "Access Control" },
        { question: "Do you have a business continuity plan?", weight: 7, category: "BCP" },
        { question: "Are third-party vendors assessed for security?", weight: 6, category: "Vendor Management" },
        { question: "Is logging and monitoring implemented?", weight: 8, category: "Monitoring" },
      ],
      privacy: [
        { question: "Do you have a data privacy policy?", weight: 10, category: "Privacy Policy" },
        { question: "Is personal data collected only with consent?", weight: 10, category: "Data Collection" },
        { question: "Do you have a data retention schedule?", weight: 7, category: "Data Retention" },
        { question: "Is data shared with sub-processors disclosed?", weight: 8, category: "Data Sharing" },
        { question: "Are data subject rights (deletion, portability) supported?", weight: 9, category: "Data Subject Rights" },
      ],
      compliance: [
        { question: "Do you comply with SOC 2 Type II?", weight: 9, category: "Compliance Standard" },
        { question: "Do you have ISO 27001 certification?", weight: 9, category: "Certification" },
        { question: "Are compliance audits performed annually?", weight: 8, category: "Audit" },
        { question: "Is there a compliance monitoring program?", weight: 7, category: "Monitoring" },
      ],
      operational: [
        { question: "What is your system uptime SLA?", weight: 8, category: "Availability" },
        { question: "Do you have disaster recovery procedures?", weight: 9, category: "DR" },
        { question: "Are changes managed through a formal process?", weight: 8, category: "Change Management" },
        { question: "Do you have a capacity management plan?", weight: 5, category: "Capacity" },
      ],
      financial: [
        { question: "Have you had a financial audit in the last 12 months?", weight: 9, category: "Financial Audit" },
        { question: "Is cyber insurance in place?", weight: 7, category: "Insurance" },
        { question: "What is your revenue trend over the last 3 years?", weight: 6, category: "Financial Health" },
      ],
    };

    const questions = templates[assessmentType] || templates.security;
    return { type: assessmentType, questions };
  }

  async getOverdueAssessments(orgId: string) {
    const today = new Date().toISOString().split("T")[0];

    const overdue = await VendorAssessment.findAll({
      where: {
        organizationId: orgId,
        nextReviewDate: { [Op.lt]: today },
        status: "completed",
      },
      include: [{ model: Vendor, attributes: ["id", "name", "riskLevel"] }],
      order: [["nextReviewDate", "ASC"]],
    });

    return overdue.map((a) => ({
      id: a.id,
      vendorId: a.vendorId,
      vendorName: (a as any).vendor?.name || "Unknown",
      title: a.title,
      assessmentType: a.assessmentType,
      score: a.score,
      riskRating: a.riskRating,
      nextReviewDate: a.nextReviewDate,
      daysOverdue: Math.max(0, Math.floor((Date.now() - new Date(a.nextReviewDate!).getTime()) / (1000 * 60 * 60 * 24))),
    }));
  }
}

export const tprmService = new TprmService();
