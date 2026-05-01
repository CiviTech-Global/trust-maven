# SSO Implementation Plan (Phase 3a — Deferred)

> **Status:** Documented — implementation deferred to a dedicated sprint.
> This plan captures the architectural approach for SSO so it can be implemented without additional discovery.

---

## Overview

TrustMaven will support enterprise SSO via both SAML 2.0 and OpenID Connect (OIDC), enabling organizations to authenticate users through their corporate identity provider (IdP). This is a hard requirement for enterprise procurement — many organizations prohibit password-based authentication for SaaS tools.

---

## Technology Stack

| Component | Library | Purpose |
|-----------|---------|---------|
| SAML 2.0 | `passport-saml` | SAML assertion parsing, SP metadata generation |
| OIDC | `openid-client` | OIDC discovery, token exchange, userinfo |
| Session bridge | Existing JWT system | Convert SSO assertion → JWT access/refresh tokens |

---

## Architecture

### Organization-Level SSO Configuration

SSO is configured per-organization via the existing `settings` JSONB column on the `Organization` model:

```jsonb
{
  "sso": {
    "enabled": true,
    "protocol": "saml" | "oidc",
    "saml": {
      "entryPoint": "https://idp.example.com/sso/saml",
      "issuer": "trustmaven-sp",
      "cert": "-----BEGIN CERTIFICATE-----\n...",
      "callbackUrl": "https://app.trustmaven.com/api/auth/saml/callback"
    },
    "oidc": {
      "issuer": "https://accounts.google.com",
      "clientId": "...",
      "clientSecret": "...(encrypted)...",
      "callbackUrl": "https://app.trustmaven.com/api/auth/oidc/callback",
      "scopes": ["openid", "profile", "email"]
    },
    "jitProvisioning": true,
    "defaultRoleId": "<uuid-of-viewer-role>",
    "enforced": false
  }
}
```

### Authentication Flow

1. **Initiation:** User visits `/auth/sso/:orgSlug` → backend looks up org SSO config
2. **Redirect:** Backend redirects to IdP (SAML AuthnRequest or OIDC authorization URL)
3. **Callback:** IdP posts back to `/api/auth/saml/callback` or `/api/auth/oidc/callback`
4. **User Resolution:**
   - Look up user by email + organizationId
   - If not found and `jitProvisioning` is enabled → create user with `defaultRoleId`
   - If not found and JIT disabled → reject with "User not provisioned"
5. **Token Issuance:** Generate JWT access + refresh tokens (same as password auth)
6. **Redirect:** Send user to frontend with tokens set in cookies

### JIT (Just-In-Time) User Provisioning

When enabled, users authenticating via SSO for the first time are automatically created:
- Email from SAML NameID or OIDC email claim
- First/last name from SAML attributes or OIDC profile claims
- Role set to organization's `defaultRoleId` (typically "viewer")
- `isActive` set to `true`
- No password hash (SSO-only users cannot use password login)

---

## New Routes

```
GET  /api/auth/sso/:orgSlug          → Initiate SSO flow
POST /api/auth/saml/callback          → SAML assertion consumer service (ACS)
GET  /api/auth/oidc/callback          → OIDC authorization code callback
GET  /api/auth/saml/metadata/:orgSlug → SP metadata XML for SAML configuration
```

---

## Admin Configuration UI

A new "SSO" section in Organization Settings:
- Toggle SSO enabled/disabled
- Select protocol (SAML / OIDC)
- SAML fields: IdP Entry Point URL, IdP Certificate (paste), Entity ID
- OIDC fields: Issuer URL, Client ID, Client Secret
- JIT provisioning toggle + default role selector
- "Enforce SSO" toggle (disables password login for non-admin users)
- Test connection button
- Download SP metadata (SAML)

---

## Security Considerations

- IdP certificates stored encrypted in the database
- OIDC client secrets encrypted at rest
- SAML responses validated: signature, audience, timestamps, replay prevention
- OIDC: PKCE flow for additional security where supported
- Rate limiting on SSO initiation endpoints
- SSO session lifetime matches IdP session (configurable)
- Admin accounts can always fall back to password auth (prevent lockout)

---

## Migration Path

- Existing password-based users continue working unchanged
- Organizations enable SSO via settings — it's additive, not disruptive
- "Enforce SSO" mode is opt-in and excludes super_admin/admin roles
- No database migration required (uses existing JSONB settings column)

---

## Implementation Estimate

- Backend routes + SAML integration: 1 sprint
- OIDC integration: 0.5 sprint
- Admin UI for SSO configuration: 0.5 sprint
- Testing with real IdPs (Okta, Azure AD, Google Workspace): 1 sprint
- **Total: ~3 sprints**

---

## Dependencies

- `passport-saml` npm package
- `openid-client` npm package
- Encryption utility for storing secrets (can use existing Node.js crypto)
- Test IdP accounts (Okta developer, Azure AD free tier)
