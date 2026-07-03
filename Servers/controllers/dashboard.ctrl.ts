import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { dashboardService } from "../services/dashboard.service";
import { controllerWrapper } from "../utils/controllerWrapper";

export class DashboardController {
  getStats = controllerWrapper(
    async (req) => {
      const stats = await dashboardService.getStats(req.user!.organizationId);
      return { status: 200, data: stats };
    },
    { functionName: "getStats", eventType: "Read" }
  );

  getActivity = controllerWrapper(
    async (req) => {
      const limit = parseInt(req.query.limit as string) || 10;
      const activity = await dashboardService.getActivity(req.user!.organizationId, limit);
      return { status: 200, data: activity };
    },
    { functionName: "getActivity", eventType: "Read" }
  );

  getTrends = controllerWrapper(
    async (req) => {
      const trends = await dashboardService.getRiskTrends(req.user!.organizationId);
      return { status: 200, data: trends };
    },
    { functionName: "getTrends", eventType: "Read" }
  );

  getOverdue = controllerWrapper(
    async (req) => {
      const overdue = await dashboardService.getOverdueTreatments(req.user!.organizationId);
      return { status: 200, data: overdue };
    },
    { functionName: "getOverdue", eventType: "Read" }
  );

  getOverdueReviews = controllerWrapper(
    async (req) => {
      const overdue = await dashboardService.getOverdueReviews(req.user!.organizationId);
      return { status: 200, data: overdue };
    },
    { functionName: "getOverdueReviews", eventType: "Read" }
  );

  getRiskMatrix = controllerWrapper(
    async (req) => {
      const matrix = await dashboardService.getRiskMatrix(req.user!.organizationId);
      return { status: 200, data: matrix };
    },
    { functionName: "getRiskMatrix", eventType: "Read" }
  );
}

export const dashboardController = new DashboardController();
