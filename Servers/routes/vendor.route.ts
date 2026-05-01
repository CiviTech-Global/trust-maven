import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { vendorController } from "../controllers/vendor.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/", (req, res) => vendorController.findAll(req, res));
router.post("/", (req, res) => vendorController.create(req, res));
router.get("/:id", (req, res) => vendorController.findById(req, res));
router.put("/:id", (req, res) => vendorController.update(req, res));
router.delete("/:id", (req, res) => vendorController.delete(req, res));

// Assessments
router.get("/:id/assessments", (req, res) => vendorController.getAssessments(req, res));
router.post("/:id/assessments", (req, res) => vendorController.createAssessment(req, res));
router.delete("/:id/assessments/:assessmentId", (req, res) => vendorController.deleteAssessment(req, res));

export default router;
