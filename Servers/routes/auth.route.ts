import { Router } from "express";
import { authController } from "../controllers/auth.ctrl";
import { authenticate } from "../middleware/auth.middleware";
import { authRateLimit } from "../middleware/rateLimit.middleware";

const router = Router();

router.post("/register", authRateLimit, (req, res) =>
  authController.register(req, res)
);
router.post("/login", authRateLimit, (req, res) =>
  authController.login(req, res)
);
router.post("/mfa/complete", authRateLimit, (req, res) =>
  authController.completeMfa(req, res)
);
router.get("/me", authenticate, (req, res) =>
  authController.me(req, res)
);
router.post("/refresh", (req, res) =>
  authController.refresh(req, res)
);
router.post("/logout", (req, res) =>
  authController.logout(req, res)
);
router.post("/forgot-password", authRateLimit, (req, res) =>
  authController.forgotPassword(req, res)
);
router.post("/reset-password", authRateLimit, (req, res) =>
  authController.resetPassword(req, res)
);

export default router;
