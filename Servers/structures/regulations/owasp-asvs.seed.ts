import { RegulationSeed } from "./types";

export const OWASP_ASVS_SEED: RegulationSeed = {
  code: "OWASP_ASVS",
  name: "OWASP Application Security Verification Standard",
  type: "standard",
  category: "information_security",
  jurisdiction: "Global",
  issuer: "OWASP",
  version: "4.0.3",
  description:
    "A framework of security requirements and verification levels for web applications, covering authentication, access control, data validation, cryptography, and more.",
  effectiveDate: "2021-10-01",
  requirements: [
    {
      code: "V1",
      title: "Architecture, Design and Threat Modeling",
      level: 0, orderNo: 1,
      children: [
        { code: "V1.1", title: "Secure software development lifecycle", level: 1, orderNo: 1, description: "Verify the use of a secure software development lifecycle that addresses security requirements throughout all stages." },
        { code: "V1.2", title: "Threat modeling", level: 1, orderNo: 2, description: "Verify that threat modeling is performed for all application components and design changes." },
        { code: "V1.3", title: "Security architecture", level: 1, orderNo: 3, description: "Verify that the application architecture incorporates security principles including least privilege and defense in depth." },
        { code: "V1.4", title: "Third-party component security", level: 1, orderNo: 4, description: "Verify that all third-party components are inventoried and assessed for known vulnerabilities before use." },
        { code: "V1.5", title: "Secure configuration management", level: 1, orderNo: 5, description: "Verify that the application and its infrastructure are configured securely following industry benchmarks." },
      ],
    },
    {
      code: "V2",
      title: "Authentication Verification Requirements",
      level: 0, orderNo: 2,
      children: [
        { code: "V2.1", title: "Password security", level: 1, orderNo: 1, description: "Verify that passwords are at least 8 characters with no maximum length limit and stored using strong adaptive salted hashing." },
        { code: "V2.2", title: "Multi-factor authentication", level: 1, orderNo: 2, description: "Verify that MFA is required for all administrative accounts and can be enrolled or enforced for all users." },
        { code: "V2.3", title: "Authentication verification", level: 1, orderNo: 3, description: "Verify that authentication mechanisms are resistant to brute force attacks through rate limiting and account lockout." },
        { code: "V2.4", title: "Credential management", level: 1, orderNo: 4, description: "Verify that credentials are not stored in source code, configuration files, or logs." },
        { code: "V2.5", title: "Session management", level: 1, orderNo: 5, description: "Verify that sessions are unique, random, and invalidated on logout, timeout, or password change." },
        { code: "V2.6", title: "Federated authentication", level: 1, orderNo: 6, description: "Verify that federated identity management uses only trusted providers and validates tokens cryptographically." },
      ],
    },
    {
      code: "V3",
      title: "Access Control Verification",
      level: 0, orderNo: 3,
      children: [
        { code: "V3.1", title: "Least privilege access control", level: 1, orderNo: 1, description: "Verify that the application enforces the principle of least privilege through role-based or attribute-based access control." },
        { code: "V3.2", title: "Administrative access controls", level: 1, orderNo: 2, description: "Verify that administrative interfaces have appropriate access controls and are not accessible to unauthorized users." },
        { code: "V3.3", title: "Insecure direct object reference prevention", level: 1, orderNo: 3, description: "Verify that the application prevents insecure direct object references by using indirect references or authorization checks." },
        { code: "V3.4", title: "Cross-origin resource sharing", level: 1, orderNo: 4, description: "Verify that CORS headers are properly configured and only allow trusted origins." },
      ],
    },
    {
      code: "V4",
      title: "Input Validation and Output Encoding",
      level: 0, orderNo: 4,
      children: [
        { code: "V4.1", title: "Input validation", level: 1, orderNo: 1, description: "Verify that all user-supplied input is validated for type, length, format, and range on the server side." },
        { code: "V4.2", title: "Output encoding and injection prevention", level: 1, orderNo: 2, description: "Verify that output encoding is applied for the appropriate interpreter to prevent injection attacks." },
        { code: "V4.3", title: "SQL injection prevention", level: 1, orderNo: 3, description: "Verify that parameterized queries or prepared statements are used for all database access." },
        { code: "V4.4", title: "Cross-site scripting prevention", level: 1, orderNo: 4, description: "Verify that contextual output encoding is applied to prevent reflected, stored, and DOM-based XSS." },
        { code: "V4.5", title: "File upload security", level: 1, orderNo: 5, description: "Verify that file uploads are restricted to allowed types, scanned for malware, and stored outside the web root." },
      ],
    },
    {
      code: "V5",
      title: "Cryptography Verification",
      level: 0, orderNo: 5,
      children: [
        { code: "V5.1", title: "Cryptographic algorithm selection", level: 1, orderNo: 1, description: "Verify that only approved cryptographic algorithms, key lengths, and modes are used for data protection." },
        { code: "V5.2", title: "Key management", level: 1, orderNo: 2, description: "Verify that cryptographic keys are managed securely throughout their lifecycle including generation, storage, rotation, and destruction." },
        { code: "V5.3", title: "Random number generation", level: 1, orderNo: 3, description: "Verify that cryptographically secure random number generation is used for all security-sensitive purposes." },
        { code: "V5.4", title: "TLS configuration", level: 1, orderNo: 4, description: "Verify that TLS is used for all communications and configured with modern protocols and ciphers." },
      ],
    },
    {
      code: "V6",
      title: "Logging and Monitoring",
      level: 0, orderNo: 6,
      children: [
        { code: "V6.1", title: "Security event logging", level: 1, orderNo: 1, description: "Verify that all authentication decisions, access control failures, and input validation failures are logged." },
        { code: "V6.2", title: "Log integrity and protection", level: 1, orderNo: 2, description: "Verify that logs are protected from unauthorized access, modification, and deletion." },
        { code: "V6.3", title: "Monitoring and alerting", level: 1, orderNo: 3, description: "Verify that security monitoring and alerting is in place to detect and respond to suspicious activity." },
        { code: "V6.4", title: "Audit trail completeness", level: 1, orderNo: 4, description: "Verify that audit logs contain sufficient detail including timestamps, user identity, source IP, and event outcome." },
      ],
    },
    {
      code: "V7",
      title: "Data Protection and Privacy",
      level: 0, orderNo: 7,
      children: [
        { code: "V7.1", title: "Data classification and protection", level: 1, orderNo: 1, description: "Verify that sensitive data is classified and protected at rest and in transit with appropriate encryption." },
        { code: "V7.2", title: "Data minimization", level: 1, orderNo: 2, description: "Verify that the application only collects and retains data necessary for its intended purpose." },
        { code: "V7.3", title: "Privacy controls", level: 1, orderNo: 3, description: "Verify that privacy controls are implemented including consent management, data subject rights, and data retention." },
        { code: "V7.4", title: "Cache and client-side storage", level: 1, orderNo: 4, description: "Verify that sensitive data is not stored in browser caches, local storage, or session storage unnecessarily." },
      ],
    },
    {
      code: "V8",
      title: "API and Web Service Security",
      level: 0, orderNo: 8,
      children: [
        { code: "V8.1", title: "API authentication and authorization", level: 1, orderNo: 1, description: "Verify that all API endpoints enforce authentication and authorization checks for every request." },
        { code: "V8.2", title: "API input validation and rate limiting", level: 1, orderNo: 2, description: "Verify that APIs validate all inputs, enforce content types, and implement rate limiting to prevent abuse." },
        { code: "V8.3", title: "API error handling", level: 1, orderNo: 3, description: "Verify that API error responses do not leak implementation details, stack traces, or sensitive information." },
        { code: "V8.4", title: "API versioning and deprecation", level: 1, orderNo: 4, description: "Verify that API versions are managed with clear deprecation policies and security support timelines." },
      ],
    },
  ],
};
