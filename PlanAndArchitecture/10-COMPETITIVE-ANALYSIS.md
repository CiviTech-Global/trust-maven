# Competitive Analysis & Feature Priority Roadmap

## Top 10 GRC Platforms (2025–2026)

Ranked by market position, analyst recognition, and relevance to TrustMaven's domain areas.

| # | Platform | Position | Key Strength | Primary Market |
|---|----------|----------|-------------|----------------|
| 1 | **LogicGate Risk Cloud** | Gartner Leader #1 (2025) | No-code GRC, FAIR risk quantification, RCSA workflows | Mid-market to enterprise |
| 2 | **Optro (formerly AuditBoard)** | Gartner Leader (GRC + TPRM) | SOX automation, Monte Carlo simulations, KRI tracking | Fortune 500, audit-heavy orgs |
| 3 | **Diligent One** | Leader across all 5 analyst firms | Board governance + GRC unified, AI risk insights | Enterprise, board-level |
| 4 | **IBM OpenPages** | Gartner Leader (2025) | AI/NLP regulatory mapping, agentic GRC, model risk | Large enterprise, financial services |
| 5 | **ServiceNow GRC** | Gartner Leader | ITSM integration, incident-to-risk correlation, no-code playbooks | Enterprise IT-centric orgs |
| 6 | **Archer (RSA)** | Long-standing enterprise leader | Deep configurability, multi-framework control library, workflow engine | Large enterprise, regulated industries |
| 7 | **MetricStream** | IDC/Forrester Leader | ConnectedGRC (Business/Cyber/ESG), AI-first continuous compliance | Global enterprise |
| 8 | **Vanta** | IDC Leader (2025) | 400+ integrations, 1400 hourly automated tests, 35+ frameworks | Startups to mid-market, fast compliance |
| 9 | **Drata** | Fast-growing challenger | Real-time cloud monitoring, Compliance-as-Code, DevOps-native | Tech companies, cloud-native orgs |
| 10 | **Hyperproof** | Strong mid-market | 50+ frameworks, audit project plans, cross-framework evidence reuse | Multi-framework compliance teams |

---

## What TrustMaven Has Today

| Area | Current Capability |
|------|-------------------|
| **Risk Registry** | Create/edit/delete risks, 5 domains + hierarchical taxonomy, inherent/residual scoring, risk appetite thresholds, project scoping, owner assignment |
| **Risk Assessment** | 5x5 likelihood × impact matrix, risk score calculation (1-25), methodology notes, assessment history, automated review cycles |
| **Risk Treatment** | 4 strategies (avoid/mitigate/transfer/accept), 3 statuses, responsible party, due date, approval workflows |
| **Risk Quantification** | FAIR methodology (SLE × ARO = ALE), confidence levels, exposure summaries, top-risk financial ranking |
| **Risk Taxonomy** | Hierarchical multi-level categories (self-referencing tree), assignable to risks, seed-default support |
| **Controls** | 3 types (preventive/detective/corrective), design + operating effectiveness, many-to-many risk mapping, testing lifecycle (method/schedule/evidence), continuous monitoring (pass/fail events, status transitions) |
| **Control Monitoring** | Continuous monitoring with event history, health status (healthy/at_risk/failing/not_monitored), overdue detection, consecutive failure tracking |
| **KRIs** | Key Risk Indicators with thresholds (green/amber/red), current values, trend tracking, domain categorization |
| **Frameworks** | Multi-framework compliance engine, JSONB requirements, control-to-framework mapping with coverage % |
| **Governance OS** *(Phase 3c)* | Normalized regulation catalog (ISO 27001, NIST CSF 2.0, SOC 2, GDPR, ISO 31000, SOX), cross-framework mapping (~200+ bidirectional mappings), per-org regulation adoption, per-requirement implementation tracking, intelligent framework stack recommendations, automated gap analysis with cross-mapping leverage, framework-to-framework compliance translation, unified compliance hub |
| **Vendors** | Full TPRM: registry with risk levels, vendor assessments (type/rating/score), contract & SLA fields |
| **Audits** | Full audit management: plans, findings (severity/status), remediation tracking, overdue finding detection, internal/external audit types |
| **Reports** | Custom report builder: entity selection, column/filter/groupBy config, JSON/CSV generation, shared templates |
| **Projects** | Create/manage projects, assign risks, lifecycle statuses |
| **Dashboard** | Risk stats, domain distribution, trends, top risks, overdue treatments, exposure summary |
| **Users & RBAC** | 6 roles, org-scoped multi-tenancy, invite/deactivate |
| **Audit Logs** | Immutable trail, entity-level change tracking, JSONB diffs |
| **Change History** | Field-level change tracking with auto-diff, creation/deletion events, paginated audit trails |
| **Global Search** | Cross-entity ILIKE search (risks, controls, projects, vendors, KRIs, frameworks, audits), grouped results |
| **Notifications** | Real-time SSE streaming with heartbeat, connection registry, push notifications |
| **Policies** | Lifecycle management (draft → approved), versioning |
| **Export** | CSV/PDF risk reports + custom report builder |
| **Auth** | JWT access + refresh tokens, cookie rotation (Phase 2.5) |
| **Infrastructure** | Custom exception hierarchy, controller wrapper (DRY), Zod validation middleware, Winston logger with rotation, tiered rate limiting, graceful shutdown, error boundary (frontend) |

