import { RegulationSeed } from "./types";

export const NIST_AI_RMF_SEED: RegulationSeed = {
  code: "NIST_AI_RMF",
  name: "NIST AI Risk Management Framework",
  type: "framework",
  category: "ai_governance",
  jurisdiction: "US",
  issuer: "NIST",
  version: "1.0",
  description:
    "A framework for managing AI-related risks, organized around four core functions: Govern, Map, Measure, and Manage.",
  effectiveDate: "2023-01-26",
  requirements: [
    {
      code: "AI.GOV",
      title: "Govern",
      level: 0, orderNo: 1,
      children: [
        { code: "AI.GOV.1", title: "AI risk management governance framework", level: 1, orderNo: 1, description: "Establish and maintain a governance framework for AI risk management that integrates with enterprise risk management." },
        { code: "AI.GOV.2", title: "AI policies and procedures", level: 1, orderNo: 2, description: "Develop and document AI policies and procedures covering ethical principles, risk tolerance, and compliance obligations." },
        { code: "AI.GOV.3", title: "Roles and responsibilities for AI", level: 1, orderNo: 3, description: "Define and assign roles and responsibilities for AI risk management including oversight, accountability, and escalation." },
        { code: "AI.GOV.4", title: "AI transparency and documentation", level: 1, orderNo: 4, description: "Establish transparency and documentation requirements for AI systems including purpose, capabilities, and limitations." },
        { code: "AI.GOV.5", title: "Stakeholder engagement for AI", level: 1, orderNo: 5, description: "Identify and engage with relevant stakeholders including affected communities, domain experts, and third parties." },
        { code: "AI.GOV.6", title: "AI risk culture and training", level: 1, orderNo: 6, description: "Foster a risk-aware culture for AI development and deployment through training, awareness, and leadership commitment." },
        { code: "AI.GOV.7", title: "Third-party AI risk management", level: 1, orderNo: 7, description: "Manage risks from third-party AI systems and components through due diligence, contracts, and ongoing monitoring." },
      ],
    },
    {
      code: "AI.MAP",
      title: "Map",
      level: 0, orderNo: 2,
      children: [
        { code: "AI.MAP.1", title: "AI system context and use case identification", level: 1, orderNo: 1, description: "Identify and document the context, intended purpose, and use cases of AI systems including potential benefits and harms." },
        { code: "AI.MAP.2", title: "AI system life cycle mapping", level: 1, orderNo: 2, description: "Map the AI system life cycle including data collection, model development, testing, deployment, operation, and decommissioning." },
        { code: "AI.MAP.3", title: "AI risk identification", level: 1, orderNo: 3, description: "Identify and document potential AI risks including accuracy, fairness, robustness, transparency, privacy, and safety risks." },
        { code: "AI.MAP.4", title: "AI data mapping and governance", level: 1, orderNo: 4, description: "Map data sources, flows, and transformations throughout the AI system life cycle including data quality and bias assessment." },
        { code: "AI.MAP.5", title: "AI system dependencies", level: 1, orderNo: 5, description: "Identify and document dependencies on external data sources, models, libraries, and infrastructure components." },
        { code: "AI.MAP.6", title: "AI impact assessment", level: 1, orderNo: 6, description: "Conduct impact assessments to understand potential positive and negative effects of AI systems on individuals and society." },
      ],
    },
    {
      code: "AI.MEA",
      title: "Measure",
      level: 0, orderNo: 3,
      children: [
        { code: "AI.MEA.1", title: "AI risk measurement methodology", level: 1, orderNo: 1, description: "Define and apply risk measurement methodologies including quantitative and qualitative approaches for AI-specific risks." },
        { code: "AI.MEA.2", title: "AI performance testing and evaluation", level: 1, orderNo: 2, description: "Conduct performance testing and evaluation of AI systems including accuracy, precision, recall, and fairness metrics." },
        { code: "AI.MEA.3", title: "AI bias and fairness testing", level: 1, orderNo: 3, description: "Test AI systems for bias and fairness across different demographic groups and use fairness metrics to identify disparities." },
        { code: "AI.MEA.4", title: "AI robustness and stress testing", level: 1, orderNo: 4, description: "Evaluate AI system robustness through adversarial testing, edge case analysis, and stress testing under varying conditions." },
        { code: "AI.MEA.5", title: "AI explainability and interpretability", level: 1, orderNo: 5, description: "Assess and document the explainability and interpretability of AI systems to enable stakeholder understanding." },
        { code: "AI.MEA.6", title: "AI monitoring and observability", level: 1, orderNo: 6, description: "Implement monitoring and observability for AI system performance, drift, and anomalous behavior in production." },
        { code: "AI.MEA.7", title: "Third-party AI system evaluation", level: 1, orderNo: 7, description: "Evaluate third-party AI systems and components using equivalent testing and measurement criteria." },
        { code: "AI.MEA.8", title: "AI incident documentation", level: 1, orderNo: 8, description: "Document and analyze AI incidents including near misses, performance degradation, and unexpected behaviors." },
      ],
    },
    {
      code: "AI.MAN",
      title: "Manage",
      level: 0, orderNo: 4,
      children: [
        { code: "AI.MAN.1", title: "AI risk treatment and mitigation", level: 1, orderNo: 1, description: "Develop and implement risk treatment plans for identified AI risks using avoidance, mitigation, transfer, or acceptance strategies." },
        { code: "AI.MAN.2", title: "AI system validation and verification", level: 1, orderNo: 2, description: "Validate and verify AI system performance against defined requirements and risk thresholds before and during deployment." },
        { code: "AI.MAN.3", title: "AI human oversight mechanisms", level: 1, orderNo: 3, description: "Design and implement human oversight mechanisms for AI systems including override capabilities and escalation procedures." },
        { code: "AI.MAN.4", title: "AI continuous monitoring and improvement", level: 1, orderNo: 4, description: "Implement continuous monitoring processes to detect drift, degradation, and emerging risks throughout the AI system life cycle." },
        { code: "AI.MAN.5", title: "AI incident response and recovery", level: 1, orderNo: 5, description: "Establish incident response procedures specific to AI failures including rollback, failover, and corrective actions." },
        { code: "AI.MAN.6", title: "AI change management", level: 1, orderNo: 6, description: "Manage changes to AI systems including model updates, data changes, and configuration modifications through formal change control." },
        { code: "AI.MAN.7", title: "AI documentation and records management", level: 1, orderNo: 7, description: "Maintain comprehensive documentation and records of AI risk management activities for accountability and audit." },
      ],
    },
  ],
};
