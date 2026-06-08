# Connector Developer Guide

TrustMaven's connector system allows you to create new SaaS/infrastructure integrations by writing a single file.

## Quick Start

```bash
node Servers/scripts/generateConnector.js --type=my_service --name="My Service" --controls=CC-AccessControl,CC-Logging
```

## Anatomy of a Connector

Every connector implements the `ConnectorAdapter` interface from `connector.registry.ts`:

```typescript
interface ConnectorAdapter {
  type: string;                    // unique identifier (e.g., "aws", "github")
  name: string;                    // display name (e.g., "Amazon Web Services")
  description: string;             // what this connector does
  icon: string;                    // Material UI icon name
  
  // Returns the list of common control codes this connector can produce evidence for
  getSupportedControls(): string[];
  
  // Test if credentials/config are valid
  testConnection(config: ConnectorConfig): Promise<{ success: boolean; message: string }>;
  
  // Collect evidence items from the service
  collectEvidence(config: ConnectorConfig): Promise<CollectedEvidence[]>;
}
```

## Evidence Items

Each `CollectedEvidence` requires:
- `title` — short human-readable name
- `description` — what was checked
- `evidenceType` — one of: config_check, policy_check, access_review, log_analysis
- `status` — compliant, non_compliant, or unknown
- `details` — any structured data to include (logged as evidence metadata)
- `timestamp` — when collected
- `matchedControlCodes` — array of Common Control codes this evidence maps to (e.g., ["CC-AccessControl"])

## Available Common Controls

| Code | Domain |
|------|--------|
| CC-AccessControl | Access Control |
| CC-Logging | Logging & Monitoring |
| CC-Encryption | Encryption & Key Mgmt |
| CC-IAM | Identity & Access Mgmt |
| CC-ChangeManagement | Change Management |
| CC-SecureDevelopment | Secure Development |
| CC-VulnerabilityManagement | Vulnerability Mgmt |
| CC-Authentication | Authentication |
| CC-BusinessContinuity | Business Continuity |
| CC-IncidentResponse | Incident Response |
| CC-AssetManagement | Asset Management |
| CC-DataProtection | Data Protection |
| CC-NetworkSecurity | Network Security |
| CC-ConfigurationManagement | Configuration Mgmt |
| CC-Monitoring | Monitoring |
| CC-AuditLogs | Audit Logs |
| CC-Backup | Backup & Recovery |
| CC-Recovery | Recovery |
| CC-CapacityManagement | Capacity Management |
| CC-ServiceLevel | Service Level |
| CC-SupplyChain | Supply Chain |
| CC-ThreatIntelligence | Threat Intelligence |
| CC-Training | Training & Awareness |
| CC-PhysicalSecurity | Physical Security |
| CC-MobileDevice | Mobile Device |
| CC-CloudSecurity | Cloud Security |
| CC-ContainerSecurity | Container Security |
| CC-API-Security | API Security |
| CC-DataPrivacy | Data Privacy |
| CC-VendorManagement | Vendor Management |
| CC-RiskAssessment | Risk Assessment |

## Registration

After creating your connector file, register it in `connector.registry.ts`:

```typescript
import { MyServiceConnector } from "./my_service.connector";
register(new MyServiceConnector());
```

The connector will automatically appear in:
- GET /api/v1/integrations/connectors (available connector types)
- The frontend "Add Integration" dialog
- The evidence collection scheduler
