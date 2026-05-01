import { Project } from "../domain.layer/models/project/project.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { RiskAssessment } from "../domain.layer/models/riskAssessment/riskAssessment.model";
import { RiskTreatment } from "../domain.layer/models/riskTreatment/riskTreatment.model";
import { Control } from "../domain.layer/models/control/control.model";

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

export class DemoDataService {
  async hasDemoData(organizationId: string): Promise<boolean> {
    const count = await Project.count({ where: { organizationId, isDemoData: true } });
    return count > 0;
  }

  async createDemoData(organizationId: string, userId: string) {
    // Create projects
    const projects = await Promise.all(
      DEMO_PROJECTS.map((p) =>
        Project.create({
          ...p,
          organizationId,
          ownerId: userId,
          isDemoData: true,
          startDate: "2025-01-15",
          endDate: p.status === "draft" ? null : "2025-12-31",
        })
      )
    );

    // Distribute risks across projects
    const projectAssignment = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, null, null, null];

    for (let i = 0; i < DEMO_RISKS.length; i++) {
      const demoRisk = DEMO_RISKS[i];
      const projectIdx = projectAssignment[i];
      const projectId = projectIdx !== null ? projects[projectIdx].id : null;

      const risk = await Risk.create({
        title: demoRisk.title,
        description: demoRisk.description,
        domain: demoRisk.domain,
        status: demoRisk.status,
        organizationId,
        projectId,
        ownerId: userId,
        isDemoData: true,
      });

      // Create assessment
      await RiskAssessment.create({
        riskId: risk.id,
        assessorId: userId,
        likelihood: demoRisk.likelihood,
        impact: demoRisk.impact,
        methodology: "Qualitative",
        notes: `Initial assessment for ${demoRisk.title}`,
        assessedAt: new Date(),
        isDemoData: true,
      });

      // Create treatment
      await RiskTreatment.create({
        riskId: risk.id,
        strategy: demoRisk.treatmentStrategy,
        description: demoRisk.treatmentDescription,
        status: demoRisk.status === "treated" ? "in_progress" : "planned",
        responsibleId: userId,
        dueDate: "2025-09-30",
        isDemoData: true,
      });

      // Create controls
      for (const ctrl of demoRisk.controls) {
        await Control.create({
          title: ctrl.title,
          description: `Control for: ${demoRisk.title}`,
          type: ctrl.type,
          effectiveness: ctrl.effectiveness,
          organizationId,
          riskId: risk.id,
          ownerId: userId,
          isDemoData: true,
        });
      }
    }

    return { projects: projects.length, risks: DEMO_RISKS.length };
  }

  async deleteDemoData(organizationId: string) {
    // Delete in FK order: treatments → assessments → controls → risks → projects
    const risks = await Risk.findAll({ where: { organizationId, isDemoData: true }, attributes: ["id"] });
    const riskIds = risks.map((r) => r.id);

    if (riskIds.length > 0) {
      await RiskTreatment.destroy({ where: { riskId: riskIds, isDemoData: true } });
      await RiskAssessment.destroy({ where: { riskId: riskIds, isDemoData: true } });
      await Control.destroy({ where: { organizationId, isDemoData: true } });
    }

    await Risk.destroy({ where: { organizationId, isDemoData: true } });
    await Project.destroy({ where: { organizationId, isDemoData: true } });
  }
}

export const demoDataService = new DemoDataService();
