import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { evidenceController } from "../controllers/evidence.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/summary", (req, res) => evidenceController.getSummary(req, res));
router.get("/", (req, res) => evidenceController.findAll(req, res));
router.post("/", (req, res) => evidenceController.create(req, res));
router.get("/:id", (req, res) => evidenceController.findById(req, res));
router.put("/:id", (req, res) => evidenceController.update(req, res));
router.delete("/:id", (req, res) => evidenceController.delete(req, res));

export default router;
