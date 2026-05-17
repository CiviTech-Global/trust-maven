import { RegulationSeed } from "./types";

export const SOC2_SEED: RegulationSeed = {
  code: "SOC2_TYPE2",
  name: "SOC 2 Type II",
  type: "standard",
  category: "information_security",
  jurisdiction: "US",
  issuer: "AICPA",
  version: "2017",
  description:
    "Service Organization Control 2 report based on AICPA Trust Services Criteria, evaluating controls relevant to security, availability, processing integrity, confidentiality, and privacy.",
  effectiveDate: "2017-12-15",
  requirements: [
    // =========================================================================
    // CC1: Control Environment
    // =========================================================================
    {
      code: "CC1",
      title: "Control Environment",
      level: 0,
      orderNo: 1,
      description:
        "The entity demonstrates a commitment to integrity and ethical values, exercises oversight responsibility, establishes structure, authority, and responsibility, demonstrates commitment to competence, and enforces accountability.",
      children: [
        {
          code: "CC1.1",
          title: "COSO Principle 1: Demonstrates Commitment to Integrity and Ethical Values",
          level: 1,
          orderNo: 1,
          description:
            "The entity demonstrates a commitment to integrity and ethical values. The board of directors and management, at all levels, demonstrate through their directives, actions, and behavior the importance of integrity and ethical values to support the functioning of the system of internal control.",
          keyQuestions: [
            "Does the organization maintain a code of conduct or ethics policy that is communicated to all personnel?",
            "Are there established processes for reporting unethical behavior, including whistleblower mechanisms?",
            "How does management set the tone at the top regarding integrity and ethical values?",
          ],
          evidenceExamples: [
            "Code of conduct/ethics policy with employee acknowledgment records",
            "Whistleblower policy and incident reports",
            "Board meeting minutes discussing ethical standards and tone at the top",
          ],
        },
        {
          code: "CC1.2",
          title: "COSO Principle 2: Exercises Oversight Responsibility",
          level: 1,
          orderNo: 2,
          description:
            "The board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control. The board establishes oversight responsibilities and applies relevant expertise.",
          keyQuestions: [
            "Does the board or oversight body operate independently from management and maintain relevant expertise?",
            "Are there defined responsibilities for oversight of the system of internal control, including risk assessment?",
            "How frequently does the board review and evaluate the effectiveness of internal controls?",
          ],
          evidenceExamples: [
            "Board charter defining oversight responsibilities and independence requirements",
            "Board meeting minutes showing regular review of internal controls and risk management",
            "Evidence of board member qualifications and independence assessments",
          ],
        },
        {
          code: "CC1.3",
          title: "COSO Principle 3: Establishes Structure, Authority, and Responsibility",
          level: 1,
          orderNo: 3,
          description:
            "Management establishes, with board oversight, structures, reporting lines, and appropriate authorities and responsibilities in the pursuit of objectives. Organizational structures support accountability and information flow.",
          keyQuestions: [
            "Are organizational structures, reporting lines, and authorities clearly defined and documented?",
            "How are roles and responsibilities for internal control assigned and communicated?",
            "Is there a clear delegation of authority framework with appropriate limits?",
          ],
          evidenceExamples: [
            "Organization charts with defined reporting lines and spans of control",
            "Role descriptions and responsibility matrices (RACI) for key control functions",
            "Delegation of authority policies and approval matrices",
          ],
        },
        {
          code: "CC1.4",
          title: "COSO Principle 4: Demonstrates Commitment to Competence",
          level: 1,
          orderNo: 4,
          description:
            "The entity demonstrates a commitment to attract, develop, and retain competent individuals in alignment with objectives. Competence policies and practices address the knowledge, skills, and abilities needed for assigned responsibilities.",
          keyQuestions: [
            "Does the organization define competency requirements for key roles, particularly those related to information security?",
            "Are there ongoing training and professional development programs to maintain and enhance employee competence?",
            "How does the organization evaluate whether personnel have the necessary skills for their assigned responsibilities?",
          ],
          evidenceExamples: [
            "Job descriptions with defined competency requirements and qualifications",
            "Training records and professional development plans",
            "Performance evaluation records that assess competency and skill development",
          ],
        },
        {
          code: "CC1.5",
          title: "COSO Principle 5: Enforces Accountability",
          level: 1,
          orderNo: 5,
          description:
            "The entity holds individuals accountable for their internal control responsibilities in the pursuit of objectives. Accountability is established through structures, authorities, and responsibilities, and is supported through performance measures, incentives, and rewards.",
          keyQuestions: [
            "Are individuals held accountable for the performance of internal control responsibilities through performance metrics?",
            "Is there a disciplinary process for policy violations, including information security policy breaches?",
            "How are performance measures, incentives, and rewards tied to internal control responsibilities?",
          ],
          evidenceExamples: [
            "Performance evaluation criteria that include internal control responsibilities",
            "Disciplinary action policies and records of enforcement for policy violations",
            "Incentive and reward structures linked to security and compliance objectives",
          ],
        },
      ],
    },

    // =========================================================================
    // CC2: Communication and Information
    // =========================================================================
    {
      code: "CC2",
      title: "Communication and Information",
      level: 0,
      orderNo: 2,
      description:
        "The entity obtains or generates and uses relevant, quality information to support the functioning of internal control. The entity internally and externally communicates information necessary to support the functioning of internal control.",
      children: [
        {
          code: "CC2.1",
          title: "COSO Principle 13: Obtains or Generates and Uses Relevant, Quality Information",
          level: 1,
          orderNo: 1,
          description:
            "The entity obtains or generates and uses relevant, quality information to support the functioning of internal control. Information systems produce information that is timely, current, accurate, complete, accessible, protected, verifiable, and retained.",
          keyQuestions: [
            "How does the organization identify and capture information relevant to the operation and monitoring of internal controls?",
            "Are data quality standards defined and enforced to ensure completeness, accuracy, and timeliness of information?",
            "What processes ensure that information used for internal control purposes is protected from unauthorized modification?",
          ],
          evidenceExamples: [
            "Data governance policies and data quality standards documentation",
            "Information classification and handling procedures",
            "System-generated reports used for monitoring controls with data integrity validation",
          ],
        },
        {
          code: "CC2.2",
          title: "COSO Principle 14: Communicates Internally",
          level: 1,
          orderNo: 2,
          description:
            "The entity internally communicates information, including objectives and responsibilities for internal control, necessary to support the functioning of internal control. Communication includes policies, system changes, and other matters affecting the control environment.",
          keyQuestions: [
            "How are internal control policies and responsibilities communicated to all relevant personnel?",
            "Are there established channels for communicating system changes, security incidents, and control deficiencies?",
            "How does the organization ensure that internal communications about controls are understood and acted upon?",
          ],
          evidenceExamples: [
            "Internal communication records such as security awareness newsletters, policy distribution logs",
            "Incident notification procedures and communication plans",
            "Meeting minutes showing regular communication of control objectives and responsibilities",
          ],
        },
        {
          code: "CC2.3",
          title: "COSO Principle 15: Communicates Externally",
          level: 1,
          orderNo: 3,
          description:
            "The entity communicates with external parties regarding matters affecting the functioning of internal control. This includes communication with customers, vendors, regulators, and other external stakeholders about system boundaries, commitments, and responsibilities.",
          keyQuestions: [
            "How does the organization communicate system descriptions, service commitments, and security obligations to external users?",
            "Are there established processes for reporting security incidents and control failures to affected external parties?",
            "How are customer and vendor responsibilities regarding system controls communicated and documented?",
          ],
          evidenceExamples: [
            "Service level agreements (SLAs) and system descriptions shared with customers",
            "External incident notification procedures and breach notification policies",
            "Vendor and customer communication logs regarding control-related matters",
          ],
        },
      ],
    },

    // =========================================================================
    // CC3: Risk Assessment
    // =========================================================================
    {
      code: "CC3",
      title: "Risk Assessment",
      level: 0,
      orderNo: 3,
      description:
        "The entity specifies objectives with sufficient clarity to enable the identification and assessment of risks relating to objectives. The entity identifies risks, analyzes risks, and considers the potential for fraud.",
      children: [
        {
          code: "CC3.1",
          title: "COSO Principle 6: Specifies Suitable Objectives",
          level: 1,
          orderNo: 1,
          description:
            "The entity specifies objectives with sufficient clarity to enable the identification and assessment of risks relating to objectives. Objectives are consistent with the entity's commitments and system requirements, and are aligned with the Trust Services Criteria.",
          keyQuestions: [
            "Has the organization defined clear operational, reporting, and compliance objectives relevant to its system and services?",
            "Are security, availability, processing integrity, confidentiality, and privacy objectives documented and aligned with service commitments?",
            "How are objectives reviewed and updated to reflect changes in the business environment and system scope?",
          ],
          evidenceExamples: [
            "Documented security and operational objectives aligned with Trust Services Criteria",
            "Service commitments and system requirements documentation",
            "Records of periodic objective reviews and updates",
          ],
        },
        {
          code: "CC3.2",
          title: "COSO Principle 7: Identifies and Analyzes Risk",
          level: 1,
          orderNo: 2,
          description:
            "The entity identifies risks to the achievement of its objectives across the entity and analyzes risks as a basis for determining how the risks should be managed. Risk identification includes consideration of factors internal and external to the entity.",
          keyQuestions: [
            "Does the organization maintain a formal risk assessment process that identifies and analyzes risks to system objectives?",
            "Are risk assessments performed regularly and updated to reflect changes in the threat landscape and operating environment?",
            "How are identified risks prioritized and linked to specific control activities?",
          ],
          evidenceExamples: [
            "Risk assessment reports and risk registers with identified threats and vulnerabilities",
            "Risk analysis methodology documentation including likelihood and impact criteria",
            "Records of periodic risk reassessment and risk register updates",
          ],
        },
        {
          code: "CC3.3",
          title: "COSO Principle 8: Assesses Fraud Risk",
          level: 1,
          orderNo: 3,
          description:
            "The entity considers the potential for fraud in assessing risks to the achievement of objectives. Fraud risk assessment includes consideration of fraudulent reporting, misappropriation of assets, and unauthorized acquisition, use, or disposal of information.",
          keyQuestions: [
            "Does the risk assessment process specifically consider the potential for fraud, including unauthorized access and data manipulation?",
            "Are fraud risk factors such as incentives, pressures, opportunities, and rationalizations evaluated?",
            "How does the organization address identified fraud risks through control activities and monitoring?",
          ],
          evidenceExamples: [
            "Fraud risk assessment documentation identifying specific fraud scenarios",
            "Anti-fraud policies and controls designed to prevent and detect fraudulent activity",
            "Fraud awareness training records and reporting mechanism documentation",
          ],
        },
        {
          code: "CC3.4",
          title: "COSO Principle 9: Identifies and Analyzes Significant Change",
          level: 1,
          orderNo: 4,
          description:
            "The entity identifies and assesses changes that could significantly impact the system of internal control. This includes changes in the external environment, business model, leadership, system and technology, and regulatory requirements.",
          keyQuestions: [
            "Does the organization have processes to identify changes that could significantly impact internal controls and system security?",
            "How are changes in technology, regulations, business operations, and the threat landscape assessed for impact on controls?",
            "Are risk assessments updated when significant changes occur in the operating environment or system architecture?",
          ],
          evidenceExamples: [
            "Change impact assessment procedures and records",
            "Environmental scanning and threat intelligence reports",
            "Risk assessment updates triggered by significant organizational or technological changes",
          ],
        },
      ],
    },

    // =========================================================================
    // CC4: Monitoring Activities
    // =========================================================================
    {
      code: "CC4",
      title: "Monitoring Activities",
      level: 0,
      orderNo: 4,
      description:
        "The entity selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning. The entity evaluates and communicates internal control deficiencies.",
      children: [
        {
          code: "CC4.1",
          title: "COSO Principle 16: Selects, Develops, and Performs Ongoing and/or Separate Evaluations",
          level: 1,
          orderNo: 1,
          description:
            "The entity selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning. Ongoing evaluations are built into business processes, and separate evaluations are conducted periodically.",
          keyQuestions: [
            "Does the organization perform ongoing monitoring of controls through automated tools, dashboards, or continuous monitoring processes?",
            "Are separate evaluations such as internal audits, penetration tests, and vulnerability assessments conducted on a regular schedule?",
            "How does the organization determine the scope and frequency of monitoring activities based on risk?",
          ],
          evidenceExamples: [
            "Continuous monitoring dashboards and automated alerting configurations",
            "Internal audit plans and completed audit reports",
            "Penetration testing and vulnerability assessment reports with remediation tracking",
          ],
        },
        {
          code: "CC4.2",
          title: "COSO Principle 17: Evaluates and Communicates Deficiencies",
          level: 1,
          orderNo: 2,
          description:
            "The entity evaluates and communicates internal control deficiencies in a timely manner to those parties responsible for taking corrective action, including senior management and the board of directors, as appropriate.",
          keyQuestions: [
            "Are identified control deficiencies evaluated for severity and reported to appropriate levels of management in a timely manner?",
            "Is there a formal process for tracking remediation of identified deficiencies to completion?",
            "How are recurring or systemic control deficiencies escalated and addressed?",
          ],
          evidenceExamples: [
            "Deficiency tracking registers with severity ratings and remediation timelines",
            "Management and board reporting on identified deficiencies and remediation status",
            "Corrective action plans with evidence of completion and validation",
          ],
        },
      ],
    },

    // =========================================================================
    // CC5: Control Activities
    // =========================================================================
    {
      code: "CC5",
      title: "Control Activities",
      level: 0,
      orderNo: 5,
      description:
        "The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels. The entity deploys control activities through policies and technology controls.",
      children: [
        {
          code: "CC5.1",
          title: "COSO Principle 10: Selects and Develops Control Activities",
          level: 1,
          orderNo: 1,
          description:
            "The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels. Control activities include a range of activities such as authorizations, verifications, reconciliations, and segregation of duties.",
          keyQuestions: [
            "Are control activities designed and implemented to address identified risks and reduce them to acceptable levels?",
            "Do controls include both preventive and detective measures appropriate to the risk profile?",
            "How are control activities mapped to specific risks identified in the risk assessment?",
          ],
          evidenceExamples: [
            "Controls matrix mapping control activities to identified risks",
            "Control design documentation describing control objectives, frequency, and responsible parties",
            "Evidence of both preventive controls (access restrictions, approvals) and detective controls (reviews, reconciliations)",
          ],
        },
        {
          code: "CC5.2",
          title: "COSO Principle 11: Selects and Develops General Controls over Technology",
          level: 1,
          orderNo: 2,
          description:
            "The entity selects and develops general control activities over technology to support the achievement of objectives. Technology general controls include controls over technology infrastructure, security management, and technology acquisition, development, and maintenance.",
          keyQuestions: [
            "Are IT general controls implemented over technology infrastructure, including network security, server management, and database administration?",
            "How are technology controls designed to support the security, availability, and integrity of the system?",
            "Are controls in place governing technology acquisition, development, and maintenance processes?",
          ],
          evidenceExamples: [
            "IT general controls documentation covering infrastructure, security, and development",
            "Technology control standards and baseline configuration documentation",
            "Technology governance policies covering acquisition, development, and maintenance",
          ],
        },
        {
          code: "CC5.3",
          title: "COSO Principle 12: Deploys Through Policies and Procedures",
          level: 1,
          orderNo: 3,
          description:
            "The entity deploys control activities through policies that establish what is expected and procedures that put policies into action. Policies and procedures are documented, communicated, and updated as necessary.",
          keyQuestions: [
            "Are information security and operational policies documented, approved by management, and communicated to relevant personnel?",
            "Do procedures exist that operationalize policies and provide clear step-by-step instructions for control execution?",
            "How frequently are policies and procedures reviewed and updated to ensure they remain current and effective?",
          ],
          evidenceExamples: [
            "Information security policy library with version history and approval records",
            "Standard operating procedures for key control activities",
            "Policy review and update schedules with records of periodic reviews",
          ],
        },
      ],
    },

    // =========================================================================
    // CC6: Logical and Physical Access Controls
    // =========================================================================
    {
      code: "CC6",
      title: "Logical and Physical Access Controls",
      level: 0,
      orderNo: 6,
      description:
        "The entity implements logical access security controls over information assets and physical access controls over facilities and protected information assets to protect them from security events.",
      children: [
        {
          code: "CC6.1",
          title: "Logical Access Security Software, Infrastructure, and Architectures",
          level: 1,
          orderNo: 1,
          description:
            "The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events. This includes implementation of access control systems, firewalls, intrusion detection, and encryption technologies.",
          keyQuestions: [
            "Are logical access security measures such as firewalls, intrusion detection/prevention systems, and access control mechanisms implemented and configured appropriately?",
            "How is the network architecture designed to protect information assets through segmentation, DMZs, and defense in depth?",
            "Are encryption technologies deployed for data at rest and in transit to protect sensitive information?",
          ],
          evidenceExamples: [
            "Network architecture diagrams showing security zones, firewalls, and segmentation",
            "Firewall and IDS/IPS configuration documentation and rule reviews",
            "Encryption standards and implementation records for data at rest and in transit",
          ],
        },
        {
          code: "CC6.2",
          title: "User Registration, Authorization, and Authentication",
          level: 1,
          orderNo: 2,
          description:
            "Prior to issuing system credentials and granting system access, the entity registers and authorizes new internal and external users whose access is administered by the entity. For those users whose access is administered by the entity, user system credentials are removed when access is no longer authorized.",
          keyQuestions: [
            "Is there a formal user registration and authorization process that verifies identity and approves access before credentials are issued?",
            "Are user accounts promptly disabled or removed upon termination, transfer, or when access is no longer required?",
            "How is multi-factor authentication implemented for access to systems and sensitive data?",
          ],
          evidenceExamples: [
            "User access request and approval workflows with authorization records",
            "User provisioning and de-provisioning procedures with evidence of timely execution",
            "Multi-factor authentication configuration and enrollment records",
          ],
        },
        {
          code: "CC6.3",
          title: "Role-Based Access and Least Privilege",
          level: 1,
          orderNo: 3,
          description:
            "The entity authorizes, modifies, or removes access to data, software, functions, and other protected information assets based on roles, responsibilities, or the system design and changes, giving consideration to the concepts of least privilege and segregation of duties.",
          keyQuestions: [
            "Are access rights assigned based on job roles and responsibilities following the principle of least privilege?",
            "Is segregation of duties enforced to prevent any single individual from having conflicting access or responsibilities?",
            "How are access rights reviewed and modified when roles or responsibilities change?",
          ],
          evidenceExamples: [
            "Role-based access control (RBAC) matrix and role definitions",
            "Segregation of duties analysis and conflict resolution documentation",
            "Access modification records showing updates aligned with role changes",
          ],
        },
        {
          code: "CC6.4",
          title: "Physical Access Restrictions",
          level: 1,
          orderNo: 4,
          description:
            "The entity restricts physical access to facilities and protected information assets (for example, data center facilities, backup media storage, and other sensitive locations) to authorized personnel to meet the entity's objectives.",
          keyQuestions: [
            "Are physical access controls implemented at facilities housing information assets, such as badge access, biometrics, and mantraps?",
            "Is physical access to data centers and sensitive areas restricted to authorized personnel only?",
            "How are visitor access and physical access logs monitored and reviewed?",
          ],
          evidenceExamples: [
            "Physical access control system configurations and access lists for restricted areas",
            "Data center physical security documentation including access logs",
            "Visitor management procedures and visitor access logs",
          ],
        },
        {
          code: "CC6.5",
          title: "Logical Access Disposal and Decommissioning",
          level: 1,
          orderNo: 5,
          description:
            "The entity discontinues logical and physical protections over physical assets only after the ability to read or recover data and software from those assets has been diminished and is no longer required to meet the entity's objectives.",
          keyQuestions: [
            "Are secure data disposal and media sanitization procedures implemented for assets being decommissioned?",
            "How is the destruction or sanitization of data on storage media verified and documented?",
            "Are procedures in place to ensure data cannot be recovered from decommissioned assets?",
          ],
          evidenceExamples: [
            "Media sanitization and data destruction policies and procedures",
            "Certificates of destruction or sanitization verification records",
            "Asset disposal tracking logs with confirmation of data removal",
          ],
        },
        {
          code: "CC6.6",
          title: "Security Measures Against Threats Outside System Boundaries",
          level: 1,
          orderNo: 6,
          description:
            "The entity implements logical access security measures to protect against threats from sources outside its system boundaries. This includes controls over external network connections, endpoints, and communication channels.",
          keyQuestions: [
            "Are boundary protection controls such as firewalls, web application firewalls, and DDoS mitigation implemented to defend against external threats?",
            "How are external connections and remote access points secured and monitored?",
            "Are endpoint protection solutions deployed and maintained across all endpoints accessing the system?",
          ],
          evidenceExamples: [
            "Boundary protection configurations including firewall rules and WAF settings",
            "Remote access and VPN security configurations and usage logs",
            "Endpoint protection deployment records and management console reports",
          ],
        },
        {
          code: "CC6.7",
          title: "Transmission of Data Restrictions",
          level: 1,
          orderNo: 7,
          description:
            "The entity restricts the transmission, movement, and removal of information to authorized internal and external users and processes, and protects it during transmission, movement, or removal to meet the entity's objectives.",
          keyQuestions: [
            "Are controls in place to restrict and monitor the transmission of sensitive data outside organizational boundaries?",
            "Is data encrypted during transmission using current, industry-accepted protocols?",
            "How are data loss prevention (DLP) controls implemented to prevent unauthorized data exfiltration?",
          ],
          evidenceExamples: [
            "Data transmission encryption standards and TLS/SSL configuration documentation",
            "Data loss prevention (DLP) policy configurations and alert reports",
            "Secure file transfer procedures and approved data transmission channel documentation",
          ],
        },
        {
          code: "CC6.8",
          title: "Prevention and Detection of Unauthorized Software",
          level: 1,
          orderNo: 8,
          description:
            "The entity implements controls to prevent or detect and act upon the introduction of unauthorized or malicious software to meet the entity's objectives. This includes anti-malware, application whitelisting, and software installation controls.",
          keyQuestions: [
            "Are anti-malware and endpoint detection solutions deployed across all systems and kept current with signature updates?",
            "How does the organization prevent the installation of unauthorized software on production systems?",
            "Are there processes for detecting and responding to malware infections and unauthorized software installations?",
          ],
          evidenceExamples: [
            "Anti-malware deployment and signature update status reports",
            "Application whitelisting or software restriction policy documentation",
            "Malware detection and response incident records",
          ],
        },
      ],
    },

    // =========================================================================
    // CC7: System Operations
    // =========================================================================
    {
      code: "CC7",
      title: "System Operations",
      level: 0,
      orderNo: 7,
      description:
        "The entity monitors system components and the operation of those components for anomalies that are indicative of malicious acts, natural disasters, and errors affecting the entity's ability to meet its objectives; detects anomalies; and responds to identified events.",
      children: [
        {
          code: "CC7.1",
          title: "Detection and Monitoring of New Vulnerabilities",
          level: 1,
          orderNo: 1,
          description:
            "To meet its objectives, the entity uses detection and monitoring procedures to identify changes to configurations that result in the introduction of new vulnerabilities, and susceptibilities to newly discovered vulnerabilities.",
          keyQuestions: [
            "Are vulnerability scanning and assessment procedures performed on a regular schedule and in response to significant changes?",
            "How does the organization monitor for newly disclosed vulnerabilities that may affect its system components?",
            "Are configuration monitoring tools deployed to detect unauthorized changes to system configurations?",
          ],
          evidenceExamples: [
            "Vulnerability scanning schedules, reports, and remediation tracking",
            "Vulnerability intelligence feeds and subscription documentation",
            "Configuration management and monitoring tool outputs",
          ],
        },
        {
          code: "CC7.2",
          title: "Monitoring of System Components for Anomalies",
          level: 1,
          orderNo: 2,
          description:
            "The entity monitors system components and the operation of those components for anomalies that are indicative of malicious acts, natural disasters, and errors affecting the entity's ability to meet its objectives; anomalies are analyzed to determine whether they represent security events.",
          keyQuestions: [
            "Are system monitoring and logging capabilities implemented to detect anomalies across infrastructure, applications, and networks?",
            "Is a SIEM or centralized log management solution used to aggregate, correlate, and analyze security events?",
            "How are anomalies triaged and escalated for investigation to determine if they represent security incidents?",
          ],
          evidenceExamples: [
            "SIEM deployment and configuration documentation with use case definitions",
            "System and security event monitoring dashboards and alert configurations",
            "Anomaly triage and escalation procedures with sample investigation records",
          ],
        },
        {
          code: "CC7.3",
          title: "Evaluation of Security Events",
          level: 1,
          orderNo: 3,
          description:
            "The entity evaluates security events to determine whether they could or have resulted in a failure of the entity to meet its objectives (security incidents) and, if so, takes actions to prevent or address such failures.",
          keyQuestions: [
            "Is there a defined process for evaluating and classifying security events to determine whether they constitute security incidents?",
            "Are incident severity levels and classification criteria clearly defined and consistently applied?",
            "How does the organization determine whether a security event has resulted in a failure to meet its service commitments?",
          ],
          evidenceExamples: [
            "Security event classification criteria and incident severity definitions",
            "Incident evaluation and triage procedures with decision trees",
            "Sample incident classification records and impact assessments",
          ],
        },
        {
          code: "CC7.4",
          title: "Incident Response Procedures",
          level: 1,
          orderNo: 4,
          description:
            "The entity responds to identified security incidents by executing a defined incident response program to understand, contain, remediate, and communicate security incidents, as appropriate. Incident response includes defined roles, communication protocols, and remediation procedures.",
          keyQuestions: [
            "Does the organization maintain a documented incident response plan that defines roles, responsibilities, and communication procedures?",
            "Are incident containment, eradication, and recovery procedures defined and tested?",
            "How are lessons learned from security incidents captured and used to improve controls?",
          ],
          evidenceExamples: [
            "Incident response plan with defined roles, escalation procedures, and communication templates",
            "Incident response testing and tabletop exercise records",
            "Post-incident review reports with lessons learned and corrective actions",
          ],
        },
        {
          code: "CC7.5",
          title: "Incident Recovery Procedures",
          level: 1,
          orderNo: 5,
          description:
            "The entity identifies, develops, and implements activities to recover from identified security incidents. Recovery procedures include restoring system operations, eradicating threats, and validating that systems are functioning normally.",
          keyQuestions: [
            "Are recovery procedures defined for restoring systems and data to normal operations following a security incident?",
            "How are backup and restoration capabilities tested to ensure they support incident recovery objectives?",
            "Are recovery time objectives (RTOs) and recovery point objectives (RPOs) defined and validated through testing?",
          ],
          evidenceExamples: [
            "Disaster recovery and business continuity plans with RTOs and RPOs",
            "Backup and restoration testing records and results",
            "Recovery procedure documentation and post-recovery validation checklists",
          ],
        },
      ],
    },

    // =========================================================================
    // CC8: Change Management
    // =========================================================================
    {
      code: "CC8",
      title: "Change Management",
      level: 0,
      orderNo: 8,
      description:
        "The entity authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures to meet its objectives.",
      children: [
        {
          code: "CC8.1",
          title: "Changes to Infrastructure, Data, Software, and Procedures",
          level: 1,
          orderNo: 1,
          description:
            "The entity authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures to meet its objectives. Change management includes authorization, testing, approval, and implementation controls to ensure changes are controlled and do not introduce unintended risk.",
          keyQuestions: [
            "Is there a formal change management process that requires authorization, testing, and approval before changes are deployed to production?",
            "How are emergency changes handled, and are they subject to retrospective review and approval?",
            "Are segregation of duties enforced in the change management process to prevent unauthorized changes?",
          ],
          evidenceExamples: [
            "Change management policy and procedures with defined approval workflows",
            "Change request records showing authorization, testing, and approval before implementation",
            "Emergency change procedures and retrospective review records",
          ],
        },
      ],
    },

    // =========================================================================
    // CC9: Risk Mitigation
    // =========================================================================
    {
      code: "CC9",
      title: "Risk Mitigation",
      level: 0,
      orderNo: 9,
      description:
        "The entity identifies, selects, and develops risk mitigation activities for risks arising from potential business disruptions and the use of vendors and business partners.",
      children: [
        {
          code: "CC9.1",
          title: "Risk Mitigation Through Business Disruption Controls",
          level: 1,
          orderNo: 1,
          description:
            "The entity identifies, selects, and develops risk mitigation activities for risks arising from potential business disruptions. Risk mitigation activities include business continuity planning, disaster recovery, and insurance coverage.",
          keyQuestions: [
            "Does the organization maintain business continuity and disaster recovery plans that address potential disruptions to system operations?",
            "Are business continuity and disaster recovery plans tested on a regular basis and updated based on test results?",
            "How does the organization assess and mitigate risks of business disruption from external events such as natural disasters and supply chain failures?",
          ],
          evidenceExamples: [
            "Business continuity and disaster recovery plans with defined recovery strategies",
            "BCP/DR testing schedules, test results, and remediation of identified gaps",
            "Risk mitigation strategies including insurance coverage and alternate processing arrangements",
          ],
        },
        {
          code: "CC9.2",
          title: "Vendor and Business Partner Risk Management",
          level: 1,
          orderNo: 2,
          description:
            "The entity assesses and manages risks associated with vendors and business partners. This includes due diligence, contractual requirements, and ongoing monitoring of vendor compliance with security and operational requirements.",
          keyQuestions: [
            "Does the organization perform risk assessments and due diligence on vendors and business partners before engagement?",
            "Are contractual requirements for security, confidentiality, and availability included in vendor agreements?",
            "How does the organization monitor vendor compliance with security requirements on an ongoing basis?",
          ],
          evidenceExamples: [
            "Vendor risk assessment questionnaires and due diligence reports",
            "Vendor contracts with security, confidentiality, and SLA requirements",
            "Ongoing vendor monitoring records including SOC report reviews and performance assessments",
          ],
        },
      ],
    },

    // =========================================================================
    // A: Availability (Additional Criteria)
    // =========================================================================
    {
      code: "A",
      title: "Availability",
      level: 0,
      orderNo: 10,
      description:
        "The system is available for operation and use as committed or agreed. Availability refers to the accessibility of information used by the entity's systems as well as the products or services provided to its customers.",
      children: [
        {
          code: "A1.1",
          title: "System Availability Commitments and Performance Monitoring",
          level: 1,
          orderNo: 1,
          description:
            "The entity maintains, monitors, and evaluates current processing capacity and use of system components (infrastructure, data, and software) to manage capacity demand and to enable the implementation of additional capacity to help meet its objectives. Capacity management includes monitoring of system performance against availability commitments.",
          keyQuestions: [
            "Are system availability commitments defined in service level agreements and communicated to customers?",
            "How does the organization monitor system capacity and performance to ensure availability commitments are met?",
            "Are capacity planning processes in place to proactively address demand growth and prevent availability disruptions?",
          ],
          evidenceExamples: [
            "Service level agreements defining availability targets and uptime commitments",
            "System performance monitoring dashboards and capacity utilization reports",
            "Capacity planning documentation and infrastructure scaling procedures",
          ],
        },
        {
          code: "A1.2",
          title: "Environmental Controls and System Recovery",
          level: 1,
          orderNo: 2,
          description:
            "The entity authorizes, designs, develops or acquires, implements, operates, approves, maintains, and monitors environmental protections, software, data backup processes, and recovery infrastructure to meet its objectives. Environmental controls include power, cooling, fire suppression, and water damage prevention.",
          keyQuestions: [
            "Are environmental controls such as UPS, generators, HVAC, and fire suppression systems in place at data center facilities?",
            "Are data backup procedures implemented, tested, and aligned with recovery point objectives?",
            "How is recovery infrastructure maintained and tested to ensure it can support system restoration?",
          ],
          evidenceExamples: [
            "Environmental control maintenance records and inspection reports for data center facilities",
            "Backup procedures, schedules, and successful restoration test records",
            "Recovery infrastructure documentation and failover testing results",
          ],
        },
        {
          code: "A1.3",
          title: "Recovery Plan Testing",
          level: 1,
          orderNo: 3,
          description:
            "The entity tests recovery plan procedures supporting system recovery to meet its objectives. Testing includes validation that recovery procedures meet defined recovery time and recovery point objectives.",
          keyQuestions: [
            "Are recovery plans tested at least annually to validate that systems can be restored within defined RTO and RPO targets?",
            "How are recovery test results documented and used to improve recovery procedures?",
            "Are recovery tests conducted in a manner that simulates realistic failure scenarios?",
          ],
          evidenceExamples: [
            "Recovery plan test schedules and executed test scenarios",
            "Recovery test results documenting actual vs. target RTO and RPO achievement",
            "Post-test review reports with identified improvements and corrective actions",
          ],
        },
      ],
    },

    // =========================================================================
    // PI: Processing Integrity (Additional Criteria)
    // =========================================================================
    {
      code: "PI",
      title: "Processing Integrity",
      level: 0,
      orderNo: 11,
      description:
        "System processing is complete, valid, accurate, timely, and authorized to meet the entity's objectives. Processing integrity addresses whether systems achieve the aim or purpose for which they exist.",
      children: [
        {
          code: "PI1.1",
          title: "Processing Accuracy and Completeness Objectives",
          level: 1,
          orderNo: 1,
          description:
            "The entity obtains or generates, uses, and communicates relevant, quality information regarding the objectives related to processing, including definitions of data processed and product or service specifications, to support the use of products and services.",
          keyQuestions: [
            "Are processing integrity objectives defined, including expected inputs, processing rules, and outputs?",
            "How are data processing specifications communicated to relevant personnel and stakeholders?",
            "Are product and service specifications documented and used to validate processing accuracy?",
          ],
          evidenceExamples: [
            "Data processing specifications and system interface documentation",
            "Input/output validation rules and processing logic documentation",
            "Service specifications defining expected processing outcomes",
          ],
        },
        {
          code: "PI1.2",
          title: "Input Controls and Data Validation",
          level: 1,
          orderNo: 2,
          description:
            "The entity implements policies and procedures over system inputs, including controls over completeness and accuracy, to result in products, services, and reporting to meet the entity's objectives.",
          keyQuestions: [
            "Are input validation controls implemented to verify the completeness, accuracy, and authorization of data entered into systems?",
            "How are input errors detected, reported, and corrected in a timely manner?",
            "Are batch processing totals and control totals used to verify completeness of input processing?",
          ],
          evidenceExamples: [
            "Input validation rules and edit check configurations",
            "Error handling and correction procedures with sample error logs",
            "Batch control and reconciliation procedures with sample reconciliation reports",
          ],
        },
        {
          code: "PI1.3",
          title: "Processing Controls and Integrity Monitoring",
          level: 1,
          orderNo: 3,
          description:
            "The entity implements policies and procedures over system processing to result in products, services, and reporting to meet the entity's objectives. Processing controls include checks for completeness, accuracy, and timeliness of processing.",
          keyQuestions: [
            "Are processing controls implemented to ensure data is processed completely, accurately, and in a timely manner?",
            "How does the organization monitor processing integrity and detect processing errors or anomalies?",
            "Are automated processing controls validated during system testing and after changes?",
          ],
          evidenceExamples: [
            "Processing control documentation including automated checks and balances",
            "Processing error monitoring reports and exception handling procedures",
            "System testing records validating processing control effectiveness",
          ],
        },
        {
          code: "PI1.4",
          title: "Output Controls and Distribution",
          level: 1,
          orderNo: 4,
          description:
            "The entity implements policies and procedures to make available or deliver output completely, accurately, and timely in accordance with specifications to meet the entity's objectives. Output controls ensure that system outputs are complete, accurate, and distributed to authorized recipients.",
          keyQuestions: [
            "Are output controls implemented to verify the completeness and accuracy of system outputs before distribution?",
            "How is output distributed to authorized recipients only, and how is unauthorized access to output prevented?",
            "Are output reconciliation procedures performed to verify that outputs match expected results?",
          ],
          evidenceExamples: [
            "Output verification and reconciliation procedures",
            "Output distribution controls and authorized recipient lists",
            "Sample output reconciliation records and discrepancy resolution logs",
          ],
        },
        {
          code: "PI1.5",
          title: "Error Storage and Processing Correction",
          level: 1,
          orderNo: 5,
          description:
            "The entity implements policies and procedures to store inputs, items in processing, and outputs completely, accurately, and timely in accordance with system specifications to meet the entity's objectives. Data retention and correction procedures support the identification and resolution of processing errors.",
          keyQuestions: [
            "Are procedures in place for identifying, storing, and correcting processing errors?",
            "How does the organization ensure that corrected transactions are reprocessed accurately and completely?",
            "Are data retention policies defined and implemented for inputs, processing records, and outputs?",
          ],
          evidenceExamples: [
            "Error logging and correction procedures with sample correction records",
            "Data retention policies and storage management documentation",
            "Reprocessing validation records and audit trails for corrected transactions",
          ],
        },
      ],
    },

    // =========================================================================
    // C: Confidentiality (Additional Criteria)
    // =========================================================================
    {
      code: "C",
      title: "Confidentiality",
      level: 0,
      orderNo: 12,
      description:
        "Information designated as confidential is protected to meet the entity's objectives. Confidentiality addresses the entity's ability to protect information designated as confidential from its collection or creation through its final disposition.",
      children: [
        {
          code: "C1.1",
          title: "Identification and Maintenance of Confidential Information",
          level: 1,
          orderNo: 1,
          description:
            "The entity identifies and maintains confidential information to meet the entity's objectives related to confidentiality. Confidential information is identified, classified, and protected throughout its lifecycle from creation to disposal.",
          keyQuestions: [
            "Has the organization defined and documented what constitutes confidential information and how it is classified?",
            "Are data classification labels applied to confidential information and enforced through technical and procedural controls?",
            "How is confidential information identified across all storage locations, including structured and unstructured data?",
          ],
          evidenceExamples: [
            "Data classification policy defining confidentiality levels and handling requirements",
            "Information asset inventory identifying confidential data and its locations",
            "Data labeling and classification procedures with evidence of implementation",
          ],
        },
        {
          code: "C1.2",
          title: "Disposal of Confidential Information",
          level: 1,
          orderNo: 2,
          description:
            "The entity disposes of confidential information to meet the entity's objectives related to confidentiality. Disposal methods ensure that confidential information cannot be recovered or reconstructed.",
          keyQuestions: [
            "Are secure disposal procedures defined and implemented for confidential information in all formats (electronic and physical)?",
            "How is the disposal of confidential information verified and documented?",
            "Are retention periods defined for confidential information, and is disposal performed in accordance with retention schedules?",
          ],
          evidenceExamples: [
            "Secure disposal and data destruction procedures for electronic and physical media",
            "Disposal verification records including certificates of destruction",
            "Data retention schedules with records of disposal activities",
          ],
        },
      ],
    },

    // =========================================================================
    // P: Privacy (Additional Criteria)
    // =========================================================================
    {
      code: "P",
      title: "Privacy",
      level: 0,
      orderNo: 13,
      description:
        "Personal information is collected, used, retained, disclosed, and disposed of to meet the entity's objectives. The privacy criteria are organized around the AICPA Generally Accepted Privacy Principles (GAPP).",
      children: [
        {
          code: "P1.0",
          title: "Notice and Communication of Objectives",
          level: 1,
          orderNo: 1,
          description:
            "The entity provides notice to data subjects about its privacy practices to meet the entity's objectives related to privacy. The notice is updated and communicated to data subjects in a timely manner for changes to the entity's privacy practices, including changes in the use of personal information.",
          keyQuestions: [
            "Does the organization provide clear and conspicuous privacy notices to data subjects describing the collection, use, and sharing of personal information?",
            "Are privacy notices updated and communicated when there are material changes to privacy practices?",
            "How are data subjects notified of their rights regarding their personal information?",
          ],
          evidenceExamples: [
            "Privacy policy/notice published on the organization's website with version history",
            "Privacy notice update and distribution procedures",
            "Records of privacy notice communications to data subjects",
          ],
        },
        {
          code: "P2.0",
          title: "Choice and Consent",
          level: 1,
          orderNo: 2,
          description:
            "The entity communicates choices available regarding the collection, use, retention, disclosure, and disposal of personal information to the data subjects and the consequences, if any, of each choice. Explicit or implicit consent is obtained where required.",
          keyQuestions: [
            "Does the organization provide data subjects with choices regarding the collection, use, and disclosure of their personal information?",
            "How is consent obtained from data subjects, and are records of consent maintained?",
            "Are opt-out mechanisms available and functional for data subjects who wish to withdraw consent?",
          ],
          evidenceExamples: [
            "Consent management mechanisms and consent records",
            "Opt-in/opt-out procedures and preference management systems",
            "Records demonstrating consent was obtained before collecting personal information",
          ],
        },
        {
          code: "P3.0",
          title: "Collection of Personal Information",
          level: 1,
          orderNo: 3,
          description:
            "The entity collects personal information only for the purposes identified in the notice and only to meet the entity's objectives. Collection is limited to information that is relevant to the purposes identified.",
          keyQuestions: [
            "Is the collection of personal information limited to what is necessary for the purposes identified in the privacy notice?",
            "Are data minimization principles applied to ensure only relevant personal information is collected?",
            "How does the organization verify that personal information is collected from reliable and lawful sources?",
          ],
          evidenceExamples: [
            "Data collection procedures aligned with privacy notice and stated purposes",
            "Data minimization assessments and records",
            "Data source verification and lawful basis documentation",
          ],
        },
        {
          code: "P4.0",
          title: "Use, Retention, and Disposal of Personal Information",
          level: 1,
          orderNo: 4,
          description:
            "The entity limits the use of personal information to the purposes identified in the notice and for which the data subject has provided consent. Personal information is retained only for as long as necessary and disposed of in accordance with documented procedures.",
          keyQuestions: [
            "Is the use of personal information limited to the purposes identified in the privacy notice and consented to by data subjects?",
            "Are retention periods defined for personal information, and is data disposed of when no longer needed?",
            "How does the organization ensure personal information is not used for secondary purposes without appropriate consent?",
          ],
          evidenceExamples: [
            "Purpose limitation controls and data use policies",
            "Personal information retention schedules and disposal records",
            "Secondary use approval procedures and consent verification records",
          ],
        },
        {
          code: "P5.0",
          title: "Access by Data Subjects",
          level: 1,
          orderNo: 5,
          description:
            "The entity grants identified and authenticated data subjects the ability to access their stored personal information for review and, upon request, provides physical or electronic copies of that information to data subjects. The entity also corrects, amends, or appends personal information upon request.",
          keyQuestions: [
            "Does the organization provide data subjects with the ability to access, review, and obtain copies of their personal information?",
            "Are procedures in place for data subjects to request corrections or amendments to their personal information?",
            "How are data subject access requests authenticated and fulfilled within required timeframes?",
          ],
          evidenceExamples: [
            "Data subject access request (DSAR) procedures and tracking records",
            "Self-service portal or mechanisms for data subjects to access their information",
            "Records of completed access, correction, and amendment requests with response times",
          ],
        },
        {
          code: "P6.0",
          title: "Disclosure and Notification to Third Parties",
          level: 1,
          orderNo: 6,
          description:
            "The entity discloses personal information to third parties only for the purposes identified in the notice and with the consent of the data subject. The entity obtains privacy commitments from third parties to whom personal information is disclosed.",
          keyQuestions: [
            "Are disclosures of personal information to third parties limited to the purposes described in the privacy notice?",
            "Does the organization obtain privacy and security commitments from third parties receiving personal information?",
            "How are third-party disclosures tracked and monitored for compliance with privacy requirements?",
          ],
          evidenceExamples: [
            "Third-party data sharing agreements with privacy and security commitments",
            "Third-party disclosure tracking and monitoring records",
            "Data processing agreements with sub-processors and downstream recipients",
          ],
        },
        {
          code: "P7.0",
          title: "Quality of Personal Information",
          level: 1,
          orderNo: 7,
          description:
            "The entity collects and maintains accurate, up-to-date, complete, and relevant personal information for the purposes identified in the notice to meet the entity's objectives.",
          keyQuestions: [
            "Are procedures in place to ensure the accuracy, completeness, and currency of personal information?",
            "How does the organization verify and update personal information to maintain data quality?",
            "Are data subjects able to update their personal information to correct inaccuracies?",
          ],
          evidenceExamples: [
            "Data quality assurance procedures and validation controls",
            "Periodic data accuracy reviews and update records",
            "Self-service mechanisms for data subjects to update their personal information",
          ],
        },
        {
          code: "P8.1",
          title: "Complaint Management and Resolution",
          level: 1,
          orderNo: 8,
          description:
            "The entity implements a process for receiving, addressing, resolving, and communicating the resolution of inquiries, complaints, and disputes from data subjects and others. The process includes mechanisms for data subjects to submit complaints regarding privacy practices.",
          keyQuestions: [
            "Does the organization have a documented process for receiving, investigating, and resolving privacy complaints from data subjects?",
            "Are privacy complaints tracked and analyzed for trends that may indicate systemic privacy issues?",
            "How are complaint resolutions communicated to the complainant in a timely manner?",
          ],
          evidenceExamples: [
            "Privacy complaint management procedures and intake mechanisms",
            "Complaint tracking register with resolution records and response times",
            "Trend analysis reports on privacy complaints and remedial actions taken",
          ],
        },
      ],
    },
  ],
};
