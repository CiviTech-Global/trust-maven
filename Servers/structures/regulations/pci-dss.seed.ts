import { RegulationSeed } from "./types";

export const PCI_DSS_SEED: RegulationSeed = {
  code: "PCI_DSS_4",
  name: "Payment Card Industry Data Security Standard v4.0",
  type: "standard",
  category: "information_security",
  jurisdiction: "Global",
  issuer: "PCI Security Standards Council",
  version: "4.0",
  description:
    "The PCI Data Security Standard (PCI DSS) is a set of security standards designed to ensure that all companies that accept, process, store or transmit credit card information maintain a secure environment.",
  effectiveDate: "2024-03-31",
  requirements: [
    {
      code: "Req.1",
      title: "Install and Maintain Network Security Controls",
      level: 0, orderNo: 1,
      children: [
        { code: "1.1", title: "Configure and manage network security controls (NSCs)", level: 1, orderNo: 1, description: "Establish and maintain processes for network security control management, including configuration standards and change management." },
        { code: "1.2", title: "Maintain network security controls diagram", level: 1, orderNo: 2, description: "Maintain an accurate network diagram showing all connections between the CDE and other networks." },
        { code: "1.3", title: "Restrict traffic between trusted and untrusted networks", level: 1, orderNo: 3, description: "Limit inbound and outbound traffic to only what is necessary for the cardholder data environment (CDE)." },
        { code: "1.4", title: "Control network connections", level: 1, orderNo: 4, description: "Implement controls to manage network connections, including denying all traffic by default." },
        { code: "1.5", title: "Implement security controls on NSCs", level: 1, orderNo: 5, description: "Configure security controls on all network devices to protect against threats." },
      ],
    },
    {
      code: "Req.2",
      title: "Apply Secure Configurations to All System Components",
      level: 0, orderNo: 2,
      children: [
        { code: "2.1", title: "Develop configuration standards", level: 1, orderNo: 1, description: "Develop and maintain baseline configuration standards for all system components." },
        { code: "2.2", title: "Manage system accounts and passwords", level: 1, orderNo: 2, description: "Remove unnecessary accounts and implement strong password policies for all system components." },
        { code: "2.3", title: "Encrypt non-console administrative access", level: 1, orderNo: 3, description: "Use strong cryptography for all non-console administrative access to system components." },
      ],
    },
    {
      code: "Req.3",
      title: "Protect Stored Account Data",
      level: 0, orderNo: 3,
      children: [
        { code: "3.1", title: "Minimize data retention", level: 1, orderNo: 1, description: "Implement data retention and disposal policies to minimize stored cardholder data." },
        { code: "3.2", title: "Secure stored PAN", level: 1, orderNo: 2, description: "Render PAN unreadable anywhere it is stored through tokenization, truncation, or encryption." },
        { code: "3.3", title: "Encrypt keys and manage cryptographic keys", level: 1, orderNo: 3, description: "Securely store and manage cryptographic keys used to protect stored account data." },
        { code: "3.4", title: "Document and implement cryptographic key management", level: 1, orderNo: 4, description: "Maintain a documented key management process covering key generation, distribution, rotation, and destruction." },
      ],
    },
    {
      code: "Req.4",
      title: "Protect Cardholder Data with Strong Cryptography During Transmission",
      level: 0, orderNo: 4,
      children: [
        { code: "4.1", title: "Encrypt transmission of cardholder data", level: 1, orderNo: 1, description: "Use strong cryptography and security protocols to safeguard cardholder data during transmission over open, public networks." },
        { code: "4.2", title: "Disable insecure protocols", level: 1, orderNo: 2, description: "Ensure wireless networks transmitting cardholder data use strong encryption and disable insecure protocols." },
      ],
    },
    {
      code: "Req.5",
      title: "Protect All Systems and Networks from Malicious Software",
      level: 0, orderNo: 5,
      children: [
        { code: "5.1", title: "Deploy anti-malware software", level: 1, orderNo: 1, description: "Deploy anti-malware software on all system components at risk of malware infection." },
        { code: "5.2", title: "Keep anti-malware current", level: 1, orderNo: 2, description: "Ensure anti-malware mechanisms are actively running, current, and generating audit logs." },
        { code: "5.3", title: "Manage anti-malware mechanisms", level: 1, orderNo: 3, description: "Document and implement processes for managing anti-malware mechanisms, including periodic scans." },
      ],
    },
    {
      code: "Req.6",
      title: "Develop and Maintain Secure Systems and Software",
      level: 0, orderNo: 6,
      children: [
        { code: "6.1", title: "Implement software security processes", level: 1, orderNo: 1, description: "Establish and maintain processes for securely developing and maintaining software, including threat modeling." },
        { code: "6.2", title: "Custom software security", level: 1, orderNo: 2, description: "Ensure custom software is developed securely through code review, security testing, and training." },
        { code: "6.3", title: "Apply security patches", level: 1, orderNo: 3, description: "Apply security patches to all system components within one month of release." },
        { code: "6.4", title: "Manage software vulnerabilities", level: 1, orderNo: 4, description: "Identify and manage vulnerabilities in software components using industry-recognized sources." },
      ],
    },
    {
      code: "Req.7",
      title: "Restrict Access to System Components and Cardholder Data by Business Need to Know",
      level: 0, orderNo: 7,
      children: [
        { code: "7.1", title: "Implement access control systems", level: 1, orderNo: 1, description: "Establish and maintain access control systems that restrict access based on business need to know." },
        { code: "7.2", title: "Review access rights", level: 1, orderNo: 2, description: "Periodically review and manage user access rights to system components and cardholder data." },
      ],
    },
    {
      code: "Req.8",
      title: "Identify Users and Authenticate Access",
      level: 0, orderNo: 8,
      children: [
        { code: "8.1", title: "Manage user identities", level: 1, orderNo: 1, description: "Establish and implement processes to manage user identities for all system components." },
        { code: "8.2", title: "Implement strong authentication", level: 1, orderNo: 2, description: "Implement MFA for all non-console administrative access and remote network access to the CDE." },
        { code: "8.3", title: "Manage authentication factors", level: 1, orderNo: 3, description: "Securely manage authentication factors including passwords, passphrases, and cryptographic keys." },
      ],
    },
    {
      code: "Req.9",
      title: "Restrict Physical Access to Cardholder Data",
      level: 0, orderNo: 9,
      children: [
        { code: "9.1", title: "Control physical access", level: 1, orderNo: 1, description: "Implement physical security controls to restrict access to facilities housing cardholder data." },
        { code: "9.2", title: "Manage physical access devices", level: 1, orderNo: 2, description: "Manage physical access devices such as badges, keys, and locks used to secure sensitive areas." },
        { code: "9.3", title: "Protect devices at point of interaction", level: 1, orderNo: 3, description: "Protect devices that capture cardholder data from tampering and substitution." },
      ],
    },
    {
      code: "Req.10",
      title: "Log and Monitor All Access",
      level: 0, orderNo: 10,
      children: [
        { code: "10.1", title: "Implement audit logging", level: 1, orderNo: 1, description: "Enable audit logging for all system components to record user activities and events." },
        { code: "10.2", title: "Protect audit logs", level: 1, orderNo: 2, description: "Protect audit log files from unauthorized access, modification, and deletion." },
        { code: "10.3", title: "Review and monitor logs", level: 1, orderNo: 3, description: "Review daily logs and implement automated log correlation and alerting for security events." },
        { code: "10.4", title: "Retain logs", level: 1, orderNo: 4, description: "Retain audit trail history for at least 12 months, with at least 3 months immediately available." },
      ],
    },
    {
      code: "Req.11",
      title: "Test Security of Networks and Systems Regularly",
      level: 0, orderNo: 11,
      children: [
        { code: "11.1", title: "Conduct vulnerability scans", level: 1, orderNo: 1, description: "Perform quarterly internal and external vulnerability scans and after any significant change." },
        { code: "11.2", title: "Run penetration tests", level: 1, orderNo: 2, description: "Perform annual penetration testing covering the CDE and critical systems." },
        { code: "11.3", title: "Deploy intrusion detection", level: 1, orderNo: 3, description: "Deploy network and file integrity monitoring to detect unauthorized changes." },
        { code: "11.4", title: "Monitor for anomalies", level: 1, orderNo: 4, description: "Monitor network traffic for anomalies and unauthorized access attempts." },
      ],
    },
    {
      code: "Req.12",
      title: "Support Information Security with Organizational Policies and Programs",
      level: 0, orderNo: 12,
      children: [
        { code: "12.1", title: "Establish security policies", level: 1, orderNo: 1, description: "Establish, publish, maintain, and disseminate an organization-wide information security policy." },
        { code: "12.2", title: "Assign security roles", level: 1, orderNo: 2, description: "Assign responsibility for managing information security to a chief information security officer or equivalent." },
        { code: "12.3", title: "Manage risk", level: 1, orderNo: 3, description: "Perform periodic formal risk assessments to identify threats, vulnerabilities, and business impact." },
        { code: "12.4", title: "Manage service providers", level: 1, orderNo: 4, description: "Manage and monitor service providers with access to cardholder data through written agreements and due diligence." },
        { code: "12.5", title: "Conduct security awareness", level: 1, orderNo: 5, description: "Implement a formal security awareness program making all personnel aware of cardholder data security responsibilities." },
        { code: "12.6", title: "Test incident response", level: 1, orderNo: 6, description: "Test the incident response plan at least annually, document results, and remediate gaps." },
      ],
    },
  ],
};
