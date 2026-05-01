import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { notificationService } from "../services/notification.service";

export class NotificationController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const result = await notificationService.findAll(req.user!.userId, { page, limit });
      res.json({ success: true, data: result.notifications, pagination: result.pagination });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findUnread(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const notifications = await notificationService.findUnread(req.user!.userId);
      res.json({ success: true, data: notifications });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getUnreadCount(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const count = await notificationService.getUnreadCount(req.user!.userId);
      res.json({ success: true, data: { count } });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async markAsRead(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await notificationService.markAsRead(id, req.user!.userId);
      res.json({ success: true, message: "Notification marked as read" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async markAllAsRead(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await notificationService.markAllAsRead(req.user!.userId);
      res.json({ success: true, message: "All notifications marked as read" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const notificationController = new NotificationController();
