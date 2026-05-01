import { Router } from "express";
import { authenticate, authorize, tenantIsolation } from "../middleware/auth.middleware";
import { UserRole } from "../types";
import { auditLogController } from "../controllers/auditLog.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/", authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.AUDITOR), (req, res) => auditLogController.findAll(req, res));
router.get("/entity/:type/:id", (req, res) => auditLogController.findByEntity(req, res));

export default router;
