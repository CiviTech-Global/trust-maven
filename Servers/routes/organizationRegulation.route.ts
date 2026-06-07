import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { organizationRegulationController } from "../controllers/organizationRegulation.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/", (req, res) =>
  organizationRegulationController.getAdopted(req, res));
router.post("/", (req, res) =>
  organizationRegulationController.adopt(req, res));
router.post("/bulk/deprecate", (req, res) =>
  organizationRegulationController.bulkDeprecate(req, res));
router.post("/bulk/status", (req, res) =>
  organizationRegulationController.bulkUpdateStatus(req, res));
router.delete("/:id", (req, res) =>
  organizationRegulationController.deprecate(req, res));
router.get("/:id/status", (req, res) =>
  organizationRegulationController.getStatus(req, res));
router.put("/requirements/:implId", (req, res) =>
  organizationRegulationController.updateImplementation(req, res));

export default router;
