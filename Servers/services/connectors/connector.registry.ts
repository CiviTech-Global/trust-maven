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

const connectors: Map<string, ConnectorAdapter> = new Map();

function register(connector: ConnectorAdapter): void {
  connectors.set(connector.type, connector);
}

register(new AwsConnector());
register(new GitHubConnector());
register(new OktaConnector());
register(new GenericApiConnector());

export function getConnector(type: string): ConnectorAdapter | undefined {
  return connectors.get(type);
}

export function getAllConnectors(): ConnectorAdapter[] {
  return Array.from(connectors.values());
}

export function getRegisteredTypes(): string[] {
  return Array.from(connectors.keys());
}
