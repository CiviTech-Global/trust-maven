import { RegulationSeed } from "./types";

export const ISO27017_SEED: RegulationSeed = {
  code: "ISO_27017",
  name: "ISO/IEC 27017:2015",
  type: "standard",
  category: "information_security",
  jurisdiction: "International",
  issuer: "ISO/IEC",
  version: "2015",
  description:
    "Code of practice for information security controls for cloud services, providing additional implementation guidance for cloud service customers and providers.",
  effectiveDate: "2015-12-15",
  requirements: [
    {
      code: "CLD.1",
      title: "Cloud Service Governance and Strategy",
      level: 0, orderNo: 1,
      children: [
        { code: "CLD.1.1", title: "Cloud service governance framework", level: 1, orderNo: 1, description: "Establish a governance framework for cloud services including policies, roles, and responsibilities for cloud security management." },
        { code: "CLD.1.2", title: "Cloud service strategy and risk appetite", level: 1, orderNo: 2, description: "Define a cloud service strategy aligned with business objectives and establish risk appetite for cloud adoption." },
        { code: "CLD.1.3", title: "Cloud service portfolio management", level: 1, orderNo: 3, description: "Maintain a portfolio of cloud services used by the organization including classification by criticality and data sensitivity." },
        { code: "CLD.1.4", title: "Legal and regulatory compliance for cloud", level: 1, orderNo: 4, description: "Identify and address legal, regulatory, and contractual requirements applicable to cloud service usage including data residency." },
      ],
    },
    {
      code: "CLD.2",
      title: "Shared Responsibilities and Roles",
      level: 0, orderNo: 2,
      children: [
        { code: "CLD.2.1", title: "Shared responsibility model definition", level: 1, orderNo: 1, description: "Clearly define and document the shared security responsibilities between the cloud service customer and cloud service provider." },
        { code: "CLD.2.2", title: "Customer responsibilities in cloud", level: 1, orderNo: 2, description: "The cloud service customer shall retain responsibility for security controls within their scope including access management and data protection." },
        { code: "CLD.2.3", title: "Provider responsibilities and transparency", level: 1, orderNo: 3, description: "The cloud service provider shall provide transparency about security controls, data processing locations, and incident management capabilities." },
        { code: "CLD.2.4", title: "Cloud service agreement security terms", level: 1, orderNo: 4, description: "Ensure cloud service agreements include terms covering security responsibilities, data protection, breach notification, and audit rights." },
      ],
    },
    {
      code: "CLD.3",
      title: "Cloud Data Security and Protection",
      level: 0, orderNo: 3,
      children: [
        { code: "CLD.3.1", title: "Cloud data classification and inventory", level: 1, orderNo: 1, description: "Classify data stored or processed in cloud services and maintain an inventory of cloud data assets and their locations." },
        { code: "CLD.3.2", title: "Cloud data encryption at rest", level: 1, orderNo: 2, description: "Encrypt data stored in cloud services using customer-managed or provider-managed encryption keys." },
        { code: "CLD.3.3", title: "Cloud data encryption in transit", level: 1, orderNo: 3, description: "Protect data transmitted to, from, and between cloud services using strong encryption protocols." },
        { code: "CLD.3.4", title: "Cloud data retention and deletion", level: 1, orderNo: 4, description: "Define and enforce data retention and deletion policies for cloud services ensuring complete removal upon termination." },
        { code: "CLD.3.5", title: "Data residency and sovereignty", level: 1, orderNo: 5, description: "Determine and document data residency requirements and ensure cloud services store and process data only in approved jurisdictions." },
        { code: "CLD.3.6", title: "Cloud data backup and recovery", level: 1, orderNo: 6, description: "Implement data backup and recovery procedures for cloud data and regularly test restoration capabilities." },
      ],
    },
    {
      code: "CLD.4",
      title: "Cloud Access and Identity Management",
      level: 0, orderNo: 4,
      children: [
        { code: "CLD.4.1", title: "Cloud identity and access management", level: 1, orderNo: 1, description: "Implement identity and access management for cloud services including SSO, federated identity, and lifecycle management." },
        { code: "CLD.4.2", title: "Cloud privileged access management", level: 1, orderNo: 2, description: "Control and monitor privileged access to cloud management interfaces and administrative accounts." },
        { code: "CLD.4.3", title: "Cloud access review and recertification", level: 1, orderNo: 3, description: "Review and recertify user access rights to cloud services on a periodic basis and remove excessive permissions." },
        { code: "CLD.4.4", title: "Customer access to cloud management", level: 1, orderNo: 4, description: "Control customer access to cloud service management interfaces including secure remote administration." },
      ],
    },
    {
      code: "CLD.5",
      title: "Cloud Security Operations and Monitoring",
      level: 0, orderNo: 5,
      children: [
        { code: "CLD.5.1", title: "Cloud security monitoring and logging", level: 1, orderNo: 1, description: "Implement security monitoring and logging for cloud services including access logs, configuration changes, and security events." },
        { code: "CLD.5.2", title: "Cloud vulnerability management", level: 1, orderNo: 2, description: "Manage vulnerabilities in cloud infrastructure and services through regular scanning and remediation." },
        { code: "CLD.5.3", title: "Cloud incident response", level: 1, orderNo: 3, description: "Develop incident response procedures specific to cloud environments including coordination with cloud providers." },
        { code: "CLD.5.4", title: "Cloud network security controls", level: 1, orderNo: 4, description: "Implement network security controls in cloud environments including segmentation, firewalls, and traffic monitoring." },
        { code: "CLD.5.5", title: "Cloud provider security assessments", level: 1, orderNo: 5, description: "Assess cloud provider security controls through certifications, audits, and independent third-party reports." },
      ],
    },
    {
      code: "CLD.6",
      title: "Cloud Service Exit and Transition",
      level: 0, orderNo: 6,
      children: [
        { code: "CLD.6.1", title: "Cloud service exit planning", level: 1, orderNo: 1, description: "Develop exit plans for cloud services including data extraction, service transition, and provider termination procedures." },
        { code: "CLD.6.2", title: "Data extraction and portability", level: 1, orderNo: 2, description: "Ensure cloud services provide capabilities to export data in standard formats to support portability and exit." },
        { code: "CLD.6.3", title: "Cloud service decommissioning", level: 1, orderNo: 3, description: "Securely decommission cloud services including data deletion, key revocation, and credential termination." },
        { code: "CLD.6.4", title: "Transition of services between providers", level: 1, orderNo: 4, description: "Manage transitions between cloud service providers with minimal disruption and maintained security controls." },
      ],
    },
  ],
};
