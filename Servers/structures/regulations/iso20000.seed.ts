import { RegulationSeed } from "./types";

export const ISO20000_SEED: RegulationSeed = {
  code: "ISO_20000",
  name: "ISO/IEC 20000-1:2018",
  type: "standard",
  category: "it_governance",
  jurisdiction: "International",
  issuer: "ISO/IEC",
  version: "2018",
  description:
    "International standard for service management, specifying requirements for establishing, implementing, maintaining, and improving an SMS.",
  effectiveDate: "2018-09-15",
  requirements: [
    {
      code: "SMS.1",
      title: "SMS Context and Leadership",
      level: 0, orderNo: 1,
      children: [
        { code: "SMS.1.1", title: "Understanding organizational context", level: 1, orderNo: 1, description: "Determine external and internal issues relevant to the service management system and the organization's ability to achieve intended outcomes." },
        { code: "SMS.1.2", title: "Interested party requirements", level: 1, orderNo: 2, description: "Determine interested parties and their requirements relevant to the service management system." },
        { code: "SMS.1.3", title: "SMS scope determination", level: 1, orderNo: 3, description: "Determine the boundaries and applicability of the SMS considering organizational context and services provided." },
        { code: "SMS.1.4", title: "Leadership and commitment", level: 1, orderNo: 4, description: "Top management shall demonstrate leadership and commitment for the SMS including policy establishment and resource provision." },
        { code: "SMS.1.5", title: "Service management policy", level: 1, orderNo: 5, description: "Establish a service management policy appropriate to the purpose of the organization including commitment to continual improvement." },
        { code: "SMS.1.6", title: "Roles and responsibilities", level: 1, orderNo: 6, description: "Assign and communicate SMS roles, responsibilities, and authorities throughout the organization." },
      ],
    },
    {
      code: "SMS.2",
      title: "SMS Planning and Support",
      level: 0, orderNo: 2,
      children: [
        { code: "SMS.2.1", title: "SMS objectives and planning", level: 1, orderNo: 1, description: "Establish service management objectives at relevant functions and levels consistent with the service management policy." },
        { code: "SMS.2.2", title: "Risk assessment and treatment", level: 1, orderNo: 2, description: "Define and apply a risk assessment process to identify, analyze, and evaluate risks to the SMS and services." },
        { code: "SMS.2.3", title: "Resources and competence", level: 1, orderNo: 3, description: "Provide resources and ensure personnel performing SMS work have appropriate competence." },
        { code: "SMS.2.4", title: "Awareness and communication", level: 1, orderNo: 4, description: "Ensure personnel are aware of the service management policy and establish internal and external communication for the SMS." },
        { code: "SMS.2.5", title: "Documented information", level: 1, orderNo: 5, description: "Maintain documented information required for the SMS including service management plans, policies, and procedures." },
      ],
    },
    {
      code: "SMS.3",
      title: "Service Delivery and Operation",
      level: 0, orderNo: 3,
      children: [
        { code: "SMS.3.1", title: "Service portfolio management", level: 1, orderNo: 1, description: "Define and maintain a service portfolio covering all services, their status, and business alignment." },
        { code: "SMS.3.2", title: "Service level management", level: 1, orderNo: 2, description: "Define, agree upon, and manage service levels through SLAs, OLAs, and monitoring against targets." },
        { code: "SMS.3.3", title: "Service reporting and review", level: 1, orderNo: 3, description: "Produce service reports and conduct regular service reviews with stakeholders to ensure service quality." },
        { code: "SMS.3.4", title: "Service availability and capacity management", level: 1, orderNo: 4, description: "Ensure adequate service availability and capacity to meet agreed service level targets and future demand." },
        { code: "SMS.3.5", title: "Service continuity management", level: 1, orderNo: 5, description: "Establish and maintain service continuity plans to ensure agreed service levels during disruptions." },
        { code: "SMS.3.6", title: "Information security management in services", level: 1, orderNo: 6, description: "Apply information security controls to services and service components consistent with security requirements." },
        { code: "SMS.3.7", title: "Supplier management", level: 1, orderNo: 7, description: "Manage suppliers of services and components to ensure they meet agreed requirements through the service lifecycle." },
      ],
    },
    {
      code: "SMS.4",
      title: "Incident and Problem Management",
      level: 0, orderNo: 4,
      children: [
        { code: "SMS.4.1", title: "Incident management process", level: 1, orderNo: 1, description: "Establish and implement an incident management process to restore normal service operation as quickly as possible." },
        { code: "SMS.4.2", title: "Service request management", level: 1, orderNo: 2, description: "Establish a service request management process to handle standard service requests efficiently." },
        { code: "SMS.4.3", title: "Problem management process", level: 1, orderNo: 3, description: "Establish a problem management process to identify root causes of incidents and prevent recurrence." },
        { code: "SMS.4.4", title: "Major incident management", level: 1, orderNo: 4, description: "Define procedures for major incident handling including separate escalation, communication, and resolution processes." },
      ],
    },
    {
      code: "SMS.5",
      title: "Change and Release Management",
      level: 0, orderNo: 5,
      children: [
        { code: "SMS.5.1", title: "Change management process", level: 1, orderNo: 1, description: "Establish a change management process to control changes to services, systems, and infrastructure with minimal disruption." },
        { code: "SMS.5.2", title: "Change types and categorization", level: 1, orderNo: 2, description: "Categorize changes as standard, normal, or emergency with defined procedures and approval processes for each type." },
        { code: "SMS.5.3", title: "Release and deployment management", level: 1, orderNo: 3, description: "Plan, schedule, and control the release and deployment of changes to production environments." },
        { code: "SMS.5.4", title: "Change advisory board", level: 1, orderNo: 4, description: "Establish a change advisory board to assess, prioritize, and approve changes with appropriate stakeholder representation." },
      ],
    },
    {
      code: "SMS.6",
      title: "Configuration and Asset Management",
      level: 0, orderNo: 6,
      children: [
        { code: "SMS.6.1", title: "Configuration management database", level: 1, orderNo: 1, description: "Maintain a configuration management database (CMDB) containing information about service assets and configuration items." },
        { code: "SMS.6.2", title: "Asset and configuration tracking", level: 1, orderNo: 2, description: "Track assets and configuration items throughout their lifecycle including relationships and dependencies." },
        { code: "SMS.6.3", title: "Configuration audits and verification", level: 1, orderNo: 3, description: "Conduct periodic audits of the CMDB to verify accuracy and completeness of configuration records." },
      ],
    },
    {
      code: "SMS.7",
      title: "SMS Performance Evaluation and Improvement",
      level: 0, orderNo: 7,
      children: [
        { code: "SMS.7.1", title: "SMS performance monitoring", level: 1, orderNo: 1, description: "Monitor and measure SMS performance against objectives using defined metrics, KPIs, and customer satisfaction." },
        { code: "SMS.7.2", title: "Internal SMS audit", level: 1, orderNo: 2, description: "Conduct internal audits of the SMS at planned intervals to verify conformity to ISO 20000 requirements." },
        { code: "SMS.7.3", title: "Management review", level: 1, orderNo: 3, description: "Top management shall review the SMS at planned intervals to ensure continuing suitability, adequacy, and effectiveness." },
        { code: "SMS.7.4", title: "Nonconformity and corrective action", level: 1, orderNo: 4, description: "React to nonconformities, take corrective action to eliminate causes, and review effectiveness of actions." },
        { code: "SMS.7.5", title: "Continual improvement", level: 1, orderNo: 5, description: "Continually improve the suitability, adequacy, and effectiveness of the SMS through corrective actions and improvement initiatives." },
      ],
    },
  ],
};
