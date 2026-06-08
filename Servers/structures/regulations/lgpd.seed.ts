import { RegulationSeed } from "./types";

export const LGPD_SEED: RegulationSeed = {
  code: "LGPD",
  name: "Lei Geral de Proteção de Dados (Brazil)",
  type: "regulation",
  category: "privacy",
  jurisdiction: "Brazil",
  issuer: "Brazilian National Congress",
  version: "13.709/2018",
  description:
    "Brazilian General Data Protection Law governing the processing of personal data of individuals in Brazil, establishing rights, obligations, and penalties.",
  effectiveDate: "2020-09-18",
  requirements: [
    {
      code: "LGPD.1",
      title: "Legal Bases and Principles",
      level: 0, orderNo: 1,
      children: [
        { code: "LGPD.1.1", title: "Data processing principles", level: 1, orderNo: 1, description: "Process personal data in accordance with principles including purpose adequacy, necessity, free access, data quality, transparency, security, prevention, non-discrimination, and accountability." },
        { code: "LGPD.1.2", title: "Lawful bases for processing", level: 1, orderNo: 2, description: "Identify and document the legal basis for each processing activity from the ten legal bases including consent, legal obligation, public administration, and legitimate interests." },
        { code: "LGPD.1.3", title: "Consent requirements", level: 1, orderNo: 3, description: "Obtain free, informed, and unambiguous consent for processing personal data when consent is the legal basis, with specific purposes in writing." },
        { code: "LGPD.1.4", title: "Processing of children's data", level: 1, orderNo: 4, description: "Obtain specific and prominent consent from at least one parent or legal guardian when processing personal data of children." },
        { code: "LGPD.1.5", title: "Sensitive data processing", level: 1, orderNo: 5, description: "Establish enhanced protections for sensitive personal data including racial origin, health data, biometric data, and political opinions." },
        { code: "LGPD.1.6", title: "Legitimate interest assessment", level: 1, orderNo: 6, description: "Conduct legitimate interest assessments when relying on legitimate interest as the legal basis for processing personal data." },
      ],
    },
    {
      code: "LGPD.2",
      title: "Data Subject Rights",
      level: 0, orderNo: 2,
      children: [
        { code: "LGPD.2.1", title: "Confirmation and access rights", level: 1, orderNo: 1, description: "Confirm the existence of processing and provide access to personal data processed about the data subject upon request." },
        { code: "LGPD.2.2", title: "Correction and rectification", level: 1, orderNo: 2, description: "Enable data subjects to request correction of incomplete, inaccurate, or outdated personal data without undue delay." },
        { code: "LGPD.2.3", title: "Anonymization, blocking, or deletion", level: 1, orderNo: 3, description: "Provide mechanisms for data subjects to request anonymization, blocking, or deletion of unnecessary or excessive data." },
        { code: "LGPD.2.4", title: "Data portability", level: 1, orderNo: 4, description: "Provide data subjects with the right to receive personal data in a structured format and transmit to another service provider." },
        { code: "LGPD.2.5", title: "Information about data sharing", level: 1, orderNo: 5, description: "Inform data subjects about public and private entities with whom the controller has shared data." },
        { code: "LGPD.2.6", title: "Right to object and revoke consent", level: 1, orderNo: 6, description: "Provide mechanisms for data subjects to object to processing and to revoke consent with guaranteed termination of processing." },
        { code: "LGPD.2.7", title: "Review of automated decisions", level: 1, orderNo: 7, description: "Provide data subjects the right to request review of decisions made solely on automated processing of personal data." },
      ],
    },
    {
      code: "LGPD.3",
      title: "Controller and Processor Obligations",
      level: 0, orderNo: 3,
      children: [
        { code: "LGPD.3.1", title: "Controller responsibilities", level: 1, orderNo: 1, description: "Implement technical and organizational measures to protect personal data and demonstrate compliance with LGPD requirements." },
        { code: "LGPD.3.2", title: "Processor obligations", level: 1, orderNo: 2, description: "Enter into written contracts with processors covering processing instructions, security measures, and sub-processing conditions." },
        { code: "LGPD.3.3", title: "Data Protection Officer appointment", level: 1, orderNo: 3, description: "Appoint a Data Protection Officer (DPO/Encarregado) responsible for accepting complaints, providing guidance, and communicating with ANPD." },
        { code: "LGPD.3.4", title: "Records of processing activities", level: 1, orderNo: 4, description: "Maintain records of personal data processing activities including purposes, categories, recipients, and retention periods." },
        { code: "LGPD.3.5", title: "Security measures and incident response", level: 1, orderNo: 5, description: "Implement security, technical, and administrative measures to protect personal data from unauthorized access and accidental destruction." },
        { code: "LGPD.3.6", title: "Data breach notification", level: 1, orderNo: 6, description: "Notify ANPD and affected data subjects of security incidents that may create risk or relevant damage within a reasonable period." },
        { code: "LGPD.3.7", title: "Privacy by design and default", level: 1, orderNo: 7, description: "Incorporate data protection principles into the design of products and services and apply default privacy settings." },
      ],
    },
    {
      code: "LGPD.4",
      title: "International Data Transfers",
      level: 0, orderNo: 4,
      children: [
        { code: "LGPD.4.1", title: "Adequacy determination", level: 1, orderNo: 1, description: "Ensure international transfers of personal data occur only to countries with adequate data protection levels determined by ANPD." },
        { code: "LGPD.4.2", title: "Standard contractual clauses", level: 1, orderNo: 2, description: "Use standard contractual clauses approved by ANPD for international data transfers where adequacy decisions are not available." },
        { code: "LGPD.4.3", title: "Specific transfer safeguards", level: 1, orderNo: 3, description: "Implement specific safeguards for international transfers including binding corporate rules, codes of conduct, and certifications." },
        { code: "LGPD.4.4", title: "Consent for international transfers", level: 1, orderNo: 4, description: "Obtain specific and prominent consent from data subjects for international transfers when other mechanisms are not available." },
      ],
    },
    {
      code: "LGPD.5",
      title: "Enforcement and Penalties",
      level: 0, orderNo: 5,
      children: [
        { code: "LGPD.5.1", title: "ANPD cooperation and inspection", level: 1, orderNo: 1, description: "Cooperate with ANPD during investigations and inspections and provide requested documentation and information." },
        { code: "LGPD.5.2", title: "Sanctions and penalties awareness", level: 1, orderNo: 2, description: "Document awareness of potential sanctions including warnings, fines up to 2% of revenue (limited to 50M reais per violation), and public naming." },
        { code: "LGPD.5.3", title: "Complaint handling", level: 1, orderNo: 3, description: "Establish mechanisms for data subjects and consumer protection entities to submit complaints about data processing practices." },
        { code: "LGPD.5.4", title: "Continuous compliance monitoring", level: 1, orderNo: 4, description: "Monitor compliance with LGPD on an ongoing basis and adapt practices to regulatory guidance and jurisprudence." },
      ],
    },
  ],
};
