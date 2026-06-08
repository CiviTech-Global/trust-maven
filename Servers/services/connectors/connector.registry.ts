export interface ConnectorConfig {
  endpoint?: string;
  apiKey?: string;
  secret?: string;
  region?: string;
  organization?: string;
  accountId?: string;
  domain?: string;
  [key: string]: unknown;
}

export interface CollectedEvidence {
  title: string;
  description: string;
  evidenceType: "config_check" | "policy_check" | "access_review" | "log_analysis";
  status: "compliant" | "non_compliant" | "unknown";
  details: Record<string, unknown>;
  timestamp: Date;
  matchedControlCodes?: string[];
}

export interface ConnectorAdapter {
  type: string;
  name: string;
  description: string;
  icon: string;
  testConnection(config: ConnectorConfig): Promise<{ success: boolean; message: string }>;
  collectEvidence(config: ConnectorConfig): Promise<CollectedEvidence[]>;
  getSupportedControls(): string[];
}

import { AwsConnector } from "./aws.connector";
import { GitHubConnector } from "./github.connector";
import { OktaConnector } from "./okta.connector";
import { GenericApiConnector } from "./generic.connector";
import { GcpConnector } from "./gcp.connector";
import { AzureConnector } from "./azure.connector";
import { GitLabConnector } from "./gitlab.connector";
import { SlackConnector } from "./slack.connector";
import { DatadogConnector } from "./datadog.connector";
import { KubernetesConnector } from "./kubernetes.connector";
import { DockerConnector } from "./docker.connector";
import { PagerDutyConnector } from "./pagerduty.connector";
import { TerraformConnector } from "./terraform.connector";
import { SentryConnector } from "./sentry.connector";
import { CircleCIConnector } from "./circleci.connector";
import { CloudflareConnector } from "./cloudflare.connector";
import { JiraConnector } from "./jira.connector";
import { ServiceNowConnector } from "./servicenow.connector";

const connectors: Map<string, ConnectorAdapter> = new Map();

function register(connector: ConnectorAdapter): void {
  connectors.set(connector.type, connector);
}

register(new AwsConnector());
register(new GitHubConnector());
register(new OktaConnector());
register(new GenericApiConnector());
register(new GcpConnector());
register(new AzureConnector());
register(new GitLabConnector());
register(new SlackConnector());
register(new DatadogConnector());
register(new KubernetesConnector());
register(new DockerConnector());
register(new PagerDutyConnector());
register(new TerraformConnector());
register(new SentryConnector());
register(new CircleCIConnector());
register(new CloudflareConnector());
register(new JiraConnector());
register(new ServiceNowConnector());

export function getConnector(type: string): ConnectorAdapter | undefined {
  return connectors.get(type);
}

export function getAllConnectors(): ConnectorAdapter[] {
  return Array.from(connectors.values());
}

export function getRegisteredTypes(): string[] {
  return Array.from(connectors.keys());
}

export interface ConnectorHealth {
  type: string;
  name: string;
  registered: boolean;
  controlCount: number;
  description: string;
}

export function getConnectorHealth(): ConnectorHealth[] {
  return Array.from(connectors.values()).map((c) => ({
    type: c.type,
    name: c.name,
    registered: true,
    controlCount: c.getSupportedControls().length,
    description: c.description,
  }));
}
