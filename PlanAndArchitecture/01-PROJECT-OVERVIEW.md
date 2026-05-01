# Project Overview

## Vision

TrustMaven is a comprehensive risk management platform designed to help organizations identify, assess, treat, and monitor risks across their entire operational landscape. The platform provides a unified workspace where risk professionals can collaborate on risk governance, maintain compliance, and make data-driven decisions to protect their organizations.

TrustMaven aims to replace fragmented spreadsheet-based risk tracking with a modern, purpose-built application that brings clarity, accountability, and automation to enterprise risk management.

## Scope

TrustMaven is a full-stack web application built on the PERN stack:

| Layer      | Technology |
|------------|------------|
| Database   | PostgreSQL |
| Backend    | Express.js (Node.js) |
| Frontend   | React |
| Runtime    | Node.js |

The application follows a monorepo structure with separate client and server packages, orchestrated via Docker Compose for local development.

## MVP Risk Domains

The MVP supports five core risk domains that cover the most critical areas of modern enterprise risk:

### 1. Financial Risk
Risks related to financial loss, market volatility, credit exposure, liquidity constraints, and budgetary overruns. Includes revenue impact modeling and cost-of-risk calculations.

### 2. Cybersecurity Risk
Risks arising from cyber threats, data breaches, unauthorized access, malware, phishing, and infrastructure vulnerabilities. Covers both technical and human-factor security risks.

### 3. Strategic Risk
Risks associated with market shifts, M&A integration challenges, competitive disruption, geographic concentration, reputational damage, and long-term portfolio positioning.

### 4. Operational Risk
Risks stemming from internal process failures, supply chain disruptions, system breakdowns, human error, and business continuity threats. Covers day-to-day operational resilience.

### 5. Regulatory & Compliance Risk
Risks related to non-compliance with laws, regulations, industry standards, and internal policies. Includes tracking of regulatory changes, audit readiness, and policy adherence.

## User Personas and Roles

TrustMaven implements role-based access control (RBAC) with five distinct user roles:

### Admin
- Full system control and configuration
- User and organization management
- System-wide settings and integrations
- Access to all data and audit logs
- Can assign and modify roles

### Risk Manager
- Create and manage risk projects
- Assign risks to team members
- Approve treatment plans
- Configure risk frameworks
- View team-wide dashboards and reports

### Analyst
- Perform risk assessments
- Create and update risk entries
- Document treatment plans
- Generate reports
- Collaborate on assigned projects

### Auditor
- Read-only access to all risk data
- Full audit trail visibility
- Export capabilities for compliance reporting
- Cannot modify any records
- Can view historical changes and assessment history

### Viewer
- Dashboard access only
- View risk summaries and visualizations
- Cannot access detailed risk records
- Limited to high-level organizational risk posture

## MVP Goals

The minimum viable product delivers the following core capabilities:

1. **Functional Risk Registry** - A centralized repository for all identified risks, categorized by domain, with full lifecycle tracking from identification through closure.

2. **Assessment Matrix** - A 5x5 likelihood-impact matrix for quantifying risk severity, with visual heat maps and automated risk scoring.

3. **Treatment Plans** - Structured treatment workflows supporting four strategies (avoid, mitigate, transfer, accept) with ownership assignment and progress tracking.

4. **Project Organization** - Group risks into projects for portfolio-level management, with project dashboards and team collaboration.

5. **Role-Based Access Control (RBAC)** - Granular permissions ensuring users only access data and actions appropriate to their role within the organization.

6. **Audit Trail** - Comprehensive logging of all create, update, and delete actions with timestamp, user attribution, and change details for compliance and accountability.

## Success Metrics

- Users can register, log in, and manage their organization
- Risk entries can be created, assessed, treated, and tracked through their lifecycle
- Dashboard provides immediate visibility into organizational risk posture
- All actions are logged and auditable
- Multi-tenant isolation ensures data security between organizations
