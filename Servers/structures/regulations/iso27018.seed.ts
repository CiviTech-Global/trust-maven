import { RegulationSeed } from "./types";

export const ISO27018_SEED: RegulationSeed = {
  code: "ISO_27018",
  name: "ISO/IEC 27018:2019",
  type: "standard",
  category: "privacy",
  jurisdiction: "International",
  issuer: "ISO/IEC",
  version: "2019",
  description:
    "Code of practice for protection of personally identifiable information (PII) in public clouds, providing controls for cloud service providers processing PII.",
  effectiveDate: "2019-01-31",
  requirements: [
    {
      code: "PII.1",
      title: "Consent and Choice Requirements",
      level: 0, orderNo: 1,
      children: [
        { code: "PII.1.1", title: "Consent for PII processing in cloud", level: 1, orderNo: 1, description: "Obtain consent from PII principals before processing their PII in public cloud services and provide clear purpose descriptions." },
        { code: "PII.1.2", title: "Notice to PII principals", level: 1, orderNo: 2, description: "Provide PII principals with clear notice about PII processing in the cloud including purposes, types of data, and third-party disclosures." },
        { code: "PII.1.3", title: "Marketing and secondary use restrictions", level: 1, orderNo: 3, description: "Restrict use of PII for marketing or secondary purposes without explicit consent from PII principals." },
        { code: "PII.1.4", title: "Choice mechanisms for PII principals", level: 1, orderNo: 4, description: "Provide PII principals with mechanisms to exercise choice regarding PII processing in the cloud." },
      ],
    },
    {
      code: "PII.2",
      title: "Purpose Limitation and Use Restrictions",
      level: 0, orderNo: 2,
      children: [
        { code: "PII.2.1", title: "Purpose specification", level: 1, orderNo: 1, description: "Specify the purposes for which PII may be processed in the cloud and document them in the cloud service agreement." },
        { code: "PII.2.2", title: "Limitation on use by cloud provider", level: 1, orderNo: 2, description: "The cloud service provider shall not use PII for purposes other than those specified by the customer without consent." },
        { code: "PII.2.3", title: "Cloud provider as data processor", level: 1, orderNo: 3, description: "The cloud service provider shall process PII only as a data processor acting on documented instructions from the customer." },
        { code: "PII.2.4", title: "Prohibition of PII use for advertising", level: 1, orderNo: 4, description: "Prohibit the cloud provider from using PII for advertising, market research, or similar purposes without explicit consent." },
      ],
    },
    {
      code: "PII.3",
      title: "Data Subject Rights and Transparency",
      level: 0, orderNo: 3,
      children: [
        { code: "PII.3.1", title: "PII principal access rights", level: 1, orderNo: 1, description: "Enable PII principals to access their PII held in cloud services and provide mechanisms for access requests." },
        { code: "PII.3.2", title: "Correction and deletion support", level: 1, orderNo: 2, description: "Support PII principals' rights to correct or delete their PII held in the cloud and propagate changes." },
        { code: "PII.3.3", title: "Transparency about sub-processors", level: 1, orderNo: 3, description: "Maintain transparency about sub-processors engaged to process PII and provide customers with notification of changes." },
        { code: "PII.3.4", title: "Data processing location disclosure", level: 1, orderNo: 4, description: "Disclose the locations where PII may be processed or stored and obtain consent for cross-border transfers." },
        { code: "PII.3.5", title: "PII principal complaint handling", level: 1, orderNo: 5, description: "Establish procedures for handling complaints from PII principals regarding PII processing in the cloud." },
      ],
    },
    {
      code: "PII.4",
      title: "Security of PII in the Cloud",
      level: 0, orderNo: 4,
      children: [
        { code: "PII.4.1", title: "Security controls for PII protection", level: 1, orderNo: 1, description: "Implement security controls to protect PII in the cloud including encryption, access controls, and network security." },
        { code: "PII.4.2", title: "Encryption of PII at rest", level: 1, orderNo: 2, description: "Encrypt PII stored in public cloud services using encryption mechanisms controlled by the customer where feasible." },
        { code: "PII.4.3", title: "Encryption of PII in transit", level: 1, orderNo: 3, description: "Protect PII transmitted to, from, and within cloud services using strong encryption." },
        { code: "PII.4.4", title: "Access controls for PII", level: 1, orderNo: 4, description: "Restrict access to PII in cloud services to authorized personnel only and implement least privilege principles." },
        { code: "PII.4.5", title: "PII breach notification", level: 1, orderNo: 5, description: "Notify the cloud service customer of any breach involving PII without undue delay and provide breach details." },
        { code: "PII.4.6", title: "Logging and monitoring of PII access", level: 1, orderNo: 6, description: "Log and monitor access to PII in cloud services to detect unauthorized access and support investigations." },
      ],
    },
    {
      code: "PII.5",
      title: "Data Retention, Deletion and Return",
      level: 0, orderNo: 5,
      children: [
        { code: "PII.5.1", title: "PII retention limits", level: 1, orderNo: 1, description: "Implement controls to ensure PII is retained only as long as necessary and securely deleted after the retention period." },
        { code: "PII.5.2", title: "PII return and deletion at contract end", level: 1, orderNo: 2, description: "Return or securely delete all PII held by the cloud provider at the end of the service agreement and verify deletion." },
        { code: "PII.5.3", title: "Secure sanitization of cloud resources", level: 1, orderNo: 3, description: "Securely sanitize cloud resources that have stored PII before they are re-provisioned for other customers." },
        { code: "PII.5.4", title: "PII deletion verification", level: 1, orderNo: 4, description: "Provide customers with verification that PII has been securely deleted from cloud systems including backups." },
        { code: "PII.5.5", title: "Handover of PII on termination", level: 1, orderNo: 5, description: "Facilitate the orderly handover of PII to the customer or alternative provider upon contract termination." },
      ],
    },
    {
      code: "PII.6",
      title: "Accountability and Compliance",
      level: 0, orderNo: 6,
      children: [
        { code: "PII.6.1", title: "Cloud provider accountability", level: 1, orderNo: 1, description: "The cloud service provider shall designate a person responsible for privacy and PII protection within the organization." },
        { code: "PII.6.2", title: "Independent verification and audit", level: 1, orderNo: 2, description: "Undergo independent audits and provide evidence of compliance with the standard to customers." },
        { code: "PII.6.3", title: "Transparency about sub-processor changes", level: 1, orderNo: 3, description: "Notify customers of intended changes to sub-processors and allow customers to object to new sub-processors." },
        { code: "PII.6.4", title: "Compliance with applicable law", level: 1, orderNo: 4, description: "Comply with all applicable privacy laws and regulations in the jurisdictions where PII is processed." },
        { code: "PII.6.5", title: "Records of PII processing", level: 1, orderNo: 5, description: "Maintain records of PII processing activities in the cloud including purposes, categories, and retention periods." },
      ],
    },
  ],
};
