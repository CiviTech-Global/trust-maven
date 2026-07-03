import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { complianceHubService } from "../services/complianceHub.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class OrganizationRegulationController {
  getAdopted = controllerWrapper(
    async (req) => {
      const adopted = await complianceHubService.getAdoptedRegulations(
        req.user!.organizationId
      );
      return { status: 200, data: adopted };
    },
    { functionName: "getAdopted", eventType: "Read" }
  );

  adopt = controllerWrapper(
    async (req) => {
      const { regulationId, targetComplianceDate, notes } = req.body;
      if (!regulationId) throw new ValidationException("regulationId is required");
      const result = await complianceHubService.adoptRegulation(
        req.user!.organizationId,
        regulationId as string,
        { targetComplianceDate, notes },
        req.user!.userId
      );
      return { status: 201, data: result };
    },
    { functionName: "adopt", eventType: "Create" }
  );

  deprecate = controllerWrapper(
    async (req) => {
      const result = await complianceHubService.deprecateRegulation(
        req.user!.organizationId,
        req.params.id as string,
        req.user!.userId
      );
      return { status: 200, data: result };
    },
    { functionName: "deprecate", eventType: "Update" }
  );

  getStatus = controllerWrapper(
    async (req) => {
      const result = await complianceHubService.getImplementationStatus(
        req.user!.organizationId,
        req.params.id as string
      );
      return { status: 200, data: result };
    },
    { functionName: "getStatus", eventType: "Read" }
  );

  bulkDeprecate = controllerWrapper(
    async (req) => {
      const { ids } = req.body;
      if (!ids || !Array.isArray(ids) || ids.length === 0) throw new ValidationException("ids array is required");
      const result = await complianceHubService.bulkDeprecateRegulations(
        req.user!.organizationId,
        ids,
        req.user!.userId
      );
      return { status: 200, data: result };
    },
    { functionName: "bulkDeprecate", eventType: "Update" }
  );

  bulkUpdateStatus = controllerWrapper(
    async (req) => {
      const { ids, status } = req.body;
      if (!ids || !Array.isArray(ids) || ids.length === 0) throw new ValidationException("ids array is required");
      if (!status) throw new ValidationException("status is required");
      const result = await complianceHubService.bulkUpdateRegulationStatus(
        req.user!.organizationId,
        ids,
        status,
        req.user!.userId
      );
      return { status: 200, data: result };
    },
    { functionName: "bulkUpdateStatus", eventType: "Update" }
  );

  updateImplementation = controllerWrapper(
    async (req) => {
      const result = await complianceHubService.updateRequirementImplementation(
        req.user!.organizationId,
        req.params.implId as string,
        req.body,
        req.user!.userId
      );
      return { status: 200, data: result };
    },
    { functionName: "updateImplementation", eventType: "Update" }
  );
}

export const organizationRegulationController = new OrganizationRegulationController();
