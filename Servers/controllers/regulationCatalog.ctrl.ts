import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { regulationCatalogService } from "../services/regulationCatalog.service";
import { controllerWrapper } from "../utils/controllerWrapper";

export class RegulationCatalogController {
  findAll = controllerWrapper(
    async (req) => {
      const { category, type, jurisdiction, search } = req.query;
      const regulations = await regulationCatalogService.findAll({
        category: category as string | undefined,
        type: type as string | undefined,
        jurisdiction: jurisdiction as string | undefined,
        search: search as string | undefined,
      });
      return { status: 200, data: regulations };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const result = await regulationCatalogService.getRequirementTree(req.params.id as string);
      return { status: 200, data: result };
    },
    { functionName: "findById", eventType: "Read" }
  );

  getRequirements = controllerWrapper(
    async (req) => {
      const requirements = await regulationCatalogService.getRequirementFlat(req.params.id as string);
      return { status: 200, data: requirements };
    },
    { functionName: "getRequirements", eventType: "Read" }
  );

  getRequirement = controllerWrapper(
    async (req) => {
      const result = await regulationCatalogService.getRequirement(req.params.reqId as string);
      return { status: 200, data: result };
    },
    { functionName: "getRequirement", eventType: "Read" }
  );

  getOverlap = controllerWrapper(
    async (req) => {
      const result = await regulationCatalogService.getFrameworkOverlap(
        req.params.id1 as string,
        req.params.id2 as string
      );
      return { status: 200, data: result };
    },
    { functionName: "getOverlap", eventType: "Read" }
  );
}

export const regulationCatalogController = new RegulationCatalogController();
