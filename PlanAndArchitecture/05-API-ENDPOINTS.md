# API Endpoints

## Overview

All API endpoints are prefixed with `/api/v1/` and follow RESTful conventions. Authentication is required for all endpoints except those under `/api/v1/auth/` (login, register, password reset).

### Common Headers

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Standard Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content (successful delete) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 409 | Conflict (duplicate resource) |
| 429 | Too Many Requests (rate limited) |
| 500 | Internal Server Error |

---

## Authentication

### POST /api/v1/auth/register

Create a new user account and organization.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecureP@ss123",
  "firstName": "John",
  "lastName": "Doe",
  "organizationName": "Acme Corp"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin"
    },
    "organization": {
      "id": "uuid",
      "name": "Acme Corp",
      "slug": "acme-corp"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

### POST /api/v1/auth/login

Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecureP@ss123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin",
      "organizationId": "uuid"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

### POST /api/v1/auth/refresh

Obtain a new access token using a valid refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

### POST /api/v1/auth/forgot-password

Initiate password reset flow. Sends email with reset token.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "If the email exists, a reset link has been sent."
  }
}
```

### POST /api/v1/auth/reset-password

Reset password using token from email.

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "NewSecureP@ss456"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Password reset successfully."
  }
}
```

### GET /api/v1/auth/me

Get the current authenticated user's profile.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": {
      "id": "uuid",
      "name": "admin",
      "permissions": { ... }
    },
    "organization": {
      "id": "uuid",
      "name": "Acme Corp",
      "slug": "acme-corp"
    },
    "lastLogin": "2026-04-28T10:00:00Z"
  }
}
```

---

## Users

**Required Role:** Admin (full CRUD), Risk Manager (read only for team), Others (own profile only)

### GET /api/v1/users

List all users in the organization.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `search` (string) - search by name or email
- `role` (string) - filter by role name
- `isActive` (boolean)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": { "id": "uuid", "name": "analyst" },
      "isActive": true,
      "lastLogin": "2026-04-28T10:00:00Z",
      "createdAt": "2026-01-15T08:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

### POST /api/v1/users

Invite/create a new user in the organization.

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "roleId": "uuid"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "newuser@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": { "id": "uuid", "name": "analyst" },
    "isActive": true,
    "createdAt": "2026-04-30T12:00:00Z"
  }
}
```

### GET /api/v1/users/:id

Get a specific user by ID.

### PUT /api/v1/users/:id

Update a user's details (name, role, active status).

### DELETE /api/v1/users/:id

Deactivate a user (soft delete - sets `is_active` to false).

---

## Organizations

**Required Role:** Admin

### GET /api/v1/organizations/:id

Get organization details.

### PUT /api/v1/organizations/:id

Update organization settings.

**Request Body:**
```json
{
  "name": "Acme Corp Updated",
  "settings": {
    "defaultRiskDomain": "cybersecurity",
    "notificationsEnabled": true,
    "timezone": "America/New_York"
  }
}
```

---

## Projects

**Required Role:** Admin, Risk Manager (full CRUD), Analyst (read + create), Auditor/Viewer (read only)

### GET /api/v1/projects

List all projects in the organization.

**Query Parameters:**
- `page`, `limit`, `search`
- `status` (active, completed, archived)
- `ownerId` (UUID)
- `sort` (name, created_at, start_date)
- `order` (asc, desc)

### POST /api/v1/projects

Create a new project.

**Request Body:**
```json
{
  "name": "Q2 Security Assessment",
  "description": "Quarterly security risk assessment for all digital assets",
  "status": "active",
  "startDate": "2026-04-01",
  "endDate": "2026-06-30"
}
```

### GET /api/v1/projects/:id

Get a specific project with summary stats.

### PUT /api/v1/projects/:id

Update project details.

### DELETE /api/v1/projects/:id

Archive a project (soft delete).

---

## Risks

**Required Role:** Admin, Risk Manager (full CRUD), Analyst (create, read, update), Auditor/Viewer (read only)

### GET /api/v1/risks

List all risks in the organization with filtering.