---

## Gap Analysis: What They Have That We Don't

Every feature below exists in at least one top-10 platform and is absent from TrustMaven today. Features are grouped by functional area.

### Risk Management Gaps

| Feature | Who Has It | TrustMaven Status |
|---------|-----------|-------------------|
| Inherent vs residual risk scoring | ALL top 10 | ✅ **DONE** (Phase 3a) |
| Risk quantification (FAIR, Monte Carlo) | LogicGate, Optro, IBM | ✅ **DONE** (Phase 3b) — FAIR/ALE implemented; Monte Carlo deferred |
| Risk appetite / tolerance thresholds | ServiceNow, Diligent, Archer, MetricStream | ✅ **DONE** (Phase 3a) |
| Risk velocity (speed of impact) | LogicGate, Diligent | Missing |
| Hierarchical risk taxonomy (multi-level categories) | ServiceNow, Archer, MetricStream | ✅ **DONE** (Phase 3b) |
| Risk source tracking (internal/external/third-party) | All enterprise platforms | Missing |
| Automated review cycle scheduling | ServiceNow, MetricStream, Archer | ✅ **DONE** (Phase 3b) |
| Key Risk Indicators (KRIs) with thresholds & alerts | Optro, LogicGate, MetricStream | ✅ **DONE** (Phase 3b) |
| Bowtie risk analysis | Optro | Missing |
| Risk-Control Self-Assessment (RCSA) workflows | LogicGate, MetricStream | Missing |
| Risk heatmap with appetite overlay | Diligent, Archer, ServiceNow | Missing |

### Control Management Gaps

| Feature | Who Has It | TrustMaven Status |
|---------|-----------|-------------------|
| Many-to-many risk-control mapping | ALL top 10 | ✅ **DONE** (Phase 3a) |
| Design vs operating effectiveness (SOX/PCAOB) | Optro, Archer, ServiceNow | ✅ **DONE** (Phase 3a) |
| Control testing lifecycle (method, schedule, evidence) | ALL enterprise platforms | ✅ **DONE** (Phase 3a) |
| Control-to-framework mapping | Archer, LogicGate, Vanta, Drata | ✅ **DONE** (Phase 3a) |
| Continuous control monitoring | Vanta, Drata, ServiceNow, MetricStream | ✅ **DONE** (Phase 3b) |
| Automated evidence collection | Vanta, Drata, LogicGate, Hyperproof | Missing (requires integrations) |
| Control library with cross-framework deduplication | Archer, Hyperproof, Vanta | 🔨 **Phase 3c** — cross-mapping shows which controls satisfy multiple frameworks |
| Control cost tracking (annual cost, ROI) | LogicGate, Archer | Missing |

### Compliance & Audit Gaps

