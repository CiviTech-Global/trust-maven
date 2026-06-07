import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { mfaController } from "../controllers/mfa.ctrl";

const router = Router();

router.get("/status", authenticate, (req, res) => mfaController.status(req, res));
router.post("/setup", authenticate, (req, res) => mfaController.setup(req, res));
router.post("/enable", authenticate, (req, res) => mfaController.enable(req, res));
router.post("/disable", authenticate, (req, res) => mfaController.disable(req, res));
router.post("/verify", (req, res) => mfaController.verify(req, res));

export default router;
