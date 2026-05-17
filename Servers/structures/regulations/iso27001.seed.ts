import { RegulationSeed } from "./types";

export const ISO27001_SEED: RegulationSeed = {
  code: "ISO_27001_2022",
  name: "ISO/IEC 27001:2022",
  type: "standard",
  category: "information_security",
  jurisdiction: "International",
  issuer: "ISO/IEC",
  version: "2022",
  description:
    "International standard for information security management systems (ISMS), providing a systematic approach to managing sensitive information.",
  effectiveDate: "2022-10-25",
  requirements: [
    // =========================================================================
    // CLAUSE 4: CONTEXT OF THE ORGANIZATION
    // =========================================================================
    {
      code: "4",
      title: "Context of the organization",
      level: 0,
      orderNo: 1,
      description:
        "Requires the organization to determine external and internal issues, understand the needs and expectations of interested parties, determine the scope of the ISMS, and establish, implement, maintain, and continually improve the ISMS.",
      keyQuestions: [
        "Has the organization identified all relevant internal and external issues that affect the ISMS?",
        "Is the scope of the ISMS clearly defined and documented?",
        "Are the needs and expectations of interested parties regularly reviewed?",
      ],
      evidenceExamples: [
        "Documented ISMS scope statement with boundaries and applicability",
        "Register of interested parties and their requirements",
        "ISMS context analysis report covering internal and external issues",
      ],
      children: [
        {
          code: "4.1",
          title: "Understanding the organization and its context",
          level: 1,
          orderNo: 1,
          description:
            "The organization shall determine external and internal issues that are relevant to its purpose and that affect its ability to achieve the intended outcomes of the ISMS. This includes understanding the business environment, regulatory landscape, technological context, and organizational culture.",
          keyQuestions: [
            "What external factors (legal, regulatory, competitive, market) have been identified as relevant to the ISMS?",
            "What internal factors (culture, capabilities, governance structure, contractual relationships) affect the ISMS?",
            "How frequently are these issues reviewed and updated?",
          ],
          evidenceExamples: [
            "PESTLE analysis or environmental scanning report",
            "SWOT analysis covering information security context",
            "Minutes of management review meetings discussing context changes",
          ],
        },
        {
          code: "4.2",
          title:
            "Understanding the needs and expectations of interested parties",
          level: 1,
          orderNo: 2,
          description:
            "The organization shall determine the interested parties that are relevant to the ISMS, their requirements relevant to information security, and which of these requirements will be addressed through the ISMS. This includes customers, regulators, employees, suppliers, and shareholders.",
          keyQuestions: [
            "Has a comprehensive list of interested parties been compiled and categorized?",
            "Are the specific information security requirements of each interested party documented?",
            "How are changes in interested party requirements tracked and incorporated?",
          ],
          evidenceExamples: [
            "Interested parties register with documented requirements",
            "Contractual and regulatory obligation matrix",
            "Stakeholder analysis and communication plan",
          ],
        },
        {
          code: "4.3",
          title: "Determining the scope of the information security management system",
          level: 1,
          orderNo: 3,
          description:
            "The organization shall determine the boundaries and applicability of the ISMS to establish its scope, considering external and internal issues, requirements of interested parties, and interfaces and dependencies between activities performed by the organization and those performed by other organizations.",
          keyQuestions: [
            "Does the scope clearly define the organizational units, locations, assets, and technologies covered?",
            "Are exclusions from the scope justified and documented?",
            "Have interfaces and dependencies with external parties been considered in the scope?",
          ],
          evidenceExamples: [
            "ISMS scope document including boundaries, applicability, and justifications for exclusions",
            "Network and system architecture diagrams showing scope boundaries",
            "Asset inventory aligned with the defined scope",
          ],
        },
        {
          code: "4.4",
          title: "Information security management system",
          level: 1,
          orderNo: 4,
          description:
            "The organization shall establish, implement, maintain, and continually improve an information security management system, including the processes needed and their interactions, in accordance with the requirements of this document.",
          keyQuestions: [
            "Is the ISMS formally established with defined processes and their interactions?",
            "Are the processes for maintaining and continually improving the ISMS documented and followed?",
            "Does the ISMS address all requirements of ISO 27001:2022?",
          ],
          evidenceExamples: [
            "ISMS process map or framework documentation",
            "ISMS manual or policy framework document",
            "Continuous improvement records and ISMS performance dashboards",
          ],
        },
      ],
    },

    // =========================================================================
    // CLAUSE 5: LEADERSHIP
    // =========================================================================
    {
      code: "5",
      title: "Leadership",
      level: 0,
      orderNo: 2,
      description:
        "Requires top management to demonstrate leadership and commitment to the ISMS, establish an information security policy, and assign roles, responsibilities, and authorities.",
      keyQuestions: [
        "Does top management actively demonstrate leadership and commitment to the ISMS?",
        "Is there a documented information security policy appropriate to the organization?",
        "Are ISMS roles, responsibilities, and authorities clearly assigned and communicated?",
      ],
      evidenceExamples: [
        "Signed information security policy by top management",
        "Organizational chart showing ISMS roles and responsibilities",
        "Management review meeting minutes demonstrating leadership engagement",
      ],
      children: [
        {
          code: "5.1",
          title: "Leadership and commitment",
          level: 1,
          orderNo: 1,
          description:
            "Top management shall demonstrate leadership and commitment with respect to the ISMS by ensuring the information security policy and objectives are established and compatible with strategic direction, ensuring integration of ISMS requirements into business processes, ensuring resources are available, communicating the importance of effective information security management, and directing and supporting persons to contribute to the effectiveness of the ISMS.",
          keyQuestions: [
            "How does top management demonstrate visible commitment to information security (e.g., resource allocation, participation in reviews)?",
            "Are information security objectives aligned with the organizational strategic direction?",
            "Does top management actively promote continual improvement of the ISMS?",
          ],
          evidenceExamples: [
            "Budget allocations for information security initiatives",
            "Top management communications promoting information security",
            "Strategic plan showing alignment between business objectives and ISMS objectives",
          ],
        },
        {
          code: "5.2",
          title: "Policy",
          level: 1,
          orderNo: 2,
          description:
            "Top management shall establish an information security policy that is appropriate to the purpose of the organization, includes information security objectives or provides the framework for setting objectives, includes a commitment to satisfy applicable requirements, and includes a commitment to continual improvement of the ISMS. The policy shall be available as documented information, be communicated within the organization, and be available to interested parties as appropriate.",
          keyQuestions: [
            "Does the information security policy include commitments to satisfy applicable requirements and continual improvement?",
            "Is the policy communicated to all employees and relevant interested parties?",
            "Is the policy reviewed at planned intervals or when significant changes occur?",
          ],
          evidenceExamples: [
            "Approved and dated information security policy document",
            "Evidence of policy communication (training records, intranet publication, acknowledgment forms)",
            "Policy review and update records",
          ],
        },
        {
          code: "5.3",
          title: "Organizational roles, responsibilities and authorities",
          level: 1,
          orderNo: 3,
          description:
            "Top management shall ensure that the responsibilities and authorities for roles relevant to information security are assigned and communicated. This includes assigning responsibility for ensuring the ISMS conforms to the requirements of this document and for reporting on the performance of the ISMS to top management.",
          keyQuestions: [
            "Are all ISMS roles clearly defined with documented responsibilities and authorities?",
            "Is there a designated individual or team responsible for ISMS conformity reporting to top management?",
            "Are role assignments communicated across the organization?",
          ],
          evidenceExamples: [
            "RACI matrix for ISMS roles and responsibilities",
            "Job descriptions including information security responsibilities",
            "Appointment letters or terms of reference for key ISMS roles (e.g., CISO, ISO)",
          ],
        },
      ],
    },

    // =========================================================================
    // CLAUSE 6: PLANNING
    // =========================================================================
    {
      code: "6",
      title: "Planning",
      level: 0,
      orderNo: 3,
      description:
        "Requires the organization to address risks and opportunities, establish information security objectives, and plan changes to the ISMS in a controlled manner.",
      keyQuestions: [
        "Has the organization established a formal risk assessment and treatment process?",
        "Are information security objectives set at relevant functions and levels?",
        "Are changes to the ISMS planned and managed systematically?",
      ],
      evidenceExamples: [
        "Risk assessment methodology and risk register",
        "Information security objectives with measurable targets",
        "Change management plan for ISMS modifications",
      ],
      children: [
        {
          code: "6.1",
          title: "Actions to address risks and opportunities",
          level: 1,
          orderNo: 1,
          description:
            "When planning for the ISMS, the organization shall consider the issues referred to in 4.1 and the requirements referred to in 4.2 and determine the risks and opportunities that need to be addressed to ensure the ISMS can achieve its intended outcomes, prevent or reduce undesired effects, and achieve continual improvement. The organization shall plan actions to address these risks and opportunities and how to integrate and implement the actions into its ISMS processes and evaluate the effectiveness of these actions. This includes defining and applying an information security risk assessment process and an information security risk treatment process.",
          keyQuestions: [
            "Is there a documented risk assessment methodology that defines criteria for risk acceptance and assessment?",
            "Does the risk treatment plan address all identified risks with appropriate controls?",
            "Is the Statement of Applicability maintained and aligned with risk treatment decisions?",
          ],
          evidenceExamples: [
            "Risk assessment methodology document with defined criteria",
            "Risk register with assessed risks and treatment decisions",
            "Statement of Applicability (SoA) with justifications for inclusion/exclusion of controls",
          ],
        },
        {
          code: "6.2",
          title: "Information security objectives and planning to achieve them",
          level: 1,
          orderNo: 2,
          description:
            "The organization shall establish information security objectives at relevant functions and levels. The objectives shall be consistent with the information security policy, be measurable, take into account applicable requirements and risk assessment and treatment results, be monitored, be communicated, and be updated as appropriate. The organization shall plan how to achieve them, determining what will be done, resources required, responsible persons, completion timelines, and how results will be evaluated.",
          keyQuestions: [
            "Are information security objectives measurable, monitored, and aligned with the security policy?",
            "Do objective plans specify resources, responsibilities, timelines, and evaluation methods?",
            "Are objectives reviewed and updated based on performance data and changing circumstances?",
          ],
          evidenceExamples: [
            "Information security objectives register with KPIs and targets",
            "Action plans for achieving each objective with assigned owners and deadlines",
            "Progress reports and performance measurement records for objectives",
          ],
        },
        {
          code: "6.3",
          title: "Planning of changes",
          level: 1,
          orderNo: 3,
          description:
            "When the organization determines the need for changes to the ISMS, the changes shall be carried out in a planned manner. The organization shall consider the purpose of the changes and their potential consequences, the integrity of the ISMS, the availability of resources, and the allocation or reallocation of responsibilities and authorities.",
          keyQuestions: [
            "Is there a defined process for planning and managing changes to the ISMS?",
            "Are potential impacts of ISMS changes assessed before implementation?",
            "Are responsibilities and resources for changes clearly allocated?",
          ],
          evidenceExamples: [
            "ISMS change management procedure",
            "Change request and impact assessment records",
            "Approved change plans with resource and responsibility assignments",
          ],
        },
      ],
    },

    // =========================================================================
    // CLAUSE 7: SUPPORT
    // =========================================================================
    {
      code: "7",
      title: "Support",
      level: 0,
      orderNo: 4,
      description:
        "Requires the organization to determine and provide the resources needed for the ISMS, ensure competence, awareness, communication, and control of documented information.",
      keyQuestions: [
        "Are sufficient resources allocated for the establishment, implementation, maintenance, and improvement of the ISMS?",
        "Is there a competence framework for personnel performing ISMS-related work?",
        "Is documented information managed in accordance with organizational and standard requirements?",
      ],
      evidenceExamples: [
        "ISMS resource plan and budget",
        "Training and competence records for ISMS personnel",
        "Document control procedures and records",
      ],
      children: [
        {
          code: "7.1",
          title: "Resources",
          level: 1,
          orderNo: 1,
          description:
            "The organization shall determine and provide the resources needed for the establishment, implementation, maintenance, and continual improvement of the ISMS. This includes human resources, financial resources, technology, and infrastructure required to operate and improve the ISMS effectively.",
          keyQuestions: [
            "Has the organization identified all resources (people, budget, technology, infrastructure) needed for the ISMS?",
            "Are resources regularly reviewed for adequacy against ISMS requirements?",
            "Is there a process for requesting and approving additional ISMS resources?",
          ],
          evidenceExamples: [
            "ISMS budget and resource allocation records",
            "Staffing plans for information security functions",
            "Technology and tool procurement records for ISMS support",
          ],
        },
        {
          code: "7.2",
          title: "Competence",
          level: 1,
          orderNo: 2,
          description:
            "The organization shall determine the necessary competence of persons doing work under its control that affects its information security performance, ensure that these persons are competent on the basis of appropriate education, training, or experience, where applicable take actions to acquire the necessary competence and evaluate the effectiveness of the actions taken, and retain appropriate documented information as evidence of competence.",
          keyQuestions: [
            "Are competence requirements defined for all roles affecting information security performance?",
            "Are training programs aligned with identified competence gaps?",
            "Is the effectiveness of training and competence development activities evaluated?",
          ],
          evidenceExamples: [
            "Competence matrix mapping roles to required skills and qualifications",
            "Training plans, records, and certificates",
            "Competence assessment and training effectiveness evaluation records",
          ],
        },
        {
          code: "7.3",
          title: "Awareness",
          level: 1,
          orderNo: 3,
          description:
            "Persons doing work under the organization's control shall be aware of the information security policy, their contribution to the effectiveness of the ISMS including the benefits of improved information security performance, and the implications of not conforming with the ISMS requirements.",
          keyQuestions: [
            "Are all personnel aware of the information security policy and their specific responsibilities?",
            "Is there a regular security awareness program covering all relevant personnel?",
            "Do personnel understand the consequences of non-conformity with ISMS requirements?",
          ],
          evidenceExamples: [
            "Security awareness training materials and attendance records",
            "Awareness campaign communications (newsletters, posters, intranet content)",
            "Phishing simulation results and follow-up training records",
          ],
        },
        {
          code: "7.4",
          title: "Communication",
          level: 1,
          orderNo: 4,
          description:
            "The organization shall determine the need for internal and external communications relevant to the ISMS, including on what to communicate, when to communicate, with whom to communicate, and how to communicate. This ensures all relevant stakeholders receive timely and appropriate information about the ISMS.",
          keyQuestions: [
            "Is there a documented communication plan for ISMS-related internal and external communications?",
            "Are communication responsibilities and channels clearly defined?",
            "Are communications about information security incidents and changes handled effectively?",
          ],
          evidenceExamples: [
            "ISMS communication plan covering topics, audiences, frequency, and channels",
            "Records of internal communications (meeting minutes, notifications, bulletins)",
            "External communication records (regulatory notifications, customer communications)",
          ],
        },
        {
          code: "7.5",
          title: "Documented information",
          level: 1,
          orderNo: 5,
          description:
            "The ISMS shall include documented information required by this document and documented information determined by the organization as being necessary for the effectiveness of the ISMS. This includes creating, updating, and controlling documented information to ensure it is available and suitable for use, and adequately protected from loss of confidentiality, improper use, or loss of integrity.",
          keyQuestions: [
            "Is there a document control procedure covering creation, approval, distribution, and revision?",
            "Are all mandatory and organizational documented information items identified and maintained?",
            "Is documented information adequately protected from unauthorized access and modification?",
          ],
          evidenceExamples: [
            "Document control procedure with version control mechanisms",
            "Master document list or register for ISMS documentation",
            "Access control records for documented information repositories",
          ],
        },
      ],
    },

    // =========================================================================
    // CLAUSE 8: OPERATION
    // =========================================================================
    {
      code: "8",
      title: "Operation",
      level: 0,
      orderNo: 5,
      description:
        "Requires the organization to plan, implement, and control the processes needed to meet information security requirements, perform information security risk assessments and implement risk treatment plans.",
      keyQuestions: [
        "Are operational processes for the ISMS planned, implemented, and controlled?",
        "Are risk assessments performed at planned intervals or when significant changes occur?",
        "Is the risk treatment plan implemented and its results documented?",
      ],
      evidenceExamples: [
        "Operational planning and control procedures",
        "Completed risk assessment reports",
        "Risk treatment plan implementation records",
      ],
      children: [
        {
          code: "8.1",
          title: "Operational planning and control",
          level: 1,
          orderNo: 1,
          description:
            "The organization shall plan, implement, and control the processes needed to meet information security requirements and to implement the actions determined in 6.1. The organization shall also implement plans to achieve information security objectives determined in 6.2. The organization shall keep documented information to the extent necessary to have confidence that the processes have been carried out as planned. The organization shall control planned changes and review the consequences of unintended changes, taking action to mitigate any adverse effects as necessary. The organization shall ensure that externally provided processes, products, or services that are relevant to the ISMS are controlled.",
          keyQuestions: [
            "Are operational processes documented and implemented in accordance with ISMS plans?",
            "Are outsourced or externally provided processes controlled within the ISMS?",
            "Are unintended changes identified and their impacts mitigated?",
          ],
          evidenceExamples: [
            "Operational procedures and work instructions for ISMS processes",
            "Outsourced process control and monitoring records",
            "Records of unintended changes and corrective actions taken",
          ],
        },
        {
          code: "8.2",
          title: "Information security risk assessment",
          level: 1,
          orderNo: 2,
          description:
            "The organization shall perform information security risk assessments at planned intervals or when significant changes are proposed or occur, taking account of the criteria established in 6.1. The organization shall retain documented information of the results of the information security risk assessments.",
          keyQuestions: [
            "Are risk assessments performed at planned intervals and triggered by significant changes?",
            "Do risk assessments follow the methodology and criteria defined in clause 6.1?",
            "Are risk assessment results documented, communicated, and used for decision-making?",
          ],
          evidenceExamples: [
            "Completed risk assessment reports with dates and scope",
            "Risk register with current risk ratings and ownership",
            "Evidence of risk assessment triggered by organizational or environmental changes",
          ],
        },
        {
          code: "8.3",
          title: "Information security risk treatment",
          level: 1,
          orderNo: 3,
          description:
            "The organization shall implement the information security risk treatment plan. The organization shall retain documented information of the results of the information security risk treatment.",
          keyQuestions: [
            "Is the risk treatment plan being implemented according to schedule?",
            "Are risk treatment actions tracked to completion with responsible owners?",
            "Are residual risks formally accepted by appropriate risk owners?",
          ],
          evidenceExamples: [
            "Risk treatment plan with implementation status tracking",
            "Risk acceptance records signed by appropriate risk owners",
            "Evidence of implemented controls and their effectiveness",
          ],
        },
      ],
    },

    // =========================================================================
    // CLAUSE 9: PERFORMANCE EVALUATION
    // =========================================================================
    {
      code: "9",
      title: "Performance evaluation",
      level: 0,
      orderNo: 6,
      description:
        "Requires the organization to monitor, measure, analyze, and evaluate the ISMS, conduct internal audits, and perform management reviews to ensure continuing suitability, adequacy, and effectiveness.",
      keyQuestions: [
        "Is ISMS performance systematically monitored, measured, and evaluated?",
        "Is an internal audit programme established and implemented?",
        "Does top management review the ISMS at planned intervals?",
      ],
      evidenceExamples: [
        "ISMS performance metrics and dashboards",
        "Internal audit programme and completed audit reports",
        "Management review meeting minutes and action items",
      ],
      children: [
        {
          code: "9.1",
          title: "Monitoring, measurement, analysis and evaluation",
          level: 1,
          orderNo: 1,
          description:
            "The organization shall determine what needs to be monitored and measured, including information security processes and controls, the methods for monitoring, measurement, analysis, and evaluation to ensure valid results, when the monitoring and measuring shall be performed, who shall monitor and measure, when the results from monitoring and measurement shall be analysed and evaluated, and who shall analyse and evaluate these results. The organization shall retain appropriate documented information as evidence of the results.",
          keyQuestions: [
            "Are monitoring and measurement activities defined with clear methods, frequencies, and responsibilities?",
            "Are the results of monitoring and measurement analysed to identify trends and areas for improvement?",
            "Are performance indicators meaningful and aligned with information security objectives?",
          ],
          evidenceExamples: [
            "ISMS measurement plan specifying metrics, methods, frequency, and owners",
            "Performance measurement reports and trend analyses",
            "Security dashboards and KPI tracking records",
          ],
        },
        {
          code: "9.2",
          title: "Internal audit",
          level: 1,
          orderNo: 2,
          description:
            "The organization shall conduct internal audits at planned intervals to provide information on whether the ISMS conforms to the organization's own requirements and the requirements of this document, and is effectively implemented and maintained. The organization shall plan, establish, implement, and maintain an audit programme, including frequency, methods, responsibilities, planning requirements, and reporting. The organization shall define the audit criteria and scope for each audit, select auditors who ensure objectivity and impartiality, ensure audit results are reported to relevant management, and retain documented information as evidence of the audit programme and audit results.",
          keyQuestions: [
            "Is there a risk-based internal audit programme covering all ISMS requirements over a defined cycle?",
            "Are auditors independent and competent, with no auditing of their own work?",
            "Are audit findings tracked to resolution with root cause analysis and corrective actions?",
          ],
          evidenceExamples: [
            "Internal audit programme and schedule",
            "Completed audit reports with findings and recommendations",
            "Audit finding tracking and corrective action records",
          ],
        },
        {
          code: "9.3",
          title: "Management review",
          level: 1,
          orderNo: 3,
          description:
            "Top management shall review the organization's ISMS at planned intervals to ensure its continuing suitability, adequacy, and effectiveness. The management review shall include consideration of the status of actions from previous management reviews, changes in external and internal issues, changes in needs and expectations of interested parties, feedback on the information security performance including trends in nonconformities and corrective actions, monitoring and measurement results, audit results, fulfilment of information security objectives, feedback from interested parties, results of risk assessment and status of risk treatment plan, and opportunities for continual improvement. The outputs of the management review shall include decisions related to continual improvement opportunities and any needs for changes to the ISMS.",
          keyQuestions: [
            "Does management review cover all required inputs specified in the standard?",
            "Are management review outputs documented with clear decisions and action items?",
            "Are management reviews conducted at planned intervals with appropriate top management participation?",
          ],
          evidenceExamples: [
            "Management review meeting agendas and minutes",
            "Management review input reports and presentations",
            "Action items from management reviews with responsible owners and due dates",
          ],
        },
      ],
    },

    // =========================================================================
    // CLAUSE 10: IMPROVEMENT
    // =========================================================================
    {
      code: "10",
      title: "Improvement",
      level: 0,
      orderNo: 7,
      description:
        "Requires the organization to manage nonconformities, take corrective actions, and continually improve the suitability, adequacy, and effectiveness of the ISMS.",
      keyQuestions: [
        "Is there a process for identifying, documenting, and correcting nonconformities?",
        "Are corrective actions taken to eliminate the causes of nonconformities?",
        "Is the ISMS continually improved in terms of suitability, adequacy, and effectiveness?",
      ],
      evidenceExamples: [
        "Nonconformity and corrective action procedure",
        "Corrective action register with root cause analysis records",
        "Continual improvement plans and initiative tracking",
      ],
      children: [
        {
          code: "10.1",
          title: "Continual improvement",
          level: 1,
          orderNo: 1,
          description:
            "The organization shall continually improve the suitability, adequacy, and effectiveness of the information security management system. This involves considering the results of analysis, evaluation, management review outputs, and other inputs to identify opportunities for improvement and implement necessary changes.",
          keyQuestions: [
            "Is there a systematic approach to identifying and implementing continual improvement opportunities?",
            "Are improvement initiatives tracked and their effectiveness evaluated?",
            "Do improvement activities consider inputs from audits, reviews, measurements, and feedback?",
          ],
          evidenceExamples: [
            "Continual improvement register or log",
            "Records of improvement initiatives with outcomes and lessons learned",
            "Trend analysis reports identifying areas for improvement",
          ],
        },
        {
          code: "10.2",
          title: "Nonconformity and corrective action",
          level: 1,
          orderNo: 2,
          description:
            "When a nonconformity occurs, the organization shall react to the nonconformity by taking action to control and correct it and deal with the consequences, evaluate the need for action to eliminate the causes of nonconformity so that it does not recur or occur elsewhere, implement any action needed, review the effectiveness of any corrective action taken, and make changes to the ISMS if necessary. Corrective actions shall be appropriate to the effects of the nonconformities encountered. The organization shall retain documented information as evidence of the nature of nonconformities, actions taken, and results of corrective actions.",
          keyQuestions: [
            "Is there a defined process for reacting to nonconformities including root cause analysis?",
            "Are corrective actions implemented and their effectiveness verified?",
            "Are nonconformities and corrective actions documented and reported to relevant management?",
          ],
          evidenceExamples: [
            "Nonconformity reports with root cause analysis",
            "Corrective action plans with implementation evidence",
            "Effectiveness verification records for completed corrective actions",
          ],
        },
      ],
    },

    // =========================================================================
    // ANNEX A.5: ORGANIZATIONAL CONTROLS
    // =========================================================================
    {
      code: "A.5",
      title: "Organizational controls",
      level: 0,
      orderNo: 8,
      category: "organizational",
      description:
        "Organizational controls encompass policies, procedures, and governance mechanisms that establish the organizational framework for managing information security. These 37 controls address policy management, roles and responsibilities, threat intelligence, asset management, access control, supplier relationships, incident management, business continuity, and compliance.",
      keyQuestions: [
        "Are organizational policies and procedures for information security established and maintained?",
        "Is there a governance framework covering roles, responsibilities, segregation of duties, and management oversight?",
        "Are relationships with suppliers and third parties managed with appropriate security requirements?",
      ],
      evidenceExamples: [
        "Suite of information security policies and procedures",
        "Organizational governance structure for information security",
        "Third-party and supplier security management records",
      ],
      children: [
        {
          code: "A.5.1",
          title: "Policies for information security",
          level: 1,
          orderNo: 1,
          description:
            "An information security policy and topic-specific policies shall be defined, approved by management, published, communicated to and acknowledged by relevant personnel and relevant interested parties, and reviewed at planned intervals or if significant changes occur.",
          keyQuestions: [
            "Is there a comprehensive set of information security policies approved by management?",
            "Are policies communicated to all relevant personnel and interested parties?",
            "Are policies reviewed at planned intervals and updated when significant changes occur?",
          ],
          evidenceExamples: [
            "Information security policy document with management approval signatures",
            "Policy communication and acknowledgment records",
            "Policy review schedule and revision history logs",
          ],
        },
        {
          code: "A.5.2",
          title: "Information security roles and responsibilities",
          level: 1,
          orderNo: 2,
          description:
            "Information security roles and responsibilities shall be defined and allocated. All personnel shall understand their information security responsibilities and be provided with the means to fulfil them.",
          keyQuestions: [
            "Are information security roles and responsibilities clearly documented for all relevant positions?",
            "Do all personnel understand and acknowledge their information security responsibilities?",
            "Are responsibilities reviewed when organizational changes occur?",
          ],
          evidenceExamples: [
            "Role descriptions with information security responsibilities",
            "RACI matrix for information security activities",
            "Signed responsibility acknowledgment forms",
          ],
        },
        {
          code: "A.5.3",
          title: "Segregation of duties",
          level: 1,
          orderNo: 3,
          description:
            "Conflicting duties and conflicting areas of responsibility shall be segregated. Where segregation is difficult, compensating controls such as monitoring, audit trails, and management supervision shall be applied.",
          keyQuestions: [
            "Have conflicting duties been identified and segregated where practical?",
            "Are compensating controls in place where full segregation is not feasible?",
            "Are segregation of duties requirements reviewed periodically?",
          ],
          evidenceExamples: [
            "Segregation of duties matrix identifying conflicts",
            "Compensating control documentation where segregation is not feasible",
            "Access control reviews demonstrating enforcement of segregation",
          ],
        },
        {
          code: "A.5.4",
          title: "Management responsibilities",
          level: 1,
          orderNo: 4,
          description:
            "Management shall require all personnel to apply information security in accordance with the established information security policy and topic-specific policies and procedures of the organization.",
          keyQuestions: [
            "Does management actively enforce compliance with information security policies?",
            "Are managers held accountable for ensuring their teams follow security requirements?",
            "Is management involvement in security activities visible and documented?",
          ],
          evidenceExamples: [
            "Management directives reinforcing information security requirements",
            "Performance review criteria including information security compliance",
            "Records of management-led security activities and initiatives",
          ],
        },
        {
          code: "A.5.5",
          title: "Contact with authorities",
          level: 1,
          orderNo: 5,
          description:
            "The organization shall establish and maintain contact with relevant authorities. This includes law enforcement, regulatory bodies, and supervisory authorities to ensure timely notification and collaboration when required.",
          keyQuestions: [
            "Are contacts with relevant authorities (law enforcement, regulators, CERTs) identified and maintained?",
            "Is there a procedure for when and how to contact these authorities?",
            "Are contact details kept current and accessible to relevant personnel?",
          ],
          evidenceExamples: [
            "Authority contact register with names, roles, and contact details",
            "Procedures for engaging with authorities during incidents",
            "Records of interactions with relevant authorities",
          ],
        },
        {
          code: "A.5.6",
          title: "Contact with special interest groups",
          level: 1,
          orderNo: 6,
          description:
            "The organization shall establish and maintain contact with special interest groups or other specialist security forums and professional associations to stay informed about security threats, vulnerabilities, and best practices.",
          keyQuestions: [
            "Are relevant special interest groups and professional forums identified and engaged?",
            "Is threat intelligence from these groups incorporated into the ISMS?",
            "Are memberships and participation in these groups reviewed for value?",
          ],
          evidenceExamples: [
            "Membership records for security forums and professional associations",
            "Records of information received from special interest groups",
            "Meeting attendance records and actionable intelligence reports",
          ],
        },
        {
          code: "A.5.7",
          title: "Threat intelligence",
          level: 1,
          orderNo: 7,
          description:
            "Information relating to information security threats shall be collected and analysed to produce threat intelligence. The threat intelligence shall be relevant, insightful, contextual, and actionable, covering strategic, tactical, and operational levels.",
          keyQuestions: [
            "Is threat intelligence collected from multiple reliable sources?",
            "Is threat intelligence analysed and disseminated to relevant personnel in a timely manner?",
            "Are threat intelligence insights used to inform risk assessments and security controls?",
          ],
          evidenceExamples: [
            "Threat intelligence feeds and subscription records",
            "Threat intelligence analysis reports and briefings",
            "Records of security improvements made based on threat intelligence",
          ],
        },
        {
          code: "A.5.8",
          title: "Information security in project management",
          level: 1,
          orderNo: 8,
          description:
            "Information security shall be integrated into project management, regardless of the type of project. This ensures that information security risks are identified and addressed as part of project planning and execution throughout the project lifecycle.",
          keyQuestions: [
            "Is information security integrated into the project management methodology?",
            "Are security requirements identified and addressed during project planning?",
            "Are security reviews conducted at key project milestones?",
          ],
          evidenceExamples: [
            "Project management methodology with embedded security checkpoints",
            "Project security risk assessments and treatment plans",
            "Security gate review records for completed projects",
          ],
        },
        {
          code: "A.5.9",
          title: "Inventory of information and other associated assets",
          level: 1,
          orderNo: 9,
          description:
            "An inventory of information and other associated assets, including owners, shall be developed and maintained. The inventory shall be accurate, up to date, consistent, and aligned with other inventories.",
          keyQuestions: [
            "Is there a comprehensive and current inventory of information assets?",
            "Are owners assigned for all inventoried assets?",
            "Is the asset inventory regularly reviewed and updated?",
          ],
          evidenceExamples: [
            "Information asset register with classification and ownership",
            "Asset discovery and reconciliation reports",
            "Asset inventory review and update records",
          ],
        },
        {
          code: "A.5.10",
          title: "Acceptable use of information and other associated assets",
          level: 1,
          orderNo: 10,
          description:
            "Rules for the acceptable use of information and other associated assets, and rules for the acceptable use of and procedures for handling information and other associated assets shall be identified, documented, and implemented.",
          keyQuestions: [
            "Is there an acceptable use policy covering information and associated assets?",
            "Do all personnel acknowledge and agree to acceptable use rules?",
            "Are violations of acceptable use policies detected and addressed?",
          ],
          evidenceExamples: [
            "Acceptable use policy covering information, systems, and assets",
            "User acknowledgment records for acceptable use policies",
            "Records of acceptable use policy violations and corrective actions",
          ],
        },
        {
          code: "A.5.11",
          title: "Return of assets",
          level: 1,
          orderNo: 11,
          description:
            "Personnel and other interested parties as appropriate shall return all the organization's assets in their possession upon change or termination of their employment, contract, or agreement.",
          keyQuestions: [
            "Is there a process for returning assets upon employment termination or role change?",
            "Are returned assets tracked and verified against the asset inventory?",
            "Are exceptions to asset return handled and documented appropriately?",
          ],
          evidenceExamples: [
            "Asset return checklist as part of offboarding process",
            "Signed asset return confirmation forms",
            "Records of outstanding assets and follow-up actions",
          ],
        },
        {
          code: "A.5.12",
          title: "Classification of information",
          level: 1,
          orderNo: 12,
          description:
            "Information shall be classified according to the information security needs of the organization based on confidentiality, integrity, availability, and relevant interested party requirements.",
          keyQuestions: [
            "Is there a defined information classification scheme with clear levels?",
            "Is information classified consistently across the organization?",
            "Are classification decisions reviewed and updated when necessary?",
          ],
          evidenceExamples: [
            "Information classification policy and scheme definition",
            "Classified asset register showing applied classification levels",
            "Training records for information classification procedures",
          ],
        },
        {
          code: "A.5.13",
          title: "Labelling of information",
          level: 1,
          orderNo: 13,
          description:
            "An appropriate set of procedures for information labelling shall be developed and implemented in accordance with the information classification scheme adopted by the organization.",
          keyQuestions: [
            "Are labelling procedures defined for each classification level?",
            "Are labels consistently applied to information in all formats (digital, physical, verbal)?",
            "Are automated labelling tools used where appropriate?",
          ],
          evidenceExamples: [
            "Information labelling procedure and guidelines",
            "Examples of correctly labelled documents and media",
            "Automated labelling tool configuration records",
          ],
        },
        {
          code: "A.5.14",
          title: "Information transfer",
          level: 1,
          orderNo: 14,
          description:
            "Information transfer rules, procedures, or agreements shall be in place for all types of transfer facilities within the organization and between the organization and other parties. Transfer includes electronic, physical, and verbal transfers.",
          keyQuestions: [
            "Are information transfer rules defined for electronic, physical, and verbal transfers?",
            "Are appropriate security measures applied during information transfer (encryption, secure channels)?",
            "Are information transfer agreements in place with external parties?",
          ],
          evidenceExamples: [
            "Information transfer policy covering all transfer types",
            "Secure transfer mechanism configurations (TLS, VPN, encrypted email)",
            "Information exchange agreements with external parties",
          ],
        },
        {
          code: "A.5.15",
          title: "Access control",
          level: 1,
          orderNo: 15,
          description:
            "Rules to control physical and logical access to information and other associated assets shall be established and implemented based on business and information security requirements.",
          keyQuestions: [
            "Is there an access control policy defining rules for physical and logical access?",
            "Are access control rules based on business needs and the principle of least privilege?",
            "Are access control implementations regularly reviewed for appropriateness?",
          ],
          evidenceExamples: [
            "Access control policy and associated procedures",
            "Access control matrices mapping roles to permissions",
            "Access rights review reports and remediation records",
          ],
        },
        {
          code: "A.5.16",
          title: "Identity management",
          level: 1,
          orderNo: 16,
          description:
            "The full lifecycle of identities shall be managed. This includes the provisioning, adjustment, and deprovisioning of user identities, ensuring each identity is unique and associated with a single entity.",
          keyQuestions: [
            "Is there a formal identity lifecycle management process (creation, modification, deletion)?",
            "Are all identities unique and traceable to individual persons or entities?",
            "Are orphaned or dormant identities detected and handled?",
          ],
          evidenceExamples: [
            "Identity management procedure covering the full lifecycle",
            "Identity provisioning and deprovisioning request records",
            "Periodic identity review reports identifying orphaned accounts",
          ],
        },
        {
          code: "A.5.17",
          title: "Authentication information",
          level: 1,
          orderNo: 17,
          description:
            "Allocation and management of authentication information shall be controlled by a management process, including advising personnel on appropriate handling of authentication information. This covers passwords, tokens, certificates, and other authentication factors.",
          keyQuestions: [
            "Is there a policy governing the creation, distribution, and management of authentication information?",
            "Are personnel advised on the secure handling of authentication credentials?",
            "Are authentication mechanisms periodically reviewed for strength and appropriateness?",
          ],
          evidenceExamples: [
            "Authentication information management policy (password policy, MFA requirements)",
            "User guidance materials on secure handling of credentials",
            "Authentication mechanism assessment and upgrade records",
          ],
        },
        {
          code: "A.5.18",
          title: "Access rights",
          level: 1,
          orderNo: 18,
          description:
            "Access rights to information and other associated assets shall be provisioned, reviewed, modified, and removed in accordance with the organization's topic-specific policy on and rules for access control.",
          keyQuestions: [
            "Is there a formal process for requesting, approving, and provisioning access rights?",
            "Are access rights reviewed at regular intervals and upon role changes?",
            "Are access rights promptly revoked upon termination or role change?",
          ],
          evidenceExamples: [
            "Access request and approval workflow records",
            "Periodic access rights review reports",
            "Access revocation records during offboarding or role changes",
          ],
        },
        {
          code: "A.5.19",
          title: "Information security in supplier relationships",
          level: 1,
          orderNo: 19,
          description:
            "Processes and procedures shall be defined and implemented to manage the information security risks associated with the use of supplier's products or services. This includes establishing and agreeing upon security requirements with each supplier.",
          keyQuestions: [
            "Are information security requirements defined for supplier relationships?",
            "Are suppliers assessed for security capability before engagement?",
            "Are security requirements incorporated into supplier contracts and agreements?",
          ],
          evidenceExamples: [
            "Supplier security assessment questionnaires and results",
            "Contract clauses addressing information security requirements",
            "Supplier risk register with security risk ratings",
          ],
        },
        {
          code: "A.5.20",
          title: "Addressing information security within supplier agreements",
          level: 1,
          orderNo: 20,
          description:
            "Relevant information security requirements shall be established and agreed with each supplier based on the type of supplier relationship. Agreements shall address access, handling, protection, and return of information.",
          keyQuestions: [
            "Do supplier agreements contain specific information security clauses?",
            "Are information handling, protection, and return requirements clearly specified?",
            "Are right-to-audit clauses included in supplier agreements?",
          ],
          evidenceExamples: [
            "Supplier agreements with information security clauses",
            "Standard security terms and conditions for supplier contracts",
            "Records of negotiated security requirements with suppliers",
          ],
        },
        {
          code: "A.5.21",
          title: "Managing information security in the ICT supply chain",
          level: 1,
          orderNo: 21,
          description:
            "Processes and procedures shall be defined and implemented to manage the information security risks associated with the ICT products and services supply chain. This addresses risks throughout the entire supply chain, not just direct suppliers.",
          keyQuestions: [
            "Are ICT supply chain risks identified, assessed, and managed?",
            "Are security requirements cascaded through the supply chain?",
            "Is there visibility into the security practices of sub-suppliers for critical components?",
          ],
          evidenceExamples: [
            "ICT supply chain risk assessment records",
            "Supply chain security requirements documentation",
            "Sub-supplier security assessment and monitoring records",
          ],
        },
        {
          code: "A.5.22",
          title: "Monitoring, review and change management of supplier services",
          level: 1,
          orderNo: 22,
          description:
            "The organization shall regularly monitor, review, evaluate, and manage change in supplier information security practices and service delivery. This ensures ongoing compliance with security requirements and enables timely response to changes.",
          keyQuestions: [
            "Are supplier security practices regularly monitored and reviewed?",
            "Is supplier performance against security requirements tracked and reported?",
            "Are changes in supplier services assessed for security impact?",
          ],
          evidenceExamples: [
            "Supplier security review and audit reports",
            "Supplier performance scorecards including security metrics",
            "Change management records for supplier service modifications",
          ],
        },
        {
          code: "A.5.23",
          title: "Information security for use of cloud services",
          level: 1,
          orderNo: 23,
          description:
            "Processes for acquisition, use, management, and exit from cloud services shall be established in accordance with the organization's information security requirements. This includes addressing the shared responsibility model and cloud-specific risks.",
          keyQuestions: [
            "Are cloud service security requirements defined, including shared responsibility delineation?",
            "Are cloud services assessed and selected based on security criteria?",
            "Is there a plan for managing cloud service exit or transition?",
          ],
          evidenceExamples: [
            "Cloud security policy or guidelines",
            "Cloud service provider risk assessments and security evaluations",
            "Cloud exit strategy and data migration plans",
          ],
        },
        {
          code: "A.5.24",
          title: "Information security incident management planning and preparation",
          level: 1,
          orderNo: 24,
          description:
            "The organization shall plan and prepare for managing information security incidents by defining, establishing, and communicating information security incident management processes, roles, and responsibilities.",
          keyQuestions: [
            "Is there a documented incident management plan with defined roles and responsibilities?",
            "Are incident response procedures established for different incident types?",
            "Are incident response personnel trained and incident response plans tested?",
          ],
          evidenceExamples: [
            "Information security incident management plan",
            "Incident response procedures for various incident categories",
            "Incident response training records and exercise/drill results",
          ],
        },
        {
          code: "A.5.25",
          title: "Assessment and decision on information security events",
          level: 1,
          orderNo: 25,
          description:
            "The organization shall assess information security events and decide if they are to be categorized as information security incidents. Events shall be assessed against defined criteria for classification and prioritization.",
          keyQuestions: [
            "Are criteria defined for classifying security events as incidents?",
            "Is there a triage process for assessing and prioritizing security events?",
            "Are assessment decisions documented with rationale?",
          ],
          evidenceExamples: [
            "Event classification criteria and severity matrix",
            "Event assessment and triage records",
            "Incident decision logs with classification rationale",
          ],
        },
        {
          code: "A.5.26",
          title: "Response to information security incidents",
          level: 1,
          orderNo: 26,
          description:
            "Information security incidents shall be responded to in accordance with the documented procedures. The response shall include containment, eradication, recovery, and communication activities proportionate to the severity of the incident.",
          keyQuestions: [
            "Are incident response activities conducted in accordance with documented procedures?",
            "Are incidents contained, eradicated, and recovered from in a timely manner?",
            "Are relevant internal and external parties notified as required?",
          ],
          evidenceExamples: [
            "Incident response records showing containment and resolution activities",
            "Incident communication logs with internal and external notifications",
            "Post-incident recovery and verification records",
          ],
        },
        {
          code: "A.5.27",
          title: "Learning from information security incidents",
          level: 1,
          orderNo: 27,
          description:
            "Knowledge gained from information security incidents shall be used to strengthen and improve the information security controls. Post-incident reviews shall identify lessons learned and drive improvements to prevent recurrence.",
          keyQuestions: [
            "Are post-incident reviews conducted for all significant incidents?",
            "Are lessons learned documented and shared across the organization?",
            "Are improvements identified from incidents implemented and tracked?",
          ],
          evidenceExamples: [
            "Post-incident review reports with lessons learned",
            "Improvement action items resulting from incident analysis",
            "Updated controls or procedures based on incident findings",
          ],
        },
        {
          code: "A.5.28",
          title: "Collection of evidence",
          level: 1,
          orderNo: 28,
          description:
            "The organization shall establish and implement procedures for the identification, collection, acquisition, and preservation of evidence related to information security events. Evidence shall be handled in a manner that maintains its integrity for potential legal proceedings.",
          keyQuestions: [
            "Are procedures established for evidence collection and preservation?",
            "Is evidence handled in accordance with chain-of-custody requirements?",
            "Are personnel trained in forensic evidence handling procedures?",
          ],
          evidenceExamples: [
            "Evidence collection and preservation procedures",
            "Chain-of-custody logs for collected evidence",
            "Forensic analysis reports and evidence storage records",
          ],
        },
        {
          code: "A.5.29",
          title: "Information security during disruption",
          level: 1,
          orderNo: 29,
          description:
            "The organization shall plan how to maintain information security at an appropriate level during disruption. This includes ensuring security controls remain effective during crisis situations and that security is not compromised in the rush to restore services.",
          keyQuestions: [
            "Are information security requirements defined for disruption and crisis scenarios?",
            "Do business continuity plans address the maintenance of security controls?",
            "Are security arrangements during disruption tested and validated?",
          ],
          evidenceExamples: [
            "Business continuity plans with embedded security requirements",
            "Security requirements for disaster recovery environments",
            "Test results validating security during disruption scenarios",
          ],
        },
        {
          code: "A.5.30",
          title: "ICT readiness for business continuity",
          level: 1,
          orderNo: 30,
          description:
            "ICT readiness shall be planned, implemented, maintained, and tested based on business continuity objectives and ICT continuity requirements. This ensures technology infrastructure can support business operations during and after disruption.",
          keyQuestions: [
            "Are ICT continuity requirements derived from business continuity objectives?",
            "Are ICT continuity plans established and maintained for critical systems?",
            "Are ICT continuity arrangements regularly tested and validated?",
          ],
          evidenceExamples: [
            "ICT continuity plans with recovery time and recovery point objectives",
            "Disaster recovery test reports and results",
            "ICT infrastructure resilience and redundancy documentation",
          ],
        },
        {
          code: "A.5.31",
          title: "Legal, statutory, regulatory and contractual requirements",
          level: 1,
          orderNo: 31,
          description:
            "Legal, statutory, regulatory, and contractual requirements relevant to information security and the organization's approach to meeting these requirements shall be identified, documented, and kept up to date.",
          keyQuestions: [
            "Are all applicable legal, regulatory, and contractual requirements identified and documented?",
            "Is there a process for monitoring changes in legal and regulatory requirements?",
            "Is compliance with identified requirements regularly assessed?",
          ],
          evidenceExamples: [
            "Legal and regulatory compliance register",
            "Compliance monitoring and assessment reports",
            "Records of legal/regulatory updates and their impact assessment",
          ],
        },
        {
          code: "A.5.32",
          title: "Intellectual property rights",
          level: 1,
          orderNo: 32,
          description:
            "The organization shall implement appropriate procedures to protect intellectual property rights. This includes compliance with software licensing, protection of proprietary information, and respect for third-party intellectual property.",
          keyQuestions: [
            "Are procedures in place to ensure compliance with intellectual property rights?",
            "Is software licensing managed and monitored for compliance?",
            "Are proprietary assets and trade secrets adequately protected?",
          ],
          evidenceExamples: [
            "Software license management records and compliance audits",
            "Intellectual property protection procedures",
            "Non-disclosure agreements and IP assignment records",
          ],
        },
        {
          code: "A.5.33",
          title: "Protection of records",
          level: 1,
          orderNo: 33,
          description:
            "Records shall be protected from loss, destruction, falsification, unauthorized access, and unauthorized release in accordance with legal, statutory, regulatory, contractual, and business requirements.",
          keyQuestions: [
            "Are records protected against loss, destruction, and unauthorized modification?",
            "Are retention periods defined and enforced for different types of records?",
            "Are records disposal procedures secure and documented?",
          ],
          evidenceExamples: [
            "Records management policy with retention schedules",
            "Secure records storage and access control mechanisms",
            "Records disposal logs and verification records",
          ],
        },
        {
          code: "A.5.34",
          title: "Privacy and protection of personal identifiable information (PII)",
          level: 1,
          orderNo: 34,
          description:
            "The organization shall identify and meet the requirements regarding the preservation of privacy and protection of PII according to applicable laws and regulations and contractual requirements.",
          keyQuestions: [
            "Are applicable privacy and data protection requirements identified and documented?",
            "Are PII handling procedures established and followed?",
            "Are privacy impact assessments conducted for new processing activities?",
          ],
          evidenceExamples: [
            "Privacy policy and PII handling procedures",
            "Data protection impact assessments (DPIAs)",
            "PII processing register and consent management records",
          ],
        },
        {
          code: "A.5.35",
          title: "Independent review of information security",
          level: 1,
          orderNo: 35,
          description:
            "The organization's approach to managing information security and its implementation, including people, processes, and technologies, shall be reviewed independently at planned intervals, or when significant changes occur.",
          keyQuestions: [
            "Are independent reviews of the ISMS conducted at planned intervals?",
            "Are reviewers independent and competent to assess information security?",
            "Are review findings acted upon with tracked improvement actions?",
          ],
          evidenceExamples: [
            "Independent review reports (e.g., third-party audits, penetration tests)",
            "Reviewer qualifications and independence declarations",
            "Action plans addressing independent review findings",
          ],
        },
        {
          code: "A.5.36",
          title: "Compliance with policies, rules and standards for information security",
          level: 1,
          orderNo: 36,
          description:
            "Compliance with the organization's information security policy, topic-specific policies, rules, and standards shall be regularly reviewed. Managers shall review compliance within their areas of responsibility.",
          keyQuestions: [
            "Are compliance reviews conducted regularly for information security policies and standards?",
            "Are managers accountable for compliance within their areas of responsibility?",
            "Are non-compliance instances identified, reported, and remediated?",
          ],
          evidenceExamples: [
            "Compliance review reports and checklists",
            "Non-compliance incident records with remediation actions",
            "Management attestations of compliance within their areas",
          ],
        },
        {
          code: "A.5.37",
          title: "Documented operating procedures",
          level: 1,
          orderNo: 37,
          description:
            "Operating procedures for information processing facilities shall be documented and made available to personnel who need them. This ensures consistent and secure operation of systems and processes.",
          keyQuestions: [
            "Are operating procedures documented for information processing facilities and activities?",
            "Are procedures kept current and made available to relevant personnel?",
            "Are changes to operating procedures reviewed and approved?",
          ],
          evidenceExamples: [
            "Documented operating procedures for critical systems and processes",
            "Procedure review and approval records",
            "Access logs showing procedure availability to relevant personnel",
          ],
        },
      ],
    },

    // =========================================================================
    // ANNEX A.6: PEOPLE CONTROLS
    // =========================================================================
    {
      code: "A.6",
      title: "People controls",
      level: 0,
      orderNo: 9,
      category: "people",
      description:
        "People controls address the human element of information security, covering the entire employment lifecycle from screening before hire through onboarding, ongoing awareness and disciplinary processes, to responsibilities at termination or change of employment. These 8 controls ensure personnel are suitable, informed, and accountable.",
      keyQuestions: [
        "Are pre-employment screening checks conducted for all personnel?",
        "Are personnel made aware of their information security responsibilities through training and awareness programs?",
        "Are processes in place for managing security aspects of employment changes and terminations?",
      ],
      evidenceExamples: [
        "Pre-employment screening and background check records",
        "Security awareness training materials and completion records",
        "Employment termination and change procedures with security checklists",
      ],
      children: [
        {
          code: "A.6.1",
          title: "Screening",
          level: 1,
          orderNo: 1,
          description:
            "Background verification checks on all candidates for employment shall be carried out prior to joining the organization and on an ongoing basis taking into consideration applicable laws, regulations, and ethics and be proportional to the business requirements, the classification of information to be accessed, and the perceived risks.",
          keyQuestions: [
            "Are background verification checks conducted for all candidates proportional to role risk?",
            "Do screening processes comply with applicable laws and regulations?",
            "Are screening checks repeated at appropriate intervals for existing personnel?",
          ],
          evidenceExamples: [
            "Background check policy and procedure",
            "Completed background verification records for new hires",
            "Periodic re-screening records for personnel in sensitive roles",
          ],
        },
        {
          code: "A.6.2",
          title: "Terms and conditions of employment",
          level: 1,
          orderNo: 2,
          description:
            "The employment contractual agreements shall state the personnel's and the organization's responsibilities for information security. This includes obligations that extend beyond the period of employment, such as confidentiality and non-disclosure requirements.",
          keyQuestions: [
            "Do employment contracts include information security responsibilities and obligations?",
            "Are post-employment security obligations (e.g., confidentiality) clearly defined?",
            "Are employment terms updated to reflect changes in security requirements?",
          ],
          evidenceExamples: [
            "Employment contracts with information security clauses",
            "Confidentiality and non-disclosure agreements",
            "Records of contract updates reflecting security requirement changes",
          ],
        },
        {
          code: "A.6.3",
          title: "Information security awareness, education and training",
          level: 1,
          orderNo: 3,
          description:
            "Personnel of the organization and relevant interested parties shall receive appropriate information security awareness, education, and training and regular updates of the organization's information security policy, topic-specific policies and procedures, as relevant for their job function.",
          keyQuestions: [
            "Is a comprehensive security awareness and training program established and maintained?",
            "Is training content relevant to different roles and responsibilities?",
            "Are training completion and effectiveness regularly measured and reported?",
          ],
          evidenceExamples: [
            "Security awareness training program plan and curriculum",
            "Training completion records and compliance dashboards",
            "Training effectiveness assessments (quizzes, simulations, surveys)",
          ],
        },
        {
          code: "A.6.4",
          title: "Disciplinary process",
          level: 1,
          orderNo: 4,
          description:
            "A disciplinary process shall be formalized and communicated to take actions against personnel and other relevant interested parties who have committed an information security policy violation. The process should be proportionate and consider the severity and impact of the violation.",
          keyQuestions: [
            "Is there a formal disciplinary process for information security policy violations?",
            "Is the disciplinary process communicated to all personnel?",
            "Are disciplinary actions proportionate and consistently applied?",
          ],
          evidenceExamples: [
            "Disciplinary procedure for security policy violations",
            "Communication records of disciplinary process to personnel",
            "Anonymized records of disciplinary actions for security violations",
          ],
        },
        {
          code: "A.6.5",
          title: "Responsibilities after termination or change of employment",
          level: 1,
          orderNo: 5,
          description:
            "Information security responsibilities and duties that remain valid after termination or change of employment shall be defined, enforced, and communicated to relevant personnel and other interested parties.",
          keyQuestions: [
            "Are post-employment security responsibilities defined and communicated?",
            "Are non-disclosure and confidentiality obligations enforced after termination?",
            "Are access rights promptly modified or revoked upon employment changes?",
          ],
          evidenceExamples: [
            "Post-employment security obligations documentation",
            "Exit interview checklists including security responsibilities reminder",
            "Access revocation records upon termination or role change",
          ],
        },
        {
          code: "A.6.6",
          title: "Confidentiality or non-disclosure agreements",
          level: 1,
          orderNo: 6,
          description:
            "Confidentiality or non-disclosure agreements reflecting the organization's needs for the protection of information shall be identified, documented, regularly reviewed, and signed by personnel and other relevant interested parties.",
          keyQuestions: [
            "Are confidentiality/NDA requirements identified for all relevant relationships?",
            "Are NDAs signed by all personnel and relevant third parties?",
            "Are NDAs reviewed and updated to reflect changing requirements?",
          ],
          evidenceExamples: [
            "Standard NDA templates for employees, contractors, and third parties",
            "Signed NDA register with review dates",
            "NDA review and update records",
          ],
        },
        {
          code: "A.6.7",
          title: "Remote working",
          level: 1,
          orderNo: 7,
          description:
            "Security measures shall be implemented when personnel are working remotely to protect information accessed, processed, or stored outside the organization's premises. This includes securing remote access, protecting endpoints, and maintaining physical security of remote workspaces.",
          keyQuestions: [
            "Are security requirements defined and communicated for remote working?",
            "Are remote access connections secured with appropriate controls (VPN, MFA)?",
            "Are remote working environments assessed for physical security risks?",
          ],
          evidenceExamples: [
            "Remote working security policy and guidelines",
            "Secure remote access configuration records (VPN, MFA)",
            "Remote working risk assessments and acknowledgment forms",
          ],
        },
        {
          code: "A.6.8",
          title: "Information security event reporting",
          level: 1,
          orderNo: 8,
          description:
            "The organization shall provide a mechanism for personnel to report observed or suspected information security events through appropriate channels in a timely manner. Reporting shall be easy, accessible, and without fear of reprisal.",
          keyQuestions: [
            "Is there an accessible mechanism for reporting security events?",
            "Are all personnel aware of how and when to report security events?",
            "Is there a non-retaliation policy encouraging event reporting?",
          ],
          evidenceExamples: [
            "Security event reporting procedure and channels (hotline, portal, email)",
            "Training materials covering event reporting obligations",
            "Event reporting metrics and response acknowledgment records",
          ],
        },
      ],
    },

    // =========================================================================
    // ANNEX A.7: PHYSICAL CONTROLS
    // =========================================================================
    {
      code: "A.7",
      title: "Physical controls",
      level: 0,
      orderNo: 10,
      category: "physical",
      description:
        "Physical controls address the protection of facilities, equipment, and physical media from unauthorized access, damage, and interference. These 14 controls cover security perimeters, entry controls, securing offices and facilities, monitoring, protection against environmental threats, working in secure areas, clear desk and screen policies, equipment management, and secure disposal.",
      keyQuestions: [
        "Are physical security perimeters defined and enforced for areas containing sensitive information?",
        "Is physical access controlled and monitored with appropriate mechanisms?",
        "Are environmental threats and equipment security adequately addressed?",
      ],
      evidenceExamples: [
        "Physical security assessment reports for facilities",
        "Access control system logs and visitor management records",
        "Environmental monitoring and equipment maintenance records",
      ],
      children: [
        {
          code: "A.7.1",
          title: "Physical security perimeters",
          level: 1,
          orderNo: 1,
          description:
            "Security perimeters shall be defined and used to protect areas that contain information and other associated assets. Perimeters shall be physically sound and include appropriate entry controls proportional to the sensitivity of the assets within.",
          keyQuestions: [
            "Are physical security perimeters defined for areas containing sensitive information and assets?",
            "Are perimeters physically sound with no gaps or weaknesses?",
            "Are perimeter controls proportional to the classification of assets within?",
          ],
          evidenceExamples: [
            "Physical security perimeter definitions and floor plans",
            "Perimeter security assessment and inspection reports",
            "Building construction specifications addressing security requirements",
          ],
        },
        {
          code: "A.7.2",
          title: "Physical entry controls",
          level: 1,
          orderNo: 2,
          description:
            "Secure areas shall be protected by appropriate entry controls to ensure that only authorized personnel are allowed access. Entry controls may include badges, biometric readers, PIN codes, and security personnel.",
          keyQuestions: [
            "Are entry controls implemented at all access points to secure areas?",
            "Are visitor access procedures defined and followed?",
            "Are entry control logs maintained and periodically reviewed?",
          ],
          evidenceExamples: [
            "Physical access control system configuration and records",
            "Visitor registration and escort procedures",
            "Access log review reports and anomaly investigations",
          ],
        },
        {
          code: "A.7.3",
          title: "Securing offices, rooms and facilities",
          level: 1,
          orderNo: 3,
          description:
            "Physical security for offices, rooms, and facilities shall be designed and implemented. This includes considering the security needs based on the information and assets within and applying appropriate controls.",
          keyQuestions: [
            "Are office and facility security measures appropriate to the assets and information within?",
            "Are sensitive areas identified and given enhanced physical protection?",
            "Are physical security measures reviewed when changes occur in facility usage?",
          ],
          evidenceExamples: [
            "Facility security design specifications",
            "Secure area classifications and associated control requirements",
            "Facility security review and inspection records",
          ],
        },
        {
          code: "A.7.4",
          title: "Physical security monitoring",
          level: 1,
          orderNo: 4,
          description:
            "Premises shall be continuously monitored for unauthorized physical access. Monitoring may include CCTV, intrusion detection systems, security guards, and alarm systems, configured and maintained to provide adequate coverage.",
          keyQuestions: [
            "Are premises monitored for unauthorized physical access continuously?",
            "Are monitoring systems (CCTV, alarms, sensors) maintained and functioning?",
            "Are monitoring alerts investigated and responded to in a timely manner?",
          ],
          evidenceExamples: [
            "CCTV coverage maps and operational status records",
            "Intrusion detection system configuration and testing records",
            "Security monitoring alert investigation logs",
          ],
        },
        {
          code: "A.7.5",
          title: "Protecting against physical and environmental threats",
          level: 1,
          orderNo: 5,
          description:
            "Protection against physical and environmental threats, such as natural disasters, fire, flood, earthquake, and malicious attack, shall be designed and implemented. This includes preventive measures and response planning.",
          keyQuestions: [
            "Have physical and environmental threats been identified and assessed for each facility?",
            "Are preventive and protective measures implemented against identified threats?",
            "Are environmental protection systems regularly tested and maintained?",
          ],
          evidenceExamples: [
            "Physical and environmental threat assessment reports",
            "Fire suppression, flood detection, and environmental control system records",
            "Environmental protection system testing and maintenance logs",
          ],
        },
        {
          code: "A.7.6",
          title: "Working in secure areas",
          level: 1,
          orderNo: 6,
          description:
            "Security measures for working in secure areas shall be designed and implemented. This includes rules governing access, work activities, and conduct within secure areas to prevent unauthorized disclosure, modification, or theft.",
          keyQuestions: [
            "Are rules and procedures defined for working in secure areas?",
            "Are personnel working in secure areas aware of and follow the rules?",
            "Are activities in secure areas supervised or monitored as appropriate?",
          ],
          evidenceExamples: [
            "Secure area working procedures and rules",
            "Secure area access logs and supervision records",
            "Personnel acknowledgment of secure area rules",
          ],
        },
        {
          code: "A.7.7",
          title: "Clear desk and clear screen",
          level: 1,
          orderNo: 7,
          description:
            "Clear desk rules for papers and removable storage media and clear screen rules for information processing facilities shall be defined and appropriately enforced to reduce the risk of unauthorized access, loss, or damage.",
          keyQuestions: [
            "Are clear desk and clear screen policies defined and communicated?",
            "Are compliance checks conducted for clear desk and screen policies?",
            "Are facilities provided to support policy compliance (lockable storage, screen locks)?",
          ],
          evidenceExamples: [
            "Clear desk and clear screen policy",
            "Compliance inspection reports and findings",
            "Provision records for lockable cabinets and screen lock configurations",
          ],
        },
        {
          code: "A.7.8",
          title: "Equipment siting and protection",
          level: 1,
          orderNo: 8,
          description:
            "Equipment shall be sited and protected to reduce the risks from physical and environmental threats, and to reduce the opportunities for unauthorized access. This includes positioning equipment to minimize observation by unauthorized persons.",
          keyQuestions: [
            "Is equipment positioned to reduce exposure to physical and environmental threats?",
            "Are equipment locations selected to minimize unauthorized access and observation risks?",
            "Are critical equipment installations reviewed for adequacy of protection?",
          ],
          evidenceExamples: [
            "Equipment placement diagrams and rationale documentation",
            "Environmental condition monitoring records for equipment locations",
            "Equipment protection assessment reports",
          ],
        },
        {
          code: "A.7.9",
          title: "Security of assets off-premises",
          level: 1,
          orderNo: 9,
          description:
            "Off-site assets shall be protected. Security measures applied to off-site assets shall take account of the different risks of working outside the organization's premises, including transit, remote storage, and use in external locations.",
          keyQuestions: [
            "Are security measures defined for assets used or stored off-premises?",
            "Are off-site assets tracked and their security regularly verified?",
            "Are personnel aware of security requirements for assets taken off-site?",
          ],
          evidenceExamples: [
            "Off-premises asset usage policy and guidelines",
            "Off-site asset register and tracking records",
            "Personnel acknowledgment of off-premises security requirements",
          ],
        },
        {
          code: "A.7.10",
          title: "Storage media",
          level: 1,
          orderNo: 10,
          description:
            "Storage media shall be managed through their lifecycle of acquisition, use, transportation, and disposal in accordance with the organization's classification scheme and handling requirements. This ensures media containing sensitive information are adequately protected.",
          keyQuestions: [
            "Are storage media managed throughout their lifecycle with appropriate security controls?",
            "Are media handling procedures aligned with information classification levels?",
            "Are media securely disposed of when no longer required?",
          ],
          evidenceExamples: [
            "Storage media management procedures covering the full lifecycle",
            "Media inventory and tracking records",
            "Secure media disposal certificates and records",
          ],
        },
        {
          code: "A.7.11",
          title: "Supporting utilities",
          level: 1,
          orderNo: 11,
          description:
            "Information processing facilities shall be protected from power failures and other disruptions caused by failures in supporting utilities such as electricity, telecommunications, water supply, and gas. Supporting utilities shall be adequate for the systems they are supporting.",
          keyQuestions: [
            "Are supporting utilities (power, cooling, telecommunications) adequate and reliable?",
            "Are backup power systems (UPS, generators) implemented and regularly tested?",
            "Are utility failures monitored and responded to promptly?",
          ],
          evidenceExamples: [
            "Supporting utility infrastructure documentation",
            "UPS and generator testing and maintenance records",
            "Utility failure incident logs and response records",
          ],
        },
        {
          code: "A.7.12",
          title: "Cabling security",
          level: 1,
          orderNo: 12,
          description:
            "Cables carrying power or data or supporting information services shall be protected from interception, interference, or damage. This includes using conduits, avoiding public areas, and segregating power and communications cables.",
          keyQuestions: [
            "Are power and data cables protected from interception and physical damage?",
            "Are cable routes documented and physically protected?",
            "Is cabling security reviewed as part of facility security assessments?",
          ],
          evidenceExamples: [
            "Cabling infrastructure diagrams showing protection measures",
            "Cabling installation standards and specifications",
            "Cabling security inspection and maintenance records",
          ],
        },
        {
          code: "A.7.13",
          title: "Equipment maintenance",
          level: 1,
          orderNo: 13,
          description:
            "Equipment shall be maintained correctly to ensure availability, integrity, and continued security. Maintenance activities shall be performed by authorized personnel and records shall be maintained.",
          keyQuestions: [
            "Is equipment maintained according to manufacturer and organizational specifications?",
            "Are maintenance activities performed by authorized and qualified personnel?",
            "Are maintenance records maintained and reviewed?",
          ],
          evidenceExamples: [
            "Equipment maintenance schedules and procedures",
            "Maintenance service records and logs",
            "Maintenance personnel authorization and competence records",
          ],
        },
        {
          code: "A.7.14",
          title: "Secure disposal or re-use of equipment",
          level: 1,
          orderNo: 14,
          description:
            "Items of equipment containing storage media shall be verified to ensure that any sensitive data and licensed software has been removed or securely overwritten prior to disposal or re-use. This prevents unauthorized disclosure of information from decommissioned equipment.",
          keyQuestions: [
            "Is equipment verified for secure data removal before disposal or re-use?",
            "Are data sanitization methods appropriate to the classification of information?",
            "Are disposal and re-use activities documented with verification records?",
          ],
          evidenceExamples: [
            "Equipment disposal and sanitization procedures",
            "Data sanitization verification certificates",
            "Equipment disposal registers with chain-of-custody records",
          ],
        },
      ],
    },

    // =========================================================================
    // ANNEX A.8: TECHNOLOGICAL CONTROLS
    // =========================================================================
    {
      code: "A.8",
      title: "Technological controls",
      level: 0,
      orderNo: 11,
      category: "technological",
      description:
        "Technological controls address the technical measures for protecting information systems and data. These 34 controls cover endpoint security, privileged access, access restriction, source code management, authentication, capacity management, malware protection, vulnerability management, configuration management, data deletion, masking, leakage prevention, backup, redundancy, logging, monitoring, network security, web filtering, cryptography, secure development lifecycle, security testing, change management, and separation of environments.",
      keyQuestions: [
        "Are technical security controls implemented and configured according to security baselines?",
        "Are systems protected against malware, unauthorized access, and data leakage?",
        "Are logging, monitoring, and vulnerability management processes effective?",
      ],
      evidenceExamples: [
        "Technical security configuration standards and baselines",
        "Vulnerability assessment and penetration testing reports",
        "Security monitoring and logging architecture documentation",
      ],
      children: [
        {
          code: "A.8.1",
          title: "User endpoint devices",
          level: 1,
          orderNo: 1,
          description:
            "Information stored on, processed by, or accessible via user endpoint devices shall be protected. This includes laptops, tablets, mobile phones, and other portable devices used to access organizational information.",
          keyQuestions: [
            "Are security policies defined and enforced for all user endpoint devices?",
            "Are endpoint devices encrypted, patched, and protected by anti-malware?",
            "Is mobile device management (MDM) or equivalent solution implemented?",
          ],
          evidenceExamples: [
            "Endpoint security policy and configuration standards",
            "MDM/endpoint management system configuration and compliance reports",
            "Endpoint encryption and anti-malware deployment status reports",
          ],
        },
        {
          code: "A.8.2",
          title: "Privileged access rights",
          level: 1,
          orderNo: 2,
          description:
            "The allocation and use of privileged access rights shall be restricted and managed. Privileged accounts shall be used only for administrative tasks and subject to enhanced controls including monitoring and regular review.",
          keyQuestions: [
            "Are privileged access rights restricted to the minimum necessary?",
            "Is the use of privileged accounts monitored and logged?",
            "Are privileged access rights reviewed regularly and revoked when no longer needed?",
          ],
          evidenceExamples: [
            "Privileged access management (PAM) policy and procedures",
            "Privileged account inventory and review records",
            "Privileged access usage logs and monitoring reports",
          ],
        },
        {
          code: "A.8.3",
          title: "Information access restriction",
          level: 1,
          orderNo: 3,
          description:
            "Access to information and other associated assets shall be restricted in accordance with the established topic-specific policy on access control. This includes application-level access controls and data-level access restrictions.",
          keyQuestions: [
            "Are application and data access controls implemented based on access control policies?",
            "Are access restrictions enforced through technical mechanisms (RBAC, ACLs)?",
            "Are access restriction configurations reviewed and validated regularly?",
          ],
          evidenceExamples: [
            "Application access control configurations",
            "Role-based access control (RBAC) definitions and assignments",
            "Access restriction validation and testing records",
          ],
        },
        {
          code: "A.8.4",
          title: "Access to source code",
          level: 1,
          orderNo: 4,
          description:
            "Read and write access to source code, development tools, and software libraries shall be appropriately managed. This prevents unauthorized modifications, protects intellectual property, and maintains the integrity of the software development process.",
          keyQuestions: [
            "Is access to source code repositories controlled and limited to authorized personnel?",
            "Are code changes tracked with audit trails and approval processes?",
            "Are source code access rights reviewed periodically?",
          ],
          evidenceExamples: [
            "Source code repository access control configurations",
            "Code commit and approval logs",
            "Source code access review records",
          ],
        },
        {
          code: "A.8.5",
          title: "Secure authentication",
          level: 1,
          orderNo: 5,
          description:
            "Secure authentication technologies and procedures shall be established and implemented based on information access restrictions and the topic-specific policy on access control. This includes multi-factor authentication, password requirements, and session management.",
          keyQuestions: [
            "Are secure authentication mechanisms implemented (MFA, strong password policies)?",
            "Are authentication procedures proportional to the sensitivity of systems and data accessed?",
            "Are authentication failures monitored and responded to?",
          ],
          evidenceExamples: [
            "Authentication mechanism configurations (MFA, SSO, password policies)",
            "Authentication failure monitoring and response procedures",
            "Authentication system assessment and testing reports",
          ],
        },
        {
          code: "A.8.6",
          title: "Capacity management",
          level: 1,
          orderNo: 6,
          description:
            "The use of resources shall be monitored and adjusted in line with current and expected capacity requirements. Capacity planning shall ensure that adequate processing power, storage, network bandwidth, and other resources are available to meet business needs and maintain system performance.",
          keyQuestions: [
            "Are system resources monitored for utilization and capacity trends?",
            "Is capacity planning performed to ensure future resource adequacy?",
            "Are capacity thresholds defined with alerts for approaching limits?",
          ],
          evidenceExamples: [
            "Capacity monitoring dashboards and utilization reports",
            "Capacity planning documents and forecasts",
            "Capacity threshold alert configurations and response records",
          ],
        },
        {
          code: "A.8.7",
          title: "Protection against malware",
          level: 1,
          orderNo: 7,
          description:
            "Protection against malware shall be implemented and supported by appropriate user awareness. This includes deploying anti-malware solutions, keeping them current, and educating users on malware threats and safe practices.",
          keyQuestions: [
            "Are anti-malware solutions deployed across all relevant systems and kept up to date?",
            "Are malware detection events monitored, investigated, and resolved?",
            "Are users educated on recognizing and avoiding malware threats?",
          ],
          evidenceExamples: [
            "Anti-malware solution deployment and update status reports",
            "Malware incident detection and response records",
            "Malware awareness training materials and completion records",
          ],
        },
        {
          code: "A.8.8",
          title: "Management of technical vulnerabilities",
          level: 1,
          orderNo: 8,
          description:
            "Information about technical vulnerabilities of information systems in use shall be obtained in a timely fashion, the organization's exposure to such vulnerabilities shall be evaluated, and appropriate measures shall be taken to address the associated risk.",
          keyQuestions: [
            "Is there a process for timely identification of technical vulnerabilities?",
            "Are vulnerabilities assessed for risk and prioritized for remediation?",
            "Are vulnerability remediation activities tracked to completion within defined SLAs?",
          ],
          evidenceExamples: [
            "Vulnerability scanning reports and schedules",
            "Vulnerability risk assessment and prioritization records",
            "Vulnerability remediation tracking and closure reports",
          ],
        },
        {
          code: "A.8.9",
          title: "Configuration management",
          level: 1,
          orderNo: 9,
          description:
            "Configurations, including security configurations, of hardware, software, services, and networks shall be established, documented, implemented, monitored, and reviewed. This ensures systems operate in a secure and consistent state.",
          keyQuestions: [
            "Are security configuration baselines defined for all system types?",
            "Are configurations monitored for deviations from baselines?",
            "Are configuration changes managed through a controlled process?",
          ],
          evidenceExamples: [
            "Security configuration baseline documents and standards",
            "Configuration compliance scanning reports",
            "Configuration change management records",
          ],
        },
        {
          code: "A.8.10",
          title: "Information deletion",
          level: 1,
          orderNo: 10,
          description:
            "Information stored in information systems, devices, or in any other storage media shall be deleted when no longer required. Deletion methods shall be appropriate to the sensitivity of the information and comply with legal and contractual requirements.",
          keyQuestions: [
            "Are data retention periods defined and enforced with automatic or manual deletion?",
            "Are deletion methods appropriate to the sensitivity of the information?",
            "Are deletion activities documented and verifiable?",
          ],
          evidenceExamples: [
            "Data retention and deletion policy with defined periods",
            "Automated data deletion configurations and logs",
            "Data deletion verification and certification records",
          ],
        },
        {
          code: "A.8.11",
          title: "Data masking",
          level: 1,
          orderNo: 11,
          description:
            "Data masking shall be used in accordance with the organization's topic-specific policy on access control and other related topic-specific policies, and business requirements, taking applicable legislation into consideration. This protects sensitive data in non-production environments and reporting.",
          keyQuestions: [
            "Is data masking applied to sensitive data in non-production environments?",
            "Are data masking techniques appropriate to the sensitivity and context of the data?",
            "Is the effectiveness of data masking validated?",
          ],
          evidenceExamples: [
            "Data masking policy and procedures",
            "Data masking implementation configurations and rules",
            "Validation records confirming masking effectiveness",
          ],
        },
        {
          code: "A.8.12",
          title: "Data leakage prevention",
          level: 1,
          orderNo: 12,
          description:
            "Data leakage prevention measures shall be applied to systems, networks, and any other devices that process, store, or transmit sensitive information. This includes monitoring and blocking unauthorized data transfers.",
          keyQuestions: [
            "Are DLP solutions or measures deployed to detect and prevent unauthorized data transfers?",
            "Are DLP policies configured to cover key data loss channels (email, web, USB, cloud)?",
            "Are DLP alerts monitored, investigated, and resolved?",
          ],
          evidenceExamples: [
            "DLP solution configuration and policy rules",
            "DLP alert and incident investigation records",
            "Data leakage risk assessment and control effectiveness reports",
          ],
        },
        {
          code: "A.8.13",
          title: "Information backup",
          level: 1,
          orderNo: 13,
          description:
            "Backup copies of information, software, and systems shall be maintained and regularly tested in accordance with the agreed topic-specific policy on backup. Backups shall enable timely restoration of systems and data.",
          keyQuestions: [
            "Are backup policies defined covering scope, frequency, retention, and storage?",
            "Are backups regularly tested through restoration exercises?",
            "Are backup media and storage locations adequately protected?",
          ],
          evidenceExamples: [
            "Backup policy and schedule documentation",
            "Backup execution logs and success/failure reports",
            "Backup restoration test records and results",
          ],
        },
        {
          code: "A.8.14",
          title: "Redundancy of information processing facilities",
          level: 1,
          orderNo: 14,
          description:
            "Information processing facilities shall be implemented with sufficient redundancy to meet availability requirements. This includes redundant systems, components, and services to ensure continuity of operations.",
          keyQuestions: [
            "Are redundancy requirements defined based on availability targets?",
            "Are redundant systems and components implemented for critical processing facilities?",
            "Are failover mechanisms regularly tested to ensure they function correctly?",
          ],
          evidenceExamples: [
            "Redundancy architecture documentation for critical systems",
            "Availability targets (SLAs) and redundancy design decisions",
            "Failover testing records and results",
          ],
        },
        {
          code: "A.8.15",
          title: "Logging",
          level: 1,
          orderNo: 15,
          description:
            "Logs that record activities, exceptions, faults, and other relevant events shall be produced, stored, protected, and analysed. Logs shall be retained for an appropriate period and protected against tampering and unauthorized access.",
          keyQuestions: [
            "Are logging requirements defined covering what events to log, retention periods, and protection?",
            "Are logs protected from tampering and unauthorized access?",
            "Are logs regularly analysed for security-relevant events?",
          ],
          evidenceExamples: [
            "Logging policy and standards defining events to capture",
            "Log management system configuration and retention settings",
            "Log integrity protection mechanisms (write-once storage, digital signatures)",
          ],
        },
        {
          code: "A.8.16",
          title: "Monitoring activities",
          level: 1,
          orderNo: 16,
          description:
            "Networks, systems, and applications shall be monitored for anomalous behaviour and appropriate actions taken to evaluate potential information security incidents. Monitoring activities shall be proportionate to the threat environment.",
          keyQuestions: [
            "Are monitoring activities established for networks, systems, and applications?",
            "Are anomalous behaviours detected through automated monitoring tools (SIEM, IDS/IPS)?",
            "Are monitoring alerts triaged, investigated, and resolved in a timely manner?",
          ],
          evidenceExamples: [
            "Security monitoring architecture and tool configuration (SIEM, IDS/IPS)",
            "Monitoring alert rules and threshold configurations",
            "Alert investigation and resolution records",
          ],
        },
        {
          code: "A.8.17",
          title: "Clock synchronization",
          level: 1,
          orderNo: 17,
          description:
            "The clocks of information processing systems used by the organization shall be synchronized to approved time sources. Accurate time synchronization is essential for log correlation, forensic analysis, and compliance.",
          keyQuestions: [
            "Are all system clocks synchronized to approved and reliable time sources (NTP)?",
            "Is time synchronization monitored for accuracy and drift?",
            "Are time source configurations protected from unauthorized changes?",
          ],
          evidenceExamples: [
            "NTP configuration settings for systems and network devices",
            "Time synchronization monitoring and accuracy reports",
            "Approved time source documentation",
          ],
        },
        {
          code: "A.8.18",
          title: "Use of privileged utility programs",
          level: 1,
          orderNo: 18,
          description:
            "The use of utility programs that might be capable of overriding system and application controls shall be restricted and tightly controlled. These programs can bypass security mechanisms and must be managed carefully.",
          keyQuestions: [
            "Are privileged utility programs identified and access restricted?",
            "Is the use of privileged utilities logged and monitored?",
            "Are unnecessary privileged utilities removed or disabled?",
          ],
          evidenceExamples: [
            "Inventory of privileged utility programs with access restrictions",
            "Privileged utility usage logs and monitoring records",
            "Utility program removal or disabling records",
          ],
        },
        {
          code: "A.8.19",
          title: "Installation of software on operational systems",
          level: 1,
          orderNo: 19,
          description:
            "Procedures and measures shall be implemented to securely manage software installation on operational systems. This includes controlling who can install software, what software can be installed, and how installations are authorized.",
          keyQuestions: [
            "Are software installation rights restricted to authorized personnel?",
            "Is there an approved software list or whitelisting mechanism?",
            "Are software installations logged and monitored?",
          ],
          evidenceExamples: [
            "Software installation policy and authorization procedures",
            "Approved software list or application whitelisting configurations",
            "Software installation logs and compliance reports",
          ],
        },
        {
          code: "A.8.20",
          title: "Networks security",
          level: 1,
          orderNo: 20,
          description:
            "Networks and network devices shall be secured, managed, and controlled to protect information in systems and applications. This includes network architecture design, segmentation, access controls, and traffic management.",
          keyQuestions: [
            "Are network security controls implemented (firewalls, segmentation, access controls)?",
            "Is network architecture designed with appropriate security zones and segmentation?",
            "Are network devices securely configured and regularly reviewed?",
          ],
          evidenceExamples: [
            "Network architecture diagrams showing security zones and segmentation",
            "Firewall and network device configuration standards and reviews",
            "Network security assessment and penetration testing reports",
          ],
        },
        {
          code: "A.8.21",
          title: "Security of network services",
          level: 1,
          orderNo: 21,
          description:
            "Security mechanisms, service levels, and service requirements of network services shall be identified, implemented, and monitored. This applies to both in-house and outsourced network services.",
          keyQuestions: [
            "Are security requirements defined for all network services (in-house and outsourced)?",
            "Are network service security mechanisms implemented and monitored?",
            "Are network service provider SLAs reviewed for security compliance?",
          ],
          evidenceExamples: [
            "Network service security requirements documentation",
            "Network service provider agreements with security clauses",
            "Network service monitoring and performance reports",
          ],
        },
        {
          code: "A.8.22",
          title: "Segregation of networks",
          level: 1,
          orderNo: 22,
          description:
            "Groups of information services, users, and information systems shall be segregated in networks. Network segregation limits the blast radius of security incidents and controls information flow between network segments.",
          keyQuestions: [
            "Are networks segregated based on trust levels, business functions, or sensitivity?",
            "Are inter-segment communications controlled by firewalls or access control lists?",
            "Is network segregation regularly tested and validated?",
          ],
          evidenceExamples: [
            "Network segregation design and VLAN documentation",
            "Inter-segment firewall rules and access control configurations",
            "Network segregation testing and validation reports",
          ],
        },
        {
          code: "A.8.23",
          title: "Web filtering",
          level: 1,
          orderNo: 23,
          description:
            "Access to external websites shall be managed to reduce exposure to malicious content. Web filtering shall block access to known malicious sites and restrict access to inappropriate content categories.",
          keyQuestions: [
            "Is web filtering implemented to block access to malicious and inappropriate websites?",
            "Are web filtering policies regularly updated with current threat intelligence?",
            "Are web filtering exceptions managed through a controlled process?",
          ],
          evidenceExamples: [
            "Web filtering solution configuration and category policies",
            "Web filtering exception request and approval records",
            "Web filtering effectiveness reports and blocked access statistics",
          ],
        },
        {
          code: "A.8.24",
          title: "Use of cryptography",
          level: 1,
          orderNo: 24,
          description:
            "Rules for the effective use of cryptography, including cryptographic key management, shall be defined and implemented. This covers encryption at rest, in transit, key generation, storage, rotation, and destruction.",
          keyQuestions: [
            "Is there a cryptographic policy defining approved algorithms, key lengths, and usage rules?",
            "Is cryptographic key management covered through the full lifecycle?",
            "Are cryptographic implementations assessed for compliance with policy and current best practices?",
          ],
          evidenceExamples: [
            "Cryptographic policy and standards document",
            "Key management procedures and lifecycle records",
            "Cryptographic implementation assessment reports",
          ],
        },
        {
          code: "A.8.25",
          title: "Secure development life cycle",
          level: 1,
          orderNo: 25,
          description:
            "Rules for the secure development of software and systems shall be established and applied. This includes integrating security activities throughout the development lifecycle from requirements through design, implementation, testing, and deployment.",
          keyQuestions: [
            "Is a secure development lifecycle (SDLC) defined and followed?",
            "Are security requirements identified and integrated from the design phase?",
            "Are developers trained in secure coding practices?",
          ],
          evidenceExamples: [
            "Secure SDLC methodology documentation",
            "Security requirements in project specifications",
            "Secure coding training records and developer guidelines",
          ],
        },
        {
          code: "A.8.26",
          title: "Application security requirements",
          level: 1,
          orderNo: 26,
          description:
            "Information security requirements shall be identified, specified, and approved when developing or acquiring applications. This includes authentication, authorization, data validation, session management, and error handling requirements.",
          keyQuestions: [
            "Are security requirements identified and documented for all application development?",
            "Are security requirements reviewed and approved as part of the development process?",
            "Are acquired applications assessed against security requirements before deployment?",
          ],
          evidenceExamples: [
            "Application security requirements specifications",
            "Security requirement review and approval records",
            "Application security assessment reports for acquired software",
          ],
        },
        {
          code: "A.8.27",
          title: "Secure system architecture and engineering principles",
          level: 1,
          orderNo: 27,
          description:
            "Principles for engineering secure systems shall be established, documented, maintained, and applied to any information system development activities. This includes defence in depth, least privilege, secure defaults, and fail-safe design.",
          keyQuestions: [
            "Are secure architecture and engineering principles documented and maintained?",
            "Are these principles applied consistently across system development activities?",
            "Are architecture designs reviewed against security principles before implementation?",
          ],
          evidenceExamples: [
            "Secure system architecture principles document",
            "Architecture review records showing application of security principles",
            "System design documents demonstrating security-by-design approach",
          ],
        },
        {
          code: "A.8.28",
          title: "Secure coding",
          level: 1,
          orderNo: 28,
          description:
            "Secure coding principles shall be applied to software development. This includes input validation, output encoding, error handling, use of parameterized queries, avoidance of known vulnerable patterns, and adherence to secure coding standards.",
          keyQuestions: [
            "Are secure coding standards defined and communicated to development teams?",
            "Are code reviews conducted with a focus on security?",
            "Are static and dynamic code analysis tools used to identify security vulnerabilities?",
          ],
          evidenceExamples: [
            "Secure coding standards and guidelines",
            "Code review checklists with security criteria",
            "Static/dynamic code analysis tool reports and remediation records",
          ],
        },
        {
          code: "A.8.29",
          title: "Security testing in development and acceptance",
          level: 1,
          orderNo: 29,
          description:
            "Security testing processes shall be defined and implemented in the development life cycle. This includes unit testing for security functions, integration testing, penetration testing, and security acceptance testing before production deployment.",
          keyQuestions: [
            "Are security testing requirements defined for all development projects?",
            "Are penetration tests and security assessments performed before production deployment?",
            "Are security testing findings tracked to remediation?",
          ],
          evidenceExamples: [
            "Security testing plan and methodology",
            "Penetration test and security assessment reports",
            "Security testing finding remediation tracking records",
          ],
        },
        {
          code: "A.8.30",
          title: "Outsourced development",
          level: 1,
          orderNo: 30,
          description:
            "The organization shall direct, monitor, and review the activities related to outsourced system development. This ensures that externally developed systems meet the organization's security requirements and quality standards.",
          keyQuestions: [
            "Are security requirements communicated to outsourced development providers?",
            "Is outsourced development work monitored and reviewed for security compliance?",
            "Are acceptance criteria including security requirements defined for outsourced deliverables?",
          ],
          evidenceExamples: [
            "Outsourced development agreements with security clauses",
            "Code review and security testing records for outsourced deliverables",
            "Outsourced development oversight and monitoring records",
          ],
        },
        {
          code: "A.8.31",
          title: "Separation of development, test and production environments",
          level: 1,
          orderNo: 31,
          description:
            "Development, testing, and production environments shall be separated and secured to reduce the risks of unauthorized access or changes to the production environment. Separation may be physical or logical.",
          keyQuestions: [
            "Are development, test, and production environments clearly separated?",
            "Are access controls enforced between environments?",
            "Is the promotion of code between environments controlled through formal processes?",
          ],
          evidenceExamples: [
            "Environment separation architecture documentation",
            "Access control configurations for each environment",
            "Code promotion and release management procedures and logs",
          ],
        },
        {
          code: "A.8.32",
          title: "Change management",
          level: 1,
          orderNo: 32,
          description:
            "Changes to information processing facilities and information systems shall be subject to change management procedures. This includes assessing the security impact of changes, obtaining approvals, testing, and maintaining rollback plans.",
          keyQuestions: [
            "Is there a formal change management process for all system and infrastructure changes?",
            "Are security impact assessments performed for proposed changes?",
            "Are changes tested, approved, and documented before implementation?",
          ],
          evidenceExamples: [
            "Change management policy and procedures",
            "Change request records with security impact assessments",
            "Change implementation and post-change review records",
          ],
        },
        {
          code: "A.8.33",
          title: "Test information",
          level: 1,
          orderNo: 33,
          description:
            "Test information shall be appropriately selected, protected, and managed. Production data used for testing shall be anonymized or masked, and test data shall be controlled to prevent unauthorized access or disclosure.",
          keyQuestions: [
            "Is test data appropriately selected and protected?",
            "Is production data anonymized or masked before use in test environments?",
            "Are test data management procedures defined and followed?",
          ],
          evidenceExamples: [
            "Test data management policy and procedures",
            "Data anonymization and masking records for test environments",
            "Test data access control configurations",
          ],
        },
        {
          code: "A.8.34",
          title: "Protection of information systems during audit testing",
          level: 1,
          orderNo: 34,
          description:
            "Audit tests and other assurance activities involving assessment of operational systems shall be planned and agreed with the appropriate manager. This minimizes disruption to business processes and ensures audit activities do not compromise system security.",
          keyQuestions: [
            "Are audit testing activities planned and agreed upon in advance?",
            "Are audit tools and activities controlled to prevent system disruption?",
            "Are audit testing results protected from unauthorized access?",
          ],
          evidenceExamples: [
            "Audit testing plans with agreed scope and schedules",
            "Audit tool usage authorization and control records",
            "Audit testing result handling and protection procedures",
          ],
        },
      ],
    },
  ],
};