| Feature | Who Has It | TrustMaven Status |
|---------|-----------|-------------------|
| Multi-framework compliance management | ALL top 10 | ✅ **DONE** (Phase 3b) |
| Automated compliance gap analysis | Vanta, Drata, Archer, LogicGate | 🔨 **Phase 3c** — smart gap analysis with cross-mapping leverage |
| Continuous compliance monitoring | Vanta, Drata, Hyperproof | ✅ **DONE** (Phase 3b) — via continuous control monitoring |
| Audit management (plans, findings, remediation) | ServiceNow, Optro, Archer, MetricStream | ✅ **DONE** (Phase 3b) |
| Audit evidence management & auditor portal | Optro, Hyperproof | Missing |
| Regulatory change management / horizon scanning | IBM, LogicGate, MetricStream | Missing |
| SOX compliance workflows | Optro, Archer, ServiceNow | 🔨 **Phase 3c** — SOX/COSO seed data + requirement tracking |
| Cross-framework evidence reuse | Hyperproof, Vanta | 🔨 **Phase 3c** — cross-framework mapping enables control reuse visibility |

### Third-Party Risk Management (TPRM) Gaps

| Feature | Who Has It | TrustMaven Status |
|---------|-----------|-------------------|
| Vendor risk assessments & scoring | ALL enterprise platforms | ✅ **DONE** (Phase 3b) |
| Vendor risk questionnaires (automated) | Vanta, Drata, ServiceNow, Optro | Missing (manual assessments only) |
| Vendor monitoring & alerts | ServiceNow, Diligent, MetricStream | Missing |
| Fourth-party risk visibility | MetricStream, Diligent | Missing |
| Contract & SLA tracking | ServiceNow, Archer | Missing |

### Workflow & Automation Gaps

| Feature | Who Has It | TrustMaven Status |
|---------|-----------|-------------------|
| Approval workflows (assessment/treatment sign-off) | ALL enterprise platforms | ✅ **DONE** (Phase 3a) |
| Configurable workflow engine (no-code) | LogicGate, Archer, ServiceNow | Missing |
| Automated notifications & escalations (SLA-based) | ALL top 10 | ✅ **DONE** — SSE real-time notifications + review cycle reminders |
| Issue management & remediation tracking | ServiceNow, Optro, MetricStream | Missing |
| Automated task generation from control tests | Optro, LogicGate | Missing |

### Analytics & Reporting Gaps

| Feature | Who Has It | TrustMaven Status |
|---------|-----------|-------------------|
| Executive/board-level dashboards | Diligent, Archer, MetricStream, IBM | Missing |
| Role-based dashboards (by line of defense) | LogicGate, Diligent | Missing |
| Custom report builder | ALL enterprise platforms | ✅ **DONE** (Phase 3b) |
| Trend analysis with predictive modeling | IBM, MetricStream | Missing |
| Financial exposure aggregation by portfolio | Optro, IBM, LogicGate | ✅ **DONE** (Phase 3b) — via risk quantification exposure summary |

### AI & Intelligence Gaps

| Feature | Who Has It | TrustMaven Status |
|---------|-----------|-------------------|
| AI-powered risk identification/classification | IBM, MetricStream, LogicGate | Missing |
| AI regulatory document parsing (NLP) | IBM, MetricStream | Missing |
| AI-driven control mapping suggestions | Vanta, Optro | Missing |
| AI vendor questionnaire auto-fill | Vanta, Optro, Drata | Missing |
| Agentic AI (autonomous compliance recommendations) | IBM (OpenPages 9.1.3) | Missing |

### Platform & Integration Gaps

| Feature | Who Has It | TrustMaven Status |
|---------|-----------|-------------------|
| SSO (SAML/OIDC) | ALL top 10 | Missing |
| REST API for external integrations | ALL top 10 | Internal API only |
| Jira/ServiceNow/Slack integrations | Hyperproof, Vanta, Drata | Missing |
| Business Continuity Management (BCM) | ServiceNow, MetricStream, IBM | Missing |
| ESG risk management | MetricStream, Diligent, IBM | Missing |

### Regulatory Intelligence & Cross-Framework Gaps

