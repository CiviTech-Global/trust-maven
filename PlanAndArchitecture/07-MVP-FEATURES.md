# MVP Features

## Phase 1 - Minimum Viable Product

The MVP delivers a fully functional risk management platform covering the complete risk lifecycle: identification, assessment, treatment, and monitoring.

---

### 1. Authentication and Session Management

**Description:** Secure user authentication system with role-based access.

**Features:**
- Email/password registration with organization creation
- Login with JWT-based session management
- Access token (15 min) + refresh token (7 days) pattern
- Password reset via email with secure token
- Session persistence across browser refreshes
- Automatic token refresh on expiry
- Logout with token invalidation
- Account activation/deactivation by admin

**User Stories:**
- As a new user, I can register and create my organization
- As a returning user, I can log in and stay authenticated
- As a user, I can reset my password if forgotten
- As an admin, I can deactivate user accounts

---

### 2. Dashboard

**Description:** Central hub providing at-a-glance risk posture visibility.

**Features:**
- **Risk Overview Statistics** - Total risks, by status, by severity level
- **Risk Distribution by Domain** - Pie/donut chart showing breakdown across 5 domains
- **Risk Trend Chart** - Line chart showing risk count over time (weekly/monthly)
- **Recent Activity Feed** - Timeline of latest actions (risk created, assessed, treated)
- **Top Risks by Score** - List of highest-scoring risks requiring attention
- **Overdue Treatments** - Treatments past their due date
- **Quick Actions** - Shortcuts to create risks, start assessments

**Data Points:**
| Metric | Description |
|--------|-------------|
| Total Risks | Count of all non-closed risks |
| Critical Risks | Risks with score >= 20 |
| High Risks | Risks with score 15-19 |
| Pending Assessments | Risks in "identified" status |
| Active Treatments | Treatments in "in_progress" status |
| Overdue Items | Treatments past due date |

---

### 3. Risk Registry

**Description:** Central repository for all identified risks with full lifecycle management.

**Features:**
- **Create Risk** - Form with title, description, domain, project assignment, owner
- **View Risks** - Tabular list with sortable columns and pagination
- **Edit Risk** - Update any risk field, change status, reassign
- **Delete Risk** - Soft delete / close with confirmation
- **Filter by Domain** - Financial, Cybersecurity, AI Governance, Operational, Regulatory
- **Filter by Status** - Identified, Assessed, Treated, Accepted, Closed
- **Filter by Project** - Show risks for a specific project
- **Search** - Full-text search across title and description
- **Bulk Actions** - Select multiple risks for status change or assignment
- **Domain Categories** - Color-coded domain labels for quick identification

**Risk Lifecycle:**
```
Identified → Assessed → Treated → Accepted/Closed
                ↑                      │
                └──────────────────────┘
                   (Re-assessment)
```

**5 Domain Categories:**
| Domain | Icon/Color | Description |
|--------|-----------|-------------|
| Financial | Blue | Market, credit, liquidity, budget risks |
| Cybersecurity | Red | Threats, breaches, vulnerabilities |
| AI Governance | Purple | Model bias, transparency, ethics |
| Operational | Orange | Process, supply chain, system failures |
| Regulatory | Green | Compliance, legal, policy adherence |

---

### 4. Risk Assessment

**Description:** Quantitative risk evaluation using industry-standard likelihood/impact methodology.

**Features:**
- **5x5 Risk Matrix** - Visual grid showing likelihood (Y) vs impact (X)
- **Risk Scoring** - Automatic calculation: Likelihood (1-5) x Impact (1-5) = Score (1-25)
- **Assessment Form** - Select likelihood, impact, methodology, and notes
- **Assessment History** - View all past assessments for a risk with timestamps
- **Methodology Notes** - Document the rationale and methodology used
- **Matrix Visualization** - Interactive heat map showing all risks positioned by score
- **Score-Based Severity** - Automatic severity classification based on score ranges

**Risk Score Severity Levels:**
| Score Range | Severity | Color | Action Required |
|-------------|----------|-------|-----------------|
| 1-4 | Low | Green | Monitor |
| 5-9 | Medium | Yellow | Review quarterly |
| 10-14 | High | Orange | Treatment plan required |
| 15-19 | Very High | Red | Immediate treatment |
| 20-25 | Critical | Dark Red | Executive escalation |

**Likelihood Scale:**
| Value | Label | Description |
|-------|-------|-------------|
| 1 | Rare | May occur only in exceptional circumstances |
| 2 | Unlikely | Could occur but not expected |
| 3 | Possible | Might occur at some time |
| 4 | Likely | Will probably occur in most circumstances |
| 5 | Almost Certain | Expected to occur frequently |

**Impact Scale:**
| Value | Label | Description |
|-------|-------|-------------|
| 1 | Negligible | Minimal impact, easily absorbed |
| 2 | Minor | Some impact, manageable within normal operations |
| 3 | Moderate | Significant impact requiring management attention |
| 4 | Major | Serious impact on objectives or operations |
| 5 | Catastrophic | Severe impact threatening organizational viability |

---

