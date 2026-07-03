import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { notificationService } from "../services/notification.service";
import { controllerWrapper } from "../utils/controllerWrapper";

export class NotificationController {
  findAll = controllerWrapper(
    async (req) => {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const result = await notificationService.findAll(req.user!.userId, { page, limit });
      return { status: 200, data: { notifications: result.notifications, pagination: result.pagination } };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findUnread = controllerWrapper(
    async (req) => {
      const notifications = await notificationService.findUnread(req.user!.userId);
      return { status: 200, data: notifications };
    },
    { functionName: "findUnread", eventType: "Read" }
  );

  getUnreadCount = controllerWrapper(
    async (req) => {
      const count = await notificationService.getUnreadCount(req.user!.userId);
      return { status: 200, data: { count } };
    },
    { functionName: "getUnreadCount", eventType: "Read" }
  );

  markAsRead = controllerWrapper(
    async (req) => {
      const id = req.params.id as string;
      await notificationService.markAsRead(id, req.user!.userId);
      return { status: 200, message: "Notification marked as read" };
    },
    { functionName: "markAsRead", eventType: "Update" }
  );

  markAllAsRead = controllerWrapper(
    async (req) => {
      await notificationService.markAllAsRead(req.user!.userId);
      return { status: 200, message: "All notifications marked as read" };
    },
    { functionName: "markAllAsRead", eventType: "Update" }
  );
}

export const notificationController = new NotificationController();
