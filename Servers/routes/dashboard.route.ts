import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { dashboardController } from "../controllers/dashboard.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/stats", (req, res) => dashboardController.getStats(req, res));
router.get("/activity", (req, res) => dashboardController.getActivity(req, res));
router.get("/trends", (req, res) => dashboardController.getTrends(req, res));
router.get("/overdue", (req, res) => dashboardController.getOverdue(req, res));
router.get("/overdue-reviews", (req, res) => dashboardController.getOverdueReviews(req, res));

export default router;
