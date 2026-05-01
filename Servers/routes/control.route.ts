import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { controlController } from "../controllers/control.ctrl";
import { controlMonitoringController } from "../controllers/controlMonitoring.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/", (req, res) => controlController.findAll(req, res));
router.post("/", (req, res) => controlController.create(req, res));
router.get("/:id", (req, res) => controlController.findById(req, res));
router.put("/:id", (req, res) => controlController.update(req, res));
router.delete("/:id", (req, res) => controlController.delete(req, res));

// Framework mappings
router.get("/:id/frameworks", (req, res) => controlController.getFrameworkMappings(req, res));
router.post("/:id/frameworks", (req, res) => controlController.addFrameworkMapping(req, res));
router.delete("/:id/frameworks/:mappingId", (req, res) => controlController.removeFrameworkMapping(req, res));

// Monitoring events
router.get("/:id/monitoring-events", (req, res) => controlMonitoringController.findEventsByControl(req, res));
router.post("/:id/monitoring-events", (req, res) => controlMonitoringController.recordEvent(req, res));

export default router;
