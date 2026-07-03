import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { reportTemplateService } from "../services/reportTemplate.service";
import { reportGeneratorService } from "../services/reportGenerator.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class ReportTemplateController {
  findAll = controllerWrapper(
    async (req) => {
      const templates = await reportTemplateService.findAll(req.user!.organizationId, req.user!.userId);
      return { status: 200, data: templates };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const template = await reportTemplateService.findById(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: template };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { name, description, entityType, columns, filters, groupBy, sortBy, sortOrder, isShared } = req.body;
      if (!name || !entityType) throw new ValidationException("Name and entity type are required");
      const template = await reportTemplateService.create(
        { name, description, entityType, columns, filters, groupBy, sortBy, sortOrder, isShared },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: template };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const template = await reportTemplateService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: template };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      await reportTemplateService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Report template deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  getSchema = controllerWrapper(
    async (req) => {
      const fields = reportGeneratorService.getSchema(req.params.entityType as string);
      return { status: 200, data: fields };
    },
    { functionName: "getSchema", eventType: "Read" }
  );

  // generate needs direct res access for CSV export
  async generate(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const template = await reportTemplateService.findById(req.params.id as string, req.user!.organizationId);
      const format = (req.query.format as string) || "json";

      const result = await reportGeneratorService.generate(template, req.user!.organizationId);

      if (format === "csv") {
        const rows = (result as any).rows || Object.values((result as any).grouped || {}).flat();
        const csv = reportGeneratorService.generateCSV(rows, template.columns);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename="${template.name}.csv"`);
        res.send(csv);
        return;
      }

      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const reportTemplateController = new ReportTemplateController();
