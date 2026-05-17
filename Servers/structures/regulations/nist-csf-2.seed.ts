import { RegulationSeed } from "./types";

export const NIST_CSF_2_SEED: RegulationSeed = {
  code: "NIST_CSF_2",
  name: "NIST Cybersecurity Framework 2.0",
  type: "framework",
  category: "information_security",
  jurisdiction: "US",
  issuer: "NIST",
  version: "2.0",
  description:
    "A voluntary framework for managing and reducing cybersecurity risk, organized around six core functions.",
  effectiveDate: "2024-02-26",
  requirements: [
    // =========================================================================
    // GOVERN (GV)
    // =========================================================================
    {
      code: "GV",
      title: "Govern",
      level: 0,
      orderNo: 1,
      description:
        "The organization's cybersecurity risk management strategy, expectations, and policy are established, communicated, and monitored. The GOVERN Function provides outcomes to inform what an organization may do to achieve and prioritize the outcomes of the other five Functions in the context of its mission and stakeholder expectations.",
      keyQuestions: [
        "How does the organization establish and communicate its cybersecurity risk management strategy?",
        "Are roles, responsibilities, and authorities for cybersecurity clearly defined?",
        "How does the organization oversee its cybersecurity risk management program?",
      ],
      evidenceExamples: [
        "Cybersecurity risk management strategy documentation",
        "Organizational charts showing cybersecurity roles and responsibilities",
        "Board-level cybersecurity oversight meeting minutes",
      ],
      children: [
        // GV.OC - Organizational Context
        {
          code: "GV.OC",
          title: "Organizational Context",
          level: 1,
          orderNo: 1,
          description:
            "The circumstances — mission, stakeholder expectations, dependencies, and legal, regulatory, and contractual requirements — surrounding the organization's cybersecurity risk management decisions are understood.",
          keyQuestions: [
            "Has the organization documented its mission and how cybersecurity supports it?",
            "Are stakeholder expectations regarding cybersecurity identified and documented?",
            "Are legal, regulatory, and contractual cybersecurity requirements inventoried?",
          ],
          evidenceExamples: [
            "Mission statement with cybersecurity alignment documentation",
            "Stakeholder expectations register",
            "Legal and regulatory requirements inventory",
          ],
          children: [
            {
              code: "GV.OC-01",
              title:
                "The organizational mission is understood and informs cybersecurity risk management",
              level: 2,
              orderNo: 1,
              description:
                "The organizational mission is understood and informs cybersecurity risk management decisions. The mission provides context for determining acceptable levels of cybersecurity risk.",
              keyQuestions: [
                "How does the organizational mission inform cybersecurity risk tolerance?",
                "Is the relationship between business objectives and cybersecurity documented?",
                "Do cybersecurity priorities align with the organization's strategic goals?",
              ],
              evidenceExamples: [
                "Strategic plan with cybersecurity risk alignment",
                "Mission-to-cybersecurity mapping documentation",
                "Risk appetite statements tied to business objectives",
              ],
            },
            {
              code: "GV.OC-02",
              title:
                "Internal and external stakeholders are understood, and their needs and expectations regarding cybersecurity risk management are understood and considered",
              level: 2,
              orderNo: 2,
              description:
                "Internal and external stakeholders are identified, and their needs and expectations regarding cybersecurity risk management are understood and considered in the organization's cybersecurity risk management strategy.",
              keyQuestions: [
                "Has the organization identified all internal and external cybersecurity stakeholders?",
                "Are stakeholder cybersecurity expectations documented and periodically reviewed?",
                "How are stakeholder needs factored into cybersecurity decisions?",
              ],
              evidenceExamples: [
                "Stakeholder register with cybersecurity expectations",
                "Stakeholder communication plans",
                "Records of stakeholder consultation on cybersecurity matters",
              ],
            },
            {
              code: "GV.OC-03",
              title:
                "Legal, regulatory, and contractual requirements regarding cybersecurity — including privacy and civil liberties obligations — are understood and managed",
              level: 2,
              orderNo: 3,
              description:
                "Legal, regulatory, and contractual requirements regarding cybersecurity — including privacy and civil liberties obligations — are understood and managed to ensure compliance and reduce legal risk.",
              keyQuestions: [
                "Does the organization maintain a current inventory of applicable cybersecurity laws and regulations?",
                "How are contractual cybersecurity obligations tracked and fulfilled?",
                "Are privacy and civil liberties requirements integrated into cybersecurity practices?",
              ],
              evidenceExamples: [
                "Compliance obligations register",
                "Contract review procedures for cybersecurity requirements",
                "Privacy impact assessments",
              ],
            },
            {
              code: "GV.OC-04",
              title:
                "Critical objectives, capabilities, and services that external stakeholders depend on or expect from the organization are understood and communicated",
              level: 2,
              orderNo: 4,
              description:
                "Critical objectives, capabilities, and services that external stakeholders depend on or expect from the organization are understood and communicated to inform cybersecurity risk management priorities.",
              keyQuestions: [
                "Has the organization identified the services that external stakeholders depend on?",
                "Are critical capabilities and their cybersecurity requirements documented?",
                "How are service-level cybersecurity expectations communicated to stakeholders?",
              ],
              evidenceExamples: [
                "Critical services inventory with dependency mapping",
                "Service-level agreements with cybersecurity provisions",
                "External communication plans for cybersecurity matters",
              ],
            },
            {
              code: "GV.OC-05",
              title:
                "Outcomes, capabilities, and services that the organization depends on are understood and communicated",
              level: 2,
              orderNo: 5,
              description:
                "Outcomes, capabilities, and services that the organization depends on — including those provided by third parties — are understood and communicated to inform cybersecurity risk management.",
              keyQuestions: [
                "Has the organization identified critical dependencies on external services?",
                "Are dependencies on third-party capabilities documented with risk assessments?",
                "How are changes in dependencies communicated across the organization?",
              ],
              evidenceExamples: [
                "Dependency mapping documentation",
                "Third-party service risk assessments",
                "Business impact analyses for critical dependencies",
              ],
            },
          ],
        },
        // GV.RM - Risk Management Strategy
        {
          code: "GV.RM",
          title: "Risk Management Strategy",
          level: 1,
          orderNo: 2,
          description:
            "The organization's priorities, constraints, risk tolerance and appetite statements, and assumptions are established, communicated, and used to support operational risk decisions.",
          keyQuestions: [
            "Has the organization defined its cybersecurity risk appetite and tolerance?",
            "Is the risk management strategy communicated across the organization?",
            "Are risk management priorities reviewed and updated regularly?",
          ],
          evidenceExamples: [
            "Risk management strategy document",
            "Risk appetite and tolerance statements",
            "Risk management communication records",
          ],
          children: [
            {
              code: "GV.RM-01",
              title:
                "Risk management objectives are established and agreed to by organizational stakeholders",
              level: 2,
              orderNo: 1,
              description:
                "Risk management objectives are established and agreed to by organizational stakeholders. These objectives guide cybersecurity risk management decisions and activities across the organization.",
              keyQuestions: [
                "Are risk management objectives formally documented and approved by leadership?",
                "Do stakeholders across the organization agree on risk management priorities?",
                "How often are risk management objectives reviewed and updated?",
              ],
              evidenceExamples: [
                "Approved risk management objectives document",
                "Stakeholder sign-off records for risk strategy",
                "Risk management objective review meeting minutes",
              ],
            },
            {
              code: "GV.RM-02",
              title:
                "Risk appetite and risk tolerance statements are established, communicated, and maintained",
              level: 2,
              orderNo: 2,
              description:
                "Risk appetite and risk tolerance statements are established, communicated, and maintained. These statements inform how much cybersecurity risk the organization is willing to accept.",
              keyQuestions: [
                "Are risk appetite and tolerance statements clearly defined and documented?",
                "How are risk tolerance levels communicated to decision-makers?",
                "Are risk appetite statements reviewed when business conditions change?",
              ],
              evidenceExamples: [
                "Risk appetite statement approved by senior leadership",
                "Risk tolerance thresholds by business unit or asset type",
                "Communication records of risk tolerance guidance",
              ],
            },
            {
              code: "GV.RM-03",
              title:
                "Cybersecurity risk management activities and outcomes are included in enterprise risk management processes",
              level: 2,
              orderNo: 3,
              description:
                "Cybersecurity risk management activities and outcomes are included in enterprise risk management processes to ensure alignment between cybersecurity and broader organizational risk management.",
              keyQuestions: [
                "Is cybersecurity risk integrated into the enterprise risk management framework?",
                "Are cybersecurity risk outcomes reported alongside other enterprise risks?",
                "How does the organization ensure cybersecurity risk is considered in business decisions?",
              ],
              evidenceExamples: [
                "Enterprise risk register including cybersecurity risks",
                "Integrated risk management framework documentation",
                "Risk committee meeting minutes showing cybersecurity integration",
              ],
            },
            {
              code: "GV.RM-04",
              title:
                "Strategic direction that describes appropriate risk response options is established and communicated",
              level: 2,
              orderNo: 4,
              description:
                "Strategic direction that describes appropriate risk response options — such as accept, avoid, transfer, or mitigate — is established and communicated throughout the organization.",
              keyQuestions: [
                "Are risk response options (accept, avoid, transfer, mitigate) clearly defined?",
                "Is guidance on selecting risk response options documented and accessible?",
                "How is risk response direction communicated to relevant personnel?",
              ],
              evidenceExamples: [
                "Risk response strategy guidelines",
                "Decision framework for risk treatment options",
                "Risk response communication and training materials",
              ],
            },
            {
              code: "GV.RM-05",
              title:
                "Lines of communication across the organization are established for cybersecurity risks, including risks from suppliers and other third parties",
              level: 2,
              orderNo: 5,
              description:
                "Lines of communication across the organization are established for cybersecurity risks, including risks from suppliers and other third parties, to ensure timely sharing of risk information.",
              keyQuestions: [
                "Are communication channels for cybersecurity risk information clearly defined?",
                "How is third-party risk information shared across the organization?",
                "Are escalation paths for cybersecurity risk issues established?",
              ],
              evidenceExamples: [
                "Risk communication plan with defined channels and frequency",
                "Escalation procedures for cybersecurity risk issues",
                "Third-party risk communication protocols",
              ],
            },
            {
              code: "GV.RM-06",
              title:
                "A standardized method for calculating, documenting, categorizing, and prioritizing cybersecurity risks is established and communicated",
              level: 2,
              orderNo: 6,
              description:
                "A standardized method for calculating, documenting, categorizing, and prioritizing cybersecurity risks is established and communicated to ensure consistent risk assessment across the organization.",
              keyQuestions: [
                "Does the organization use a standardized risk assessment methodology?",
                "Is the risk categorization and prioritization approach documented?",
                "How is the risk methodology communicated and consistently applied?",
              ],
              evidenceExamples: [
                "Risk assessment methodology documentation",
                "Risk scoring and categorization criteria",
                "Training materials for risk assessment methodology",
              ],
            },
            {
              code: "GV.RM-07",
              title:
                "Strategic opportunities (i.e., positive risks) are characterized and are included in organizational cybersecurity risk discussions",
              level: 2,
              orderNo: 7,
              description:
                "Strategic opportunities (i.e., positive risks) are characterized and included in organizational cybersecurity risk discussions to ensure that potential benefits are considered alongside threats.",
              keyQuestions: [
                "Does the organization identify positive risks (opportunities) in cybersecurity?",
                "How are cybersecurity opportunities evaluated and pursued?",
                "Are strategic opportunities discussed alongside threats in risk meetings?",
              ],
              evidenceExamples: [
                "Opportunity register for cybersecurity initiatives",
                "Risk meeting agendas and minutes showing opportunity discussions",
                "Business case documentation for cybersecurity investments",
              ],
            },
          ],
        },
        // GV.RR - Roles, Responsibilities, and Authorities
        {
          code: "GV.RR",
          title: "Roles, Responsibilities, and Authorities",
          level: 1,
          orderNo: 3,
          description:
            "Cybersecurity roles, responsibilities, and authorities to foster accountability, performance assessment, and continuous improvement are established and communicated.",
          keyQuestions: [
            "Are cybersecurity roles and responsibilities clearly defined at all levels?",
            "Is accountability for cybersecurity outcomes established?",
            "How are cybersecurity authorities delegated and communicated?",
          ],
          evidenceExamples: [
            "RACI matrix for cybersecurity functions",
            "Job descriptions with cybersecurity responsibilities",
            "Delegation of authority documentation",
          ],
          children: [
            {
              code: "GV.RR-01",
              title:
                "Organizational leadership is responsible and accountable for cybersecurity risk and fosters a culture that is risk-aware, ethical, and continually improving",
              level: 2,
              orderNo: 1,
              description:
                "Organizational leadership is responsible and accountable for cybersecurity risk and fosters a culture that is risk-aware, ethical, and continually improving. Leadership sets the tone for cybersecurity governance.",
              keyQuestions: [
                "Does senior leadership demonstrate accountability for cybersecurity risk?",
                "How does leadership foster a risk-aware organizational culture?",
                "Are leadership expectations for cybersecurity ethics clearly communicated?",
              ],
              evidenceExamples: [
                "Board or executive committee cybersecurity governance charter",
                "Leadership communications on cybersecurity culture",
                "Annual cybersecurity leadership accountability reports",
              ],
            },
            {
              code: "GV.RR-02",
              title:
                "Roles, responsibilities, and authorities related to cybersecurity risk management are established, communicated, understood, and enforced",
              level: 2,
              orderNo: 2,
              description:
                "Roles, responsibilities, and authorities related to cybersecurity risk management are established, communicated, understood, and enforced across the organization.",
              keyQuestions: [
                "Are cybersecurity roles and responsibilities documented and communicated?",
                "Do personnel understand their cybersecurity responsibilities?",
                "How are cybersecurity authorities enforced across the organization?",
              ],
              evidenceExamples: [
                "Cybersecurity RACI matrix",
                "Role-specific cybersecurity responsibility documentation",
                "Training records demonstrating understanding of responsibilities",
              ],
            },
            {
              code: "GV.RR-03",
              title:
                "Adequate resources are allocated commensurate with the cybersecurity risk strategy, roles, responsibilities, and policies",
              level: 2,
              orderNo: 3,
              description:
                "Adequate resources — including personnel, funding, and tools — are allocated commensurate with the cybersecurity risk strategy, roles, responsibilities, and policies.",
              keyQuestions: [
                "Are cybersecurity budgets adequate for the organization's risk profile?",
                "Does the organization have sufficient cybersecurity personnel?",
                "How are resource allocation decisions linked to cybersecurity risk assessments?",
              ],
              evidenceExamples: [
                "Cybersecurity budget documentation and approval records",
                "Staffing plans for cybersecurity functions",
                "Resource allocation justification tied to risk assessments",
              ],
            },
            {
              code: "GV.RR-04",
              title:
                "Cybersecurity is included in human resources practices",
              level: 2,
              orderNo: 4,
              description:
                "Cybersecurity is included in human resources practices, such as position descriptions, candidate vetting, onboarding, training, and personnel transitions.",
              keyQuestions: [
                "Do job descriptions include relevant cybersecurity responsibilities?",
                "Are cybersecurity considerations included in hiring and vetting processes?",
                "How are cybersecurity requirements addressed during employee onboarding and offboarding?",
              ],
              evidenceExamples: [
                "Job descriptions with cybersecurity responsibilities",
                "Background check and vetting procedures for cybersecurity roles",
                "Onboarding and offboarding checklists with cybersecurity steps",
              ],
            },
          ],
        },
        // GV.PO - Policy
        {
          code: "GV.PO",
          title: "Policy",
          level: 1,
          orderNo: 4,
          description:
            "Organizational cybersecurity policy is established, communicated, and enforced. Policy provides the foundation for consistent and effective cybersecurity practices.",
          keyQuestions: [
            "Does the organization have a comprehensive cybersecurity policy?",
            "How are cybersecurity policies communicated to personnel?",
            "Are policies reviewed and updated on a regular basis?",
          ],
          evidenceExamples: [
            "Cybersecurity policy document",
            "Policy communication and acknowledgment records",
            "Policy review and update history",
          ],
          children: [
            {
              code: "GV.PO-01",
              title:
                "Policy for managing cybersecurity risks is established based on organizational context, cybersecurity strategy, and priorities and is communicated and enforced",
              level: 2,
              orderNo: 1,
              description:
                "Policy for managing cybersecurity risks is established based on organizational context, cybersecurity strategy, and priorities and is communicated and enforced across the organization.",
              keyQuestions: [
                "Is the cybersecurity policy aligned with the organization's risk strategy?",
                "How is the cybersecurity policy communicated to all relevant personnel?",
                "What mechanisms are in place to enforce cybersecurity policy compliance?",
              ],
              evidenceExamples: [
                "Cybersecurity risk management policy document",
                "Policy distribution and acknowledgment records",
                "Policy compliance monitoring reports",
              ],
            },
            {
              code: "GV.PO-02",
              title:
                "Policy for managing cybersecurity risks is reviewed, updated, communicated, and enforced to reflect changes in requirements, threats, technology, and organizational mission",
              level: 2,
              orderNo: 2,
              description:
                "Policy for managing cybersecurity risks is reviewed, updated, communicated, and enforced to reflect changes in requirements, threats, technology, and organizational mission.",
              keyQuestions: [
                "How frequently are cybersecurity policies reviewed and updated?",
                "Are policy updates triggered by changes in threats or requirements?",
                "How are policy changes communicated to affected personnel?",
              ],
              evidenceExamples: [
                "Policy review schedule and history",
                "Change management records for policy updates",
                "Communication records of policy revisions",
              ],
            },
          ],
        },
        // GV.OV - Oversight
        {
          code: "GV.OV",
          title: "Oversight",
          level: 1,
          orderNo: 5,
          description:
            "Results of organization-wide cybersecurity risk management activities and performance are used to inform, improve, and adjust the risk management strategy.",
          keyQuestions: [
            "How does the organization monitor cybersecurity risk management performance?",
            "Are oversight findings used to improve the risk management strategy?",
            "Is there regular reporting on cybersecurity risk management to leadership?",
          ],
          evidenceExamples: [
            "Cybersecurity performance dashboards and reports",
            "Risk management strategy adjustment records",
            "Leadership briefing materials on cybersecurity performance",
          ],
          children: [
            {
              code: "GV.OV-01",
              title:
                "Cybersecurity risk management strategy outcomes are reviewed to inform and adjust strategy and direction",
              level: 2,
              orderNo: 1,
              description:
                "Cybersecurity risk management strategy outcomes are reviewed to inform and adjust strategy and direction. This ensures the organization continuously improves its cybersecurity posture.",
              keyQuestions: [
                "Are cybersecurity risk management outcomes regularly reviewed by leadership?",
                "How are review findings used to adjust the cybersecurity strategy?",
                "Is there a feedback loop between operational outcomes and strategic planning?",
              ],
              evidenceExamples: [
                "Strategy review meeting minutes and outcomes",
                "Strategic adjustment documentation based on performance data",
                "Feedback loop process documentation",
              ],
            },
            {
              code: "GV.OV-02",
              title:
                "The cybersecurity risk management strategy is reviewed and adjusted to ensure coverage of organizational requirements and risks",
              level: 2,
              orderNo: 2,
              description:
                "The cybersecurity risk management strategy is reviewed and adjusted to ensure coverage of organizational requirements and risks, including new and evolving threats.",
              keyQuestions: [
                "Is the risk management strategy periodically assessed for coverage gaps?",
                "How are emerging threats and requirements incorporated into the strategy?",
                "Are strategy adjustments documented and communicated?",
              ],
              evidenceExamples: [
                "Strategy gap analysis reports",
                "Emerging threat integration documentation",
                "Strategy revision history and communication records",
              ],
            },
            {
              code: "GV.OV-03",
              title:
                "Organizational cybersecurity risk management performance is evaluated and reviewed for adjustments needed",
              level: 2,
              orderNo: 3,
              description:
                "Organizational cybersecurity risk management performance is evaluated and reviewed for adjustments needed to ensure effectiveness and efficiency of the program.",
              keyQuestions: [
                "Are cybersecurity performance metrics defined and tracked?",
                "How is performance data used to identify improvement opportunities?",
                "Are performance evaluation results reported to relevant stakeholders?",
              ],
              evidenceExamples: [
                "Cybersecurity key performance indicators (KPIs) dashboard",
                "Performance evaluation reports with improvement recommendations",
                "Stakeholder performance reports",
              ],
            },
          ],
        },
        // GV.SC - Cybersecurity Supply Chain Risk Management
        {
          code: "GV.SC",
          title: "Cybersecurity Supply Chain Risk Management",
          level: 1,
          orderNo: 6,
          description:
            "Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders.",
          keyQuestions: [
            "Does the organization have a supply chain risk management program?",
            "How are supplier cybersecurity risks identified and managed?",
            "Are supply chain risk management practices integrated into procurement?",
          ],
          evidenceExamples: [
            "Supply chain risk management policy and procedures",
            "Supplier cybersecurity assessment records",
            "Procurement cybersecurity requirements documentation",
          ],
          children: [
            {
              code: "GV.SC-01",
              title:
                "A cybersecurity supply chain risk management program, strategy, objectives, policies, and processes are established and agreed to by organizational stakeholders",
              level: 2,
              orderNo: 1,
              description:
                "A cybersecurity supply chain risk management program, strategy, objectives, policies, and processes are established and agreed to by organizational stakeholders.",
              keyQuestions: [
                "Does the organization have a formal supply chain risk management program?",
                "Are supply chain risk management objectives aligned with organizational strategy?",
                "Have stakeholders agreed to the supply chain risk management approach?",
              ],
              evidenceExamples: [
                "Supply chain risk management program charter",
                "C-SCRM strategy document approved by leadership",
                "Stakeholder agreement records for supply chain risk management",
              ],
            },
            {
              code: "GV.SC-02",
              title:
                "Cybersecurity roles and responsibilities for suppliers, customers, and partners are established, communicated, and coordinated internally and externally",
              level: 2,
              orderNo: 2,
              description:
                "Cybersecurity roles and responsibilities for suppliers, customers, and partners are established, communicated, and coordinated internally and externally to ensure effective supply chain risk management.",
              keyQuestions: [
                "Are cybersecurity roles and responsibilities defined for suppliers and partners?",
                "How are these responsibilities communicated to external parties?",
                "Is there coordination between internal and external cybersecurity responsibilities?",
              ],
              evidenceExamples: [
                "Supplier cybersecurity responsibility matrices",
                "Partner cybersecurity agreements and MOUs",
                "Communication records with suppliers on cybersecurity roles",
              ],
            },
            {
              code: "GV.SC-03",
              title:
                "Cybersecurity supply chain risk management is integrated into cybersecurity and enterprise risk management, risk assessment, and improvement processes",
              level: 2,
              orderNo: 3,
              description:
                "Cybersecurity supply chain risk management is integrated into cybersecurity and enterprise risk management, risk assessment, and improvement processes for a holistic approach to risk.",
              keyQuestions: [
                "Is supply chain risk included in enterprise risk assessments?",
                "How is supply chain risk management integrated with overall cybersecurity?",
                "Are supply chain risks considered in continuous improvement activities?",
              ],
              evidenceExamples: [
                "Enterprise risk register including supply chain risks",
                "Integrated risk assessment procedures",
                "Improvement plans addressing supply chain risk findings",
              ],
            },
            {
              code: "GV.SC-04",
              title:
                "Suppliers are known and prioritized by criticality",
              level: 2,
              orderNo: 4,
              description:
                "Suppliers are known and prioritized by criticality to ensure appropriate levels of oversight and risk management for the most important supply chain relationships.",
              keyQuestions: [
                "Does the organization maintain a complete inventory of suppliers?",
                "Are suppliers prioritized based on criticality to operations?",
                "How are criticality assessments used to determine oversight levels?",
              ],
              evidenceExamples: [
                "Supplier inventory with criticality ratings",
                "Supplier criticality assessment methodology",
                "Tiered supplier management procedures",
              ],
            },
            {
              code: "GV.SC-05",
              title:
                "Requirements to address cybersecurity risks in supply chains are established, prioritized, and integrated into contracts and other types of agreements with suppliers and other relevant third parties",
              level: 2,
              orderNo: 5,
              description:
                "Requirements to address cybersecurity risks in supply chains are established, prioritized, and integrated into contracts and other types of agreements with suppliers and other relevant third parties.",
              keyQuestions: [
                "Are cybersecurity requirements included in supplier contracts?",
                "How are supply chain cybersecurity requirements prioritized?",
                "Are contractual cybersecurity obligations monitored for compliance?",
              ],
              evidenceExamples: [
                "Standard cybersecurity contract clauses for suppliers",
                "Supplier agreement templates with security requirements",
                "Contract compliance monitoring records",
              ],
            },
            {
              code: "GV.SC-06",
              title:
                "Planning and due diligence are performed to reduce risks before entering into formal supplier or other third-party relationships",
              level: 2,
              orderNo: 6,
              description:
                "Planning and due diligence are performed to reduce risks before entering into formal supplier or other third-party relationships, including cybersecurity assessments of potential suppliers.",
              keyQuestions: [
                "Does the organization perform cybersecurity due diligence before onboarding suppliers?",
                "What assessment criteria are used to evaluate potential suppliers?",
                "Are due diligence findings documented and used in procurement decisions?",
              ],
              evidenceExamples: [
                "Supplier due diligence assessment procedures",
                "Pre-engagement cybersecurity evaluation reports",
                "Procurement decision records incorporating cybersecurity findings",
              ],
            },
            {
              code: "GV.SC-07",
              title:
                "The risks posed by a supplier, their products and services, and other third parties are understood, recorded, prioritized, assessed, responded to, and monitored over the course of the relationship",
              level: 2,
              orderNo: 7,
              description:
                "The risks posed by a supplier, their products and services, and other third parties are understood, recorded, prioritized, assessed, responded to, and monitored over the course of the relationship.",
              keyQuestions: [
                "Are supplier risks continuously monitored throughout the relationship?",
                "How are changes in supplier risk profiles identified and addressed?",
                "Are supplier risk assessments updated on a regular schedule?",
              ],
              evidenceExamples: [
                "Ongoing supplier risk assessment records",
                "Supplier risk monitoring dashboards",
                "Periodic supplier cybersecurity review reports",
              ],
            },
            {
              code: "GV.SC-08",
              title:
                "Relevant suppliers and other third parties are included in incident planning, response, and recovery activities",
              level: 2,
              orderNo: 8,
              description:
                "Relevant suppliers and other third parties are included in incident planning, response, and recovery activities to ensure coordinated and effective incident management across the supply chain.",
              keyQuestions: [
                "Are critical suppliers included in incident response planning?",
                "Does the organization conduct joint incident response exercises with suppliers?",
                "Are supplier roles in incident response clearly defined?",
              ],
              evidenceExamples: [
                "Incident response plans including supplier roles",
                "Joint incident response exercise records",
                "Supplier communication procedures for incidents",
              ],
            },
            {
              code: "GV.SC-09",
              title:
                "Supply chain security practices are integrated into cybersecurity and enterprise risk management programs, and their performance is monitored throughout the technology product and service life cycle",
              level: 2,
              orderNo: 9,
              description:
                "Supply chain security practices are integrated into cybersecurity and enterprise risk management programs, and their performance is monitored throughout the technology product and service life cycle.",
              keyQuestions: [
                "Are supply chain security practices monitored across the product life cycle?",
                "How is supply chain risk management performance measured?",
                "Are life cycle supply chain risks addressed from acquisition through disposal?",
              ],
              evidenceExamples: [
                "Life cycle supply chain risk management procedures",
                "Supply chain security performance metrics",
                "Product life cycle risk assessment documentation",
              ],
            },
            {
              code: "GV.SC-10",
              title:
                "Cybersecurity supply chain risk management plans include provisions for activities that occur after the conclusion of a partnership or service agreement",
              level: 2,
              orderNo: 10,
              description:
                "Cybersecurity supply chain risk management plans include provisions for activities that occur after the conclusion of a partnership or service agreement, such as data return, destruction, and access revocation.",
              keyQuestions: [
                "Are supplier offboarding procedures documented for cybersecurity?",
                "How is data handled when a supplier relationship ends?",
                "Are access rights revoked when supplier agreements terminate?",
              ],
              evidenceExamples: [
                "Supplier offboarding cybersecurity checklist",
                "Data return and destruction procedures",
                "Access revocation records for terminated suppliers",
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // IDENTIFY (ID)
    // =========================================================================
    {
      code: "ID",
      title: "Identify",
      level: 0,
      orderNo: 2,
      description:
        "The organization's current cybersecurity risks are understood. Understanding its assets, suppliers, and related cybersecurity risks enables an organization to prioritize its efforts consistent with its risk management strategy and the mission needs identified under GOVERN.",
      keyQuestions: [
        "Does the organization maintain a comprehensive inventory of its assets?",
        "Are cybersecurity risks identified and assessed regularly?",
        "How does the organization prioritize improvements to its cybersecurity posture?",
      ],
      evidenceExamples: [
        "Asset inventory and management documentation",
        "Risk assessment reports",
        "Improvement prioritization and roadmap documentation",
      ],
      children: [
        // ID.AM - Asset Management
        {
          code: "ID.AM",
          title: "Asset Management",
          level: 1,
          orderNo: 1,
          description:
            "Assets (e.g., data, hardware, software, systems, facilities, services, people) that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy.",
          keyQuestions: [
            "Does the organization maintain a comprehensive asset inventory?",
            "Are assets classified based on their importance to business objectives?",
            "How are asset management practices aligned with the risk strategy?",
          ],
          evidenceExamples: [
            "Hardware and software asset inventory",
            "Asset classification and criticality ratings",
            "Asset management policy and procedures",
          ],
          children: [
            {
              code: "ID.AM-01",
              title:
                "Inventories of hardware managed by the organization are maintained",
              level: 2,
              orderNo: 1,
              description:
                "Inventories of hardware managed by the organization are maintained to support cybersecurity risk management and operational needs.",
              keyQuestions: [
                "Is the hardware asset inventory complete and up to date?",
                "How are new hardware assets added to and removed from the inventory?",
                "Are hardware assets tracked throughout their life cycle?",
              ],
              evidenceExamples: [
                "Hardware asset inventory database or spreadsheet",
                "Asset onboarding and decommissioning procedures",
                "Periodic hardware inventory reconciliation reports",
              ],
            },
            {
              code: "ID.AM-02",
              title:
                "Inventories of software, services, and systems managed by the organization are maintained",
              level: 2,
              orderNo: 2,
              description:
                "Inventories of software, services, and systems managed by the organization are maintained to enable visibility and management of the organization's technology environment.",
              keyQuestions: [
                "Is the software and services inventory comprehensive and current?",
                "Are shadow IT and unauthorized software identified and managed?",
                "How are cloud services and SaaS applications tracked?",
              ],
              evidenceExamples: [
                "Software asset inventory and license management records",
                "Cloud service and SaaS inventory",
                "System inventory with version and configuration details",
              ],
            },
            {
              code: "ID.AM-03",
              title:
                "Representations of the organization's authorized network communication and internal and external network data flows are maintained",
              level: 2,
              orderNo: 3,
              description:
                "Representations of the organization's authorized network communication and internal and external network data flows are maintained to understand the environment and detect unauthorized activity.",
              keyQuestions: [
                "Are network architecture diagrams current and comprehensive?",
                "Are data flow diagrams maintained for critical systems?",
                "How are authorized network communications documented and updated?",
              ],
              evidenceExamples: [
                "Network architecture and topology diagrams",
                "Data flow diagrams for critical business processes",
                "Authorized communications baseline documentation",
              ],
            },
            {
              code: "ID.AM-04",
              title:
                "Inventories of services provided by suppliers are maintained",
              level: 2,
              orderNo: 4,
              description:
                "Inventories of services provided by suppliers are maintained to ensure visibility into external dependencies and support supply chain risk management.",
              keyQuestions: [
                "Does the organization maintain an inventory of supplier-provided services?",
                "Are supplier services categorized by criticality and risk?",
                "How are changes in supplier services tracked and updated?",
              ],
              evidenceExamples: [
                "Supplier services inventory with categorization",
                "Supplier service dependency mapping",
                "Supplier service change tracking records",
              ],
            },
            {
              code: "ID.AM-05",
              title:
                "Assets are prioritized based on classification, criticality, resources, and impact on the mission",
              level: 2,
              orderNo: 5,
              description:
                "Assets are prioritized based on classification, criticality, resources, and impact on the mission to ensure that the most important assets receive appropriate levels of protection.",
              keyQuestions: [
                "Is there a formal asset classification and prioritization scheme?",
                "Are asset criticality ratings aligned with business impact assessments?",
                "How are prioritization decisions used to allocate security resources?",
              ],
              evidenceExamples: [
                "Asset classification policy and procedures",
                "Asset criticality and business impact ratings",
                "Resource allocation plans based on asset prioritization",
              ],
            },
            {
              code: "ID.AM-07",
              title:
                "Inventories of data and corresponding metadata for designated data types are maintained",
              level: 2,
              orderNo: 6,
              description:
                "Inventories of data and corresponding metadata for designated data types are maintained to support data governance, protection, and compliance requirements.",
              keyQuestions: [
                "Does the organization maintain a data inventory or data map?",
                "Are data classifications and retention requirements documented?",
                "How is metadata managed for sensitive and regulated data?",
              ],
              evidenceExamples: [
                "Data inventory or data catalog",
                "Data classification scheme and records",
                "Data retention schedules and compliance records",
              ],
            },
            {
              code: "ID.AM-08",
              title:
                "Systems, hardware, software, services, and data are managed throughout their life cycles",
              level: 2,
              orderNo: 7,
              description:
                "Systems, hardware, software, services, and data are managed throughout their life cycles, from acquisition or creation through disposal, to ensure consistent security and risk management.",
              keyQuestions: [
                "Are life cycle management processes defined for all asset types?",
                "How are end-of-life assets identified and managed?",
                "Are secure disposal procedures in place for decommissioned assets?",
              ],
              evidenceExamples: [
                "Asset life cycle management procedures",
                "End-of-life and end-of-support tracking reports",
                "Secure disposal and sanitization records",
              ],
            },
          ],
        },
        // ID.RA - Risk Assessment
        {
          code: "ID.RA",
          title: "Risk Assessment",
          level: 1,
          orderNo: 2,
          description:
            "The cybersecurity risk to the organization, assets, and individuals is understood by the organization.",
          keyQuestions: [
            "Does the organization conduct regular cybersecurity risk assessments?",
            "Are vulnerabilities identified and assessed in a timely manner?",
            "How are threat intelligence and risk assessment results used to inform decisions?",
          ],
          evidenceExamples: [
            "Risk assessment reports and findings",
            "Vulnerability assessment results",
            "Threat intelligence analysis documentation",
          ],
          children: [
            {
              code: "ID.RA-01",
              title:
                "Vulnerabilities in assets are identified, validated, and recorded",
              level: 2,
              orderNo: 1,
              description:
                "Vulnerabilities in assets are identified, validated, and recorded to support risk assessment and remediation prioritization.",
              keyQuestions: [
                "Does the organization conduct regular vulnerability assessments and scans?",
                "How are identified vulnerabilities validated and prioritized?",
                "Is a vulnerability management database or system maintained?",
              ],
              evidenceExamples: [
                "Vulnerability scan reports and schedules",
                "Vulnerability validation and triage records",
                "Vulnerability management database or tracking system",
              ],
            },
            {
              code: "ID.RA-02",
              title:
                "Cyber threat intelligence is received from information sharing forums and sources",
              level: 2,
              orderNo: 2,
              description:
                "Cyber threat intelligence is received from information sharing forums and sources to inform the organization's understanding of current and emerging threats.",
              keyQuestions: [
                "Does the organization subscribe to threat intelligence feeds and services?",
                "Is the organization a member of relevant information sharing communities?",
                "How is received threat intelligence processed and integrated?",
              ],
              evidenceExamples: [
                "Threat intelligence feed subscriptions and sources",
                "ISAC/ISAO membership documentation",
                "Threat intelligence processing and dissemination records",
              ],
            },
            {
              code: "ID.RA-03",
              title:
                "Internal and external threats to the organization are identified and recorded",
              level: 2,
              orderNo: 3,
              description:
                "Internal and external threats to the organization are identified and recorded to support comprehensive risk assessment and threat modeling activities.",
              keyQuestions: [
                "Does the organization maintain a threat register or catalog?",
                "Are both internal and external threats regularly assessed?",
                "How are emerging threats identified and documented?",
              ],
              evidenceExamples: [
                "Threat register or catalog",
                "Threat modeling documentation",
                "Periodic threat landscape assessment reports",
              ],
            },
            {
              code: "ID.RA-04",
              title:
                "Potential impacts and likelihoods of threats exploiting vulnerabilities are identified and recorded",
              level: 2,
              orderNo: 4,
              description:
                "Potential impacts and likelihoods of threats exploiting vulnerabilities are identified and recorded to support risk-informed decision-making.",
              keyQuestions: [
                "Are risk impact and likelihood assessments conducted systematically?",
                "How are potential business impacts of cybersecurity events quantified?",
                "Are risk scenarios documented with impact and likelihood ratings?",
              ],
              evidenceExamples: [
                "Risk assessment worksheets with impact and likelihood ratings",
                "Business impact analysis documentation",
                "Risk scenario analysis reports",
              ],
            },
            {
              code: "ID.RA-05",
              title:
                "Threats, vulnerabilities, likelihoods, and impacts are used to understand inherent risk and inform risk response prioritization",
              level: 2,
              orderNo: 5,
              description:
                "Threats, vulnerabilities, likelihoods, and impacts are used to understand inherent risk and inform risk response prioritization, ensuring resources are directed to the highest-priority risks.",
              keyQuestions: [
                "How is inherent risk calculated from threat, vulnerability, and impact data?",
                "Are risk response actions prioritized based on risk assessment results?",
                "Is there a formal risk prioritization methodology?",
              ],
              evidenceExamples: [
                "Risk register with inherent risk ratings",
                "Risk prioritization and response plans",
                "Risk treatment plans based on prioritization",
              ],
            },
            {
              code: "ID.RA-06",
              title:
                "Risk responses are chosen, prioritized, planned, tracked, and communicated",
              level: 2,
              orderNo: 6,
              description:
                "Risk responses are chosen, prioritized, planned, tracked, and communicated across the organization to ensure effective and timely risk treatment.",
              keyQuestions: [
                "Are risk response options systematically evaluated and selected?",
                "How are risk treatment plans tracked for implementation progress?",
                "Are risk response decisions communicated to relevant stakeholders?",
              ],
              evidenceExamples: [
                "Risk treatment plans with response selections",
                "Risk response implementation tracking reports",
                "Risk communication records to stakeholders",
              ],
            },
            {
              code: "ID.RA-07",
              title:
                "Changes and exceptions are managed, assessed for risk impact, recorded, and tracked",
              level: 2,
              orderNo: 7,
              description:
                "Changes and exceptions are managed, assessed for risk impact, recorded, and tracked to ensure that modifications to the environment do not introduce unacceptable risk.",
              keyQuestions: [
                "Is there a formal change management process that includes risk assessment?",
                "How are security exceptions documented and tracked?",
                "Are risk impacts of changes evaluated before implementation?",
              ],
              evidenceExamples: [
                "Change management procedures with risk assessment steps",
                "Security exception request and approval records",
                "Change risk impact assessment documentation",
              ],
            },
            {
              code: "ID.RA-08",
              title:
                "Processes for receiving, analyzing, and responding to vulnerability disclosures are established",
              level: 2,
              orderNo: 8,
              description:
                "Processes for receiving, analyzing, and responding to vulnerability disclosures are established to enable responsible handling of reported vulnerabilities.",
              keyQuestions: [
                "Does the organization have a vulnerability disclosure policy?",
                "Is there a defined process for receiving and triaging vulnerability reports?",
                "How are vulnerability disclosures responded to in a timely manner?",
              ],
              evidenceExamples: [
                "Vulnerability disclosure policy",
                "Vulnerability disclosure handling procedures",
                "Records of vulnerability disclosure responses",
              ],
            },
            {
              code: "ID.RA-09",
              title:
                "The authenticity and integrity of hardware and software are assessed prior to acquisition and use",
              level: 2,
              orderNo: 9,
              description:
                "The authenticity and integrity of hardware and software are assessed prior to acquisition and use to prevent the introduction of counterfeit or tampered components.",
              keyQuestions: [
                "Are hardware and software authenticity checks performed before acquisition?",
                "How is the integrity of software verified before deployment?",
                "Are supply chain integrity controls in place for critical components?",
              ],
              evidenceExamples: [
                "Hardware and software authenticity verification procedures",
                "Software integrity validation records (hash verification, code signing)",
                "Supply chain integrity assessment reports",
              ],
            },
            {
              code: "ID.RA-10",
              title:
                "Critical suppliers are assessed prior to acquisition",
              level: 2,
              orderNo: 10,
              description:
                "Critical suppliers are assessed prior to acquisition to evaluate their cybersecurity posture and potential risks before establishing a business relationship.",
              keyQuestions: [
                "Are cybersecurity assessments conducted for critical suppliers before engagement?",
                "What criteria are used to evaluate supplier cybersecurity maturity?",
                "Are pre-acquisition assessment results documented and factored into decisions?",
              ],
              evidenceExamples: [
                "Pre-acquisition supplier cybersecurity assessment reports",
                "Supplier cybersecurity evaluation criteria and checklists",
                "Procurement decision records incorporating security assessments",
              ],
            },
          ],
        },
        // ID.IM - Improvement
        {
          code: "ID.IM",
          title: "Improvement",
          level: 1,
          orderNo: 3,
          description:
            "Improvements to organizational cybersecurity risk management processes, procedures, and activities are identified across all CSF Functions.",
          keyQuestions: [
            "How does the organization identify opportunities for cybersecurity improvement?",
            "Are lessons learned incorporated into cybersecurity practices?",
            "Is continuous improvement integrated into the cybersecurity program?",
          ],
          evidenceExamples: [
            "Cybersecurity improvement plans and roadmaps",
            "Lessons learned documentation",
            "Continuous improvement process documentation",
          ],
          children: [
            {
              code: "ID.IM-01",
              title:
                "Improvements are identified from evaluations",
              level: 2,
              orderNo: 1,
              description:
                "Improvements are identified from evaluations, including assessments, audits, exercises, and reviews, to strengthen the organization's cybersecurity posture.",
              keyQuestions: [
                "Are cybersecurity evaluations (audits, assessments, exercises) conducted regularly?",
                "How are findings from evaluations translated into improvement actions?",
                "Are improvement actions tracked to completion?",
              ],
              evidenceExamples: [
                "Audit and assessment findings with improvement recommendations",
                "Improvement action tracking register",
                "Exercise after-action reports with lessons learned",
              ],
            },
            {
              code: "ID.IM-02",
              title:
                "Improvements are identified from security tests and exercises, including those done in coordination with suppliers and relevant third parties",
              level: 2,
              orderNo: 2,
              description:
                "Improvements are identified from security tests and exercises, including those done in coordination with suppliers and relevant third parties, to validate and enhance cybersecurity capabilities.",
              keyQuestions: [
                "Does the organization conduct regular security tests and exercises?",
                "Are suppliers included in relevant security exercises?",
                "How are test and exercise findings used to drive improvements?",
              ],
              evidenceExamples: [
                "Penetration test reports with remediation recommendations",
                "Tabletop and simulation exercise reports",
                "Joint supplier security exercise documentation",
              ],
            },
            {
              code: "ID.IM-03",
              title:
                "Improvements are identified from execution of operational processes, procedures, and activities",
              level: 2,
              orderNo: 3,
              description:
                "Improvements are identified from execution of operational processes, procedures, and activities. Day-to-day operations provide opportunities to identify and implement cybersecurity enhancements.",
              keyQuestions: [
                "Are operational cybersecurity processes regularly reviewed for effectiveness?",
                "How are process improvement opportunities captured during operations?",
                "Are operational improvements documented and shared across the organization?",
              ],
              evidenceExamples: [
                "Operational process review findings",
                "Process improvement suggestion tracking",
                "Operational improvement implementation records",
              ],
            },
            {
              code: "ID.IM-04",
              title:
                "Incident response plans and other cybersecurity plans that affect operations are established, communicated, maintained, and improved",
              level: 2,
              orderNo: 4,
              description:
                "Incident response plans and other cybersecurity plans that affect operations are established, communicated, maintained, and improved based on lessons learned and evolving threats.",
              keyQuestions: [
                "Are incident response and other cybersecurity plans regularly updated?",
                "How are plan improvements identified and implemented?",
                "Are updated plans communicated to all relevant personnel?",
              ],
              evidenceExamples: [
                "Incident response plan with revision history",
                "Plan improvement action tracking",
                "Plan communication and training records",
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // PROTECT (PR)
    // =========================================================================
    {
      code: "PR",
      title: "Protect",
      level: 0,
      orderNo: 3,
      description:
        "Safeguards to manage the organization's cybersecurity risks are used. Once assets and risks are identified and prioritized, PROTECT supports the ability to secure those assets to prevent or lower the likelihood and impact of adverse cybersecurity events.",
      keyQuestions: [
        "Are appropriate safeguards implemented to protect critical assets?",
        "How does the organization manage access to its systems and data?",
        "Are personnel trained in cybersecurity awareness and practices?",
      ],
      evidenceExamples: [
        "Access control policies and implementation records",
        "Security awareness training materials and completion records",
        "Data protection and encryption implementation documentation",
      ],
      children: [
        // PR.AA - Identity Management, Authentication, and Access Control
        {
          code: "PR.AA",
          title: "Identity Management, Authentication, and Access Control",
          level: 1,
          orderNo: 1,
          description:
            "Access to physical and logical assets is limited to authorized users, services, and hardware and managed commensurate with the assessed risk of unauthorized access.",
          keyQuestions: [
            "Are identity management processes established for all users and services?",
            "Is multi-factor authentication implemented for critical systems?",
            "How is access to physical and logical assets controlled and monitored?",
          ],
          evidenceExamples: [
            "Identity and access management policy and procedures",
            "Multi-factor authentication implementation records",
            "Access review and recertification reports",
          ],
          children: [
            {
              code: "PR.AA-01",
              title:
                "Identities and credentials for authorized users, services, and hardware are managed by the organization",
              level: 2,
              orderNo: 1,
              description:
                "Identities and credentials for authorized users, services, and hardware are managed by the organization throughout the identity life cycle.",
              keyQuestions: [
                "Is there a centralized identity management system?",
                "How are credentials provisioned, rotated, and revoked?",
                "Are service accounts and hardware identities managed alongside user identities?",
              ],
              evidenceExamples: [
                "Identity management system documentation",
                "Credential life cycle management procedures",
                "Identity provisioning and deprovisioning records",
              ],
            },
            {
              code: "PR.AA-02",
              title:
                "Identities are proofed and bound to credentials based on the context of interactions",
              level: 2,
              orderNo: 2,
              description:
                "Identities are proofed and bound to credentials based on the context of interactions, ensuring appropriate levels of identity assurance for different risk contexts.",
              keyQuestions: [
                "Does the organization perform identity proofing before issuing credentials?",
                "Are identity assurance levels matched to the risk of the interaction?",
                "How are credentials bound to verified identities?",
              ],
              evidenceExamples: [
                "Identity proofing procedures and records",
                "Identity assurance level mapping documentation",
                "Credential binding verification records",
              ],
            },
            {
              code: "PR.AA-03",
              title:
                "Users, services, and hardware are authenticated",
              level: 2,
              orderNo: 3,
              description:
                "Users, services, and hardware are authenticated with appropriate strength based on the risk of the access, using mechanisms such as passwords, tokens, biometrics, and certificates.",
              keyQuestions: [
                "Are authentication mechanisms appropriate for the risk level of access?",
                "Is multi-factor authentication implemented where required?",
                "How are authentication failures monitored and responded to?",
              ],
              evidenceExamples: [
                "Authentication policy with strength requirements",
                "MFA implementation and coverage reports",
                "Authentication failure monitoring and alerting configuration",
              ],
            },
            {
              code: "PR.AA-04",
              title:
                "Identity assertions are protected, conveyed, and verified",
              level: 2,
              orderNo: 4,
              description:
                "Identity assertions (e.g., tokens, tickets, SAML assertions) are protected, conveyed, and verified to prevent unauthorized use or tampering.",
              keyQuestions: [
                "Are identity assertions encrypted and integrity-protected in transit?",
                "How are assertions validated by relying parties?",
                "Are assertion lifetimes and scope appropriately limited?",
              ],
              evidenceExamples: [
                "SSO and federation configuration documentation",
                "Assertion protection and validation procedures",
                "Token management and expiration policies",
              ],
            },
            {
              code: "PR.AA-05",
              title:
                "Access permissions, entitlements, and authorizations are defined in a policy, managed, enforced, and reviewed, and incorporate the principles of least privilege and separation of duties",
              level: 2,
              orderNo: 5,
              description:
                "Access permissions, entitlements, and authorizations are defined in a policy, managed, enforced, and reviewed, and incorporate the principles of least privilege and separation of duties.",
              keyQuestions: [
                "Are access permissions based on least privilege and separation of duties?",
                "How often are access entitlements reviewed and recertified?",
                "Is role-based or attribute-based access control implemented?",
              ],
              evidenceExamples: [
                "Access control policy with least privilege requirements",
                "Periodic access review and recertification records",
                "Role-based access control matrix",
              ],
            },
            {
              code: "PR.AA-06",
              title:
                "Physical access to assets is managed, monitored, and enforced commensurate with risk",
              level: 2,
              orderNo: 6,
              description:
                "Physical access to assets is managed, monitored, and enforced commensurate with risk, including access to facilities, data centers, and other sensitive areas.",
              keyQuestions: [
                "Are physical access controls appropriate for the sensitivity of each area?",
                "How is physical access monitored and logged?",
                "Are visitor access procedures documented and enforced?",
              ],
              evidenceExamples: [
                "Physical access control policies and procedures",
                "Physical access logs and monitoring records",
                "Visitor management procedures and logs",
              ],
            },
          ],
        },
        // PR.AT - Awareness and Training
        {
          code: "PR.AT",
          title: "Awareness and Training",
          level: 1,
          orderNo: 2,
          description:
            "The organization's personnel are provided with cybersecurity awareness and training so that they can perform their cybersecurity-related tasks.",
          keyQuestions: [
            "Does the organization provide regular cybersecurity awareness training?",
            "Is role-specific cybersecurity training provided to relevant personnel?",
            "How is training effectiveness measured and improved?",
          ],
          evidenceExamples: [
            "Cybersecurity awareness training program documentation",
            "Training completion and assessment records",
            "Training effectiveness evaluation reports",
          ],
          children: [
            {
              code: "PR.AT-01",
              title:
                "Personnel are provided with awareness and training so that they possess the knowledge and skills to perform general tasks with cybersecurity risks in mind",
              level: 2,
              orderNo: 1,
              description:
                "Personnel are provided with awareness and training so that they possess the knowledge and skills to perform general tasks with cybersecurity risks in mind, including recognizing and reporting threats.",
              keyQuestions: [
                "Do all personnel receive cybersecurity awareness training upon hiring and regularly thereafter?",
                "Does training cover current threats such as phishing and social engineering?",
                "Are training materials updated to reflect the evolving threat landscape?",
              ],
              evidenceExamples: [
                "Cybersecurity awareness training curriculum",
                "Training completion tracking records",
                "Phishing simulation results and follow-up training records",
              ],
            },
            {
              code: "PR.AT-02",
              title:
                "Individuals in specialized roles are provided with awareness and training so that they possess the knowledge and skills to perform relevant tasks with cybersecurity risks in mind",
              level: 2,
              orderNo: 2,
              description:
                "Individuals in specialized roles are provided with awareness and training so that they possess the knowledge and skills to perform relevant tasks with cybersecurity risks in mind.",
              keyQuestions: [
                "Are role-specific cybersecurity training requirements defined?",
                "Do individuals in specialized roles receive advanced cybersecurity training?",
                "How are specialized training needs identified and updated?",
              ],
              evidenceExamples: [
                "Role-specific training requirements matrix",
                "Specialized cybersecurity training records and certifications",
                "Training needs assessment documentation",
              ],
            },
          ],
        },
        // PR.DS - Data Security
        {
          code: "PR.DS",
          title: "Data Security",
          level: 1,
          orderNo: 3,
          description:
            "Data are managed consistent with the organization's risk strategy to protect the confidentiality, integrity, and availability of information.",
          keyQuestions: [
            "How does the organization protect data at rest and in transit?",
            "Are data integrity and availability controls implemented?",
            "How is data managed throughout its life cycle?",
          ],
          evidenceExamples: [
            "Data encryption policies and implementation records",
            "Data integrity monitoring and verification procedures",
            "Data life cycle management documentation",
          ],
          children: [
            {
              code: "PR.DS-01",
              title:
                "The confidentiality, integrity, and availability of data-at-rest are protected",
              level: 2,
              orderNo: 1,
              description:
                "The confidentiality, integrity, and availability of data-at-rest are protected using encryption, access controls, and other appropriate safeguards.",
              keyQuestions: [
                "Is data-at-rest encrypted in accordance with the organization's policy?",
                "Are encryption keys managed securely?",
                "How is data integrity at rest verified?",
              ],
              evidenceExamples: [
                "Data-at-rest encryption implementation records",
                "Key management procedures and audit logs",
                "Data integrity verification reports",
              ],
            },
            {
              code: "PR.DS-02",
              title:
                "The confidentiality, integrity, and availability of data-in-transit are protected",
              level: 2,
              orderNo: 2,
              description:
                "The confidentiality, integrity, and availability of data-in-transit are protected using encryption, secure protocols, and other appropriate safeguards.",
              keyQuestions: [
                "Are secure protocols (e.g., TLS) used for data in transit?",
                "Is data-in-transit encryption enforced across all communication channels?",
                "How are secure communication configurations monitored and maintained?",
              ],
              evidenceExamples: [
                "TLS/SSL configuration standards and implementation records",
                "Network encryption policies and coverage reports",
                "Secure communication channel inventory",
              ],
            },
            {
              code: "PR.DS-10",
              title:
                "The confidentiality, integrity, and availability of data-in-use are protected",
              level: 2,
              orderNo: 3,
              description:
                "The confidentiality, integrity, and availability of data-in-use are protected through appropriate controls for data being actively processed or accessed.",
              keyQuestions: [
                "Are controls in place to protect data while being processed?",
                "How is unauthorized access to data-in-use prevented?",
                "Are data-in-use protection mechanisms appropriate for data sensitivity?",
              ],
              evidenceExamples: [
                "Data-in-use protection controls documentation",
                "Memory protection and secure processing configurations",
                "Data handling procedures for sensitive data in use",
              ],
            },
            {
              code: "PR.DS-11",
              title:
                "Backups of data are created, protected, maintained, and tested",
              level: 2,
              orderNo: 4,
              description:
                "Backups of data are created, protected, maintained, and tested sufficient to permit data restoration and support recovery objectives.",
              keyQuestions: [
                "Are data backups performed regularly and in accordance with policy?",
                "Are backup data protected with encryption and access controls?",
                "How often are backup restoration tests conducted?",
              ],
              evidenceExamples: [
                "Backup policy and schedule documentation",
                "Backup encryption and protection records",
                "Backup restoration test results and reports",
              ],
            },
          ],
        },
        // PR.PS - Platform Security
        {
          code: "PR.PS",
          title: "Platform Security",
          level: 1,
          orderNo: 4,
          description:
            "The hardware, software (e.g., firmware, operating systems, applications), and services of physical and virtual platforms are managed consistent with the organization's risk strategy to protect their confidentiality, integrity, and availability.",
          keyQuestions: [
            "Are platforms hardened according to security baselines?",
            "How is software integrity ensured throughout the development and deployment life cycle?",
            "Are platform configurations managed and monitored for deviations?",
          ],
          evidenceExamples: [
            "Platform hardening standards and baseline configurations",
            "Software integrity verification procedures",
            "Configuration management and monitoring records",
          ],
          children: [
            {
              code: "PR.PS-01",
              title:
                "Configuration management practices are established and applied",
              level: 2,
              orderNo: 1,
              description:
                "Configuration management practices are established and applied to maintain the security of hardware, software, and firmware throughout their life cycles.",
              keyQuestions: [
                "Is a formal configuration management process in place?",
                "Are secure configuration baselines defined for all platform types?",
                "How are configuration changes controlled and documented?",
              ],
              evidenceExamples: [
                "Configuration management policy and procedures",
                "Secure configuration baselines (e.g., CIS Benchmarks)",
                "Configuration change control records",
              ],
            },
            {
              code: "PR.PS-02",
              title:
                "Software is maintained, replaced, and removed commensurate with risk",
              level: 2,
              orderNo: 2,
              description:
                "Software is maintained, replaced, and removed commensurate with risk, including timely patching and removal of unsupported or unnecessary software.",
              keyQuestions: [
                "Is there a formal patch management process?",
                "How is unsupported or end-of-life software identified and addressed?",
                "Are unnecessary software and services removed from systems?",
              ],
              evidenceExamples: [
                "Patch management policy and procedures",
                "Patch compliance reports",
                "Software removal and decommissioning records",
              ],
            },
            {
              code: "PR.PS-03",
              title: "Hardware is maintained, replaced, and removed commensurate with risk",
              level: 2,
              orderNo: 3,
              description:
                "Hardware is maintained, replaced, and removed commensurate with risk, including timely replacement of aging or vulnerable hardware and secure disposal.",
              keyQuestions: [
                "Is there a hardware maintenance and replacement schedule?",
                "How is aging or vulnerable hardware identified and prioritized for replacement?",
                "Are secure hardware disposal procedures followed?",
              ],
              evidenceExamples: [
                "Hardware maintenance and replacement schedules",
                "Hardware lifecycle tracking records",
                "Secure hardware disposal and sanitization records",
              ],
            },
            {
              code: "PR.PS-04",
              title: "Log records are generated and made available for continuous monitoring",
              level: 2,
              orderNo: 4,
              description:
                "Log records are generated and made available for continuous monitoring to support detection, investigation, and response activities.",
              keyQuestions: [
                "Are logging requirements defined for all critical systems and applications?",
                "Are logs centrally collected and stored securely?",
                "How long are log records retained?",
              ],
              evidenceExamples: [
                "Logging policy with requirements by system type",
                "Centralized log management system documentation",
                "Log retention and protection procedures",
              ],
            },
            {
              code: "PR.PS-05",
              title: "Installation and execution of unauthorized software is prevented",
              level: 2,
              orderNo: 5,
              description:
                "Installation and execution of unauthorized software is prevented through application whitelisting, software restriction policies, or other appropriate controls.",
              keyQuestions: [
                "Are application whitelisting or software restriction controls implemented?",
                "How are unauthorized software installations detected and prevented?",
                "Is there a process for approving new software installations?",
              ],
              evidenceExamples: [
                "Application whitelisting policy and implementation",
                "Software installation approval process documentation",
                "Unauthorized software detection and remediation records",
              ],
            },
            {
              code: "PR.PS-06",
              title: "Secure software development practices are integrated, and their performance is monitored throughout the software development life cycle",
              level: 2,
              orderNo: 6,
              description:
                "Secure software development practices are integrated, and their performance is monitored throughout the software development life cycle to reduce software vulnerabilities.",
              keyQuestions: [
                "Are secure coding standards defined and enforced?",
                "Is security integrated into all phases of the software development life cycle?",
                "Are code reviews and security testing performed before deployment?",
              ],
              evidenceExamples: [
                "Secure SDLC policy and procedures",
                "Code review and static analysis reports",
                "Security testing results from development pipelines",
              ],
            },
          ],
        },
        // PR.IR - Technology Infrastructure Resilience
        {
          code: "PR.IR",
          title: "Technology Infrastructure Resilience",
          level: 1,
          orderNo: 5,
          description:
            "Security architectures are managed with the organization's risk strategy to protect asset confidentiality, integrity, and availability, and organizational resilience.",
          keyQuestions: [
            "Are resilience requirements defined for critical technology infrastructure?",
            "How does the organization ensure infrastructure availability and redundancy?",
            "Are resilience capabilities tested and validated regularly?",
          ],
          evidenceExamples: [
            "Infrastructure resilience architecture documentation",
            "Redundancy and failover configuration records",
            "Resilience testing and validation reports",
          ],
          children: [
            {
              code: "PR.IR-01",
              title:
                "Networks and environments are protected from unauthorized logical access and usage",
              level: 2,
              orderNo: 1,
              description:
                "Networks and environments are protected from unauthorized logical access and usage through network segmentation, firewalls, and other network security controls.",
              keyQuestions: [
                "Is network segmentation implemented to isolate critical assets?",
                "Are firewall rules and network access controls regularly reviewed?",
                "How is unauthorized network access detected and prevented?",
              ],
              evidenceExamples: [
                "Network segmentation architecture documentation",
                "Firewall rule review and approval records",
                "Network access control implementation documentation",
              ],
            },
            {
              code: "PR.IR-02",
              title:
                "The organization's technology assets are protected from environmental threats",
              level: 2,
              orderNo: 2,
              description:
                "The organization's technology assets are protected from environmental threats such as flooding, fire, power loss, and temperature extremes through appropriate physical and environmental controls.",
              keyQuestions: [
                "Are environmental controls (cooling, fire suppression, power) adequate?",
                "How are environmental threats to technology assets assessed and mitigated?",
                "Are environmental monitoring systems in place and functioning?",
              ],
              evidenceExamples: [
                "Environmental control specifications and maintenance records",
                "Environmental risk assessment documentation",
                "Environmental monitoring system configuration and alert records",
              ],
            },
            {
              code: "PR.IR-03",
              title:
                "Mechanisms are implemented to achieve resilience requirements in normal and adverse situations",
              level: 2,
              orderNo: 3,
              description:
                "Mechanisms are implemented to achieve resilience requirements in normal and adverse situations, including redundancy, load balancing, and failover capabilities.",
              keyQuestions: [
                "Are redundancy and failover mechanisms in place for critical systems?",
                "How are resilience mechanisms tested for effectiveness?",
                "Are recovery time and recovery point objectives defined and met?",
              ],
              evidenceExamples: [
                "Resilience architecture and design documentation",
                "Failover testing and validation records",
                "RTO/RPO compliance monitoring reports",
              ],
            },
            {
              code: "PR.IR-04",
              title:
                "Adequate resource capacity to ensure availability is maintained",
              level: 2,
              orderNo: 4,
              description:
                "Adequate resource capacity to ensure availability is maintained through capacity planning, monitoring, and scaling to meet demand.",
              keyQuestions: [
                "Is capacity planning performed for critical infrastructure components?",
                "How is resource utilization monitored to prevent capacity-related outages?",
                "Are capacity thresholds and scaling procedures defined?",
              ],
              evidenceExamples: [
                "Capacity planning documentation and forecasts",
                "Resource utilization monitoring dashboards",
                "Capacity scaling procedures and records",
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // DETECT (DE)
    // =========================================================================
    {
      code: "DE",
      title: "Detect",
      level: 0,
      orderNo: 4,
      description:
        "Possible cybersecurity attacks and compromises are found and analyzed. DETECT enables timely discovery and analysis of anomalies, indicators of compromise, and other potentially adverse cybersecurity events that may indicate that cybersecurity attacks and incidents are occurring.",
      keyQuestions: [
        "How does the organization detect cybersecurity events and anomalies?",
        "Are monitoring capabilities in place for all critical systems?",
        "How are detected events analyzed and prioritized?",
      ],
      evidenceExamples: [
        "Security monitoring and detection system documentation",
        "Anomaly detection and analysis procedures",
        "Security event correlation and prioritization processes",
      ],
      children: [
        // DE.CM - Continuous Monitoring
        {
          code: "DE.CM",
          title: "Continuous Monitoring",
          level: 1,
          orderNo: 1,
          description:
            "Assets are monitored to find anomalies, indicators of compromise, and other potentially adverse events.",
          keyQuestions: [
            "Are all critical assets and networks continuously monitored?",
            "What tools and technologies are used for security monitoring?",
            "How are monitoring gaps identified and addressed?",
          ],
          evidenceExamples: [
            "Continuous monitoring strategy and implementation plan",
            "Security monitoring tool inventory and coverage map",
            "Monitoring gap analysis reports",
          ],
          children: [
            {
              code: "DE.CM-01",
              title:
                "Networks and network services are monitored to find potentially adverse events",
              level: 2,
              orderNo: 1,
              description:
                "Networks and network services are monitored to find potentially adverse events, including unauthorized access, data exfiltration, and denial-of-service attacks.",
              keyQuestions: [
                "Is network traffic monitored for suspicious activity?",
                "Are intrusion detection/prevention systems deployed and maintained?",
                "How is network monitoring coverage validated?",
              ],
              evidenceExamples: [
                "Network monitoring system configuration and coverage",
                "IDS/IPS deployment and tuning documentation",
                "Network monitoring alert reports and statistics",
              ],
            },
            {
              code: "DE.CM-02",
              title:
                "The physical environment is monitored to find potentially adverse events",
              level: 2,
              orderNo: 2,
              description:
                "The physical environment is monitored to find potentially adverse events, such as unauthorized physical access or environmental conditions that could affect operations.",
              keyQuestions: [
                "Are physical security monitoring systems in place (cameras, sensors)?",
                "How is unauthorized physical access detected?",
                "Are environmental conditions monitored for anomalies?",
              ],
              evidenceExamples: [
                "Physical security monitoring system documentation",
                "Physical access detection and alert records",
                "Environmental monitoring configuration and alert logs",
              ],
            },
            {
              code: "DE.CM-03",
              title:
                "Personnel activity and technology usage are monitored to find potentially adverse events",
              level: 2,
              orderNo: 3,
              description:
                "Personnel activity and technology usage are monitored to find potentially adverse events, such as insider threats, policy violations, and compromised accounts.",
              keyQuestions: [
                "Is user activity monitoring implemented for privileged and high-risk users?",
                "How are anomalous user behaviors detected?",
                "Are insider threat indicators defined and monitored?",
              ],
              evidenceExamples: [
                "User activity monitoring tool configuration",
                "User behavior analytics (UBA/UEBA) implementation",
                "Insider threat monitoring procedures and indicators",
              ],
            },
            {
              code: "DE.CM-06",
              title:
                "External service provider activities and services are monitored to find potentially adverse events",
              level: 2,
              orderNo: 4,
              description:
                "External service provider activities and services are monitored to find potentially adverse events, ensuring that third-party activities do not introduce unacceptable risk.",
              keyQuestions: [
                "Are external service provider activities monitored for security events?",
                "How is monitoring responsibility shared between the organization and providers?",
                "Are provider security event notifications reviewed and acted upon?",
              ],
              evidenceExamples: [
                "Service provider monitoring procedures and tools",
                "Shared responsibility documentation for monitoring",
                "Provider security event notification and response records",
              ],
            },
            {
              code: "DE.CM-09",
              title:
                "Computing hardware and software, runtime environments, and their data are monitored to find potentially adverse events",
              level: 2,
              orderNo: 5,
              description:
                "Computing hardware and software, runtime environments, and their data are monitored to find potentially adverse events such as malware, unauthorized changes, and data anomalies.",
              keyQuestions: [
                "Are endpoint detection and response (EDR) tools deployed?",
                "Is file integrity monitoring implemented for critical systems?",
                "How are runtime environments monitored for malicious activity?",
              ],
              evidenceExamples: [
                "EDR/antimalware deployment and coverage reports",
                "File integrity monitoring (FIM) configuration and alerts",
                "Runtime environment monitoring documentation",
              ],
            },
          ],
        },
        // DE.AE - Adverse Event Analysis
        {
          code: "DE.AE",
          title: "Adverse Event Analysis",
          level: 1,
          orderNo: 2,
          description:
            "Anomalies, indicators of compromise, and other potentially adverse events are analyzed to characterize the events and detect cybersecurity incidents.",
          keyQuestions: [
            "How are detected events analyzed to determine if they are incidents?",
            "Are event correlation and analysis tools in place?",
            "How quickly are adverse events analyzed and escalated?",
          ],
          evidenceExamples: [
            "Event analysis procedures and playbooks",
            "SIEM configuration and correlation rules",
            "Event analysis reports and escalation records",
          ],
          children: [
            {
              code: "DE.AE-02",
              title:
                "Potentially adverse events are analyzed to better understand associated activities",
              level: 2,
              orderNo: 1,
              description:
                "Potentially adverse events are analyzed to better understand associated activities, determine if the event is part of a larger attack, and inform response actions.",
              keyQuestions: [
                "Are potentially adverse events investigated to determine scope and context?",
                "How are related events correlated to identify attack patterns?",
                "Are analysis findings documented and used to improve detection?",
              ],
              evidenceExamples: [
                "Event investigation and analysis records",
                "Event correlation analysis reports",
                "Detection improvement recommendations from analysis",
              ],
            },
            {
              code: "DE.AE-03",
              title:
                "Information is correlated from multiple sources",
              level: 2,
              orderNo: 2,
              description:
                "Information is correlated from multiple sources to gain situational awareness and identify cybersecurity incidents across the environment.",
              keyQuestions: [
                "Are security events correlated across multiple data sources?",
                "Is a SIEM or similar correlation platform in use?",
                "How is cross-source correlation used to improve incident detection?",
              ],
              evidenceExamples: [
                "SIEM platform configuration and data source inventory",
                "Cross-source correlation rules and logic",
                "Correlation-based detection effectiveness reports",
              ],
            },
            {
              code: "DE.AE-04",
              title:
                "The estimated impact and scope of adverse events are understood",
              level: 2,
              orderNo: 3,
              description:
                "The estimated impact and scope of adverse events are understood to support effective incident prioritization and response planning.",
              keyQuestions: [
                "How is the impact of detected adverse events estimated?",
                "Is event scope determined to understand the extent of compromise?",
                "Are impact and scope estimates used to prioritize response actions?",
              ],
              evidenceExamples: [
                "Impact assessment procedures for adverse events",
                "Scope determination methodologies and records",
                "Prioritization criteria based on impact and scope assessments",
              ],
            },
            {
              code: "DE.AE-06",
              title:
                "Information on adverse events is provided to authorized staff and tools",
              level: 2,
              orderNo: 4,
              description:
                "Information on adverse events is provided to authorized staff and tools to support timely and effective detection, analysis, and response.",
              keyQuestions: [
                "Is adverse event information shared with appropriate personnel in a timely manner?",
                "Are automated alerting and notification mechanisms in place?",
                "How is event information distributed to response teams and tools?",
              ],
              evidenceExamples: [
                "Event notification and escalation procedures",
                "Automated alerting configuration documentation",
                "Event information distribution records",
              ],
            },
            {
              code: "DE.AE-07",
              title:
                "Cyber threat intelligence and other contextual information are integrated into the analysis",
              level: 2,
              orderNo: 5,
              description:
                "Cyber threat intelligence and other contextual information are integrated into the analysis of adverse events to improve understanding and inform response.",
              keyQuestions: [
                "Is threat intelligence integrated into event analysis workflows?",
                "How does contextual information enhance adverse event analysis?",
                "Are threat intelligence indicators used to enrich event data?",
              ],
              evidenceExamples: [
                "Threat intelligence integration with SIEM/analysis tools",
                "Enrichment procedures for adverse event analysis",
                "Threat intelligence-driven analysis reports",
              ],
            },
            {
              code: "DE.AE-08",
              title:
                "Incidents are declared when adverse events meet the defined incident criteria",
              level: 2,
              orderNo: 6,
              description:
                "Incidents are declared when adverse events meet the defined incident criteria, triggering formal incident response procedures and escalation.",
              keyQuestions: [
                "Are incident declaration criteria clearly defined?",
                "How are adverse events evaluated against incident criteria?",
                "Is there a formal process for declaring and escalating incidents?",
              ],
              evidenceExamples: [
                "Incident declaration criteria documentation",
                "Incident declaration and escalation procedures",
                "Incident declaration records and decision logs",
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // RESPOND (RS)
    // =========================================================================
    {
      code: "RS",
      title: "Respond",
      level: 0,
      orderNo: 5,
      description:
        "Actions regarding a detected cybersecurity incident are taken. RESPOND supports the ability to contain the impact of cybersecurity incidents. Outcomes within this Function cover incident management, analysis, mitigation, reporting, and communication.",
      keyQuestions: [
        "Does the organization have a formal incident response plan?",
        "How are incidents analyzed and contained?",
        "Are incident communications managed effectively?",
      ],
      evidenceExamples: [
        "Incident response plan and procedures",
        "Incident analysis and containment records",
        "Incident communication templates and records",
      ],
      children: [
        // RS.MA - Incident Management
        {
          code: "RS.MA",
          title: "Incident Management",
          level: 1,
          orderNo: 1,
          description:
            "Responses to detected cybersecurity incidents are managed.",
          keyQuestions: [
            "Is the incident response plan executed consistently?",
            "How are incidents triaged, prioritized, and escalated?",
            "Are incident response roles and responsibilities clearly assigned?",
          ],
          evidenceExamples: [
            "Incident response plan execution records",
            "Incident triage and prioritization procedures",
            "Incident response team roster and assignment records",
          ],
          children: [
            {
              code: "RS.MA-01",
              title:
                "The incident response plan is executed in coordination with relevant third parties once an incident is declared",
              level: 2,
              orderNo: 1,
              description:
                "The incident response plan is executed in coordination with relevant third parties once an incident is declared, ensuring coordinated and effective response.",
              keyQuestions: [
                "Is the incident response plan activated promptly upon incident declaration?",
                "How are third parties coordinated during incident response?",
                "Are incident response procedures followed consistently?",
              ],
              evidenceExamples: [
                "Incident response plan activation records",
                "Third-party coordination logs during incidents",
                "Incident response procedure compliance reviews",
              ],
            },
            {
              code: "RS.MA-02",
              title:
                "Incident reports are triaged and validated",
              level: 2,
              orderNo: 2,
              description:
                "Incident reports are triaged and validated to determine their severity, scope, and required response actions.",
              keyQuestions: [
                "Is there a defined triage process for incoming incident reports?",
                "How are incident reports validated to confirm they represent real incidents?",
                "Are triage decisions documented with rationale?",
              ],
              evidenceExamples: [
                "Incident triage procedures and criteria",
                "Incident validation records",
                "Triage decision documentation",
              ],
            },
            {
              code: "RS.MA-03",
              title:
                "Incidents are categorized and prioritized",
              level: 2,
              orderNo: 3,
              description:
                "Incidents are categorized and prioritized based on severity, impact, and other relevant factors to ensure appropriate allocation of response resources.",
              keyQuestions: [
                "Are incident categorization criteria clearly defined?",
                "How are incidents prioritized for response?",
                "Are categorization and prioritization updated as new information emerges?",
              ],
              evidenceExamples: [
                "Incident categorization taxonomy and criteria",
                "Incident prioritization matrix",
                "Categorization and prioritization update records",
              ],
            },
            {
              code: "RS.MA-04",
              title:
                "Incidents are escalated or elevated as needed",
              level: 2,
              orderNo: 4,
              description:
                "Incidents are escalated or elevated as needed based on severity, impact, or complexity to ensure appropriate management attention and resources.",
              keyQuestions: [
                "Are escalation criteria and thresholds defined?",
                "How are incidents escalated to management and executive leadership?",
                "Are escalation decisions documented and reviewed?",
              ],
              evidenceExamples: [
                "Incident escalation procedures and criteria",
                "Escalation notification records",
                "Post-incident reviews of escalation effectiveness",
              ],
            },
            {
              code: "RS.MA-05",
              title:
                "The criteria for initiating incident recovery are applied",
              level: 2,
              orderNo: 5,
              description:
                "The criteria for initiating incident recovery are applied to determine when the incident has been sufficiently contained and it is appropriate to begin recovery activities.",
              keyQuestions: [
                "Are criteria for transitioning from response to recovery defined?",
                "How is the decision to begin recovery documented?",
                "Are recovery initiation criteria reviewed and updated based on experience?",
              ],
              evidenceExamples: [
                "Recovery initiation criteria documentation",
                "Recovery decision records",
                "Post-incident review of recovery initiation timing",
              ],
            },
          ],
        },
        // RS.AN - Incident Analysis
        {
          code: "RS.AN",
          title: "Incident Analysis",
          level: 1,
          orderNo: 2,
          description:
            "Investigations are conducted to ensure effective response and support forensics and recovery activities.",
          keyQuestions: [
            "How are incidents investigated to determine root cause?",
            "Are forensic procedures followed during incident analysis?",
            "How are analysis findings used to improve incident response?",
          ],
          evidenceExamples: [
            "Incident investigation procedures",
            "Forensic analysis reports",
            "Root cause analysis documentation",
          ],
          children: [
            {
              code: "RS.AN-03",
              title:
                "Analysis is performed to determine what has taken place during an incident and the root cause of the incident",
              level: 2,
              orderNo: 1,
              description:
                "Analysis is performed to determine what has taken place during an incident and the root cause of the incident to inform containment, eradication, and prevention of recurrence.",
              keyQuestions: [
                "Are root cause analyses conducted for significant incidents?",
                "How is forensic evidence collected and preserved?",
                "Are analysis findings documented and shared with relevant stakeholders?",
              ],
              evidenceExamples: [
                "Root cause analysis reports",
                "Forensic evidence collection and preservation records",
                "Incident analysis finding summaries",
              ],
            },
            {
              code: "RS.AN-06",
              title:
                "Actions performed during an investigation are recorded, and the integrity of the investigation is preserved",
              level: 2,
              orderNo: 2,
              description:
                "Actions performed during an investigation are recorded, and the integrity of the investigation is preserved to support potential legal proceedings and improve future response.",
              keyQuestions: [
                "Are investigation activities documented with chain of custody?",
                "How is investigation integrity maintained throughout the process?",
                "Are investigation records preserved for the required retention period?",
              ],
              evidenceExamples: [
                "Investigation activity logs",
                "Chain of custody documentation",
                "Investigation integrity verification records",
              ],
            },
            {
              code: "RS.AN-07",
              title:
                "Incident data and metadata are collected, and their integrity and provenance are preserved",
              level: 2,
              orderNo: 3,
              description:
                "Incident data and metadata are collected, and their integrity and provenance are preserved to support analysis, response, and potential legal or regulatory requirements.",
              keyQuestions: [
                "Are incident data collection procedures defined and followed?",
                "How is the integrity of collected data ensured?",
                "Is data provenance tracked throughout the investigation?",
              ],
              evidenceExamples: [
                "Incident data collection procedures",
                "Data integrity verification methods and records",
                "Data provenance tracking documentation",
              ],
            },
            {
              code: "RS.AN-08",
              title:
                "An incident's magnitude is estimated and validated",
              level: 2,
              orderNo: 4,
              description:
                "An incident's magnitude is estimated and validated to understand the full impact and inform resource allocation for response and recovery.",
              keyQuestions: [
                "How is the magnitude of an incident estimated during response?",
                "Are magnitude estimates validated as more information becomes available?",
                "How do magnitude estimates influence response resource allocation?",
              ],
              evidenceExamples: [
                "Incident magnitude estimation procedures",
                "Magnitude validation and update records",
                "Resource allocation decisions based on magnitude assessments",
              ],
            },
          ],
        },
        // RS.CO - Incident Response Reporting and Communication
        {
          code: "RS.CO",
          title: "Incident Response Reporting and Communication",
          level: 1,
          orderNo: 3,
          description:
            "Response activities are coordinated with internal and external stakeholders as required by laws, regulations, or policies.",
          keyQuestions: [
            "Are incident communication procedures defined for internal and external stakeholders?",
            "How are regulatory notification requirements met during incidents?",
            "Are communication templates and contact lists maintained and current?",
          ],
          evidenceExamples: [
            "Incident communication plan and procedures",
            "Regulatory notification tracking records",
            "Communication templates and contact lists",
          ],
          children: [
            {
              code: "RS.CO-02",
              title:
                "Internal and external stakeholders are notified of incidents",
              level: 2,
              orderNo: 1,
              description:
                "Internal and external stakeholders are notified of incidents in accordance with laws, regulations, policies, and agreements to ensure timely and appropriate communication.",
              keyQuestions: [
                "Are stakeholder notification requirements documented?",
                "How are notifications issued to internal and external stakeholders?",
                "Are notification timelines met in accordance with regulatory requirements?",
              ],
              evidenceExamples: [
                "Stakeholder notification procedures",
                "Notification records with timestamps",
                "Regulatory notification compliance documentation",
              ],
            },
            {
              code: "RS.CO-03",
              title:
                "Information is shared with designated internal and external stakeholders",
              level: 2,
              orderNo: 2,
              description:
                "Information is shared with designated internal and external stakeholders to coordinate response activities, provide situational awareness, and meet reporting obligations.",
              keyQuestions: [
                "Is incident information shared with appropriate stakeholders?",
                "Are information sharing agreements in place with external partners?",
                "How is sensitive incident information protected during sharing?",
              ],
              evidenceExamples: [
                "Information sharing procedures and agreements",
                "Incident information sharing records",
                "Data protection measures for shared incident information",
              ],
            },
          ],
        },
        // RS.MI - Incident Mitigation
        {
          code: "RS.MI",
          title: "Incident Mitigation",
          level: 1,
          orderNo: 4,
          description:
            "Activities are performed to prevent expansion of an event and mitigate its effects.",
          keyQuestions: [
            "How are incidents contained to prevent further damage?",
            "Are mitigation actions effective in reducing incident impact?",
            "How quickly are containment and mitigation actions executed?",
          ],
          evidenceExamples: [
            "Incident containment procedures",
            "Mitigation action records and effectiveness assessments",
            "Containment and mitigation timeline documentation",
          ],
          children: [
            {
              code: "RS.MI-01",
              title: "Incidents are contained",
              level: 2,
              orderNo: 1,
              description:
                "Incidents are contained to prevent further damage, limit the scope of the incident, and preserve evidence for investigation.",
              keyQuestions: [
                "Are containment strategies defined for different incident types?",
                "How quickly are containment actions implemented?",
                "Are containment actions effective in limiting incident scope?",
              ],
              evidenceExamples: [
                "Containment strategy documentation by incident type",
                "Containment action implementation records with timestamps",
                "Containment effectiveness assessments",
              ],
            },
            {
              code: "RS.MI-02",
              title: "Incidents are eradicated",
              level: 2,
              orderNo: 2,
              description:
                "Incidents are eradicated by removing the root cause, eliminating malicious artifacts, and ensuring that the threat has been fully removed from the environment.",
              keyQuestions: [
                "Are eradication procedures defined for different incident types?",
                "How is the completeness of eradication verified?",
                "Are eradication activities documented for post-incident review?",
              ],
              evidenceExamples: [
                "Eradication procedures and checklists",
                "Eradication verification and validation records",
                "Eradication activity documentation",
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // RECOVER (RC)
    // =========================================================================
    {
      code: "RC",
      title: "Recover",
      level: 0,
      orderNo: 6,
      description:
        "Assets and operations affected by a cybersecurity incident are restored. RECOVER supports timely restoration of normal operations to reduce the impact of cybersecurity incidents and enable appropriate communication during recovery efforts.",
      keyQuestions: [
        "Does the organization have recovery plans for cybersecurity incidents?",
        "How are recovery activities prioritized and executed?",
        "Are recovery communications managed effectively?",
      ],
      evidenceExamples: [
        "Recovery plan documentation",
        "Recovery execution records and timelines",
        "Recovery communication records",
      ],
      children: [
        // RC.RP - Incident Recovery Plan Execution
        {
          code: "RC.RP",
          title: "Incident Recovery Plan Execution",
          level: 1,
          orderNo: 1,
          description:
            "Restoration activities are performed to ensure operational availability of systems and services affected by cybersecurity incidents.",
          keyQuestions: [
            "Are recovery plans executed in a timely manner following incidents?",
            "How are recovery activities prioritized based on business impact?",
            "Are recovery objectives (RTO, RPO) met during restoration?",
          ],
          evidenceExamples: [
            "Recovery plan execution records",
            "Recovery prioritization documentation",
            "RTO/RPO compliance records",
          ],
          children: [
            {
              code: "RC.RP-01",
              title:
                "The recovery portion of the incident response plan is executed once initiated from the incident response process",
              level: 2,
              orderNo: 1,
              description:
                "The recovery portion of the incident response plan is executed once initiated from the incident response process, following defined procedures to restore operations.",
              keyQuestions: [
                "Is the recovery plan executed according to established procedures?",
                "Are recovery actions coordinated with incident response activities?",
                "How is recovery progress tracked and reported?",
              ],
              evidenceExamples: [
                "Recovery plan activation and execution records",
                "Recovery coordination logs",
                "Recovery progress tracking reports",
              ],
            },
            {
              code: "RC.RP-02",
              title:
                "Recovery actions are selected, scoped, prioritized, and performed",
              level: 2,
              orderNo: 2,
              description:
                "Recovery actions are selected, scoped, prioritized, and performed based on the nature and impact of the incident and organizational priorities.",
              keyQuestions: [
                "How are recovery actions selected and prioritized?",
                "Are recovery actions scoped to address the specific incident impact?",
                "Are recovery actions tracked to completion?",
              ],
              evidenceExamples: [
                "Recovery action selection and prioritization records",
                "Recovery scope documentation",
                "Recovery action tracking and completion records",
              ],
            },
            {
              code: "RC.RP-03",
              title:
                "The integrity of backups and other restoration assets is verified before using them for restoration",
              level: 2,
              orderNo: 3,
              description:
                "The integrity of backups and other restoration assets is verified before using them for restoration to prevent reintroduction of compromised data or systems.",
              keyQuestions: [
                "Are backups verified for integrity before restoration?",
                "How is the absence of malicious content in restoration assets confirmed?",
                "Are restoration asset integrity checks documented?",
              ],
              evidenceExamples: [
                "Backup integrity verification procedures and results",
                "Restoration asset security scan records",
                "Integrity verification documentation",
              ],
            },
            {
              code: "RC.RP-04",
              title:
                "Critical mission functions and cybersecurity risk management are considered to establish post-incident operational norms",
              level: 2,
              orderNo: 4,
              description:
                "Critical mission functions and cybersecurity risk management are considered to establish post-incident operational norms, which may differ from pre-incident baselines based on lessons learned.",
              keyQuestions: [
                "Are post-incident operational norms established based on incident findings?",
                "How are critical mission functions prioritized during recovery?",
                "Are risk management adjustments made based on incident experience?",
              ],
              evidenceExamples: [
                "Post-incident operational baseline documentation",
                "Mission function recovery prioritization records",
                "Risk management adjustment documentation post-incident",
              ],
            },
            {
              code: "RC.RP-05",
              title:
                "The integrity of restored assets is verified, systems and services are restored, and normal operating status is confirmed",
              level: 2,
              orderNo: 5,
              description:
                "The integrity of restored assets is verified, systems and services are restored, and normal operating status is confirmed before returning to production operations.",
              keyQuestions: [
                "How is the integrity of restored systems verified?",
                "Are restored systems tested before returning to production?",
                "How is normal operating status confirmed and documented?",
              ],
              evidenceExamples: [
                "Restored system integrity verification records",
                "Post-restoration testing results",
                "Return to normal operations confirmation documentation",
              ],
            },
            {
              code: "RC.RP-06",
              title:
                "The end of incident recovery is declared based on criteria, and incident-related documentation is completed",
              level: 2,
              orderNo: 6,
              description:
                "The end of incident recovery is declared based on criteria, and incident-related documentation is completed to support post-incident analysis and improvement.",
              keyQuestions: [
                "Are recovery completion criteria defined?",
                "How is the end of recovery formally declared?",
                "Is all incident-related documentation completed and archived?",
              ],
              evidenceExamples: [
                "Recovery completion criteria documentation",
                "Recovery closure declaration records",
                "Complete incident documentation packages",
              ],
            },
          ],
        },
        // RC.CO - Incident Recovery Communication
        {
          code: "RC.CO",
          title: "Incident Recovery Communication",
          level: 1,
          orderNo: 2,
          description:
            "Restoration activities and progress in restoring operational capabilities are communicated to designated internal and external stakeholders.",
          keyQuestions: [
            "Are recovery status updates communicated to stakeholders?",
            "How is public communication managed during recovery?",
            "Are communication timelines and content appropriate for each audience?",
          ],
          evidenceExamples: [
            "Recovery communication plans and templates",
            "Recovery status update records",
            "Stakeholder communication logs during recovery",
          ],
          children: [
            {
              code: "RC.CO-03",
              title:
                "Recovery activities and progress in restoring operational capabilities are communicated to designated internal and external stakeholders",
              level: 2,
              orderNo: 1,
              description:
                "Recovery activities and progress in restoring operational capabilities are communicated to designated internal and external stakeholders to maintain trust and provide situational awareness.",
              keyQuestions: [
                "Are recovery status updates provided regularly to stakeholders?",
                "How is recovery progress communicated to management and the board?",
                "Are external stakeholders kept informed of recovery progress?",
              ],
              evidenceExamples: [
                "Recovery progress reports to internal stakeholders",
                "External stakeholder recovery communications",
                "Management and board recovery status briefings",
              ],
            },
            {
              code: "RC.CO-04",
              title:
                "Public updates on incident recovery are shared using approved methods and messaging",
              level: 2,
              orderNo: 2,
              description:
                "Public updates on incident recovery are shared using approved methods and messaging to maintain transparency and trust while managing reputational risk.",
              keyQuestions: [
                "Are public communication procedures defined for incident recovery?",
                "How are public messages approved before release?",
                "Are public communications consistent and accurate?",
              ],
              evidenceExamples: [
                "Public communication policy for incident recovery",
                "Public message approval workflow records",
                "Published recovery updates and press releases",
              ],
            },
          ],
        },
      ],
    },
  ],
};
