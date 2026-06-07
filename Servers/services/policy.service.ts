import { Op, WhereOptions } from "sequelize";
import { Policy } from "../domain.layer/models/policy/policy.model";
import { User } from "../domain.layer/models/user/user.model";
import { auditService } from "./audit.service";
import { notificationService } from "./notification.service";
import { AuditAction } from "../types";

export class PolicyService {
  async findAll(
    organizationId: string,
    filters?: { status?: string; search?: string }
  ) {
    const where: WhereOptions = { organizationId } as any;

    if (filters?.status) (where as any).status = filters.status;
    if (filters?.search) {
      (where as any).title = { [Op.iLike]: `%${filters.search}%` };
    }

    return Policy.findAll({
      where,
      include: [
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["updatedAt", "DESC"]],
    });
  }

  async findById(id: string, organizationId: string) {
    const policy = await Policy.findOne({
      where: { id, organizationId },
      include: [
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
      ],
    });
    if (!policy) throw new Error("Policy not found");
    return policy;
  }

  async create(
    data: { title: string; content?: string; version?: string; status?: string; ownerId?: string },
    organizationId: string,
    userId: string
  ) {
    const policy = await Policy.create({
      ...data,
      organizationId,
      ownerId: data.ownerId || userId,
    });

    await auditService.log({
      organizationId,
      userId,
      entityType: "policy",
      entityId: policy.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return policy;
  }

  async update(
    id: string,
    data: Partial<{ title: string; content: string; version: string; status: string; ownerId: string; approvedAt: string }>,
    organizationId: string,
    userId: string
  ) {
    const policy = await Policy.findOne({ where: { id, organizationId } });
    if (!policy) throw new Error("Policy not found");

    const wasApproved = data.status === "approved" && policy.status !== "approved";
    await policy.update(data);

    await auditService.log({
      organizationId,
      userId,
      entityType: "policy",
      entityId: policy.id,
      action: AuditAction.UPDATE,
      changes: data,
    });

    if (wasApproved && policy.ownerId && policy.ownerId !== userId) {
      await notificationService.create(policy.ownerId, {
        title: "Policy Approved",
        message: `Policy "${policy.title}" has been approved`,
        type: "policy_approved",
        relatedEntityType: "policy",
        relatedEntityId: policy.id,
      });
    }

    return policy;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const policy = await Policy.findOne({ where: { id, organizationId } });
    if (!policy) throw new Error("Policy not found");

    await policy.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "policy",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }
}

export const policyService = new PolicyService();
