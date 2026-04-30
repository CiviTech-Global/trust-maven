# Database Schema

## Overview

TrustMaven uses PostgreSQL 16 as its primary relational database. The schema is designed for multi-tenant isolation (shared-schema approach with `organization_id`), comprehensive audit logging, and flexible extensibility via JSONB columns where appropriate.

All UUIDs are generated using `uuid_generate_v4()`. Timestamps use `TIMESTAMPTZ` for timezone awareness.

---

## Entity Relationship Diagram (Text)

```
organizations ─┬── users ──── roles
               ├── projects
               ├── risks ──┬── risk_assessments
               │            ├── risk_treatments
               │            └── controls
               ├── audit_logs
               ├── frameworks
               ├── vendors
               ├── policies
               ├── tasks
               ├── files
               └── notifications (via users)
```

---

## Table Definitions

### organizations

The root tenant entity. All data is scoped to an organization.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| name | VARCHAR(255) | NOT NULL | Organization display name |
| slug | VARCHAR(100) | NOT NULL, UNIQUE | URL-friendly identifier |
| settings | JSONB | DEFAULT '{}' | Organization preferences and configuration |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last modification timestamp |

**Indexes:**
- `idx_organizations_slug` UNIQUE on `slug`

---

### roles

Defines permission sets assignable to users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| name | VARCHAR(50) | NOT NULL, UNIQUE | Role name (admin, risk_manager, analyst, auditor, viewer) |
| permissions | JSONB | NOT NULL, DEFAULT '{}' | Granular permission definitions |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |

**Default Roles:**
- `admin` - Full system access
- `risk_manager` - Manage risks, projects, team
- `analyst` - Create/assess risks, generate reports
- `auditor` - Read-only access to all data and audit logs
- `viewer` - Dashboard viewing only

**Permissions JSONB Structure:**
```json
{
  "risks": { "create": true, "read": true, "update": true, "delete": true },
  "projects": { "create": true, "read": true, "update": true, "delete": true },
  "users": { "create": true, "read": true, "update": true, "delete": true },
  "audit_logs": { "read": true },
  "settings": { "manage": true }
}
```

---

### users

Application users, each belonging to one organization.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| organization_id | UUID | FK → organizations(id), NOT NULL | Tenant scope |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Login email |
| password_hash | VARCHAR(255) | NOT NULL | bcrypt hashed password |
| first_name | VARCHAR(100) | NOT NULL | User first name |
| last_name | VARCHAR(100) | NOT NULL | User last name |
| role_id | UUID | FK → roles(id), NOT NULL | Assigned role |
| is_active | BOOLEAN | NOT NULL, DEFAULT true | Account active status |
| last_login | TIMESTAMPTZ | NULL | Last successful login timestamp |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last modification timestamp |

**Indexes:**
- `idx_users_email` UNIQUE on `email`
- `idx_users_organization_id` on `organization_id`
- `idx_users_role_id` on `role_id`

**Relationships:**
- Belongs to `organizations` (many-to-one)
- Belongs to `roles` (many-to-one)
- Has many `risks` (as owner)
- Has many `risk_assessments` (as assessor)
- Has many `audit_logs`

---

### projects

Logical groupings for organizing risks.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| organization_id | UUID | FK → organizations(id), NOT NULL | Tenant scope |
| name | VARCHAR(255) | NOT NULL | Project name |
| description | TEXT | NULL | Project description |
| status | ENUM | NOT NULL, DEFAULT 'active' | Values: active, completed, archived |
| owner_id | UUID | FK → users(id), NOT NULL | Project owner |
| start_date | DATE | NULL | Project start date |
| end_date | DATE | NULL | Project end date |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last modification timestamp |

**Indexes:**
- `idx_projects_organization_id` on `organization_id`
- `idx_projects_owner_id` on `owner_id`
- `idx_projects_status` on `status`

---

### risks

