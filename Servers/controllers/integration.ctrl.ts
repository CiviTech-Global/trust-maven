import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { integrationService } from "../services/integration.service";
import { getAllConnectors } from "../services/connectors/connector.registry";

function ensureUser(req: AuthenticatedRequest) {
  if (!req.user) throw new Error("Authentication required");
  return req.user;
}

function qs(val: unknown): string | undefined {
  if (typeof val === "string") return val;
  if (Array.isArray(val) && val.length > 0) return String(val[0]);
  return undefined;
}

export class IntegrationController {
  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const integrations = await integrationService.findAll(user.organizationId, {
        connectorType: qs(req.query.connectorType),
        status: qs(req.query.status),
      });
      res.json({ success: true, data: integrations });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async findById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const integration = await integrationService.findById(req.params.id as string, user.organizationId);
      res.json({ success: true, data: integration });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const { connectorType, name, config } = req.body;
      if (!connectorType || !name) {
        res.status(400).json({ success: false, message: "connectorType and name are required" });
        return;
      }
      const integration = await integrationService.create(
        { connectorType, name, config: config || {} },
        user.organizationId,
        user.userId
      );
      res.status(201).json({ success: true, data: integration });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const integration = await integrationService.update(
        req.params.id as string,
        req.body,
        user.organizationId,
        user.userId
      );
      res.json({ success: true, data: integration });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      await integrationService.delete(req.params.id as string, user.organizationId, user.userId);
      res.json({ success: true, message: "Integration deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async testConnection(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const result = await integrationService.testConnection(req.params.id as string, user.organizationId);
      res.json({ success: result.success, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async syncNow(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const evidence = await integrationService.syncNow(req.params.id as string, user.organizationId);
      res.json({ success: true, data: evidence });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getSyncHistory(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const events = await integrationService.getSyncHistory(req.params.id as string, user.organizationId);
      res.json({ success: true, data: events });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getDashboardSummary(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const summary = await integrationService.getDashboardSummary(user.organizationId);
      res.json({ success: true, data: summary });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAvailableConnectors(_req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const connectors = getAllConnectors().map((c) => ({
        type: c.type,
        name: c.name,
        description: c.description,
        icon: c.icon,
        supportedControls: c.getSupportedControls(),
      }));
      res.json({ success: true, data: connectors });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const integrationController = new IntegrationController();
