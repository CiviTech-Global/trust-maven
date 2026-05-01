import { Project } from "../domain.layer/models/project/project.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { RiskAssessment } from "../domain.layer/models/riskAssessment/riskAssessment.model";
import { RiskTreatment } from "../domain.layer/models/riskTreatment/riskTreatment.model";
import { Control } from "../domain.layer/models/control/control.model";
import { RiskCategory } from "../domain.layer/models/riskCategory/riskCategory.model";
import { Framework } from "../domain.layer/models/framework/framework.model";
import { Vendor } from "../domain.layer/models/vendor/vendor.model";
import { VendorAssessment } from "../domain.layer/models/vendorAssessment/vendorAssessment.model";
import { KRI } from "../domain.layer/models/kri/kri.model";
import { RiskControlMapping } from "../domain.layer/models/riskControlMapping/riskControlMapping.model";
import { ControlFrameworkMapping } from "../domain.layer/models/controlFrameworkMapping/controlFrameworkMapping.model";
import { RiskQuantification } from "../domain.layer/models/riskQuantification/riskQuantification.model";
import { Audit } from "../domain.layer/models/audit/audit.model";
import { AuditFinding } from "../domain.layer/models/auditFinding/auditFinding.model";
import { ControlMonitoringEvent } from "../domain.layer/models/controlMonitoringEvent/controlMonitoringEvent.model";
import { ReportTemplate } from "../domain.layer/models/reportTemplate/reportTemplate.model";

interface DemoRisk {
  title: string;
  description: string;
  domain: string;
  status: string;
  likelihood: number;
  impact: number;
  treatmentStrategy: string;
  treatmentDescription: string;
  controls: { title: string; type: string; effectiveness: string }[];
}

const DEMO_PROJECTS = [
  { name: "Strategic Growth Initiative", description: "Managing strategic risks associated with market expansion, M&A integration, competitive positioning, and long-term portfolio diversification.", status: "active" },
  { name: "SOC 2 Type II Compliance", description: "Achieving and maintaining SOC 2 Type II certification covering security, availability, and confidentiality trust service criteria.", status: "active" },
  { name: "Third-Party Vendor Assessment", description: "Comprehensive assessment of critical third-party vendors and their security posture, data handling practices, and business continuity plans.", status: "draft" },
];