| Feature | Who Has It | TrustMaven Status |
|---------|-----------|-------------------|
| Normalized regulation catalog (full requirement trees) | Archer, MetricStream, IBM, Vanta | 🔨 **Phase 3c** — 6 frameworks with full clause/article decomposition |
| Cross-framework requirement mapping | Archer, Hyperproof, MetricStream | 🔨 **Phase 3c** — bidirectional mappings with relevance + type |
| Framework-to-framework compliance translation | IBM, MetricStream | 🔨 **Phase 3c** — "show me what my ISO 27001 covers in SOC 2" |
| Smart framework recommendation engine | None (unique differentiator) | 🔨 **Phase 3c** — industry/size/jurisdiction-based suggestions |
| Per-requirement implementation tracking (owner/reviewer/evidence) | LogicGate, Archer, MetricStream | 🔨 **Phase 3c** — full lifecycle per requirement |
| Unified multi-regulation compliance dashboard | Diligent, MetricStream, IBM | 🔨 **Phase 3c** — area scores, adoption tracking, gap highlights |

---

## Unified Priority Roadmap

All features above merged, deduplicated, and ranked by two axes:

- **Essentiality** — How critical is this for a credible GRC product? Can you sell without it?
- **Revenue Impact** — Will this directly attract customers, close deals, or enable pricing tiers?

### Priority Tiers

---

### TIER 1: Must-Have for Market Entry (Phase 3a)
*Without these, enterprise buyers won't consider TrustMaven. These are table-stakes features that appear in every competitive evaluation and RFP.*

| # | Feature | Essentiality | Revenue Impact | Rationale |
|---|---------|:---:|:---:|-----------|
| 1 | ~~**Inherent vs residual risk scoring**~~ | 10/10 | 9/10 | **DONE (Phase 3a)** — Every GRC platform does this. It's the first question in any demo. Assessments without this distinction look amateur to any risk professional. |
| 2 | ~~**Many-to-many risk-control mapping**~~ | 10/10 | 8/10 | **DONE (Phase 3a)** — One control mitigates multiple risks — this is fundamental GRC data modeling. The current 1:1 FK breaks any real-world scenario. |
| 3 | ~~**Approval workflows (assessment & treatment sign-off)**~~ | 9/10 | 9/10 | **DONE (Phase 3a)** — Enterprise customers require audit-ready approval chains. Without sign-off tracking, you can't pass a SOC 2 or ISO 27001 evaluation. |
| 4 | ~~**Control testing lifecycle**~~ | 9/10 | 9/10 | **DONE (Phase 3a)** — Testing method, schedule, last/next test dates, evidence requirements. SOC 2 auditors explicitly ask "when was this control last tested?" — no answer = no sale. |
| 5 | ~~**Design vs operating effectiveness**~~ | 9/10 | 8/10 | **DONE (Phase 3a)** — SOX/PCAOB distinction. Any company subject to SOX (all US public companies) needs this. Separate from Tier 1 because it's a field split, not a new module. |
| 6 | ~~**Control-to-framework mapping**~~ | 9/10 | 9/10 | **DONE (Phase 3a)** — "Show me which controls satisfy SOC 2 CC6.1" is the most common compliance question. The framework model exists but has no linkage. |
| 7 | ~~**Risk appetite / tolerance thresholds**~~ | 8/10 | 8/10 | **DONE (Phase 3a)** — Standard RFP checkbox. "Above appetite" filtering is expected on every dashboard. Without it, risk dashboards lack strategic context. |
| 8 | **SSO (SAML/OIDC)** | 8/10 | 9/10 | **Documented — deferred to dedicated sprint.** Enterprise procurement blocks products without SSO. Many companies have policies that prohibit password-based auth for SaaS tools. This is a hard blocker for deals. |

---

### TIER 2: Competitive Differentiators (Phase 3b)
*These separate serious GRC platforms from toys. Having them gets you into shortlists and wins head-to-head evaluations.*

