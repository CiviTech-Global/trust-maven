import { RegulationSeed } from "./types";

export const SWIFT_CSP_SEED: RegulationSeed = {
  code: "SWIFT_CSP",
  name: "SWIFT Customer Security Programme",
  type: "standard",
  category: "information_security",
  jurisdiction: "Global",
  issuer: "SWIFT",
  version: "2024",
  description:
    "A set of mandatory and advisory security controls that SWIFT users must implement to protect their local SWIFT infrastructure from cyber threats.",
  effectiveDate: "2024-01-01",
  requirements: [
    {
      code: "SWIFT.1",
      title: "Restrict Internet Access and Protect Critical Systems",
      level: 0, orderNo: 1,
      children: [
        { code: "SWIFT.1.1", title: "Protect SWIFT environment from other networks", level: 1, orderNo: 1, description: "Ensure the SWIFT environment is logically and physically segregated from corporate networks and other environments." },
        { code: "SWIFT.1.2", title: "Reduce attack surface and vulnerabilities", level: 1, orderNo: 2, description: "Apply security hardening and restrict unnecessary services on all SWIFT-related systems and interfaces." },
        { code: "SWIFT.1.3", title: "Physically secure the SWIFT environment", level: 1, orderNo: 3, description: "Implement physical security controls for the SWIFT environment including access controls and monitoring." },
        { code: "SWIFT.1.4", title: "Implement security controls on SWIFT infrastructure", level: 1, orderNo: 4, description: "Ensure all SWIFT infrastructure components are subject to appropriate security controls and configuration management." },
      ],
    },
    {
      code: "SWIFT.2",
      title: "Reduce Attack Surface and Vulnerabilities",
      level: 0, orderNo: 2,
      children: [
        { code: "SWIFT.2.1", title: "Timely patch and update management", level: 1, orderNo: 1, description: "Apply security patches and updates to SWIFT-related systems in a timely manner based on criticality." },
        { code: "SWIFT.2.2", title: "Operating system and software hardening", level: 1, orderNo: 2, description: "Harden operating systems and software on SWIFT-related systems using industry-standard benchmarks." },
        { code: "SWIFT.2.3", title: "Remove unnecessary software and services", level: 1, orderNo: 3, description: "Uninstall or disable all unnecessary software, services, and accounts on SWIFT-related systems." },
        { code: "SWIFT.2.4", title: "Vulnerability scanning and remediation", level: 1, orderNo: 4, description: "Conduct regular vulnerability scans of the SWIFT environment and remediate identified vulnerabilities." },
      ],
    },
    {
      code: "SWIFT.3",
      title: "Manage User Access and Identities",
      level: 0, orderNo: 3,
      children: [
        { code: "SWIFT.3.1", title: "Implement strong password policies", level: 1, orderNo: 1, description: "Enforce strong password policies for all accounts with access to the SWIFT environment including complexity and rotation." },
        { code: "SWIFT.3.2", title: "Multi-factor authentication", level: 1, orderNo: 2, description: "Implement multi-factor authentication for all user access to the SWIFT environment and administrative interfaces." },
        { code: "SWIFT.3.3", title: "Privileged account management", level: 1, orderNo: 3, description: "Control and monitor privileged accounts in the SWIFT environment with strict access management and auditing." },
        { code: "SWIFT.3.4", title: "User account management and review", level: 1, orderNo: 4, description: "Manage user accounts including timely de-provisioning and conduct periodic access reviews." },
        { code: "SWIFT.3.5", title: "Separation of duties", level: 1, orderNo: 5, description: "Implement segregation of duties for critical SWIFT processes including payment initiation, approval, and administration." },
      ],
    },
    {
      code: "SWIFT.4",
      title: "Detect and Respond to Anomalous Activity",
      level: 0, orderNo: 4,
      children: [
        { code: "SWIFT.4.1", title: "Implement logging and monitoring", level: 1, orderNo: 1, description: "Implement comprehensive logging and monitoring of all SWIFT-related activities including transactions and administrative actions." },
        { code: "SWIFT.4.2", title: "Intrusion detection and prevention", level: 1, orderNo: 2, description: "Deploy intrusion detection and prevention systems to monitor network traffic to and from the SWIFT environment." },
        { code: "SWIFT.4.3", title: "Anomalous transaction detection", level: 1, orderNo: 3, description: "Implement anomaly detection capabilities to identify unusual or suspicious SWIFT transactions and messages." },
        { code: "SWIFT.4.4", title: "Incident response capability", level: 1, orderNo: 4, description: "Establish incident response capabilities specific to the SWIFT environment including containment and recovery." },
        { code: "SWIFT.4.5", title: "Forensic readiness", level: 1, orderNo: 5, description: "Maintain forensic readiness capabilities to support investigation of security incidents in the SWIFT environment." },
      ],
    },
    {
      code: "SWIFT.5",
      title: "Plan for Continuity and Recovery",
      level: 0, orderNo: 5,
      children: [
        { code: "SWIFT.5.1", title: "Business continuity for SWIFT operations", level: 1, orderNo: 1, description: "Develop and maintain business continuity plans specific to SWIFT operations ensuring continued service availability." },
        { code: "SWIFT.5.2", title: "Disaster recovery for SWIFT infrastructure", level: 1, orderNo: 2, description: "Develop disaster recovery plans for critical SWIFT infrastructure including failover and restoration procedures." },
        { code: "SWIFT.5.3", title: "Backup and restore testing", level: 1, orderNo: 3, description: "Implement and test backup procedures for SWIFT-related configurations and data on a regular basis." },
        { code: "SWIFT.5.4", title: "BCP testing for SWIFT", level: 1, orderNo: 4, description: "Test business continuity and disaster recovery plans for SWIFT operations at least annually." },
      ],
    },
    {
      code: "SWIFT.6",
      title: "Manage Third-Party and Operational Risk",
      level: 0, orderNo: 6,
      children: [
        { code: "SWIFT.6.1", title: "Third-party access management", level: 1, orderNo: 1, description: "Manage and monitor third-party access to the SWIFT environment including vendors and service providers." },
        { code: "SWIFT.6.2", title: "SWIFT service bureau security", level: 1, orderNo: 2, description: "Ensure SWIFT service bureaus and partners comply with CSP requirements and contractual security obligations." },
        { code: "SWIFT.6.3", title: "Self-assessment and compliance validation", level: 1, orderNo: 3, description: "Conduct annual self-assessments against SWIFT CSP controls and submit attestation to SWIFT." },
        { code: "SWIFT.6.4", title: "Internal audit of SWIFT environment", level: 1, orderNo: 4, description: "Conduct internal audits of the SWIFT environment to validate compliance with CSP mandatory controls." },
      ],
    },
  ],
};
