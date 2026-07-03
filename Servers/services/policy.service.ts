import { Op, WhereOptions } from "sequelize";
import { Policy } from "../domain.layer/models/policy/policy.model";
import { User } from "../domain.layer/models/user/user.model";
import { Role } from "../domain.layer/models/role/role.model";
import { auditService } from "./audit.service";
import { notificationService } from "./notification.service";
import { workflowEngineService } from "./workflowEngine.service";
import { AuditAction, UserRole } from "../types";

const VALID_TRANSITIONS: Record<string, string[]> = {
  draft: ["review"],
  review: ["approved", "draft"],
  approved: ["retired", "draft"],
  retired: [],
};

export class PolicyService {
  async validateTransition(currentStatus: string, newStatus: string, organizationId?: string): Promise<boolean> {
    if (organizationId) {
      const workflow = await workflowEngineService.getWorkflow(organizationId, "policy");
      if (workflow) {
        const allowed = workflow.transitions
          .filter((t) => t.from === currentStatus)
          .map((t) => t.to);
        return allowed.includes(newStatus);
      }
    }
    const allowed = VALID_TRANSITIONS[currentStatus];
    if (!allowed) return false;
    return allowed.includes(newStatus);
  }

  private getAuditActionForTransition(
    from: string,
    to: string
  ): AuditAction {
    if (from === "draft" && to === "review") return AuditAction.SUBMIT;
    if (from === "review" && to === "approved") return AuditAction.APPROVE;
    if (from === "review" && to === "draft") return AuditAction.REJECT;
    return AuditAction.UPDATE;
  }

  async findAll(
    organizationId: string,
    filters?: { status?: string; search?: string; page?: number; limit?: number }
  ) {
    const where: WhereOptions = { organizationId } as any;

    if (filters?.status) (where as any).status = filters.status;
    if (filters?.search) {
      (where as any).title = { [Op.iLike]: `%${filters.search}%` };
    }

    const page = filters?.page || 1;
    const limit = Math.min(filters?.limit || 50, 100);
    const offset = (page - 1) * limit;

    const { rows, count } = await Policy.findAndCountAll({
      where,
      include: [
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["updatedAt", "DESC"]],
      limit,
      offset,
    });

    return {
      policies: rows,
      pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) },
    };
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
    data: Partial<{ title: string; content: string; version: string; status: string; ownerId: string }>,
    organizationId: string,
    userId: string,
    comment?: string
  ) {
    const policy = await Policy.findOne({ where: { id, organizationId } });
    if (!policy) throw new Error("Policy not found");

    const oldStatus = policy.status;
    const updateData: any = { ...data };

    if (data.status && data.status !== oldStatus) {
      if (!(await this.validateTransition(oldStatus, data.status, organizationId))) {
        throw new Error(
          `Invalid status transition from ${oldStatus} to ${data.status}`
        );
      }

      const workflow = await workflowEngineService.getWorkflow(organizationId, "policy");
      if (workflow) {
        await workflowEngineService.executeTransition(
          workflow.id,
          "policy",
          policy.id,
          oldStatus,
          data.status,
          userId,
          organizationId,
          comment
        );
      }

      const historyEntry = {
        from: oldStatus,
        to: data.status,
        changedBy: userId,
        changedAt: new Date(),
        comment: comment || null,
      };

      const currentHistory = (policy.changeHistory as any[]) || [];
      updateData.changeHistory = [...currentHistory, historyEntry];

      if (data.status === "review") {
        updateData.submittedAt = new Date();
      } else if (oldStatus === "review" && data.status === "approved") {
        updateData.approvedAt = new Date();
      } else if (oldStatus === "approved" && data.status === "retired") {
        updateData.retiredAt = new Date();
      }
    }

    await policy.update(updateData);

    const auditAction =
      data.status && data.status !== oldStatus
        ? this.getAuditActionForTransition(oldStatus, data.status)
        : AuditAction.UPDATE;

    await auditService.log({
      organizationId,
      userId,
      entityType: "policy",
      entityId: policy.id,
      action: auditAction,
      changes: data,
    });

    if (data.status === "review" && oldStatus !== "review") {
      const reviewerRoles = await Role.findAll({
        where: {
          name: { [Op.in]: [UserRole.ADMIN, UserRole.RISK_MANAGER] },
        },
      });
      const roleIds = reviewerRoles.map((r) => r.id);
      const reviewers = await User.findAll({
        where: { organizationId, roleId: { [Op.in]: roleIds } },
      });
      for (const reviewer of reviewers) {
        await notificationService.create(reviewer.id, {
          title: "Policy Submitted for Review",
          message: `Policy "${policy.title}" has been submitted for review`,
          type: "policy_review",
          relatedEntityType: "policy",
          relatedEntityId: policy.id,
        });
      }
    }

    if (oldStatus === "review" && data.status === "approved" && policy.ownerId && policy.ownerId !== userId) {
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