Core risk registry entries.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| organization_id | UUID | FK → organizations(id), NOT NULL | Tenant scope |
| project_id | UUID | FK → projects(id), NULL | Associated project |
| title | VARCHAR(255) | NOT NULL | Risk title |
| description | TEXT | NULL | Detailed risk description |
| domain | ENUM | NOT NULL | Values: financial, cybersecurity, ai_governance, operational, regulatory |
| status | ENUM | NOT NULL, DEFAULT 'identified' | Values: identified, assessed, treated, accepted, closed |
| owner_id | UUID | FK → users(id), NULL | Assigned risk owner |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last modification timestamp |

**Indexes:**
- `idx_risks_organization_id` on `organization_id`
- `idx_risks_project_id` on `project_id`
- `idx_risks_domain` on `domain`
- `idx_risks_status` on `status`
- `idx_risks_owner_id` on `owner_id`
- `idx_risks_org_domain_status` on `(organization_id, domain, status)`

---

### risk_assessments

Quantitative and qualitative risk assessments.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| risk_id | UUID | FK → risks(id), NOT NULL, ON DELETE CASCADE | Parent risk |
| assessor_id | UUID | FK → users(id), NOT NULL | User who performed assessment |
| likelihood | INTEGER | NOT NULL, CHECK (1-5) | Probability rating (1=Rare, 5=Almost Certain) |
| impact | INTEGER | NOT NULL, CHECK (1-5) | Impact severity (1=Negligible, 5=Catastrophic) |
| risk_score | INTEGER | GENERATED ALWAYS AS (likelihood * impact) STORED | Computed risk score (1-25) |
| methodology | VARCHAR(255) | NULL | Assessment methodology used |
| notes | TEXT | NULL | Assessment notes and justification |
| assessed_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | When assessment was performed |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |

**Indexes:**
- `idx_risk_assessments_risk_id` on `risk_id`
- `idx_risk_assessments_assessor_id` on `assessor_id`
- `idx_risk_assessments_risk_score` on `risk_score`

**Notes:**
- `risk_score` is a computed column (likelihood x impact), ranging from 1 to 25
- Multiple assessments per risk allow historical tracking
- The latest assessment represents the current risk level

---

### risk_treatments

Treatment plans for addressing risks.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| risk_id | UUID | FK → risks(id), NOT NULL, ON DELETE CASCADE | Parent risk |
| strategy | ENUM | NOT NULL | Values: avoid, mitigate, transfer, accept |
| description | TEXT | NOT NULL | Treatment plan details |
| status | ENUM | NOT NULL, DEFAULT 'planned' | Values: planned, in_progress, completed |
| responsible_id | UUID | FK → users(id), NULL | Person responsible for implementation |
| due_date | DATE | NULL | Target completion date |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last modification timestamp |

**Indexes:**
- `idx_risk_treatments_risk_id` on `risk_id`
- `idx_risk_treatments_status` on `status`
- `idx_risk_treatments_responsible_id` on `responsible_id`
- `idx_risk_treatments_due_date` on `due_date`

---

### controls

Risk mitigation controls linked to risks.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| organization_id | UUID | FK → organizations(id), NOT NULL | Tenant scope |
| risk_id | UUID | FK → risks(id), NULL | Associated risk |
| title | VARCHAR(255) | NOT NULL | Control title |
| description | TEXT | NULL | Control description |
| type | ENUM | NOT NULL | Values: preventive, detective, corrective |
| effectiveness | ENUM | NOT NULL, DEFAULT 'effective' | Values: effective, partially_effective, ineffective |
| owner_id | UUID | FK → users(id), NULL | Control owner |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last modification timestamp |

**Indexes:**
- `idx_controls_organization_id` on `organization_id`
- `idx_controls_risk_id` on `risk_id`
- `idx_controls_type` on `type`

---

### audit_logs