| # | Feature | Essentiality | Revenue Impact | Rationale |
|---|---------|:---:|:---:|-----------|
| 9 | ~~**Key Risk Indicators (KRIs) with alerts**~~ | 8/10 | 8/10 | **DONE (Phase 3b)** — Powers proactive risk monitoring dashboards. LogicGate and Optro headline this feature. Moving from reactive to proactive is a major selling point. |
| 10 | ~~**Vendor risk assessments & questionnaires**~~ | 7/10 | 9/10 | **DONE (Phase 3b)** — TPRM is the fastest-growing GRC segment. Gartner has a separate Magic Quadrant for it. Basic vendor registry without assessments is incomplete. |
| 11 | ~~**Multi-framework compliance engine**~~ | 8/10 | 9/10 | **DONE (Phase 3b)** — Map controls to multiple frameworks, show compliance coverage %, identify gaps. Hyperproof supports 50+ frameworks. This drives upsell to compliance-heavy customers. |
| 12 | **Automated evidence collection** | 7/10 | 8/10 | Vanta and Drata's core value prop. Integrations that pull evidence automatically save audit teams weeks. Major competitive differentiator for mid-market. |
| 13 | ~~**Continuous control monitoring**~~ | 7/10 | 8/10 | **DONE (Phase 3b)** — Shift from point-in-time to continuous. Vanta runs 1400 tests/hour. Even basic continuous checks (control status, overdue tests) add significant value. |
| 14 | ~~**Audit management module**~~ | 7/10 | 8/10 | **DONE (Phase 3b)** — Audit plans, findings, remediation tracking, auditor portal. ServiceNow and Optro treat this as a core module. Required for internal audit teams. |
| 15 | ~~**Risk quantification (FAIR methodology)**~~ | 7/10 | 8/10 | **DONE (Phase 3b)** — Financial impact estimates on assessments. Enables "your cyber risk exposure is $2.4M" conversations. LogicGate and Optro use Monte Carlo simulations. |
| 16 | ~~**Hierarchical risk taxonomy**~~ | 7/10 | 6/10 | **DONE (Phase 3b)** — Multi-level categories beyond 5 flat domains. Needed as risk registries grow past 100 entries. ServiceNow and Archer use deep taxonomies. |
| 17 | ~~**Review cycle automation**~~ | 7/10 | 7/10 | **DONE (Phase 3b)** — Automated re-assessment reminders. "Overdue review" dashboards are standard. Low implementation cost, high perceived value. |
| 18 | ~~**Custom report builder**~~ | 6/10 | 8/10 | **DONE (Phase 3b)** — Every enterprise buyer asks "can I build my own reports?" Fixed CSV/PDF exports won't satisfy compliance officers who need tailored board reports. |

---

### TIER 2.5: Governance OS — Regulatory Intelligence (Phase 3c)
*Transforms TrustMaven from a compliance tool into a decision-intelligence platform. Unique differentiator — no competitor provides this as a unified, cross-framework intelligence layer.*

| # | Feature | Essentiality | Revenue Impact | Rationale |
|---|---------|:---:|:---:|-----------|
| 18a | **Normalized regulation catalog** | 9/10 | 9/10 | 🔨 **IN PROGRESS** — Full requirement trees for ISO 27001, NIST CSF 2.0, SOC 2, GDPR, ISO 31000, SOX. Structured decomposition (clause → subclause → requirement) enables granular tracking. Every serious GRC platform ships with pre-built framework content. |
| 18b | **Cross-framework requirement mapping** | 8/10 | 9/10 | 🔨 **IN PROGRESS** — Bidirectional mappings showing "ISO 27001 A.5.1 ≈ SOC 2 CC1.1 ≈ NIST CSF GV.PO". Enables control reuse, reduces audit fatigue, and is the foundation for the intelligence layer. Archer and MetricStream have this; mid-market competitors don't. |
| 18c | **Per-requirement implementation tracking** | 8/10 | 8/10 | 🔨 **IN PROGRESS** — Status, owner, reviewer, approver, evidence links, due date per requirement per organization. Turns frameworks from reference documents into actionable project plans. |
| 18d | **Smart gap analysis with cross-mapping** | 7/10 | 9/10 | 🔨 **IN PROGRESS** — "You've implemented 80% of ISO 27001; that already covers 62% of SOC 2 via cross-mappings." This is the killer demo moment that closes deals. No mid-market competitor does this. |
| 18e | **Framework recommendation engine** | 6/10 | 8/10 | 🔨 **IN PROGRESS** — "Based on your industry (fintech), size (200 employees), and jurisdictions (EU + US), we recommend: ISO 27001 + SOC 2 + GDPR." Unique differentiator — reduces time-to-value for new customers. |
| 18f | **Unified compliance hub** | 7/10 | 8/10 | 🔨 **IN PROGRESS** — Single dashboard showing compliance posture across all adopted regulations, area scores, trends, and cross-framework coverage. The "single pane of glass" that enterprise buyers demand. |

