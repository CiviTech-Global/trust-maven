import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { riskQuantificationController } from "../controllers/riskQuantification.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/summary", (req, res) => riskQuantificationController.getExposureSummary(req, res));

export default router;
