import { CrossMappingSeed } from "./types";

/**
 * Cross-framework mapping definitions.
 * Format: "REGULATION_CODE:REQUIREMENT_CODE"
 * These map equivalent, overlapping, or related requirements across frameworks.
 */
export const CROSS_MAPPINGS_SEED: CrossMappingSeed[] = [
  // ═══════════════════════════════════════════════════════════════
  // ISO 27001 ↔ NIST CSF 2.0
  // ═══════════════════════════════════════════════════════════════
  { source: "ISO_27001_2022:4.1", target: "NIST_CSF_2:GV.OC-01", relevance: "high", type: "equivalent", notes: "Both address understanding organizational context" },
  { source: "ISO_27001_2022:4.2", target: "NIST_CSF_2:GV.OC-02", relevance: "high", type: "equivalent", notes: "Stakeholder needs and expectations" },
  { source: "ISO_27001_2022:4.3", target: "NIST_CSF_2:GV.OC-03", relevance: "high", type: "overlapping", notes: "Scope determination" },
  { source: "ISO_27001_2022:5.1", target: "NIST_CSF_2:GV.RR-01", relevance: "high", type: "overlapping", notes: "Leadership and commitment / organizational leadership" },
  { source: "ISO_27001_2022:5.2", target: "NIST_CSF_2:GV.PO-01", relevance: "high", type: "equivalent", notes: "IS policy / policy establishment" },
  { source: "ISO_27001_2022:5.3", target: "NIST_CSF_2:GV.RR-02", relevance: "high", type: "equivalent", notes: "Roles, responsibilities, and authorities" },
  { source: "ISO_27001_2022:6.1", target: "NIST_CSF_2:ID.RA-01", relevance: "high", type: "overlapping", notes: "Risk assessment planning" },
  { source: "ISO_27001_2022:6.1.2", target: "NIST_CSF_2:ID.RA-03", relevance: "high", type: "equivalent", notes: "Risk assessment / threat identification" },
  { source: "ISO_27001_2022:6.1.3", target: "NIST_CSF_2:ID.RA-06", relevance: "high", type: "equivalent", notes: "Risk treatment / risk response" },
  { source: "ISO_27001_2022:7.2", target: "NIST_CSF_2:PR.AT-01", relevance: "high", type: "overlapping", notes: "Competence / awareness and training" },
  { source: "ISO_27001_2022:7.3", target: "NIST_CSF_2:PR.AT-02", relevance: "high", type: "overlapping", notes: "Awareness" },
  { source: "ISO_27001_2022:8.1", target: "NIST_CSF_2:PR.PS-01", relevance: "medium", type: "related", notes: "Operational planning and control" },
  { source: "ISO_27001_2022:8.2", target: "NIST_CSF_2:ID.RA-03", relevance: "high", type: "overlapping", notes: "Risk assessment execution" },
  { source: "ISO_27001_2022:9.1", target: "NIST_CSF_2:DE.CM-01", relevance: "high", type: "overlapping", notes: "Monitoring, measurement / continuous monitoring" },
  { source: "ISO_27001_2022:9.2", target: "NIST_CSF_2:GV.OV-02", relevance: "high", type: "overlapping", notes: "Internal audit / oversight review" },
  { source: "ISO_27001_2022:9.3", target: "NIST_CSF_2:GV.OV-01", relevance: "high", type: "overlapping", notes: "Management review / oversight" },
  { source: "ISO_27001_2022:10.1", target: "NIST_CSF_2:ID.IM-01", relevance: "high", type: "overlapping", notes: "Continual improvement" },
  { source: "ISO_27001_2022:10.2", target: "NIST_CSF_2:RS.MI-01", relevance: "medium", type: "related", notes: "Nonconformity and corrective action / incident mitigation" },

  // Annex A → NIST CSF
  { source: "ISO_27001_2022:A.5.1", target: "NIST_CSF_2:GV.PO-01", relevance: "high", type: "equivalent", notes: "Policies for information security" },
  { source: "ISO_27001_2022:A.5.2", target: "NIST_CSF_2:GV.RR-02", relevance: "high", type: "overlapping", notes: "IS roles and responsibilities" },
  { source: "ISO_27001_2022:A.5.7", target: "NIST_CSF_2:ID.RA-02", relevance: "high", type: "equivalent", notes: "Threat intelligence" },
  { source: "ISO_27001_2022:A.5.8", target: "NIST_CSF_2:GV.PO-02", relevance: "medium", type: "related", notes: "IS in project management" },
  { source: "ISO_27001_2022:A.5.9", target: "NIST_CSF_2:ID.AM-01", relevance: "high", type: "equivalent", notes: "Inventory of information / asset management" },
  { source: "ISO_27001_2022:A.5.19", target: "NIST_CSF_2:GV.SC-01", relevance: "high", type: "equivalent", notes: "IS in supplier relationships / supply chain risk" },
  { source: "ISO_27001_2022:A.5.23", target: "NIST_CSF_2:GV.SC-04", relevance: "high", type: "overlapping", notes: "IS for cloud services / supply chain requirements" },
  { source: "ISO_27001_2022:A.5.24", target: "NIST_CSF_2:RS.MA-01", relevance: "high", type: "equivalent", notes: "Incident management planning" },
  { source: "ISO_27001_2022:A.5.25", target: "NIST_CSF_2:RS.AN-03", relevance: "high", type: "overlapping", notes: "Assessment and decision on IS events" },
  { source: "ISO_27001_2022:A.5.26", target: "NIST_CSF_2:RS.MA-02", relevance: "high", type: "equivalent", notes: "Response to IS incidents" },
  { source: "ISO_27001_2022:A.5.29", target: "NIST_CSF_2:RC.RP-01", relevance: "high", type: "equivalent", notes: "IS during disruption / recovery planning" },
  { source: "ISO_27001_2022:A.5.30", target: "NIST_CSF_2:PR.IR-01", relevance: "high", type: "overlapping", notes: "ICT readiness for BC" },
  { source: "ISO_27001_2022:A.6.3", target: "NIST_CSF_2:PR.AT-01", relevance: "high", type: "equivalent", notes: "IS awareness, education and training" },
  { source: "ISO_27001_2022:A.8.1", target: "NIST_CSF_2:PR.DS-01", relevance: "high", type: "overlapping", notes: "User endpoint devices / data security" },
  { source: "ISO_27001_2022:A.8.2", target: "NIST_CSF_2:PR.AA-01", relevance: "high", type: "equivalent", notes: "Privileged access rights" },
  { source: "ISO_27001_2022:A.8.3", target: "NIST_CSF_2:PR.AA-02", relevance: "high", type: "overlapping", notes: "Information access restriction" },
  { source: "ISO_27001_2022:A.8.5", target: "NIST_CSF_2:PR.AA-03", relevance: "high", type: "equivalent", notes: "Secure authentication" },
  { source: "ISO_27001_2022:A.8.8", target: "NIST_CSF_2:ID.RA-01", relevance: "high", type: "overlapping", notes: "Management of technical vulnerabilities" },
  { source: "ISO_27001_2022:A.8.15", target: "NIST_CSF_2:DE.AE-02", relevance: "high", type: "equivalent", notes: "Logging" },
  { source: "ISO_27001_2022:A.8.16", target: "NIST_CSF_2:DE.CM-01", relevance: "high", type: "equivalent", notes: "Monitoring activities" },
  { source: "ISO_27001_2022:A.8.24", target: "NIST_CSF_2:PR.DS-02", relevance: "high", type: "overlapping", notes: "Use of cryptography" },

  // ═══════════════════════════════════════════════════════════════
  // ISO 27001 ↔ SOC 2
  // ═══════════════════════════════════════════════════════════════
  { source: "ISO_27001_2022:A.5.1", target: "SOC2_TYPE2:CC1.1", relevance: "high", type: "overlapping", notes: "Policies / COSO integrity and ethics values" },
  { source: "ISO_27001_2022:5.1", target: "SOC2_TYPE2:CC1.2", relevance: "high", type: "overlapping", notes: "Leadership / board oversight" },
  { source: "ISO_27001_2022:5.3", target: "SOC2_TYPE2:CC1.3", relevance: "high", type: "equivalent", notes: "Roles and authorities / management structure" },
  { source: "ISO_27001_2022:7.2", target: "SOC2_TYPE2:CC1.4", relevance: "high", type: "equivalent", notes: "Competence / competence commitment" },
  { source: "ISO_27001_2022:5.3", target: "SOC2_TYPE2:CC1.5", relevance: "high", type: "overlapping", notes: "Accountability" },
  { source: "ISO_27001_2022:7.4", target: "SOC2_TYPE2:CC2.1", relevance: "high", type: "overlapping", notes: "Communication" },
  { source: "ISO_27001_2022:7.5", target: "SOC2_TYPE2:CC2.2", relevance: "medium", type: "related", notes: "Documented information / internal communication" },
  { source: "ISO_27001_2022:6.1.2", target: "SOC2_TYPE2:CC3.1", relevance: "high", type: "equivalent", notes: "Risk assessment" },
  { source: "ISO_27001_2022:6.1.2", target: "SOC2_TYPE2:CC3.2", relevance: "high", type: "overlapping", notes: "Risk identification / fraud risk" },
  { source: "ISO_27001_2022:10.1", target: "SOC2_TYPE2:CC3.3", relevance: "medium", type: "related", notes: "Change analysis" },
  { source: "ISO_27001_2022:9.1", target: "SOC2_TYPE2:CC4.1", relevance: "high", type: "equivalent", notes: "Monitoring / ongoing evaluations" },
  { source: "ISO_27001_2022:10.2", target: "SOC2_TYPE2:CC4.2", relevance: "high", type: "equivalent", notes: "Corrective action / deficiency communication" },
  { source: "ISO_27001_2022:8.1", target: "SOC2_TYPE2:CC5.1", relevance: "high", type: "overlapping", notes: "Operational control / control activities" },
  { source: "ISO_27001_2022:A.8.9", target: "SOC2_TYPE2:CC5.2", relevance: "medium", type: "related", notes: "Configuration management / technology controls" },
  { source: "ISO_27001_2022:A.5.2", target: "SOC2_TYPE2:CC5.3", relevance: "medium", type: "related", notes: "Policies deployed through policies" },
  { source: "ISO_27001_2022:A.8.3", target: "SOC2_TYPE2:CC6.1", relevance: "high", type: "equivalent", notes: "Information access restriction / logical access" },
  { source: "ISO_27001_2022:A.8.5", target: "SOC2_TYPE2:CC6.2", relevance: "high", type: "equivalent", notes: "Secure authentication / credentials" },
  { source: "ISO_27001_2022:A.8.2", target: "SOC2_TYPE2:CC6.3", relevance: "high", type: "equivalent", notes: "Privileged access / role-based access" },
  { source: "ISO_27001_2022:A.7.1", target: "SOC2_TYPE2:CC6.4", relevance: "high", type: "equivalent", notes: "Physical security / physical access restriction" },
  { source: "ISO_27001_2022:A.7.4", target: "SOC2_TYPE2:CC6.5", relevance: "high", type: "overlapping", notes: "Physical security monitoring / asset disposition" },
  { source: "ISO_27001_2022:A.8.24", target: "SOC2_TYPE2:CC6.7", relevance: "high", type: "overlapping", notes: "Cryptography / data transmission protection" },
  { source: "ISO_27001_2022:A.8.7", target: "SOC2_TYPE2:CC6.8", relevance: "high", type: "overlapping", notes: "Protection against malware / unauthorized software" },
  { source: "ISO_27001_2022:A.8.16", target: "SOC2_TYPE2:CC7.1", relevance: "high", type: "equivalent", notes: "Monitoring / detection of changes" },
  { source: "ISO_27001_2022:A.8.16", target: "SOC2_TYPE2:CC7.2", relevance: "high", type: "overlapping", notes: "Monitoring activities / anomaly monitoring" },
  { source: "ISO_27001_2022:A.5.25", target: "SOC2_TYPE2:CC7.3", relevance: "high", type: "equivalent", notes: "Assessment of IS events / event evaluation" },
  { source: "ISO_27001_2022:A.5.26", target: "SOC2_TYPE2:CC7.4", relevance: "high", type: "equivalent", notes: "Incident response / security incident response" },
  { source: "ISO_27001_2022:A.5.29", target: "SOC2_TYPE2:CC7.5", relevance: "high", type: "equivalent", notes: "IS during disruption / incident recovery" },
  { source: "ISO_27001_2022:A.8.32", target: "SOC2_TYPE2:CC8.1", relevance: "high", type: "equivalent", notes: "Change management" },
  { source: "ISO_27001_2022:6.1.3", target: "SOC2_TYPE2:CC9.1", relevance: "high", type: "overlapping", notes: "Risk treatment / risk mitigation" },
  { source: "ISO_27001_2022:A.5.19", target: "SOC2_TYPE2:CC9.2", relevance: "high", type: "equivalent", notes: "Supplier management / vendor risk management" },

  // ═══════════════════════════════════════════════════════════════
  // ISO 27001 ↔ GDPR
  // ═══════════════════════════════════════════════════════════════
  { source: "ISO_27001_2022:A.5.34", target: "GDPR:Art.5", relevance: "high", type: "related", notes: "Privacy and PII protection / data processing principles" },
  { source: "ISO_27001_2022:A.5.10", target: "GDPR:Art.5", relevance: "high", type: "overlapping", notes: "Acceptable use of information / purpose limitation" },
  { source: "ISO_27001_2022:A.5.33", target: "GDPR:Art.30", relevance: "high", type: "equivalent", notes: "Protection of records / records of processing" },
  { source: "ISO_27001_2022:A.5.34", target: "GDPR:Art.25", relevance: "high", type: "overlapping", notes: "Privacy protection / data protection by design" },
  { source: "ISO_27001_2022:A.8.11", target: "GDPR:Art.17", relevance: "high", type: "overlapping", notes: "Data masking / right to erasure" },
  { source: "ISO_27001_2022:A.8.10", target: "GDPR:Art.17", relevance: "medium", type: "related", notes: "Information deletion / right to erasure" },
  { source: "ISO_27001_2022:A.8.12", target: "GDPR:Art.5", relevance: "medium", type: "related", notes: "Data leakage prevention / integrity and confidentiality" },
  { source: "ISO_27001_2022:A.5.12", target: "GDPR:Art.9", relevance: "medium", type: "related", notes: "Classification of information / special categories" },
  { source: "ISO_27001_2022:A.5.24", target: "GDPR:Art.33", relevance: "high", type: "overlapping", notes: "Incident management / breach notification to authority" },
  { source: "ISO_27001_2022:A.5.26", target: "GDPR:Art.34", relevance: "high", type: "overlapping", notes: "Response to incidents / breach notification to data subject" },
  { source: "ISO_27001_2022:A.5.31", target: "GDPR:Art.35", relevance: "high", type: "overlapping", notes: "Legal requirements / DPIA" },
  { source: "ISO_27001_2022:A.5.19", target: "GDPR:Art.28", relevance: "high", type: "overlapping", notes: "IS in supplier relationships / processor obligations" },
  { source: "ISO_27001_2022:6.1.2", target: "GDPR:Art.35", relevance: "high", type: "overlapping", notes: "IS risk assessment / DPIA" },
  { source: "ISO_27001_2022:A.8.24", target: "GDPR:Art.32", relevance: "high", type: "overlapping", notes: "Cryptography / security of processing" },

  // ═══════════════════════════════════════════════════════════════
  // ISO 27001 ↔ ISO 31000
  // ═══════════════════════════════════════════════════════════════
  { source: "ISO_27001_2022:4.1", target: "ISO_31000:5.4", relevance: "high", type: "overlapping", notes: "Context / framework design" },
  { source: "ISO_27001_2022:5.1", target: "ISO_31000:5.2", relevance: "high", type: "equivalent", notes: "Leadership / leadership and commitment" },
  { source: "ISO_27001_2022:6.1.2", target: "ISO_31000:6.4", relevance: "high", type: "equivalent", notes: "Risk assessment" },
  { source: "ISO_27001_2022:6.1.3", target: "ISO_31000:6.5", relevance: "high", type: "equivalent", notes: "Risk treatment" },
  { source: "ISO_27001_2022:8.2", target: "ISO_31000:6.4.2", relevance: "high", type: "overlapping", notes: "Risk assessment / risk identification" },
  { source: "ISO_27001_2022:8.3", target: "ISO_31000:6.5", relevance: "high", type: "overlapping", notes: "Risk treatment implementation" },
  { source: "ISO_27001_2022:9.1", target: "ISO_31000:6.6", relevance: "high", type: "equivalent", notes: "Monitoring / monitoring and review" },
  { source: "ISO_27001_2022:9.3", target: "ISO_31000:5.6", relevance: "high", type: "overlapping", notes: "Management review / evaluation" },
  { source: "ISO_27001_2022:10.1", target: "ISO_31000:5.7", relevance: "high", type: "equivalent", notes: "Improvement" },
  { source: "ISO_27001_2022:7.4", target: "ISO_31000:6.2", relevance: "high", type: "overlapping", notes: "Communication / communication and consultation" },

  // ═══════════════════════════════════════════════════════════════
  // ISO 27001 ↔ SOX
  // ═══════════════════════════════════════════════════════════════
  { source: "ISO_27001_2022:A.8.3", target: "SOX:Sec.404", relevance: "high", type: "related", notes: "Information access restriction / internal controls over financial reporting" },
  { source: "ISO_27001_2022:A.8.32", target: "SOX:Sec.404", relevance: "high", type: "related", notes: "Change management / management assessment of internal controls" },
  { source: "ISO_27001_2022:A.8.15", target: "SOX:Sec.404", relevance: "medium", type: "related", notes: "Logging / audit trail for internal controls" },
  { source: "ISO_27001_2022:A.5.1", target: "SOX:Sec.302", relevance: "medium", type: "related", notes: "Policies / corporate responsibility" },
  { source: "ISO_27001_2022:9.2", target: "SOX:Sec.404", relevance: "high", type: "overlapping", notes: "Internal audit / management assessment" },

  // ═══════════════════════════════════════════════════════════════
  // NIST CSF ↔ SOC 2
  // ═══════════════════════════════════════════════════════════════
  { source: "NIST_CSF_2:GV.OC-01", target: "SOC2_TYPE2:CC1.1", relevance: "high", type: "overlapping", notes: "Organizational context / control environment" },
  { source: "NIST_CSF_2:GV.RR-01", target: "SOC2_TYPE2:CC1.2", relevance: "high", type: "overlapping", notes: "Risk management leadership / board oversight" },
  { source: "NIST_CSF_2:GV.RR-02", target: "SOC2_TYPE2:CC1.3", relevance: "high", type: "equivalent", notes: "Roles and responsibilities / management structure" },
  { source: "NIST_CSF_2:GV.PO-01", target: "SOC2_TYPE2:CC1.1", relevance: "high", type: "overlapping", notes: "Policy / integrity values" },
  { source: "NIST_CSF_2:ID.RA-01", target: "SOC2_TYPE2:CC3.1", relevance: "high", type: "equivalent", notes: "Vulnerability identification / risk objectives" },
  { source: "NIST_CSF_2:ID.RA-03", target: "SOC2_TYPE2:CC3.2", relevance: "high", type: "equivalent", notes: "Threat identification / risk identification" },
  { source: "NIST_CSF_2:ID.RA-06", target: "SOC2_TYPE2:CC3.4", relevance: "high", type: "equivalent", notes: "Risk response / risk assessment" },
  { source: "NIST_CSF_2:PR.AA-01", target: "SOC2_TYPE2:CC6.1", relevance: "high", type: "equivalent", notes: "Identity management / logical access" },
  { source: "NIST_CSF_2:PR.AA-02", target: "SOC2_TYPE2:CC6.2", relevance: "high", type: "equivalent", notes: "Authentication / credentials" },
  { source: "NIST_CSF_2:PR.AA-03", target: "SOC2_TYPE2:CC6.3", relevance: "high", type: "equivalent", notes: "Access management / access authorization" },
  { source: "NIST_CSF_2:PR.DS-01", target: "SOC2_TYPE2:CC6.7", relevance: "high", type: "overlapping", notes: "Data security / transmission and storage protection" },
  { source: "NIST_CSF_2:PR.AT-01", target: "SOC2_TYPE2:CC1.4", relevance: "high", type: "equivalent", notes: "Awareness and training / competence commitment" },
  { source: "NIST_CSF_2:DE.CM-01", target: "SOC2_TYPE2:CC7.1", relevance: "high", type: "equivalent", notes: "Continuous monitoring / change detection" },
  { source: "NIST_CSF_2:DE.AE-02", target: "SOC2_TYPE2:CC7.2", relevance: "high", type: "equivalent", notes: "Adverse event analysis / anomaly monitoring" },
  { source: "NIST_CSF_2:RS.MA-01", target: "SOC2_TYPE2:CC7.3", relevance: "high", type: "equivalent", notes: "Incident management / event evaluation" },
  { source: "NIST_CSF_2:RS.MA-02", target: "SOC2_TYPE2:CC7.4", relevance: "high", type: "equivalent", notes: "Incident response / security incident response" },
  { source: "NIST_CSF_2:RS.MI-01", target: "SOC2_TYPE2:CC7.5", relevance: "high", type: "overlapping", notes: "Incident mitigation / incident recovery" },
  { source: "NIST_CSF_2:RC.RP-01", target: "SOC2_TYPE2:A1.2", relevance: "high", type: "overlapping", notes: "Recovery planning / recovery mechanisms" },
  { source: "NIST_CSF_2:GV.SC-01", target: "SOC2_TYPE2:CC9.2", relevance: "high", type: "equivalent", notes: "Supply chain / vendor risk management" },

  // ═══════════════════════════════════════════════════════════════
  // NIST CSF ↔ GDPR
  // ═══════════════════════════════════════════════════════════════
  { source: "NIST_CSF_2:ID.AM-01", target: "GDPR:Art.30", relevance: "high", type: "overlapping", notes: "Asset management / records of processing" },
  { source: "NIST_CSF_2:PR.DS-01", target: "GDPR:Art.32", relevance: "high", type: "overlapping", notes: "Data security / security of processing" },
  { source: "NIST_CSF_2:PR.DS-02", target: "GDPR:Art.32", relevance: "high", type: "overlapping", notes: "Data protection / security of processing" },
  { source: "NIST_CSF_2:PR.AA-01", target: "GDPR:Art.32", relevance: "medium", type: "related", notes: "Identity management / security measures" },
  { source: "NIST_CSF_2:RS.MA-01", target: "GDPR:Art.33", relevance: "high", type: "overlapping", notes: "Incident management / breach notification" },
  { source: "NIST_CSF_2:RS.CO-02", target: "GDPR:Art.34", relevance: "high", type: "overlapping", notes: "Incident reporting / breach notification to data subject" },
  { source: "NIST_CSF_2:GV.PO-01", target: "GDPR:Art.24", relevance: "medium", type: "related", notes: "Policy / responsibility of the controller" },
  { source: "NIST_CSF_2:ID.RA-03", target: "GDPR:Art.35", relevance: "high", type: "overlapping", notes: "Threat identification / DPIA" },
  { source: "NIST_CSF_2:GV.SC-01", target: "GDPR:Art.28", relevance: "high", type: "overlapping", notes: "Supply chain risk / processor obligations" },

  // ═══════════════════════════════════════════════════════════════
  // NIST CSF ↔ ISO 31000
  // ═══════════════════════════════════════════════════════════════
  { source: "NIST_CSF_2:GV.OC-01", target: "ISO_31000:5.4", relevance: "high", type: "overlapping", notes: "Context / framework design" },
  { source: "NIST_CSF_2:GV.RM-01", target: "ISO_31000:5.2", relevance: "high", type: "overlapping", notes: "Risk management objectives / leadership" },
  { source: "NIST_CSF_2:GV.RM-02", target: "ISO_31000:6.3", relevance: "high", type: "equivalent", notes: "Risk appetite / scope and criteria" },
  { source: "NIST_CSF_2:ID.RA-01", target: "ISO_31000:6.4.2", relevance: "high", type: "overlapping", notes: "Vulnerability identification / risk identification" },
  { source: "NIST_CSF_2:ID.RA-03", target: "ISO_31000:6.4.3", relevance: "high", type: "overlapping", notes: "Threat identification / risk analysis" },
  { source: "NIST_CSF_2:ID.RA-06", target: "ISO_31000:6.5", relevance: "high", type: "equivalent", notes: "Risk response / risk treatment" },
  { source: "NIST_CSF_2:ID.IM-01", target: "ISO_31000:5.7", relevance: "high", type: "equivalent", notes: "Improvement / continual improvement" },
  { source: "NIST_CSF_2:DE.CM-01", target: "ISO_31000:6.6", relevance: "high", type: "overlapping", notes: "Continuous monitoring / monitoring and review" },

  // ═══════════════════════════════════════════════════════════════
  // SOC 2 ↔ GDPR
  // ═══════════════════════════════════════════════════════════════
  { source: "SOC2_TYPE2:CC6.1", target: "GDPR:Art.32", relevance: "high", type: "overlapping", notes: "Logical and physical access / security of processing" },
  { source: "SOC2_TYPE2:CC6.7", target: "GDPR:Art.32", relevance: "high", type: "overlapping", notes: "Transmission protection / security measures" },
  { source: "SOC2_TYPE2:CC7.3", target: "GDPR:Art.33", relevance: "high", type: "overlapping", notes: "Security event evaluation / breach notification" },
  { source: "SOC2_TYPE2:CC7.4", target: "GDPR:Art.34", relevance: "high", type: "overlapping", notes: "Incident response / notification to data subject" },
  { source: "SOC2_TYPE2:CC9.2", target: "GDPR:Art.28", relevance: "high", type: "overlapping", notes: "Vendor risk / processor obligations" },
  { source: "SOC2_TYPE2:P1.1", target: "GDPR:Art.13", relevance: "high", type: "equivalent", notes: "Privacy notice / information to data subject" },
  { source: "SOC2_TYPE2:P3.1", target: "GDPR:Art.6", relevance: "high", type: "overlapping", notes: "Collection / lawfulness of processing" },
  { source: "SOC2_TYPE2:P4.1", target: "GDPR:Art.5", relevance: "high", type: "overlapping", notes: "Use, retention, disposal / purpose limitation & storage limitation" },
  { source: "SOC2_TYPE2:P6.1", target: "GDPR:Art.15", relevance: "high", type: "overlapping", notes: "Quality / right of access" },
  { source: "SOC2_TYPE2:P8.1", target: "GDPR:Art.12", relevance: "high", type: "overlapping", notes: "Complaint management / transparent communication" },

  // ═══════════════════════════════════════════════════════════════
  // SOC 2 ↔ SOX
  // ═══════════════════════════════════════════════════════════════
  { source: "SOC2_TYPE2:CC1.1", target: "SOX:Sec.302", relevance: "high", type: "overlapping", notes: "Control environment / corporate responsibility" },
  { source: "SOC2_TYPE2:CC1.2", target: "SOX:Sec.301", relevance: "high", type: "overlapping", notes: "Board oversight / audit committee" },
  { source: "SOC2_TYPE2:CC3.1", target: "SOX:Sec.404", relevance: "high", type: "overlapping", notes: "Risk assessment / internal controls assessment" },
  { source: "SOC2_TYPE2:CC4.1", target: "SOX:Sec.404", relevance: "high", type: "overlapping", notes: "Monitoring / management assessment" },
  { source: "SOC2_TYPE2:CC5.1", target: "SOX:Sec.404", relevance: "high", type: "overlapping", notes: "Control activities / internal controls" },
  { source: "SOC2_TYPE2:CC8.1", target: "SOX:Sec.404", relevance: "medium", type: "related", notes: "Change management / controls over financial reporting" },

  // ═══════════════════════════════════════════════════════════════
  // SOC 2 ↔ ISO 31000
  // ═══════════════════════════════════════════════════════════════
  { source: "SOC2_TYPE2:CC3.1", target: "ISO_31000:6.3", relevance: "high", type: "overlapping", notes: "Risk objectives / scope and criteria" },
  { source: "SOC2_TYPE2:CC3.2", target: "ISO_31000:6.4.2", relevance: "high", type: "equivalent", notes: "Risk identification" },
  { source: "SOC2_TYPE2:CC3.4", target: "ISO_31000:6.4.4", relevance: "high", type: "equivalent", notes: "Risk assessment / risk evaluation" },
  { source: "SOC2_TYPE2:CC9.1", target: "ISO_31000:6.5", relevance: "high", type: "equivalent", notes: "Risk mitigation / risk treatment" },
  { source: "SOC2_TYPE2:CC4.1", target: "ISO_31000:6.6", relevance: "high", type: "overlapping", notes: "Monitoring / monitoring and review" },

  // ═══════════════════════════════════════════════════════════════
  // GDPR ↔ ISO 31000
  // ═══════════════════════════════════════════════════════════════
  { source: "GDPR:Art.35", target: "ISO_31000:6.4", relevance: "high", type: "overlapping", notes: "DPIA / risk assessment" },
  { source: "GDPR:Art.32", target: "ISO_31000:6.5", relevance: "medium", type: "related", notes: "Security measures / risk treatment" },
  { source: "GDPR:Art.24", target: "ISO_31000:5.2", relevance: "medium", type: "related", notes: "Controller responsibility / leadership" },

  // ═══════════════════════════════════════════════════════════════
  // GDPR ↔ SOX
  // ═══════════════════════════════════════════════════════════════
  { source: "GDPR:Art.5", target: "SOX:Sec.302", relevance: "low", type: "related", notes: "Processing principles / corporate responsibility - both require accountability" },
  { source: "GDPR:Art.30", target: "SOX:Sec.404", relevance: "medium", type: "related", notes: "Records of processing / internal controls documentation" },

  // ═══════════════════════════════════════════════════════════════
  // ISO 31000 ↔ SOX
  // ═══════════════════════════════════════════════════════════════
  { source: "ISO_31000:6.4", target: "SOX:Sec.404", relevance: "high", type: "overlapping", notes: "Risk assessment / management assessment of internal controls" },
  { source: "ISO_31000:6.5", target: "SOX:Sec.404", relevance: "high", type: "overlapping", notes: "Risk treatment / internal controls" },
  { source: "ISO_31000:5.2", target: "SOX:Sec.302", relevance: "high", type: "overlapping", notes: "Leadership / corporate responsibility" },
  { source: "ISO_31000:6.6", target: "SOX:Sec.404", relevance: "medium", type: "related", notes: "Monitoring and review / ongoing assessment" },
  { source: "ISO_31000:6.7", target: "SOX:Sec.409", relevance: "medium", type: "related", notes: "Recording and reporting / real-time disclosures" },

  // ═══════════════════════════════════════════════════════════════
  // NIST SP 800-53 ↔ ISO 27001
  // ═══════════════════════════════════════════════════════════════
  { source: "NIST_SP_800_53:AC-1", target: "ISO_27001_2022:A.5.1", relevance: "high", type: "equivalent", notes: "Access control policy / information security policy" },
  { source: "NIST_SP_800_53:AC-2", target: "ISO_27001_2022:A.5.15", relevance: "high", type: "overlapping", notes: "Account management / access control" },
  { source: "NIST_SP_800_53:AC-5", target: "ISO_27001_2022:A.5.3", relevance: "high", type: "equivalent", notes: "Separation of duties / segregation of duties" },
  { source: "NIST_SP_800_53:AC-6", target: "ISO_27001_2022:A.5.15", relevance: "high", type: "overlapping", notes: "Least privilege / access control" },
  { source: "NIST_SP_800_53:AU-2", target: "ISO_27001_2022:A.8.15", relevance: "high", type: "equivalent", notes: "Audit events / logging" },
  { source: "NIST_SP_800_53:AU-6", target: "ISO_27001_2022:A.8.16", relevance: "high", type: "equivalent", notes: "Audit review / monitoring activities" },
  { source: "NIST_SP_800_53:AT-2", target: "ISO_27001_2022:A.6.3", relevance: "high", type: "equivalent", notes: "Literacy training / awareness" },
  { source: "NIST_SP_800_53:CM-3", target: "ISO_27001_2022:A.8.32", relevance: "high", type: "equivalent", notes: "Configuration change control / change management" },
  { source: "NIST_SP_800_53:CP-2", target: "ISO_27001_2022:A.5.29", relevance: "high", type: "equivalent", notes: "Contingency plan / IS during disruption" },
  { source: "NIST_SP_800_53:CP-9", target: "ISO_27001_2022:A.8.13", relevance: "high", type: "overlapping", notes: "System backup / information backup" },
  { source: "NIST_SP_800_53:IA-2", target: "ISO_27001_2022:A.8.5", relevance: "high", type: "equivalent", notes: "User identification / secure authentication" },
  { source: "NIST_SP_800_53:IR-4", target: "ISO_27001_2022:A.5.26", relevance: "high", type: "equivalent", notes: "Incident handling / response to IS incidents" },
  { source: "NIST_SP_800_53:RA-3", target: "ISO_27001_2022:6.1.2", relevance: "high", type: "equivalent", notes: "Risk assessment / IS risk assessment" },
  { source: "NIST_SP_800_53:RA-5", target: "ISO_27001_2022:A.8.8", relevance: "high", type: "equivalent", notes: "Vulnerability monitoring / technical vulnerabilities" },
  { source: "NIST_SP_800_53:SC-7", target: "ISO_27001_2022:A.8.20", relevance: "high", type: "equivalent", notes: "Boundary protection / network security" },
  { source: "NIST_SP_800_53:SC-8", target: "ISO_27001_2022:A.8.24", relevance: "high", type: "equivalent", notes: "Transmission confidentiality / cryptography" },
  { source: "NIST_SP_800_53:SC-28", target: "ISO_27001_2022:A.8.1", relevance: "high", type: "overlapping", notes: "Protection at rest / endpoint security" },
  { source: "NIST_SP_800_53:SI-2", target: "ISO_27001_2022:A.8.8", relevance: "high", type: "equivalent", notes: "Flaw remediation / technical vulnerability management" },

  // ═══════════════════════════════════════════════════════════════
  // NIST SP 800-53 ↔ NIST CSF 2.0
  // ═══════════════════════════════════════════════════════════════
  { source: "NIST_SP_800_53:AC-2", target: "NIST_CSF_2:PR.AA-01", relevance: "high", type: "equivalent", notes: "Account management / identity management" },
  { source: "NIST_SP_800_53:AC-5", target: "NIST_CSF_2:GV.RR-02", relevance: "medium", type: "related", notes: "Separation of duties / roles and responsibilities" },
  { source: "NIST_SP_800_53:AU-2", target: "NIST_CSF_2:DE.AE-02", relevance: "high", type: "overlapping", notes: "Audit events / adverse event analysis" },
  { source: "NIST_SP_800_53:CM-8", target: "NIST_CSF_2:ID.AM-01", relevance: "high", type: "equivalent", notes: "System component inventory / hardware inventory" },
  { source: "NIST_SP_800_53:CP-2", target: "NIST_CSF_2:RC.RP-01", relevance: "high", type: "overlapping", notes: "Contingency plan / recovery planning" },
  { source: "NIST_SP_800_53:IR-4", target: "NIST_CSF_2:RS.MA-02", relevance: "high", type: "equivalent", notes: "Incident handling / incident response" },
  { source: "NIST_SP_800_53:RA-3", target: "NIST_CSF_2:ID.RA-03", relevance: "high", type: "equivalent", notes: "Risk assessment / threat identification" },
  { source: "NIST_SP_800_53:PM-9", target: "NIST_CSF_2:GV.RM-01", relevance: "high", type: "equivalent", notes: "Risk management strategy / risk management objectives" },
  { source: "NIST_SP_800_53:CA-7", target: "NIST_CSF_2:DE.CM-01", relevance: "high", type: "equivalent", notes: "Continuous monitoring / continuous monitoring" },
  { source: "NIST_SP_800_53:PL-2", target: "NIST_CSF_2:GV.PO-01", relevance: "high", type: "overlapping", notes: "System security plan / cybersecurity policy" },

  // ═══════════════════════════════════════════════════════════════
  // CIS Controls v8 ↔ NIST SP 800-53
  // ═══════════════════════════════════════════════════════════════
  { source: "CIS_V8:1.1", target: "NIST_SP_800_53:CM-8", relevance: "high", type: "equivalent", notes: "Enterprise asset inventory / system component inventory" },
  { source: "CIS_V8:3.4", target: "NIST_SP_800_53:SC-28", relevance: "high", type: "equivalent", notes: "Encrypt data at rest / protection at rest" },
  { source: "CIS_V8:4.1", target: "NIST_SP_800_53:CM-6", relevance: "high", type: "equivalent", notes: "Secure configuration / configuration settings" },
  { source: "CIS_V8:5.4", target: "NIST_SP_800_53:AC-6", relevance: "high", type: "overlapping", notes: "Restrict administrator privileges / least privilege" },
  { source: "CIS_V8:6.2", target: "NIST_SP_800_53:IA-2", relevance: "high", type: "equivalent", notes: "MFA for admin access / identification and authentication" },
  { source: "CIS_V8:7.2", target: "NIST_SP_800_53:RA-5", relevance: "high", type: "equivalent", notes: "Automated vulnerability scans / vulnerability scanning" },
  { source: "CIS_V8:8.1", target: "NIST_SP_800_53:AU-2", relevance: "high", type: "equivalent", notes: "Audit log process / audit events" },
  { source: "CIS_V8:10.1", target: "NIST_SP_800_53:SI-3", relevance: "high", type: "equivalent", notes: "Anti-malware / malicious code protection" },
  { source: "CIS_V8:11.1", target: "NIST_SP_800_53:CP-9", relevance: "high", type: "equivalent", notes: "Data recovery / system backup" },
  { source: "CIS_V8:12.2", target: "NIST_SP_800_53:SC-7", relevance: "high", type: "overlapping", notes: "Segment networks / boundary protection" },
  { source: "CIS_V8:13.1", target: "NIST_SP_800_53:SI-4", relevance: "high", type: "equivalent", notes: "Network intrusion detection / system monitoring" },
  { source: "CIS_V8:14.1", target: "NIST_SP_800_53:AT-2", relevance: "high", type: "equivalent", notes: "Security awareness / literacy training" },
  { source: "CIS_V8:17.1", target: "NIST_SP_800_53:IR-4", relevance: "high", type: "equivalent", notes: "Incident response plan / incident handling" },

  // ═══════════════════════════════════════════════════════════════
  // ISO 27701 ↔ GDPR
  // ═══════════════════════════════════════════════════════════════
  { source: "ISO_27701:PIMS.1.5", target: "GDPR:Art.24", relevance: "high", type: "equivalent", notes: "Privacy policy / controller responsibility" },
  { source: "ISO_27701:PIMS.2.5", target: "GDPR:Art.6", relevance: "high", type: "equivalent", notes: "Lawful basis / lawfulness of processing" },
  { source: "ISO_27701:PIMS.3.3", target: "GDPR:Art.30", relevance: "high", type: "equivalent", notes: "PII processing records / ROPA" },
  { source: "ISO_27701:PIMS.3.4", target: "GDPR:Art.25", relevance: "high", type: "equivalent", notes: "Privacy by design / data protection by design" },
  { source: "ISO_27701:PIMS.4.1", target: "GDPR:Art.12", relevance: "high", type: "overlapping", notes: "PII principal rights / data subject rights" },
  { source: "ISO_27701:PIMS.4.2", target: "GDPR:Art.13", relevance: "high", type: "equivalent", notes: "Transparency and notice / information to data subject" },
  { source: "ISO_27701:PIMS.4.3", target: "GDPR:Art.20", relevance: "high", type: "equivalent", notes: "PII access and portability / data portability" },
  { source: "ISO_27701:PIMS.5.1", target: "GDPR:Art.33", relevance: "high", type: "overlapping", notes: "PII breach / breach notification" },
  { source: "ISO_27701:PIMS.6.2", target: "GDPR:Art.28", relevance: "high", type: "equivalent", notes: "PII processing agreements / processor contract" },
  { source: "ISO_27701:PIMS.7.4", target: "GDPR:Art.35", relevance: "high", type: "equivalent", notes: "DPIA / DPIA" },

  // ═══════════════════════════════════════════════════════════════
  // ISO 22301 ↔ ISO 27001
  // ═══════════════════════════════════════════════════════════════
  { source: "ISO_22301:BC.2.2", target: "ISO_27001_2022:A.5.29", relevance: "high", type: "overlapping", notes: "BIA / IS during disruption" },
  { source: "ISO_22301:BC.4.5", target: "ISO_27001_2022:A.5.30", relevance: "high", type: "overlapping", notes: "IT DR plans / ICT readiness for BC" },
  { source: "ISO_22301:BC.5.1", target: "ISO_27001_2022:A.5.29", relevance: "high", type: "overlapping", notes: "Exercise programme / IS during disruption testing" },
  { source: "ISO_22301:BC.6.2", target: "ISO_27001_2022:9.2", relevance: "high", type: "equivalent", notes: "Internal BCMS audit / internal audit" },
  { source: "ISO_22301:BC.6.3", target: "ISO_27001_2022:9.3", relevance: "high", type: "equivalent", notes: "BCMS management review / management review" },
  { source: "ISO_22301:BC.6.4", target: "ISO_27001_2022:10.2", relevance: "high", type: "equivalent", notes: "Nonconformity and corrective action" },
  { source: "ISO_22301:BC.6.5", target: "ISO_27001_2022:10.1", relevance: "high", type: "equivalent", notes: "Continual improvement" },
  { source: "ISO_22301:BC.3.2", target: "ISO_27001_2022:7.3", relevance: "high", type: "overlapping", notes: "BC awareness / information security awareness" },

  // ═══════════════════════════════════════════════════════════════
  // COBIT 2019 ↔ ISO 27001
  // ═══════════════════════════════════════════════════════════════
  { source: "COBIT_2019:EDM03", target: "ISO_27001_2022:6.1", relevance: "high", type: "overlapping", notes: "Risk optimization / IS risk assessment" },
  { source: "COBIT_2019:APO01", target: "ISO_27001_2022:4.4", relevance: "high", type: "overlapping", notes: "I&T management framework / ISMS" },
  { source: "COBIT_2019:APO12", target: "ISO_27001_2022:6.1.2", relevance: "high", type: "equivalent", notes: "Manage risk / risk assessment" },
  { source: "COBIT_2019:APO13", target: "ISO_27001_2022:A.5.1", relevance: "high", type: "equivalent", notes: "Manage security / information security policy" },
  { source: "COBIT_2019:BAI06", target: "ISO_27001_2022:A.8.32", relevance: "high", type: "equivalent", notes: "Manage IT changes / change management" },
  { source: "COBIT_2019:DSS04", target: "ISO_27001_2022:A.5.29", relevance: "high", type: "overlapping", notes: "Manage continuity / IS during disruption" },
  { source: "COBIT_2019:DSS05", target: "ISO_27001_2022:A.8.16", relevance: "high", type: "overlapping", notes: "Manage security services / monitoring" },
  { source: "COBIT_2019:APO10", target: "ISO_27001_2022:A.5.19", relevance: "high", type: "equivalent", notes: "Manage suppliers / supplier relationships" },
  { source: "COBIT_2019:APO07", target: "ISO_27001_2022:7.2", relevance: "high", type: "overlapping", notes: "Manage HR / competence" },
  { source: "COBIT_2019:MEA01", target: "ISO_27001_2022:9.1", relevance: "high", type: "equivalent", notes: "Manage performance / monitoring and measurement" },

  // ═══════════════════════════════════════════════════════════════
  // DORA ↔ ISO 27001 / ISO 22301
  // ═══════════════════════════════════════════════════════════════
  { source: "DORA:DORA.I.1", target: "ISO_27001_2022:6.1", relevance: "high", type: "overlapping", notes: "ICT risk management framework / IS risk assessment" },
  { source: "DORA:DORA.I.11", target: "ISO_22301:BC.4.5", relevance: "high", type: "equivalent", notes: "ICT DR plans / IT disaster recovery" },
  { source: "DORA:DORA.I.12", target: "ISO_27001_2022:A.8.13", relevance: "high", type: "equivalent", notes: "ICT backup / information backup" },
  { source: "DORA:DORA.II.2", target: "ISO_27001_2022:A.5.26", relevance: "high", type: "equivalent", notes: "Incident response / response to IS incidents" },
  { source: "DORA:DORA.III.3", target: "ISO_27001_2022:A.8.29", relevance: "high", type: "overlapping", notes: "Penetration testing / security testing" },
  { source: "DORA:DORA.IV.1", target: "ISO_27001_2022:A.5.19", relevance: "high", type: "equivalent", notes: "Third-party ICT risk / supplier relationships" },
  { source: "DORA:DORA.V.2", target: "ISO_27001_2022:A.5.26", relevance: "high", type: "overlapping", notes: "Major incident reporting / incident response" },

  // ═══════════════════════════════════════════════════════════════
  // CCPA ↔ GDPR
  // ═══════════════════════════════════════════════════════════════
  { source: "CCPA:CCPA.1.1", target: "GDPR:Art.15", relevance: "high", type: "overlapping", notes: "Right to know / right of access" },
  { source: "CCPA:CCPA.1.3", target: "GDPR:Art.17", relevance: "high", type: "overlapping", notes: "Right to delete / right to erasure" },
  { source: "CCPA:CCPA.1.8", target: "GDPR:Art.20", relevance: "high", type: "overlapping", notes: "Data portability / right to data portability" },
  { source: "CCPA:CCPA.2.1", target: "GDPR:Art.13", relevance: "high", type: "equivalent", notes: "Privacy notice / information to data subject" },
  { source: "CCPA:CCPA.2.8", target: "GDPR:Art.28", relevance: "high", type: "overlapping", notes: "Service provider contracts / processor contracts" },
  { source: "CCPA:CCPA.3.3", target: "GDPR:Art.32", relevance: "high", type: "overlapping", notes: "Reasonable security / security of processing" },

  // ═══════════════════════════════════════════════════════════════
  // NYDFS ↔ NIST CSF 2.0
  // ═══════════════════════════════════════════════════════════════
  { source: "NYDFS:NYDFS.1.1", target: "NIST_CSF_2:GV.PO-01", relevance: "high", type: "overlapping", notes: "Cybersecurity program / cybersecurity policy" },
  { source: "NYDFS:NYDFS.2.1", target: "NIST_CSF_2:ID.RA-01", relevance: "high", type: "equivalent", notes: "Risk assessment / vulnerability identification" },
  { source: "NYDFS:NYDFS.4.3", target: "NIST_CSF_2:PR.AA-03", relevance: "high", type: "overlapping", notes: "MFA / access management" },
  { source: "NYDFS:NYDFS.5.2", target: "NIST_CSF_2:PR.DS-02", relevance: "high", type: "equivalent", notes: "Encryption / data protection" },
  { source: "NYDFS:NYDFS.6.3", target: "NIST_CSF_2:RS.MA-02", relevance: "high", type: "equivalent", notes: "Incident response plan / incident response" },
  { source: "NYDFS:NYDFS.7.1", target: "NIST_CSF_2:GV.SC-01", relevance: "high", type: "equivalent", notes: "Vendor risk policy / supply chain risk program" },

  // ═══════════════════════════════════════════════════════════════
  // OWASP ASVS ↔ NIST SP 800-53
  // ═══════════════════════════════════════════════════════════════
  { source: "OWASP_ASVS:V2.2", target: "NIST_SP_800_53:IA-2", relevance: "high", type: "overlapping", notes: "MFA / identification and authentication" },
  { source: "OWASP_ASVS:V3.1", target: "NIST_SP_800_53:AC-6", relevance: "high", type: "equivalent", notes: "Least privilege / least privilege" },
  { source: "OWASP_ASVS:V4.3", target: "NIST_SP_800_53:SI-10", relevance: "high", type: "overlapping", notes: "SQL injection prevention / input validation" },
  { source: "OWASP_ASVS:V5.1", target: "NIST_SP_800_53:SC-13", relevance: "high", type: "equivalent", notes: "Cryptographic algorithms / cryptographic protection" },
  { source: "OWASP_ASVS:V6.1", target: "NIST_SP_800_53:AU-2", relevance: "high", type: "equivalent", notes: "Security event logging / audit events" },
  { source: "OWASP_ASVS:V8.1", target: "NIST_SP_800_53:AC-3", relevance: "high", type: "equivalent", notes: "API authentication / access enforcement" },

  // ═══════════════════════════════════════════════════════════════
  // LGPD ↔ GDPR
  // ═══════════════════════════════════════════════════════════════
  { source: "LGPD:LGPD.1.2", target: "GDPR:Art.6", relevance: "high", type: "equivalent", notes: "Lawful bases / lawfulness of processing" },
  { source: "LGPD:LGPD.2.1", target: "GDPR:Art.15", relevance: "high", type: "equivalent", notes: "Confirmation and access / right of access" },
  { source: "LGPD:LGPD.2.3", target: "GDPR:Art.17", relevance: "high", type: "overlapping", notes: "Anonymization or deletion / right to erasure" },
  { source: "LGPD:LGPD.2.4", target: "GDPR:Art.20", relevance: "high", type: "equivalent", notes: "Data portability / data portability" },
  { source: "LGPD:LGPD.3.5", target: "GDPR:Art.32", relevance: "high", type: "equivalent", notes: "Security measures / security of processing" },
  { source: "LGPD:LGPD.3.6", target: "GDPR:Art.33", relevance: "high", type: "equivalent", notes: "Data breach notification / breach notification" },
  { source: "LGPD:LGPD.3.7", target: "GDPR:Art.25", relevance: "high", type: "equivalent", notes: "Privacy by design / data protection by design" },

  // ═══════════════════════════════════════════════════════════════
  // NIST AI RMF ↔ EU AI Act
  // ═══════════════════════════════════════════════════════════════
  { source: "NIST_AI_RMF:AI.GOV.1", target: "EU_AI_ACT:T2.1", relevance: "high", type: "equivalent", notes: "AI governance / AI governance framework" },
  { source: "NIST_AI_RMF:AI.GOV.7", target: "EU_AI_ACT:T2.2", relevance: "high", type: "overlapping", notes: "Third-party AI risk / AI risk management" },
  { source: "NIST_AI_RMF:AI.MAP.1", target: "EU_AI_ACT:T1.1", relevance: "high", type: "overlapping", notes: "AI system context / risk classification" },
  { source: "NIST_AI_RMF:AI.MAP.6", target: "EU_AI_ACT:T4.2", relevance: "high", type: "overlapping", notes: "AI impact assessment / bias mitigation" },
  { source: "NIST_AI_RMF:AI.MEA.3", target: "EU_AI_ACT:T4.1", relevance: "high", type: "overlapping", notes: "Bias fairness testing / data governance" },
  { source: "NIST_AI_RMF:AI.MAN.3", target: "EU_AI_ACT:T3.5", relevance: "high", type: "equivalent", notes: "Human oversight / human oversight" },

  // ═══════════════════════════════════════════════════════════════
  // ISO 42001 ↔ NIST AI RMF
  // ═══════════════════════════════════════════════════════════════
  { source: "ISO_42001:AIMS.1.5", target: "NIST_AI_RMF:AI.GOV.1", relevance: "high", type: "equivalent", notes: "AI leadership / AI governance framework" },
  { source: "ISO_42001:AIMS.2.1", target: "NIST_AI_RMF:AI.MAP.3", relevance: "high", type: "equivalent", notes: "AI risk assessment / AI risk identification" },
  { source: "ISO_42001:AIMS.2.3", target: "NIST_AI_RMF:AI.MAP.6", relevance: "high", type: "overlapping", notes: "AI system impact assessment / impact assessment" },
  { source: "ISO_42001:AIMS.3.7", target: "NIST_AI_RMF:AI.MAP.4", relevance: "high", type: "equivalent", notes: "AI data governance / AI data mapping" },
  { source: "ISO_42001:AIMS.4.1", target: "NIST_AI_RMF:AI.MEA.6", relevance: "high", type: "equivalent", notes: "AI monitoring / monitoring and observability" },

  // ═══════════════════════════════════════════════════════════════
  // PIPEDA ↔ GDPR
  // ═══════════════════════════════════════════════════════════════
  { source: "PIPEDA:PIPEDA.1.1", target: "GDPR:Art.24", relevance: "high", type: "equivalent", notes: "Accountability / controller responsibility" },
  { source: "PIPEDA:PIPEDA.2.1", target: "GDPR:Art.7", relevance: "high", type: "overlapping", notes: "Meaningful consent / conditions for consent" },
  { source: "PIPEDA:PIPEDA.4.1", target: "GDPR:Art.15", relevance: "high", type: "equivalent", notes: "Right of access / right of access" },
  { source: "PIPEDA:PIPEDA.5.1", target: "GDPR:Art.32", relevance: "high", type: "equivalent", notes: "Safeguards / security of processing" },
  { source: "PIPEDA:PIPEDA.5.3", target: "GDPR:Art.33", relevance: "high", type: "overlapping", notes: "Breach reporting to OPC / breach notification" },
  { source: "PIPEDA:PIPEDA.6.2", target: "GDPR:Art.13", relevance: "high", type: "overlapping", notes: "Privacy policy / information to data subject" },

  // ═══════════════════════════════════════════════════════════════
  // SWIFT CSP ↔ ISO 27001
  // ═══════════════════════════════════════════════════════════════
  { source: "SWIFT_CSP:SWIFT.1.1", target: "ISO_27001_2022:A.8.20", relevance: "high", type: "equivalent", notes: "Segregate SWIFT environment / network security" },
  { source: "SWIFT_CSP:SWIFT.2.1", target: "ISO_27001_2022:A.8.8", relevance: "high", type: "equivalent", notes: "Patch management / technical vulnerability management" },
  { source: "SWIFT_CSP:SWIFT.3.2", target: "ISO_27001_2022:A.8.5", relevance: "high", type: "equivalent", notes: "MFA / secure authentication" },
  { source: "SWIFT_CSP:SWIFT.3.5", target: "ISO_27001_2022:A.5.3", relevance: "high", type: "equivalent", notes: "Separation of duties / segregation of duties" },
  { source: "SWIFT_CSP:SWIFT.4.1", target: "ISO_27001_2022:A.8.15", relevance: "high", type: "equivalent", notes: "Logging and monitoring / logging" },
  { source: "SWIFT_CSP:SWIFT.5.1", target: "ISO_27001_2022:A.5.29", relevance: "high", type: "equivalent", notes: "BC for SWIFT / IS during disruption" },

  // ═══════════════════════════════════════════════════════════════
  // ISO 20000 ↔ COBIT 2019
  // ═══════════════════════════════════════════════════════════════
  { source: "ISO_20000:SMS.3.2", target: "COBIT_2019:APO09", relevance: "high", type: "equivalent", notes: "Service level management / manage service agreements" },
  { source: "ISO_20000:SMS.3.7", target: "COBIT_2019:APO10", relevance: "high", type: "equivalent", notes: "Supplier management / manage suppliers" },
  { source: "ISO_20000:SMS.4.1", target: "COBIT_2019:DSS02", relevance: "high", type: "equivalent", notes: "Incident management / manage service requests and incidents" },
  { source: "ISO_20000:SMS.5.1", target: "COBIT_2019:BAI06", relevance: "high", type: "equivalent", notes: "Change management / manage IT changes" },
  { source: "ISO_20000:SMS.6.1", target: "COBIT_2019:BAI10", relevance: "high", type: "equivalent", notes: "CMDB / manage configuration" },
  { source: "ISO_20000:SMS.7.2", target: "COBIT_2019:MEA01", relevance: "high", type: "overlapping", notes: "Internal SMS audit / performance monitoring" },
  { source: "ISO_20000:SMS.7.3", target: "COBIT_2019:EDM01", relevance: "medium", type: "related", notes: "Management review / governance framework" },

  // ═══════════════════════════════════════════════════════════════
  // BSIMM ↔ NIST SP 800-53
  // ═══════════════════════════════════════════════════════════════
  { source: "BSIMM:BSIMM.G.3", target: "NIST_SP_800_53:AT-2", relevance: "high", type: "equivalent", notes: "Training / literacy training" },
  { source: "BSIMM:BSIMM.I.1", target: "NIST_SP_800_53:RA-3", relevance: "high", type: "overlapping", notes: "Threat modeling / risk assessment" },
  { source: "BSIMM:BSIMM.S.3", target: "NIST_SP_800_53:SI-7", relevance: "high", type: "overlapping", notes: "Code review / software integrity" },
  { source: "BSIMM:BSIMM.S.5", target: "NIST_SP_800_53:CA-8", relevance: "high", type: "equivalent", notes: "Penetration testing / penetration testing" },
  { source: "BSIMM:BSIMM.S.6", target: "NIST_SP_800_53:RA-5", relevance: "high", type: "overlapping", notes: "Dependency management / vulnerability scanning" },
  { source: "BSIMM:BSIMM.D.1", target: "NIST_SP_800_53:SI-2", relevance: "high", type: "equivalent", notes: "Vulnerability management / flaw remediation" },

  // ═══════════════════════════════════════════════════════════════
  // ISO 27017 ↔ ISO 27001
  // ═══════════════════════════════════════════════════════════════
  { source: "ISO_27017:CLD.3.2", target: "ISO_27001_2022:A.8.24", relevance: "high", type: "overlapping", notes: "Cloud encryption / cryptography" },
  { source: "ISO_27017:CLD.3.4", target: "ISO_27001_2022:A.8.10", relevance: "high", type: "overlapping", notes: "Cloud data deletion / information deletion" },
  { source: "ISO_27017:CLD.4.1", target: "ISO_27001_2022:A.8.3", relevance: "high", type: "overlapping", notes: "Cloud IAM / information access restriction" },
  { source: "ISO_27017:CLD.5.5", target: "ISO_27001_2022:A.5.23", relevance: "high", type: "equivalent", notes: "Provider security assessments / cloud services security" },
  { source: "ISO_27017:CLD.6.1", target: "ISO_27001_2022:A.5.19", relevance: "medium", type: "related", notes: "Cloud exit planning / supplier relationships" },

  // ═══════════════════════════════════════════════════════════════
  // ISO 27018 ↔ ISO 27701
  // ═══════════════════════════════════════════════════════════════
  { source: "ISO_27018:PII.1.1", target: "ISO_27701:PIMS.2.5", relevance: "high", type: "overlapping", notes: "Cloud consent / lawful basis" },
  { source: "ISO_27018:PII.2.3", target: "ISO_27701:PIMS.6.2", relevance: "high", type: "equivalent", notes: "Provider as processor / processing agreements" },
  { source: "ISO_27018:PII.3.1", target: "ISO_27701:PIMS.4.1", relevance: "high", type: "equivalent", notes: "Access rights / PII principal rights" },
  { source: "ISO_27018:PII.4.5", target: "ISO_27701:PIMS.5.1", relevance: "high", type: "equivalent", notes: "Cloud breach notification / breach management" },
  { source: "ISO_27018:PII.5.2", target: "ISO_27701:PIMS.6.2", relevance: "high", type: "overlapping", notes: "PII return on contract end / processing agreements" },

  // ═══════════════════════════════════════════════════════════════
  // MAS TRM ↔ ISO 27001
  // ═══════════════════════════════════════════════════════════════
  { source: "MAS_TRM:MAS.3.1", target: "ISO_27001_2022:A.5.1", relevance: "high", type: "equivalent", notes: "Information security policy" },
  { source: "MAS_TRM:MAS.3.7", target: "ISO_27001_2022:A.8.8", relevance: "high", type: "equivalent", notes: "Vulnerability management / technical vulnerabilities" },
  { source: "MAS_TRM:MAS.4.3", target: "ISO_27001_2022:A.5.29", relevance: "high", type: "overlapping", notes: "BC and DR / IS during disruption" },
  { source: "MAS_TRM:MAS.5.1", target: "ISO_27001_2022:A.5.19", relevance: "high", type: "equivalent", notes: "Outsourcing risk / supplier relationships" },
  { source: "MAS_TRM:MAS.2.3", target: "ISO_27001_2022:A.8.32", relevance: "high", type: "equivalent", notes: "Change management / change management" },

  // ═══════════════════════════════════════════════════════════════
  // APRA CPS 234 ↔ ISO 27001
  // ═══════════════════════════════════════════════════════════════
  { source: "APRA_CPS_234:CPS234.1.1", target: "ISO_27001_2022:4.4", relevance: "high", type: "overlapping", notes: "IS capability / ISMS" },
  { source: "APRA_CPS_234:CPS234.2.1", target: "ISO_27001_2022:6.1.3", relevance: "high", type: "overlapping", notes: "Controls implementation / risk treatment" },
  { source: "APRA_CPS_234:CPS234.3.2", target: "ISO_27001_2022:A.5.9", relevance: "high", type: "equivalent", notes: "Asset inventory / asset inventory" },
  { source: "APRA_CPS_234:CPS234.4.2", target: "ISO_27001_2022:A.5.26", relevance: "high", type: "overlapping", notes: "Incident notification / incident response" },
  { source: "APRA_CPS_234:CPS234.6.1", target: "ISO_27001_2022:9.1", relevance: "high", type: "overlapping", notes: "Systematic testing / monitoring" },
];
