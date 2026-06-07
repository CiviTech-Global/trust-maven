import { Notification } from "../domain.layer/models/notification/notification.model";
import { User } from "../domain.layer/models/user/user.model";
import { emailService } from "./email.service";
import { logger } from "../utils/logger";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

export class NotificationService {
  async create(userId: string, data: {
    title: string;
    message: string;
    type?: string;
    relatedEntityType?: string;
    relatedEntityId?: string;
  }) {
    const notification = await Notification.create({
      userId,
      title: data.title,
      message: data.message,
      type: data.type || "info",
      relatedEntityType: data.relatedEntityType || null,
      relatedEntityId: data.relatedEntityId || null,
    });

    // Send email in background if configured
    if (emailService.isConfigured()) {
      this.sendEmailNotification(userId, data).catch((err) =>
        logger.error(`Email notification failed for user ${userId}: ${err.message}`)
      );
    }

    return notification;
  }

  private async sendEmailNotification(userId: string, data: {
    title: string;
    message: string;
    type?: string;
    relatedEntityType?: string;
    relatedEntityId?: string;
  }) {
    const user = await User.findByPk(userId, { attributes: ["id", "email", "firstName"] });
    if (!user || !user.email) return;

    const entityUrl = data.relatedEntityType && data.relatedEntityId
      ? `${CLIENT_URL}/${data.relatedEntityType}s/${data.relatedEntityId}`
      : CLIENT_URL;

    const text = emailService.generateText(data.type || "info", {
      entity: data.title,
      message: data.message,
      url: entityUrl,
    });

    await emailService.send({
      to: user.email,
      subject: `[TrustMaven] ${data.title}`,
      text,
      html: `<h2>${data.title}</h2><p>${data.message}</p><p><a href="${entityUrl}">View in TrustMaven</a></p>`,
    });
  }

  async findAll(userId: string, options?: { page?: number; limit?: number }) {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const offset = (page - 1) * limit;

    const { rows, count } = await Notification.findAndCountAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return {
      notifications: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async findUnread(userId: string) {
    return Notification.findAll({
      where: { userId, isRead: false },
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
  }

  async getUnreadCount(userId: string) {
    return Notification.count({
      where: { userId, isRead: false },
    });
  }

  async markAsRead(id: string, userId: string) {
    const notification = await Notification.findOne({ where: { id, userId } });
    if (!notification) throw new Error("Notification not found");
    await notification.update({ isRead: true });
    return notification;
  }

  async markAllAsRead(userId: string) {
    await Notification.update({ isRead: true }, { where: { userId, isRead: false } });
  }
}

export const notificationService = new NotificationService();
