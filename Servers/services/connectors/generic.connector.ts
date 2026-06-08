import { ConnectorAdapter, ConnectorConfig, CollectedEvidence } from "./connector.registry";

export class GenericApiConnector implements ConnectorAdapter {
  type = "generic_api";
  name = "Generic API";
  description = "Connect to any REST API to collect custom evidence using configurable HTTP requests";
  icon = "api";

  getSupportedControls(): string[] {
    return [];
  }

  async testConnection(config: ConnectorConfig): Promise<{ success: boolean; message: string }> {
    if (!config.endpoint) {
      return { success: false, message: "API endpoint URL is required" };
    }
    return { success: true, message: `Generic API endpoint configured: ${config.endpoint}` };
  }

  async collectEvidence(config: ConnectorConfig): Promise<CollectedEvidence[]> {
    if (!config.endpoint) {
      return [];
    }

    return [
      {
        title: "Generic API Health Check",
        description: "Custom API endpoint health check result",
        evidenceType: "config_check",
        status: "unknown",
        details: {
          endpoint: config.endpoint,
          method: config.method || "GET",
          headers: Object.keys((config.headers as Record<string, string>) || {}),
        },
        timestamp: new Date(),
        matchedControlCodes: [],
      },
    ];
  }
}