const DEMO_RISKS: DemoRisk[] = [
  // Financial (4)
  { title: "Budget overrun on compliance program", description: "Risk of exceeding allocated budget for compliance activities due to scope creep and regulatory changes requiring additional controls.", domain: "financial", status: "assessed", likelihood: 3, impact: 4, treatmentStrategy: "mitigate", treatmentDescription: "Implement quarterly budget reviews with 15% contingency buffer and staged rollout of compliance controls.", controls: [{ title: "Quarterly budget variance analysis", type: "detective", effectiveness: "effective" }] },
  { title: "Currency exposure in vendor payments", description: "Foreign currency fluctuations impacting costs of international security vendors and compliance tool subscriptions.", domain: "financial", status: "identified", likelihood: 2, impact: 3, treatmentStrategy: "transfer", treatmentDescription: "Negotiate fixed-rate contracts with international vendors and use forward contracts for large payments.", controls: [] },
  { title: "Audit cost escalation", description: "Increasing costs of external audits driven by regulatory complexity and shortage of qualified auditors.", domain: "financial", status: "assessed", likelihood: 4, impact: 3, treatmentStrategy: "mitigate", treatmentDescription: "Lock in multi-year audit engagement agreements and invest in internal audit capabilities.", controls: [{ title: "Annual audit cost benchmarking", type: "detective", effectiveness: "effective" }] },
  { title: "Insurance gap for cyber incidents", description: "Current cyber insurance policy may not adequately cover losses from advanced persistent threats or supply chain attacks.", domain: "financial", status: "treated", likelihood: 2, impact: 5, treatmentStrategy: "transfer", treatmentDescription: "Review and update cyber insurance policy to include expanded liability coverage and supply chain attack scenarios.", controls: [] },

  // Cybersecurity (4)
  { title: "Ransomware attack on critical systems", description: "Risk of ransomware encrypting production databases and customer data, potentially causing extended downtime and data loss.", domain: "cybersecurity", status: "treated", likelihood: 3, impact: 5, treatmentStrategy: "mitigate", treatmentDescription: "Deploy EDR across all endpoints, implement network segmentation, and maintain offline backups with 4-hour RPO.", controls: [{ title: "EDR monitoring and alerting", type: "detective", effectiveness: "effective" }, { title: "Network segmentation controls", type: "preventive", effectiveness: "effective" }] },
  { title: "API vulnerability exploitation", description: "Unpatched or misconfigured APIs exposing sensitive data or allowing unauthorized access to internal services.", domain: "cybersecurity", status: "assessed", likelihood: 4, impact: 4, treatmentStrategy: "mitigate", treatmentDescription: "Implement API gateway with rate limiting, deploy automated DAST scanning in CI/CD pipeline.", controls: [{ title: "Automated API security scanning", type: "preventive", effectiveness: "partially_effective" }] },
  { title: "Phishing campaign targeting employees", description: "Sophisticated spear-phishing attacks targeting employees with access to sensitive systems and data.", domain: "cybersecurity", status: "treated", likelihood: 4, impact: 3, treatmentStrategy: "mitigate", treatmentDescription: "Quarterly phishing simulations, mandatory security awareness training, and DMARC enforcement.", controls: [{ title: "Email security gateway", type: "preventive", effectiveness: "effective" }] },
  { title: "Supply chain software compromise", description: "Risk of malicious code injection through compromised third-party libraries or build pipeline dependencies.", domain: "cybersecurity", status: "assessed", likelihood: 3, impact: 5, treatmentStrategy: "mitigate", treatmentDescription: "Implement SCA tools, maintain software bill of materials (SBOM), and verify dependency signatures.", controls: [{ title: "SCA dependency scanning", type: "detective", effectiveness: "partially_effective" }] },

  // Strategic (4)
  { title: "Market share erosion from new entrants", description: "Emerging competitors with disruptive business models threatening core revenue streams and customer retention in key market segments.", domain: "strategic", status: "assessed", likelihood: 3, impact: 5, treatmentStrategy: "mitigate", treatmentDescription: "Conduct quarterly competitive landscape analysis, invest in product differentiation, and accelerate innovation pipeline.", controls: [{ title: "Competitive intelligence monitoring", type: "detective", effectiveness: "partially_effective" }] },
  { title: "M&A integration failure", description: "Recent acquisition failing to deliver expected synergies due to cultural misalignment, technology incompatibility, and key talent attrition.", domain: "strategic", status: "treated", likelihood: 2, impact: 5, treatmentStrategy: "mitigate", treatmentDescription: "Establish dedicated integration management office, define 100-day integration milestones, and implement retention packages for critical personnel.", controls: [{ title: "Integration milestone tracking", type: "detective", effectiveness: "effective" }] },
  { title: "Geographic concentration risk", description: "Over-reliance on a single geographic market for majority of revenue, exposing the organization to regional economic downturns and political instability.", domain: "strategic", status: "identified", likelihood: 4, impact: 4, treatmentStrategy: "mitigate", treatmentDescription: "Develop market entry strategy for two new regions, diversify revenue sources, and establish local partnerships.", controls: [] },
  { title: "Reputational damage from negative press", description: "Risk of sustained negative media coverage impacting brand value, customer trust, and ability to attract talent and investors.", domain: "strategic", status: "assessed", likelihood: 4, impact: 4, treatmentStrategy: "mitigate", treatmentDescription: "Establish crisis communication playbook, engage proactive PR strategy, and implement social media sentiment monitoring.", controls: [{ title: "Media sentiment monitoring dashboard", type: "detective", effectiveness: "partially_effective" }] },

  // Operational (3)
  { title: "Key person dependency in security team", description: "Critical security operations dependent on a small number of specialized personnel, creating single points of failure.", domain: "operational", status: "assessed", likelihood: 4, impact: 3, treatmentStrategy: "mitigate", treatmentDescription: "Cross-train team members, document all critical procedures, and establish relationships with managed security service providers.", controls: [{ title: "Knowledge management system", type: "preventive", effectiveness: "partially_effective" }] },
  { title: "Business continuity plan untested", description: "BCP and disaster recovery procedures have not been tested in over 12 months, risking inadequate response during an actual incident.", domain: "operational", status: "identified", likelihood: 3, impact: 4, treatmentStrategy: "mitigate", treatmentDescription: "Schedule quarterly tabletop exercises and annual full DR failover test with documented results.", controls: [] },
  { title: "Data center single point of failure", description: "Primary data center lacks redundancy for critical networking equipment, risking extended outage from hardware failure.", domain: "operational", status: "treated", likelihood: 2, impact: 5, treatmentStrategy: "mitigate", treatmentDescription: "Deploy redundant network paths, implement hot standby for critical infrastructure, and migrate stateless workloads to multi-region cloud.", controls: [{ title: "Infrastructure redundancy monitoring", type: "detective", effectiveness: "effective" }] },

  // Regulatory (3)
  { title: "DORA compliance gaps", description: "Organization may not meet Digital Operational Resilience Act requirements for ICT risk management, incident reporting, and third-party oversight by compliance deadline.", domain: "regulatory", status: "assessed", likelihood: 3, impact: 5, treatmentStrategy: "mitigate", treatmentDescription: "Conduct ICT risk management gap analysis, establish compliance roadmap aligned with DORA timelines, and implement resilience testing program.", controls: [{ title: "ICT risk management framework", type: "preventive", effectiveness: "partially_effective" }] },
  { title: "Cross-border data transfer restrictions", description: "Evolving data localization requirements and Schrems II implications affecting ability to process data across jurisdictions.", domain: "regulatory", status: "treated", likelihood: 3, impact: 4, treatmentStrategy: "mitigate", treatmentDescription: "Implement data residency controls, conduct transfer impact assessments, and establish standard contractual clauses.", controls: [{ title: "Data residency enforcement", type: "preventive", effectiveness: "effective" }] },
  { title: "NIS2 incident reporting gaps", description: "Organization may not meet NIS2 directive 24-hour incident notification requirements due to inadequate detection and escalation processes.", domain: "regulatory", status: "identified", likelihood: 3, impact: 4, treatmentStrategy: "mitigate", treatmentDescription: "Establish automated incident detection, create pre-approved notification templates, and designate 24/7 incident response contacts.", controls: [] },
];

