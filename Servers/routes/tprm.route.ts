import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { tprmController } from "../controllers/tprm.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/questionnaire", (req, res) => tprmController.getQuestionnaire(req, res));
router.post("/score", (req, res) => tprmController.calculateScore(req, res));
router.get("/overdue", (req, res) => tprmController.getOverdueAssessments(req, res));
router.get("/vendors/:vendorId/trend", (req, res) => tprmController.getRiskTrend(req, res));

export default router;
