import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { frameworkController } from "../controllers/framework.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/compliance-summary", (req, res) => frameworkController.getAllComplianceSummary(req, res));
router.get("/", (req, res) => frameworkController.findAll(req, res));
router.post("/", (req, res) => frameworkController.create(req, res));
router.get("/:id", (req, res) => frameworkController.findById(req, res));
router.put("/:id", (req, res) => frameworkController.update(req, res));
router.delete("/:id", (req, res) => frameworkController.delete(req, res));
router.get("/:id/compliance", (req, res) => frameworkController.getComplianceCoverage(req, res));

export default router;
