import { RegulationSeed } from "./types";

export const ISO27701_SEED: RegulationSeed = {
  code: "ISO_27701",
  name: "ISO/IEC 27701:2019",
  type: "standard",
  category: "privacy",
  jurisdiction: "International",
  issuer: "ISO/IEC",
  version: "2019",
  description:
    "Privacy Information Management System (PIMS) standard extending ISO 27001 and ISO 27002 for privacy information management.",
  effectiveDate: "2019-08-06",
  requirements: [
    {
      code: "PIMS.1",
      title: "PIMS Context and Leadership",
      level: 0, orderNo: 1,
      children: [
        { code: "PIMS.1.1", title: "Understanding organizational context for privacy", level: 1, orderNo: 1, description: "Determine external and internal issues relevant to privacy information management, including legal, regulatory, and technological factors affecting PII processing." },
        { code: "PIMS.1.2", title: "Identifying interested parties for privacy", level: 1, orderNo: 2, description: "Determine interested parties relevant to the PIMS and their requirements related to privacy information management." },
        { code: "PIMS.1.3", title: "PIMS scope determination", level: 1, orderNo: 3, description: "Determine the boundaries and applicability of the PIMS considering organizational context and interested party requirements." },
        { code: "PIMS.1.4", title: "Privacy leadership and commitment", level: 1, orderNo: 4, description: "Top management shall demonstrate leadership and commitment to the PIMS by ensuring privacy policy and objectives are established." },
        { code: "PIMS.1.5", title: "Privacy policy", level: 1, orderNo: 5, description: "Establish a privacy policy that is appropriate to the purpose of the organization and includes commitments to satisfy applicable requirements." },
      ],
    },
    {
      code: "PIMS.2",
      title: "Privacy Planning",
      level: 0, orderNo: 2,
      children: [
        { code: "PIMS.2.1", title: "Privacy risk assessment", level: 1, orderNo: 1, description: "Define and apply a privacy risk assessment process considering PII processing context, nature, scope, and purposes." },
        { code: "PIMS.2.2", title: "Privacy risk treatment", level: 1, orderNo: 2, description: "Define and apply a privacy risk treatment process to address identified privacy risks and determine necessary controls." },
        { code: "PIMS.2.3", title: "Privacy objectives planning", level: 1, orderNo: 3, description: "Establish privacy objectives at relevant functions and levels consistent with the privacy policy and measurable where practicable." },
        { code: "PIMS.2.4", title: "PII identification and mapping", level: 1, orderNo: 4, description: "Identify and document PII in the organization's possession, including PII flows across systems and third parties." },
        { code: "PIMS.2.5", title: "Lawful basis determination", level: 1, orderNo: 5, description: "Determine and document the lawful basis for each PII processing activity, including consent, contract, legal obligation, and legitimate interests." },
      ],
    },
    {
      code: "PIMS.3",
      title: "Privacy Support and Operation",
      level: 0, orderNo: 3,
      children: [
        { code: "PIMS.3.1", title: "Privacy resources and competence", level: 1, orderNo: 1, description: "Provide adequate resources and ensure personnel have the necessary competence for PIMS operation and privacy management." },
        { code: "PIMS.3.2", title: "Privacy awareness and training", level: 1, orderNo: 2, description: "Ensure personnel are aware of the privacy policy, their contributions to PIMS effectiveness, and implications of non-conformity." },
        { code: "PIMS.3.3", title: "PII processing records", level: 1, orderNo: 3, description: "Maintain records of PII processing activities including purposes, categories, recipients, retention periods, and security measures." },
        { code: "PIMS.3.4", title: "Privacy by design and default", level: 1, orderNo: 4, description: "Implement privacy by design and default principles, ensuring PII is processed only for specified purposes and minimized by default." },
        { code: "PIMS.3.5", title: "PII minimization and de-identification", level: 1, orderNo: 5, description: "Implement controls to minimize PII collection, processing, and retention, and apply de-identification techniques where appropriate." },
      ],
    },
    {
      code: "PIMS.4",
      title: "PII Subject Rights",
      level: 0, orderNo: 4,
      children: [
        { code: "PIMS.4.1", title: "PII principal rights management", level: 1, orderNo: 1, description: "Establish and implement procedures to enable PII principals to exercise their rights including access, rectification, erasure, and objection." },
        { code: "PIMS.4.2", title: "Transparency and notice", level: 1, orderNo: 2, description: "Provide PII principals with clear information about PII processing including purposes, lawful basis, retention, and rights." },
        { code: "PIMS.4.3", title: "PII access and portability", level: 1, orderNo: 3, description: "Enable PII principals to access their PII and receive it in a structured, commonly used, machine-readable format." },
        { code: "PIMS.4.4", title: "PII correction and erasure", level: 1, orderNo: 4, description: "Provide mechanisms for PII principals to request and obtain correction or erasure of their PII without undue delay." },
        { code: "PIMS.4.5", title: "Objection and restriction handling", level: 1, orderNo: 5, description: "Establish procedures to handle PII principal objections and processing restriction requests within required timeframes." },
      ],
    },
    {
      code: "PIMS.5",
      title: "Privacy Breach Management",
      level: 0, orderNo: 5,
      children: [
        { code: "PIMS.5.1", title: "PII breach identification and response", level: 1, orderNo: 1, description: "Establish and implement a process to identify, assess, and respond to PII breaches in a timely manner." },
        { code: "PIMS.5.2", title: "Breach notification to authorities", level: 1, orderNo: 2, description: "Establish procedures for notifying supervisory authorities of PII breaches within applicable legal timeframes." },
        { code: "PIMS.5.3", title: "Breach notification to PII principals", level: 1, orderNo: 3, description: "Establish procedures for communicating PII breaches to affected PII principals when required by applicable regulations." },
        { code: "PIMS.5.4", title: "Breach documentation and analysis", level: 1, orderNo: 4, description: "Maintain records of all PII breaches including facts, effects, remedial actions, and lessons learned for continuous improvement." },
      ],
    },
    {
      code: "PIMS.6",
      title: "Third-Party PII Processing",
      level: 0, orderNo: 6,
      children: [
        { code: "PIMS.6.1", title: "PII processor selection and due diligence", level: 1, orderNo: 1, description: "Select PII processors that provide sufficient guarantees of implementing appropriate technical and organizational measures." },
        { code: "PIMS.6.2", title: "PII processing agreements", level: 1, orderNo: 2, description: "Establish written agreements with PII processors covering processing instructions, confidentiality, security, and sub-processing conditions." },
        { code: "PIMS.6.3", title: "Cross-border PII transfers", level: 1, orderNo: 3, description: "Implement appropriate safeguards for PII transferred across borders, including adequacy decisions, standard contractual clauses, or binding corporate rules." },
        { code: "PIMS.6.4", title: "Processor compliance monitoring", level: 1, orderNo: 4, description: "Monitor PII processor compliance with contractual obligations and applicable privacy requirements on an ongoing basis." },
        { code: "PIMS.6.5", title: "Sub-processor management", level: 1, orderNo: 5, description: "Require processors to obtain authorization before engaging sub-processors and maintain transparency about sub-processor relationships." },
      ],
    },
    {
      code: "PIMS.7",
      title: "Privacy Performance Evaluation",
      level: 0, orderNo: 7,
      children: [
        { code: "PIMS.7.1", title: "Privacy performance monitoring", level: 1, orderNo: 1, description: "Monitor and measure privacy performance against privacy objectives and controls through defined metrics and indicators." },
        { code: "PIMS.7.2", title: "Internal privacy audit", level: 1, orderNo: 2, description: "Conduct internal audits of the PIMS at planned intervals to verify conformity with organizational and standard requirements." },
        { code: "PIMS.7.3", title: "Privacy management review", level: 1, orderNo: 3, description: "Top management shall review the PIMS at planned intervals to ensure continuing suitability, adequacy, and effectiveness." },
        { code: "PIMS.7.4", title: "Data protection impact assessment", level: 1, orderNo: 4, description: "Conduct DPIAs for processing activities likely to result in high risk to the rights and freedoms of PII principals." },
      ],
    },
  ],
};
