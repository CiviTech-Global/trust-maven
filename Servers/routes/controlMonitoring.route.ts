import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { controlMonitoringController } from "../controllers/controlMonitoring.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/dashboard", (req, res) => controlMonitoringController.getDashboard(req, res));
router.get("/overdue", (req, res) => controlMonitoringController.getOverdue(req, res));
router.get("/failing", (req, res) => controlMonitoringController.getFailing(req, res));

export default router;
