import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { regulationCatalogController } from "../controllers/regulationCatalog.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/", (req, res) =>
  regulationCatalogController.findAll(req, res));
router.get("/overlap/:id1/:id2", (req, res) =>
  regulationCatalogController.getOverlap(req, res));
router.get("/:id", (req, res) =>
  regulationCatalogController.findById(req, res));
router.get("/:id/requirements", (req, res) =>
  regulationCatalogController.getRequirements(req, res));
router.get("/:id/requirements/:reqId", (req, res) =>
  regulationCatalogController.getRequirement(req, res));

export default router;
