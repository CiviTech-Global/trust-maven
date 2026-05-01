import { Notification } from "../domain.layer/models/notification/notification.model";

export class NotificationService {
  async create(userId: string, data: {
    title: string;
    message: string;
    type?: string;
    relatedEntityType?: string;
    relatedEntityId?: string;
  }) {
    return Notification.create({
      userId,
      title: data.title,
      message: data.message,
      type: data.type || "info",
      relatedEntityType: data.relatedEntityType || null,
      relatedEntityId: data.relatedEntityId || null,
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
