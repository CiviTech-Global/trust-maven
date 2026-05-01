import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { controlMonitoringService } from "../services/controlMonitoring.service";

export class ControlMonitoringController {
  async findEventsByControl(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const events = await controlMonitoringService.findEventsByControl(req.params.id as string, req.user!.organizationId);
      res.json({ success: true, data: events });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async recordEvent(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { status, notes, evidence } = req.body;
      if (!status) {
        res.status(400).json({ success: false, message: "Status is required" });
        return;
      }
      const event = await controlMonitoringService.recordEvent(
        { controlId: req.params.id as string, status, notes, evidence },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: event });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getDashboard(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const dashboard = await controlMonitoringService.getDashboard(req.user!.organizationId);
      res.json({ success: true, data: dashboard });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getOverdue(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const controls = await controlMonitoringService.getOverdueControls(req.user!.organizationId);
      res.json({ success: true, data: controls });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getFailing(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const controls = await controlMonitoringService.getFailingControls(req.user!.organizationId);
      res.json({ success: true, data: controls });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const controlMonitoringController = new ControlMonitoringController();