**Query Parameters:**
- `page`, `limit`, `search`
- `domain` (financial, cybersecurity, strategic, operational, regulatory)
- `status` (identified, assessed, treated, accepted, closed)
- `projectId` (UUID)
- `ownerId` (UUID)
- `minScore` (number 1-25)
- `maxScore` (number 1-25)
- `sort` (title, created_at, risk_score, status)
- `order` (asc, desc)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Data breach via unpatched servers",
      "description": "Critical servers running outdated OS versions...",
      "domain": "cybersecurity",
      "status": "assessed",
      "owner": {
        "id": "uuid",
        "firstName": "John",
        "lastName": "Doe"
      },
      "project": {
        "id": "uuid",
        "name": "Q2 Security Assessment"
      },
      "latestAssessment": {
        "likelihood": 4,
        "impact": 5,
        "riskScore": 20
      },
      "treatmentCount": 2,
      "createdAt": "2026-03-15T09:00:00Z",
      "updatedAt": "2026-04-20T14:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 87,
    "totalPages": 5
  }
}
```

### POST /api/v1/risks

Create a new risk entry.

**Request Body:**
```json
{
  "title": "Market share erosion in core segment",
  "description": "New market entrants with disruptive models threatening core revenue streams...",
  "domain": "strategic",
  "projectId": "uuid",
  "ownerId": "uuid"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Market share erosion in core segment",
    "description": "New market entrants with disruptive models threatening core revenue streams...",
    "domain": "strategic",
    "status": "identified",
    "owner": { "id": "uuid", "firstName": "Jane", "lastName": "Smith" },
    "project": { "id": "uuid", "name": "Strategic Growth Review" },
    "createdAt": "2026-04-30T12:00:00Z",
    "updatedAt": "2026-04-30T12:00:00Z"
  }
}
```

### GET /api/v1/risks/:id

Get a specific risk with full details, assessments, and treatments.

### PUT /api/v1/risks/:id

Update a risk entry.

### DELETE /api/v1/risks/:id

Delete a risk (or mark as closed depending on business rules).

---

## Risk Assessments

Nested under risks for clear parent-child relationship.

### GET /api/v1/risks/:riskId/assessments

List all assessments for a risk (ordered by assessed_at desc).

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "likelihood": 4,
      "impact": 5,
      "riskScore": 20,
      "methodology": "Qualitative expert judgment",
      "notes": "Based on recent threat intelligence reports...",
      "assessor": { "id": "uuid", "firstName": "John", "lastName": "Doe" },
      "assessedAt": "2026-04-25T10:00:00Z",
      "createdAt": "2026-04-25T10:00:00Z"
    }
  ],
  "meta": { "total": 3 }
}
```

### POST /api/v1/risks/:riskId/assessments

Create a new assessment for a risk.

**Request Body:**
```json
{
  "likelihood": 4,
  "impact": 5,
  "methodology": "Qualitative expert judgment",
  "notes": "Based on recent threat intelligence reports indicating increased APT activity..."
}
```

### GET /api/v1/risks/:riskId/assessments/:id

Get a specific assessment.

### PUT /api/v1/risks/:riskId/assessments/:id

Update an assessment.

### DELETE /api/v1/risks/:riskId/assessments/:id

Delete an assessment.

---

## Risk Treatments

Nested under risks for clear parent-child relationship.

### GET /api/v1/risks/:riskId/treatments

List all treatment plans for a risk.

### POST /api/v1/risks/:riskId/treatments

Create a new treatment plan.

**Request Body:**
```json
{
  "strategy": "mitigate",
  "description": "Implement automated patching schedule for all production servers with 48-hour SLA for critical patches.",
  "responsibleId": "uuid",
  "dueDate": "2026-05-31"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "strategy": "mitigate",
    "description": "Implement automated patching schedule...",
    "status": "planned",
    "responsible": { "id": "uuid", "firstName": "Jane", "lastName": "Smith" },
    "dueDate": "2026-05-31",
    "createdAt": "2026-04-30T12:00:00Z",
    "updatedAt": "2026-04-30T12:00:00Z"
  }
}
```

### GET /api/v1/risks/:riskId/treatments/:id

Get a specific treatment plan.

### PUT /api/v1/risks/:riskId/treatments/:id

Update a treatment plan (status, description, assignment, due date).

### DELETE /api/v1/risks/:riskId/treatments/:id

Delete a treatment plan.

---

## Controls

**Required Role:** Admin, Risk Manager (full CRUD), Analyst (read + create), Auditor/Viewer (read only)

### GET /api/v1/controls

List all controls in the organization.

**Query Parameters:**
- `page`, `limit`, `search`
- `type` (preventive, detective, corrective)
- `effectiveness` (effective, partially_effective, ineffective)
- `riskId` (UUID)

### POST /api/v1/controls

Create a new control.

**Request Body:**
```json
{
  "title": "Multi-factor authentication",
  "description": "Enforce MFA for all user accounts accessing production systems",
  "type": "preventive",
  "effectiveness": "effective",
  "riskId": "uuid",
  "ownerId": "uuid"
}
```