---

### TIER 3: Market Expansion Features (Phase 4)
*These open new customer segments, enable premium pricing tiers, or address growing regulatory demands.*

| # | Feature | Essentiality | Revenue Impact | Rationale |
|---|---------|:---:|:---:|-----------|
| 19 | **Compliance gap analysis (automated)** | 6/10 | 8/10 | Partially addressed by Phase 3c intelligence layer. Visual gap analysis is a top sales demo moment. Vanta and Drata lead here. |
| 20 | **Issue management & remediation tracking** | 7/10 | 7/10 | Track control failures, policy violations, audit findings as formal issues with remediation workflows. Standard in ServiceNow and MetricStream. |
| 21 | **Executive / board-level dashboards** | 6/10 | 8/10 | Diligent's unique angle — risk data formatted for board consumption. Enables "sell to the CISO, expand to the board" motion. |
| 22 | **Risk velocity** | 6/10 | 5/10 | Gartner-recommended. Low effort to add, adds analytical depth. Differentiator in demos but not a deal-breaker. |
| 23 | **Role-based dashboards (by line of defense)** | 6/10 | 7/10 | Different views for risk owners, control owners, auditors, executives. LogicGate's RCSA workflow depends on this. |
| 24 | **Jira / Slack / Teams integrations** | 5/10 | 7/10 | Remediation tasks in Jira, alerts in Slack. Hyperproof and Vanta do this well. Reduces friction for dev/security teams. |
| 25 | **Configurable workflow engine** | 6/10 | 7/10 | No-code workflow builder for custom approval chains, escalations, auto-assignments. LogicGate and Archer's core differentiator. High effort, high payoff. |
| 26 | **Control cost tracking & ROI analysis** | 5/10 | 6/10 | "This control costs $50K/year and mitigates $2M in risk" — compelling for CFO-level conversations. |
| 27 | **SOX compliance workflows** | 5/10 | 8/10 | Opens the US public company market. Optro started as SOXHUB. Requires walkthrough testing, COSO mapping, and deficiency tracking. |
| 28 | **Regulatory change management** | 5/10 | 7/10 | AI-driven horizon scanning for new regulations. IBM and MetricStream lead here. High value for financial services and healthcare. |

---

### TIER 4: Advanced / Long-term (Phase 5+)
*Visionary capabilities that position TrustMaven as an innovation leader. These are differentiators for the top-end market.*

| # | Feature | Essentiality | Revenue Impact | Rationale |
|---|---------|:---:|:---:|-----------|
| 29 | **AI risk identification & classification** | 4/10 | 7/10 | Auto-suggest risks based on industry, company profile, recent incidents. IBM and MetricStream are pioneering this. |
| 30 | **AI control mapping suggestions** | 4/10 | 7/10 | "This control likely maps to SOC 2 CC6.1 and ISO 27001 A.8.1" — reduces manual mapping work by 80%+. |
| 31 | **AI vendor questionnaire auto-fill** | 4/10 | 7/10 | Read SOC 2 reports and auto-fill security questionnaires. Vanta and Optro's AI headline feature. |
| 32 | **Business Continuity Management (BCM)** | 4/10 | 6/10 | BIA, disaster recovery plans, resilience testing. ServiceNow and MetricStream include this. Opens operational resilience market. |
| 33 | **Monte Carlo risk simulation** | 4/10 | 6/10 | Visual probability distribution of financial impact. LogicGate and Optro use this for risk quantification. Impressive in demos. |
| 34 | **ESG risk management** | 3/10 | 6/10 | Growing regulatory demand (EU CSRD, SEC climate rules). MetricStream and Diligent have dedicated ESG modules. |
| 35 | **Bowtie risk analysis** | 3/10 | 5/10 | Visual cause → risk → consequence diagrams with controls. Optro features this. Niche but powerful for safety-critical industries. |
| 36 | **Fourth-party risk visibility** | 3/10 | 5/10 | Risks from your vendors' vendors. MetricStream and Diligent track this. Emerging requirement in financial services. |
| 37 | **Agentic AI (autonomous GRC recommendations)** | 3/10 | 7/10 | IBM's OpenPages 9.1.3 direction. AI agents that autonomously recommend compliance actions. Early market, high future impact. |
| 38 | **Public REST API & marketplace** | 5/10 | 6/10 | Enable third-party integrations and partner ecosystem. Every mature platform has this. Required for platform-level positioning. |

