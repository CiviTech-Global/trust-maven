import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { complianceHubController } from "../controllers/complianceHub.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/dashboard", (req, res) =>
  complianceHubController.getDashboard(req, res));
router.get("/unified-status", (req, res) =>
  complianceHubController.getUnifiedStatus(req, res));
router.get("/area/:area", (req, res) =>
  complianceHubController.getAreaCompliance(req, res));
router.get("/gaps/:regulationId", (req, res) =>
  complianceHubController.getGapAnalysis(req, res));
router.get("/translate/:from/:to", (req, res) =>
  complianceHubController.translateFramework(req, res));
router.get("/recommend", (req, res) =>
  complianceHubController.recommend(req, res));

export default router;
