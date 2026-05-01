import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { riskCategoryController } from "../controllers/riskCategory.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/tree", (req, res) => riskCategoryController.findTree(req, res));
router.post("/seed-defaults", (req, res) => riskCategoryController.seedDefaults(req, res));
router.get("/", (req, res) => riskCategoryController.findAll(req, res));
router.post("/", (req, res) => riskCategoryController.create(req, res));
router.get("/:id", (req, res) => riskCategoryController.findById(req, res));
router.put("/:id", (req, res) => riskCategoryController.update(req, res));
router.delete("/:id", (req, res) => riskCategoryController.delete(req, res));

export default router;
