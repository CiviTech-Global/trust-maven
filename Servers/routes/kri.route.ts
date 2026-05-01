import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { kriController } from "../controllers/kri.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/summary", (req, res) => kriController.getSummary(req, res));
router.get("/breached", (req, res) => kriController.getBreached(req, res));
router.get("/", (req, res) => kriController.findAll(req, res));
router.post("/", (req, res) => kriController.create(req, res));
router.get("/:id", (req, res) => kriController.findById(req, res));
router.put("/:id", (req, res) => kriController.update(req, res));
router.delete("/:id", (req, res) => kriController.delete(req, res));

export default router;
