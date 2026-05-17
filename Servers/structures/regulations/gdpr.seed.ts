import { RegulationSeed } from "./types";

export const GDPR_SEED: RegulationSeed = {
  code: "GDPR",
  name: "General Data Protection Regulation (EU)",
  type: "regulation",
  category: "privacy",
  jurisdiction: "EU",
  issuer: "European Parliament",
  version: "2016/679",
  description:
    "EU regulation on data protection and privacy, governing the processing of personal data of individuals within the European Union.",
  effectiveDate: "2018-05-25",
  requirements: [
    // ────────────────────────────────────────────────────────────────
    // CHAPTER I — General Provisions (Art. 1–4)
    // ────────────────────────────────────────────────────────────────
    {
      code: "Chap.I",
      title: "Chapter I: General Provisions",
      level: 0,
      orderNo: 1,
      description:
        "Establishes the subject matter, scope, and definitions of the Regulation, including the territorial scope and key terms used throughout the GDPR.",
      children: [
        {
          code: "Art.1",
          title: "Subject matter and objectives",
          level: 1,
          orderNo: 1,
          description:
            "Lays down rules relating to the protection of natural persons with regard to the processing of personal data and rules relating to the free movement of personal data. Protects fundamental rights and freedoms of natural persons, in particular their right to the protection of personal data.",
          keyQuestions: [
            "Does the organisation acknowledge that the GDPR protects the fundamental rights of natural persons with respect to personal data processing?",
            "Has the organisation documented how GDPR objectives align with its data processing activities?",
          ],
          evidenceExamples: [
            "Data protection policy referencing GDPR objectives and fundamental rights",
            "Board-level acknowledgement or charter recognising GDPR obligations",
          ],
        },
        {
          code: "Art.2",
          title: "Material scope",
          level: 1,
          orderNo: 2,
          description:
            "Defines that the GDPR applies to the processing of personal data wholly or partly by automated means, and to non-automated processing of personal data that forms part of a filing system. Excludes activities outside EU law scope, common foreign and security policy, purely personal or household activities, and competent authorities for criminal law enforcement purposes.",
          keyQuestions: [
            "Has the organisation identified all processing activities that fall within the material scope of GDPR?",
            "Are there any processing activities the organisation considers out of scope, and has it documented the justification for each exclusion?",
          ],
          evidenceExamples: [
            "Records of processing activities (ROPA) listing all in-scope processing",
            "Documented assessment of any processing activities claimed to be out of material scope with legal justification",
          ],
        },
        {
          code: "Art.3",
          title: "Territorial scope",
          level: 1,
          orderNo: 3,
          description:
            "Applies the GDPR to processing by a controller or processor established in the EU regardless of whether the processing takes place in the EU. Also applies to processing of personal data of data subjects who are in the EU by a controller or processor not established in the EU, where the processing relates to offering goods or services to data subjects in the EU or monitoring their behaviour within the EU.",
          keyQuestions: [
            "Has the organisation determined whether it falls within the territorial scope of the GDPR through establishment in the EU or through offering goods/services to EU data subjects?",
            "If the organisation is established outside the EU, has it assessed whether its activities constitute monitoring the behaviour of EU data subjects?",
            "Has a representative in the EU been designated if required under Art.27?",
          ],
          evidenceExamples: [
            "Legal assessment of territorial applicability documenting EU establishment or targeting/monitoring of EU data subjects",
            "Designation letter for an EU representative (where applicable)",
            "Map of processing locations and data flows into and out of the EU",
          ],
        },
        {
          code: "Art.4",
          title: "Definitions",
          level: 1,
          orderNo: 4,
          description:
            "Provides 26 key definitions used throughout the GDPR including personal data, processing, controller, processor, consent, personal data breach, supervisory authority, cross-border processing, pseudonymisation, filing system, profiling, and main establishment among others.",
          keyQuestions: [
            "Has the organisation adopted the GDPR definitions of personal data, processing, controller, and processor throughout its policies and contracts?",
            "Are staff trained to recognise what constitutes personal data and processing under these definitions?",
          ],
          evidenceExamples: [
            "Internal glossary or data protection policy that incorporates GDPR definitions",
            "Training materials that explain key GDPR terms to employees",
          ],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────
    // CHAPTER II — Principles (Art. 5–11)
    // ────────────────────────────────────────────────────────────────
    {
      code: "Chap.II",
      title: "Chapter II: Principles",
      level: 0,
      orderNo: 2,
      description:
        "Sets out the core data protection principles that underpin all processing of personal data, the lawful bases for processing, conditions for consent, and rules on special categories of data.",
      children: [
        {
          code: "Art.5",
          title: "Principles relating to processing of personal data",
          level: 1,
          orderNo: 1,
          description:
            "Establishes seven core principles: lawfulness, fairness and transparency; purpose limitation; data minimisation; accuracy; storage limitation; integrity and confidentiality; and accountability. The controller is responsible for and must be able to demonstrate compliance with all principles.",
          keyQuestions: [
            "Can the organisation demonstrate how each of the seven data protection principles is applied across all processing activities?",
            "How does the organisation evidence accountability — i.e., prove compliance with the principles rather than merely assert it?",
            "Are regular reviews conducted to ensure ongoing adherence to purpose limitation, data minimisation, and storage limitation?",
          ],
          evidenceExamples: [
            "Data protection policy mapping each principle to specific organisational controls and procedures",
            "Records of processing activities (ROPA) demonstrating purpose limitation and legal basis per processing activity",
            "Data retention schedule with evidence of periodic review and deletion of expired data",
          ],
        },
        {
          code: "Art.6",
          title: "Lawfulness of processing",
          level: 1,
          orderNo: 2,
          description:
            "Processing is lawful only if at least one of six legal bases applies: consent, performance of a contract, legal obligation, vital interests, public interest or official authority, or legitimate interests of the controller or a third party. Member States may introduce more specific provisions for processing under legal obligation or public interest bases.",
          keyQuestions: [
            "Has the organisation identified and documented the lawful basis for each processing activity?",
            "Where legitimate interests is relied upon, has the organisation conducted and documented a legitimate interests assessment (LIA) including the balancing test?",
            "Are the documented lawful bases communicated to data subjects through privacy notices?",
          ],
          evidenceExamples: [
            "ROPA entries with lawful basis recorded for each processing activity",
            "Legitimate interests assessments (LIAs) for all processing relying on Art.6(1)(f)",
            "Privacy notices that clearly state the lawful basis for each category of processing",
          ],
        },
        {
          code: "Art.7",
          title: "Conditions for consent",
          level: 1,
          orderNo: 3,
          description:
            "Where processing is based on consent, the controller must be able to demonstrate that the data subject has consented. Consent requests must be presented clearly, in plain language, and distinguishable from other matters. Data subjects have the right to withdraw consent at any time, and withdrawal must be as easy as giving consent. Consent must be freely given and cannot be a precondition for a service where consent is not necessary for performance.",
          keyQuestions: [
            "Can the organisation demonstrate when and how consent was obtained for each data subject where consent is the lawful basis?",
            "Is the mechanism for withdrawing consent as straightforward as the mechanism for giving it?",
            "Has the organisation assessed whether consent is truly freely given, especially in contexts involving an imbalance of power?",
          ],
          evidenceExamples: [
            "Consent management platform records with timestamps, consent text shown, and method of capture",
            "Documented withdrawal mechanism accessible from the same channel as consent collection",
            "Assessment of whether consent is freely given for employment or public authority contexts",
          ],
        },
        {
          code: "Art.8",
          title:
            "Conditions applicable to child's consent in relation to information society services",
          level: 1,
          orderNo: 4,
          description:
            "Where consent is the lawful basis for offering information society services directly to a child, processing is lawful only if the child is at least 16 years old (Member States may lower to 13). Below that age, consent must be given or authorised by the holder of parental responsibility. The controller must make reasonable efforts to verify parental consent using available technology.",
          keyQuestions: [
            "Does the organisation offer information society services directly to children, and if so, has it implemented age verification mechanisms?",
            "What mechanisms are in place to obtain and verify parental or guardian consent for children below the applicable age threshold?",
          ],
          evidenceExamples: [
            "Age-gate or age verification process documentation",
            "Parental consent collection and verification procedure with evidence of reasonable efforts",
            "Records showing the applicable age threshold per Member State where the service is offered",
          ],
        },
        {
          code: "Art.9",
          title: "Processing of special categories of personal data",
          level: 1,
          orderNo: 5,
          description:
            "Prohibits the processing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data for identification, health data, or data concerning sex life or sexual orientation. Lists ten exceptions including explicit consent, employment and social security law, vital interests, legitimate activities of certain bodies, manifestly public data, legal claims, substantial public interest, health purposes, public health, and archiving or research.",
          keyQuestions: [
            "Has the organisation identified all processing of special category data and documented the applicable exception under Art.9(2)?",
            "Where explicit consent is the basis, does the consent mechanism meet the higher threshold required for special category data?",
            "Are additional safeguards in place to protect special category data, such as enhanced access controls and encryption?",
          ],
          evidenceExamples: [
            "Data inventory or ROPA identifying special category data with the specific Art.9(2) exception relied upon",
            "Explicit consent forms specifically addressing special category data processing",
            "Enhanced technical and organisational measures applied to special category data (e.g., encryption, access restrictions, audit logging)",
          ],
        },
        {
          code: "Art.10",
          title:
            "Processing of personal data relating to criminal convictions and offences",
          level: 1,
          orderNo: 6,
          description:
            "Processing of personal data relating to criminal convictions and offences or related security measures shall be carried out only under the control of official authority or when authorised by Union or Member State law providing for appropriate safeguards. A comprehensive register of criminal convictions may only be kept under the control of official authority.",
          keyQuestions: [
            "Does the organisation process any data relating to criminal convictions or offences, and if so, under what legal authorisation?",
            "Are appropriate safeguards in place for any criminal offence data processing, consistent with Member State law requirements?",
          ],
          evidenceExamples: [
            "Legal opinion or assessment documenting the authorisation basis for processing criminal offence data",
            "Policy governing the handling of criminal records data, including access controls and retention periods",
          ],
        },
        {
          code: "Art.11",
          title: "Processing which does not require identification",
          level: 1,
          orderNo: 7,
          description:
            "If the purposes for which a controller processes personal data do not require identification of a data subject, the controller is not obliged to maintain, acquire, or process additional information to identify the data subject solely for GDPR compliance. Where the controller can demonstrate that it is not in a position to identify the data subject, it must inform the data subject accordingly, and Arts.15–20 shall not apply unless the data subject provides additional information enabling identification.",
          keyQuestions: [
            "Has the organisation identified processing activities where it does not need to identify the data subject?",
            "Where identification is not required, has the organisation documented why, and communicated this to data subjects when they exercise rights?",
          ],
          evidenceExamples: [
            "Documentation of processing activities where data subjects are not identified (e.g., anonymised analytics)",
            "Response templates explaining to data subjects why certain rights cannot be fulfilled due to inability to identify them",
          ],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────
    // CHAPTER III — Rights of the Data Subject (Art. 12–23)
    // ────────────────────────────────────────────────────────────────
    {
      code: "Chap.III",
      title: "Chapter III: Rights of the Data Subject",
      level: 0,
      orderNo: 3,
      description:
        "Establishes the transparency obligations of controllers and the rights of data subjects including access, rectification, erasure, restriction, data portability, objection, and protections against automated decision-making.",
      children: [
        {
          code: "Art.12",
          title:
            "Transparent information, communication and modalities for the exercise of the rights of the data subject",
          level: 1,
          orderNo: 1,
          description:
            "Requires the controller to provide information to data subjects in a concise, transparent, intelligible and easily accessible form, using clear and plain language. The controller must facilitate the exercise of data subject rights and respond without undue delay and at the latest within one month (extendable by two further months for complex requests). Actions taken must be provided free of charge, though a reasonable fee may be charged for manifestly unfounded or excessive requests.",
          keyQuestions: [
            "Does the organisation respond to all data subject requests within the one-month statutory deadline, with documented extensions where applicable?",
            "Are privacy notices and communications written in clear, plain language appropriate to the audience, including children where relevant?",
            "Is there a defined process for verifying the identity of data subjects submitting requests?",
          ],
          evidenceExamples: [
            "Data subject request (DSR) handling procedure with defined SLAs and escalation paths",
            "DSR log showing response times, outcomes, and any extensions applied",
            "Privacy notices reviewed for readability (e.g., Flesch score or plain language audit)",
          ],
        },
        {
          code: "Art.13",
          title:
            "Information to be provided where personal data are collected from the data subject",
          level: 1,
          orderNo: 2,
          description:
            "When personal data are collected directly from the data subject, the controller must provide at the time of collection: the identity and contact details of the controller and DPO, the purposes and lawful basis of processing, recipients or categories of recipients, details of international transfers, retention periods, data subject rights, the right to withdraw consent, the right to lodge a complaint, whether provision of data is statutory or contractual, and information about automated decision-making including profiling.",
          keyQuestions: [
            "Do all data collection points (forms, apps, in-person) provide the full set of information required by Art.13 at the time of collection?",
            "Are privacy notices updated promptly when there are changes to purposes, recipients, or retention periods?",
            "Is the information provided in a layered format where appropriate to avoid information overload?",
          ],
          evidenceExamples: [
            "Privacy notices at each data collection point (website, app, paper forms) containing all Art.13 mandatory information",
            "Privacy notice version control log showing regular reviews and updates",
            "Layered privacy notice approach with short-form notice linking to full notice",
          ],
        },
        {
          code: "Art.14",
          title:
            "Information to be provided where personal data have not been obtained from the data subject",
          level: 1,
          orderNo: 3,
          description:
            "Where personal data are obtained from a source other than the data subject, the controller must provide similar information to Art.13 plus the categories of personal data and the source from which the data originate. This information must be provided within a reasonable period after obtaining the data and at the latest within one month, or at the time of first communication with the data subject, or at the time of first disclosure to another recipient. Exemptions apply where the data subject already has the information, provision is impossible or would involve disproportionate effort, or obtaining or disclosure is expressly laid down by law.",
          keyQuestions: [
            "Has the organisation identified all sources of personal data that are not collected directly from data subjects?",
            "Is the required information provided to data subjects within one month or at the time of first communication?",
            "Has the organisation documented and justified any reliance on exemptions from the Art.14 notification obligation?",
          ],
          evidenceExamples: [
            "Inventory of indirect data sources (e.g., data brokers, public registers, third-party partners) with Art.14 notices associated with each",
            "Process documentation for delivering Art.14 notifications within the required timeframe",
            "Documented justification for any exemptions claimed under Art.14(5)",
          ],
        },
        {
          code: "Art.15",
          title: "Right of access by the data subject",
          level: 1,
          orderNo: 4,
          description:
            "Grants the data subject the right to obtain confirmation of whether personal data concerning them are being processed, and if so, access to the personal data and information including: purposes, categories of data, recipients, retention period, existence of rights (rectification, erasure, restriction, objection), right to lodge a complaint, source of data, and existence of automated decision-making. A copy of the personal data must be provided free of charge; additional copies may incur a reasonable fee.",
          keyQuestions: [
            "Can the organisation locate and compile all personal data relating to a specific data subject across all systems within the response deadline?",
            "Does the subject access response include all the supplementary information required by Art.15(1)?",
            "Are appropriate measures in place to verify the identity of the requester before disclosing personal data?",
          ],
          evidenceExamples: [
            "Subject access request (SAR) procedure covering data discovery, compilation, review, and delivery",
            "Template SAR response letter including all Art.15(1) supplementary information",
            "Identity verification procedure for SAR requesters to prevent unauthorised disclosure",
          ],
        },
        {
          code: "Art.16",
          title: "Right to rectification",
          level: 1,
          orderNo: 5,
          description:
            "Grants the data subject the right to obtain without undue delay the rectification of inaccurate personal data. Taking into account the purposes of processing, the data subject has the right to have incomplete personal data completed, including by means of providing a supplementary statement.",
          keyQuestions: [
            "Does the organisation have a process to rectify inaccurate personal data without undue delay upon request?",
            "How does the organisation propagate corrections to third parties to whom the data have been disclosed?",
          ],
          evidenceExamples: [
            "Rectification request handling procedure with defined steps and timelines",
            "Audit trail showing rectification actions taken and notifications sent to recipients under Art.19",
          ],
        },
        {
          code: "Art.17",
          title: "Right to erasure ('right to be forgotten')",
          level: 1,
          orderNo: 6,
          description:
            "Grants the data subject the right to obtain erasure of personal data without undue delay where one of several grounds applies: data are no longer necessary for the original purposes, consent is withdrawn, data subject objects and no overriding legitimate grounds exist, data have been unlawfully processed, erasure is required by law, or data were collected in relation to information society services offered to a child. Where the controller has made the data public, it must take reasonable steps to inform other controllers processing the data. Exemptions exist for freedom of expression, legal obligations, public health, archiving in the public interest, and legal claims.",
          keyQuestions: [
            "Can the organisation systematically identify and erase all instances of a data subject's personal data across all systems, including backups and archives?",
            "Where data have been made public or shared with third parties, does the organisation have a procedure to notify those parties of the erasure request?",
            "Has the organisation documented the grounds on which it may refuse an erasure request under the Art.17(3) exemptions?",
          ],
          evidenceExamples: [
            "Erasure request handling procedure including technical deletion process across all systems",
            "Data mapping showing all locations where personal data are stored to enable complete erasure",
            "Log of erasure actions taken including notifications to third-party recipients",
          ],
        },
        {
          code: "Art.18",
          title: "Right to restriction of processing",
          level: 1,
          orderNo: 7,
          description:
            "Grants the data subject the right to obtain restriction of processing where: accuracy of data is contested (for a period enabling verification), processing is unlawful and the data subject opposes erasure, the controller no longer needs the data but the data subject requires them for legal claims, or the data subject has objected to processing pending verification of legitimate grounds. When processing is restricted, data may only be stored; other processing requires consent or is limited to legal claims, protection of rights, or important public interest.",
          keyQuestions: [
            "Does the organisation have technical and procedural mechanisms to restrict processing of personal data (i.e., store but not otherwise process)?",
            "How does the organisation track and manage the restriction status of data across systems?",
          ],
          evidenceExamples: [
            "Technical mechanism to flag and restrict processing (e.g., status field, separate storage, access controls)",
            "Procedure for lifting restriction and notifying the data subject before processing resumes",
          ],
        },
        {
          code: "Art.19",
          title:
            "Notification obligation regarding rectification or erasure of personal data or restriction of processing",
          level: 1,
          orderNo: 8,
          description:
            "Requires the controller to communicate any rectification, erasure, or restriction of processing to each recipient to whom the personal data have been disclosed, unless this proves impossible or involves disproportionate effort. The controller must inform the data subject about those recipients if the data subject requests it.",
          keyQuestions: [
            "Does the organisation maintain records of all recipients to whom personal data have been disclosed?",
            "Is there a process to notify recipients of rectification, erasure, or restriction actions taken?",
          ],
          evidenceExamples: [
            "Recipient disclosure register maintained as part of the ROPA",
            "Template notification letters or automated notifications to recipients upon rectification, erasure, or restriction",
          ],
        },
        {
          code: "Art.20",
          title: "Right to data portability",
          level: 1,
          orderNo: 9,
          description:
            "Grants the data subject the right to receive personal data they have provided to a controller in a structured, commonly used and machine-readable format, and to transmit those data to another controller without hindrance. Applies where processing is based on consent or contract and carried out by automated means. Where technically feasible, the data subject has the right to have the data transmitted directly from one controller to another.",
          keyQuestions: [
            "Can the organisation export a data subject's personal data in a structured, commonly used, machine-readable format (e.g., JSON, CSV, XML)?",
            "Has the organisation assessed whether direct controller-to-controller transmission is technically feasible?",
            "Does the organisation clearly distinguish between data provided by the data subject and data derived or inferred by the controller?",
          ],
          evidenceExamples: [
            "Data portability export functionality producing structured, machine-readable output",
            "Technical feasibility assessment for direct controller-to-controller data transmission",
            "Documentation of data categories included in portability responses",
          ],
        },
        {
          code: "Art.21",
          title: "Right to object",
          level: 1,
          orderNo: 10,
          description:
            "Grants the data subject the right to object at any time to processing based on public interest or legitimate interests, including profiling based on those grounds. The controller must cease processing unless it demonstrates compelling legitimate grounds overriding the data subject's interests, rights, and freedoms, or for the establishment, exercise, or defence of legal claims. Where personal data are processed for direct marketing, the data subject has an absolute right to object and processing must cease. The right to object must be explicitly brought to the attention of the data subject at the latest at the time of first communication, presented clearly and separately from other information.",
          keyQuestions: [
            "Does the organisation have a mechanism for data subjects to object to processing, particularly for direct marketing?",
            "Where an objection is received for processing based on legitimate interests, does the organisation have a process to assess whether compelling legitimate grounds override the data subject's rights?",
            "Is the right to object clearly communicated in all privacy notices and at the point of first communication?",
          ],
          evidenceExamples: [
            "Objection handling procedure including assessment criteria for compelling legitimate grounds",
            "Direct marketing opt-out mechanism that ceases processing immediately upon objection",
            "Privacy notices explicitly referencing the right to object in a prominent and separate manner",
          ],
        },
        {
          code: "Art.22",
          title:
            "Automated individual decision-making, including profiling",
          level: 1,
          orderNo: 11,
          description:
            "Grants the data subject the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects or similarly significantly affects them. Exceptions exist where the decision is necessary for a contract, authorised by Union or Member State law, or based on explicit consent. In those cases, the controller must implement suitable measures to safeguard the data subject's rights, freedoms, and legitimate interests, including at least the right to obtain human intervention, express their point of view, and contest the decision. Decisions based on special category data are permitted only under explicit consent or substantial public interest with suitable safeguards.",
          keyQuestions: [
            "Has the organisation identified all automated decision-making processes that produce legal effects or similarly significant effects on individuals?",
            "Are safeguards in place including the ability for data subjects to obtain human intervention, express their point of view, and contest automated decisions?",
            "Are data subjects informed about the existence of automated decision-making, the logic involved, and the significance and envisaged consequences?",
          ],
          evidenceExamples: [
            "Inventory of automated decision-making systems with assessment of legal/significant effects",
            "Procedure for human review of automated decisions upon data subject request",
            "Privacy notice disclosures about automated decision-making including meaningful information about the logic involved",
          ],
        },
        {
          code: "Art.23",
          title: "Restrictions",
          level: 1,
          orderNo: 12,
          description:
            "Permits Union or Member State law to restrict by legislative measure the scope of obligations and rights provided in Arts.12–22 and Art.34, as well as Art.5 insofar as its provisions correspond to those rights and obligations, when such restriction respects the essence of fundamental rights and is necessary and proportionate in a democratic society to safeguard interests including national security, defence, public security, crime prevention, other important public interests, judicial independence, regulatory enforcement, data subject protection, or enforcement of civil law claims.",
          keyQuestions: [
            "Has the organisation identified any national legislative restrictions that limit data subject rights in its operating jurisdictions?",
            "Where restrictions on data subject rights are applied, does the organisation have a legal basis in Member State law and documented justification?",
          ],
          evidenceExamples: [
            "Legal analysis of applicable Member State restrictions on data subject rights",
            "Internal policy documenting when and how legislative restrictions may be applied to data subject requests",
          ],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────
    // CHAPTER IV — Controller and Processor (Art. 24–43)
    // ────────────────────────────────────────────────────────────────
    {
      code: "Chap.IV",
      title: "Chapter IV: Controller and Processor",
      level: 0,
      orderNo: 4,
      description:
        "Defines the obligations of controllers and processors, including data protection by design and by default, records of processing, security of processing, data breach notification, data protection impact assessments, DPO designation, and codes of conduct and certification.",
      children: [
        {
          code: "Art.24",
          title: "Responsibility of the controller",
          level: 1,
          orderNo: 1,
          description:
            "Requires the controller to implement appropriate technical and organisational measures to ensure and demonstrate that processing is performed in accordance with the GDPR, taking into account the nature, scope, context, and purposes of processing as well as the risks to the rights and freedoms of natural persons. These measures must be reviewed and updated where necessary. Where proportionate, the measures shall include implementation of appropriate data protection policies.",
          keyQuestions: [
            "Has the organisation implemented technical and organisational measures proportionate to the risks of its processing activities?",
            "Are these measures regularly reviewed and updated to reflect changes in processing, technology, or risk landscape?",
            "Can the organisation demonstrate compliance through documented policies and procedures?",
          ],
          evidenceExamples: [
            "Data protection management framework documenting technical and organisational measures",
            "Periodic review records showing assessment and update of data protection measures",
            "Approved and published data protection policies with version control",
          ],
        },
        {
          code: "Art.25",
          title: "Data protection by design and by default",
          level: 1,
          orderNo: 2,
          description:
            "Requires the controller to implement, both at the time of determining the means for processing and at the time of the processing itself, appropriate technical and organisational measures such as pseudonymisation designed to implement data protection principles effectively and to integrate necessary safeguards. By default, only personal data that are necessary for each specific purpose shall be processed, applying to the amount of data collected, the extent of processing, the period of storage, and accessibility. An approved certification mechanism may be used to demonstrate compliance.",
          keyQuestions: [
            "Does the organisation incorporate data protection considerations into the design phase of new systems, products, and processes?",
            "Are default settings configured to process only the minimum amount of personal data necessary for each purpose?",
            "Is there a formal process for reviewing privacy implications before launching new products, services, or processing activities?",
          ],
          evidenceExamples: [
            "Privacy by design checklist or framework integrated into project management and SDLC processes",
            "Evidence of default privacy settings in systems (e.g., opt-in rather than opt-out, minimal data collection by default)",
            "Design review documentation showing data protection considerations at system design stage",
          ],
        },
        {
          code: "Art.26",
          title: "Joint controllers",
          level: 1,
          orderNo: 3,
          description:
            "Where two or more controllers jointly determine the purposes and means of processing, they are joint controllers. They must, in a transparent manner, determine their respective responsibilities for compliance with the GDPR, in particular regarding exercising data subject rights and providing information under Arts.13–14, by means of an arrangement between them. The arrangement must reflect the respective roles and relationships of the joint controllers vis-a-vis the data subjects. The essence of the arrangement must be made available to the data subject. Data subjects may exercise their rights against each of the controllers regardless of the arrangement.",
          keyQuestions: [
            "Has the organisation identified any processing activities where it acts as a joint controller with another organisation?",
            "Is there a documented arrangement with each joint controller that clearly allocates responsibilities for GDPR compliance?",
            "Is the essence of the joint controller arrangement made available to data subjects?",
          ],
          evidenceExamples: [
            "Joint controller agreements specifying respective responsibilities for each processing activity",
            "Published summary of joint controller arrangements accessible to data subjects",
            "Assessment documentation determining joint controller vs. controller-processor relationships",
          ],
        },
        {
          code: "Art.27",
          title: "Representatives of controllers or processors not established in the Union",
          level: 1,
          orderNo: 4,
          description:
            "Where Art.3(2) applies, the controller or processor must designate in writing a representative in the Union in one of the Member States where the data subjects whose personal data are processed are located. The representative must be mandated to be addressed by supervisory authorities and data subjects on all issues relating to processing. Exemptions apply for occasional processing not involving large-scale special category data or criminal offence data and unlikely to result in risk, and for public authorities or bodies.",
          keyQuestions: [
            "If the organisation is not established in the EU but is subject to GDPR, has it designated an EU representative?",
            "Is the EU representative mandated and equipped to handle supervisory authority and data subject communications?",
          ],
          evidenceExamples: [
            "Written designation of EU representative with mandate scope documented",
            "Contact details of EU representative published in privacy notices and communications",
          ],
        },
        {
          code: "Art.28",
          title: "Processor",
          level: 1,
          orderNo: 5,
          description:
            "Requires the controller to use only processors providing sufficient guarantees of implementing appropriate technical and organisational measures. Processing by a processor must be governed by a contract or legal act setting out the subject matter, duration, nature and purpose of processing, type of personal data, categories of data subjects, and obligations and rights of the controller. The processor must not engage another processor without prior specific or general written authorisation of the controller. The contract must include provisions on: processing only on documented instructions, confidentiality, security measures, sub-processor conditions, assistance with data subject rights and breach notification, deletion or return of data, and making available information necessary to demonstrate compliance.",
          keyQuestions: [
            "Does the organisation have written data processing agreements (DPAs) in place with all processors that contain all the mandatory provisions of Art.28(3)?",
            "Is there a process for assessing and approving processors before engagement, and for monitoring their ongoing compliance?",
            "Are sub-processor arrangements governed by equivalent contractual obligations, with controller authorisation obtained?",
          ],
          evidenceExamples: [
            "Data processing agreements with all processors containing all Art.28(3) mandatory clauses",
            "Processor due diligence and assessment records prior to engagement",
            "Sub-processor register with evidence of controller authorisation (specific or general) and notification procedures",
          ],
        },
        {
          code: "Art.29",
          title: "Processing under the authority of the controller or processor",
          level: 1,
          orderNo: 6,
          description:
            "The processor and any person acting under the authority of the controller or processor who has access to personal data shall not process that data except on instructions from the controller, unless required to do so by Union or Member State law.",
          keyQuestions: [
            "Are all personnel who access personal data aware that they may only process it in accordance with the controller's documented instructions?",
            "Are contractual and training measures in place to prevent unauthorised processing by staff and sub-processors?",
          ],
          evidenceExamples: [
            "Employee confidentiality agreements or clauses requiring processing only on controller instructions",
            "Training records confirming staff awareness of obligation to process data only as instructed",
          ],
        },
        {
          code: "Art.30",
          title: "Records of processing activities",
          level: 1,
          orderNo: 7,
          description:
            "Requires each controller (and, where applicable, its representative) to maintain a record of processing activities under its responsibility containing: controller and DPO contact details, purposes of processing, categories of data subjects and personal data, categories of recipients, transfers to third countries with safeguards, envisaged time limits for erasure, and general description of technical and organisational security measures. Processors must also maintain records containing: processor and controller contact details, categories of processing, transfers to third countries, and security measures. Records must be in writing (including electronic form) and made available to supervisory authorities on request. Exemption for organisations with fewer than 250 employees unless the processing is likely to result in risk, is not occasional, or includes special category or criminal offence data.",
          keyQuestions: [
            "Does the organisation maintain a comprehensive and up-to-date Record of Processing Activities (ROPA) containing all information required by Art.30(1)?",
            "Is the ROPA maintained in written (including electronic) form and readily available for supervisory authority inspection?",
            "Are processor records maintained where the organisation acts as a data processor?",
          ],
          evidenceExamples: [
            "Complete ROPA with all mandatory fields populated for each processing activity",
            "Evidence of regular ROPA review and update process (e.g., quarterly review cycle)",
            "Processor-side records of processing where the organisation acts as processor",
          ],
        },
        {
          code: "Art.31",
          title: "Cooperation with the supervisory authority",
          level: 1,
          orderNo: 8,
          description:
            "Requires the controller, the processor, and where applicable their representatives to cooperate on request with the supervisory authority in the performance of its tasks.",
          keyQuestions: [
            "Does the organisation have a process for responding to requests and enquiries from supervisory authorities?",
            "Are key personnel aware of the obligation to cooperate with supervisory authorities?",
          ],
          evidenceExamples: [
            "Supervisory authority engagement procedure with designated contact points and escalation paths",
            "Records of any interactions with supervisory authorities and responses provided",
          ],
        },
        {
          code: "Art.32",
          title: "Security of processing",
          level: 1,
          orderNo: 9,
          description:
            "Requires the controller and processor to implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including as appropriate: pseudonymisation and encryption of personal data; the ability to ensure ongoing confidentiality, integrity, availability and resilience of processing systems and services; the ability to restore availability and access to personal data in a timely manner in the event of a physical or technical incident; and a process for regularly testing, assessing, and evaluating the effectiveness of technical and organisational measures. The controller and processor must take steps to ensure that any natural person acting under their authority who has access to personal data does not process them except on instructions.",
          keyQuestions: [
            "Has the organisation conducted a risk assessment and implemented security measures proportionate to the identified risks (including pseudonymisation, encryption, resilience, and recovery)?",
            "Is there a process for regularly testing and evaluating the effectiveness of security measures?",
            "Are business continuity and disaster recovery plans in place to restore access to personal data after an incident?",
          ],
          evidenceExamples: [
            "Information security risk assessment with documented controls mapped to identified risks",
            "Penetration testing, vulnerability scanning, and security audit reports",
            "Business continuity and disaster recovery plans with tested recovery time objectives",
          ],
        },
        {
          code: "Art.33",
          title: "Notification of a personal data breach to the supervisory authority",
          level: 1,
          orderNo: 10,
          description:
            "Requires the controller to notify the competent supervisory authority of a personal data breach without undue delay and where feasible not later than 72 hours after becoming aware of it, unless the breach is unlikely to result in a risk to the rights and freedoms of natural persons. Where notification is not made within 72 hours, the reasons for delay must be provided. The notification must include: the nature of the breach including categories and approximate number of data subjects and records, the DPO or other contact point, the likely consequences of the breach, and the measures taken or proposed to address the breach and mitigate its adverse effects. The processor must notify the controller without undue delay after becoming aware of a breach.",
          keyQuestions: [
            "Does the organisation have a breach notification procedure that enables notification to the supervisory authority within 72 hours?",
            "Are all staff trained to recognise and escalate potential personal data breaches promptly to enable timely assessment?",
            "Does the breach notification procedure capture all mandatory information required by Art.33(3)?",
          ],
          evidenceExamples: [
            "Data breach response plan with defined roles, escalation procedures, and 72-hour notification timeline",
            "Breach register documenting all breaches, risk assessments, decisions on notification, and notifications made",
            "Breach notification templates containing all Art.33(3) mandatory fields",
          ],
        },
        {
          code: "Art.34",
          title: "Communication of a personal data breach to the data subject",
          level: 1,
          orderNo: 11,
          description:
            "Where a personal data breach is likely to result in a high risk to the rights and freedoms of natural persons, the controller must communicate the breach to the data subject without undue delay, in clear and plain language, describing the nature of the breach, the DPO or contact point, the likely consequences, and the measures taken or proposed. Communication is not required if the controller has implemented appropriate protection measures rendering data unintelligible (e.g., encryption), has taken subsequent measures ensuring high risk is no longer likely to materialise, or where it would involve disproportionate effort (in which case a public communication or similar measure is required).",
          keyQuestions: [
            "Does the organisation have criteria for assessing whether a breach is likely to result in high risk to individuals, triggering data subject notification?",
            "Are data subject notification templates prepared in clear, plain language with all required information?",
            "Has the organisation identified circumstances where direct notification may not be required under the Art.34(3) exemptions?",
          ],
          evidenceExamples: [
            "Breach severity assessment matrix or criteria for determining high risk to individuals",
            "Data subject breach notification template in clear, plain language",
            "Records of breach communications sent to affected data subjects or justification for not communicating",
          ],
        },
        {
          code: "Art.35",
          title: "Data protection impact assessment",
          level: 1,
          orderNo: 12,
          description:
            "Requires the controller to carry out a data protection impact assessment (DPIA) prior to processing that is likely to result in a high risk to the rights and freedoms of natural persons, taking into account the nature, scope, context, and purposes of the processing. A DPIA is required in particular for: systematic and extensive evaluation of personal aspects based on automated processing including profiling with legal or significant effects; large-scale processing of special category data or criminal offence data; and systematic monitoring of a publicly accessible area on a large scale. The DPIA must contain at least: a systematic description of the processing and purposes including legitimate interest if applicable; assessment of necessity and proportionality; assessment of risks to rights and freedoms; and measures to address the risks. The views of data subjects or their representatives should be sought where appropriate.",
          keyQuestions: [
            "Does the organisation conduct DPIAs for all processing activities likely to result in high risk, including the three mandatory categories?",
            "Does each DPIA contain all four mandatory elements: description, necessity/proportionality assessment, risk assessment, and mitigation measures?",
            "Is there a screening process to identify when a DPIA is required before new processing begins?",
          ],
          evidenceExamples: [
            "DPIA template incorporating all Art.35(7) mandatory elements",
            "Completed DPIAs for high-risk processing activities with sign-off from DPO and senior management",
            "DPIA screening/threshold assessment tool used to determine when a DPIA is required",
          ],
        },
        {
          code: "Art.36",
          title: "Prior consultation",
          level: 1,
          orderNo: 13,
          description:
            "Requires the controller to consult the supervisory authority prior to processing where a DPIA indicates that the processing would result in a high risk in the absence of measures taken by the controller to mitigate the risk. The supervisory authority must respond within eight weeks (extendable by six weeks) and may exercise its corrective powers. The controller must provide the supervisory authority with the DPIA, information about the respective responsibilities of controller and processors, the purposes and means of processing, the measures and safeguards to protect data subject rights, DPO contact details, and any other information requested.",
          keyQuestions: [
            "Does the organisation have a process to escalate to the supervisory authority where a DPIA indicates residual high risk that cannot be sufficiently mitigated?",
            "Has the organisation established criteria for determining when prior consultation is required?",
          ],
          evidenceExamples: [
            "Prior consultation procedure with escalation criteria and supporting documentation requirements",
            "Records of any prior consultations with supervisory authorities including responses received",
          ],
        },
        {
          code: "Art.37",
          title: "Designation of the data protection officer",
          level: 1,
          orderNo: 14,
          description:
            "Requires the controller and processor to designate a DPO where: processing is carried out by a public authority or body; core activities consist of processing operations requiring regular and systematic monitoring of data subjects on a large scale; or core activities consist of processing on a large scale of special category data or criminal offence data. A group of undertakings may appoint a single DPO provided they are easily accessible from each establishment. The DPO must be designated on the basis of professional qualities, expert knowledge of data protection law and practices, and ability to fulfil the tasks set out in Art.39.",
          keyQuestions: [
            "Has the organisation assessed whether it is required to designate a DPO under the mandatory criteria?",
            "Where a DPO is designated, does the individual possess the required professional qualities and expert knowledge?",
            "If a DPO is not mandatory, has the organisation considered voluntary designation?",
          ],
          evidenceExamples: [
            "DPO necessity assessment documenting evaluation against the three mandatory criteria",
            "DPO appointment letter or contract specifying qualifications and mandate",
            "DPO contact details published and communicated to the supervisory authority",
          ],
        },
        {
          code: "Art.38",
          title: "Position of the data protection officer",
          level: 1,
          orderNo: 15,
          description:
            "Requires the controller and processor to ensure that the DPO is involved properly and in a timely manner in all issues relating to the protection of personal data. The DPO must be supported with resources necessary to carry out tasks and maintain expert knowledge, and must not receive instructions regarding the exercise of tasks. The DPO shall not be dismissed or penalised for performing tasks. The DPO must report directly to the highest management level. Data subjects may contact the DPO with regard to all issues relating to processing and the exercise of their rights. The DPO is bound by secrecy or confidentiality. The DPO may fulfil other tasks and duties, provided they do not result in a conflict of interests.",
          keyQuestions: [
            "Does the DPO have direct access to the highest management level and are they involved in all data protection issues in a timely manner?",
            "Is the DPO provided with adequate resources, access to data and processing operations, and opportunities to maintain expert knowledge?",
            "Has the organisation ensured that the DPO has no conflict of interest with other roles or duties?",
          ],
          evidenceExamples: [
            "DPO reporting line documented in organisational chart showing direct access to senior management",
            "Evidence of DPO involvement in projects, incidents, and strategic decisions (e.g., meeting minutes, sign-off records)",
            "Conflict of interest assessment for the DPO role",
          ],
        },
        {
          code: "Art.39",
          title: "Tasks of the data protection officer",
          level: 1,
          orderNo: 16,
          description:
            "The DPO must have at minimum the following tasks: inform and advise the controller or processor and their employees of their obligations under GDPR and other data protection provisions; monitor compliance with GDPR including assignment of responsibilities, awareness-raising, training, and audits; provide advice on DPIAs and monitor their performance; cooperate with the supervisory authority; and act as the contact point for the supervisory authority on issues relating to processing and consultation. The DPO must have due regard to the risk associated with processing in performing tasks.",
          keyQuestions: [
            "Does the DPO perform all minimum tasks specified in Art.39, including advising, monitoring compliance, DPIA advice, and supervisory authority liaison?",
            "Is the DPO's task performance documented and does it reflect a risk-based approach?",
          ],
          evidenceExamples: [
            "DPO annual work programme or activity plan covering all Art.39 tasks",
            "DPO activity reports documenting advisory opinions, audit findings, DPIA reviews, and supervisory authority interactions",
            "Training and awareness programmes designed or overseen by the DPO",
          ],
        },
        {
          code: "Art.40",
          title: "Codes of conduct",
          level: 1,
          orderNo: 17,
          description:
            "Encourages Member States, supervisory authorities, the Board, and the Commission to encourage the drawing up of codes of conduct intended to contribute to the proper application of the GDPR, taking account of the specific features of various processing sectors and the specific needs of micro, small, and medium-sized enterprises. Codes may relate to fair and transparent processing, legitimate interests, pseudonymisation, information provided to data subjects and for exercising their rights, information provided to and protection of children, security measures, breach notification, transfers to third countries, dispute resolution, and other matters.",
          keyQuestions: [
            "Has the organisation considered adherence to an approved code of conduct relevant to its sector?",
            "If the organisation adheres to a code of conduct, is it monitored by an accredited body?",
          ],
          evidenceExamples: [
            "Assessment of available approved codes of conduct relevant to the organisation's sector",
            "Formal adherence documentation to an approved code of conduct",
          ],
        },
        {
          code: "Art.41",
          title: "Monitoring of approved codes of conduct",
          level: 1,
          orderNo: 18,
          description:
            "Requires that monitoring of compliance with a code of conduct be carried out by a body which has an appropriate level of expertise in relation to the subject matter of the code and is accredited by the competent supervisory authority. The accredited body must establish procedures for handling complaints, take appropriate action against infringements, and must inform the supervisory authority of actions taken and reasons.",
          keyQuestions: [
            "If the organisation is subject to a code of conduct, is it monitored by an accredited body as required?",
            "Does the monitoring body have appropriate expertise and procedures for complaints and enforcement?",
          ],
          evidenceExamples: [
            "Accreditation details of the monitoring body overseeing the applicable code of conduct",
            "Records of monitoring activities and any findings or corrective actions",
          ],
        },
        {
          code: "Art.42",
          title: "Certification",
          level: 1,
          orderNo: 19,
          description:
            "Encourages the establishment of data protection certification mechanisms, seals, and marks to demonstrate compliance with the GDPR by controllers and processors. Certification is voluntary and does not reduce the controller's or processor's responsibility for compliance. Certification is issued by accredited certification bodies or by the competent supervisory authority, for a maximum period of three years, and may be renewed. Certification may be withdrawn where the conditions are no longer met.",
          keyQuestions: [
            "Has the organisation pursued or considered GDPR certification to demonstrate compliance?",
            "If certified, are renewal timelines tracked and conditions for maintaining certification continuously met?",
          ],
          evidenceExamples: [
            "GDPR certification or seal issued by an accredited certification body",
            "Certification renewal tracking and evidence of ongoing compliance with certification criteria",
          ],
        },
        {
          code: "Art.43",
          title: "Certification bodies",
          level: 1,
          orderNo: 20,
          description:
            "Sets out requirements for certification bodies: they must demonstrate independence and expertise, establish procedures for issuing, reviewing, and withdrawing certification, establish procedures for handling complaints, and be accredited by the competent supervisory authority and/or the national accreditation body. Accreditation is issued for a maximum period of five years and may be renewed.",
          keyQuestions: [
            "If the organisation uses a certification body, is that body accredited by the relevant supervisory authority or national accreditation body?",
            "Does the certification body meet the independence and expertise requirements?",
          ],
          evidenceExamples: [
            "Accreditation credentials of the certification body used",
            "Due diligence records verifying the certification body's compliance with Art.43 requirements",
          ],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────
    // CHAPTER V — Transfers to Third Countries (Art. 44–49)
    // ────────────────────────────────────────────────────────────────
    {
      code: "Chap.V",
      title:
        "Chapter V: Transfers of Personal Data to Third Countries or International Organisations",
      level: 0,
      orderNo: 5,
      description:
        "Governs the conditions under which personal data may be transferred to third countries or international organisations, ensuring that the level of protection of natural persons guaranteed by the GDPR is not undermined.",
      children: [
        {
          code: "Art.44",
          title: "General principle for transfers",
          level: 1,
          orderNo: 1,
          description:
            "Establishes that any transfer of personal data to a third country or international organisation shall take place only if the conditions laid down in Chapter V are complied with by the controller and processor, including for onward transfers. All provisions of Chapter V must be applied to ensure that the level of protection of natural persons guaranteed by the GDPR is not undermined.",
          keyQuestions: [
            "Has the organisation identified all transfers of personal data to third countries or international organisations?",
            "For each transfer, has an appropriate transfer mechanism under Chapter V been identified and implemented?",
          ],
          evidenceExamples: [
            "Data transfer register or mapping documenting all international data flows with the applicable transfer mechanism",
            "Legal assessment of each transfer mechanism applied to third-country transfers",
          ],
        },
        {
          code: "Art.45",
          title: "Transfers on the basis of an adequacy decision",
          level: 1,
          orderNo: 2,
          description:
            "Permits transfer of personal data to a third country or international organisation where the Commission has decided that the third country, territory, sector, or international organisation ensures an adequate level of protection. Such transfers do not require any specific authorisation. The Commission must assess the rule of law, respect for human rights, relevant legislation, data protection rules, enforceable data subject rights, effective administrative and judicial redress, supervisory authorities, and international commitments. Adequacy decisions are subject to periodic review at least every four years.",
          keyQuestions: [
            "Does the organisation rely on adequacy decisions for any third-country transfers, and are those decisions still current and valid?",
            "Is the organisation monitoring for any changes to or revocations of adequacy decisions that affect its transfers?",
          ],
          evidenceExamples: [
            "Register of transfers relying on adequacy decisions with references to the specific Commission decision",
            "Monitoring process for tracking adequacy decision updates and revocations (e.g., Schrems II impact assessment)",
          ],
        },
        {
          code: "Art.46",
          title: "Transfers subject to appropriate safeguards",
          level: 1,
          orderNo: 3,
          description:
            "In the absence of an adequacy decision, a controller or processor may transfer personal data to a third country only if appropriate safeguards are provided and enforceable data subject rights and effective legal remedies are available. Appropriate safeguards include: a legally binding instrument between public authorities, binding corporate rules (Art.47), standard contractual clauses (SCCs) adopted by the Commission or a supervisory authority, an approved code of conduct with binding commitments from the third-country controller/processor, or an approved certification mechanism with binding commitments.",
          keyQuestions: [
            "Where no adequacy decision exists, has the organisation implemented appropriate safeguards (e.g., SCCs, BCRs) for each third-country transfer?",
            "Has the organisation conducted a transfer impact assessment (TIA) to evaluate whether the safeguards are effective in the destination country?",
            "Are supplementary measures in place where the TIA identifies that the safeguards alone are insufficient?",
          ],
          evidenceExamples: [
            "Executed standard contractual clauses (SCCs) or binding corporate rules for each transfer without adequacy",
            "Transfer impact assessments evaluating the legal framework of the destination country",
            "Supplementary technical, contractual, or organisational measures implemented where TIAs identified gaps",
          ],
        },
        {
          code: "Art.47",
          title: "Binding corporate rules",
          level: 1,
          orderNo: 4,
          description:
            "Sets out the requirements for binding corporate rules (BCRs), which must be legally binding, expressly confer enforceable rights on data subjects, and contain at minimum: the structure and contact details of the group, the data transfers covered, their legally binding nature, the application of data protection principles, data subject rights, acceptance of liability, information requirements for data subjects, tasks of the DPO, complaint procedures, mechanisms for ensuring compliance, mechanisms for reporting and recording changes, and cooperation with supervisory authorities.",
          keyQuestions: [
            "If the organisation uses BCRs for intra-group transfers, have the BCRs been approved by the competent supervisory authority?",
            "Do the BCRs contain all mandatory elements specified in Art.47(2)?",
            "Are staff within the group of undertakings trained on the BCR requirements?",
          ],
          evidenceExamples: [
            "Approved binding corporate rules with supervisory authority approval documentation",
            "BCR compliance monitoring reports within the group of undertakings",
            "Training records on BCR requirements for relevant staff across the group",
          ],
        },
        {
          code: "Art.48",
          title:
            "Transfers or disclosures not authorised by Union law",
          level: 1,
          orderNo: 5,
          description:
            "Provides that any judgment of a court or tribunal or any decision of an administrative authority of a third country requiring a controller or processor to transfer or disclose personal data may only be recognised or enforceable if based on an international agreement such as a mutual legal assistance treaty in force between the requesting third country and the Union or a Member State, without prejudice to other grounds for transfer under Chapter V.",
          keyQuestions: [
            "Does the organisation have a process for handling requests from third-country courts or authorities for disclosure of personal data?",
            "Is legal counsel involved in assessing whether a third-country request is enforceable under Art.48?",
          ],
          evidenceExamples: [
            "Policy for handling third-country government or judicial requests for personal data",
            "Legal review records for any third-country disclosure requests received",
          ],
        },
        {
          code: "Art.49",
          title: "Derogations for specific situations",
          level: 1,
          orderNo: 6,
          description:
            "In the absence of an adequacy decision or appropriate safeguards, a transfer may take place only if one of the following conditions is met: explicit consent of the data subject after being informed of the risks; the transfer is necessary for performance of a contract or pre-contractual steps at the data subject's request; the transfer is necessary for a contract in the interest of the data subject; the transfer is necessary for important reasons of public interest; the transfer is necessary for the establishment, exercise, or defence of legal claims; the transfer is necessary to protect vital interests; or the transfer is from a public register. These derogations must not be used systematically for repetitive, large-scale, or structural transfers.",
          keyQuestions: [
            "Where the organisation relies on derogations under Art.49, is such reliance limited to genuinely occasional, non-repetitive transfers?",
            "Where explicit consent is the basis for a derogation transfer, is the data subject fully informed of the specific risks arising from the absence of an adequacy decision or safeguards?",
            "Has the organisation documented the assessment justifying each derogation relied upon?",
          ],
          evidenceExamples: [
            "Register of transfers relying on Art.49 derogations with justification for each",
            "Consent forms for derogation transfers that explicitly inform data subjects of the risks",
            "Legal assessment documenting why the transfer qualifies under the specific derogation",
          ],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────
    // CHAPTER VI — Supervisory Authorities (Art. 51–59) — Key Articles
    // ────────────────────────────────────────────────────────────────
    {
      code: "Chap.VI",
      title: "Chapter VI: Independent Supervisory Authorities",
      level: 0,
      orderNo: 6,
      description:
        "Establishes the requirement for independent supervisory authorities in each Member State, their competence, powers, tasks, and conditions for independence.",
      children: [
        {
          code: "Art.51",
          title: "Supervisory authority",
          level: 1,
          orderNo: 1,
          description:
            "Requires each Member State to provide for one or more independent public authorities to be responsible for monitoring the application of the GDPR in order to protect the fundamental rights and freedoms of natural persons in relation to processing and to facilitate the free flow of personal data within the Union.",
          keyQuestions: [
            "Has the organisation identified the relevant supervisory authority or authorities in each Member State where it operates?",
            "Are contact details for the lead supervisory authority documented and accessible to relevant staff?",
          ],
          evidenceExamples: [
            "Register of applicable supervisory authorities by jurisdiction",
            "Internal reference document with contact details and filing procedures for the lead supervisory authority",
          ],
        },
        {
          code: "Art.55",
          title: "Competence",
          level: 1,
          orderNo: 2,
          description:
            "Each supervisory authority is competent for the performance of the tasks assigned to and the exercise of the powers conferred on it in accordance with the GDPR on the territory of its own Member State. Processing by public authorities or bodies is subject to the supervisory authority of the Member State concerned.",
          keyQuestions: [
            "Has the organisation determined which supervisory authority is competent for each of its processing activities based on establishment location?",
            "Is there clarity on which supervisory authority acts as lead authority for cross-border processing?",
          ],
          evidenceExamples: [
            "Legal assessment identifying the competent supervisory authority for each processing location",
            "Lead supervisory authority determination documentation for cross-border processing",
          ],
        },
        {
          code: "Art.56",
          title: "Competence of the lead supervisory authority",
          level: 1,
          orderNo: 3,
          description:
            "The supervisory authority of the main establishment or single establishment of the controller or processor is competent to act as lead supervisory authority for cross-border processing. The lead authority is the sole interlocutor of the controller or processor for cross-border processing, though any supervisory authority competent on its territory may handle a local complaint or infringement. Where a supervisory authority not designated as lead considers itself competent, it must inform the lead authority under the consistency mechanism.",
          keyQuestions: [
            "Has the organisation identified its lead supervisory authority based on its main establishment?",
            "Does the organisation understand the one-stop-shop mechanism and how it applies to its cross-border processing?",
          ],
          evidenceExamples: [
            "Determination of main establishment and lead supervisory authority with supporting rationale",
            "Cross-border processing activities list with lead authority identified for each",
          ],
        },
        {
          code: "Art.58",
          title: "Powers",
          level: 1,
          orderNo: 4,
          description:
            "Confers three categories of powers on supervisory authorities. Investigative powers include ordering the controller and processor to provide information, carrying out investigations including data protection audits, obtaining access to premises and data. Corrective powers include issuing warnings, reprimands, ordering compliance, ordering communication of breaches to data subjects, imposing temporary or definitive bans on processing, ordering rectification or erasure, suspending data flows to third countries, and imposing administrative fines. Advisory and authorisation powers include advising on legislative measures, issuing opinions on processing, authorising processing or contractual clauses, approving BCRs, and contributing to Board activities.",
          keyQuestions: [
            "Is the organisation prepared to respond to the full range of supervisory authority investigative powers, including audits and access to premises?",
            "Does the organisation understand the corrective powers available to supervisory authorities and the potential consequences of non-compliance?",
          ],
          evidenceExamples: [
            "Regulatory response procedure detailing how to handle supervisory authority audits, information requests, and corrective orders",
            "Risk assessment considering potential supervisory authority corrective actions and their operational impact",
          ],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────
    // CHAPTER VII — Cooperation and Consistency (Art. 60–76) — Key Articles
    // ────────────────────────────────────────────────────────────────
    {
      code: "Chap.VII",
      title: "Chapter VII: Cooperation and Consistency",
      level: 0,
      orderNo: 7,
      description:
        "Establishes the mechanisms for cooperation between supervisory authorities, mutual assistance, joint operations, the consistency mechanism, and the role of the European Data Protection Board.",
      children: [
        {
          code: "Art.60",
          title:
            "Cooperation between the lead supervisory authority and the other supervisory authorities concerned",
          level: 1,
          orderNo: 1,
          description:
            "The lead supervisory authority must cooperate with the other supervisory authorities concerned, including sharing relevant information and seeking mutual views. The lead authority must submit a draft decision to the concerned authorities, who may object within a specified period. The lead authority must take due account of relevant objections and may adopt a revised draft decision. Where the lead authority follows the objection, it issues a revised decision; where it does not, the matter is referred to the consistency mechanism.",
          keyQuestions: [
            "Is the organisation aware of how the cooperation mechanism between supervisory authorities may affect cross-border investigations or decisions concerning its processing?",
            "Does the organisation monitor decisions of the lead supervisory authority and concerned authorities that may impact its operations?",
          ],
          evidenceExamples: [
            "Monitoring log for supervisory authority decisions affecting the organisation",
            "Internal briefing on the cooperation and consistency mechanism as it applies to the organisation",
          ],
        },
        {
          code: "Art.65",
          title: "Dispute resolution by the Board",
          level: 1,
          orderNo: 2,
          description:
            "The European Data Protection Board issues binding decisions to resolve disputes between supervisory authorities, particularly where a concerned supervisory authority has raised a relevant and reasoned objection to a draft decision and the lead authority has not followed the objection, or where there is conflicting views on which supervisory authority is competent for the main establishment. The Board adopts its decision by a two-thirds majority of its members within one month (extendable by one month).",
          keyQuestions: [
            "Does the organisation monitor EDPB binding decisions that may establish precedents or interpretations relevant to its processing?",
            "Is the organisation prepared for potential additional timelines arising from EDPB dispute resolution processes?",
          ],
          evidenceExamples: [
            "EDPB decision monitoring log or subscription to EDPB publications",
            "Legal analysis of relevant EDPB binding decisions and their impact on the organisation's processing",
          ],
        },
        {
          code: "Art.68",
          title: "European Data Protection Board",
          level: 1,
          orderNo: 3,
          description:
            "Establishes the European Data Protection Board (EDPB) as a body of the Union with legal personality, comprising the head of one supervisory authority of each Member State and the European Data Protection Supervisor. The Board acts independently and ensures consistent application of the GDPR, advises the Commission, and issues guidelines, recommendations, and best practices.",
          keyQuestions: [
            "Does the organisation monitor EDPB guidelines, recommendations, and best practices relevant to its processing activities?",
            "Are EDPB guidance documents incorporated into the organisation's compliance assessments?",
          ],
          evidenceExamples: [
            "Register of applicable EDPB guidelines and recommendations with compliance status",
            "Evidence of EDPB guidance being incorporated into policies, DPIAs, and compliance assessments",
          ],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────
    // CHAPTER VIII — Remedies, Liability and Penalties (Art. 77–84)
    // ────────────────────────────────────────────────────────────────
    {
      code: "Chap.VIII",
      title: "Chapter VIII: Remedies, Liability and Penalties",
      level: 0,
      orderNo: 8,
      description:
        "Establishes the rights of data subjects to lodge complaints, seek judicial remedies, and receive compensation for GDPR violations, as well as the administrative fines and penalties framework.",
      children: [
        {
          code: "Art.77",
          title: "Right to lodge a complaint with a supervisory authority",
          level: 1,
          orderNo: 1,
          description:
            "Every data subject has the right to lodge a complaint with a supervisory authority, in particular in the Member State of their habitual residence, place of work, or place of the alleged infringement, if they consider that the processing of personal data relating to them infringes the GDPR. The supervisory authority must inform the complainant on the progress and outcome of the complaint including the possibility of a judicial remedy.",
          keyQuestions: [
            "Does the organisation inform data subjects of their right to lodge a complaint with a supervisory authority?",
            "Is there a process for responding to complaints forwarded by a supervisory authority?",
          ],
          evidenceExamples: [
            "Privacy notices and data subject communications referencing the right to complain to a supervisory authority",
            "Complaint handling procedure covering supervisory authority-referred complaints",
          ],
        },
        {
          code: "Art.78",
          title: "Right to an effective judicial remedy against a supervisory authority",
          level: 1,
          orderNo: 2,
          description:
            "Each natural or legal person has the right to an effective judicial remedy against a legally binding decision of a supervisory authority concerning them. Each data subject has the right to a judicial remedy where the supervisory authority does not handle a complaint or does not inform the data subject within three months on the progress or outcome of the complaint. Proceedings against a supervisory authority must be brought before the courts of the Member State where the supervisory authority is established.",
          keyQuestions: [
            "Is the organisation prepared for the possibility of judicial proceedings arising from supervisory authority decisions?",
            "Does the organisation understand the forum requirements for challenging supervisory authority decisions?",
          ],
          evidenceExamples: [
            "Legal contingency planning for potential judicial proceedings arising from supervisory authority decisions",
            "Legal counsel engagement for monitoring and responding to supervisory authority proceedings",
          ],
        },
        {
          code: "Art.79",
          title: "Right to an effective judicial remedy against a controller or processor",
          level: 1,
          orderNo: 3,
          description:
            "Each data subject has the right to an effective judicial remedy where they consider that their rights under the GDPR have been infringed as a result of processing of their personal data in non-compliance with the GDPR. Proceedings must be brought before the courts of the Member State where the controller or processor has an establishment, or where the data subject has their habitual residence, unless the controller or processor is a public authority acting in the exercise of its public powers.",
          keyQuestions: [
            "Is the organisation aware of the jurisdictions in which data subjects may bring judicial proceedings against it?",
            "Does the organisation have legal counsel available to respond to data subject litigation?",
          ],
          evidenceExamples: [
            "Jurisdictional risk assessment identifying Member States where litigation may be brought",
            "Litigation preparedness plan with designated legal counsel for GDPR claims",
          ],
        },
        {
          code: "Art.80",
          title: "Representation of data subjects",
          level: 1,
          orderNo: 4,
          description:
            "The data subject has the right to mandate a not-for-profit body, organisation, or association which has been properly constituted, has statutory objectives in the public interest, and is active in the field of data protection, to lodge a complaint, exercise the right to judicial remedies against supervisory authorities and controllers/processors, and exercise the right to compensation on their behalf. Member States may provide that such a body may also act independently of a data subject's mandate.",
          keyQuestions: [
            "Is the organisation aware that data subjects may be represented by qualified not-for-profit organisations in complaints and litigation?",
            "Does the organisation's complaint handling process accommodate complaints received from data subject representatives?",
          ],
          evidenceExamples: [
            "Updated complaint handling procedure recognising representative actions by not-for-profit bodies",
            "Legal briefing on representative action risks in operating jurisdictions",
          ],
        },
        {
          code: "Art.81",
          title: "Suspension of proceedings",
          level: 1,
          orderNo: 5,
          description:
            "Where a competent court of a Member State has information that proceedings concerning the same subject matter as regards processing by the same controller or processor are pending in a court in another Member State, it must contact that court to confirm the existence of such proceedings. Where such proceedings are pending in another Member State, any competent court other than the court first seized may suspend its proceedings or decline jurisdiction.",
          keyQuestions: [
            "Is the organisation's legal team aware of the possibility of parallel proceedings across Member States and the rules on suspension?",
            "Does the organisation track all ongoing proceedings to identify potential parallel actions?",
          ],
          evidenceExamples: [
            "Litigation tracking register covering all GDPR-related proceedings across jurisdictions",
            "Legal procedure for identifying and addressing parallel proceedings in multiple Member States",
          ],
        },
        {
          code: "Art.82",
          title: "Right to compensation and liability",
          level: 1,
          orderNo: 6,
          description:
            "Any person who has suffered material or non-material damage as a result of a GDPR infringement has the right to receive compensation from the controller or processor. The controller involved in processing is liable for damage caused by processing which infringes the GDPR. A processor is liable only where it has not complied with processor-specific GDPR obligations or has acted outside or contrary to the controller's instructions. A controller or processor is exempt from liability if it proves that it is not in any way responsible for the event giving rise to the damage. Where multiple controllers or processors are involved in the same processing, each is liable for the entire damage, with the right to reclaim a proportionate share from co-liable parties.",
          keyQuestions: [
            "Has the organisation assessed its potential exposure to compensation claims for both material and non-material damage?",
            "Are contractual indemnification and liability provisions in place with processors and joint controllers to allocate financial liability?",
            "Does the organisation have adequate insurance coverage for GDPR-related compensation claims?",
          ],
          evidenceExamples: [
            "Liability risk assessment considering compensation exposure for GDPR breaches",
            "Data processing agreements and joint controller agreements with liability allocation clauses",
            "Cyber/data protection liability insurance policy covering GDPR compensation claims",
          ],
        },
        {
          code: "Art.83",
          title: "General conditions for imposing administrative fines",
          level: 1,
          orderNo: 7,
          description:
            "Each supervisory authority must ensure that administrative fines are effective, proportionate, and dissuasive. Fines are imposed in addition to or instead of other corrective measures. Factors for determining fines include: nature, gravity, and duration of the infringement; intentional or negligent character; actions taken to mitigate damage; degree of responsibility; previous infringements; degree of cooperation; categories of data affected; manner in which the infringement became known; compliance with previous measures; adherence to codes of conduct or certification mechanisms; and any other aggravating or mitigating factors. Maximum fines: up to EUR 10,000,000 or 2% of total worldwide annual turnover for infringements of controller/processor obligations (Arts.8, 11, 25-39, 42-43); up to EUR 20,000,000 or 4% of total worldwide annual turnover for infringements of basic principles, data subject rights, international transfer provisions, Member State law provisions, or non-compliance with supervisory authority orders.",
          keyQuestions: [
            "Has the organisation assessed its maximum fine exposure based on global annual turnover?",
            "Are mitigating factors such as cooperation, remediation measures, codes of conduct adherence, and certification being actively developed to reduce potential fine severity?",
            "Does the organisation's risk register reflect the financial exposure from administrative fines?",
          ],
          evidenceExamples: [
            "Financial exposure analysis calculating maximum potential fines based on global turnover",
            "Evidence of mitigating measures: cooperation procedures, incident remediation, certifications, code of conduct adherence",
            "Risk register entries for GDPR fine exposure with likelihood and impact assessments",
          ],
        },
        {
          code: "Art.84",
          title: "Penalties",
          level: 1,
          orderNo: 8,
          description:
            "Member States must lay down rules on other penalties applicable to infringements of the GDPR, in particular for infringements not subject to administrative fines under Art.83, and must take all measures necessary to ensure that they are implemented. Such penalties must be effective, proportionate, and dissuasive.",
          keyQuestions: [
            "Has the organisation identified any Member State-specific penalties (beyond administrative fines) applicable to GDPR infringements in its operating jurisdictions?",
            "Are criminal law implications of GDPR non-compliance understood in each applicable jurisdiction?",
          ],
          evidenceExamples: [
            "Jurisdictional analysis of Member State penalties beyond Art.83 fines (e.g., criminal sanctions)",
            "Legal briefing on national implementing legislation penalties in jurisdictions where the organisation operates",
          ],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────
    // CHAPTER IX — Specific Processing Situations (Art. 85–91) — Key Articles
    // ────────────────────────────────────────────────────────────────
    {
      code: "Chap.IX",
      title:
        "Chapter IX: Provisions Relating to Specific Processing Situations",
      level: 0,
      orderNo: 9,
      description:
        "Addresses specific processing situations where Member States may provide exemptions or additional rules, including freedom of expression, public access to official documents, employment, archiving, and churches.",
      children: [
        {
          code: "Art.85",
          title: "Processing and freedom of expression and information",
          level: 1,
          orderNo: 1,
          description:
            "Requires Member States to reconcile the right to the protection of personal data with the right to freedom of expression and information by law, including processing for journalistic, academic, artistic, or literary expression purposes. Member States must provide exemptions or derogations from specific GDPR provisions for processing carried out for journalistic or academic, artistic, or literary expression purposes if they are necessary to reconcile data protection with freedom of expression.",
          keyQuestions: [
            "Does the organisation process personal data for journalistic, academic, artistic, or literary purposes, and if so, has it assessed applicable Member State exemptions?",
            "Are applicable Member State-specific derogations documented and applied appropriately?",
          ],
          evidenceExamples: [
            "Assessment of processing activities qualifying for freedom of expression exemptions",
            "Legal analysis of applicable Member State provisions implementing Art.85",
          ],
        },
        {
          code: "Art.87",
          title: "Processing of the national identification number",
          level: 1,
          orderNo: 2,
          description:
            "Member States may further determine the specific conditions for the processing of a national identification number or any other identifier of general application. In such cases, the national identification number shall be used only under appropriate safeguards for the rights and freedoms of the data subject pursuant to the GDPR.",
          keyQuestions: [
            "Does the organisation process national identification numbers, and if so, in compliance with applicable Member State-specific conditions?",
            "Are appropriate safeguards in place for processing national identification numbers?",
          ],
          evidenceExamples: [
            "Inventory of processing activities involving national identification numbers with Member State-specific legal basis",
            "Safeguards documentation for national identification number processing (e.g., access controls, encryption, purpose limitation)",
          ],
        },
        {
          code: "Art.88",
          title: "Processing in the context of employment",
          level: 1,
          orderNo: 3,
          description:
            "Member States may, by law or by collective agreements, provide for more specific rules to ensure the protection of the rights and freedoms of data subjects in respect of the processing of employees' personal data in the employment context, in particular for recruitment, performance of the employment contract, management and planning of work, equality and diversity, health and safety, exercise and enjoyment of individual or collective rights, and termination of the employment relationship. Those rules must include suitable and specific measures to safeguard the data subject's human dignity, legitimate interests, and fundamental rights.",
          keyQuestions: [
            "Has the organisation identified Member State-specific employment data processing rules and collective agreements that impose additional requirements?",
            "Are suitable safeguards in place for employee data processing covering recruitment, employment management, monitoring, and termination?",
            "Has the organisation assessed the lawful basis for employee monitoring and workplace surveillance activities?",
          ],
          evidenceExamples: [
            "Employee privacy notice addressing all categories of employment data processing",
            "Assessment of Member State employment data protection laws and collective agreements",
            "Employee monitoring policy with documented safeguards, lawful basis, and proportionality assessment",
          ],
        },
        {
          code: "Art.89",
          title:
            "Safeguards and derogations relating to processing for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes",
          level: 1,
          orderNo: 4,
          description:
            "Processing for archiving in the public interest, scientific or historical research, or statistical purposes is subject to appropriate safeguards including technical and organisational measures, in particular to ensure respect for data minimisation (pseudonymisation where possible). Member States may provide derogations from Arts.15, 16, 18, and 21 where those rights are likely to render impossible or seriously impair the achievement of the specific purposes, provided safeguards are in place.",
          keyQuestions: [
            "If the organisation processes personal data for archiving, research, or statistical purposes, has it implemented Art.89 safeguards including pseudonymisation?",
            "Has the organisation documented and justified any reliance on derogations from data subject rights under Art.89?",
          ],
          evidenceExamples: [
            "Research data management plan implementing pseudonymisation and other Art.89 safeguards",
            "Legal justification for derogations from data subject rights under Art.89(2) or (3)",
          ],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────
    // CHAPTER X — Delegated and Implementing Acts (Art. 92–93)
    // ────────────────────────────────────────────────────────────────
    {
      code: "Chap.X",
      title: "Chapter X: Delegated Acts and Implementing Acts",
      level: 0,
      orderNo: 10,
      description:
        "Confers delegated and implementing powers on the Commission for specific provisions of the GDPR, including adoption of standard contractual clauses, adequacy decisions, and technical standards.",
      children: [
        {
          code: "Art.92",
          title: "Exercise of the delegation",
          level: 1,
          orderNo: 1,
          description:
            "The power to adopt delegated acts is conferred on the Commission subject to conditions in this Article. The delegation of power may be revoked at any time by the European Parliament or the Council. Delegated acts enter into force only if no objection has been expressed by the European Parliament or the Council within two months (extendable by two months) of notification.",
          keyQuestions: [
            "Does the organisation monitor delegated acts adopted by the Commission under the GDPR that may affect its processing?",
            "Is there a process for assessing the impact of new delegated acts on the organisation's compliance posture?",
          ],
          evidenceExamples: [
            "Regulatory monitoring process for EU delegated acts under GDPR",
            "Impact assessment records for delegated acts adopted since GDPR came into force",
          ],
        },
        {
          code: "Art.93",
          title: "Committee procedure",
          level: 1,
          orderNo: 2,
          description:
            "The Commission is assisted by a committee within the meaning of Regulation (EU) No 182/2011. Where reference is made to this Article, the examination procedure applies for implementing acts adopted by the Commission.",
          keyQuestions: [
            "Does the organisation monitor implementing acts adopted under the committee procedure that may affect its GDPR compliance?",
            "Is the organisation aware of how the committee procedure may result in new binding requirements?",
          ],
          evidenceExamples: [
            "Regulatory monitoring process covering implementing acts under the GDPR committee procedure",
            "Records of implementing acts reviewed and their impact on organisational compliance",
          ],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────
    // CHAPTER XI — Final Provisions (Art. 94–99) — Key Articles
    // ────────────────────────────────────────────────────────────────
    {
      code: "Chap.XI",
      title: "Chapter XI: Final Provisions",
      level: 0,
      orderNo: 11,
      description:
        "Contains transitional and final provisions including the repeal of Directive 95/46/EC, the relationship with the ePrivacy Directive, entry into force, and application date.",
      children: [
        {
          code: "Art.94",
          title: "Repeal of Directive 95/46/EC",
          level: 1,
          orderNo: 1,
          description:
            "Directive 95/46/EC is repealed with effect from 25 May 2018. References to the repealed Directive shall be construed as references to the GDPR. The Working Party established by Article 29 of Directive 95/46/EC is succeeded by the European Data Protection Board established by the GDPR.",
          keyQuestions: [
            "Has the organisation updated all internal references, policies, and contracts from Directive 95/46/EC to the GDPR?",
            "Are any legacy compliance frameworks still referencing the repealed Directive rather than the GDPR?",
          ],
          evidenceExamples: [
            "Policy and contract audit confirming all references updated from Directive 95/46/EC to the GDPR",
            "Compliance framework review showing alignment with GDPR rather than the repealed Directive",
          ],
        },
        {
          code: "Art.95",
          title: "Relationship with Directive 2002/58/EC",
          level: 1,
          orderNo: 2,
          description:
            "The GDPR does not impose additional obligations on natural or legal persons in relation to processing in connection with the provision of publicly available electronic communications services in public communication networks in the Union in relation to matters for which they are subject to specific obligations with the same objective set out in Directive 2002/58/EC (ePrivacy Directive).",
          keyQuestions: [
            "Has the organisation assessed the interplay between the GDPR and the ePrivacy Directive for its electronic communications and cookie/tracking practices?",
            "Where the ePrivacy Directive applies, does the organisation comply with both the GDPR and ePrivacy requirements without conflict?",
          ],
          evidenceExamples: [
            "Legal assessment of the GDPR and ePrivacy Directive interplay for the organisation's processing activities",
            "Cookie and tracking consent mechanism compliant with both ePrivacy Directive and GDPR",
          ],
        },
        {
          code: "Art.99",
          title: "Entry into force and application",
          level: 1,
          orderNo: 3,
          description:
            "The GDPR entered into force on the twentieth day following publication in the Official Journal of the European Union (24 May 2016) and has applied since 25 May 2018. The Regulation is binding in its entirety and directly applicable in all Member States.",
          keyQuestions: [
            "Has the organisation been in continuous compliance since the GDPR application date of 25 May 2018?",
            "Does the organisation understand that the GDPR is directly applicable without the need for national transposition?",
          ],
          evidenceExamples: [
            "GDPR compliance programme documentation showing implementation timeline from or before 25 May 2018",
            "Board or management records confirming awareness of direct applicability and continuous compliance obligations",
          ],
        },
      ],
    },
  ],
};
