#!/usr/bin/env node
/**
 * Connector Generator — scaffolds a new TrustMaven connector file
 * Usage: node generateConnector.js --type=my_service --name="My Service" --controls=CC-AccessControl,CC-Logging
 */
const fs = require("fs");
const path = require("path");

const args = {};
process.argv.slice(2).forEach((arg) => {
  const [key, val] = arg.replace(/^--/, "").split("=");
  args[key] = val;
});

if (!args.type || !args.name) {
  console.error("Usage: node generateConnector.js --type=<type> --name=\"<Name>\" [--controls=CC-XXX,CC-YYY] [--icon=<icon>]");
  process.exit(1);
}

const type = args.type.toLowerCase().replace(/[^a-z0-9_]/g, "_");
const name = args.name;
const pascalName = type.split(/[_-]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("");
const controls = (args.controls || "CC-AccessControl,CC-Logging").split(",").map(s => s.trim());
const icon = args.icon || "cloud";
const className = pascalName + "Connector";

const template = `import { ConnectorAdapter, ConnectorConfig, CollectedEvidence } from "./connector.registry";

export class ${className} implements ConnectorAdapter {
  type = "${type}";
  name = "${name}";
  description = "Collects evidence from ${name}";
  icon = "${icon}";

  getSupportedControls(): string[] {
    return [${controls.map(c => `"${c}"`).join(", ")}];
  }

  async testConnection(config: ConnectorConfig): Promise<{ success: boolean; message: string }> {
    if (!config.apiKey) {
      return { success: false, message: "${name} API key is required" };
    }
    return { success: true, message: "Connected to ${name}" };
  }

  async collectEvidence(config: ConnectorConfig): Promise<CollectedEvidence[]> {
    const evidence: CollectedEvidence[] = [];

    evidence.push({
      title: "${name} Configuration Check",
      description: "Verifies ${name} baseline security configuration",
      evidenceType: "config_check",
      status: "unknown",
      details: { source: "${type}" },
      timestamp: new Date(),
      matchedControlCodes: [${controls.slice(0, 2).map(c => `"${c}"`).join(", ")}],
    });

    evidence.push({
      title: "${name} Security Policy Review",
      description: "Reviews security policies configured in ${name}",
      evidenceType: "policy_check",
      status: "unknown",
      details: { source: "${type}" },
      timestamp: new Date(),
      matchedControlCodes: [${controls.slice(0, 2).map(c => `"${c}"`).join(", ")}],
    });

    evidence.push({
      title: "${name} Activity Log Review",
      description: "Reviews recent activity logs from ${name}",
      evidenceType: "log_analysis",
      status: "unknown",
      details: { source: "${type}", logEntries: 0 },
      timestamp: new Date(),
      matchedControlCodes: [${controls.slice(0, 2).map(c => `"${c}"`).join(", ")}],
    });

    return evidence;
  }
}
`;

const connectorsDir = path.join(__dirname, "..", "services", "connectors");
const filePath = path.join(connectorsDir, `${type}.connector.ts`);

if (fs.existsSync(filePath)) {
  console.error(`File already exists: ${filePath}`);
  process.exit(1);
}

fs.writeFileSync(filePath, template);
console.log(`✓ Connector created: ${filePath}`);
console.log("");
console.log("Next steps:");
console.log(`  1. Edit ${filePath} to add real evidence collection logic`);
console.log(`  2. Register in ${path.join(connectorsDir, "connector.registry.ts")}:`);
console.log(`     import { ${className} } from "./${type}.connector";`);
console.log(`     register(new ${className}());`);
console.log(`  3. Add config fields in Clients/src/presentation/pages/Integrations/IntegrationsPage.tsx`);
