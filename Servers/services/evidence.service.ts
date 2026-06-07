import { Op, WhereOptions } from "sequelize";
import { Evidence } from "../domain.layer/models/evidence/evidence.model";
import { User } from "../domain.layer/models/user/user.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class EvidenceService {
  async findAll(organizationId: string, filters?: { entityType?: string; entityId?: string; status?: string; search?: string }) {
    const where: WhereOptions = { organizationId } as any;
    if (filters?.entityType) (where as any).entityType = filters.entityType;
    if (filters?.entityId) (where as any).entityId = filters.entityId;
    if (filters?.status) (where as any).status = filters.status;
    if (filters?.search) {
      (where as any).title = { [Op.iLike]: `%${filters.search}%` };
    }

    return Evidence.findAll({
      where,
      include: [{ model: User, as: "uploadedBy", attributes: ["id", "firstName", "lastName", "email"] }],
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id: string, organizationId: string) {
    const evidence = await Evidence.findOne({
      where: { id, organizationId },
      include: [{ model: User, as: "uploadedBy", attributes: ["id", "firstName", "lastName", "email"] }],
    });
    if (!evidence) throw new Error("Evidence not found");
    return evidence;
  }

  async create(
    data: {
      title: string;
      entityType: string;
      entityId: string;
      description?: string;
      filePath?: string;
      fileType?: string;
      status?: string;
      notes?: string;
    },
    organizationId: string,
    userId: string
  ) {
    const evidence = await Evidence.create({ ...data, organizationId, uploadedById: userId });
    await auditService.log({ organizationId, userId, entityType: "evidence", entityId: evidence.id, action: AuditAction.CREATE });
    return evidence;
  }

  async update(
    id: string,
    data: Partial<{ title: string; description: string; status: string; notes: string; filePath: string; fileType: string }>,
    organizationId: string,
    userId: string
  ) {
    const evidence = await Evidence.findOne({ where: { id, organizationId } });
    if (!evidence) throw new Error("Evidence not found");
    await evidence.update(data);
    await auditService.log({ organizationId, userId, entityType: "evidence", entityId: id, action: AuditAction.UPDATE });
    return evidence;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const evidence = await Evidence.findOne({ where: { id, organizationId } });
    if (!evidence) throw new Error("Evidence not found");
    await evidence.destroy();
    await auditService.log({ organizationId, userId, entityType: "evidence", entityId: id, action: AuditAction.DELETE });
  }

  async getSummary(organizationId: string) {
    const all = await this.findAll(organizationId);
    return {
      total: all.length,
      draft: all.filter((e) => e.status === "draft").length,
      submitted: all.filter((e) => e.status === "submitted").length,
      approved: all.filter((e) => e.status === "approved").length,
      rejected: all.filter((e) => e.status === "rejected").length,
    };
  }
}

export const evidenceService = new EvidenceService();
