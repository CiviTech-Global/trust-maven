import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { reportTemplateService } from "../services/reportTemplate.service";
import { reportGeneratorService } from "../services/reportGenerator.service";

export class ReportTemplateController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const templates = await reportTemplateService.findAll(req.user!.organizationId, req.user!.userId);
      res.json({ success: true, data: templates });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const template = await reportTemplateService.findById(req.params.id as string, req.user!.organizationId);
      res.json({ success: true, data: template });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { name, description, entityType, columns, filters, groupBy, sortBy, sortOrder, isShared } = req.body;
      if (!name || !entityType) {
        res.status(400).json({ success: false, message: "Name and entity type are required" });
        return;
      }
      const template = await reportTemplateService.create(
        { name, description, entityType, columns, filters, groupBy, sortBy, sortOrder, isShared },
        req.user!.organizationId,
        req.user!.userId
      );
      res.status(201).json({ success: true, data: template });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const template = await reportTemplateService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      res.json({ success: true, data: template });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await reportTemplateService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "Report template deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

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

  async getSchema(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const fields = reportGeneratorService.getSchema(req.params.entityType as string);
      res.json({ success: true, data: fields });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export const reportTemplateController = new ReportTemplateController();
