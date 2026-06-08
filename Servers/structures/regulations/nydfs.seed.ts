import { RegulationSeed } from "./types";

export const NYDFS_SEED: RegulationSeed = {
  code: "NYDFS",
  name: "NYDFS Cybersecurity Regulation (23 NYCRR 500)",
  type: "regulation",
  category: "information_security",
  jurisdiction: "US (New York)",
  issuer: "New York Department of Financial Services",
  version: "2023",
  description:
    "New York State regulation requiring financial services institutions to implement comprehensive cybersecurity programs to protect consumer data.",
  effectiveDate: "2023-11-01",
  requirements: [
    {
      code: "NYDFS.1",
      title: "Cybersecurity Program and Governance",
      level: 0, orderNo: 1,
      children: [
        { code: "NYDFS.1.1", title: "Cybersecurity program establishment", level: 1, orderNo: 1, description: "Establish and maintain a cybersecurity program designed to protect the confidentiality, integrity, and availability of information systems." },
        { code: "NYDFS.1.2", title: "Cybersecurity program scope", level: 1, orderNo: 2, description: "Ensure the cybersecurity program covers all information systems, nonpublic information, and all aspects of the covered entity's operations." },
        { code: "NYDFS.1.3", title: "Chief Information Security Officer", level: 1, orderNo: 3, description: "Designate a qualified CISO responsible for overseeing and implementing the cybersecurity program and reporting to senior management." },
        { code: "NYDFS.1.4", title: "CISO reporting and accountability", level: 1, orderNo: 4, description: "CISO shall report in writing at least annually to the board or senior governing body on cybersecurity matters and risks." },
        { code: "NYDFS.1.5", title: "Cybersecurity personnel and resources", level: 1, orderNo: 5, description: "Employ qualified cybersecurity personnel with adequate training and resources to manage the cybersecurity program effectively." },
      ],
    },
    {
      code: "NYDFS.2",
      title: "Risk Assessment and Management",
      level: 0, orderNo: 2,
      children: [
        { code: "NYDFS.2.1", title: "Risk assessment requirement", level: 1, orderNo: 1, description: "Conduct periodic risk assessments to identify and evaluate cybersecurity risks to information systems and nonpublic information." },
        { code: "NYDFS.2.2", title: "Risk assessment methodology", level: 1, orderNo: 2, description: "Document a risk assessment methodology covering threat identification, vulnerability assessment, and impact analysis." },
        { code: "NYDFS.2.3", title: "Risk-based control selection", level: 1, orderNo: 3, description: "Design and implement cybersecurity controls based on risk assessment results, tailored to the covered entity's specific risk profile." },
        { code: "NYDFS.2.4", title: "Risk assessment updates", level: 1, orderNo: 4, description: "Update risk assessments whenever material changes occur to the information systems or business operations, and at least annually." },
      ],
    },
    {
      code: "NYDFS.3",
      title: "Cybersecurity Policies and Procedures",
      level: 0, orderNo: 3,
      children: [
        { code: "NYDFS.3.1", title: "Written cybersecurity policy", level: 1, orderNo: 1, description: "Develop and maintain written cybersecurity policies approved by the board or senior governing body." },
        { code: "NYDFS.3.2", title: "Policy areas and coverage", level: 1, orderNo: 2, description: "Address all required policy areas including information security, access controls, data retention, incident response, and vendor management." },
        { code: "NYDFS.3.3", title: "Policy review and updates", level: 1, orderNo: 3, description: "Review cybersecurity policies at least annually and update them to reflect changes in risks, technology, and regulatory requirements." },
        { code: "NYDFS.3.4", title: "Policy communication and enforcement", level: 1, orderNo: 4, description: "Communicate cybersecurity policies to all personnel and enforce compliance through technical and administrative controls." },
      ],
    },
    {
      code: "NYDFS.4",
      title: "Access Controls and Identity Management",
      level: 0, orderNo: 4,
      children: [
        { code: "NYDFS.4.1", title: "Access control policy and management", level: 1, orderNo: 1, description: "Establish access control policies limiting access to information systems based on business need and least privilege." },
        { code: "NYDFS.4.2", title: "Privileged access management", level: 1, orderNo: 2, description: "Limit privileged access to information systems and implement controls including monitoring and periodic review of privileged accounts." },
        { code: "NYDFS.4.3", title: "Multi-factor authentication", level: 1, orderNo: 3, description: "Use multi-factor authentication for remote access to information systems, privileged accounts, and third-party connections." },
        { code: "NYDFS.4.4", title: "Identity and access management", level: 1, orderNo: 4, description: "Implement identity and access management controls including unique user IDs, timely de-provisioning, and periodic access reviews." },
      ],
    },
    {
      code: "NYDFS.5",
      title: "Data Protection and Asset Management",
      level: 0, orderNo: 5,
      children: [
        { code: "NYDFS.5.1", title: "Data classification and inventory", level: 1, orderNo: 1, description: "Classify nonpublic information based on sensitivity and maintain an inventory of data assets and their locations." },
        { code: "NYDFS.5.2", title: "Encryption of nonpublic information", level: 1, orderNo: 2, description: "Encrypt nonpublic information at rest and in transit using industry-standard encryption protocols." },
        { code: "NYDFS.5.3", title: "Data retention and disposal", level: 1, orderNo: 3, description: "Establish data retention schedules and securely dispose of nonpublic information no longer needed for business purposes." },
        { code: "NYDFS.5.4", title: "Asset management lifecycle", level: 1, orderNo: 4, description: "Manage information assets throughout their lifecycle including procurement, deployment, maintenance, and secure decommissioning." },
      ],
    },
    {
      code: "NYDFS.6",
      title: "Monitoring and Incident Response",
      level: 0, orderNo: 6,
      children: [
        { code: "NYDFS.6.1", title: "Continuous monitoring", level: 1, orderNo: 1, description: "Implement continuous monitoring or periodic penetration testing and vulnerability assessments of information systems." },
        { code: "NYDFS.6.2", title: "Audit trail management", level: 1, orderNo: 2, description: "Maintain audit trails designed to detect and respond to cybersecurity events and retain logs for at least three years." },
        { code: "NYDFS.6.3", title: "Incident response plan", level: 1, orderNo: 3, description: "Develop and implement an incident response plan addressing preparation, detection, analysis, containment, eradication, and recovery." },
        { code: "NYDFS.6.4", title: "Incident notification to superintendent", level: 1, orderNo: 4, description: "Notify the DFS superintendent of cybersecurity incidents within 72 hours of determination that an incident has occurred." },
        { code: "NYDFS.6.5", title: "Incident documentation and reporting", level: 1, orderNo: 5, description: "Document all cybersecurity incidents, response actions, and post-incident reviews for regulatory reporting and improvement." },
      ],
    },
    {
      code: "NYDFS.7",
      title: "Third-Party and Vendor Risk Management",
      level: 0, orderNo: 7,
      children: [
        { code: "NYDFS.7.1", title: "Vendor risk management policy", level: 1, orderNo: 1, description: "Establish a written vendor risk management policy covering due diligence, contracting, and ongoing monitoring." },
        { code: "NYDFS.7.2", title: "Third-party risk assessment", level: 1, orderNo: 2, description: "Conduct risk assessments of third-party service providers with access to nonpublic information before engagement." },
        { code: "NYDFS.7.3", title: "Vendor security requirements", level: 1, orderNo: 3, description: "Include cybersecurity requirements in vendor contracts including MFA, encryption, incident notification, and audit rights." },
        { code: "NYDFS.7.4", title: "Ongoing vendor monitoring", level: 1, orderNo: 4, description: "Monitor third-party compliance with cybersecurity requirements on an ongoing basis through assessments and regular reviews." },
      ],
    },
    {
      code: "NYDFS.8",
      title: "Training and Awareness",
      level: 0, orderNo: 8,
      children: [
        { code: "NYDFS.8.1", title: "Cybersecurity awareness program", level: 1, orderNo: 1, description: "Implement a cybersecurity awareness program that includes periodic training for all personnel on cybersecurity risks and responsibilities." },
        { code: "NYDFS.8.2", title: "Social engineering and phishing training", level: 1, orderNo: 2, description: "Include social engineering and phishing awareness in cybersecurity training to reduce the risk of credential compromise." },
        { code: "NYDFS.8.3", title: "Role-based security training", level: 1, orderNo: 3, description: "Provide role-specific cybersecurity training for personnel with elevated system access or security responsibilities." },
        { code: "NYDFS.8.4", title: "Training documentation and tracking", level: 1, orderNo: 4, description: "Document cybersecurity training activities and track completion rates for all personnel and relevant third parties." },
      ],
    },
  ],
};
