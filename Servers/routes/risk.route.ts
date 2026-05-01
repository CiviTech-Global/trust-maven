import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { riskController } from "../controllers/risk.ctrl";
import { riskQuantificationController } from "../controllers/riskQuantification.ctrl";

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
router.put("/:riskId/assessments/:assessmentId", (req, res) => riskController.updateAssessment(req, res));
router.delete("/:riskId/assessments/:assessmentId", (req, res) => riskController.deleteAssessment(req, res));

// Assessment approval
router.put("/:riskId/assessments/:assessmentId/approve", (req, res) => riskController.approveAssessment(req, res));
router.put("/:riskId/assessments/:assessmentId/reject", (req, res) => riskController.rejectAssessment(req, res));

// Nested treatment routes
router.get("/:riskId/treatments", (req, res) => riskController.getTreatments(req, res));
router.post("/:riskId/treatments", (req, res) => riskController.createTreatment(req, res));
router.put("/:riskId/treatments/:treatmentId", (req, res) => riskController.updateTreatment(req, res));
router.delete("/:riskId/treatments/:treatmentId", (req, res) => riskController.deleteTreatment(req, res));

// Treatment approval
router.put("/:riskId/treatments/:treatmentId/approve", (req, res) => riskController.approveTreatment(req, res));
router.put("/:riskId/treatments/:treatmentId/reject", (req, res) => riskController.rejectTreatment(req, res));

// Risk-Control mappings
router.get("/:riskId/controls", (req, res) => riskController.getRiskControlMappings(req, res));
router.post("/:riskId/controls/:controlId", (req, res) => riskController.addRiskControlMapping(req, res));
router.delete("/:riskId/controls/:controlId", (req, res) => riskController.removeRiskControlMapping(req, res));

// Risk Quantification (FAIR)
router.get("/:riskId/quantifications", (req, res) => riskQuantificationController.findByRisk(req, res));
router.post("/:riskId/quantifications", (req, res) => riskQuantificationController.create(req, res));
router.put("/:riskId/quantifications/:qId", (req, res) => riskQuantificationController.update(req, res));
router.delete("/:riskId/quantifications/:qId", (req, res) => riskQuantificationController.delete(req, res));

export default router;
