import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { coverageController } from "../controllers/coverage.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/control-coverage", (req, res) => coverageController.getControlCoverage(req, res));

export default router;
