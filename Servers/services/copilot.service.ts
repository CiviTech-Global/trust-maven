import { Op, fn, col, literal } from "sequelize";
import { CommonControl } from "../domain.layer/models/commonControl/commonControl.model";
import { CommonControlMapping } from "../domain.layer/models/commonControlMapping/commonControlMapping.model";
import { CommonControlImplementation } from "../domain.layer/models/commonControlImplementation/commonControlImplementation.model";
import { RegulationDefinition } from "../domain.layer/models/regulationDefinition/regulationDefinition.model";
import { RegulationRequirement } from "../domain.layer/models/regulationRequirement/regulationRequirement.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { Vendor } from "../domain.layer/models/vendor/vendor.model";
import { Policy } from "../domain.layer/models/policy/policy.model";
import { Evidence } from "../domain.layer/models/evidence/evidence.model";
import { Integration } from "../domain.layer/models/integration/integration.model";
import { Entity } from "../domain.layer/models/entity/entity.model";
import { FairAnalysis } from "../domain.layer/models/fairAnalysis/fairAnalysis.model";
import { OrganizationRegulation } from "../domain.layer/models/organizationRegulation/organizationRegulation.model";
import { Audit } from "../domain.layer/models/audit/audit.model";
import { WorkflowExecution } from "../domain.layer/models/workflowExecution/workflowExecution.model";

type IntentCategory =
  | "framework_list"
  | "framework_detail"
  | "framework_requirements"
  | "framework_mappings"
  | "control_count"
  | "control_search"
  | "control_status"
  | "control_not_implemented"
  | "risk_list"
  | "risk_high_severity"
  | "risk_exposure"
  | "risk_by_entity"
  | "compliance_status"
  | "compliance_frameworks"
  | "compliance_gaps"
  | "completeness"
  | "evidence_list"
  | "evidence_recent"
  | "evidence_missing"
  | "vendor_list"
  | "vendor_high_risk"
  | "vendor_risk_status"
  | "policy_list"
  | "policy_review"
  | "policy_compliance"
  | "workflow_list"
  | "workflow_history"
  | "integration_list"
  | "integration_status"
  | "audit_list"
  | "help"
  | "unknown";

interface Intent {
  category: IntentCategory;
  keywords: string[];
  entityName?: string;
}

const DEFAULT_SUGGESTIONS = [
  "What frameworks do we have?",
  "Tell me about SOC 2",
  "What are the requirements for ISO 27001?",
  "How many controls are there?",
  "What controls cover encryption?",
  "Show me my control status",
  "Which controls are not implemented?",
  "What risks are we tracking?",
  "Show high severity risks",
  "What's our compliance status?",
  "Which frameworks are we compliant with?",
  "Show coverage gaps",
  "How complete is our control implementation?",
  "What evidence have we collected?",
  "Show recent evidence",
  "Which controls lack evidence?",
  "How many vendors do we have?",
  "Show high risk vendors",
  "Show our policies",
  "Which policies need review?",
  "What workflows are running?",
  "What integrations do we have?",
  "Show integration status",
  "What audits are planned?",
  "What can I ask you?",
];

