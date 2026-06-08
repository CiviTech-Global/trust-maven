import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { entityController } from "../controllers/entity.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/tree", (req, res) => entityController.getTree(req, res));
router.get("/", (req, res) => entityController.findAll(req, res));
router.post("/", (req, res) => entityController.create(req, res));
router.get("/:id", (req, res) => entityController.findById(req, res));
router.put("/:id", (req, res) => entityController.update(req, res));
router.delete("/:id", (req, res) => entityController.delete(req, res));
router.get("/:id/ancestors", (req, res) => entityController.getAncestors(req, res));
router.post("/:id/rollup", (req, res) => entityController.rollupScore(req, res));
router.post("/:id/link-risk", (req, res) => entityController.linkRisk(req, res));
router.get("/:id/risks", (req, res) => entityController.getLinkedRisks(req, res));

export default router;