Immutable audit trail for all data modifications.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| organization_id | UUID | FK → organizations(id), NOT NULL | Tenant scope |
| user_id | UUID | FK → users(id), NOT NULL | User who performed the action |
| entity_type | VARCHAR(50) | NOT NULL | Type of entity modified (risk, project, user, etc.) |
| entity_id | UUID | NOT NULL | ID of the modified entity |
| action | ENUM | NOT NULL | Values: create, update, delete |
| changes | JSONB | NOT NULL, DEFAULT '{}' | Before/after values of changed fields |
| ip_address | INET | NULL | Client IP address |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | When the action occurred |

**Indexes:**
- `idx_audit_logs_organization_id` on `organization_id`
- `idx_audit_logs_user_id` on `user_id`
- `idx_audit_logs_entity` on `(entity_type, entity_id)`
- `idx_audit_logs_created_at` on `created_at`
- `idx_audit_logs_action` on `action`

**Notes:**
- Audit logs are append-only (no UPDATE or DELETE operations allowed)
- The `changes` JSONB stores the diff: `{ "field": { "old": "value", "new": "value" } }`
- Retention policy: 2 years minimum for compliance

---

### frameworks

Compliance frameworks and standards.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| organization_id | UUID | FK → organizations(id), NOT NULL | Tenant scope |
| name | VARCHAR(255) | NOT NULL | Framework name (e.g., ISO 27001, NIST CSF) |
| version | VARCHAR(50) | NULL | Framework version |
| description | TEXT | NULL | Framework description |
| requirements | JSONB | NOT NULL, DEFAULT '[]' | Structured requirements/controls list |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last modification timestamp |

**Indexes:**
- `idx_frameworks_organization_id` on `organization_id`

---

### vendors

Third-party vendor risk tracking.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| organization_id | UUID | FK → organizations(id), NOT NULL | Tenant scope |
| name | VARCHAR(255) | NOT NULL | Vendor name |
| description | TEXT | NULL | Vendor description and service details |
| risk_level | ENUM | NOT NULL, DEFAULT 'medium' | Values: critical, high, medium, low |
| contact_info | JSONB | DEFAULT '{}' | Contact details (name, email, phone) |
| status | VARCHAR(50) | NOT NULL, DEFAULT 'active' | Vendor relationship status |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last modification timestamp |

**Indexes:**
- `idx_vendors_organization_id` on `organization_id`
- `idx_vendors_risk_level` on `risk_level`

---

### policies

Organizational policy documents.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| organization_id | UUID | FK → organizations(id), NOT NULL | Tenant scope |
| title | VARCHAR(255) | NOT NULL | Policy title |
| content | TEXT | NULL | Full policy content |
| version | VARCHAR(20) | NOT NULL, DEFAULT '1.0' | Policy version number |
| status | ENUM | NOT NULL, DEFAULT 'draft' | Values: draft, review, approved, retired |
| owner_id | UUID | FK → users(id), NULL | Policy owner |
| approved_at | TIMESTAMPTZ | NULL | When policy was approved |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last modification timestamp |

**Indexes:**
- `idx_policies_organization_id` on `organization_id`
- `idx_policies_status` on `status`

---

### tasks

General-purpose task tracking linked to any entity.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| organization_id | UUID | FK → organizations(id), NOT NULL | Tenant scope |
| title | VARCHAR(255) | NOT NULL | Task title |
| description | TEXT | NULL | Task details |
| status | ENUM | NOT NULL, DEFAULT 'todo' | Values: todo, in_progress, done |
| assignee_id | UUID | FK → users(id), NULL | Assigned user |
| due_date | DATE | NULL | Task due date |
| related_entity_type | VARCHAR(50) | NULL | Polymorphic: entity type (risk, treatment, etc.) |
| related_entity_id | UUID | NULL | Polymorphic: entity ID |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last modification timestamp |