const DEMO_VENDORS = [
  { name: "CloudGuard Solutions", description: "Enterprise cloud hosting and infrastructure provider with SOC 2 Type II certification.", riskLevel: "critical", status: "active" },
  { name: "DataStream Analytics", description: "Big data processing and analytics platform for business intelligence.", riskLevel: "high", status: "active" },
  { name: "SecureAuth Pro", description: "Identity and access management provider offering SSO and MFA solutions.", riskLevel: "medium", status: "active" },
  { name: "ComplianceBot AI", description: "AI-powered compliance scanning and regulatory monitoring tool.", riskLevel: "low", status: "active" },
];

const DEMO_VENDOR_ASSESSMENTS = [
  { vendorIdx: 0, title: "Annual Security Review - CloudGuard", assessmentType: "security", riskRating: "medium", score: 78, summary: "Generally strong security posture with some gaps in incident response documentation." },
  { vendorIdx: 1, title: "Data Processing Assessment - DataStream", assessmentType: "privacy", riskRating: "high", score: 65, summary: "Data processing agreements need updating; encryption at rest not consistently applied." },
  { vendorIdx: 2, title: "Operational Review - SecureAuth", assessmentType: "operational", riskRating: "low", score: 88, summary: "Reliable service with excellent uptime and responsive support team." },
  { vendorIdx: 3, title: "Compliance Check - ComplianceBot", assessmentType: "compliance", riskRating: "negligible", score: 92, summary: "Fully compliant with applicable regulations; robust data handling practices." },
];

