import { RegulationSeed } from "./types";

export const CCPA_SEED: RegulationSeed = {
  code: "CCPA",
  name: "California Consumer Privacy Act",
  type: "regulation",
  category: "privacy",
  jurisdiction: "US (California)",
  issuer: "California State Legislature",
  version: "2018",
  description:
    "California law granting consumers rights over their personal information, including the right to know, delete, opt-out, and non-discrimination.",
  effectiveDate: "2020-01-01",
  requirements: [
    {
      code: "CCPA.1",
      title: "Consumer Rights",
      level: 0, orderNo: 1,
      children: [
        { code: "CCPA.1.1", title: "Right to know about personal information collected", level: 1, orderNo: 1, description: "Provide consumers the right to request disclosure of categories and specific pieces of personal information collected about them." },
        { code: "CCPA.1.2", title: "Right to know about sources and sharing", level: 1, orderNo: 2, description: "Disclose to consumers the categories of sources from which personal information is collected and categories of third parties with whom it is shared." },
        { code: "CCPA.1.3", title: "Right to delete personal information", level: 1, orderNo: 3, description: "Provide consumers the right to request deletion of personal information collected from them, subject to exceptions." },
        { code: "CCPA.1.4", title: "Right to opt-out of sale or sharing", level: 1, orderNo: 4, description: "Provide consumers the right to opt-out of the sale or sharing of their personal information to third parties." },
        { code: "CCPA.1.5", title: "Right to correct inaccurate information", level: 1, orderNo: 5, description: "Provide consumers the right to request correction of inaccurate personal information maintained by the business." },
        { code: "CCPA.1.6", title: "Right to limit use of sensitive personal information", level: 1, orderNo: 6, description: "Provide consumers the right to limit the use and disclosure of sensitive personal information for specified purposes." },
        { code: "CCPA.1.7", title: "Right to non-discrimination", level: 1, orderNo: 7, description: "Prohibit discrimination against consumers who exercise their CCPA rights including denial of services or differing prices." },
        { code: "CCPA.1.8", title: "Right to data portability", level: 1, orderNo: 8, description: "Deliver requested personal information in a portable and readily usable format enabling transfer to another entity." },
      ],
    },
    {
      code: "CCPA.2",
      title: "Business Obligations",
      level: 0, orderNo: 2,
      children: [
        { code: "CCPA.2.1", title: "Privacy notice at collection", level: 1, orderNo: 1, description: "Provide consumers with a privacy notice at or before the point of collection detailing categories of information collected and purposes." },
        { code: "CCPA.2.2", title: "Notice of right to opt-out", level: 1, orderNo: 2, description: "Provide clear notice of the right to opt-out of sale or sharing through a prominent Do Not Sell or Share My Personal Information link." },
        { code: "CCPA.2.3", title: "Privacy policy requirements", level: 1, orderNo: 3, description: "Maintain a comprehensive privacy policy that discloses consumer rights, data practices, and contact information." },
        { code: "CCPA.2.4", title: "Consumer request verification", level: 1, orderNo: 4, description: "Establish a process to verify consumer identities when processing rights requests using reasonable authentication methods." },
        { code: "CCPA.2.5", title: "Timely response to consumer requests", level: 1, orderNo: 5, description: "Respond to verified consumer requests within 45 days (extendable by 45 additional days with notice) and provide confirmation of actions taken." },
        { code: "CCPA.2.6", title: "Consumer request tracking", level: 1, orderNo: 6, description: "Maintain records of consumer requests, responses, and actions taken for at least 24 months." },
        { code: "CCPA.2.7", title: "Training of personnel", level: 1, orderNo: 7, description: "Train personnel handling consumer inquiries and requests about CCPA requirements and proper procedures." },
        { code: "CCPA.2.8", title: "Service provider contract requirements", level: 1, orderNo: 8, description: "Enter into written contracts with service providers, contractors, and third parties with specific data protection provisions." },
      ],
    },
    {
      code: "CCPA.3",
      title: "Data Governance and Security",
      level: 0, orderNo: 3,
      children: [
        { code: "CCPA.3.1", title: "Personal information inventory", level: 1, orderNo: 1, description: "Maintain a comprehensive inventory of personal information collected, used, shared, and sold by the business." },
        { code: "CCPA.3.2", title: "Data retention and disposal", level: 1, orderNo: 2, description: "Establish data retention schedules and secure disposal procedures for personal information no longer needed." },
        { code: "CCPA.3.3", title: "Reasonable security measures", level: 1, orderNo: 3, description: "Implement and maintain reasonable security procedures and practices appropriate to the nature of the personal information." },
        { code: "CCPA.3.4", title: "Sensitive personal information protections", level: 1, orderNo: 4, description: "Implement enhanced protections for sensitive personal information including government IDs, financial data, and biometric information." },
        { code: "CCPA.3.5", title: "Data minimization practices", level: 1, orderNo: 5, description: "Limit collection, use, retention, and sharing of personal information to that reasonably necessary for disclosed purposes." },
        { code: "CCPA.3.6", title: "Third-party data sharing agreements", level: 1, orderNo: 6, description: "Establish contractual agreements with third parties regarding limitations on use of shared personal information." },
      ],
    },
    {
      code: "CCPA.4",
      title: "Compliance and Enforcement",
      level: 0, orderNo: 4,
      children: [
        { code: "CCPA.4.1", title: "Consumer request mechanisms", level: 1, orderNo: 1, description: "Establish at least two designated methods for consumers to submit CCPA requests including a toll-free number and a website address." },
        { code: "CCPA.4.2", title: "Authorized agent procedures", level: 1, orderNo: 2, description: "Establish procedures to accept and process requests from authorized agents acting on behalf of consumers." },
        { code: "CCPA.4.3", title: "Opt-out preference signals", level: 1, orderNo: 3, description: "Honor global opt-out preference signals such as GPC (Global Privacy Control) as valid consumer opt-out requests." },
        { code: "CCPA.4.4", title: "Annual risk assessment", level: 1, orderNo: 4, description: "Conduct annual risk assessments for processing activities that present significant privacy risk." },
        { code: "CCPA.4.5", title: "Records of processing", level: 1, orderNo: 5, description: "Maintain records of processing activities including the categories of personal information and purposes for processing." },
        { code: "CCPA.4.6", title: "Compliance reporting", level: 1, orderNo: 6, description: "Prepare and submit compliance reports to the California Privacy Protection Agency as required." },
      ],
    },
  ],
};
