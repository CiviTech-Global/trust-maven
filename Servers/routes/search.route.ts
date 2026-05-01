import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { searchService } from "../services/search.service";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { Response } from "express";

const router = Router();

router.use(authenticate, tenantIsolation);

/**
 * GET /api/v1/search?q=query&limit=10&offset=0
 * Cross-entity search across risks, controls, projects, vendors, KRIs, frameworks, audits.
 */
router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const query = (req.query.q as string) || "";
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const result = await searchService.search(query, req.user!.organizationId, { limit, offset });

    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