const DEMO_FRAMEWORKS = [
  {
    name: "ISO 27001:2022", version: "2022", description: "International standard for information security management systems.",
    requirements: [
      { id: "A.5.1", title: "Policies for information security", category: "Organizational" },
      { id: "A.6.1", title: "Screening", category: "People" },
      { id: "A.7.1", title: "Physical security perimeters", category: "Physical" },
      { id: "A.8.1", title: "User endpoint devices", category: "Technological" },
      { id: "A.8.5", title: "Secure authentication", category: "Technological" },
      { id: "A.8.8", title: "Management of technical vulnerabilities", category: "Technological" },
      { id: "A.8.12", title: "Data leakage prevention", category: "Technological" },
      { id: "A.8.16", title: "Monitoring activities", category: "Technological" },
      { id: "A.5.23", title: "Information security for cloud services", category: "Organizational" },
      { id: "A.5.30", title: "ICT readiness for business continuity", category: "Organizational" },
    ],
  },
  {
    name: "NIST CSF 2.0", version: "2.0", description: "NIST Cybersecurity Framework for managing and reducing cybersecurity risk.",
    requirements: [
      { id: "GV.OC-01", title: "Organizational context understood", category: "Govern" },
      { id: "ID.AM-01", title: "Asset inventories maintained", category: "Identify" },
      { id: "PR.AA-01", title: "Access management implemented", category: "Protect" },
      { id: "PR.DS-01", title: "Data-at-rest protected", category: "Protect" },
      { id: "DE.CM-01", title: "Networks monitored", category: "Detect" },
      { id: "DE.AE-01", title: "Anomalies and events analyzed", category: "Detect" },
      { id: "RS.MA-01", title: "Incident management executed", category: "Respond" },
      { id: "RC.RP-01", title: "Recovery plan executed", category: "Recover" },
    ],
  },
  {
    name: "SOC 2 Type II", version: "2024", description: "Service Organization Control 2 Trust Services Criteria.",
    requirements: [
      { id: "CC1.1", title: "COSO principle 1 - Integrity and ethics", category: "Control Environment" },
      { id: "CC2.1", title: "Internal and external communication", category: "Communication" },
      { id: "CC3.1", title: "Risk assessment process", category: "Risk Assessment" },
      { id: "CC5.1", title: "Control activities selection", category: "Control Activities" },
      { id: "CC6.1", title: "Logical and physical access", category: "Logical Access" },
      { id: "CC7.1", title: "System operations monitoring", category: "System Operations" },
      { id: "CC8.1", title: "Change management", category: "Change Management" },
      { id: "CC9.1", title: "Risk mitigation activities", category: "Risk Mitigation" },
    ],
  },
];

const DEMO_KRIS = [
  { name: "Mean Time to Detect (MTTD)", description: "Average time to detect security incidents in hours", category: "cybersecurity", currentValue: 4.2, thresholdGreen: 2, thresholdAmber: 6, thresholdRed: 12, direction: "below_is_good", unit: "hours", frequency: "monthly" },
  { name: "Patch Compliance Rate", description: "Percentage of systems with up-to-date security patches", category: "cybersecurity", currentValue: 87, thresholdGreen: 95, thresholdAmber: 80, thresholdRed: 60, direction: "above_is_good", unit: "%", frequency: "weekly" },
  { name: "Overdue Risk Reviews", description: "Number of risks past their review due date", category: "operational", currentValue: 3, thresholdGreen: 1, thresholdAmber: 5, thresholdRed: 10, direction: "below_is_good", unit: "count", frequency: "monthly" },
  { name: "Vendor SLA Breach Rate", description: "Percentage of vendor SLAs breached in reporting period", category: "operational", currentValue: 2.1, thresholdGreen: 1, thresholdAmber: 3, thresholdRed: 5, direction: "below_is_good", unit: "%", frequency: "monthly" },
  { name: "Regulatory Fine Exposure ($K)", description: "Estimated exposure to regulatory fines in thousands of dollars", category: "regulatory", currentValue: 250, thresholdGreen: 100, thresholdAmber: 500, thresholdRed: 1000, direction: "below_is_good", unit: "$K", frequency: "quarterly" },
  { name: "Revenue Concentration (Top Client %)", description: "Percentage of total revenue from largest single client", category: "financial", currentValue: 34, thresholdGreen: 25, thresholdAmber: 40, thresholdRed: 50, direction: "below_is_good", unit: "%", frequency: "quarterly" },
];

