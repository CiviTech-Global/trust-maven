import { RegulationSeed } from "./types";

export const PIPEDA_SEED: RegulationSeed = {
  code: "PIPEDA",
  name: "PIPEDA (Canada)",
  type: "regulation",
  category: "privacy",
  jurisdiction: "Canada",
  issuer: "Parliament of Canada",
  version: "2000",
  description:
    "Personal Information Protection and Electronic Documents Act, governing how private sector organizations collect, use, and disclose personal information.",
  effectiveDate: "2001-01-01",
  requirements: [
    {
      code: "PIPEDA.1",
      title: "Accountability and Governance",
      level: 0, orderNo: 1,
      children: [
        { code: "PIPEDA.1.1", title: "Organizational accountability", level: 1, orderNo: 1, description: "An organization is responsible for personal information under its control and shall designate an individual accountable for compliance." },
        { code: "PIPEDA.1.2", title: "Privacy Officer designation", level: 1, orderNo: 2, description: "Designate a Privacy Officer accountable for the organization's compliance with PIPEDA and data protection obligations." },
        { code: "PIPEDA.1.3", title: "Privacy policies and procedures", level: 1, orderNo: 3, description: "Implement policies and procedures to give effect to PIPEDA principles including complaint handling and breach response." },
        { code: "PIPEDA.1.4", title: "Training and communication", level: 1, orderNo: 4, description: "Train staff on privacy policies and procedures and communicate the organization's privacy practices to the public." },
      ],
    },
    {
      code: "PIPEDA.2",
      title: "Consent and Collection",
      level: 0, orderNo: 2,
      children: [
        { code: "PIPEDA.2.1", title: "Meaningful consent", level: 1, orderNo: 1, description: "Obtain meaningful consent for the collection, use, and disclosure of personal information appropriate to the circumstances." },
        { code: "PIPEDA.2.2", title: "Consent form and content", level: 1, orderNo: 2, description: "Present consent requests in understandable language describing purposes, risks, and consequences of providing or withholding consent." },
        { code: "PIPEDA.2.3", title: "Limiting collection", level: 1, orderNo: 3, description: "Limit collection of personal information to that which is necessary for the identified purposes." },
        { code: "PIPEDA.2.4", title: "Identifying purposes", level: 1, orderNo: 4, description: "Identify the purposes for collecting personal information before or at the time of collection and document them." },
        { code: "PIPEDA.2.5", title: "Collection methods", level: 1, orderNo: 5, description: "Collect personal information by fair and lawful means and not through misrepresentation or deception." },
      ],
    },
    {
      code: "PIPEDA.3",
      title: "Use, Disclosure, and Retention",
      level: 0, orderNo: 3,
      children: [
        { code: "PIPEDA.3.1", title: "Limiting use and disclosure", level: 1, orderNo: 1, description: "Do not use or disclose personal information for purposes other than those for which it was collected without consent or legal authority." },
        { code: "PIPEDA.3.2", title: "Retention schedules", level: 1, orderNo: 2, description: "Establish retention schedules for personal information based on identified purposes and legal requirements." },
        { code: "PIPEDA.3.3", title: "Destruction and anonymization", level: 1, orderNo: 3, description: "Destroy, erase, or anonymize personal information once it is no longer required for identified purposes or legal retention." },
        { code: "PIPEDA.3.4", title: "Disclosure outside Canada", level: 1, orderNo: 4, description: "Ensure transparency about cross-border data transfers and inform individuals that their information may be accessed by foreign authorities." },
      ],
    },
    {
      code: "PIPEDA.4",
      title: "Individual Access and Rights",
      level: 0, orderNo: 4,
      children: [
        { code: "PIPEDA.4.1", title: "Right of access", level: 1, orderNo: 1, description: "Provide individuals with access to their personal information upon request and explain how it has been used and disclosed." },
        { code: "PIPEDA.4.2", title: "Right to challenge accuracy", level: 1, orderNo: 2, description: "Permit individuals to challenge the accuracy and completeness of their personal information and amend it as appropriate." },
        { code: "PIPEDA.4.3", title: "Access request procedures", level: 1, orderNo: 3, description: "Establish procedures for responding to access requests within 30 days with possible extension for specific circumstances." },
        { code: "PIPEDA.4.4", title: "Refusal of access", level: 1, orderNo: 4, description: "Document the grounds for refusing access to personal information as permitted by PIPEDA exceptions and provide reasons to the individual." },
      ],
    },
    {
      code: "PIPEDA.5",
      title: "Security and Breach Notification",
      level: 0, orderNo: 5,
      children: [
        { code: "PIPEDA.5.1", title: "Safeguards and security measures", level: 1, orderNo: 1, description: "Protect personal information with security safeguards appropriate to the sensitivity including physical, organizational, and technological measures." },
        { code: "PIPEDA.5.2", title: "Breach identification and assessment", level: 1, orderNo: 2, description: "Establish procedures to identify and assess data breaches to determine if they pose a real risk of significant harm." },
        { code: "PIPEDA.5.3", title: "Breach reporting to OPC", level: 1, orderNo: 3, description: "Report breaches of security safeguards to the Office of the Privacy Commissioner where it is reasonable to believe a real risk of significant harm exists." },
        { code: "PIPEDA.5.4", title: "Breach notification to individuals", level: 1, orderNo: 4, description: "Notify affected individuals of breaches that pose a real risk of significant harm and provide recommendations to mitigate harm." },
        { code: "PIPEDA.5.5", title: "Breach record keeping", level: 1, orderNo: 5, description: "Maintain records of all breaches of security safeguards for a minimum of two years and provide them to OPC upon request." },
      ],
    },
    {
      code: "PIPEDA.6",
      title: "Transparency and Openness",
      level: 0, orderNo: 6,
      children: [
        { code: "PIPEDA.6.1", title: "Openness about policies and practices", level: 1, orderNo: 1, description: "Make readily available specific information about the organization's policies and practices relating to personal information management." },
        { code: "PIPEDA.6.2", title: "Privacy policy content", level: 1, orderNo: 2, description: "Publish a privacy policy including the name of Privacy Officer, purposes of collection, consent procedures, and complaint mechanisms." },
        { code: "PIPEDA.6.3", title: "Complaint handling", level: 1, orderNo: 3, description: "Establish procedures for receiving and responding to complaints about privacy practices and investigate all complaints received." },
        { code: "PIPEDA.6.4", title: "Challenging compliance", level: 1, orderNo: 4, description: "Provide individuals with the ability to challenge the organization's compliance with PIPEDA principles through a formal complaint process." },
      ],
    },
  ],
};
