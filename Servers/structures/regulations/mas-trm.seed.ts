import { RegulationSeed } from "./types";

export const MAS_TRM_SEED: RegulationSeed = {
  code: "MAS_TRM",
  name: "MAS Technology Risk Management Guidelines",
  type: "standard",
  category: "information_security",
  jurisdiction: "Singapore",
  issuer: "Monetary Authority of Singapore",
  version: "2021",
  description:
    "Singapore guidelines establishing technology risk management principles and best practices for financial institutions.",
  effectiveDate: "2021-01-15",
  requirements: [
    {
      code: "MAS.1",
      title: "Technology Risk Governance",
      level: 0, orderNo: 1,
      children: [
        { code: "MAS.1.1", title: "Board and senior management oversight", level: 1, orderNo: 1, description: "Board and senior management should provide oversight of technology risk management and establish a clear risk governance structure." },
        { code: "MAS.1.2", title: "Technology risk management framework", level: 1, orderNo: 2, description: "Establish a technology risk management framework that identifies, measures, monitors, and controls technology risks." },
        { code: "MAS.1.3", title: "Roles and responsibilities", level: 1, orderNo: 3, description: "Define clear roles and responsibilities for technology risk management including the appointment of a Chief Technology Risk Officer." },
        { code: "MAS.1.4", title: "Technology risk policies and procedures", level: 1, orderNo: 4, description: "Develop and maintain technology risk policies and procedures aligned with the institution's risk appetite." },
        { code: "MAS.1.5", title: "Independent technology risk audit", level: 1, orderNo: 5, description: "Conduct independent audits of technology risk management at least annually by internal or external auditors." },
      ],
    },
    {
      code: "MAS.2",
      title: "IT Project and Change Management",
      level: 0, orderNo: 2,
      children: [
        { code: "MAS.2.1", title: "IT project management framework", level: 1, orderNo: 1, description: "Establish an IT project management framework covering project initiation, planning, execution, monitoring, and closure." },
        { code: "MAS.2.2", title: "System development lifecycle", level: 1, orderNo: 2, description: "Implement a secure system development lifecycle with security requirements, code review, and testing integrated throughout." },
        { code: "MAS.2.3", title: "Change management process", level: 1, orderNo: 3, description: "Implement a formal change management process for all technology changes including classification, testing, authorization, and post-implementation review." },
        { code: "MAS.2.4", title: "User acceptance testing", level: 1, orderNo: 4, description: "Conduct user acceptance testing for all system changes before deployment to production environments." },
        { code: "MAS.2.5", title: "Release and deployment management", level: 1, orderNo: 5, description: "Implement release and deployment management procedures including rollback plans and production verification." },
      ],
    },
    {
      code: "MAS.3",
      title: "IT Security",
      level: 0, orderNo: 3,
      children: [
        { code: "MAS.3.1", title: "Information security policy", level: 1, orderNo: 1, description: "Establish a comprehensive information security policy covering all aspects of technology and data protection." },
        { code: "MAS.3.2", title: "Access control management", level: 1, orderNo: 2, description: "Implement access controls based on least privilege and need-to-know principles with regular access reviews." },
        { code: "MAS.3.3", title: "Multi-factor authentication", level: 1, orderNo: 3, description: "Implement multi-factor authentication for all system access, particularly for privileged accounts and remote access." },
        { code: "MAS.3.4", title: "Network security controls", level: 1, orderNo: 4, description: "Implement network segmentation, firewalls, and intrusion detection systems to protect the internal network." },
        { code: "MAS.3.5", title: "Data encryption requirements", level: 1, orderNo: 5, description: "Encrypt sensitive data at rest and in transit using approved cryptographic algorithms and key management practices." },
        { code: "MAS.3.6", title: "Malware protection", level: 1, orderNo: 6, description: "Deploy anti-malware and endpoint protection solutions across all systems and implement regular signature updates." },
        { code: "MAS.3.7", title: "Vulnerability and patch management", level: 1, orderNo: 7, description: "Establish a vulnerability management program including regular scanning, risk-based prioritization, and timely patching." },
      ],
    },
    {
      code: "MAS.4",
      title: "IT Operations and Resiliency",
      level: 0, orderNo: 4,
      children: [
        { code: "MAS.4.1", title: "System availability and capacity management", level: 1, orderNo: 1, description: "Monitor system availability and capacity to meet agreed service levels and plan for future capacity requirements." },
        { code: "MAS.4.2", title: "Data backup and recovery", level: 1, orderNo: 2, description: "Implement data backup procedures and regularly test data restoration to ensure recoverability within defined RTOs." },
        { code: "MAS.4.3", title: "Business continuity and disaster recovery", level: 1, orderNo: 3, description: "Develop and maintain business continuity and disaster recovery plans for critical systems and business functions." },
        { code: "MAS.4.4", title: "BCP testing and exercises", level: 1, orderNo: 4, description: "Conduct regular BCP/DRP tests including tabletop exercises and full failover tests at least annually." },
        { code: "MAS.4.5", title: "Incident management and response", level: 1, orderNo: 5, description: "Establish an incident management process to detect, respond to, and recover from technology incidents." },
        { code: "MAS.4.6", title: "IT service desk and support", level: 1, orderNo: 6, description: "Maintain an IT service desk to receive, track, and resolve technology issues and service requests." },
      ],
    },
    {
      code: "MAS.5",
      title: "Outsourcing and Third-Party Risk",
      level: 0, orderNo: 5,
      children: [
        { code: "MAS.5.1", title: "Outsourcing risk management framework", level: 1, orderNo: 1, description: "Establish an outsourcing risk management framework covering due diligence, contract management, and ongoing oversight." },
        { code: "MAS.5.2", title: "Material outsourcing notification", level: 1, orderNo: 2, description: "Notify MAS of material outsourcing arrangements and conduct risk assessments before entering into such arrangements." },
        { code: "MAS.5.3", title: "Third-party security assessment", level: 1, orderNo: 3, description: "Assess the security controls of third-party service providers and cloud service providers before and during the engagement." },
        { code: "MAS.5.4", title: "Cloud service risk management", level: 1, orderNo: 4, description: "Implement specific risk management measures for cloud services including data residency, access controls, and incident response." },
        { code: "MAS.5.5", title: "Exit strategies and transition planning", level: 1, orderNo: 5, description: "Develop exit strategies for critical outsourced services to ensure business continuity in case of service provider failure." },
      ],
    },
  ],
};
