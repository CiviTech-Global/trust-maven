import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { workflowController } from "../controllers/workflow.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/", (req, res) => workflowController.findAll(req, res));
router.post("/", (req, res) => workflowController.create(req, res));
router.get("/default/:entityType", (req, res) => workflowController.getDefaultForType(req, res));
router.get("/:id", (req, res) => workflowController.findById(req, res));
router.put("/:id", (req, res) => workflowController.update(req, res));
router.delete("/:id", (req, res) => workflowController.delete(req, res));
router.post("/:id/clone", (req, res) => workflowController.clone(req, res));
router.post("/:id/set-default", (req, res) => workflowController.setDefault(req, res));
router.get("/:id/export", (req, res) => workflowController.exportWorkflow(req, res));
router.post("/import", (req, res) => workflowController.importWorkflow(req, res));
router.post("/validate", (req, res) => workflowController.validateWorkflow(req, res));
router.get("/:id/transitions", (req, res) => workflowController.getTransitions(req, res));
router.post("/:id/execute", (req, res) => workflowController.executeTransition(req, res));
router.get("/:id/history", (req, res) => workflowController.getExecutionHistory(req, res));

export default router;
