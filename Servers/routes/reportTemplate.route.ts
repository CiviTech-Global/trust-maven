import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { reportTemplateController } from "../controllers/reportTemplate.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/schema/:entityType", (req, res) => reportTemplateController.getSchema(req, res));
router.get("/", (req, res) => reportTemplateController.findAll(req, res));
router.post("/", (req, res) => reportTemplateController.create(req, res));
router.get("/:id", (req, res) => reportTemplateController.findById(req, res));
router.put("/:id", (req, res) => reportTemplateController.update(req, res));
router.delete("/:id", (req, res) => reportTemplateController.delete(req, res));
router.get("/:id/generate", (req, res) => reportTemplateController.generate(req, res));

export default router;
