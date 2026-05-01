import { Router } from "express";
import { authenticate, authorize, tenantIsolation } from "../middleware/auth.middleware";
import { UserRole } from "../types";
import { exportController } from "../controllers/export.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/risks", (req, res) => exportController.exportRisks(req, res));
router.get("/audit-logs", authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.AUDITOR), (req, res) => exportController.exportAuditLogs(req, res));

export default router;