const DEMO_AUDITS = [
  { title: "Annual Information Security Audit 2025", description: "Comprehensive review of information security controls, policies, and procedures for the fiscal year.", auditType: "internal", status: "completed", scope: "All IT systems, security policies, access controls, and incident response procedures.", startDate: "2025-01-15", endDate: "2025-03-31" },
  { title: "SOC 2 Readiness Assessment", description: "External readiness assessment for SOC 2 Type II certification covering security and availability criteria.", auditType: "external", status: "in_progress", scope: "Security, availability, and confidentiality trust service criteria.", startDate: "2025-04-01", endDate: null },
];

const DEMO_FINDINGS = [
  { auditIdx: 0, title: "Privileged access reviews not timely", severity: "critical", status: "in_remediation", dueDate: "2025-06-30", remediationNotes: "Implementing automated quarterly access review process." },
  { auditIdx: 0, title: "Incident response plan not tested in 18 months", severity: "critical", status: "open", dueDate: "2025-05-15", remediationNotes: "Tabletop exercise scheduled for next quarter." },
  { auditIdx: 0, title: "Encryption key rotation overdue", severity: "high", status: "remediated", dueDate: "2025-04-30", remediationNotes: "Key rotation completed and automated schedule implemented." },
  { auditIdx: 0, title: "Missing data classification labels", severity: "high", status: "in_remediation", dueDate: "2025-07-31", remediationNotes: "Data classification project in progress with 60% completion." },
  { auditIdx: 1, title: "Change management documentation gaps", severity: "medium", status: "open", dueDate: "2025-08-15", remediationNotes: "Template updates in review." },
  { auditIdx: 1, title: "Backup restoration testing incomplete", severity: "medium", status: "open", dueDate: "2025-07-15", remediationNotes: "Restoration testing plan being developed." },
  { auditIdx: 1, title: "Security awareness training completion below target", severity: "low", status: "accepted", dueDate: "2025-09-30", remediationNotes: "New training platform deployed; target 95% completion by Q3." },
];

export class DemoDataService {
  async hasDemoData(organizationId: string): Promise<boolean> {
    const count = await Project.count({ where: { organizationId, isDemoData: true } });
    return count > 0;
  }

  async createDemoData(organizationId: string, userId: string) {
    // 1. Risk Categories
    const categoryMap = new Map<string, string>(); // domain -> parentCategoryId
    const DEFAULT_CATEGORIES = [
      { name: "Financial", code: "FIN", children: ["Credit", "Market", "Liquidity", "Budget"] },
      { name: "Cybersecurity", code: "CYB", children: ["Threats", "Vulnerabilities", "Data Breach", "Supply Chain"] },
      { name: "Strategic", code: "STR", children: ["Competitive", "M&A", "Reputation", "Innovation"] },
      { name: "Operational", code: "OPS", children: ["Process", "People", "Technology", "BCP"] },
      { name: "Regulatory", code: "REG", children: ["Compliance", "Legal", "Privacy", "Reporting"] },
    ];

    for (let i = 0; i < DEFAULT_CATEGORIES.length; i++) {
      const def = DEFAULT_CATEGORIES[i];
      const parent = await RiskCategory.create({
        name: def.name, code: def.code, organizationId, level: 0, sortOrder: i, isDemoData: true,
      });
      categoryMap.set(def.name.toLowerCase(), parent.id);

      for (let j = 0; j < def.children.length; j++) {
        await RiskCategory.create({
          name: def.children[j], code: `${def.code}-${j + 1}`, organizationId,
          parentId: parent.id, level: 1, sortOrder: j, isDemoData: true,
        });
      }
    }

    // 2. Projects
    const projects = await Promise.all(
      DEMO_PROJECTS.map((p) =>
        Project.create({
          ...p, organizationId, ownerId: userId, isDemoData: true,
          startDate: "2025-01-15", endDate: p.status === "draft" ? null : "2025-12-31",
        })
      )
    );

    // 3. Frameworks
    const frameworks = await Promise.all(
      DEMO_FRAMEWORKS.map((f) =>
        Framework.create({
          name: f.name, version: f.version, description: f.description,
          requirements: f.requirements, organizationId, isDemoData: true,
        })
      )
    );

    // 4. Vendors
    const vendors = await Promise.all(
      DEMO_VENDORS.map((v) =>
        Vendor.create({ ...v, organizationId, isDemoData: true, contactInfo: {} })
      )
    );

    // 5. Risks (with categoryId)
    const projectAssignment = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, null, null, null];
    const createdRisks: any[] = [];
    const createdControls: any[] = [];

