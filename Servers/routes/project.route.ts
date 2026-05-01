import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { projectController } from "../controllers/project.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/", (req, res) => projectController.findAll(req, res));
router.post("/", (req, res) => projectController.create(req, res));
router.get("/:id", (req, res) => projectController.findById(req, res));
router.put("/:id", (req, res) => projectController.update(req, res));
router.delete("/:id", (req, res) => projectController.delete(req, res));

export default router;
