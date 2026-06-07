import { RegulationSeed } from "./types";

export const HIPAA_SEED: RegulationSeed = {
  code: "HIPAA",
  name: "Health Insurance Portability and Accountability Act",
  type: "regulation",
  category: "privacy",
  jurisdiction: "US",
  issuer: "U.S. Department of Health and Human Services",
  version: "2013 Omnibus Rule",
  description:
    "US federal law that established national standards for the protection of individually identifiable health information (protected health information, PHI) through the HIPAA Privacy Rule, Security Rule, and Breach Notification Rule.",
  effectiveDate: "2013-09-23",
  requirements: [
    {
      code: "PRIVACY",
      title: "HIPAA Privacy Rule",
      level: 0, orderNo: 1,
      children: [
        { code: "PRIV.1", title: "Notice of privacy practices", level: 1, orderNo: 1, description: "Provide a clear written notice of privacy practices describing how PHI may be used and disclosed, and individuals' rights regarding their PHI." },
        { code: "PRIV.2", title: "Minimum necessary standard", level: 1, orderNo: 2, description: "Limit uses and disclosures of PHI to the minimum necessary to accomplish the intended purpose." },
        { code: "PRIV.3", title: "Individual rights of access", level: 1, orderNo: 3, description: "Provide individuals the right to inspect and obtain a copy of their PHI within 30 days of request." },
        { code: "PRIV.4", title: "Right to request amendment", level: 1, orderNo: 4, description: "Allow individuals to request amendment of their PHI and document the outcome." },
        { code: "PRIV.5", title: "Right to accounting of disclosures", level: 1, orderNo: 5, description: "Maintain an accounting of certain disclosures of PHI for up to six years available to individuals." },
        { code: "PRIV.6", title: "Privacy policies and procedures", level: 1, orderNo: 6, description: "Implement written privacy policies and procedures consistent with the Privacy Rule." },
        { code: "PRIV.7", title: "Privacy official designation", level: 1, orderNo: 7, description: "Designate a privacy official responsible for developing and implementing privacy policies." },
        { code: "PRIV.8", title: "Workforce training on privacy", level: 1, orderNo: 8, description: "Train all workforce members on privacy policies and procedures as necessary and appropriate." },
        { code: "PRIV.9", title: "Safeguards for PHI", level: 1, orderNo: 9, description: "Implement administrative, technical, and physical safeguards to protect PHI from intentional or unintentional use or disclosure." },
        { code: "PRIV.10", title: "Business associate agreements", level: 1, orderNo: 10, description: "Obtain satisfactory written agreements with business associates that will use or disclose PHI." },
      ],
    },
    {
      code: "SECURITY",
      title: "HIPAA Security Rule — Administrative Safeguards",
      level: 0, orderNo: 2,
      children: [
        { code: "SEC.1", title: "Security management process", level: 1, orderNo: 1, description: "Implement policies and procedures to prevent, detect, contain, and correct security violations, including risk analysis and risk management." },
        { code: "SEC.2", title: "Security official", level: 1, orderNo: 2, description: "Assign a security official responsible for developing and implementing security policies and procedures." },
        { code: "SEC.3", title: "Workforce security", level: 1, orderNo: 3, description: "Implement policies to authorize, supervise, and terminate workforce member access to ePHI." },
        { code: "SEC.4", title: "Information access management", level: 1, orderNo: 4, description: "Implement policies for authorizing access to ePHI consistent with the minimum necessary rule." },
        { code: "SEC.5", title: "Security awareness and training", level: 1, orderNo: 5, description: "Provide security awareness and training for all workforce members, including periodic security reminders." },
        { code: "SEC.6", title: "Security incident procedures", level: 1, orderNo: 6, description: "Implement policies and procedures to identify, respond to, and mitigate security incidents." },
        { code: "SEC.7", title: "Contingency plan", level: 1, orderNo: 7, description: "Establish and implement policies to respond to emergencies that damage systems containing ePHI, including data backup and disaster recovery." },
        { code: "SEC.8", title: "Business associate contracts", level: 1, orderNo: 8, description: "Obtain satisfactory assurances from business associates that they will safeguard ePHI." },
      ],
    },
    {
      code: "PHYSICAL",
      title: "HIPAA Security Rule — Physical Safeguards",
      level: 0, orderNo: 3,
      children: [
        { code: "PHY.1", title: "Facility access controls", level: 1, orderNo: 1, description: "Implement policies to limit physical access to electronic information systems and the facilities in which they reside." },
        { code: "PHY.2", title: "Workstation use and security", level: 1, orderNo: 2, description: "Implement policies specifying proper use of workstations and securing them from unauthorized access." },
        { code: "PHY.3", title: "Device and media controls", level: 1, orderNo: 3, description: "Implement policies for disposal, re-use, accountability, and data backup of devices and media containing ePHI." },
      ],
    },
    {
      code: "TECHNICAL",
      title: "HIPAA Security Rule — Technical Safeguards",
      level: 0, orderNo: 4,
      children: [
        { code: "TECH.1", title: "Access control", level: 1, orderNo: 1, description: "Implement technical policies and procedures for electronic information systems that maintain ePHI to allow access only to authorized persons." },
        { code: "TECH.2", title: "Audit controls", level: 1, orderNo: 2, description: "Implement hardware, software, and procedural mechanisms to record and examine access and other activity in information systems containing ePHI." },
        { code: "TECH.3", title: "Integrity controls", level: 1, orderNo: 3, description: "Implement policies and procedures to protect ePHI from improper alteration or destruction." },
        { code: "TECH.4", title: "Person or entity authentication", level: 1, orderNo: 4, description: "Implement procedures to verify that a person or entity seeking access to ePHI is the one claimed." },
        { code: "TECH.5", title: "Transmission security", level: 1, orderNo: 5, description: "Implement technical security measures to guard against unauthorized access to ePHI transmitted over an electronic communications network." },
      ],
    },
    {
      code: "BREACH",
      title: "HIPAA Breach Notification Rule",
      level: 0, orderNo: 5,
      children: [
        { code: "BR.1", title: "Breach notification to individuals", level: 1, orderNo: 1, description: "Notify affected individuals without unreasonable delay, within 60 days of breach discovery, of any breach of unsecured PHI." },
        { code: "BR.2", title: "Breach notification to HHS", level: 1, orderNo: 2, description: "Notify the Secretary of HHS of breaches: within 60 days for 500+ individuals, annually for smaller breaches." },
        { code: "BR.3", title: "Breach notification to media", level: 1, orderNo: 3, description: "Notify prominent media outlets in the state or jurisdiction for breaches affecting 500+ individuals." },
        { code: "BR.4", title: "Risk assessment for breaches", level: 1, orderNo: 4, description: "Conduct a risk assessment to determine the probability that PHI has been compromised, considering: nature and extent of PHI, unauthorized person who accessed it, whether PHI was actually acquired or viewed, and extent of risk mitigation." },
      ],
    },
    {
      code: "ENFORCEMENT",
      title: "HIPAA Enforcement and Compliance",
      level: 0, orderNo: 6,
      children: [
        { code: "ENF.1", title: "Policies and procedures documentation", level: 1, orderNo: 1, description: "Maintain written policies and procedures required by the Privacy and Security Rules, with documentation retained for six years from creation or last effective date." },
        { code: "ENF.2", title: "Compliance reviews", level: 1, orderNo: 2, description: "Conduct periodic compliance reviews to ensure HIPAA requirements are met and documented." },
        { code: "ENF.3", title: "Sanctions for non-compliance", level: 1, orderNo: 3, description: "Apply appropriate sanctions against workforce members who violate HIPAA policies and procedures." },
        { code: "ENF.4", title: "Mitigation of harmful effects", level: 1, orderNo: 4, description: "Mitigate, to the extent practicable, any harmful effect known to the organization of a use or disclosure of PHI in violation of policies." },
      ],
    },
  ],
};
