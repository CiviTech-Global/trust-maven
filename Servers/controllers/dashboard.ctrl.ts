import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { dashboardService } from "../services/dashboard.service";

export class DashboardController {
  async getStats(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const stats = await dashboardService.getStats(req.user!.organizationId);
      res.json({ success: true, data: stats });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getActivity(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const activity = await dashboardService.getActivity(req.user!.organizationId, limit);
      res.json({ success: true, data: activity });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getTrends(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const trends = await dashboardService.getRiskTrends(req.user!.organizationId);
      res.json({ success: true, data: trends });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getOverdue(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const overdue = await dashboardService.getOverdueTreatments(req.user!.organizationId);
      res.json({ success: true, data: overdue });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const dashboardController = new DashboardController();
