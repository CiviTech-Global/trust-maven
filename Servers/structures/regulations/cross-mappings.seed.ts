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
];
