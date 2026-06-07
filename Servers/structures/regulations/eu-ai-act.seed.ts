import { RegulationSeed } from "./types";

export const EU_AI_ACT_SEED: RegulationSeed = {
  code: "EU_AI_ACT",
  name: "EU Artificial Intelligence Act",
  type: "regulation",
  category: "ai_governance",
  jurisdiction: "EU",
  issuer: "European Parliament",
  version: "2024/1689",
  description:
    "The EU AI Act is the world's first comprehensive AI regulation, establishing a risk-based framework for AI systems placed on the EU market. It classifies AI systems by risk level (unacceptable, high, limited, minimal) and imposes corresponding obligations on providers and deployers, including conformity assessments, transparency requirements, governance structures, and human oversight.",
  effectiveDate: "2026-08-02",
  requirements: [
    {
      code: "T1",
      title: "Risk Classification and Scope",
      level: 0, orderNo: 1,
      children: [
        { code: "T1.1", title: "Classify AI systems by risk level", level: 1, orderNo: 1, description: "Establish and document a process to classify all AI systems as unacceptable risk, high-risk, limited risk, or minimal risk based on Annex I and II criteria." },
        { code: "T1.2", title: "Identify prohibited practices", level: 1, orderNo: 2, description: "Identify and ensure no AI systems deploy prohibited practices including social scoring, real-time biometric surveillance, manipulative techniques, and predictive policing based solely on profiling." },
        { code: "T1.3", title: "Maintain AI system inventory", level: 1, orderNo: 3, description: "Maintain a comprehensive inventory of all AI systems deployed, including classification, purpose, data sources, and deployment context." },
        { code: "T1.4", title: "Register high-risk AI systems", level: 1, orderNo: 4, description: "Register all high-risk AI systems in the EU database before placing on the market, with required documentation." },
      ],
    },
    {
      code: "T2",
      title: "Governance and Organizational Measures",
      level: 0, orderNo: 2,
      children: [
        { code: "T2.1", title: "Establish AI governance framework", level: 1, orderNo: 1, description: "Designate and empower an AI governance body or officer responsible for AI Act compliance, risk management, and oversight." },
        { code: "T2.2", title: "Implement AI risk management system", level: 1, orderNo: 2, description: "Establish a continuous, iterative risk management process covering the entire AI system lifecycle from design to post-market monitoring." },
        { code: "T2.3", title: "Develop AI policies and procedures", level: 1, orderNo: 3, description: "Create and maintain documented policies for AI development, deployment, use, and monitoring aligned with EU AI Act requirements." },
        { code: "T2.4", title: "Appoint EU representative (non-EU providers)", level: 1, orderNo: 4, description: "If established outside the EU, designate a written EU representative responsible for compliance obligations." },
        { code: "T2.5", title: "Notify competent authorities", level: 1, orderNo: 5, description: "Notify relevant national competent authorities of AI system deployments as required by member state implementation." },
      ],
    },
    {
      code: "T3",
      title: "High-Risk AI System Requirements",
      level: 0, orderNo: 3,
      children: [
        { code: "T3.1", title: "Establish risk management system for high-risk AI", level: 1, orderNo: 1, description: "Implement a risk management system for each high-risk AI system, including identification, analysis, evaluation, and mitigation of known and foreseeable risks throughout lifecycle." },
        { code: "T3.2", title: "Maintain technical documentation", level: 1, orderNo: 2, description: "Prepare and maintain comprehensive technical documentation including general description, design specifications, training data, performance metrics, and risk management results." },
        { code: "T3.3", title: "Implement record-keeping and logging", level: 1, orderNo: 3, description: "Build automatic logging capabilities to record events during high-risk AI system operation, including input data, predictions, decisions, and human intervention." },
        { code: "T3.4", title: "Ensure transparency and provision of information", level: 1, orderNo: 4, description: "Provide clear documentation to deployers on system capabilities, limitations, performance characteristics, and intended purpose." },
        { code: "T3.5", title: "Implement human oversight", level: 1, orderNo: 5, description: "Design and implement human oversight mechanisms including the ability to override, stop, or ignore the system's output." },
        { code: "T3.6", title: "Ensure accuracy, robustness, and cybersecurity", level: 1, orderNo: 6, description: "Achieve appropriate levels of accuracy, robustness, and cybersecurity across the intended lifecycle, including resilience to errors, attacks, and manipulation." },
      ],
    },
    {
      code: "T4",
      title: "Data and Data Governance",
      level: 0, orderNo: 4,
      children: [
        { code: "T4.1", title: "Govern training, validation, and test data", level: 1, orderNo: 1, description: "Implement data governance practices including examination of data sources, bias assessment, appropriateness, relevance, representativeness, and completeness." },
        { code: "T4.2", title: "Mitigate bias in AI systems", level: 1, orderNo: 2, description: "Detect and mitigate biases in training data that could cause harm or prohibited discrimination, particularly for high-risk systems." },
        { code: "T4.3", title: "Ensure data quality for high-risk AI", level: 1, orderNo: 3, description: "Ensure training, validation, and test datasets are relevant, representative, and free from errors to the greatest extent possible." },
        { code: "T4.4", title: "Document data provenance", level: 1, orderNo: 4, description: "Document the origin, collection methods, labeling procedures, and processing steps for all datasets used to train AI systems." },
        { code: "T4.5", title: "Manage special categories of data", level: 1, orderNo: 5, description: "Establish safeguards for the use of special categories of personal data in bias detection and correction." },
      ],
    },
    {
      code: "T5",
      title: "Transparency and Accountability",
      level: 0, orderNo: 5,
      children: [
        { code: "T5.1", title: "Disclose AI interaction", level: 1, orderNo: 1, description: "Ensure individuals are informed that they are interacting with an AI system (chatbots, voice assistants, etc.) unless obvious from context." },
        { code: "T5.2", title: "Label AI-generated content", level: 1, orderNo: 2, description: "Clearly and conspicuously label AI-generated or manipulated content (deepfakes, synthetic media) as artificially generated." },
        { code: "T5.3", title: "Document intended purpose", level: 1, orderNo: 3, description: "Document and communicate the intended purpose, deployment context, and geographic scope of each AI system." },
        { code: "T5.4", title: "Report serious incidents", level: 1, orderNo: 4, description: "Establish procedures to report serious incidents and malfunctions to relevant national authorities within required timeframes." },
        { code: "T5.5", title: "Conformity assessment for high-risk AI", level: 1, orderNo: 5, description: "Ensure high-risk AI systems undergo conformity assessment procedures before market placement, involving notified bodies where required." },
        { code: "T5.6", title: "Affix CE marking", level: 1, orderNo: 6, description: "Affix CE marking of conformity to high-risk AI systems after successful conformity assessment." },
      ],
    },
    {
      code: "T6",
      title: "Post-Market Monitoring and Corrective Actions",
      level: 0, orderNo: 6,
      children: [
        { code: "T6.1", title: "Establish post-market monitoring system", level: 1, orderNo: 1, description: "Implement a post-market monitoring system to actively collect, document, and analyze performance data throughout the AI system lifecycle." },
        { code: "T6.2", title: "Take corrective actions", level: 1, orderNo: 2, description: "Implement corrective actions when systemic non-compliance or significant risks are identified, including recalls and withdrawals." },
        { code: "T6.3", title: "Report to authorities on corrective actions", level: 1, orderNo: 3, description: "Report corrective actions and non-compliance to national competent authorities and notified bodies as required." },
        { code: "T6.4", title: "Periodic review of classifications", level: 1, orderNo: 4, description: "Periodically review AI system risk classifications as the system evolves, is updated, or is deployed in new contexts." },
        { code: "T6.5", title: "Maintain compliance documentation for 10 years", level: 1, orderNo: 5, description: "Retain all technical documentation, conformity assessments, and compliance records for at least 10 years after market placement." },
      ],
    },
    {
      code: "T7",
      title: "General-Purpose AI and Foundation Models",
      level: 0, orderNo: 7,
      children: [
        { code: "T7.1", title: "Document GPAI model capabilities", level: 1, orderNo: 1, description: "Document and disclose capabilities, limitations, and risks of general-purpose AI (GPAI) models including foundation and frontier models." },
        { code: "T7.2", title: "Implement copyright policy for GPAI", level: 1, orderNo: 2, description: "Establish and publish a policy respecting Union copyright law for training data used in GPAI models." },
        { code: "T7.3", title: "Conduct systemic risk assessment", level: 1, orderNo: 3, description: "For GPAI models with systemic risk (trained with >10^25 FLOPS), conduct model evaluations and adversarial testing." },
        { code: "T7.4", title: "Implement model safety measures", level: 1, orderNo: 4, description: "Implement state-of-the-art safety measures including red-teaming, model alignment, and capability assessments." },
        { code: "T7.5", title: "Report energy consumption", level: 1, orderNo: 5, description: "Document and report known and estimated energy consumption of GPAI model training and inference." },
      ],
    },
    {
      code: "T8",
      title: "Penalties, Enforcement, and Access to Justice",
      level: 0, orderNo: 8,
      children: [
        { code: "T8.1", title: "Understand applicable penalties", level: 1, orderNo: 1, description: "Document awareness of potential penalties: up to 35M EUR or 7% global turnover for prohibited practices, 15M EUR or 3% for other violations." },
        { code: "T8.2", title: "Cooperate with competent authorities", level: 1, orderNo: 2, description: "Cooperate fully with national competent authorities and the European AI Board during investigations and inspections." },
        { code: "T8.3", title: "Provide right to explanation", level: 1, orderNo: 3, description: "Ensure affected persons can request and receive meaningful explanations of AI system decisions affecting them." },
        { code: "T8.4", title: "Ensure access to redress", level: 1, orderNo: 4, description: "Establish mechanisms for individuals to file complaints about AI system decisions and receive remedy." },
      ],
    },
  ],
};