    for (let i = 0; i < DEMO_RISKS.length; i++) {
      const demoRisk = DEMO_RISKS[i];
      const projectIdx = projectAssignment[i];
      const projectId = projectIdx !== null ? projects[projectIdx].id : null;
      const categoryId = categoryMap.get(demoRisk.domain) || null;

      const risk = await Risk.create({
        title: demoRisk.title, description: demoRisk.description, domain: demoRisk.domain,
        status: demoRisk.status, organizationId, projectId, ownerId: userId,
        categoryId, isDemoData: true,
      });
      createdRisks.push(risk);

      // 6. Risk Assessments
      await RiskAssessment.create({
        riskId: risk.id, assessorId: userId, likelihood: demoRisk.likelihood,
        impact: demoRisk.impact, methodology: "Qualitative",
        notes: `Initial assessment for ${demoRisk.title}`,
        assessedAt: new Date(), isDemoData: true,
      });

      // 7. Risk Treatments
      await RiskTreatment.create({
        riskId: risk.id, strategy: demoRisk.treatmentStrategy,
        description: demoRisk.treatmentDescription,
        status: demoRisk.status === "treated" ? "in_progress" : "planned",
        responsibleId: userId, dueDate: "2025-09-30", isDemoData: true,
      });

      // 8. Controls
      for (const ctrl of demoRisk.controls) {
        const control = await Control.create({
          title: ctrl.title, description: `Control for: ${demoRisk.title}`,
          type: ctrl.type, effectiveness: ctrl.effectiveness,
          organizationId, riskId: risk.id, ownerId: userId, isDemoData: true,
          testFrequency: "quarterly",
          nextTestDue: "2025-07-01",
        });
        createdControls.push(control);
      }
    }

    // 9. Risk-Control Mappings (M2M)
    const mappingPairs = [
      [0, 0], [4, 1], [4, 2], [5, 3], [6, 4], [7, 5],
      [8, 6], [9, 7], [14, 8], [16, 9],
    ];
    for (const [rIdx, cIdx] of mappingPairs) {
      if (createdRisks[rIdx] && createdControls[cIdx]) {
        await RiskControlMapping.create({
          riskId: createdRisks[rIdx].id, controlId: createdControls[cIdx].id, mappedById: userId,
        });
      }
    }

    // 10. Control-Framework Mappings
    const cfMappings = [
      { cIdx: 1, fIdx: 0, reqId: "A.8.16" },
      { cIdx: 2, fIdx: 0, reqId: "A.8.1" },
      { cIdx: 3, fIdx: 1, reqId: "PR.DS-01" },
      { cIdx: 4, fIdx: 1, reqId: "DE.CM-01" },
      { cIdx: 5, fIdx: 2, reqId: "CC6.1" },
      { cIdx: 8, fIdx: 0, reqId: "A.8.8" },
      { cIdx: 9, fIdx: 2, reqId: "CC7.1" },
      { cIdx: 6, fIdx: 1, reqId: "DE.AE-01" },
    ];
    for (const m of cfMappings) {
      if (createdControls[m.cIdx] && frameworks[m.fIdx]) {
        await ControlFrameworkMapping.create({
          controlId: createdControls[m.cIdx].id, frameworkId: frameworks[m.fIdx].id,
          requirementId: m.reqId,
        });
      }
    }

    // 11. KRIs
    for (const kri of DEMO_KRIS) {
      await KRI.create({
        ...kri, organizationId, ownerId: userId,
        lastUpdatedValue: new Date().toISOString().split("T")[0], isDemoData: true,
      });
    }

