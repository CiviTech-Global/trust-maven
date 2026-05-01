import { Project } from "../domain.layer/models/project/project.model";
import { User } from "../domain.layer/models/user/user.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";
export class ProjectService {
  async findAll(organizationId: string) {
    return Project.findAll({
      where: { organizationId },
      include: [
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
        { model: Risk, attributes: ["id"] },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id: string, organizationId: string) {
    const project = await Project.findOne({
      where: { id, organizationId },
      include: [
        { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] },
        { model: Risk },
      ],
    });
    if (!project) throw new Error("Project not found");
    return project;
  }

  async create(
    data: { name: string; description?: string; status?: string; startDate?: string; endDate?: string },
    organizationId: string,
    userId: string
  ) {
    const project = await Project.create({
      ...data,
      organizationId,
      ownerId: userId,
    });

    await auditService.log({
      organizationId,
      userId,
      entityType: "project",
      entityId: project.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return project;
  }

  async update(
    id: string,
    data: Partial<{ name: string; description: string; status: string; startDate: string; endDate: string }>,
    organizationId: string,
    userId: string
  ) {
    const project = await Project.findOne({ where: { id, organizationId } });
    if (!project) throw new Error("Project not found");

    await project.update(data);

    await auditService.log({
      organizationId,
      userId,
      entityType: "project",
      entityId: project.id,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return project;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const project = await Project.findOne({ where: { id, organizationId } });
    if (!project) throw new Error("Project not found");

    await project.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "project",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }
}

export const projectService = new ProjectService();
