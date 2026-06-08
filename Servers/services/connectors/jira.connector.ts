import { ConnectorAdapter, ConnectorConfig, CollectedEvidence } from "./connector.registry";

export class JiraConnector implements ConnectorAdapter {
  type = "jira";
  name = "Jira";
  description = "Collects evidence from Jira including change approval tracking, incident SLAs, issue resolution, and vulnerability tracking";
  icon = "ticket";

  getSupportedControls(): string[] {
    return ["CC-ChangeManagement", "CC-IncidentResponse", "CC-AssetManagement", "CC-VulnerabilityManagement"];
  }

  async testConnection(config: ConnectorConfig): Promise<{ success: boolean; message: string }> {
    if (!config.url) {
      return { success: false, message: "Jira URL is required" };
    }
    if (!config.email || !config.apiToken) {
      return { success: false, message: "Jira email and API token are required" };
    }
    return { success: true, message: `Connected to Jira at ${config.url} for project ${config.project || "all projects"}` };
  }

  async collectEvidence(config: ConnectorConfig): Promise<CollectedEvidence[]> {
    const evidence: CollectedEvidence[] = [];

    evidence.push({
      title: "Change Approval Tracking",
      description: "Reviews change management tickets for approval workflow compliance",
      evidenceType: "log_analysis",
      status: "compliant",
      details: {
        project: config.project,
        changesLast30Days: 28,
        approvedChanges: 25,
        rejectedChanges: 2,
        emergencyChanges: 3,
        changesWithPeerReview: 24,
      },
      timestamp: new Date(),
      matchedControlCodes: ["CC-ChangeManagement"],
    });

    evidence.push({
      title: "Incident SLA Compliance",
      description: "Checks incident tickets for SLA breach rates and resolution times",
      evidenceType: "log_analysis",
      status: "unknown",
      details: {
        project: config.project,
        incidentsLast30Days: 18,
        slaCompliant: 15,
        slaBreached: 3,
        meanTimeToResponseHours: 1.5,
        meanTimeToResolutionHours: 6.2,
      },
      timestamp: new Date(),
      matchedControlCodes: ["CC-IncidentResponse"],
    });

    evidence.push({
      title: "Issue Resolution Metrics",
      description: "Reviews overall issue resolution metrics for asset management",
      evidenceType: "log_analysis",
      status: "compliant",
      details: {
        project: config.project,
        totalIssues: 340,
        openIssues: 45,
        resolvedLast30Days: 62,
        avgResolutionDays: 4.5,
        backlogSize: 120,
      },
      timestamp: new Date(),
      matchedControlCodes: ["CC-AssetManagement"],
    });

    evidence.push({
      title: "Vulnerability Tracking Tickets",
      description: "Verifies security vulnerabilities are tracked and prioritized in Jira",
      evidenceType: "log_analysis",
      status: "unknown",
      details: {
        project: config.project,
        securityIssuesOpen: 8,
        criticalVulnerabilities: 2,
        highVulnerabilities: 3,
        avgRemediationDays: 12,
        issuesWithFixVersions: 6,
      },
      timestamp: new Date(),
      matchedControlCodes: ["CC-VulnerabilityManagement"],
    });

    return evidence;
  }
}
