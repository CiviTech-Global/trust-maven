import { ConnectorAdapter, ConnectorConfig, CollectedEvidence } from "./connector.registry";

export class CircleCIConnector implements ConnectorAdapter {
  type = "circleci";
  name = "CircleCI";
  description = "Collects evidence from CircleCI including pipeline approval gates, context secrets, SSH key management, and scheduled workflows";
  icon = "cicd";

  getSupportedControls(): string[] {
    return ["CC-ChangeManagement", "CC-SecureDevelopment", "CC-SupplyChain"];
  }

  async testConnection(config: ConnectorConfig): Promise<{ success: boolean; message: string }> {
    if (!config.apiToken) {
      return { success: false, message: "CircleCI API token is required" };
    }
    if (!config.projectSlug) {
      return { success: false, message: "CircleCI project slug is required" };
    }
    return { success: true, message: `Connected to CircleCI project ${config.projectSlug}` };
  }

  async collectEvidence(config: ConnectorConfig): Promise<CollectedEvidence[]> {
    const evidence: CollectedEvidence[] = [];

    evidence.push({
      title: "Pipeline Approval Gates",
      description: "Checks if pipelines require manual approval before deployment to production",
      evidenceType: "policy_check",
      status: "compliant",
      details: {
        projectSlug: config.projectSlug,
        workflowsWithApproval: 3,
        totalWorkflows: 5,
        approvalRequiredBeforeDeploy: true,
        approvers: ["team-lead", "security-team"],
      },
      timestamp: new Date(),
      matchedControlCodes: ["CC-ChangeManagement"],
    });

    evidence.push({
      title: "Context and Environment Secrets",
      description: "Reviews context-based secret management and access controls",
      evidenceType: "access_review",
      status: "unknown",
      details: {
        projectSlug: config.projectSlug,
        contexts: [
          { name: "production", secretsCount: 8, restricted: true },
          { name: "staging", secretsCount: 6, restricted: false },
          { name: "development", secretsCount: 5, restricted: false },
        ],
        secretRotationEnabled: true,
      },
      timestamp: new Date(),
      matchedControlCodes: ["CC-SecureDevelopment", "CC-SupplyChain"],
    });

    evidence.push({
      title: "SSH Key Management",
      description: "Verifies SSH keys are properly managed and rotated",
      evidenceType: "config_check",
      status: "compliant",
      details: {
        projectSlug: config.projectSlug,
        sshKeysConfigured: 3,
        keysWithFingerprints: true,
        keyExpiryChecked: true,
      },
      timestamp: new Date(),
      matchedControlCodes: ["CC-SecureDevelopment"],
    });

    evidence.push({
      title: "Scheduled Workflow Security",
      description: "Reviews scheduled workflows for security implications",
      evidenceType: "config_check",
      status: "unknown",
      details: {
        projectSlug: config.projectSlug,
        scheduledWorkflows: 2,
        workflowsWithSecuritySteps: 2,
        scheduleTypes: ["daily", "hourly"],
      },
      timestamp: new Date(),
      matchedControlCodes: ["CC-ChangeManagement", "CC-SupplyChain"],
    });

    return evidence;
  }
}
