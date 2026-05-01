import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { riskController } from "../controllers/risk.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

// Risk CRUD
router.get("/", (req, res) => riskController.findAll(req, res));
router.post("/", (req, res) => riskController.create(req, res));
router.get("/:id", (req, res) => riskController.findById(req, res));
router.put("/:id", (req, res) => riskController.update(req, res));
router.delete("/:id", (req, res) => riskController.delete(req, res));

// Nested assessment routes
router.get("/:riskId/assessments", (req, res) => riskController.getAssessments(req, res));
router.post("/:riskId/assessments", (req, res) => riskController.createAssessment(req, res));

// Nested treatment routes
router.get("/:riskId/treatments", (req, res) => riskController.getTreatments(req, res));
router.post("/:riskId/treatments", (req, res) => riskController.createTreatment(req, res));
router.put("/:riskId/treatments/:treatmentId", (req, res) => riskController.updateTreatment(req, res));
router.delete("/:riskId/treatments/:treatmentId", (req, res) => riskController.deleteTreatment(req, res));

export default router;
