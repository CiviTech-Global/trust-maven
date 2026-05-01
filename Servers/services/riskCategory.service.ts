import { RiskCategory } from "../domain.layer/models/riskCategory/riskCategory.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

interface CategoryNode {
  id: string;
  name: string;
  description: string | null;
  code: string | null;
  level: number;
  sortOrder: number;
  isActive: boolean;
  parentId: string | null;
  children: CategoryNode[];
}

const DEFAULT_CATEGORIES = [
  {
    name: "Financial", code: "FIN", children: [
      { name: "Credit", code: "FIN-CRD" },
      { name: "Market", code: "FIN-MKT" },
      { name: "Liquidity", code: "FIN-LIQ" },
      { name: "Budget", code: "FIN-BDG" },
    ],
  },
  {
    name: "Cybersecurity", code: "CYB", children: [
      { name: "Threats", code: "CYB-THR" },
      { name: "Vulnerabilities", code: "CYB-VUL" },
      { name: "Data Breach", code: "CYB-DBR" },
      { name: "Supply Chain", code: "CYB-SCH" },
    ],
  },
  {
    name: "Strategic", code: "STR", children: [
      { name: "Competitive", code: "STR-CMP" },
      { name: "M&A", code: "STR-MA" },
      { name: "Reputation", code: "STR-REP" },
      { name: "Innovation", code: "STR-INN" },
    ],
  },
  {
    name: "Operational", code: "OPS", children: [
      { name: "Process", code: "OPS-PRC" },
      { name: "People", code: "OPS-PPL" },
      { name: "Technology", code: "OPS-TEC" },
      { name: "BCP", code: "OPS-BCP" },
    ],
  },
  {
    name: "Regulatory", code: "REG", children: [
      { name: "Compliance", code: "REG-CMP" },
      { name: "Legal", code: "REG-LGL" },
      { name: "Privacy", code: "REG-PRV" },
      { name: "Reporting", code: "REG-RPT" },
    ],
  },
];

export class RiskCategoryService {
  async findAll(organizationId: string) {
    return RiskCategory.findAll({
      where: { organizationId },
      order: [["sortOrder", "ASC"], ["name", "ASC"]],
    });
  }

  async findTree(organizationId: string): Promise<CategoryNode[]> {
    const categories = await RiskCategory.findAll({
      where: { organizationId },
      order: [["level", "ASC"], ["sortOrder", "ASC"], ["name", "ASC"]],
    });

    const map = new Map<string, CategoryNode>();
    const roots: CategoryNode[] = [];

    for (const cat of categories) {
      const node: CategoryNode = {
        id: cat.id,
        name: cat.name,
        description: cat.description,
        code: cat.code,
        level: cat.level,
        sortOrder: cat.sortOrder,
        isActive: cat.isActive,
        parentId: cat.parentId,
        children: [],
      };
      map.set(cat.id, node);
    }

    for (const node of map.values()) {
      if (node.parentId && map.has(node.parentId)) {
        map.get(node.parentId)!.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }

  async findById(id: string, organizationId: string) {
    const category = await RiskCategory.findOne({
      where: { id, organizationId },
      include: [{ model: RiskCategory, as: "children" }],
    });
    if (!category) throw new Error("Risk category not found");
    return category;
  }

  async create(
    data: { name: string; description?: string; parentId?: string; code?: string; sortOrder?: number },
    organizationId: string,
    userId: string
  ) {
    let level = 0;
    if (data.parentId) {
      const parent = await RiskCategory.findOne({ where: { id: data.parentId, organizationId } });
      if (!parent) throw new Error("Parent category not found");
      level = parent.level + 1;
    }

    const category = await RiskCategory.create({
      ...data,
      organizationId,
      level,
    });

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_category",
      entityId: category.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return category;
  }

  async update(
    id: string,
    data: Partial<{ name: string; description: string; code: string; sortOrder: number; isActive: boolean }>,
    organizationId: string,
    userId: string
  ) {
    const category = await RiskCategory.findOne({ where: { id, organizationId } });
    if (!category) throw new Error("Risk category not found");

    await category.update(data);

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_category",
      entityId: id,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return category;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const category = await RiskCategory.findOne({ where: { id, organizationId } });
    if (!category) throw new Error("Risk category not found");

    const childCount = await RiskCategory.count({ where: { parentId: id, organizationId } });
    if (childCount > 0) throw new Error("Cannot delete category with children");

    const riskCount = await Risk.count({ where: { categoryId: id } as any });
    if (riskCount > 0) throw new Error("Cannot delete category with linked risks");

    await category.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "risk_category",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }

  async seedDefaults(organizationId: string, userId: string, isDemoData = false) {
    const existing = await RiskCategory.count({ where: { organizationId } });
    if (existing > 0) return { message: "Categories already exist" };

    const created: RiskCategory[] = [];

    for (let i = 0; i < DEFAULT_CATEGORIES.length; i++) {
      const def = DEFAULT_CATEGORIES[i];
      const parent = await RiskCategory.create({
        name: def.name,
        code: def.code,
        organizationId,
        level: 0,
        sortOrder: i,
        isDemoData,
      });
      created.push(parent);

      for (let j = 0; j < def.children.length; j++) {
        const child = def.children[j];
        const childCat = await RiskCategory.create({
          name: child.name,
          code: child.code,
          organizationId,
          parentId: parent.id,
          level: 1,
          sortOrder: j,
          isDemoData,
        });
        created.push(childCat);
      }
    }

    return { created: created.length };
  }
}

export const riskCategoryService = new RiskCategoryService();
