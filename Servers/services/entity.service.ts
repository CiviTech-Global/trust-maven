import { Op } from "sequelize";
import { Entity } from "../domain.layer/models/entity/entity.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class EntityService {
  async findAll(orgId: string, parentId?: string | null) {
    const where: Record<string, unknown> = { organizationId: orgId };
    if (parentId !== undefined) where.parentId = parentId || null;
    return Entity.findAll({ where, order: [["name", "ASC"]] });
  }

  async findById(id: string, orgId: string) {
    const entity = await Entity.findOne({ where: { id, organizationId: orgId } });
    if (!entity) throw new Error("Entity not found");
    return entity;
  }

  async create(data: { name: string; type: string; parentId?: string; attributes?: Record<string, unknown>; riskScore?: number }, orgId: string, userId: string) {
    if (data.parentId) {
      const parent = await Entity.findOne({ where: { id: data.parentId, organizationId: orgId } });
      if (!parent) throw new Error("Parent entity not found");
    }

    const entity = await Entity.create({
      organizationId: orgId,
      name: data.name,
      type: data.type,
      parentId: data.parentId || null,
      attributes: data.attributes || null,
      riskScore: data.riskScore || null,
    });

    await auditService.log({
      organizationId: orgId,
      userId,
      entityType: "entity",
      entityId: entity.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return entity;
  }

  async update(id: string, data: Partial<{ name: string; type: string; parentId: string | null; attributes: Record<string, unknown>; riskScore: number; isActive: boolean }>, orgId: string, userId: string) {
    const entity = await Entity.findOne({ where: { id, organizationId: orgId } });
    if (!entity) throw new Error("Entity not found");

    if (data.parentId) {
      const parent = await Entity.findOne({ where: { id: data.parentId, organizationId: orgId } });
      if (!parent) throw new Error("Parent entity not found");
    }

    const changedFields: Record<string, unknown> = {};
    if (data.name !== undefined) changedFields.name = data.name;
    if (data.type !== undefined) changedFields.type = data.type;
    if (data.parentId !== undefined) changedFields.parentId = data.parentId;
    if (data.attributes !== undefined) changedFields.attributes = data.attributes;
    if (data.riskScore !== undefined) changedFields.riskScore = data.riskScore;
    if (data.isActive !== undefined) changedFields.isActive = data.isActive;

    await entity.update(changedFields);

    await auditService.log({
      organizationId: orgId,
      userId,
      entityType: "entity",
      entityId: id,
      action: AuditAction.UPDATE,
      changes: changedFields,
    });

    return entity;
  }

  async delete(id: string, orgId: string, userId: string) {
    const entity = await Entity.findOne({ where: { id, organizationId: orgId } });
    if (!entity) throw new Error("Entity not found");

    await Entity.update({ parentId: null }, { where: { parentId: id, organizationId: orgId } });
    await entity.destroy();

    await auditService.log({
      organizationId: orgId,
      userId,
      entityType: "entity",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }

  async getTree(orgId: string, parentId?: string | null): Promise<Record<string, unknown>[]> {
    const where: Record<string, unknown> = { organizationId: orgId };
    if (parentId !== undefined) where.parentId = parentId || null;
    else where.parentId = null;

    const roots = await Entity.findAll({ where, order: [["name", "ASC"]] });
    const tree: Record<string, unknown>[] = [];

    for (const root of roots) {
      tree.push(await this.buildSubTree(root));
    }

    return tree;
  }

  private async buildSubTree(entity: Entity): Promise<Record<string, unknown>> {
    const children = await Entity.findAll({
      where: { parentId: entity.id, organizationId: entity.organizationId },
      order: [["name", "ASC"]],
    });

    const subTree: Record<string, unknown> = {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      parentId: entity.parentId,
      attributes: entity.attributes,
      riskScore: entity.riskScore,
      isActive: entity.isActive,
      children: [],
    };

    for (const child of children) {
      (subTree.children as Record<string, unknown>[]).push(await this.buildSubTree(child));
    }

    return subTree;
  }

  async getAncestors(entityId: string, orgId: string) {
    const entity = await Entity.findOne({ where: { id: entityId, organizationId: orgId } });
    if (!entity) throw new Error("Entity not found");

    const ancestors: Record<string, unknown>[] = [];
    let current = entity;

    while (current.parentId) {
      const parent = await Entity.findOne({ where: { id: current.parentId, organizationId: orgId } });
      if (!parent) break;
      ancestors.unshift({ id: parent.id, name: parent.name, type: parent.type });
      current = parent;
    }

    return ancestors;
  }

  async rollupScore(entityId: string, orgId: string) {
    const entity = await Entity.findOne({ where: { id: entityId, organizationId: orgId } });
    if (!entity) throw new Error("Entity not found");

    const children = await Entity.findAll({ where: { parentId: entityId, organizationId: orgId } });

    if (children.length === 0) {
      return { score: entity.riskScore, source: "self" };
    }

    const childScores = children.map((c) => c.riskScore).filter((s): s is number => s !== null);
    if (childScores.length === 0) {
      return { score: entity.riskScore, source: "self" };
    }

    const average = Math.round((childScores.reduce((sum, s) => sum + s, 0) / childScores.length) * 100) / 100;
    await entity.update({ riskScore: average });

    return { score: average, source: "children_rollup", childrenCount: childScores.length };
  }

  async linkRisk(entityId: string, riskId: string, orgId: string) {
    const entity = await Entity.findOne({ where: { id: entityId, organizationId: orgId } });
    if (!entity) throw new Error("Entity not found");

    const risk = await Risk.findOne({ where: { id: riskId, organizationId: orgId } });
    if (!risk) throw new Error("Risk not found");

    const attrs = entity.attributes || {};
    const linkedRiskIds: string[] = (attrs.linkedRiskIds as string[]) || [];
    if (!linkedRiskIds.includes(riskId)) {
      linkedRiskIds.push(riskId);
      await entity.update({ attributes: { ...attrs, linkedRiskIds } });
    }

    return entity;
  }

  async getLinkedRisks(entityId: string, orgId: string) {
    const entity = await Entity.findOne({ where: { id: entityId, organizationId: orgId } });
    if (!entity) throw new Error("Entity not found");

    const collectedRiskIds = new Set<string>();
    await this.collectRiskIds(entity, collectedRiskIds);

    const riskIds = Array.from(collectedRiskIds);
    if (riskIds.length === 0) return [];

    return Risk.findAll({
      where: { id: { [Op.in]: riskIds }, organizationId: orgId },
    });
  }

  private async collectRiskIds(entity: Entity, ids: Set<string>): Promise<void> {
    const attrs = entity.attributes || {};
    const linkedRiskIds: string[] = (attrs.linkedRiskIds as string[]) || [];
    linkedRiskIds.forEach((id) => ids.add(id));

    const children = await Entity.findAll({
      where: { parentId: entity.id, organizationId: entity.organizationId },
    });

    for (const child of children) {
      await this.collectRiskIds(child, ids);
    }
  }
}

export const entityService = new EntityService();
