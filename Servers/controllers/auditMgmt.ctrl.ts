import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { auditMgmtService } from "../services/auditMgmt.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class AuditMgmtController {
  findAll = controllerWrapper(
    async (req) => {
      const { status, auditType, search, page, limit } = req.query;
      const result = await auditMgmtService.findAllAudits(req.user!.organizationId, {
        status: status as string | undefined,
        auditType: auditType as string | undefined,
        search: search as string | undefined,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      return { status: 200, data: result.audits, pagination: result.pagination };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const audit = await auditMgmtService.findAuditById(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: audit };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { title, description, auditType, status, leadAuditorId, scope, startDate, endDate } = req.body;
      if (!title || !auditType || !startDate) throw new ValidationException("Title, audit type, and start date are required");
      const audit = await auditMgmtService.createAudit(
        { title, description, auditType, status, leadAuditorId, scope, startDate, endDate },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: audit };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const audit = await auditMgmtService.updateAudit(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: audit };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      await auditMgmtService.deleteAudit(req.params.id as string, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Audit deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  createFinding = controllerWrapper(
    async (req) => {
      const { title, description, severity, status, responsibleId, controlId, riskId, dueDate, remediationNotes } = req.body;
      if (!title || !severity) throw new ValidationException("Title and severity are required");
      const finding = await auditMgmtService.createFinding(
        req.params.id as string,
        { title, description, severity, status, responsibleId, controlId, riskId, dueDate, remediationNotes },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: finding };
    },
    { functionName: "createFinding", eventType: "Create" }
  );

  updateFinding = controllerWrapper(
    async (req) => {
      const finding = await auditMgmtService.updateFinding(
        req.params.id as string,
        req.params.findingId as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: finding };
    },
    { functionName: "updateFinding", eventType: "Update" }
  );

  deleteFinding = controllerWrapper(
    async (req) => {
      await auditMgmtService.deleteFinding(
        req.params.id as string,
        req.params.findingId as string,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, message: "Finding deleted" };
    },
    { functionName: "deleteFinding", eventType: "Delete" }
  );

  getOverdueFindings = controllerWrapper(
    async (req) => {
      const findings = await auditMgmtService.getOverdueFindings(req.user!.organizationId);
      return { status: 200, data: findings };
    },
    { functionName: "getOverdueFindings", eventType: "Read" }
  );
}

export const auditMgmtController = new AuditMgmtController();