**Indexes:**
- `idx_tasks_organization_id` on `organization_id`
- `idx_tasks_assignee_id` on `assignee_id`
- `idx_tasks_status` on `status`
- `idx_tasks_related_entity` on `(related_entity_type, related_entity_id)`

---

### files

File attachments linked to any entity.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| organization_id | UUID | FK → organizations(id), NOT NULL | Tenant scope |
| filename | VARCHAR(255) | NOT NULL | Original file name |
| path | VARCHAR(500) | NOT NULL | Storage path |
| mime_type | VARCHAR(100) | NOT NULL | File MIME type |
| size | INTEGER | NOT NULL | File size in bytes |
| uploaded_by | UUID | FK → users(id), NOT NULL | User who uploaded the file |
| related_entity_type | VARCHAR(50) | NULL | Polymorphic: entity type |
| related_entity_id | UUID | NULL | Polymorphic: entity ID |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Upload timestamp |

**Indexes:**
- `idx_files_organization_id` on `organization_id`
- `idx_files_related_entity` on `(related_entity_type, related_entity_id)`

---

### notifications

User notification records.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Primary key |
| user_id | UUID | FK → users(id), NOT NULL | Recipient user |
| title | VARCHAR(255) | NOT NULL | Notification title |
| message | TEXT | NOT NULL | Notification body |
| type | VARCHAR(50) | NOT NULL | Notification category (risk_assigned, treatment_due, etc.) |
| is_read | BOOLEAN | NOT NULL, DEFAULT false | Read status |
| related_entity_type | VARCHAR(50) | NULL | Polymorphic: entity type |
| related_entity_id | UUID | NULL | Polymorphic: entity ID |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | When notification was created |

**Indexes:**
- `idx_notifications_user_id` on `user_id`
- `idx_notifications_user_unread` on `(user_id, is_read)` WHERE `is_read = false`

---

## Migration Strategy

### Approach

TrustMaven uses Sequelize CLI for database migrations, following these principles:

1. **Sequential Migrations** - Each migration file is timestamped and runs in order
2. **Up/Down Methods** - Every migration includes both `up` (apply) and `down` (rollback) methods
3. **Idempotent Seeds** - Seed data (roles, default settings) can be re-run safely
4. **No Destructive Changes in Production** - Column drops/renames use multi-step migration patterns

### Migration Naming Convention

```
YYYYMMDDHHMMSS-description.ts
```

Example:
```
20260101000001-create-organizations.ts
20260101000002-create-roles.ts
20260101000003-create-users.ts
20260101000004-create-projects.ts
20260101000005-create-risks.ts
20260101000006-create-risk-assessments.ts
20260101000007-create-risk-treatments.ts
20260101000008-create-controls.ts
20260101000009-create-audit-logs.ts
20260101000010-create-frameworks.ts
20260101000011-create-vendors.ts
20260101000012-create-policies.ts
20260101000013-create-tasks.ts
20260101000014-create-files.ts
20260101000015-create-notifications.ts
20260101000016-seed-default-roles.ts
```

### Migration Commands

```bash
# Generate a new migration
npx sequelize-cli migration:generate --name create-risks

# Run all pending migrations
npx sequelize-cli db:migrate

# Rollback last migration
npx sequelize-cli db:migrate:undo

# Rollback all migrations
npx sequelize-cli db:migrate:undo:all

# Run seeders
npx sequelize-cli db:seed:all
```

### Schema Change Guidelines

1. **Adding columns** - Use a single migration with `addColumn`
2. **Removing columns** - First deprecate, then remove in a later release
3. **Renaming columns** - Add new column, migrate data, remove old column (3 migrations)
4. **Adding indexes** - Use `CONCURRENTLY` for production to avoid table locks
5. **Enum changes** - Add new values only; never remove values from production enums

### Database Extensions

The following PostgreSQL extensions are required:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";    -- UUID generation
CREATE EXTENSION IF NOT EXISTS "pg_trgm";       -- Trigram indexing for search
```
