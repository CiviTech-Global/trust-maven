import { Op } from "sequelize";
import { Integration } from "../domain.layer/models/integration/integration.model";
import { IntegrationEvent } from "../domain.layer/models/integrationEvent/integrationEvent.model";
import { Evidence } from "../domain.layer/models/evidence/evidence.model";
import { CommonControl } from "../domain.layer/models/commonControl/commonControl.model";
import { CommonControlImplementation } from "../domain.layer/models/commonControlImplementation/commonControlImplementation.model";
import { getConnector, CollectedEvidence } from "./connectors/connector.registry";
import { logger } from "../utils/logger";

let schedulerInterval: ReturnType<typeof setInterval> | null = null;
let isCollecting = false;

export class EvidenceCollectorService {
  startScheduler(intervalMinutes: number = 60): void {
    if (schedulerInterval) {
      clearInterval(schedulerInterval);
    }

    logger.info(`Starting evidence collection scheduler every ${intervalMinutes} minutes`);
    schedulerInterval = setInterval(() => {
      this.collectAll().catch((err) => logger.error("Scheduled evidence collection failed:", err.message));
    }, intervalMinutes * 60 * 1000);
  }

  stopScheduler(): void {
    if (schedulerInterval) {
      clearInterval(schedulerInterval);
      schedulerInterval = null;
      logger.info("Evidence collection scheduler stopped");
    }
  }

  async collectAll(orgId?: string): Promise<void> {
    if (isCollecting) {
      logger.warn("Evidence collection already in progress, skipping");
      return;
    }

    isCollecting = true;
    try {
      const where: Record<string, unknown> = { isActive: true, status: "connected" };
      if (orgId) where.organizationId = orgId;

      const integrations = await Integration.findAll({ where });
      logger.info(`Starting evidence collection for ${integrations.length} integrations`);

      for (const integration of integrations) {
        try {
          await this.collectForIntegration(integration.id, integration.organizationId, "scheduler");
          logger.info(`Collection completed for integration ${integration.id}`);
        } catch (err: any) {
          logger.error(`Collection failed for integration ${integration.id}: ${err.message}`);
        }
      }
    } finally {
      isCollecting = false;
    }
  }

  async collectForIntegration(integrationId: string, orgId: string, userId: string): Promise<CollectedEvidence[]> {
    const integration = await Integration.findOne({ where: { id: integrationId, organizationId: orgId } });
    if (!integration) throw new Error("Integration not found");

    const connector = getConnector(integration.connectorType);
    if (!connector) throw new Error(`Connector type ${integration.connectorType} not found`);

    const evidenceItems = await connector.collectEvidence(integration.config as Record<string, unknown>);

    await integration.update({
      lastSyncAt: new Date(),
      status: "connected",
      metadata: {
        ...((integration.metadata as Record<string, unknown>) || {}),
        lastSyncItems: evidenceItems.length,
        lastSyncStatus: "success",
      },
    });

    const matched = await this.matchToControls(evidenceItems, orgId, userId);

    await IntegrationEvent.create({
      integrationId,
      eventType: "evidence_collected",
      status: "success",
      message: `Collected ${evidenceItems.length} evidence items, matched ${matched.length} to controls`,
      payload: { items: evidenceItems.length, matched: matched.length, evidenceItemIds: matched.map((m) => m.evidenceId) },
    });

    return evidenceItems;
  }

  async matchToControls(evidenceItems: CollectedEvidence[], orgId: string, userId: string): Promise<{ evidenceId: string; commonControlId: string; code: string }[]> {
    const results: { evidenceId: string; commonControlId: string; code: string }[] = [];

    for (const item of evidenceItems) {
      const codesToMatch = item.matchedControlCodes || [];

      if (codesToMatch.length === 0) continue;

      const controls = await CommonControl.findAll({
        where: { code: { [Op.in]: codesToMatch }, isActive: true },
      });

      for (const control of controls) {
        const evidence = await Evidence.create({
          organizationId: orgId,
          entityType: "integration_connector",
          entityId: control.id,
          title: item.title,
          description: item.description,
          status: item.status === "compliant" ? "approved" : item.status === "non_compliant" ? "rejected" : "draft",
          uploadedById: userId,
        });

        const [impl] = await CommonControlImplementation.findOrCreate({
          where: { organizationId: orgId, commonControlId: control.id },
          defaults: { organizationId: orgId, commonControlId: control.id, status: "not_started" },
        });

        const currentEvidenceIds = impl.evidenceIds || [];
        if (!currentEvidenceIds.includes(evidence.id)) {
          currentEvidenceIds.push(evidence.id);
          await impl.update({ evidenceIds: currentEvidenceIds });
        }

        results.push({ evidenceId: evidence.id, commonControlId: control.id, code: control.code });
      }
    }

    return results;
  }
}

export const evidenceCollectorService = new EvidenceCollectorService();

export function startEvidenceScheduler(): void {
  evidenceCollectorService.startScheduler();
}

export function stopEvidenceScheduler(): void {
  evidenceCollectorService.stopScheduler();
}
