import { Risk } from "../domain.layer/models/risk/risk.model";
import { Project } from "../domain.layer/models/project/project.model";
import { RiskTreatment } from "../domain.layer/models/riskTreatment/riskTreatment.model";
import { RiskAssessment } from "../domain.layer/models/riskAssessment/riskAssessment.model";
import { User } from "../domain.layer/models/user/user.model";
import { AuditLog } from "../domain.layer/models/auditLog/auditLog.model";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export class DashboardService {
  async getStats(organizationId: string) {
    const [totalRisks, risksByDomain, risksByStatus, activeProjects, openTreatments, recentRisks] =
      await Promise.all([
        Risk.count({ where: { organizationId } }),
        Risk.findAll({
          where: { organizationId },
          attributes: [
            "domain",
            [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
          ],
          group: ["domain"],
          raw: true,
        }),
        Risk.findAll({
          where: { organizationId },
          attributes: [
            "status",
            [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
          ],
          group: ["status"],
          raw: true,
        }),
        Project.count({ where: { organizationId, status: "active" } }),
        RiskTreatment.count({
          include: [{ model: Risk, where: { organizationId }, attributes: [] }],
          where: { status: ["planned", "in_progress"] },
        }),
        Risk.findAll({
          where: { organizationId },
          include: [
            { model: RiskAssessment, order: [["assessedAt", "DESC"]], limit: 1 },
            { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
          ],
          order: [["updatedAt", "DESC"]],
          limit: 5,
        }),
      ]);

    const criticalRisks = await RiskAssessment.count({
      include: [{ model: Risk, where: { organizationId }, attributes: [] }],
      where: Sequelize.where(
        Sequelize.literal('"likelihood" * "impact"'),
        { [Op.gte]: 15 }
      ) as any,
    });

    return {
      totalRisks,
      criticalRisks,
      activeProjects,
      openTreatments,
      risksByDomain,
      risksByStatus,
      recentRisks,
    };
  }

  async getActivity(organizationId: string, limit: number = 10) {
    return AuditLog.findAll({
      where: { organizationId },
      include: [{ model: User, attributes: ["id", "firstName", "lastName"] }],
      order: [["createdAt", "DESC"]],
      limit,
    });
  }

  async getRiskTrends(organizationId: string) {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const risks = await Risk.findAll({
      where: {
        organizationId,
        createdAt: { [Op.gte]: sixMonthsAgo },
      },
      attributes: [
        [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("createdAt")), "month"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("createdAt"))],
      order: [[Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("createdAt")), "ASC"]],
      raw: true,
    });

    return risks;
  }

  async getOverdueTreatments(organizationId: string) {
    return RiskTreatment.findAll({
      where: {
        status: { [Op.ne]: "completed" },
        dueDate: { [Op.lt]: new Date() },
      },
      include: [
        {
          model: Risk,
          where: { organizationId },
          attributes: ["id", "title"],
        },
        {
          model: User,
          as: "responsible",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [["dueDate", "ASC"]],
    });
  }
  async getOverdueReviews(organizationId: string) {
    const today = new Date().toISOString().split("T")[0];
    return Risk.findAll({
      where: {
        organizationId,
        nextReviewDue: { [Op.lt]: today },
        status: { [Op.notIn]: ["closed", "accepted"] },
      },
      include: [
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["nextReviewDue", "ASC"]],
    });
  }
}

export const dashboardService = new DashboardService();
