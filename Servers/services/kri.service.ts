import { Op, WhereOptions } from "sequelize";
import { KRI } from "../domain.layer/models/kri/kri.model";
import { KriHistory } from "../domain.layer/models/kriHistory/kriHistory.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { User } from "../domain.layer/models/user/user.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class KRIService {
  async findAll(
    organizationId: string,
    filters?: { category?: string; status?: string; riskId?: string; search?: string; page?: number; limit?: number }
  ) {
    const where: WhereOptions = { organizationId } as any;

    if (filters?.category) (where as any).category = filters.category;
    if (filters?.riskId) (where as any).riskId = filters.riskId;
    if (filters?.search) {
      (where as any).name = { [Op.iLike]: `%${filters.search}%` };
    }

    const page = filters?.page || 1;
    const limit = Math.min(filters?.limit || 50, 100);
    const offset = (page - 1) * limit;

    const { rows, count } = await KRI.findAndCountAll({
      where,
      include: [
        { model: Risk, attributes: ["id", "title", "domain"] },
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    // Filter by computed status if requested
    let items = rows;
    if (filters?.status) {
      items = rows.filter((k) => k.status === filters.status);
    }

    return {
      kris: items,
      pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) },
    };
  }

  async findById(id: string, organizationId: string) {
    const kri = await KRI.findOne({
      where: { id, organizationId },
      include: [
        { model: Risk, attributes: ["id", "title", "domain"] },
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
      ],
    });
    if (!kri) throw new Error("KRI not found");
    return kri;
  }

  async create(
    data: {
      name: string;
      description?: string;
      category: string;
      currentValue: number;
      thresholdGreen: number;
      thresholdAmber: number;
      thresholdRed: number;
      direction?: string;
      unit?: string;
      frequency?: string;
      riskId?: string;
      ownerId?: string;
    },
    organizationId: string,
    userId: string
  ) {
    const kri = await KRI.create({
      ...data,
      organizationId,
      ownerId: data.ownerId || userId,
      lastUpdatedValue: new Date().toISOString().split("T")[0],
    });

    await KriHistory.create({ kriId: kri.id, value: data.currentValue });

    await auditService.log({
      organizationId,
      userId,
      entityType: "kri",
      entityId: kri.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return kri;
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      category: string;
      currentValue: number;
      thresholdGreen: number;
      thresholdAmber: number;
      thresholdRed: number;
      direction: string;
      unit: string;
      frequency: string;
      riskId: string;
      ownerId: string;
    }>,
    organizationId: string,
    userId: string
  ) {
    const kri = await KRI.findOne({ where: { id, organizationId } });
    if (!kri) throw new Error("KRI not found");

    // Track if value changed for lastUpdatedValue
    const updateData: any = { ...data };
    if (data.currentValue !== undefined && data.currentValue !== kri.currentValue) {
      updateData.lastUpdatedValue = new Date().toISOString().split("T")[0];
      await KriHistory.create({ kriId: id, value: data.currentValue });
    }

    await kri.update(updateData);

    await auditService.log({
      organizationId,
      userId,
      entityType: "kri",
      entityId: kri.id,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return kri;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const kri = await KRI.findOne({ where: { id, organizationId } });
    if (!kri) throw new Error("KRI not found");

    await kri.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "kri",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }

  async getBreachedKRIs(organizationId: string) {
    const result = await this.findAll(organizationId);
    return result.kris.filter((k) => k.status === "red" || k.status === "amber");
  }

  async getHistory(kriId: string, organizationId: string) {
    const kri = await KRI.findOne({ where: { id: kriId, organizationId } });
    if (!kri) throw new Error("KRI not found");
    return KriHistory.findAll({
      where: { kriId },
      order: [["recordedAt", "ASC"]],
    });
  }

  async getSummary(organizationId: string) {
    const result = await this.findAll(organizationId);
    const summary = { total: result.kris.length, green: 0, amber: 0, red: 0 };
    for (const kri of result.kris) {
      if (kri.status === "green") summary.green++;
      else if (kri.status === "amber") summary.amber++;
      else summary.red++;
    }
    return summary;
  }
}

export const kriService = new KRIService();
