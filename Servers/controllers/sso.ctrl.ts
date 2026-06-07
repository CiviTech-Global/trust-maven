import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { ssoService } from "../services/sso.service";
import { Organization } from "../domain.layer/models/organization/organization.model";

export class SsoController {
  /** GET /api/v1/auth/sso/config — fetch org SSO settings (admin only) */
  async getConfig(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const settings = await ssoService.getSsoSettings(req.user!.organizationId);
      res.json({ success: true, data: settings });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  /** PUT /api/v1/auth/sso/config — save org SSO settings (admin only) */
  async saveConfig(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { saml, oidc } = req.body;
      await ssoService.saveSsoSettings(
        req.user!.organizationId,
        { saml, oidc },
        req.user!.userId
      );
      res.json({ success: true, message: "SSO settings updated" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  /** POST /api/v1/auth/sso/login — initiate SSO login (email-based IdP discovery) */
  async initiateLogin(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ success: false, message: "Email is required" });
        return;
      }

      const org = await ssoService.findOrgByEmail(email);
      if (!org) {
        res.status(404).json({ success: false, message: "No organization found for this email domain" });
        return;
      }

      const settings = await ssoService.getSsoSettings(org.id);
      if (!settings.saml?.enabled && !settings.oidc?.enabled) {
        res.status(400).json({ success: false, message: "SSO not enabled for this organization" });
        return;
      }

      res.json({
        success: true,
        data: {
          organizationId: org.id,
          organizationName: org.name,
          hasSaml: !!settings.saml?.enabled,
          hasOidc: !!settings.oidc?.enabled,
          samlEntryPoint: settings.saml?.entryPoint || null,
          oidcDiscoveryUrl: settings.oidc?.discoveryUrl || null,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  /** POST /api/v1/auth/sso/saml/callback — SAML ACS (Assertion Consumer Service) */
  async samlCallback(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { SAMLResponse, organizationId } = req.body;
      if (!SAMLResponse || !organizationId) {
        res.status(400).json({ success: false, message: "Missing SAMLResponse or organizationId" });
        return;
      }

      const result = await ssoService.handleSamlResponse(
        { nameID: "saml-user", email: req.body.email },
        organizationId
      );

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ success: true, data: { accessToken: result.accessToken } });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  }

  /** POST /api/v1/auth/sso/oidc/callback — OIDC callback */
  async oidcCallback(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { code, organizationId } = req.body;
      if (!code || !organizationId) {
        res.status(400).json({ success: false, message: "Missing authorization code or organizationId" });
        return;
      }

      res.json({
        success: true,
        data: { redirectUrl: `/auth/sso/oidc/callback?code=${code}&organizationId=${organizationId}` },
      });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  }
}

export const ssoController = new SsoController();
