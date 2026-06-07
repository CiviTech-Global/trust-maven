import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { policyController } from "../controllers/policy.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/", (req, res) => policyController.findAll(req, res));
router.post("/", (req, res) => policyController.create(req, res));
router.get("/:id", (req, res) => policyController.findById(req, res));
router.put("/:id", (req, res) => policyController.update(req, res));
router.delete("/:id", (req, res) => policyController.delete(req, res));

export default router;
