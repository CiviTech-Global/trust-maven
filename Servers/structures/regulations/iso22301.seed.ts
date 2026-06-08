import { RegulationSeed } from "./types";

export const ISO22301_SEED: RegulationSeed = {
  code: "ISO_22301",
  name: "ISO 22301:2019",
  type: "standard",
  category: "business_continuity",
  jurisdiction: "International",
  issuer: "ISO/IEC",
  version: "2019",
  description:
    "Business Continuity Management Systems (BCMS) standard providing a framework for protecting against, preparing for, responding to, and recovering from disruptive incidents.",
  effectiveDate: "2019-10-31",
  requirements: [
    {
      code: "BC.1",
      title: "BCMS Context and Leadership",
      level: 0, orderNo: 1,
      children: [
        { code: "BC.1.1", title: "Understanding organizational context", level: 1, orderNo: 1, description: "Determine external and internal issues that affect the BCMS, including legal, regulatory, technological, and stakeholder factors." },
        { code: "BC.1.2", title: "Determining BCMS scope", level: 1, orderNo: 2, description: "Determine the boundaries and applicability of the BCMS considering organizational activities, functions, services, and dependencies." },
        { code: "BC.1.3", title: "Leadership and commitment", level: 1, orderNo: 3, description: "Top management shall demonstrate leadership and commitment for the BCMS by ensuring policy and objectives are established." },
        { code: "BC.1.4", title: "Business continuity policy", level: 1, orderNo: 4, description: "Establish a business continuity policy appropriate to the organization's purpose that includes commitment to satisfy applicable requirements." },
        { code: "BC.1.5", title: "Roles, responsibilities and authorities", level: 1, orderNo: 5, description: "Assign and communicate BCMS roles, responsibilities, and authorities including a management representative for BCMS oversight." },
      ],
    },
    {
      code: "BC.2",
      title: "BCMS Planning",
      level: 0, orderNo: 2,
      children: [
        { code: "BC.2.1", title: "Risk assessment and treatment", level: 1, orderNo: 1, description: "Define and apply a risk assessment process to identify, analyze, and evaluate risks of disruptive incidents affecting the BCMS." },
        { code: "BC.2.2", title: "Business impact analysis", level: 1, orderNo: 2, description: "Conduct business impact analysis to identify time-critical activities, assess impacts over time, and determine resource requirements." },
        { code: "BC.2.3", title: "BCMS objectives and planning", level: 1, orderNo: 3, description: "Establish business continuity objectives at relevant functions and levels consistent with the business continuity policy." },
        { code: "BC.2.4", title: "Determining continuity requirements", level: 1, orderNo: 4, description: "Determine minimum acceptable levels of products and services during a disruption including recovery time and recovery point objectives." },
        { code: "BC.2.5", title: "Legal and regulatory requirements", level: 1, orderNo: 5, description: "Identify and assess legal, regulatory, and contractual obligations applicable to business continuity and recovery." },
      ],
    },
    {
      code: "BC.3",
      title: "BCMS Support and Operation",
      level: 0, orderNo: 3,
      children: [
        { code: "BC.3.1", title: "BCMS resources and competence", level: 1, orderNo: 1, description: "Provide adequate resources and ensure personnel performing work affecting BCMS performance are competent." },
        { code: "BC.3.2", title: "Business continuity awareness", level: 1, orderNo: 2, description: "Ensure personnel are aware of the business continuity policy, their role in BCMS effectiveness, and implications of non-conformity." },
        { code: "BC.3.3", title: "Internal and external communication", level: 1, orderNo: 3, description: "Establish communication procedures for internal and external stakeholders during disruptive incidents and normal operations." },
        { code: "BC.3.4", title: "Documented information control", level: 1, orderNo: 4, description: "Maintain documented information required for BCMS effectiveness including plans, procedures, risk assessments, and BIA results." },
      ],
    },
    {
      code: "BC.4",
      title: "Business Continuity Strategy and Plans",
      level: 0, orderNo: 4,
      children: [
        { code: "BC.4.1", title: "Determine business continuity strategies", level: 1, orderNo: 1, description: "Select appropriate strategies to protect prioritized activities and ensure continuity or recovery within required timeframes." },
        { code: "BC.4.2", title: "Establish business continuity procedures", level: 1, orderNo: 2, description: "Develop documented procedures for managing disruptive events including activation, communication, response, and recovery phases." },
        { code: "BC.4.3", title: "Incident response structure", level: 1, orderNo: 3, description: "Establish an incident response structure with defined roles, responsibilities, and escalation procedures for managing disruptions." },
        { code: "BC.4.4", title: "Business continuity plans", level: 1, orderNo: 4, description: "Develop and document business continuity plans detailing actions to be taken before, during, and after disruptive incidents." },
        { code: "BC.4.5", title: "IT disaster recovery plans", level: 1, orderNo: 5, description: "Develop IT disaster recovery plans covering systems, data, networks, and infrastructure required to support time-critical activities." },
        { code: "BC.4.6", title: "Resource and capability requirements", level: 1, orderNo: 6, description: "Identify and secure resources including personnel, technology, facilities, and supplies necessary to implement continuity strategies." },
      ],
    },
    {
      code: "BC.5",
      title: "Exercise and Testing",
      level: 0, orderNo: 5,
      children: [
        { code: "BC.5.1", title: "Exercise programme", level: 1, orderNo: 1, description: "Establish a programme of exercising and testing to validate the effectiveness of business continuity arrangements." },
        { code: "BC.5.2", title: "Plan testing and validation", level: 1, orderNo: 2, description: "Test business continuity and disaster recovery plans at planned intervals to ensure they are complete, current, and achievable." },
        { code: "BC.5.3", title: "Exercise types and scenarios", level: 1, orderNo: 3, description: "Conduct a variety of exercise types including tabletop exercises, simulations, walkthroughs, and full operational tests." },
        { code: "BC.5.4", title: "Exercise evaluation and improvement", level: 1, orderNo: 4, description: "Evaluate exercise results, document lessons learned, and implement improvements to plans and capabilities." },
        { code: "BC.5.5", title: "Supplier and third-party testing", level: 1, orderNo: 5, description: "Coordinate exercising and testing with critical suppliers and third parties to validate end-to-end continuity capabilities." },
      ],
    },
    {
      code: "BC.6",
      title: "Performance Evaluation and Improvement",
      level: 0, orderNo: 6,
      children: [
        { code: "BC.6.1", title: "BCMS performance monitoring", level: 1, orderNo: 1, description: "Monitor and measure BCMS performance through defined metrics, KPIs, and evaluation of conformity to business continuity objectives." },
        { code: "BC.6.2", title: "Internal BCMS audit", level: 1, orderNo: 2, description: "Conduct internal audits of the BCMS at planned intervals to verify conformity to organizational and ISO 22301 requirements." },
        { code: "BC.6.3", title: "BCMS management review", level: 1, orderNo: 3, description: "Top management shall review the BCMS at planned intervals to ensure continuing suitability, adequacy, and effectiveness." },
        { code: "BC.6.4", title: "Nonconformity and corrective action", level: 1, orderNo: 4, description: "React to nonconformities, take corrective action to eliminate causes, and review effectiveness of actions taken." },
        { code: "BC.6.5", title: "Continual improvement", level: 1, orderNo: 5, description: "Continually improve the suitability, adequacy, and effectiveness of the BCMS through analysis, evaluation, and management review outputs." },
      ],
    },
  ],
};
