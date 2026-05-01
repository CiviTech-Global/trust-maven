/**
 * Generic Change History Service
 *
 * Tracks field-level changes on any entity. Records old/new values
 * for each modified field, enabling full audit trail with diff views.
 * Inspired by VerifyWise's changeHistory.base.utils pattern.
 */

import { sequelize } from "../database/db";
import { QueryTypes } from "sequelize";
import { logger } from "../utils/logger";

export type EntityType = "risk" | "control" | "project" | "vendor" | "audit" | "kri" | "framework";
export type ChangeAction = "created" | "updated" | "deleted";

export interface FieldChange {
  fieldName: string;
  oldValue: string | null;
  newValue: string | null;
}

export interface ChangeHistoryEntry {
  id: string;
  entityType: EntityType;
  entityId: string;
  action: ChangeAction;
  fieldName: string | null;
  oldValue: string | null;
  newValue: string | null;
  changedById: string;
  organizationId: string;
  changedAt: Date;
}

/**
 * Ensures the change_history table exists.
 * Called during bootstrap — uses IF NOT EXISTS for idempotency.
 */
export async function ensureChangeHistoryTable(): Promise<void> {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS change_history (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      entity_type VARCHAR(50) NOT NULL,
      entity_id UUID NOT NULL,
      action VARCHAR(20) NOT NULL,
      field_name VARCHAR(255),
      old_value TEXT,
      new_value TEXT,
      changed_by_id UUID NOT NULL,
      organization_id UUID NOT NULL,
      changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_change_history_entity ON change_history(entity_type, entity_id);
    CREATE INDEX IF NOT EXISTS idx_change_history_org ON change_history(organization_id);
  `);
}

export class ChangeHistoryService {
  /**
   * Record a single field change
   */
  async recordChange(
    entityType: EntityType,
    entityId: string,
    action: ChangeAction,
    changedById: string,
    organizationId: string,
    fieldName?: string,
    oldValue?: string | null,
    newValue?: string | null,
  ): Promise<void> {
    try {
      await sequelize.query(
        `INSERT INTO change_history (entity_type, entity_id, action, field_name, old_value, new_value, changed_by_id, organization_id)
         VALUES (:entityType, :entityId, :action, :fieldName, :oldValue, :newValue, :changedById, :organizationId)`,
        {
          replacements: {
            entityType,
            entityId,
            action,
            fieldName: fieldName || null,
            oldValue: oldValue ?? null,
            newValue: newValue ?? null,
            changedById,
            organizationId,
          },
        },
      );
    } catch (error) {
      logger.error(`Failed to record change history: ${error}`);
    }
  }

  /**
   * Detect and record multiple field changes by comparing old and new objects
   */
  async trackChanges(
    entityType: EntityType,
    entityId: string,
    oldData: Record<string, unknown>,
    newData: Record<string, unknown>,
    changedById: string,
    organizationId: string,
  ): Promise<FieldChange[]> {
    const changes: FieldChange[] = [];

    for (const key of Object.keys(newData)) {
      if (key === "updatedAt" || key === "createdAt" || key === "id") continue;

      const oldVal = oldData[key];
      const newVal = newData[key];

      if (String(oldVal ?? "") !== String(newVal ?? "")) {
        changes.push({
          fieldName: key,
          oldValue: oldVal != null ? String(oldVal) : null,
          newValue: newVal != null ? String(newVal) : null,
        });
      }
    }

    // Batch insert all changes
    for (const change of changes) {
      await this.recordChange(
        entityType,
        entityId,
        "updated",
        changedById,
        organizationId,
        change.fieldName,
        change.oldValue,
        change.newValue,
      );
    }

    return changes;
  }

  /**
   * Record entity creation (no field-level details)
   */
  async recordCreation(
    entityType: EntityType,
    entityId: string,
    changedById: string,
    organizationId: string,
  ): Promise<void> {
    await this.recordChange(entityType, entityId, "created", changedById, organizationId);
  }

  /**
   * Record entity deletion
   */
  async recordDeletion(
    entityType: EntityType,
    entityId: string,
    changedById: string,
    organizationId: string,
  ): Promise<void> {
    await this.recordChange(entityType, entityId, "deleted", changedById, organizationId);
  }

  /**
   * Get change history for a specific entity with pagination
   */
  async getHistory(
    entityType: EntityType,
    entityId: string,
    organizationId: string,
    options: { limit?: number; offset?: number } = {},
  ): Promise<{ entries: ChangeHistoryEntry[]; total: number }> {
    const limit = options.limit || 50;
    const offset = options.offset || 0;

    const [entries] = await sequelize.query<ChangeHistoryEntry>(
      `SELECT id, entity_type as "entityType", entity_id as "entityId", action,
              field_name as "fieldName", old_value as "oldValue", new_value as "newValue",
              changed_by_id as "changedById", organization_id as "organizationId",
              changed_at as "changedAt"
       FROM change_history
       WHERE entity_type = :entityType AND entity_id = :entityId AND organization_id = :organizationId
       ORDER BY changed_at DESC
       LIMIT :limit OFFSET :offset`,
      {
        replacements: { entityType, entityId, organizationId, limit, offset },
        type: QueryTypes.SELECT,
      },
    );

    const [countResult] = await sequelize.query<{ count: string }>(
      `SELECT COUNT(*) as count FROM change_history
       WHERE entity_type = :entityType AND entity_id = :entityId AND organization_id = :organizationId`,
      { replacements: { entityType, entityId, organizationId }, type: QueryTypes.SELECT },
    );

    return {
      entries: entries as unknown as ChangeHistoryEntry[],
      total: parseInt((countResult as any)?.count || "0"),
    };
  }
}

export const changeHistoryService = new ChangeHistoryService();
