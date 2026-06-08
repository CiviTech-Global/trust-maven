import { RegulationSeed } from "./types";

export const BSIMM_SEED: RegulationSeed = {
  code: "BSIMM",
  name: "Building Security In Maturity Model (BSIMM)",
  type: "framework",
  category: "information_security",
  jurisdiction: "Global",
  issuer: "Synopsys",
  version: "BSIMM14",
  description:
    "A model for measuring and improving software security initiatives, organized across four domains: Governance, Intelligence, SSDL, and Deployment.",
  effectiveDate: "2023-01-01",
  requirements: [
    {
      code: "BSIMM.G",
      title: "Governance",
      level: 0, orderNo: 1,
      children: [
        { code: "BSIMM.G.1", title: "Strategy and metrics", level: 1, orderNo: 1, description: "Define and measure software security strategy through leading and lagging indicators to track program effectiveness." },
        { code: "BSIMM.G.2", title: "Compliance and policy", level: 1, orderNo: 2, description: "Establish software security policies and ensure compliance with regulatory requirements and industry standards." },
        { code: "BSIMM.G.3", title: "Training and awareness", level: 1, orderNo: 3, description: "Develop and deliver role-based software security training for developers, QA, and security champions." },
        { code: "BSIMM.G.4", title: "Community and champions", level: 1, orderNo: 4, description: "Build a security champions program and cultivate a community of practice for software security." },
        { code: "BSIMM.G.5", title: "Bug bounty and vulnerability disclosure", level: 1, orderNo: 5, description: "Establish vulnerability disclosure and bug bounty programs to leverage external researcher contributions." },
        { code: "BSIMM.G.6", title: "Software security vendor management", level: 1, orderNo: 6, description: "Assess and manage security of third-party software components and vendors throughout the supply chain." },
      ],
    },
    {
      code: "BSIMM.I",
      title: "Intelligence",
      level: 0, orderNo: 2,
      children: [
        { code: "BSIMM.I.1", title: "Attack models and threat modeling", level: 1, orderNo: 1, description: "Develop and maintain attack models and perform threat modeling to identify potential security threats." },
        { code: "BSIMM.I.2", title: "Security features and design", level: 1, orderNo: 2, description: "Define standard security features and design patterns for authentication, authorization, encryption, and auditing." },
        { code: "BSIMM.I.3", title: "Standards and requirements", level: 1, orderNo: 3, description: "Create and maintain security standards and requirements for common application security concerns." },
        { code: "BSIMM.I.4", title: "Configuration and coding standards", level: 1, orderNo: 4, description: "Define secure coding standards and configuration guidelines aligned with industry best practices." },
      ],
    },
    {
      code: "BSIMM.S",
      title: "SSDL (Secure Software Development Lifecycle)",
      level: 0, orderNo: 3,
      children: [
        { code: "BSIMM.S.1", title: "Security requirements review", level: 1, orderNo: 1, description: "Review software requirements for security implications and define security requirements for new features." },
        { code: "BSIMM.S.2", title: "Architecture analysis", level: 1, orderNo: 2, description: "Conduct architecture risk analysis on high-value and high-risk applications during development." },
        { code: "BSIMM.S.3", title: "Code review and SAST", level: 1, orderNo: 3, description: "Perform static analysis security testing and manual code review to identify vulnerabilities in source code." },
        { code: "BSIMM.S.4", title: "Security testing and DAST", level: 1, orderNo: 4, description: "Conduct dynamic analysis security testing including web application scanning and API security testing." },
        { code: "BSIMM.S.5", title: "Penetration testing", level: 1, orderNo: 5, description: "Perform penetration testing on high-risk applications using manual and automated techniques." },
        { code: "BSIMM.S.6", title: "Software environment and dependency management", level: 1, orderNo: 6, description: "Manage third-party dependencies, libraries, and open source components for known vulnerabilities." },
        { code: "BSIMM.S.7", title: "Deployment and operations security", level: 1, orderNo: 7, description: "Integrate security into deployment processes including configuration validation and runtime protection." },
        { code: "BSIMM.S.8", title: "Continuous integration security", level: 1, orderNo: 8, description: "Embed security tools and checks into CI/CD pipelines for automated security validation." },
      ],
    },
    {
      code: "BSIMM.D",
      title: "Deployment",
      level: 0, orderNo: 4,
      children: [
        { code: "BSIMM.D.1", title: "Vulnerability management", level: 1, orderNo: 1, description: "Establish a vulnerability management program to track, prioritize, and remediate software vulnerabilities." },
        { code: "BSIMM.D.2", title: "Environment hardening", level: 1, orderNo: 2, description: "Harden deployment environments including container configurations, cloud settings, and middleware." },
        { code: "BSIMM.D.3", title: "Operational monitoring and logging", level: 1, orderNo: 3, description: "Implement security monitoring, logging, and alerting for applications in production environments." },
        { code: "BSIMM.D.4", title: "Incident response for applications", level: 1, orderNo: 4, description: "Develop incident response capabilities specific to application security incidents including rollback and hotfix." },
        { code: "BSIMM.D.5", title: "Cloud security management", level: 1, orderNo: 5, description: "Implement security controls for cloud deployments including identity management, encryption, and network security." },
        { code: "BSIMM.D.6", title: "Measurement and reporting", level: 1, orderNo: 6, description: "Collect and report software security metrics to stakeholders and use data to drive improvement." },
      ],
    },
  ],
};