### GET /api/v1/controls/:id

Get a specific control.

### PUT /api/v1/controls/:id

Update a control.

### DELETE /api/v1/controls/:id

Delete a control.

---

## Frameworks

**Required Role:** Admin, Risk Manager (full CRUD), Others (read only)

### GET /api/v1/frameworks

List all frameworks in the organization.

### POST /api/v1/frameworks

Create a new framework.

**Request Body:**
```json
{
  "name": "ISO 27001:2022",
  "version": "2022",
  "description": "Information security management system standard",
  "requirements": [
    {
      "id": "A.5.1",
      "title": "Policies for information security",
      "description": "A set of policies for information security shall be defined..."
    }
  ]
}
```

### GET /api/v1/frameworks/:id

Get a specific framework with requirements.

### PUT /api/v1/frameworks/:id

Update a framework.

### DELETE /api/v1/frameworks/:id

Delete a framework.

---

## Dashboard

**Required Role:** All authenticated users (data scoped by role)

### GET /api/v1/dashboard/stats

Get summary statistics for the dashboard.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalRisks": 87,
    "risksByStatus": {
      "identified": 12,
      "assessed": 35,
      "treated": 28,
      "accepted": 8,
      "closed": 4
    },
    "risksByDomain": {
      "financial": 18,
      "cybersecurity": 25,
      "strategic": 10,
      "operational": 22,
      "regulatory": 12
    },
    "highRiskCount": 15,
    "overdueeTreatments": 3,
    "activeProjects": 5,
    "recentActivity": [
      {
        "type": "risk_created",
        "description": "New risk identified: Market share erosion",
        "user": "John Doe",
        "timestamp": "2026-04-30T11:30:00Z"
      }
    ]
  }
}
```

### GET /api/v1/dashboard/risk-matrix

Get data for the 5x5 risk matrix visualization.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "matrix": [
      { "likelihood": 5, "impact": 5, "count": 2, "risks": ["uuid1", "uuid2"] },
      { "likelihood": 4, "impact": 5, "count": 3, "risks": ["uuid3", "uuid4", "uuid5"] },
      { "likelihood": 4, "impact": 4, "count": 5, "risks": ["..."] }
    ],
    "topRisks": [
      {
        "id": "uuid",
        "title": "Data breach via unpatched servers",
        "domain": "cybersecurity",
        "riskScore": 25,
        "likelihood": 5,
        "impact": 5
      }
    ]
  }
}
```

---

## Audit Logs

**Required Role:** Admin, Auditor (read only)

### GET /api/v1/audit-logs

Retrieve audit log entries.

**Query Parameters:**
- `page`, `limit`
- `userId` (UUID) - filter by acting user
- `entityType` (string) - filter by entity type
- `entityId` (UUID) - filter by specific entity
- `action` (create, update, delete)
- `startDate` (ISO date)
- `endDate` (ISO date)
- `sort` (created_at)
- `order` (asc, desc - default: desc)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "user": { "id": "uuid", "firstName": "John", "lastName": "Doe" },
      "entityType": "risk",
      "entityId": "uuid",
      "action": "update",
      "changes": {
        "status": { "old": "identified", "new": "assessed" },
        "updatedAt": { "old": "2026-04-20T10:00:00Z", "new": "2026-04-25T14:00:00Z" }
      },
      "ipAddress": "192.168.1.100",
      "createdAt": "2026-04-25T14:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 1250,
    "totalPages": 25
  }
}
```

---

## Files

**Required Role:** Admin, Risk Manager, Analyst (upload/download), Auditor/Viewer (download only)

### POST /api/v1/files/upload

Upload a file attachment.

**Request:** `multipart/form-data`
- `file` - The file to upload
- `relatedEntityType` (string) - Entity type to attach to
- `relatedEntityId` (UUID) - Entity ID to attach to

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "filename": "risk-assessment-report.pdf",
    "mimeType": "application/pdf",
    "size": 245780,
    "uploadedBy": { "id": "uuid", "firstName": "John", "lastName": "Doe" },
    "createdAt": "2026-04-30T12:00:00Z"
  }
}
```

### GET /api/v1/files/:id

Download a file by ID. Returns the file stream with appropriate Content-Type header.

---

## Rate Limiting

| Endpoint Category | Limit |
|-------------------|-------|
| Authentication (login, register) | 5 requests per 15 minutes per IP |
| Password reset | 3 requests per hour per IP |
| General API | 100 requests per 15 minutes per user |
| File upload | 10 requests per hour per user |
| Dashboard stats | 30 requests per minute per user |
