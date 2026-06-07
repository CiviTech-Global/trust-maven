import jwt from "jsonwebtoken";
import { Strategy as SamlStrategy } from "passport-saml";
import { generators } from "openid-client";
import { Organization } from "../domain.layer/models/organization/organization.model";
import { User } from "../domain.layer/models/user/user.model";
import { Role } from "../domain.layer/models/role/role.model";
import { JwtPayload, UserRole } from "../types";
import { logger } from "../utils/logger";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export interface SamlConfig {
  enabled: boolean;
  entryPoint: string;
  issuer: string;
  cert: string;
  acsUrl: string;
  defaultRole?: string;
}

export interface OidcConfig {
  enabled: boolean;
  discoveryUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  defaultRole?: string;
}

export interface SsoSettings {
  saml?: SamlConfig;
  oidc?: OidcConfig;
}

export class SsoService {
  async getSsoSettings(organizationId: string): Promise<SsoSettings> {
    const org = await Organization.findByPk(organizationId, {
      attributes: ["settings"],
    });
    if (!org) throw new Error("Organization not found");
    return (org.settings?.sso as SsoSettings) || {};
  }

  async saveSsoSettings(
    organizationId: string,
    settings: SsoSettings,
    userId: string
  ): Promise<void> {
    const org = await Organization.findByPk(organizationId);
    if (!org) throw new Error("Organization not found");

    const currentSettings = (org.settings || {}) as Record<string, unknown>;
    currentSettings.sso = settings;
    await org.update({ settings: currentSettings });

    logger.info(
      `SSO settings updated for org ${organizationId} by user ${userId}`
    );
  }

  /** Find organization by slug in domain or exact slug — for email-based lookup */
  async findOrgByEmail(email: string): Promise<Organization | null> {
    const domain = email.split("@")[1];
    if (!domain) return null;

    const org = await Organization.findOne({
      where: {
        slug: domain.split(".")[0],
      },
    });
    return org;
  }

  async handleSamlResponse(
    profile: { nameID?: string; email?: string; firstName?: string; lastName?: string; [key: string]: unknown },
    organizationId: string
  ) {
    const email = profile.email || profile.nameID;
    if (!email) throw new Error("SAML response missing email");

    let user = await User.findOne({
      where: { email, organizationId },
      include: [{ model: Role }],
    });

    const settings = await this.getSsoSettings(organizationId);
    const samlSettings = settings.saml;

    if (!user) {
      if (!samlSettings?.enabled) throw new Error("SSO not enabled for this organization");

      let defaultRole = await Role.findOne({
        where: { name: (samlSettings.defaultRole as UserRole) || UserRole.VIEWER },
      });
      if (!defaultRole) {
        defaultRole = await Role.create({
          name: UserRole.VIEWER,
          description: "Default viewer role",
          permissions: ["read"],
        });
      }

      user = await User.create({
        email,
        firstName: profile.firstName || email.split("@")[0],
        lastName: profile.lastName || "",
        passwordHash: crypto.randomUUID(),
        organizationId,
        roleId: defaultRole.id,
        isActive: true,
      });
    }

    await user.update({ lastLogin: new Date() });

    return this.generateTokens({
      userId: user.id,
      email: user.email,
      organizationId: user.organizationId,
      role: user.role?.name as UserRole,
    });
  }

  async handleOidcCallback(
    userInfo: { sub: string; email?: string; name?: string; given_name?: string; family_name?: string },
    organizationId: string
  ) {
    const email = userInfo.email || `${userInfo.sub}@sso.local`;
    let user = await User.findOne({
      where: { email, organizationId },
      include: [{ model: Role }],
    });

    if (!user) {
      let defaultRole = await Role.findOne({
        where: { name: UserRole.VIEWER },
      });
      if (!defaultRole) {
        defaultRole = await Role.create({
          name: UserRole.VIEWER,
          description: "Default viewer role",
          permissions: ["read"],
        });
      }

      user = await User.create({
        email,
        firstName: userInfo.given_name || userInfo.name?.split(" ")[0] || email.split("@")[0],
        lastName: userInfo.family_name || userInfo.name?.split(" ").slice(1).join(" ") || "",
        passwordHash: crypto.randomUUID(),
        organizationId,
        roleId: defaultRole.id,
        isActive: true,
      });
    }

    await user.update({ lastLogin: new Date() });

    return this.generateTokens({
      userId: user.id,
      email: user.email,
      organizationId: user.organizationId,
      role: user.role?.name as UserRole,
    });
  }

  private generateTokens(payload: JwtPayload) {
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "24h",
    } as jwt.SignOptions);

    const refreshToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "7d",
    } as jwt.SignOptions);

    return { accessToken, refreshToken };
  }
}

export const ssoService = new SsoService();
