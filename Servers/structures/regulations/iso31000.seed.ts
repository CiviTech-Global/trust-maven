import { RegulationSeed } from "./types";

export const ISO31000_SEED: RegulationSeed = {
  code: "ISO_31000",
  name: "ISO 31000:2018",
  type: "standard",
  category: "risk_management",
  jurisdiction: "International",
  issuer: "ISO",
  version: "2018",
  description:
    "International standard providing principles, a framework, and a process for managing risk applicable to any organization.",
  effectiveDate: "2018-02-15",
  requirements: [
    // ── Clause 4: Principles ──
    {
      code: "4",
      title: "Principles",
      level: 0,
      orderNo: 1,
      description:
        "The purpose of risk management is the creation and protection of value. The principles outlined in this clause provide guidance on the characteristics of effective and efficient risk management, communicating its value and explaining its intention and purpose.",
      keyQuestions: [
        "Are the principles of risk management clearly communicated and understood across the organization?",
        "Does the organization regularly assess whether its risk management practices align with these principles?",
      ],
      evidenceExamples: [
        "Risk management policy statement referencing ISO 31000 principles",
        "Board-level endorsement of risk management principles",
        "Training materials covering risk management principles",
      ],
      implementationGuidance:
        "Adopt these principles as the foundation for all risk management activities. Ensure leadership communicates the importance of each principle and that they are embedded into governance and decision-making processes.",
      children: [
        {
          code: "4.1",
          title: "Integrated",
          level: 1,
          orderNo: 1,
          description:
            "Risk management is an integral part of all organizational activities. It should not be treated as a separate or standalone function but embedded into the governance structure, strategic planning, management processes, and operational activities of the organization.",
          keyQuestions: [
            "Is risk management embedded within the organization's governance structure and decision-making processes?",
            "Are risk considerations part of project planning, strategy development, and change management?",
            "Do operational procedures incorporate risk identification and response mechanisms?",
          ],
          evidenceExamples: [
            "Strategic planning documents that include risk assessments",
            "Project management templates with integrated risk sections",
            "Board meeting agendas that include risk management as a standing item",
          ],
          implementationGuidance:
            "Integrate risk management into existing governance, planning, and operational processes rather than creating parallel structures. Ensure risk considerations are part of every significant decision and that accountability for risk is embedded in role descriptions.",
        },
        {
          code: "4.2",
          title: "Structured and comprehensive",
          level: 1,
          orderNo: 2,
          description:
            "A structured and comprehensive approach to risk management contributes to consistent and comparable results. The organization should adopt a systematic methodology that is applied uniformly across all levels and functions.",
          keyQuestions: [
            "Does the organization use a consistent and repeatable methodology for identifying, analyzing, and evaluating risks?",
            "Are risk assessment results comparable across different departments and time periods?",
            "Is there a defined taxonomy or classification scheme for risks?",
          ],
          evidenceExamples: [
            "Documented risk management methodology or procedure",
            "Standardized risk register templates used across departments",
            "Risk taxonomy or categorization framework",
          ],
          implementationGuidance:
            "Develop a documented risk management methodology that defines how risks are identified, analyzed, evaluated, and treated. Use standardized templates, scales, and terminology to ensure consistency and comparability of results across the organization.",
        },
        {
          code: "4.3",
          title: "Customized",
          level: 1,
          orderNo: 3,
          description:
            "The risk management framework and process are customized and proportionate to the organization's external and internal context related to its objectives. There is no single approach to risk management that fits all organizations.",
          keyQuestions: [
            "Has the risk management framework been tailored to the organization's specific context, size, and complexity?",
            "Are risk criteria and appetite aligned with the organization's strategic objectives?",
            "Does the approach reflect the sector, regulatory environment, and stakeholder expectations?",
          ],
          evidenceExamples: [
            "Risk appetite statement aligned with organizational strategy",
            "Context analysis documenting internal and external factors",
            "Tailored risk assessment criteria reflecting organizational priorities",
          ],
          implementationGuidance:
            "Conduct a thorough analysis of the organization's context to tailor the risk management framework appropriately. Avoid adopting generic frameworks without adaptation. Ensure risk criteria, scales, and processes reflect the organization's unique risk profile, industry, and regulatory environment.",
        },
        {
          code: "4.4",
          title: "Inclusive",
          level: 1,
          orderNo: 4,
          description:
            "Appropriate and timely involvement of stakeholders enables their knowledge, views, and perceptions to be considered. This results in improved awareness and informed risk management. Stakeholders should be involved throughout the risk management process.",
          keyQuestions: [
            "Are relevant internal and external stakeholders identified and appropriately engaged in risk management activities?",
            "Do stakeholders have opportunities to contribute their knowledge and perspectives on risks?",
            "Is there a mechanism for incorporating stakeholder feedback into risk assessments?",
          ],
          evidenceExamples: [
            "Stakeholder engagement plan for risk management activities",
            "Workshop attendance records showing cross-functional participation",
            "Stakeholder feedback incorporated into risk registers",
          ],
          implementationGuidance:
            "Identify all relevant stakeholders and establish mechanisms for their involvement in risk management. Use workshops, surveys, and consultation processes to capture diverse perspectives. Ensure stakeholder engagement is proportionate to the significance of the risk and the stakeholders' influence or interest.",
        },
        {
          code: "4.5",
          title: "Dynamic",
          level: 1,
          orderNo: 5,
          description:
            "Risks can emerge, change, or disappear as an organization's external and internal context changes. Risk management anticipates, detects, acknowledges, and responds to those changes and events in an appropriate and timely manner.",
          keyQuestions: [
            "Does the organization have processes to detect and respond to changes in the risk environment?",
            "Are risk assessments updated when significant internal or external changes occur?",
            "Is there a mechanism for emerging risk identification and escalation?",
          ],
          evidenceExamples: [
            "Emerging risk identification process documentation",
            "Evidence of risk register updates triggered by environmental changes",
            "Horizon scanning or early warning indicator reports",
          ],
          implementationGuidance:
            "Establish processes for ongoing monitoring of the internal and external environment. Implement triggers and thresholds that prompt reassessment of risks when significant changes occur. Develop horizon scanning capabilities to identify emerging risks before they materialize.",
        },
        {
          code: "4.6",
          title: "Best available information",
          level: 1,
          orderNo: 6,
          description:
            "The inputs to risk management are based on historical and current information, as well as on future expectations. Risk management explicitly takes into account any limitations and uncertainties associated with such information and expectations.",
          keyQuestions: [
            "Does the organization use diverse and reliable information sources for risk assessments?",
            "Are the limitations and uncertainties of risk information explicitly acknowledged and documented?",
            "Is there a process for validating and improving the quality of risk data over time?",
          ],
          evidenceExamples: [
            "Data quality assessments for key risk indicators",
            "Risk assessment records documenting information sources and confidence levels",
            "Use of multiple data sources including incident data, industry benchmarks, and expert judgment",
          ],
          implementationGuidance:
            "Ensure risk assessments draw on the best available information from multiple sources. Document the sources, assumptions, and limitations of risk data. Where quantitative data is unavailable, use structured expert judgment and scenario analysis. Continuously improve data collection and analysis capabilities.",
        },
        {
          code: "4.7",
          title: "Human and cultural factors",
          level: 1,
          orderNo: 7,
          description:
            "Human behavior and culture significantly influence all aspects of risk management at each level and stage. Risk management should recognize the contribution of people and culture to achieving objectives and managing risk effectively.",
          keyQuestions: [
            "Does the organization understand how culture and human behavior affect risk management effectiveness?",
            "Are there programs to build a positive risk culture across the organization?",
            "Are human factors such as cognitive biases considered in risk assessment processes?",
          ],
          evidenceExamples: [
            "Risk culture assessment surveys and results",
            "Training programs addressing cognitive biases in risk decision-making",
            "Behavioral indicators integrated into risk management performance metrics",
          ],
          implementationGuidance:
            "Recognize that risk management is fundamentally a human activity. Assess and actively manage the organization's risk culture. Address cognitive biases through structured processes, diverse perspectives, and challenge mechanisms. Promote open reporting of risks and near-misses without blame.",
        },
        {
          code: "4.8",
          title: "Continual improvement",
          level: 1,
          orderNo: 8,
          description:
            "Risk management is continually improved through learning and experience. Organizations should develop and implement strategies to improve their risk management maturity alongside all other aspects of their organization.",
          keyQuestions: [
            "Does the organization have a process for evaluating and improving its risk management practices?",
            "Are lessons learned from risk events and near-misses systematically captured and acted upon?",
            "Is there a risk management maturity model or improvement roadmap in place?",
          ],
          evidenceExamples: [
            "Risk management maturity assessment results and improvement plans",
            "Lessons learned registers from risk events and incidents",
            "Annual review and improvement reports for the risk management framework",
          ],
          implementationGuidance:
            "Establish a systematic approach to evaluating and improving risk management maturity. Conduct periodic self-assessments or external reviews. Capture and share lessons learned from risk events. Set improvement objectives and track progress against a maturity model or improvement roadmap.",
        },
      ],
    },

    // ── Clause 5: Framework ──
    {
      code: "5",
      title: "Framework",
      level: 0,
      orderNo: 2,
      description:
        "The purpose of the risk management framework is to assist the organization in integrating risk management into significant activities and functions. The effectiveness of risk management depends on its integration into the governance of the organization, including decision-making.",
      keyQuestions: [
        "Has the organization established a formal risk management framework aligned with ISO 31000?",
        "Is the framework reviewed and adapted periodically to reflect changes in the organization's context?",
      ],
      evidenceExamples: [
        "Documented risk management framework or policy",
        "Framework review and update records",
        "Organizational chart showing risk management roles and responsibilities",
      ],
      implementationGuidance:
        "Design and implement a risk management framework that provides the foundations and organizational arrangements for embedding risk management throughout the organization. The framework should be proportionate to the organization's size and complexity.",
      children: [
        {
          code: "5.1",
          title: "General",
          level: 1,
          orderNo: 1,
          description:
            "The organization should establish, implement, evaluate, and continually improve the risk management framework. The framework should integrate risk management into all organizational activities and ensure that the information from the risk management process is adequately reported and used as a basis for decision-making.",
          keyQuestions: [
            "Is there a clear plan for establishing, implementing, and evaluating the risk management framework?",
            "Does the framework ensure risk information feeds into decision-making at all levels?",
            "Are roles, responsibilities, and accountabilities for risk management clearly defined?",
          ],
          evidenceExamples: [
            "Risk management framework implementation plan",
            "RACI matrix for risk management activities",
            "Evidence of risk information being used in executive decision-making",
          ],
          implementationGuidance:
            "Develop a comprehensive framework implementation plan with clear milestones. Define roles and responsibilities using a RACI matrix. Ensure the framework establishes clear information flows so that risk data informs decisions at all levels of the organization.",
        },
        {
          code: "5.2",
          title: "Leadership and commitment",
          level: 1,
          orderNo: 2,
          description:
            "Top management and oversight bodies should demonstrate leadership and commitment to risk management by ensuring it is integrated into all organizational activities. Leadership should define and endorse the risk management policy, ensure adequate resources are allocated, and assign authority, responsibility, and accountability.",
          keyQuestions: [
            "Has top management formally endorsed the risk management policy and demonstrated visible commitment?",
            "Are adequate resources (people, budget, tools) allocated to risk management activities?",
            "Does leadership actively participate in setting risk appetite and reviewing key risks?",
          ],
          evidenceExamples: [
            "Signed risk management policy endorsed by the board or top management",
            "Budget allocation records for risk management resources",
            "Minutes from board or executive meetings showing active discussion of risk",
          ],
          implementationGuidance:
            "Secure visible and sustained commitment from top management. Ensure leadership sets the tone for risk management through policy endorsement, resource allocation, and active participation. Leadership should communicate the importance of risk management and hold managers accountable for risk management within their areas.",
        },
        {
          code: "5.3",
          title: "Integration",
          level: 1,
          orderNo: 3,
          description:
            "Integrating risk management into an organization is a dynamic and iterative process. Risk management should be embedded into the organization's structure, operations, and processes. It requires understanding the organizational structures and context.",
          keyQuestions: [
            "Is risk management embedded into the organization's governance structure and operational processes?",
            "Are risk management responsibilities clearly assigned within existing management structures?",
            "Is there evidence that risk considerations influence strategic and operational decisions?",
          ],
          evidenceExamples: [
            "Governance documents showing risk management integration",
            "Job descriptions that include risk management responsibilities",
            "Decision papers or business cases that incorporate risk analysis",
          ],
          implementationGuidance:
            "Map the organization's existing governance and operational structures and identify integration points for risk management. Embed risk considerations into existing processes rather than creating separate ones. Assign risk management responsibilities within existing roles and ensure accountability through performance management.",
        },
        {
          code: "5.4",
          title: "Design",
          level: 1,
          orderNo: 4,
          description:
            "When designing the framework for managing risk, the organization should examine and understand its external and internal context, articulate its risk management commitment through a policy, assign organizational roles and responsibilities, allocate resources, and establish communication and consultation mechanisms.",
          keyQuestions: [
            "Has the organization documented its internal and external context for risk management purposes?",
            "Is there a formal risk management policy that articulates the organization's commitment?",
            "Are communication and reporting channels for risk information clearly established?",
          ],
          evidenceExamples: [
            "Internal and external context analysis documentation",
            "Formal risk management policy document",
            "Risk communication and reporting framework or procedures",
          ],
          implementationGuidance:
            "Conduct a thorough analysis of external factors (regulatory, economic, social, technological) and internal factors (governance, culture, capabilities, information systems). Use this analysis to design a framework that addresses the organization's specific needs, including a clear policy, defined roles, allocated resources, and established communication channels.",
        },
        {
          code: "5.5",
          title: "Implementation",
          level: 1,
          orderNo: 5,
          description:
            "The organization should implement the risk management framework by developing an appropriate plan including timelines and resources, identifying where, when, and how decisions are made, modifying applicable decision-making processes, and ensuring that arrangements for managing risk are clearly understood and practiced.",
          keyQuestions: [
            "Is there a documented implementation plan with clear timelines, milestones, and resource requirements?",
            "Have decision-making processes been modified to incorporate risk management?",
            "Are training and awareness programs in place to ensure practitioners understand their responsibilities?",
          ],
          evidenceExamples: [
            "Risk management framework implementation plan and progress reports",
            "Training and awareness program records",
            "Modified decision-making process documentation",
          ],
          implementationGuidance:
            "Develop a phased implementation plan with realistic timelines and resource commitments. Prioritize high-impact areas for early implementation. Provide training and support to ensure that all relevant personnel understand the framework and their responsibilities. Monitor implementation progress and address barriers promptly.",
        },
        {
          code: "5.6",
          title: "Evaluation",
          level: 1,
          orderNo: 6,
          description:
            "In order to evaluate the effectiveness of the risk management framework, the organization should periodically measure its performance against its purpose, implementation plans, indicators, and expected behavior. It should determine whether the framework remains suitable to support achieving the organization's objectives.",
          keyQuestions: [
            "Does the organization periodically evaluate the effectiveness of its risk management framework?",
            "Are performance indicators defined and measured for risk management activities?",
            "Is there a process for identifying gaps and areas for improvement in the framework?",
          ],
          evidenceExamples: [
            "Risk management framework effectiveness review reports",
            "Key performance indicators for risk management activities",
            "Gap analysis and improvement recommendation documents",
          ],
          implementationGuidance:
            "Define key performance indicators for the risk management framework, such as coverage of risk assessments, timeliness of risk reporting, and quality of risk treatment plans. Conduct periodic evaluations using self-assessments, internal audits, or external reviews. Compare actual performance against planned objectives and identify areas for improvement.",
        },
        {
          code: "5.7",
          title: "Improvement",
          level: 1,
          orderNo: 7,
          description:
            "The organization should continually improve the suitability, adequacy, and effectiveness of the risk management framework and the way the risk management process is integrated. When relevant gaps or improvement opportunities are identified, the organization should develop plans and tasks and assign them to those accountable for implementation.",
          keyQuestions: [
            "Are identified improvement opportunities translated into actionable plans with assigned responsibilities?",
            "Does the organization track and follow up on the implementation of improvement actions?",
            "Is there a feedback loop to ensure improvements are embedded and sustained?",
          ],
          evidenceExamples: [
            "Improvement action plans with owners and target dates",
            "Tracking records for improvement actions and their status",
            "Evidence of framework updates resulting from improvement initiatives",
          ],
          implementationGuidance:
            "Establish a formal process for capturing and prioritizing improvement opportunities. Assign ownership and timelines for each improvement action. Track progress and verify that improvements have been effectively implemented. Ensure that the improvement cycle is continuous and that lessons learned feed back into framework design.",
        },
      ],
    },

    // ── Clause 6: Process ──
    {
      code: "6",
      title: "Process",
      level: 0,
      orderNo: 3,
      description:
        "The risk management process involves the systematic application of policies, procedures, and practices to the activities of communicating and consulting, establishing the context, and assessing, treating, monitoring, reviewing, recording, and reporting risk.",
      keyQuestions: [
        "Has the organization established a systematic risk management process aligned with ISO 31000?",
        "Is the risk management process applied consistently across all relevant activities and functions?",
      ],
      evidenceExamples: [
        "Documented risk management process or procedure",
        "Process flow diagrams for risk management activities",
        "Evidence of process application across different business units",
      ],
      implementationGuidance:
        "Establish a clearly documented risk management process that covers all stages from communication through to recording and reporting. Ensure the process is iterative and dynamic, allowing for feedback and continuous improvement. Apply the process proportionately based on the significance of decisions and activities.",
      children: [
        {
          code: "6.1",
          title: "General",
          level: 1,
          orderNo: 1,
          description:
            "The risk management process should be an integral part of management and decision-making and integrated into the structure, operations, and processes of the organization. It can be applied at strategic, operational, programme, or project levels.",
          keyQuestions: [
            "Is the risk management process applied at all relevant levels including strategic, operational, and project?",
            "Does the process follow the iterative cycle of communication, assessment, treatment, monitoring, and reporting?",
            "Are the interdependencies between the process steps clearly understood and managed?",
          ],
          evidenceExamples: [
            "Process documentation showing application at multiple organizational levels",
            "Evidence of iterative risk management cycles",
            "Risk management process integrated into project and programme management methodologies",
          ],
          implementationGuidance:
            "Ensure the risk management process is not a one-time activity but an ongoing, iterative cycle. Apply the process at all levels where decisions are made. Tailor the depth and rigor of the process to the significance of the decisions being supported.",
        },
        {
          code: "6.2",
          title: "Communication and consultation",
          level: 1,
          orderNo: 2,
          description:
            "Communication and consultation with appropriate external and internal stakeholders should take place within and throughout all steps of the risk management process. They aim to bring different areas of expertise together, ensure different views are considered, provide sufficient information for oversight and decision-making, and build a sense of inclusiveness and ownership.",
          keyQuestions: [
            "Are communication and consultation activities planned and conducted throughout the risk management process?",
            "Do stakeholders receive timely and relevant information about risks and risk management activities?",
            "Are diverse perspectives and expertise actively sought and considered?",
          ],
          evidenceExamples: [
            "Stakeholder communication plan for risk management",
            "Risk reporting dashboards and distribution lists",
            "Records of risk workshops and consultation sessions with diverse participants",
          ],
          implementationGuidance:
            "Develop a communication and consultation plan that identifies stakeholders, their information needs, and the appropriate communication methods and frequency. Ensure two-way communication so that stakeholders can both receive and provide risk information. Use appropriate formats and language for different audiences.",
        },
        {
          code: "6.3",
          title: "Scope, context and criteria",
          level: 1,
          orderNo: 3,
          description:
            "The organization should define the scope of its risk management activities, understand the external and internal context, and define risk criteria. The scope should be clearly defined, and the risk criteria should be aligned with the risk management framework and customized for the specific purpose and activity.",
          keyQuestions: [
            "Is the scope of each risk management activity clearly defined and documented?",
            "Has the organization analyzed its external and internal context to inform risk criteria?",
            "Are risk criteria (including risk appetite and tolerance levels) defined and approved by appropriate authority?",
          ],
          evidenceExamples: [
            "Scoping documentation for risk management activities",
            "Context analysis (PESTLE, SWOT, or equivalent) for risk management",
            "Documented risk criteria including likelihood and impact scales, risk appetite, and tolerance thresholds",
          ],
          implementationGuidance:
            "Before conducting risk assessments, clearly define the scope including objectives, boundaries, and timeframes. Analyze the external context (regulatory, market, social, environmental) and internal context (governance, culture, capabilities, processes). Define risk criteria that reflect stakeholder expectations and organizational objectives, including scales for likelihood and consequence, and thresholds for risk acceptance.",
        },
        {
          code: "6.4",
          title: "Risk assessment",
          level: 1,
          orderNo: 4,
          description:
            "Risk assessment is the overall process of risk identification, risk analysis, and risk evaluation. It should be conducted systematically, iteratively, and collaboratively, drawing on the knowledge and views of stakeholders and using the best available information supplemented by further enquiry as necessary.",
          keyQuestions: [
            "Does the organization conduct comprehensive risk assessments covering identification, analysis, and evaluation?",
            "Are risk assessments performed by appropriately skilled personnel with adequate stakeholder input?",
            "Are risk assessment results documented, communicated, and used to inform decision-making?",
          ],
          evidenceExamples: [
            "Completed risk assessment reports",
            "Risk registers with identified, analyzed, and evaluated risks",
            "Evidence of risk assessment results informing treatment decisions",
          ],
          implementationGuidance:
            "Conduct risk assessments using a structured approach that covers all three sub-processes: identification, analysis, and evaluation. Ensure assessments are collaborative, drawing on diverse expertise and stakeholder perspectives. Document results clearly and ensure they are communicated to decision-makers.",
          children: [
            {
              code: "6.4.1",
              title: "General",
              level: 2,
              orderNo: 1,
              description:
                "Risk assessment is the overall process of risk identification, risk analysis, and risk evaluation. It provides an evidence-based understanding of risks to support informed decision-making and the selection of appropriate risk treatment options.",
              keyQuestions: [
                "Is the risk assessment process clearly defined and consistently applied?",
                "Does the assessment process produce an evidence-based understanding of the organization's risk profile?",
                "Are assessment outcomes linked to decision-making and treatment planning?",
              ],
              evidenceExamples: [
                "Risk assessment methodology documentation",
                "Completed risk assessments with clear links to treatment decisions",
                "Quality assurance or peer review records for risk assessments",
              ],
              implementationGuidance:
                "Establish a clear risk assessment methodology that defines how the three sub-processes (identification, analysis, evaluation) are conducted. Ensure the methodology produces actionable outputs that inform treatment decisions and are presented in a format suitable for decision-makers.",
            },
            {
              code: "6.4.2",
              title: "Risk identification",
              level: 2,
              orderNo: 2,
              description:
                "The purpose of risk identification is to find, recognize, and describe risks. Risk identification involves the identification of sources of risk, events, their causes, and their potential consequences. It should involve the consideration of historical data, theoretical analysis, informed opinions, expert judgment, and stakeholder needs.",
              keyQuestions: [
                "Does the organization use a systematic approach to identify risks, including sources, events, causes, and consequences?",
                "Are multiple techniques and information sources used for risk identification?",
                "Are risks identified across all relevant categories including strategic, operational, financial, and compliance?",
              ],
              evidenceExamples: [
                "Risk identification workshop records and outputs",
                "Risk register entries with clearly described sources, events, causes, and consequences",
                "Use of multiple techniques such as brainstorming, checklists, scenario analysis, and incident review",
              ],
              implementationGuidance:
                "Use a combination of techniques for risk identification such as brainstorming, interviews, checklists, historical analysis, SWOT analysis, and scenario planning. Ensure risks are described clearly including the source, event, cause, and potential consequence. Consider risks from multiple perspectives including strategic, operational, financial, compliance, and reputational.",
            },
            {
              code: "6.4.3",
              title: "Risk analysis",
              level: 2,
              orderNo: 3,
              description:
                "The purpose of risk analysis is to comprehend the nature of risk and its characteristics including, where appropriate, the level of risk. Risk analysis involves a detailed consideration of uncertainties, risk sources, consequences, likelihood, events, scenarios, controls, and their effectiveness.",
              keyQuestions: [
                "Does the organization analyze risks by assessing their likelihood, consequences, and the effectiveness of existing controls?",
                "Are both qualitative and quantitative methods used as appropriate?",
                "Is the analysis of control effectiveness incorporated into the risk level determination?",
              ],
              evidenceExamples: [
                "Risk analysis records showing likelihood and impact assessments",
                "Control effectiveness assessments linked to risk analysis",
                "Use of quantitative methods such as Monte Carlo simulation or fault tree analysis where appropriate",
              ],
              implementationGuidance:
                "Analyze each identified risk by evaluating its likelihood, potential consequences, and the effectiveness of existing controls. Use qualitative methods (e.g., risk matrices) for initial screening and quantitative methods where sufficient data exists and the risk significance warrants it. Document assumptions and consider the interplay between multiple risks.",
            },
            {
              code: "6.4.4",
              title: "Risk evaluation",
              level: 2,
              orderNo: 4,
              description:
                "The purpose of risk evaluation is to support decisions. Risk evaluation involves comparing the results of the risk analysis with the established risk criteria to determine where additional action is required. This can lead to a decision to do nothing further, consider risk treatment options, undertake further analysis, maintain existing controls, or reconsider objectives.",
              keyQuestions: [
                "Are analyzed risks compared against established risk criteria to determine their significance?",
                "Does the evaluation process clearly determine which risks require treatment and their priority?",
                "Are evaluation results communicated to decision-makers in a clear and actionable format?",
              ],
              evidenceExamples: [
                "Risk evaluation matrices or heat maps showing risk levels against criteria",
                "Prioritized risk lists with treatment decisions",
                "Risk reports to management or board showing evaluated risks and recommended actions",
              ],
              implementationGuidance:
                "Compare analyzed risk levels against the established risk criteria to determine significance. Prioritize risks based on the evaluation to focus resources on the most significant risks. Present evaluation results clearly using visual tools such as heat maps or ranked lists. Ensure the evaluation leads to clear decisions about which risks require treatment.",
            },
          ],
        },
        {
          code: "6.5",
          title: "Risk treatment",
          level: 1,
          orderNo: 5,
          description:
            "The purpose of risk treatment is to select and implement options for addressing risk. Risk treatment involves an iterative process of formulating and selecting treatment options, planning and implementing treatment, assessing the effectiveness of treatment, deciding whether the remaining risk is acceptable, and taking further treatment if not acceptable.",
          keyQuestions: [
            "Does the organization select and implement appropriate risk treatment options based on evaluation results?",
            "Are risk treatment plans documented with clear owners, timelines, and resources?",
            "Is the effectiveness of risk treatments monitored and residual risk assessed?",
          ],
          evidenceExamples: [
            "Risk treatment plans with assigned owners and target dates",
            "Records of treatment option analysis and selection rationale",
            "Post-implementation reviews of risk treatment effectiveness",
          ],
          implementationGuidance:
            "Select risk treatment options considering the balance of costs and benefits, stakeholder expectations, and the organization's risk criteria. Options include avoiding, reducing, sharing, or retaining risk. Develop treatment plans with clear ownership, timelines, and resource requirements. Monitor implementation and assess whether treatments achieve the desired risk reduction.",
        },
        {
          code: "6.6",
          title: "Monitoring and review",
          level: 1,
          orderNo: 6,
          description:
            "The purpose of monitoring and review is to assure and improve the quality and effectiveness of process design, implementation, and outcomes. Ongoing monitoring and periodic review should be a planned part of the risk management process with clearly defined responsibilities. Monitoring and review should take place in all stages of the process.",
          keyQuestions: [
            "Are monitoring and review activities planned and conducted at all stages of the risk management process?",
            "Are key risk indicators defined and regularly reported?",
            "Do monitoring activities trigger timely updates to risk assessments and treatment plans when changes are detected?",
          ],
          evidenceExamples: [
            "Key risk indicator dashboards and trend reports",
            "Scheduled risk review meeting agendas and minutes",
            "Evidence of risk register updates triggered by monitoring findings",
          ],
          implementationGuidance:
            "Establish a monitoring and review program that covers all stages of the risk management process. Define key risk indicators with thresholds and escalation triggers. Schedule regular risk reviews at appropriate frequencies for different risk levels. Ensure monitoring results trigger timely updates to risk assessments and treatment plans.",
        },
        {
          code: "6.7",
          title: "Recording and reporting",
          level: 1,
          orderNo: 7,
          description:
            "The risk management process and its outcomes should be documented and reported through appropriate mechanisms. Recording and reporting aims to communicate risk management activities and outcomes across the organization, provide information for decision-making, improve risk management activities, and assist interaction with stakeholders.",
          keyQuestions: [
            "Are risk management activities and outcomes systematically recorded and documented?",
            "Is risk information reported to appropriate stakeholders at the right frequency and level of detail?",
            "Do reporting mechanisms support effective decision-making and accountability?",
          ],
          evidenceExamples: [
            "Risk registers and risk management activity logs",
            "Periodic risk reports to management and the board",
            "Documented risk management decisions and their rationale",
          ],
          implementationGuidance:
            "Establish clear requirements for recording and reporting risk management activities and outcomes. Maintain comprehensive risk registers that document risk assessments, treatment plans, and monitoring results. Design reporting formats that meet the needs of different audiences, from operational teams to the board. Ensure reports are timely, accurate, and support informed decision-making.",
        },
      ],
    },
  ],
};
