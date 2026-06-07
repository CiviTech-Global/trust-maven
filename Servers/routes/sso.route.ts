import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { ssoController } from "../controllers/sso.ctrl";
import { UserRole } from "../types";

const router = Router();

// SSO config management (admin only)
router.get("/config", authenticate, authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN), (req, res) => ssoController.getConfig(req, res));
router.put("/config", authenticate, authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN), (req, res) => ssoController.saveConfig(req, res));

// SSO login flow
router.post("/login", (req, res) => ssoController.initiateLogin(req, res));
router.post("/saml/callback", (req, res) => ssoController.samlCallback(req, res));
router.post("/oidc/callback", (req, res) => ssoController.oidcCallback(req, res));

export default router;
