import { z } from "zod";

export const samlConfigSchema = z.object({
  enabled: z.boolean(),
  entryPoint: z.string().url("SAML entry point must be a valid URL"),
  issuer: z.string().min(1, "Issuer is required"),
  cert: z.string().min(1, "Certificate is required"),
  acsUrl: z.string().url("ACS URL must be a valid URL").optional(),
  defaultRole: z.string().optional(),
});

export const oidcConfigSchema = z.object({
  enabled: z.boolean(),
  discoveryUrl: z.string().url("OIDC discovery URL must be a valid URL"),
  clientId: z.string().min(1, "Client ID is required"),
  clientSecret: z.string().min(1, "Client secret is required"),
  redirectUrl: z.string().url("Redirect URL must be a valid URL"),
  defaultRole: z.string().optional(),
});

export const ssoConfigSchema = z.object({
  saml: samlConfigSchema.optional(),
  oidc: oidcConfigSchema.optional(),
});

export const ssoLoginSchema = z.object({
  email: z.string().email("Valid email is required"),
});

export const samlCallbackSchema = z.object({
  SAMLResponse: z.string().min(1, "SAMLResponse is required"),
  organizationId: z.string().uuid("Invalid organization ID"),
  email: z.string().email().optional(),
});

export const oidcCallbackSchema = z.object({
  code: z.string().min(1, "Authorization code is required"),
  organizationId: z.string().uuid("Invalid organization ID"),
});