---

## Recommended Implementation Sequence

```
Phase 3a (Tier 1)  — Market entry credibility ✅ COMPLETE
  ├─ ✅ Inherent vs residual scoring
  ├─ ✅ Many-to-many risk-control mapping
  ├─ ✅ Approval workflows
  ├─ ✅ Control testing lifecycle
  ├─ ✅ Design vs operating effectiveness
  ├─ ✅ Control-to-framework mapping
  ├─ ✅ Risk appetite thresholds
  └─ 🔲 SSO (SAML/OIDC) — deferred to dedicated sprint

Phase 3b (Tier 2)  — Competitive shortlist qualification ✅ COMPLETE
  ├─ ✅ KRIs with threshold alerts
  ├─ ✅ Vendor risk assessments & questionnaires
  ├─ ✅ Multi-framework compliance engine
  ├─ 🔲 Automated evidence collection — deferred (requires integrations)
  ├─ ✅ Continuous control monitoring
  ├─ ✅ Audit management module
  ├─ ✅ Risk quantification (FAIR)
  ├─ ✅ Hierarchical risk taxonomy
  ├─ ✅ Review cycle automation
  └─ ✅ Custom report builder

Phase 3b+ (Infrastructure & DX)  — ✅ COMPLETE
  ├─ ✅ Custom exception hierarchy (AppException → typed HTTP errors)
  ├─ ✅ Controller wrapper (DRY error handling + structured logging)
  ├─ ✅ Zod validation middleware (body/params/query)
  ├─ ✅ Winston logger with daily rotation
  ├─ ✅ Tiered rate limiting (auth/file/general)
  ├─ ✅ Graceful shutdown (SIGTERM/SIGINT)
  ├─ ✅ Global cross-entity search
  ├─ ✅ Field-level change history tracking
  ├─ ✅ SSE real-time notifications
  └─ ✅ React Error Boundary

Phase 3c (Governance OS)  — Core regulatory intelligence layer 🔨 IN PROGRESS
  ├─ Regulation Catalog (normalized definitions + requirement trees)
  │   ├─ ISO 27001:2022 (7 clauses, 25+ subclauses, Annex A 93 controls)
  │   ├─ NIST CSF 2.0 (6 functions, 22 categories, 106 subcategories)
  │   ├─ SOC 2 Type II (5 trust service categories, ~60 criteria)
  │   ├─ GDPR (11 chapters, key articles)
  │   ├─ ISO 31000:2018 (principles + process + framework)
  │   └─ SOX/COSO (5 components, key sections 302/404/906)
  ├─ Cross-Framework Mapping (bidirectional, ~200+ mappings)
  │   ├─ ISO 27001 ↔ NIST CSF ↔ SOC 2 (InfoSec triangle)
  │   ├─ GDPR ↔ ISO 27001 (privacy ↔ security)
  │   ├─ ISO 31000 ↔ ISO 27001 clause 6 (risk mgmt alignment)
  │   └─ SOX/COSO ↔ SOC 2 (financial ↔ audit)
  ├─ Organization Regulation Adoption (per-tenant framework selection)
  ├─ Requirement Implementation Tracking (per-requirement status/owner/evidence)
  ├─ Regulation Intelligence Service
  │   ├─ Smart framework stack recommendations (by industry/size/jurisdiction)
  │   ├─ Automated gap analysis with cross-mapping leverage
  │   ├─ Framework-to-framework compliance translation
  │   └─ Unified compliance scoring across areas
  ├─ Compliance Hub (unified frontend)
  │   ├─ Dashboard: area scores, adopted regulations, overall compliance %
  │   ├─ Regulation Detail: collapsible requirement tree with implementation status
  │   ├─ Cross-Mapping View: visual mapping between frameworks
  │   └─ Framework Recommender: wizard for intelligent stack selection
  └─ Seeder Service (TypeScript structure files → DB on boot/admin action)

Phase 4 (Tier 3)   — Market expansion
  ├─ Compliance gap analysis (partially covered by Phase 3c intelligence layer)
  ├─ Issue management & remediation
  ├─ Executive dashboards
  ├─ Workflow engine
  ├─ Integrations (Jira/Slack/Teams)
  ├─ SOX workflows (partially covered by Phase 3c SOX seed data)
  ├─ Regulatory change management
  └─ Cross-framework evidence reuse (partially covered by Phase 3c cross-mappings)

Phase 5+ (Tier 4)  — Innovation leadership
  ├─ AI risk/control/vendor intelligence
  ├─ BCM module
  ├─ Monte Carlo simulations
  ├─ ESG module
  └─ Agentic AI
```

