import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { fairAnalysisController } from "../controllers/fairAnalysis.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/exposure-summary", (req, res) => fairAnalysisController.getExposureSummary(req, res));
router.get("/by-risk/:riskId", (req, res) => fairAnalysisController.findByRisk(req, res));
router.post("/", (req, res) => fairAnalysisController.create(req, res));
router.get("/:id", (req, res) => fairAnalysisController.findById(req, res));
router.put("/:id", (req, res) => fairAnalysisController.update(req, res));
router.delete("/:id", (req, res) => fairAnalysisController.delete(req, res));
router.post("/:id/simulate", (req, res) => fairAnalysisController.runSimulation(req, res));

export default router;
