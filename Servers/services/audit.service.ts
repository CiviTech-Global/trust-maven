import { Op } from "sequelize";
import { AuditLog } from "../domain.layer/models/auditLog/auditLog.model";
import { User } from "../domain.layer/models/user/user.model";
import { AuditAction } from "../types";

export class AuditService {
  async log(data: {
    organizationId: string;
    userId: string;
    entityType: string;
    entityId: string;
    action: AuditAction;
    changes?: Record<string, unknown>;
    ipAddress?: string;
  }) {
    return AuditLog.create({
      organizationId: data.organizationId,
      userId: data.userId,
      entityType: data.entityType,
      entityId: data.entityId,
      action: data.action,
      changes: data.changes || {},
      ipAddress: data.ipAddress || null,
    });
  }

  async getRecent(organizationId: string, limit: number = 20) {
    return AuditLog.findAll({
      where: { organizationId },
      include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }],
      order: [["createdAt", "DESC"]],
      limit,
    });
  }

  async findAll(
    organizationId: string,
    filters?: {
      entityType?: string;
      entityId?: string;
      userId?: string;
      from?: string;
      to?: string;
      page?: number;
      limit?: number;
    }
  ) {
    const where: any = { organizationId };

    if (filters?.entityType) where.entityType = filters.entityType;
    if (filters?.entityId) where.entityId = filters.entityId;
    if (filters?.userId) where.userId = filters.userId;
    if (filters?.from || filters?.to) {
      where.createdAt = {};
      if (filters.from) where.createdAt[Op.gte] = new Date(filters.from);
      if (filters.to) where.createdAt[Op.lte] = new Date(filters.to);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 50;
    const offset = (page - 1) * limit;

    const { rows, count } = await AuditLog.findAndCountAll({
      where,
      include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return {
      logs: rows,
      pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) },
    };
  }

  async findByEntity(entityType: string, entityId: string, organizationId: string) {
    return AuditLog.findAll({
      where: { organizationId, entityType, entityId },
      include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }],
      order: [["createdAt", "DESC"]],
    });
  }
}

export const auditService = new AuditService();