---

## Revenue Impact Summary

| Phase | New Customer Segments Unlocked | Pricing Impact |
|-------|-------------------------------|---------------|
| **3a** | Mid-market companies with SOC 2/ISO requirements; any org with formal risk program | Enables paid tier. Without Tier 1 features, TrustMaven is a demo, not a product. |
| **3b** | Compliance-heavy orgs (fintech, healthcare, SaaS); companies managing 3+ frameworks; organizations with TPRM requirements | Premium tier. KRIs, TPRM, and multi-framework are upsell drivers. |
| **3c** | Multi-regulation enterprises (fintech needing SOC 2 + GDPR + SOX); organizations seeking framework consolidation; consultancies managing clients across standards | Governance OS premium. Cross-framework intelligence and smart gap analysis are unique differentiators. "Show me how my ISO 27001 work already covers SOC 2" is a killer demo moment. |
| **4** | US public companies (SOX); enterprises with board reporting needs; dev-heavy orgs (via integrations) | Enterprise tier. Board dashboards and SOX workflows justify 3-5x pricing. |
| **5+** | Financial services, critical infrastructure, regulated industries requiring AI-augmented GRC | Innovation premium. AI features are marketing differentiators and conference demo material. |

---

## Sources

- [Gartner MQ for GRC Tools 2025](https://www.gartner.com/en/documents/7111830)
- [LogicGate Risk Cloud Features](https://www.logicgate.com/platform/features/)
- [Optro (AuditBoard) Platform](https://optro.ai/)
- [Diligent One Platform](https://www.diligent.com/platform/diligent-one)
- [IBM OpenPages](https://www.ibm.com/products/openpages)
- [ServiceNow GRC](https://www.servicenow.com/products/governance-risk-and-compliance.html)
- [Archer GRC Platform](https://www.archerirm.com/)
- [MetricStream ConnectedGRC](https://www.metricstream.com/products/connected-grc.htm)
- [Vanta GRC](https://www.vanta.com/resources/5-best-grc-software-solutions-for-enterprise-teams-in-2026)
- [Drata Compliance Automation](https://drata.com/blog/best-grc-tools-2025)
- [Hyperproof GRC](https://optro.ai/blog/best-grc-tools)
- [Top GRC Tools 2025 — Gartner-Backed](https://technologicinnovation.com/2025/07/21/best-grc-tools-in-2025-gartners-top-10-list/)
- [G2 Best GRC Products 2026](https://www.g2.com/best-software-companies/top-governance-risk-and-compliance)
- [Pathlock GRC Tools List](https://pathlock.com/blog/grc/list-of-top-grc-tools-and-softwares/)
