import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { kriService } from "../services/kri.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class KRIController {
  findAll = controllerWrapper(
    async (req) => {
      const { category, status, riskId, search, page, limit } = req.query;
      const result = await kriService.findAll(req.user!.organizationId, {
        category: category as string | undefined,
        status: status as string | undefined,
        riskId: riskId as string | undefined,
        search: search as string | undefined,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      return { status: 200, data: result.kris, pagination: result.pagination };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const kri = await kriService.findById(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: kri };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { name, description, category, currentValue, thresholdGreen, thresholdAmber, thresholdRed, direction, unit, frequency, riskId, ownerId } = req.body;
      if (!name || !category || currentValue === undefined || thresholdGreen === undefined || thresholdAmber === undefined || thresholdRed === undefined) {
        throw new ValidationException("Name, category, currentValue, and all thresholds are required");
      }
      const kri = await kriService.create(
        { name, description, category, currentValue, thresholdGreen, thresholdAmber, thresholdRed, direction, unit, frequency, riskId, ownerId },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: kri };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const kri = await kriService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: kri };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      await kriService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "KRI deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  getSummary = controllerWrapper(
    async (req) => {
      const summary = await kriService.getSummary(req.user!.organizationId);
      return { status: 200, data: summary };
    },
    { functionName: "getSummary", eventType: "Read" }
  );

  getHistory = controllerWrapper(
    async (req) => {
      const history = await kriService.getHistory(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: history };
    },
    { functionName: "getHistory", eventType: "Read" }
  );

  getBreached = controllerWrapper(
    async (req) => {
      const breached = await kriService.getBreachedKRIs(req.user!.organizationId);
      return { status: 200, data: breached };
    },
    { functionName: "getBreached", eventType: "Read" }
  );
}

export const kriController = new KRIController();
