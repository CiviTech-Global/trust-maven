import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { auditMgmtController } from "../controllers/auditMgmt.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/findings/overdue", (req, res) => auditMgmtController.getOverdueFindings(req, res));
router.get("/", (req, res) => auditMgmtController.findAll(req, res));
router.post("/", (req, res) => auditMgmtController.create(req, res));
router.get("/:id", (req, res) => auditMgmtController.findById(req, res));
router.put("/:id", (req, res) => auditMgmtController.update(req, res));
router.delete("/:id", (req, res) => auditMgmtController.delete(req, res));
router.post("/:id/findings", (req, res) => auditMgmtController.createFinding(req, res));
router.put("/:id/findings/:findingId", (req, res) => auditMgmtController.updateFinding(req, res));
router.delete("/:id/findings/:findingId", (req, res) => auditMgmtController.deleteFinding(req, res));

export default router;
