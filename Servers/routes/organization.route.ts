import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { organizationController } from "../controllers/organization.ctrl";

const router = Router();
router.use(authenticate, tenantIsolation);

router.get("/me", (req, res) => organizationController.getMyOrg(req, res));
router.put("/me", (req, res) => organizationController.updateMyOrg(req, res));

export default router;
