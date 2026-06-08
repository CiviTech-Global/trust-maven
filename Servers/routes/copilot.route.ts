import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { copilotController } from "../controllers/copilot.ctrl";

const router = Router();
router.use(authenticate, tenantIsolation);
router.post("/query", (req, res) => copilotController.query(req, res));
router.get("/suggestions", (req, res) => copilotController.getSuggestions(req, res));

export default router;
