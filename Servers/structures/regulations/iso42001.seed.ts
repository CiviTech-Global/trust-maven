import { RegulationSeed } from "./types";

export const ISO42001_SEED: RegulationSeed = {
  code: "ISO_42001",
  name: "ISO/IEC 42001:2023",
  type: "standard",
  category: "ai_governance",
  jurisdiction: "International",
  issuer: "ISO/IEC",
  version: "2023",
  description:
    "AI Management System (AIMS) standard providing requirements for establishing, implementing, maintaining, and continually improving an AI management system.",
  effectiveDate: "2023-12-18",
  requirements: [
    {
      code: "AIMS.1",
      title: "AIMS Context and Leadership",
      level: 0, orderNo: 1,
      children: [
        { code: "AIMS.1.1", title: "Understanding organizational AI context", level: 1, orderNo: 1, description: "Determine external and internal issues relevant to AI management including regulatory, social, technological, and ethical factors." },
        { code: "AIMS.1.2", title: "Interested parties for AI", level: 1, orderNo: 2, description: "Identify interested parties relevant to the AIMS and their requirements related to AI systems and their outcomes." },
        { code: "AIMS.1.3", title: "AIMS scope determination", level: 1, orderNo: 3, description: "Determine the boundaries and applicability of the AIMS considering AI system types, deployment contexts, and organizational structure." },
        { code: "AIMS.1.4", title: "AI management system", level: 1, orderNo: 4, description: "Establish, implement, maintain, and continually improve an AI management system in accordance with standard requirements." },
        { code: "AIMS.1.5", title: "AI leadership and commitment", level: 1, orderNo: 5, description: "Top management shall demonstrate leadership and commitment to the AIMS including AI policy and resource provision." },
        { code: "AIMS.1.6", title: "AI policy", level: 1, orderNo: 6, description: "Establish an AI policy appropriate to the organization's purpose including commitments to responsible AI and continual improvement." },
        { code: "AIMS.1.7", title: "AI roles and responsibilities", level: 1, orderNo: 7, description: "Assign and communicate AIMS roles, responsibilities, and authorities throughout the organization." },
      ],
    },
    {
      code: "AIMS.2",
      title: "AIMS Planning",
      level: 0, orderNo: 2,
      children: [
        { code: "AIMS.2.1", title: "AI risk assessment", level: 1, orderNo: 1, description: "Define and apply an AI risk assessment process to identify, analyze, and evaluate AI-related risks and opportunities." },
        { code: "AIMS.2.2", title: "AI risk treatment", level: 1, orderNo: 2, description: "Define and apply an AI risk treatment process including identification of controls and residual risk acceptance." },
        { code: "AIMS.2.3", title: "AI system impact assessment", level: 1, orderNo: 3, description: "Conduct AI system impact assessments for new and significantly changed AI systems addressing ethical and societal impacts." },
        { code: "AIMS.2.4", title: "AI objectives and planning", level: 1, orderNo: 4, description: "Establish AI objectives at relevant functions and levels consistent with the AI policy and measurable where practicable." },
        { code: "AIMS.2.5", title: "Planning of AIMS changes", level: 1, orderNo: 5, description: "Plan changes to the AIMS in a controlled manner considering purpose, impacts, resources, and responsibilities." },
      ],
    },
    {
      code: "AIMS.3",
      title: "AIMS Support and Operation",
      level: 0, orderNo: 3,
      children: [
        { code: "AIMS.3.1", title: "AIMS resources and competence", level: 1, orderNo: 1, description: "Provide resources and ensure personnel have necessary competence for AI management including AI-specific skills and ethics training." },
        { code: "AIMS.3.2", title: "AI awareness", level: 1, orderNo: 2, description: "Ensure personnel are aware of AI policy, their contribution to AIMS effectiveness, and implications of AI non-conformity." },
        { code: "AIMS.3.3", title: "AI communication", level: 1, orderNo: 3, description: "Determine internal and external communications relevant to the AIMS including AI system capabilities and limitations." },
        { code: "AIMS.3.4", title: "AI documented information", level: 1, orderNo: 4, description: "Control documented information for the AIMS including AI system documentation, risk assessments, and policies." },
        { code: "AIMS.3.5", title: "AI operational planning and control", level: 1, orderNo: 5, description: "Plan, implement, and control AI processes to meet requirements and implement actions determined through risk assessment." },
        { code: "AIMS.3.6", title: "AI system design and development", level: 1, orderNo: 6, description: "Manage AI system design and development processes incorporating data governance, transparency, and human oversight." },
        { code: "AIMS.3.7", title: "AI data governance", level: 1, orderNo: 7, description: "Establish data governance for AI systems covering data quality, provenance, bias management, and data rights." },
      ],
    },
    {
      code: "AIMS.4",
      title: "AIMS Performance Evaluation and Improvement",
      level: 0, orderNo: 4,
      children: [
        { code: "AIMS.4.1", title: "AI monitoring and measurement", level: 1, orderNo: 1, description: "Monitor and measure AI system performance against objectives including accuracy, fairness, robustness, and transparency." },
        { code: "AIMS.4.2", title: "AI internal audit", level: 1, orderNo: 2, description: "Conduct internal audits of the AIMS at planned intervals to verify conformity and effectiveness." },
        { code: "AIMS.4.3", title: "AI management review", level: 1, orderNo: 3, description: "Top management shall review the AIMS at planned intervals to ensure continuing suitability, adequacy, and effectiveness." },
        { code: "AIMS.4.4", title: "AI nonconformity and corrective action", level: 1, orderNo: 4, description: "React to AI nonconformities, take corrective action to eliminate causes, and review effectiveness of actions." },
        { code: "AIMS.4.5", title: "AI continual improvement", level: 1, orderNo: 5, description: "Continually improve AIMS suitability, adequacy, and effectiveness through analysis and management review outputs." },
      ],
    },
  ],
};