    // 12. Vendor Assessments
    for (const va of DEMO_VENDOR_ASSESSMENTS) {
      await VendorAssessment.create({
        vendorId: vendors[va.vendorIdx].id, title: va.title,
        assessmentType: va.assessmentType, riskRating: va.riskRating,
        score: va.score, summary: va.summary, organizationId,
        assessorId: userId, assessedAt: "2025-02-15", status: "completed",
        isDemoData: true,
      });
    }

    // 13. Risk Quantifications (FAIR)
    const quantRisks = [
      { riskIdx: 4, sle: 2500000, aro: 0.3, confidence: "medium", methodology: "simple_ale", assumptions: "Based on industry ransomware frequency data and estimated recovery costs." },
      { riskIdx: 5, sle: 800000, aro: 0.8, confidence: "high", methodology: "simple_ale", assumptions: "Based on OWASP API security statistics and breach cost analysis." },
      { riskIdx: 7, sle: 1500000, aro: 0.2, confidence: "low", methodology: "fair", assumptions: "Supply chain attacks rare but high impact; based on SolarWinds-type scenarios." },
      { riskIdx: 16, sle: 3000000, aro: 0.1, confidence: "medium", methodology: "simple_ale", assumptions: "Based on data center failure probability and business interruption estimates." },
    ];
    for (const q of quantRisks) {
      if (createdRisks[q.riskIdx]) {
        await RiskQuantification.create({
          riskId: createdRisks[q.riskIdx].id, organizationId, assessorId: userId,
          singleLossExpectancy: q.sle, annualRateOfOccurrence: q.aro,
          confidenceLevel: q.confidence, methodology: q.methodology,
          assumptions: q.assumptions, assessedAt: "2025-03-01", isDemoData: true,
        });
      }
    }

    // 14. Audits
    const audits = await Promise.all(
      DEMO_AUDITS.map((a) =>
        Audit.create({
          ...a, organizationId, leadAuditorId: userId, isDemoData: true,
        })
      )
    );

    // 15. Audit Findings
    for (const f of DEMO_FINDINGS) {
      await AuditFinding.create({
        auditId: audits[f.auditIdx].id, organizationId, title: f.title,
        severity: f.severity, status: f.status, dueDate: f.dueDate,
        remediationNotes: f.remediationNotes, responsibleId: userId, isDemoData: true,
      });
    }

    // 16. Control Monitoring Events
    const monitoringEvents = [
      { cIdx: 0, status: "pass", notes: "Budget variance within acceptable limits." },
      { cIdx: 1, status: "pass", notes: "EDR alerting functioning normally." },
      { cIdx: 2, status: "pass", notes: "Network segmentation rules verified." },
      { cIdx: 3, status: "fail", notes: "2 critical API endpoints missing authentication." },
      { cIdx: 4, status: "pass", notes: "Email gateway blocking 99.2% of phishing attempts." },
      { cIdx: 5, status: "pass", notes: "SCA scan completed; 0 critical vulnerabilities." },
      { cIdx: 6, status: "fail", notes: "Competitive report delayed by 2 weeks." },
      { cIdx: 7, status: "pass", notes: "Integration milestones on track." },
      { cIdx: 8, status: "pass", notes: "ICT risk framework review completed." },
      { cIdx: 9, status: "pass", notes: "Data residency controls functioning." },
      { cIdx: 3, status: "fail", notes: "Repeated: API auth gaps still present." },
      { cIdx: 1, status: "error", notes: "EDR agent connectivity issue on 3 hosts." },
    ];
    for (const e of monitoringEvents) {
      if (createdControls[e.cIdx]) {
        await ControlMonitoringEvent.create({
          controlId: createdControls[e.cIdx].id, organizationId,
          status: e.status, notes: e.notes, executedById: userId,
          executedAt: new Date(), isDemoData: true,
        });

        // Update control monitoring status
        const ctrl = createdControls[e.cIdx];
        if (e.status === "pass") {
          await ctrl.update({ monitoringStatus: "healthy", lastMonitoredAt: new Date(), consecutiveFailures: 0 });
        } else if (e.status === "fail") {
          const newFail = (ctrl.consecutiveFailures || 0) + 1;
          await ctrl.update({
            monitoringStatus: newFail >= 3 ? "failing" : "at_risk",
            lastMonitoredAt: new Date(), consecutiveFailures: newFail,
          });
        }
      }
    }

