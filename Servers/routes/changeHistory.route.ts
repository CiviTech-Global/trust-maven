import { Router, Response } from "express";
import { authenticate, tenantIsolation, AuthenticatedRequest } from "../middleware/auth.middleware";
import { changeHistoryService, EntityType } from "../services/changeHistory.service";

const router = Router();

router.use(authenticate, tenantIsolation);

const VALID_ENTITY_TYPES: EntityType[] = ["risk", "control", "project", "vendor", "audit", "kri", "framework"];

/**
 * GET /api/v1/change-history/:entityType/:entityId
 * Retrieve field-level change history for any entity.
 */
router.get("/:entityType/:entityId", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const entityType = req.params.entityType as EntityType;
    const entityId = req.params.entityId as string;

    if (!VALID_ENTITY_TYPES.includes(entityType)) {
      res.status(400).json({ success: false, message: `Invalid entity type. Must be one of: ${VALID_ENTITY_TYPES.join(", ")}` });
      return;
    }

    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const result = await changeHistoryService.getHistory(
      entityType,
      entityId,
      req.user!.organizationId,
      { limit, offset },
    );

    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