### 5. Risk Treatment Plans

**Description:** Structured approach to addressing identified risks through four treatment strategies.

**Features:**
- **4 Treatment Strategies:**
  - **Avoid** - Eliminate the activity causing the risk
  - **Mitigate** - Reduce likelihood or impact through controls
  - **Transfer** - Share or transfer risk to third party (insurance, outsourcing)
  - **Accept** - Acknowledge and monitor without active treatment
- **Treatment Creation** - Strategy selection, description, responsible party, due date
- **Status Tracking** - Planned, In Progress, Completed
- **Responsible Assignment** - Assign team member accountable for implementation
- **Due Date Management** - Set and track target completion dates
- **Multiple Treatments per Risk** - A single risk can have multiple treatment plans
- **Treatment Progress** - Visual progress indicators

**Treatment Workflow:**
```
Create Treatment → Assign Responsible → Set Due Date
         │
         ▼
    Planned → In Progress → Completed
                               │
                               ▼
                    Risk Status → Treated/Accepted
```

---

### 6. Project Management

**Description:** Organize risks into logical groups for portfolio-level management.

**Features:**
- **Create Project** - Name, description, dates, status
- **Project Dashboard** - Risk summary specific to the project
- **Assign Risks** - Associate risks with projects
- **Project Status** - Active, Completed, Archived
- **Team Members** - View who is working on project risks
- **Project Timeline** - Start and end dates with progress tracking
- **Risk Count by Status** - Quick view of risk distribution within project

**Project Views:**
- List view with key metrics per project
- Individual project detail with full risk breakdown
- Project-scoped risk matrix

---

### 7. User Management

**Description:** Organization and user administration with role-based access control.

**Features:**
- **RBAC with 5 Roles:**
  | Role | Create | Read | Update | Delete | Admin |
  |------|--------|------|--------|--------|-------|
  | Admin | All | All | All | All | Yes |
  | Risk Manager | Risks, Projects | All | Own + Team | Own + Team | No |
  | Analyst | Risks, Assessments | Assigned | Own | No | No |
  | Auditor | No | All + Audit Logs | No | No | No |
  | Viewer | No | Dashboard Only | No | No | No |
- **Invite Users** - Send email invitations to join organization
- **Role Assignment** - Assign and change user roles
- **Organization Management** - Update org name, settings, preferences
- **Profile Settings** - Update personal info, change password
- **User Deactivation** - Disable accounts without data loss

---

### 8. Audit Trail

**Description:** Comprehensive, immutable record of all system actions for compliance and accountability.

**Features:**
- **Automatic Logging** - All create, update, and delete actions recorded
- **Change Details** - Before/after values for every field change
- **User Attribution** - Who performed the action
- **Timestamp** - When the action occurred
- **IP Address** - Client IP for security tracking
- **Filterable Log Viewer:**
  - By user
  - By entity type (risk, project, user, etc.)
  - By action (create, update, delete)
  - By date range
- **Export Capability** - Export audit logs to CSV for compliance reporting
- **Immutable Records** - Logs cannot be modified or deleted

**Logged Actions:**
- Risk created, updated, deleted, status changed
- Assessment created, updated
- Treatment created, updated, status changed
- Project created, updated, archived
- User created, role changed, deactivated
- Settings changed

---

### 9. Basic Reporting

**Description:** Export and visualization capabilities for risk communication and compliance.

**Features:**
- **Risk Summary Export (CSV)** - Export risk registry with all fields
- **Risk Summary Export (PDF)** - Formatted risk report with matrix
- **Visual Charts:**
  - Risk distribution by domain (pie chart)
  - Risk trend over time (line chart)
  - Treatment progress (bar chart)
  - Risk matrix heat map (5x5 grid)
- **Risk Matrix View** - Interactive 5x5 matrix with risk details on hover/click
- **Filtered Exports** - Export based on current filter selection

---

## Phase 2 - Future Enhancements

The following features are planned for post-MVP releases:

### Vendor Risk Management
- Vendor registry with risk profiles
- Vendor risk assessments and scoring
- Contract and SLA tracking
- Third-party risk monitoring

### Policy Lifecycle Management
- Policy creation and versioning
- Approval workflows (draft, review, approved, retired)
- Policy compliance tracking
- Automated review reminders

### Workflow Automations
- Configurable workflows for risk lifecycle
- Automated notifications and escalations
- Scheduled assessments and reviews
- SLA-based alerts for overdue items

### AI Risk Advisor
- Natural language risk identification suggestions
- Automated risk categorization
- Treatment recommendation engine
- Anomaly detection in risk patterns

### Third-Party Integrations
- Jira integration for treatment task tracking
- ServiceNow for incident correlation
- Slack/Teams notifications
- SSO via SAML/OIDC (Okta, Azure AD)

### Advanced Analytics
- Predictive risk modeling
- Monte Carlo simulations
- Key Risk Indicators (KRI) tracking
- Benchmarking against industry data

### Custom Frameworks
- Build custom compliance frameworks
- Map risks to framework requirements
- Gap analysis and compliance scoring
- Framework assessment workflows
