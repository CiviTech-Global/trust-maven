import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { controlController } from "../controllers/control.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/", (req, res) => controlController.findAll(req, res));
router.post("/", (req, res) => controlController.create(req, res));
router.get("/:id", (req, res) => controlController.findById(req, res));
router.put("/:id", (req, res) => controlController.update(req, res));
router.delete("/:id", (req, res) => controlController.delete(req, res));

export default router;