function classifyIntent(query: string): Intent {
  const q = query.toLowerCase().trim();

  // Help
  if (/^(what can I ask|help|what does trustmaven)/i.test(q)) {
    return { category: "help", keywords: [] };
  }

  // Framework queries
  if (/(frameworks|regulations|standards)\s+(do we have|are there|exist|available|list)/i.test(q) ||
      /^(list|show|what)\s+(frameworks|regulations|standards)/i.test(q)) {
    return { category: "framework_list", keywords: extractKeywords(q) };
  }

  const frameworkMatch = q.match(/(?:tell me about|about|show|find)\s+(.+?)(?:\s+framework|\s+regulation|\s+standard|$)/i);
  if (frameworkMatch) {
    return { category: "framework_detail", keywords: [], entityName: frameworkMatch[1].trim() };
  }

  if (/(?:requirements|controls mapped|mappings).*?(?:for|of|in|to)\s+(.+)/i.test(q) ||
      /(.+?)\s+(?:requirements|controls mapped|mappings)/i.test(q)) {
    const m = /(?:for|of|in|to)\s+(.+?)$/i.exec(q) || /^(.+?)\s+(?:requirements|controls mapped|mappings)/i.exec(q);
    if (m) {
      return { category: "framework_requirements", keywords: [], entityName: m[1].trim() };
    }
  }

  if (/(?:how many|count).*?(?:frameworks|mappings).*?(?:access control|map to)/i.test(q) ||
      /map(ped)?\s+to\s+(access control|a\.c\.)/i.test(q)) {
    return { category: "framework_mappings", keywords: [], entityName: "access control" };
  }

  // Control queries
  if (/(?:how many|count).*?controls/i.test(q) && !/(?:not implemented|lack|missing)/i.test(q)) {
    return { category: "control_count", keywords: [] };
  }

  if (/(?:controls?|common controls?).*?(?:cover|related to|about|for)\s+(.+)/i.test(q)) {
    const m = /(?:cover|related to|about|for)\s+(.+?)$/i.exec(q);
    if (m) return { category: "control_search", keywords: [], entityName: m[1].trim() };
  }

  if (/(?:control|implementation)\s+(status|state)/i.test(q) ||
      /(?:show|what(?:'s| is)).*?control.*?status/i.test(q)) {
    return { category: "control_status", keywords: [] };
  }

  if (/(?:controls?|implementations?)\s+(not )?(?:implemented|started|done|complete)/i.test(q) ||
      /(?:not implemented|lack|missing|gaps?).*?control/i.test(q)) {
    return { category: "control_not_implemented", keywords: [] };
  }

  // Risk queries
  if (/(?:what|list|show).*?risks?\s+(?:are we tracking|exist|are there)/i.test(q) ||
      /^(?:list|show)\s+risks?/i.test(q)) {
    return { category: "risk_list", keywords: [] };
  }

  if (/(?:high|critical)\s+(?:severity|risk)/i.test(q) ||
      /risks?\s+(?:with|by)\s+(?:high|critical)\s+(?:severity|risk|level)/i.test(q)) {
    return { category: "risk_high_severity", keywords: [] };
  }

  if (/(?:risk\s+exposure|exposure|ale|annual\s+loss)/i.test(q)) {
    return { category: "risk_exposure", keywords: [] };
  }

  if (/(?:entities?|entity).*?(?:highest|most).*?risk/i.test(q) ||
      /risk.*?(?:by|per)\s+entit/i.test(q)) {
    return { category: "risk_by_entity", keywords: [] };
  }

  // Compliance queries
  if (/(?:what(?:'s| is)|show).*?(?:compliance|compliant)\s+(?:status|posture|state)/i.test(q) ||
      /how.*?(?:compliant|compliance)/i.test(q)) {
    return { category: "compliance_status", keywords: [] };
  }

  if (/(?:which|what)\s+frameworks?\s+(?:are we|we are)\s+compliant/i.test(q)) {
    return { category: "compliance_frameworks", keywords: [] };
  }

  if (/(?:coverage\s+gaps?|gaps?|what.*?missing)/i.test(q) &&
      /(?:coverage|complian|framework|control)/i.test(q)) {
    return { category: "compliance_gaps", keywords: [] };
  }

  if (/(?:how\s+complete|completeness|implementation\s+progress|control\s+implementation\s+status)/i.test(q)) {
    return { category: "completeness", keywords: [] };
  }

  // Evidence queries
  if (/(?:what|list|show).*?(?:evidence|artifacts?)\s+(?:do we have|collected|exist|available)/i.test(q) ||
      /^(?:list|show)\s+evidence/i.test(q)) {
    return { category: "evidence_list", keywords: [] };
  }

  if (/(?:recent|latest|new)\s+evidence/i.test(q)) {
    return { category: "evidence_recent", keywords: [] };
  }

  if (/(?:controls?\s+(?:without|lacking?|missing|no)\s+evidence|evidence\s+(?:gaps?|missing)|lacking?\s+evidence)/i.test(q)) {
    return { category: "evidence_missing", keywords: [] };
  }

  // Vendor queries
  if (/(?:how many|count|number of).*?vendors/i.test(q) ||
      /^(?:list|show)\s+vendors?$/i.test(q)) {
    return { category: "vendor_list", keywords: [] };
  }

  if (/(?:high|critical)\s+risk\s+vendors?/i.test(q) ||
      /vendors?\s+(?:with|by)\s+(?:high|critical)\s+risk/i.test(q)) {
    return { category: "vendor_high_risk", keywords: [] };
  }

  if (/(?:vendor\s+risk|vendor\s+status|vendor\s+assessment)/i.test(q)) {
    return { category: "vendor_risk_status", keywords: [] };
  }

  // Policy queries
  if (/(?:show|list|what).*?polic/i.test(q) &&
      !/(?:need review|compliance|review)/i.test(q)) {
    return { category: "policy_list", keywords: [] };
  }

  if (/(?:polic(?:y|ies)).*?(?:need|require|due|overdue).*(?:review|approval)/i.test(q) ||
      /(?:review|approve).*(?:polic)/i.test(q)) {
    return { category: "policy_review", keywords: [] };
  }

  if (/(?:policy|policies).*?(?:compliance|compliant|status)/i.test(q)) {
    return { category: "policy_compliance", keywords: [] };
  }

  // Workflow queries
  if (/(?:workflows?|automations?).*?(?:running|active|in progress|executing)/i.test(q)) {
    return { category: "workflow_list", keywords: [] };
  }

  if (/(?:workflow|execution).*?(?:history|log|previous|past)/i.test(q) ||
      /(?:show|list)\s+workflow\s+execution/i.test(q)) {
    return { category: "workflow_history", keywords: [] };
  }

  // Integration queries
  if (/(?:integrations?|connectors?).*?(?:do we have|exist|available|list)/i.test(q) ||
      /^(?:list|show)\s+integrations?/i.test(q)) {
    return { category: "integration_list", keywords: [] };
  }

  if (/(?:integration|connector)\s+(?:status|health|connected)/i.test(q)) {
    return { category: "integration_status", keywords: [] };
  }

  // Audit queries
  if (/(?:audits?|audit).*?(?:planned|scheduled|upcoming)/i.test(q) ||
      /^(?:list|show)\s+audits?/i.test(q)) {
    return { category: "audit_list", keywords: [] };
  }

  // Fallback: try to detect general patterns
  if (/(?:framework|regulation|standard)/i.test(q)) {
    return { category: "framework_list", keywords: [] };
  }
  if (/(?:control|implement)/i.test(q)) {
    return { category: "control_count", keywords: [] };
  }
  if (/(?:risk|threat|vulnerability)/i.test(q)) {
    return { category: "risk_list", keywords: [] };
  }
  if (/(?:complian|gap|cover)/i.test(q)) {
    return { category: "compliance_status", keywords: [] };
  }
  if (/(?:evidence|artifact)/i.test(q)) {
    return { category: "evidence_list", keywords: [] };
  }
  if (/(?:vendor|supplier|third.party)/i.test(q)) {
    return { category: "vendor_list", keywords: [] };
  }
  if (/(?:polic)/i.test(q)) {
    return { category: "policy_list", keywords: [] };
  }
  if (/(?:workflow|automation)/i.test(q)) {
    return { category: "workflow_list", keywords: [] };
  }
  if (/(?:integration|connector)/i.test(q)) {
    return { category: "integration_list", keywords: [] };
  }
  if (/(?:audit)/i.test(q)) {
    return { category: "audit_list", keywords: [] };
  }

  return { category: "unknown", keywords: [] };
}

function extractKeywords(q: string): string[] {
  return q.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
}

function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural || `${singular}s`);
}

export class CopilotService {
  getDefaultSuggestions(): string[] {
    return DEFAULT_SUGGESTIONS;
  }

  async processQuery(
    orgId: string,
    query: string
  ): Promise<{ answer: string; data?: any; suggestedQueries?: string[] }> {
    const intent = classifyIntent(query);

    try {
      switch (intent.category) {
        case "help":
          return this.handleHelp();
        case "framework_list":
          return this.handleFrameworkList(orgId);
        case "framework_detail":
          return this.handleFrameworkDetail(orgId, intent.entityName!);
        case "framework_requirements":
          return this.handleFrameworkRequirements(orgId, intent.entityName!);
        case "framework_mappings":
          return this.handleFrameworkMappings(orgId, intent.entityName!);
        case "control_count":
          return this.handleControlCount(orgId);
        case "control_search":
          return this.handleControlSearch(orgId, intent.entityName!);
        case "control_status":
          return this.handleControlStatus(orgId);
        case "control_not_implemented":
          return this.handleControlNotImplemented(orgId);
        case "risk_list":
          return this.handleRiskList(orgId);
        case "risk_high_severity":
          return this.handleRiskHighSeverity(orgId);
        case "risk_exposure":
          return this.handleRiskExposure(orgId);
        case "risk_by_entity":
          return this.handleRiskByEntity(orgId);
        case "compliance_status":
          return this.handleComplianceStatus(orgId);
        case "compliance_frameworks":
          return this.handleComplianceFrameworks(orgId);
        case "compliance_gaps":
          return this.handleComplianceGaps(orgId);
        case "completeness":
          return this.handleCompleteness(orgId);
        case "evidence_list":
          return this.handleEvidenceList(orgId);
        case "evidence_recent":
          return this.handleEvidenceRecent(orgId);
        case "evidence_missing":
          return this.handleEvidenceMissing(orgId);
        case "vendor_list":
          return this.handleVendorList(orgId);
        case "vendor_high_risk":
          return this.handleVendorHighRisk(orgId);
        case "vendor_risk_status":
          return this.handleVendorRiskStatus(orgId);
        case "policy_list":
          return this.handlePolicyList(orgId);
        case "policy_review":
          return this.handlePolicyReview(orgId);
        case "policy_compliance":
          return this.handlePolicyCompliance(orgId);
        case "workflow_list":
          return this.handleWorkflowList(orgId);
        case "workflow_history":
          return this.handleWorkflowHistory(orgId);
        case "integration_list":
          return this.handleIntegrationList(orgId);
        case "integration_status":
          return this.handleIntegrationStatus(orgId);
        case "audit_list":
          return this.handleAuditList(orgId);
        default:
          return {
            answer:
              "I'm not sure I understood that. Try asking about frameworks, controls, risks, compliance, evidence, vendors, policies, workflows, integrations, or audits. Here are some things you can ask me:",
            suggestedQueries: DEFAULT_SUGGESTIONS,
          };
      }
    } catch (error: any) {
      return {
        answer: `I ran into an error processing your request: ${error.message}`,
        suggestedQueries: DEFAULT_SUGGESTIONS,
      };
    }
  }

  private async handleHelp(): Promise<{
    answer: string;
    suggestedQueries: string[];
  }> {
    return {
      answer:
        "I'm your GRC assistant for TrustMaven. I can help you with:\n\n" +
        "• **Frameworks & Regulations** — List frameworks, show requirements, find mappings\n" +
        "• **Controls** — Count controls, search by topic, check implementation status\n" +
        "• **Risks** — List risks, find high-severity items, view exposure\n" +
        "• **Compliance** — Check compliance status, find coverage gaps, see completeness\n" +
        "• **Evidence** — View collected evidence, find missing evidence\n" +
        "• **Vendors** — List vendors, check risk levels\n" +
        "• **Policies** — Review policies, find items needing attention\n" +
        "• **Workflows** — See running workflows and history\n" +
        "• **Integrations** — Check connected services\n" +
        "• **Audits** — View planned and upcoming audits\n\n" +
        "Try one of the suggested queries below!",
      suggestedQueries: DEFAULT_SUGGESTIONS,
    };
  }

  private async handleFrameworkList(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const frameworks = await RegulationDefinition.findAll({
      where: { isActive: true },
      order: [["name", "ASC"]],
    });

    if (frameworks.length === 0) {
      return {
        answer: "No regulation frameworks are configured yet.",
        suggestedQueries: DEFAULT_SUGGESTIONS,
      };
    }

    const names = frameworks.map((f) => f.name);
    const answer =
      `You have ${frameworks.length} ${pluralize(frameworks.length, "regulation framework")} configured.` +
      (frameworks.length <= 10
        ? `\n\n${names.map((n) => `• ${n}`).join("\n")}`
        : ` The available frameworks are: ${names.slice(0, 10).join(", ")} and ${frameworks.length - 10} more.`);

    return {
      answer,
      data: frameworks.map((f) => ({
        id: f.id,
        name: f.name,
        version: f.version,
        type: f.type,
        category: f.category,
      })),
      suggestedQueries: [
        "Show compliance status",
        "What are the requirements for SOC 2?",
        "How many controls are there?",
      ],
    };
  }

  private async handleFrameworkDetail(
    orgId: string,
    name: string
  ): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const framework = await RegulationDefinition.findOne({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${name}%` } },
          { code: { [Op.iLike]: `%${name}%` } },
        ],
      },
    });

    if (!framework) {
      return {
        answer: `I couldn't find a framework matching "${name}".`,
        suggestedQueries: ["What frameworks do we have?", "Show compliance status", "How many controls are there?"],
      };
    }

    const reqCount = await RegulationRequirement.count({
      where: { regulationId: framework.id, isActive: true },
    });

    const mappingCount = await CommonControlMapping.count({
      include: [
        {
          model: RegulationRequirement,
          where: { regulationId: framework.id },
          attributes: [],
        },
      ],
    });

    return {
      answer:
        `**${framework.name}** (${framework.code || "N/A"}) — ${framework.type}\n\n` +
        `• Version: ${framework.version || "N/A"}\n` +
        `• Category: ${framework.category}\n` +
        `• Jurisdiction: ${framework.jurisdiction || "Global"}\n` +
        `• Issuer: ${framework.issuer || "N/A"}\n` +
        `• Requirements: ${reqCount}\n` +
        `• Mapped Controls: ${mappingCount}\n\n` +
        (framework.description
          ? `${framework.description.substring(0, 500)}`
          : ""),
      data: {
        framework: framework.toJSON(),
        requirementCount: reqCount,
        mappingCount,
      },
      suggestedQueries: [
        `What are the requirements for ${framework.code}?`,
        `Show coverage gaps for ${framework.code}`,
        "How complete is our control implementation?",
      ],
    };
  }

  private async handleFrameworkRequirements(
    orgId: string,
    name: string
  ): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const framework = await RegulationDefinition.findOne({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${name}%` } },
          { code: { [Op.iLike]: `%${name}%` } },
        ],
      },
    });

    if (!framework) {
      return {
        answer: `I couldn't find a framework matching "${name}".`,
        suggestedQueries: ["What frameworks do we have?", "How many controls are there?", "Show compliance status"],
      };
    }

    const requirements = await RegulationRequirement.findAll({
      where: { regulationId: framework.id, isActive: true },
      order: [["orderNo", "ASC"]],
      limit: 50,
    });

    if (requirements.length === 0) {
      return {
        answer: `**${framework.name}** has no requirements defined yet.`,
        data: { frameworkId: framework.id, requirements: [] },
        suggestedQueries: [`Tell me about ${framework.code}`, "Show compliance status", "What frameworks do we have?"],
      };
    }

    const topLevel = requirements.filter((r) => r.level === 0 || !r.parentId);
    const sample = topLevel.slice(0, 15);

    return {
      answer:
        `**${framework.name}** has ${requirements.length} ${pluralize(requirements.length, "requirement")}.` +
        (sample.length > 0
          ? `\n\nTop-level requirements:\n${sample.map((r) => `• ${r.code} — ${r.title}`).join("\n")}` +
            (topLevel.length > 15
              ? `\n\n...and ${topLevel.length - 15} more top-level requirements.`
              : "")
          : ""),
      data: {
        frameworkId: framework.id,
        frameworkName: framework.name,
        totalRequirements: requirements.length,
        requirements: requirements.slice(0, 50),
      },
      suggestedQueries: [
        `Tell me about ${framework.code}`,
        `Show coverage gaps for ${framework.code}`,
        "How many controls are there?",
      ],
    };
  }

  private async handleFrameworkMappings(
    orgId: string,
    name: string
  ): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const control = await CommonControl.findOne({
      where: { title: { [Op.iLike]: `%${name}%` } },
    });

    if (!control) {
      return {
        answer: `I couldn't find a control related to "${name}".`,
        suggestedQueries: ["What controls are there?", "What frameworks do we have?", "Show me my control status"],
      };
    }

    const mappingCount = await CommonControlMapping.count({
      where: { commonControlId: control.id },
    });

    return {
      answer:
        `The control "${control.title}" maps to **${mappingCount}** ${pluralize(mappingCount, "requirement")} across your frameworks.`,
      data: { controlId: control.id, controlTitle: control.title, mappingCount },
      suggestedQueries: [
        "How many controls are there?",
        "Show coverage gaps",
        "What frameworks do we have?",
      ],
    };
  }

  private async handleControlCount(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const total = await CommonControl.count({ where: { isActive: true } });
    const byDomain = await CommonControl.findAll({
      attributes: ["domain", [fn("COUNT", col("id")), "count"]],
      where: { isActive: true },
      group: ["domain"],
      raw: true,
    });

    const domainBreakdown = (byDomain as any[])
      .map((d: any) => `• ${d.domain}: ${d.count}`)
      .join("\n");

    return {
      answer:
        `There are **${total}** common controls in the metaframework.\n\nBreakdown by domain:\n${domainBreakdown}`,
      data: { total, byDomain },
      suggestedQueries: [
        "Show me my control status",
        "Which controls are not implemented?",
        "What controls cover encryption?",
      ],
    };
  }

  private async handleControlSearch(
    orgId: string,
    term: string
  ): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const controls = await CommonControl.findAll({
      where: {
        isActive: true,
        [Op.or]: [
          { title: { [Op.iLike]: `%${term}%` } },
          { description: { [Op.iLike]: `%${term}%` } },
          { domain: { [Op.iLike]: `%${term}%` } },
        ],
      },
      limit: 20,
    });

    if (controls.length === 0) {
      return {
        answer: `No controls found matching "${term}".`,
        suggestedQueries: ["How many controls are there?", "Show me my control status", "What frameworks do we have?"],
      };
    }

    return {
      answer:
        `Found **${controls.length}** ${pluralize(controls.length, "control")} matching "${term}":\n\n` +
        controls.map((c) => `• **${c.code}** — ${c.title} (${c.domain})`).join("\n"),
      data: controls.map((c) => c.toJSON()),
      suggestedQueries: [
        "Show me my control status",
        "Which controls are not implemented?",
        "How many controls are there?",
      ],
    };
  }

  private async handleControlStatus(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const statuses = await CommonControlImplementation.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      where: { organizationId: orgId },
      group: ["status"],
      raw: true,
    });

    const total = (statuses as any[]).reduce((acc: number, s: any) => acc + parseInt(s.count), 0);

    if (total === 0) {
      return {
        answer: "No control implementations found for your organization.",
        suggestedQueries: ["How many controls are there?", "What frameworks do we have?", "Show compliance status"],
      };
    }

    const lines = (statuses as any[])
      .map((s: any) => `• ${s.status.replace(/_/g, " ")}: ${s.count}`)
      .join("\n");

    const implemented = (statuses as any[]).find(
      (s: any) => s.status === "implemented"
    );
    const pct = implemented
      ? Math.round((parseInt(implemented.count) / total) * 100)
      : 0;

    return {
      answer:
        `Your organization has **${total}** control ${pluralize(total, "implementation")}.\n\n${lines}\n\nOverall: **${pct}%** fully implemented.`,
      data: { total, byStatus: statuses },
      suggestedQueries: [
        "Which controls are not implemented?",
        "How complete is our control implementation?",
        "Show coverage gaps",
      ],
    };
  }

  private async handleControlNotImplemented(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const notStarted = await CommonControlImplementation.findAll({
      where: {
        organizationId: orgId,
        status: { [Op.notIn]: ["implemented", "not_applicable"] },
      },
      include: [
        {
          model: CommonControl,
          attributes: ["code", "title", "domain"],
        },
      ],
      limit: 50,
    });

    if (notStarted.length === 0) {
      return {
        answer: "All controls have been implemented! Great work.",
        suggestedQueries: ["Show me my control status", "Show compliance status", "How many controls are there?"],
      };
    }

    const byStatus: Record<string, typeof notStarted> = {};
    for (const impl of notStarted) {
      const s = impl.status;
      if (!byStatus[s]) byStatus[s] = [];
      byStatus[s].push(impl);
    }

    const summary = Object.entries(byStatus)
      .map(
        ([s, items]) =>
          `• **${s.replace(/_/g, " ")}**: ${items.length} ${pluralize(items.length, "control")}`
      )
      .join("\n");

    return {
      answer:
        `You have **${notStarted.length}** ${pluralize(notStarted.length, "control")} that still need attention:\n\n${summary}`,
      data: { total: notStarted.length, byStatus },
      suggestedQueries: [
        "Show me my control status",
        "How complete is our control implementation?",
        "Show coverage gaps",
      ],
    };
  }

  private async handleRiskList(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const total = await Risk.count({ where: { organizationId: orgId } });
    const byStatus = await Risk.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      where: { organizationId: orgId },
      group: ["status"],
      raw: true,
    });

    if (total === 0) {
      return {
        answer: "No risks are being tracked yet.",
        suggestedQueries: ["What can I ask you?", "How many controls are there?", "What frameworks do we have?"],
      };
    }

    const lines = (byStatus as any[])
      .map((s: any) => `• ${s.status}: ${s.count}`)
      .join("\n");

    return {
      answer:
        `You are tracking **${total}** ${pluralize(total, "risk")}.\n\nStatus breakdown:\n${lines}`,
      data: { total, byStatus },
      suggestedQueries: [
        "Show high severity risks",
        "What's our risk exposure?",
        "Which entities have the highest risk?",
      ],
    };
  }

  private async handleRiskHighSeverity(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const risks = await Risk.findAll({
      where: { organizationId: orgId },
      include: [
        {
          model: FairAnalysis,
          required: false,
          attributes: ["annualLossExpectancy", "lossMagnitudeMostLikely", "methodology"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 50,
    });

    if (risks.length === 0) {
      return {
        answer: "No risks found.",
        suggestedQueries: ["What risks are we tracking?", "What's our risk exposure?", "Show compliance status"],
      };
    }

    const withALE = risks
      .filter((r) => (r as any).fairAnalyses?.[0]?.annualLossExpectancy)
      .sort(
        (a, b) =>
          parseFloat((b as any).fairAnalyses[0]?.annualLossExpectancy || 0) -
          parseFloat((a as any).fairAnalyses[0]?.annualLossExpectancy || 0)
      )
      .slice(0, 10);

    const topRisks =
      withALE.length > 0
        ? withALE
            .map(
              (r, i) =>
                `${i + 1}. **${r.title}** — ALE: $${parseFloat(
                  (r as any).fairAnalyses[0].annualLossExpectancy
                ).toLocaleString()}`
            )
            .join("\n")
        : risks
            .slice(0, 10)
            .map((r) => `• **${r.title}** — ${r.domain} (${r.status})`)
            .join("\n");

    return {
      answer:
        `Found **${withALE.length > 0 ? withALE.length : risks.length}** ${pluralize(
          withALE.length > 0 ? withALE.length : risks.length,
          "risk"
        )}.\n\n${topRisks}`,
      data: { risks: withALE.length > 0 ? withALE : risks.slice(0, 20) },
      suggestedQueries: [
        "What risks are we tracking?",
        "What's our risk exposure?",
        "Which entities have the highest risk?",
      ],
    };
  }

  private async handleRiskExposure(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const analyses = await FairAnalysis.findAll({
      where: { organizationId: orgId },
      attributes: [
        "id",
        "methodology",
        "annualLossExpectancy",
        "lossMagnitudeMin",
        "lossMagnitudeMostLikely",
        "lossMagnitudeMax",
        "riskId",
      ],
      limit: 100,
    });

    if (analyses.length === 0) {
      return {
        answer: "No quantified risk data available. Run FAIR analyses on your risks first.",
        suggestedQueries: ["What risks are we tracking?", "Show high severity risks", "What frameworks do we have?"],
      };
    }

    const totalALE = analyses.reduce(
      (sum, a) => sum + parseFloat(a.annualLossExpectancy || "0"),
      0
    );
    const avgALE = totalALE / analyses.length;
    const maxALE = Math.max(
      ...analyses.map((a) => parseFloat(a.annualLossExpectancy || "0"))
    );

    return {
      answer:
        `**Risk Exposure Summary**\n\n` +
        `• Quantified risks: ${analyses.length}\n` +
        `• Total Annual Loss Expectancy: **$${totalALE.toLocaleString()}**\n` +
        `• Average ALE per risk: **$${avgALE.toLocaleString()}**\n` +
        `• Maximum ALE: **$${maxALE.toLocaleString()}**`,
      data: {
        totalAnalyses: analyses.length,
        totalALE,
        averageALE: avgALE,
        maxALE,
      },
      suggestedQueries: [
        "Show high severity risks",
        "What risks are we tracking?",
        "Which entities have the highest risk?",
      ],
    };
  }

  private async handleRiskByEntity(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const entities = await Entity.findAll({
      where: { organizationId: orgId, isActive: true },
      attributes: ["id", "name", "type", "riskScore"],
      order: [["riskScore", "DESC"]],
      limit: 20,
    });

    if (entities.length === 0) {
      return {
        answer: "No entities found with risk scores.",
        suggestedQueries: ["What risks are we tracking?", "Show high severity risks", "What's our risk exposure?"],
      };
    }

    const scored = entities.filter((e) => e.riskScore !== null);
    if (scored.length === 0) {
      return {
        answer: "Entities exist but none have risk scores assigned yet.",
        data: { entities },
        suggestedQueries: ["What risks are we tracking?", "Show high severity risks", "What's our risk exposure?"],
      };
    }

    return {
      answer:
        `Entities ranked by risk score:\n\n` +
        scored
          .map(
            (e, i) =>
              `${i + 1}. **${e.name}** (${e.type}) — Score: ${e.riskScore}`
          )
          .join("\n"),
      data: { entities: scored },
      suggestedQueries: [
        "What risks are we tracking?",
        "Show high severity risks",
        "What's our risk exposure?",
      ],
    };
  }

  private async handleComplianceStatus(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const total = await OrganizationRegulation.count({ where: { organizationId: orgId } });
    const activeFrameworks = await OrganizationRegulation.count({
      where: { organizationId: orgId, status: "active" },
    });

    const implTotal = await CommonControlImplementation.count({
      where: { organizationId: orgId },
    });
    const implImplemented = await CommonControlImplementation.count({
      where: { organizationId: orgId, status: "implemented" },
    });

    const implPct = implTotal > 0 ? Math.round((implImplemented / implTotal) * 100) : 0;

    return {
      answer:
        `**Compliance Overview**\n\n` +
        `• Adopted frameworks: ${activeFrameworks} / ${total}\n` +
        `• Control implementations: ${implImplemented} / ${implTotal} (**${implPct}%** complete)`,
      data: {
        totalAdoptedFrameworks: total,
        activeFrameworks,
        totalImplementations: implTotal,
        implementedCount: implImplemented,
        completionPct: implPct,
      },
      suggestedQueries: [
        "Which frameworks are we compliant with?",
        "Show coverage gaps",
        "How complete is our control implementation?",
      ],
    };
  }

  private async handleComplianceFrameworks(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const orgRegs = await OrganizationRegulation.findAll({
      where: { organizationId: orgId },
      include: [
        {
          model: RegulationDefinition,
          attributes: ["id", "name", "code", "type", "category"],
        },
      ],
    });

    if (orgRegs.length === 0) {
      return {
        answer: "Your organization hasn't adopted any frameworks yet.",
        suggestedQueries: ["What frameworks do we have?", "Show compliance status", "How many controls are there?"],
      };
    }

    const active = orgRegs.filter((r) => r.status === "active");
    const planned = orgRegs.filter((r) => r.status === "planned");

    return {
      answer:
        `Your organization has adopted **${orgRegs.length}** ${pluralize(orgRegs.length, "framework")}.\n\n` +
        (active.length > 0
          ? `**Active:**\n${active.map((r) => `• ${(r as any).regulation?.name || r.regulationId}`).join("\n")}\n\n`
          : "") +
        (planned.length > 0
          ? `**Planned:**\n${planned.map((r) => `• ${(r as any).regulation?.name || r.regulationId}`).join("\n")}`
          : ""),
      data: { adopted: orgRegs, active, planned },
      suggestedQueries: [
        "Show compliance status",
        "Show coverage gaps",
        "How complete is our control implementation?",
      ],
    };
  }

  private async handleComplianceGaps(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const orgRegs = await OrganizationRegulation.findAll({
      where: { organizationId: orgId, status: "active" },
      include: [{ model: RegulationDefinition }],
    });

    if (orgRegs.length === 0) {
      return {
        answer: "No active frameworks found. Adopt frameworks first to see coverage gaps.",
        suggestedQueries: ["What frameworks do we have?", "Show compliance status", "How many controls are there?"],
      };
    }

    const gapDetails: {
      framework: string;
      total: number;
      covered: number;
      gap: number;
      pct: number;
    }[] = [];

    for (const orgReg of orgRegs) {
      const regulation = (orgReg as any).regulation as RegulationDefinition;
      if (!regulation) continue;

      const reqCount = await RegulationRequirement.count({
        where: { regulationId: regulation.id, isActive: true },
      });

      const mappedCount = await CommonControlMapping.count({
        include: [
          {
            model: RegulationRequirement,
            where: { regulationId: regulation.id },
            attributes: [],
          },
        ],
      });

      const gap = reqCount - mappedCount;
      const pct = reqCount > 0 ? Math.round((mappedCount / reqCount) * 100) : 0;
      gapDetails.push({
        framework: regulation.name,
        total: reqCount,
        covered: mappedCount,
        gap,
        pct,
      });
    }

    if (gapDetails.length === 0) {
      return {
        answer: "No coverage data available.",
        suggestedQueries: ["Show compliance status", "How complete is our control implementation?", "What frameworks do we have?"],
      };
    }

    const worst = [...gapDetails].sort((a, b) => a.pct - b.pct).slice(0, 5);

    return {
      answer:
        `**Coverage Gaps**\n\n` +
        gapDetails
          .map(
            (g) =>
              `• **${g.framework}**: ${g.covered}/${g.total} requirements covered (**${g.pct}%**) — ${g.gap} gap${g.gap !== 1 ? "s" : ""}`
          )
          .join("\n") +
        (worst.length > 0
          ? `\n\n⚠️ **Most at risk:** ${worst[0].framework} (${worst[0].pct}% coverage)`
          : ""),
      data: { gaps: gapDetails },
      suggestedQueries: [
        "Show compliance status",
        "How complete is our control implementation?",
        "What frameworks do we have?",
      ],
    };
  }

  private async handleCompleteness(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const total = await CommonControlImplementation.count({
      where: { organizationId: orgId },
    });
    const byStatus = await CommonControlImplementation.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      where: { organizationId: orgId },
      group: ["status"],
      raw: true,
    });

    if (total === 0) {
      return {
        answer: "No control implementations found.",
        suggestedQueries: ["How many controls are there?", "What frameworks do we have?", "Show compliance status"],
      };
    }

    const implemented = (byStatus as any[]).find((s: any) => s.status === "implemented");
    const pct = implemented ? Math.round((parseInt(implemented.count) / total) * 100) : 0;

    const breakdown = (byStatus as any[])
      .map((s: any) => `• ${s.status.replace(/_/g, " ")}: ${s.count}`)
      .join("\n");

    return {
      answer:
        `**Control Implementation Completeness:** **${pct}%**\n\n` +
        `${breakdown}\n\n` +
        `**${total}** total ${pluralize(total, "implementation")}.`,
      data: { total, byStatus, completionPct: pct },
      suggestedQueries: [
        "Show coverage gaps",
        "Show me my control status",
        "Which controls are not implemented?",
      ],
    };
  }

  private async handleEvidenceList(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const total = await Evidence.count({ where: { organizationId: orgId } });
    const byType = await Evidence.findAll({
      attributes: ["entityType", [fn("COUNT", col("id")), "count"]],
      where: { organizationId: orgId },
      group: ["entityType"],
      raw: true,
    });

    if (total === 0) {
      return {
        answer: "No evidence has been collected yet.",
        suggestedQueries: ["Which controls lack evidence?", "What integrations do we have?", "Show compliance status"],
      };
    }

    const lines = (byType as any[])
      .map((t: any) => `• ${t.entityType}: ${t.count}`)
      .join("\n");

    return {
      answer:
        `You have **${total}** ${pluralize(total, "evidence")} item${total !== 1 ? "s" : ""} collected.\n\nBy type:\n${lines}`,
      data: { total, byType },
      suggestedQueries: [
        "Show recent evidence",
        "Which controls lack evidence?",
        "Show compliance status",
      ],
    };
  }

  private async handleEvidenceRecent(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const recent = await Evidence.findAll({
      where: { organizationId: orgId },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    if (recent.length === 0) {
      return {
        answer: "No evidence has been collected yet.",
        suggestedQueries: ["What evidence have we collected?", "Which controls lack evidence?", "What integrations do we have?"],
      };
    }

    return {
      answer:
        `Recent evidence (last ${recent.length}):\n\n` +
        recent
          .map(
            (e, i) =>
              `${i + 1}. **${e.title}** — ${e.entityType} (${e.status}) — ${new Date(
                e.createdAt
              ).toLocaleDateString()}`
          )
          .join("\n"),
      data: { recent },
      suggestedQueries: [
        "What evidence have we collected?",
        "Which controls lack evidence?",
        "Show compliance status",
      ],
    };
  }

  private async handleEvidenceMissing(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const allImplementations = await CommonControlImplementation.findAll({
      where: { organizationId: orgId },
      include: [
        {
          model: CommonControl,
          attributes: ["code", "title"],
        },
      ],
    });

    const withoutEvidence = allImplementations.filter((impl) => {
      const evidence = impl.evidenceIds;
      return !evidence || evidence.length === 0;
    });

    if (withoutEvidence.length === 0) {
      return {
        answer: "All control implementations have evidence attached!",
        suggestedQueries: ["What evidence have we collected?", "Show recent evidence", "Show compliance status"],
      };
    }

    const sample = withoutEvidence.slice(0, 20);

    return {
      answer:
        `**${withoutEvidence.length}** ${pluralize(withoutEvidence.length, "control implementation")} ${withoutEvidence.length === 1 ? "is" : "are"} missing evidence.\n\n` +
        sample
          .map(
            (impl) =>
              `• ${(impl as any).commonControl?.code || "N/A"} — ${(impl as any).commonControl?.title || "Unknown"} (${impl.status})`
          )
          .join("\n") +
        (withoutEvidence.length > 20
          ? `\n\n...and ${withoutEvidence.length - 20} more.`
          : ""),
      data: { totalMissing: withoutEvidence.length, implementations: withoutEvidence.slice(0, 50) },
      suggestedQueries: [
        "What evidence have we collected?",
        "Show recent evidence",
        "Show compliance status",
      ],
    };
  }

  private async handleVendorList(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const total = await Vendor.count({ where: { organizationId: orgId } });

    if (total === 0) {
      return {
        answer: "No vendors registered.",
        suggestedQueries: ["What frameworks do we have?", "How many controls are there?", "What risks are we tracking?"],
      };
    }

    const byRisk = await Vendor.findAll({
      attributes: ["riskLevel", [fn("COUNT", col("id")), "count"]],
      where: { organizationId: orgId },
      group: ["riskLevel"],
      raw: true,
    });

    const byStatus = await Vendor.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      where: { organizationId: orgId },
      group: ["status"],
      raw: true,
    });

    const riskLines = (byRisk as any[])
      .map((r: any) => `• ${r.riskLevel}: ${r.count}`)
      .join("\n");
    const statusLines = (byStatus as any[])
      .map((s: any) => `• ${s.status}: ${s.count}`)
      .join("\n");

    return {
      answer:
        `You have **${total}** ${pluralize(total, "vendor")}.\n\nBy risk level:\n${riskLines}\n\nBy status:\n${statusLines}`,
      data: { total, byRisk, byStatus },
      suggestedQueries: [
        "Show high risk vendors",
        "What's our vendor risk status?",
        "Show compliance status",
      ],
    };
  }

  private async handleVendorHighRisk(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const vendors = await Vendor.findAll({
      where: {
        organizationId: orgId,
        riskLevel: { [Op.in]: ["critical", "high"] },
      },
      order: [["riskLevel", "DESC"]],
    });

    if (vendors.length === 0) {
      return {
        answer: "No high or critical risk vendors found.",
        suggestedQueries: ["How many vendors do we have?", "What's our vendor risk status?", "What risks are we tracking?"],
      };
    }

    return {
      answer:
        `You have **${vendors.length}** high/critical risk ${pluralize(vendors.length, "vendor")}:\n\n` +
        vendors
          .map(
            (v, i) =>
              `${i + 1}. **${v.name}** — ${v.riskLevel.toUpperCase()} risk — ${v.status}`
          )
          .join("\n"),
      data: { vendors },
      suggestedQueries: [
        "How many vendors do we have?",
        "What's our vendor risk status?",
        "What risks are we tracking?",
      ],
    };
  }

  private async handleVendorRiskStatus(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const vendors = await Vendor.findAll({
      where: { organizationId: orgId },
      order: [["riskLevel", "DESC"]],
    });

    if (vendors.length === 0) {
      return {
        answer: "No vendors registered.",
        suggestedQueries: ["How many vendors do we have?", "What frameworks do we have?", "What risks are we tracking?"],
      };
    }

    const critical = vendors.filter((v) => v.riskLevel === "critical");
    const high = vendors.filter((v) => v.riskLevel === "high");
    const medium = vendors.filter((v) => v.riskLevel === "medium");
    const low = vendors.filter((v) => v.riskLevel === "low");

    return {
      answer:
        `**Vendor Risk Summary**\n\n` +
        `• Critical: ${critical.length}\n` +
        `• High: ${high.length}\n` +
        `• Medium: ${medium.length}\n` +
        `• Low: ${low.length}\n\n` +
        (critical.length > 0
          ? `⚠️ Critical vendors: ${critical.map((v) => v.name).join(", ")}`
          : ""),
      data: { critical, high, medium, low },
      suggestedQueries: [
        "Show high risk vendors",
        "How many vendors do we have?",
        "What risks are we tracking?",
      ],
    };
  }

  private async handlePolicyList(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const total = await Policy.count({ where: { organizationId: orgId } });
    const byStatus = await Policy.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      where: { organizationId: orgId },
      group: ["status"],
      raw: true,
    });

    if (total === 0) {
      return {
        answer: "No policies found.",
        suggestedQueries: ["What frameworks do we have?", "How many controls are there?", "Show compliance status"],
      };
    }

    const lines = (byStatus as any[])
      .map((s: any) => `• ${s.status}: ${s.count}`)
      .join("\n");

    return {
      answer:
        `You have **${total}** ${pluralize(total, "policy")}.\n\nStatus:\n${lines}`,
      data: { total, byStatus },
      suggestedQueries: [
        "Which policies need review?",
        "Policy compliance status",
        "Show compliance status",
      ],
    };
  }

  private async handlePolicyReview(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const needReview = await Policy.findAll({
      where: {
        organizationId: orgId,
        status: { [Op.in]: ["draft", "review"] },
      },
      order: [["updatedAt", "DESC"]],
      limit: 20,
    });

    if (needReview.length === 0) {
      return {
        answer: "All policies are either approved or retired. Nothing needs review.",
        suggestedQueries: ["Show our policies", "Policy compliance status", "Show compliance status"],
      };
    }

    return {
      answer:
        `**${needReview.length}** ${pluralize(needReview.length, "policy")} ${needReview.length === 1 ? "needs" : "need"} review:\n\n` +
        needReview
          .map(
            (p, i) =>
              `${i + 1}. **${p.title}** — ${p.status} (v${p.version})`
          )
          .join("\n"),
      data: { policies: needReview },
      suggestedQueries: [
        "Show our policies",
        "Policy compliance status",
        "Show compliance status",
      ],
    };
  }

  private async handlePolicyCompliance(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const total = await Policy.count({ where: { organizationId: orgId } });
    const approved = await Policy.count({
      where: { organizationId: orgId, status: "approved" },
    });
    const draft = await Policy.count({
      where: { organizationId: orgId, status: "draft" },
    });
    const inReview = await Policy.count({
      where: { organizationId: orgId, status: "review" },
    });
    const retired = await Policy.count({
      where: { organizationId: orgId, status: "retired" },
    });

    const active = approved + inReview;
    const pct = total > 0 ? Math.round((approved / total) * 100) : 0;

    return {
      answer:
        `**Policy Compliance**\n\n` +
        `• Total: ${total}\n` +
        `• Approved: ${approved} (**${pct}%**)\n` +
        `• In Review: ${inReview}\n` +
        `• Draft: ${draft}\n` +
        `• Retired: ${retired}\n\n` +
        `Active policies: ${active}`,
      data: { total, approved, draft, inReview, retired, active, approvalPct: pct },
      suggestedQueries: [
        "Which policies need review?",
        "Show our policies",
        "Show compliance status",
      ],
    };
  }

  private async handleWorkflowList(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const recent = await WorkflowExecution.findAll({
      where: { organizationId: orgId },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    if (recent.length === 0) {
      return {
        answer: "No workflow executions found.",
        suggestedQueries: ["What integrations do we have?", "Show integration status", "Show compliance status"],
      };
    }

    return {
      answer:
        `Recent workflow executions:\n\n` +
        recent
          .map(
            (w, i) =>
              `${i + 1}. **${w.entityType}** — ${w.fromState} → ${w.toState} — ${new Date(
                w.createdAt
              ).toLocaleString()}`
          )
          .join("\n"),
      data: { executions: recent },
      suggestedQueries: [
        "Show workflow execution history",
        "What integrations do we have?",
        "Show compliance status",
      ],
    };
  }

  private async handleWorkflowHistory(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    return this.handleWorkflowList(orgId);
  }

  private async handleIntegrationList(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const total = await Integration.count({ where: { organizationId: orgId } });

    if (total === 0) {
      return {
        answer: "No integrations configured.",
        suggestedQueries: ["What can I ask you?", "How many controls are there?", "What frameworks do we have?"],
      };
    }

    const integrations = await Integration.findAll({
      where: { organizationId: orgId },
      order: [["name", "ASC"]],
    });

    return {
      answer:
        `You have **${total}** ${pluralize(total, "integration")} configured:\n\n` +
        integrations
          .map(
            (i) =>
              `• **${i.name}** (${i.connectorType}) — ${i.status}${i.lastSyncAt ? ` — Last sync: ${new Date(i.lastSyncAt).toLocaleDateString()}` : ""}`
          )
          .join("\n"),
      data: { integrations },
      suggestedQueries: [
        "Show integration status",
        "What evidence have we collected?",
        "Show compliance status",
      ],
    };
  }

  private async handleIntegrationStatus(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const byStatus = await Integration.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      where: { organizationId: orgId },
      group: ["status"],
      raw: true,
    });

    const total = (byStatus as any[]).reduce((acc: number, s: any) => acc + parseInt(s.count), 0);

    if (total === 0) {
      return {
        answer: "No integrations configured.",
        suggestedQueries: ["What integrations do we have?", "What evidence have we collected?", "Show compliance status"],
      };
    }

    const lines = (byStatus as any[])
      .map((s: any) => `• ${s.status}: ${s.count}`)
      .join("\n");

    return {
      answer:
        `Integration status:\n\n${lines}\n\n**${total}** total ${pluralize(total, "integration")}.`,
      data: { total, byStatus },
      suggestedQueries: [
        "What integrations do we have?",
        "What evidence have we collected?",
        "Show recent evidence",
      ],
    };
  }

  private async handleAuditList(orgId: string): Promise<{
    answer: string;
    data?: any;
    suggestedQueries: string[];
  }> {
    const total = await Audit.count({ where: { organizationId: orgId } });
    const byStatus = await Audit.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      where: { organizationId: orgId },
      group: ["status"],
      raw: true,
    });

    if (total === 0) {
      return {
        answer: "No audits found.",
        suggestedQueries: ["What risks are we tracking?", "Show compliance status", "What frameworks do we have?"],
      };
    }

    const upcoming = await Audit.findAll({
      where: {
        organizationId: orgId,
        status: { [Op.in]: ["planned", "in_progress"] },
      },
      order: [["startDate", "ASC"]],
      limit: 10,
    });

    const lines = (byStatus as any[])
      .map((s: any) => `• ${s.status.replace(/_/g, " ")}: ${s.count}`)
      .join("\n");

    const upcomingLines =
      upcoming.length > 0
        ? `\n\nUpcoming:\n` +
          upcoming
            .map(
              (a, i) =>
                `${i + 1}. **${a.title}** — ${a.auditType} — starts ${new Date(
                  a.startDate
                ).toLocaleDateString()}`
            )
            .join("\n")
        : "";

    return {
      answer:
        `You have **${total}** ${pluralize(total, "audit")}.\n\nStatus:\n${lines}${upcomingLines}`,
      data: { total, byStatus, upcoming },
      suggestedQueries: [
        "What risks are we tracking?",
        "Show compliance status",
        "What's our compliance status?",
      ],
    };
  }
}

export const copilotService = new CopilotService();
