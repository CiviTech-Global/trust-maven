import { RegulationSeed } from "./types";

export const APRA_CPS_234_SEED: RegulationSeed = {
  code: "APRA_CPS_234",
  name: "APRA Prudential Standard CPS 234",
  type: "regulation",
  category: "information_security",
  jurisdiction: "Australia",
  issuer: "Australian Prudential Regulation Authority",
  version: "2019",
  description:
    "Australian prudential standard requiring APRA-regulated entities to implement robust information security capabilities and practices.",
  effectiveDate: "2019-07-01",
  requirements: [
    {
      code: "CPS234.1",
      title: "Information Security Capability",
      level: 0, orderNo: 1,
      children: [
        { code: "CPS234.1.1", title: "Information security capability framework", level: 1, orderNo: 1, description: "Define and maintain an information security capability with appropriate resources, expertise, and authority commensurate with the size and risk profile of the entity." },
        { code: "CPS234.1.2", title: "Information security roles and responsibilities", level: 1, orderNo: 2, description: "Clearly define and document information security roles and responsibilities including board, senior management, and operational accountability." },
        { code: "CPS234.1.3", title: "Board and senior management accountability", level: 1, orderNo: 3, description: "Board and senior management are ultimately accountable for the information security capability and for ensuring it is adequately resourced." },
        { code: "CPS234.1.4", title: "CISO or equivalent role", level: 1, orderNo: 4, description: "Designate a senior executive responsible for information security who reports directly to the board or senior management." },
      ],
    },
    {
      code: "CPS234.2",
      title: "Information Security Controls",
      level: 0, orderNo: 2,
      children: [
        { code: "CPS234.2.1", title: "Control implementation and maintenance", level: 1, orderNo: 1, description: "Implement and maintain information security controls to protect the confidentiality, integrity, and availability of information assets." },
        { code: "CPS234.2.2", title: "Control design and operating effectiveness", level: 1, orderNo: 2, description: "Design information security controls to effectively mitigate identified information security risks and validate operating effectiveness." },
        { code: "CPS234.2.3", title: "Control testing and validation", level: 1, orderNo: 3, description: "Test the effectiveness of information security controls at least annually and after significant changes to information assets." },
        { code: "CPS234.2.4", title: "Control remediation", level: 1, orderNo: 4, description: "Remediate control deficiencies on a prioritized basis based on risk and implement compensating controls where immediate remediation is not possible." },
      ],
    },
    {
      code: "CPS234.3",
      title: "Information Asset Management and Classification",
      level: 0, orderNo: 3,
      children: [
        { code: "CPS234.3.1", title: "Information asset classification", level: 1, orderNo: 1, description: "Classify information assets based on criticality and sensitivity to inform the level of protection required." },
        { code: "CPS234.3.2", title: "Information asset inventory", level: 1, orderNo: 2, description: "Maintain a complete and up-to-date inventory of information assets including data, systems, and infrastructure components." },
        { code: "CPS234.3.3", title: "Information asset risk assessment", level: 1, orderNo: 3, description: "Assess risks to information assets based on their classification, threats, vulnerabilities, and potential business impacts." },
        { code: "CPS234.3.4", title: "Asset lifecycle management", level: 1, orderNo: 4, description: "Manage information assets throughout their lifecycle including procurement, change, maintenance, and secure disposal." },
      ],
    },
    {
      code: "CPS234.4",
      title: "Incident Management and Response",
      level: 0, orderNo: 4,
      children: [
        { code: "CPS234.4.1", title: "Information security incident management", level: 1, orderNo: 1, description: "Establish and maintain an information security incident management capability to detect, respond to, and recover from incidents." },
        { code: "CPS234.4.2", title: "Incident notification to APRA", level: 1, orderNo: 2, description: "Notify APRA of material information security incidents as soon as possible and within the timeframes specified by APRA." },
        { code: "CPS234.4.3", title: "Incident response testing", level: 1, orderNo: 3, description: "Test the incident response plan at least annually through tabletop exercises, simulations, and post-incident reviews." },
        { code: "CPS234.4.4", title: "Incident lessons learned", level: 1, orderNo: 4, description: "Conduct post-incident reviews to identify root causes, lessons learned, and implement improvements to prevent recurrence." },
      ],
    },
    {
      code: "CPS234.5",
      title: "Third-Party and Outsourcing Security",
      level: 0, orderNo: 5,
      children: [
        { code: "CPS234.5.1", title: "Third-party information security assessment", level: 1, orderNo: 1, description: "Assess the information security capability of material third-party service providers before engagement and periodically thereafter." },
        { code: "CPS234.5.2", title: "Contractual security requirements", level: 1, orderNo: 2, description: "Include minimum information security requirements in contracts with material third-party service providers." },
        { code: "CPS234.5.3", title: "Ongoing third-party monitoring", level: 1, orderNo: 3, description: "Monitor the ongoing effectiveness of third-party information security controls and promptly address identified deficiencies." },
        { code: "CPS234.5.4", title: "Third-party incident notification", level: 1, orderNo: 4, description: "Require third-party service providers to notify the entity of information security incidents affecting the entity's information assets." },
      ],
    },
    {
      code: "CPS234.6",
      title: "Testing and Assurance",
      level: 0, orderNo: 6,
      children: [
        { code: "CPS234.6.1", title: "Systematic testing program", level: 1, orderNo: 1, description: "Establish a systematic testing program to assess the effectiveness of information security controls on a regular basis." },
        { code: "CPS234.6.2", title: "Independent assurance", level: 1, orderNo: 2, description: "Obtain independent assurance on the effectiveness of the information security capability through internal audit or external assessment." },
        { code: "CPS234.6.3", title: "Reporting to APRA", level: 1, orderNo: 3, description: "Report information security control testing results and assurance findings to APRA upon request and as required." },
        { code: "CPS234.6.4", title: "Remediation of findings", level: 1, orderNo: 4, description: "Document, prioritize, and remediate findings from testing and assurance activities within defined timeframes." },
      ],
    },
  ],
};
