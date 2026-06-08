import { Op } from "sequelize";
import { Integration } from "../domain.layer/models/integration/integration.model";
import { IntegrationEvent } from "../domain.layer/models/integrationEvent/integrationEvent.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";
import { getConnector } from "./connectors/connector.registry";

export class IntegrationService {
  async findAll(orgId: string, filters?: { connectorType?: string; status?: string }) {
    const where: Record<string, unknown> = { organizationId: orgId };
    if (filters?.connectorType) where.connectorType = filters.connectorType;
    if (filters?.status) where.status = filters.status;
    return Integration.findAll({ where, order: [["createdAt", "DESC"]] });
  }

  async findById(id: string, orgId: string) {
    const integration = await Integration.findOne({ where: { id, organizationId: orgId } });
    if (!integration) throw new Error("Integration not found");
    return integration;
  }

  async create(data: { connectorType: string; name: string; config: Record<string, unknown> }, orgId: string, userId: string) {
    const connector = getConnector(data.connectorType);
    if (!connector) throw new Error(`Unsupported connector type: ${data.connectorType}`);

    const integration = await Integration.create({
      organizationId: orgId,
      connectorType: data.connectorType,
      name: data.name,
      config: data.config,
      status: "disconnected",
    });

    const testResult = await connector.testConnection(data.config);
    if (testResult.success) {
      await integration.update({ status: "connected" });
    }

    await IntegrationEvent.create({
      integrationId: integration.id,
      eventType: "connection_test",
      status: testResult.success ? "success" : "failure",
      message: testResult.message,
    });

    await auditService.log({
      organizationId: orgId,
      userId,
      entityType: "integration",
      entityId: integration.id,
      action: AuditAction.CONNECT,
      changes: { connectorType: data.connectorType, name: data.name },
    });

    return integration;
  }

  async update(id: string, data: Partial<{ name: string; config: Record<string, unknown>; isActive: boolean }>, orgId: string, userId: string) {
    const integration = await Integration.findOne({ where: { id, organizationId: orgId } });
    if (!integration) throw new Error("Integration not found");

    const changedFields: Record<string, unknown> = {};
    if (data.name !== undefined) changedFields.name = data.name;
    if (data.config !== undefined) changedFields.config = data.config;
    if (data.isActive !== undefined) changedFields.isActive = data.isActive;

    await integration.update(changedFields);

    await auditService.log({
      organizationId: orgId,
      userId,
      entityType: "integration",
      entityId: id,
      action: AuditAction.UPDATE,
      changes: changedFields,
    });

    return integration;
  }

  async delete(id: string, orgId: string, userId: string) {
    const integration = await Integration.findOne({ where: { id, organizationId: orgId } });
    if (!integration) throw new Error("Integration not found");

    await IntegrationEvent.destroy({ where: { integrationId: id } });
    await integration.destroy();

    await auditService.log({
      organizationId: orgId,
      userId,
      entityType: "integration",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }

  async testConnection(id: string, orgId: string) {
    const integration = await this.findById(id, orgId);
    const connector = getConnector(integration.connectorType);
    if (!connector) throw new Error(`Connector type ${integration.connectorType} not found`);

    const result = await connector.testConnection(integration.config as Record<string, unknown>);

    await integration.update({
      status: result.success ? "connected" : "error",
      metadata: { ...(integration.metadata || {}), lastTestResult: result.message, lastTestedAt: new Date().toISOString() },
    });

    await IntegrationEvent.create({
      integrationId: id,
      eventType: "connection_test",
      status: result.success ? "success" : "failure",
      message: result.message,
    });

    return result;
  }

  async syncNow(id: string, orgId: string) {
    const integration = await this.findById(id, orgId);
    const connector = getConnector(integration.connectorType);
    if (!connector) throw new Error(`Connector type ${integration.connectorType} not found`);

    try {
      const evidence = await connector.collectEvidence(integration.config as Record<string, unknown>);

      await integration.update({
        lastSyncAt: new Date(),
        status: "connected",
        metadata: { ...(integration.metadata || {}), lastSyncItems: evidence.length, lastSyncStatus: "success" },
      });

      await IntegrationEvent.create({
        integrationId: id,
        eventType: "evidence_collected",
        status: "success",
        message: `Collected ${evidence.length} evidence items`,
        payload: { items: evidence.length, types: [...new Set(evidence.map((e) => e.evidenceType))] },
      });

      return evidence;
    } catch (error: any) {
      await integration.update({
        status: "error",
        metadata: { ...(integration.metadata || {}), lastSyncError: error.message, lastSyncAt: new Date().toISOString() },
      });

      await IntegrationEvent.create({
        integrationId: id,
        eventType: "error",
        status: "failure",
        message: error.message,
      });

      throw error;
    }
  }

  async getSyncHistory(id: string, orgId: string) {
    const integration = await this.findById(id, orgId);
    return IntegrationEvent.findAll({
      where: { integrationId: integration.id },
      order: [["collectedAt", "DESC"]],
      limit: 50,
    });
  }

  async getDashboardSummary(orgId: string) {
    const integrations = await Integration.findAll({ where: { organizationId: orgId } });

    const total = integrations.length;
    const connected = integrations.filter((i) => i.status === "connected").length;
    const error = integrations.filter((i) => i.status === "error").length;
    const disconnected = integrations.filter((i) => i.status === "disconnected").length;

    const activeIntegrations = integrations
      .filter((i) => i.isActive && i.lastSyncAt)
      .sort((a, b) => new Date(b.lastSyncAt!).getTime() - new Date(a.lastSyncAt!).getTime());

    return {
      total,
      connected,
      disconnected,
      error,
      lastSyncs: activeIntegrations.slice(0, 5).map((i) => ({
        id: i.id,
        name: i.name,
        connectorType: i.connectorType,
        lastSyncAt: i.lastSyncAt,
        status: i.status,
      })),
      byType: integrations.reduce((acc: Record<string, number>, i) => {
        acc[i.connectorType] = (acc[i.connectorType] || 0) + 1;
        return acc;
      }, {}),
    };
  }
}

export const integrationService = new IntegrationService();
