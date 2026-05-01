import { Op, WhereOptions } from "sequelize";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { Control } from "../domain.layer/models/control/control.model";
import { Audit } from "../domain.layer/models/audit/audit.model";
import { Vendor } from "../domain.layer/models/vendor/vendor.model";
import { KRI } from "../domain.layer/models/kri/kri.model";

const ENTITY_SCHEMAS: Record<string, { model: any; fields: { field: string; label: string; type: string }[] }> = {
  risk: {
    model: Risk,
    fields: [
      { field: "id", label: "ID", type: "string" },
      { field: "title", label: "Title", type: "string" },
      { field: "description", label: "Description", type: "string" },
      { field: "domain", label: "Domain", type: "enum" },
      { field: "status", label: "Status", type: "enum" },
      { field: "createdAt", label: "Created At", type: "date" },
      { field: "updatedAt", label: "Updated At", type: "date" },
    ],
  },
  control: {
    model: Control,
    fields: [
      { field: "id", label: "ID", type: "string" },
      { field: "title", label: "Title", type: "string" },
      { field: "description", label: "Description", type: "string" },
      { field: "type", label: "Type", type: "enum" },
      { field: "effectiveness", label: "Effectiveness", type: "enum" },
      { field: "monitoringStatus", label: "Monitoring Status", type: "enum" },
      { field: "lastTestedAt", label: "Last Tested", type: "date" },
      { field: "nextTestDue", label: "Next Test Due", type: "date" },
      { field: "createdAt", label: "Created At", type: "date" },
    ],
  },
  audit: {
    model: Audit,
    fields: [
      { field: "id", label: "ID", type: "string" },
      { field: "title", label: "Title", type: "string" },
      { field: "auditType", label: "Audit Type", type: "enum" },
      { field: "status", label: "Status", type: "enum" },
      { field: "startDate", label: "Start Date", type: "date" },
      { field: "endDate", label: "End Date", type: "date" },
      { field: "createdAt", label: "Created At", type: "date" },
    ],
  },
  vendor: {
    model: Vendor,
    fields: [
      { field: "id", label: "ID", type: "string" },
      { field: "name", label: "Name", type: "string" },
      { field: "description", label: "Description", type: "string" },
      { field: "riskLevel", label: "Risk Level", type: "enum" },
      { field: "status", label: "Status", type: "string" },
      { field: "createdAt", label: "Created At", type: "date" },
    ],
  },
  kri: {
    model: KRI,
    fields: [
      { field: "id", label: "ID", type: "string" },
      { field: "name", label: "Name", type: "string" },
      { field: "category", label: "Category", type: "enum" },
      { field: "currentValue", label: "Current Value", type: "number" },
      { field: "thresholdGreen", label: "Green Threshold", type: "number" },
      { field: "thresholdAmber", label: "Amber Threshold", type: "number" },
      { field: "thresholdRed", label: "Red Threshold", type: "number" },
      { field: "frequency", label: "Frequency", type: "enum" },
      { field: "createdAt", label: "Created At", type: "date" },
    ],
  },
};

function buildOperatorCondition(operator: string, value: string): any {
  switch (operator) {
    case "eq": return value;
    case "ne": return { [Op.ne]: value };
    case "gt": return { [Op.gt]: value };
    case "gte": return { [Op.gte]: value };
    case "lt": return { [Op.lt]: value };
    case "lte": return { [Op.lte]: value };
    case "contains": return { [Op.iLike]: `%${value}%` };
    case "in": return { [Op.in]: value.split(",").map((v) => v.trim()) };
    default: return value;
  }
}

export class ReportGeneratorService {
  getSchema(entityType: string) {
    const schema = ENTITY_SCHEMAS[entityType];
    if (!schema) throw new Error(`Unknown entity type: ${entityType}`);
    return schema.fields;
  }

  async generate(
    template: {
      entityType: string;
      columns: { field: string; label: string }[];
      filters: { field: string; operator: string; value: string }[];
      groupBy?: string | null;
      sortBy?: string | null;
      sortOrder?: string;
    },
    organizationId: string
  ) {
    const schema = ENTITY_SCHEMAS[template.entityType];
    if (!schema) throw new Error(`Unknown entity type: ${template.entityType}`);

    const where: WhereOptions = { organizationId } as any;

    for (const filter of template.filters || []) {
      (where as any)[filter.field] = buildOperatorCondition(filter.operator, filter.value);
    }

    const attributes = template.columns.length > 0
      ? template.columns.map((c) => c.field)
      : undefined;

    const order: any[] = [];
    if (template.sortBy) {
      order.push([template.sortBy, (template.sortOrder || "asc").toUpperCase()]);
    }

    const records = await schema.model.findAll({
      where,
      attributes,
      order: order.length > 0 ? order : [["createdAt", "DESC"]],
    });

    const data = records.map((r: any) => r.toJSON());

    // Group if requested
    if (template.groupBy) {
      const grouped: Record<string, any[]> = {};
      for (const row of data) {
        const key = row[template.groupBy!] || "Other";
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(row);
      }
      return { grouped, total: data.length };
    }

    return { rows: data, total: data.length };
  }

  generateCSV(
    data: any[],
    columns: { field: string; label: string }[]
  ): string {
    const headers = columns.map((c) => c.label);
    const rows = data.map((row) =>
      columns.map((c) => {
        const val = row[c.field];
        if (val === null || val === undefined) return "";
        const str = String(val);
        return str.includes(",") || str.includes('"') || str.includes("\n")
          ? `"${str.replace(/"/g, '""')}"`
          : str;
      })
    );

    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  }
}

export const reportGeneratorService = new ReportGeneratorService();