    // 17. Report Templates
    await ReportTemplate.create({
      name: "Risk Heat Map Report", description: "Risks grouped by domain with status distribution.",
      entityType: "risk", organizationId, createdById: userId,
      columns: [
        { field: "title", label: "Title" }, { field: "domain", label: "Domain" },
        { field: "status", label: "Status" }, { field: "createdAt", label: "Created" },
      ],
      filters: [], groupBy: "domain", sortBy: "createdAt", sortOrder: "desc",
      isShared: true, isDemoData: true,
    });

    await ReportTemplate.create({
      name: "Control Effectiveness Summary", description: "Controls filtered by non-effective status.",
      entityType: "control", organizationId, createdById: userId,
      columns: [
        { field: "title", label: "Title" }, { field: "type", label: "Type" },
        { field: "effectiveness", label: "Effectiveness" }, { field: "monitoringStatus", label: "Monitoring" },
      ],
      filters: [{ field: "effectiveness", operator: "ne", value: "effective" }],
      groupBy: null, sortBy: "effectiveness", sortOrder: "asc",
      isShared: true, isDemoData: true,
    });

    return {
      riskCategories: 25,
      projects: projects.length,
      frameworks: frameworks.length,
      vendors: vendors.length,
      risks: DEMO_RISKS.length,
      kris: DEMO_KRIS.length,
      audits: audits.length,
      findings: DEMO_FINDINGS.length,
      monitoringEvents: monitoringEvents.length,
      reportTemplates: 2,
    };
  }

  async deleteDemoData(organizationId: string) {
    // Delete in reverse FK order
    await ReportTemplate.destroy({ where: { organizationId, isDemoData: true } });
    await ControlMonitoringEvent.destroy({ where: { organizationId, isDemoData: true } });

    // Audit findings then audits
    const audits = await Audit.findAll({ where: { organizationId, isDemoData: true }, attributes: ["id"] });
    const auditIds = audits.map((a) => a.id);
    if (auditIds.length > 0) {
      await AuditFinding.destroy({ where: { auditId: auditIds } });
    }
    await Audit.destroy({ where: { organizationId, isDemoData: true } });

    // Risk quantifications
    await RiskQuantification.destroy({ where: { organizationId, isDemoData: true } });

    // Vendor assessments then vendors
    const vendorList = await Vendor.findAll({ where: { organizationId, isDemoData: true }, attributes: ["id"] });
    const vendorIds = vendorList.map((v) => v.id);
    if (vendorIds.length > 0) {
      await VendorAssessment.destroy({ where: { vendorId: vendorIds } });
    }

    // KRIs
    await KRI.destroy({ where: { organizationId, isDemoData: true } });

    // Control-Framework Mappings & Risk-Control Mappings
    const controls = await Control.findAll({ where: { organizationId, isDemoData: true }, attributes: ["id"] });
    const controlIds = controls.map((c) => c.id);
    if (controlIds.length > 0) {
      await ControlFrameworkMapping.destroy({ where: { controlId: controlIds } });
    }

    const risks = await Risk.findAll({ where: { organizationId, isDemoData: true }, attributes: ["id"] });
    const riskIds = risks.map((r) => r.id);
    if (riskIds.length > 0) {
      await RiskControlMapping.destroy({ where: { riskId: riskIds } });
      await RiskTreatment.destroy({ where: { riskId: riskIds, isDemoData: true } });
      await RiskAssessment.destroy({ where: { riskId: riskIds, isDemoData: true } });
    }

    // Controls, Risks, Vendors, Frameworks, Risk Categories, Projects
    await Control.destroy({ where: { organizationId, isDemoData: true } });
    await Risk.destroy({ where: { organizationId, isDemoData: true } });
    await Vendor.destroy({ where: { organizationId, isDemoData: true } });
    await Framework.destroy({ where: { organizationId, isDemoData: true } });
    await RiskCategory.destroy({ where: { organizationId, isDemoData: true } });
    await Project.destroy({ where: { organizationId, isDemoData: true } });
  }
}

export const demoDataService = new DemoDataService();
