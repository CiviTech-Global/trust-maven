import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { integrationService } from "../services/integration.service";
import { getAllConnectors, getConnectorHealth } from "../services/connectors/connector.registry";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

function qs(val: unknown): string | undefined {
  if (typeof val === "string") return val;
  if (Array.isArray(val) && val.length > 0) return String(val[0]);
  return undefined;
}

export class IntegrationController {
  findAll = controllerWrapper(
    async (req) => {
      const integrations = await integrationService.findAll(req.user!.organizationId, {
        connectorType: qs(req.query.connectorType),
        status: qs(req.query.status),
      });
      return { status: 200, data: integrations };
    },
    { functionName: "findAll", eventType: "Read" }
  );

  findById = controllerWrapper(
    async (req) => {
      const integration = await integrationService.findById(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: integration };
    },
    { functionName: "findById", eventType: "Read" }
  );

  create = controllerWrapper(
    async (req) => {
      const { connectorType, name, config } = req.body;
      if (!connectorType || !name) throw new ValidationException("connectorType and name are required");
      const integration = await integrationService.create(
        { connectorType, name, config: config || {} },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: integration };
    },
    { functionName: "create", eventType: "Create" }
  );

  update = controllerWrapper(
    async (req) => {
      const integration = await integrationService.update(
        req.params.id as string,
        req.body,
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 200, data: integration };
    },
    { functionName: "update", eventType: "Update" }
  );

  delete = controllerWrapper(
    async (req) => {
      await integrationService.delete(req.params.id as string, req.user!.organizationId, req.user!.userId);
      return { status: 200, message: "Integration deleted" };
    },
    { functionName: "delete", eventType: "Delete" }
  );

  // testConnection needs raw res because the success field in response depends on result
  async testConnection(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await integrationService.testConnection(req.params.id as string, req.user!.organizationId);
      res.json({ success: result.success, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  syncNow = controllerWrapper(
    async (req) => {
      const evidence = await integrationService.syncNow(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: evidence };
    },
    { functionName: "syncNow", eventType: "Create" }
  );

  getSyncHistory = controllerWrapper(
    async (req) => {
      const events = await integrationService.getSyncHistory(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: events };
    },
    { functionName: "getSyncHistory", eventType: "Read" }
  );

  getDashboardSummary = controllerWrapper(
    async (req) => {
      const summary = await integrationService.getDashboardSummary(req.user!.organizationId);
      return { status: 200, data: summary };
    },
    { functionName: "getDashboardSummary", eventType: "Read" }
  );

  getAvailableConnectors = controllerWrapper(
    async (_req) => {
      const connectors = getAllConnectors().map((c) => ({
        type: c.type,
        name: c.name,
        description: c.description,
        icon: c.icon,
        supportedControls: c.getSupportedControls(),
      }));
      return { status: 200, data: connectors };
    },
    { functionName: "getAvailableConnectors", eventType: "Read" }
  );

  getMarketplace = controllerWrapper(
    async (_req) => {
      const health = getConnectorHealth();
      return {
        status: 200,
        data: {
          total: health.length,
          connectors: health,
          communityUrl: "https://github.com/anomalyco/trust-maven-connectors",
          generatorScript: "node Servers/scripts/generateConnector.js",
        },
      };
    },
    { functionName: "getMarketplace", eventType: "Read" }
  );
}

export const integrationController = new IntegrationController();
