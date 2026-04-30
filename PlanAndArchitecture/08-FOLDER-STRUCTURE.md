# Folder Structure

## Overview

TrustMaven uses a monorepo structure with `Clients/` for the React frontend and `Servers/` for the Express backend. The architecture follows Clean Architecture principles on both sides.

---

## Complete Folder Tree

```
trust-maven/
├── Clients/                              # React Frontend Application
│   ├── public/                           # Static assets (favicon, manifest)
│   ├── src/
│   │   ├── domain/                       # Layer 1: Core business definitions
│   │   │   ├── types/                    # TypeScript type definitions
│   │   │   │   ├── risk.types.ts         # RiskDomain, RiskStatus, etc.
│   │   │   │   ├── user.types.ts         # User-related types
│   │   │   │   ├── project.types.ts      # Project-related types
│   │   │   │   ├── assessment.types.ts   # Assessment types
│   │   │   │   ├── treatment.types.ts    # Treatment types
│   │   │   │   └── common.types.ts       # Shared/generic types
│   │   │   ├── interfaces/              # Interface contracts
│   │   │   │   ├── risk.interface.ts     # IRisk, IRiskCreatePayload, etc.
│   │   │   │   ├── user.interface.ts     # IUser, IUserSummary, etc.
│   │   │   │   ├── project.interface.ts  # IProject, IProjectCreatePayload
│   │   │   │   ├── auth.interface.ts     # ILoginPayload, ITokens, etc.
│   │   │   │   └── common.interface.ts   # PaginatedResponse, ApiResponse
│   │   │   ├── enums/                   # Enumeration definitions
│   │   │   │   ├── roles.enum.ts         # UserRole enum
│   │   │   │   ├── riskDomain.enum.ts    # RiskDomain enum
│   │   │   │   └── status.enum.ts        # Various status enums
│   │   │   └── models/                  # Domain entity models
│   │   │       ├── Risk.ts
│   │   │       ├── User.ts
│   │   │       └── Project.ts
│   │   │
│   │   ├── application/                  # Layer 2: Application logic
│   │   │   ├── hooks/                   # Custom React hooks
│   │   │   │   ├── useAuth.ts            # Authentication hook
│   │   │   │   ├── useRisks.ts           # Risk CRUD operations
│   │   │   │   ├── useProjects.ts        # Project operations
│   │   │   │   ├── useAssessments.ts     # Assessment operations
│   │   │   │   ├── useTreatments.ts      # Treatment operations
│   │   │   │   ├── useUsers.ts           # User management
│   │   │   │   ├── useDashboard.ts       # Dashboard data
│   │   │   │   ├── useAuditLogs.ts       # Audit log queries
│   │   │   │   ├── useNotifications.ts   # Notification handling
│   │   │   │   └── useDebounce.ts        # Utility hooks
│   │   │   ├── contexts/               # React context providers
│   │   │   │   ├── OrganizationContext.tsx
│   │   │   │   └── NotificationContext.tsx
│   │   │   ├── redux/                   # Redux state management
│   │   │   │   ├── store.ts              # Store configuration
│   │   │   │   └── slices/
│   │   │   │       ├── authSlice.ts      # Auth state + tokens
│   │   │   │       └── uiSlice.ts        # UI preferences
│   │   │   ├── config/                  # App configuration
│   │   │   │   ├── routes.tsx            # Route definitions
│   │   │   │   └── queryClient.ts        # TanStack Query config
│   │   │   ├── utils/                   # Utility functions
│   │   │   │   ├── formatDate.ts         # Date formatting
│   │   │   │   ├── riskHelpers.ts        # Risk score/color utils
│   │   │   │   ├── exportHelpers.ts      # CSV/PDF export
│   │   │   │   └── constants.ts          # App-wide constants
│   │   │   └── validations/             # Zod validation schemas
│   │   │       ├── risk.validation.ts    # Risk form schemas
│   │   │       ├── auth.validation.ts    # Login/register schemas
│   │   │       ├── project.validation.ts # Project form schemas
│   │   │       └── user.validation.ts    # User form schemas
│   │   │
│   │   ├── infrastructure/               # Layer 3: External services
│   │   │   └── api/
│   │   │       ├── axiosInstance.ts       # Configured Axios with interceptors
│   │   │       ├── authService.ts         # Auth API calls
│   │   │       ├── riskService.ts         # Risk API calls
│   │   │       ├── projectService.ts      # Project API calls
│   │   │       ├── assessmentService.ts   # Assessment API calls
│   │   │       ├── treatmentService.ts    # Treatment API calls
│   │   │       ├── userService.ts         # User API calls
│   │   │       ├── dashboardService.ts    # Dashboard API calls
│   │   │       ├── auditLogService.ts     # Audit log API calls
│   │   │       ├── controlService.ts      # Control API calls
│   │   │       ├── frameworkService.ts    # Framework API calls
│   │   │       └── fileService.ts         # File upload/download
│   │   │
│   │   └── presentation/                 # Layer 4: UI components
│   │       ├── pages/                   # Page-level components
│   │       │   ├── Authentication/
│   │       │   │   ├── Login.tsx
│   │       │   │   ├── Register.tsx
│   │       │   │   ├── ForgotPassword.tsx
│   │       │   │   └── ResetPassword.tsx
│   │       │   ├── Dashboard/
│   │       │   │   ├── index.tsx           # Dashboard page
│   │       │   │   ├── RiskOverviewCards.tsx
│   │       │   │   ├── DomainDistributionChart.tsx
│   │       │   │   ├── RiskTrendChart.tsx
│   │       │   │   ├── RecentActivity.tsx
│   │       │   │   └── TopRisksTable.tsx
│   │       │   ├── RiskRegistry/
│   │       │   │   ├── index.tsx           # Risk list page
│   │       │   │   ├── RiskDetail.tsx      # Individual risk view
│   │       │   │   ├── RiskForm.tsx        # Create/edit form
│   │       │   │   ├── RiskFilters.tsx     # Filter panel
│   │       │   │   └── RiskTable.tsx       # Risk data table
│   │       │   ├── RiskAssessment/
│   │       │   │   ├── AssessmentForm.tsx
│   │       │   │   ├── RiskMatrix.tsx      # 5x5 matrix view
│   │       │   │   └── AssessmentHistory.tsx
│   │       │   ├── Projects/
│   │       │   │   ├── index.tsx           # Project list
│   │       │   │   ├── ProjectDetail.tsx
│   │       │   │   └── ProjectForm.tsx
│   │       │   ├── Settings/
│   │       │   │   ├── index.tsx
│   │       │   │   ├── ProfileSettings.tsx
│   │       │   │   └── OrganizationSettings.tsx
│   │       │   └── UserManagement/
│   │       │       ├── index.tsx           # User list
│   │       │       ├── InviteUser.tsx
│   │       │       └── UserDetail.tsx
│   │       ├── components/              # Shared/reusable components
│   │       │   ├── common/
│   │       │   │   ├── DataTable.tsx       # Generic data table
│   │       │   │   ├── SearchInput.tsx     # Debounced search
│   │       │   │   ├── StatusBadge.tsx     # Status indicator
│   │       │   │   ├── RiskScoreBadge.tsx  # Risk score display
│   │       │   │   ├── ConfirmDialog.tsx   # Confirmation modal
│   │       │   │   ├── LoadingSpinner.tsx  # Loading state
│   │       │   │   ├── EmptyState.tsx      # No data placeholder
│   │       │   │   ├── ErrorBoundary.tsx   # Error boundary
│   │       │   │   ├── PageHeader.tsx      # Page title + actions
│   │       │   │   └── FileUpload.tsx      # File upload component
│   │       │   └── layout/
│   │       │       ├── AppLayout.tsx       # Main app shell
│   │       │       ├── Sidebar.tsx         # Navigation sidebar
│   │       │       ├── Header.tsx          # Top header bar
│   │       │       ├── ProtectedRoute.tsx  # Auth route guard
│   │       │       └── Breadcrumbs.tsx     # Navigation breadcrumbs
│   │       ├── themes/
│   │       │   ├── light.ts               # Light theme definition
│   │       │   └── dark.ts                # Dark theme definition
│   │       └── styles/
│   │           └── global.css             # Global CSS resets
│   │
│   ├── index.html                        # HTML entry point
│   ├── package.json                      # Frontend dependencies
│   ├── tsconfig.json                     # TypeScript configuration
│   ├── vite.config.ts                    # Vite build configuration
│   └── eslint.config.js                  # ESLint flat config
│
├── Servers/                              # Express Backend Application
│   ├── index.ts                          # Server entry point
│   ├── app.ts                            # Express app configuration
│   ├── database/
│   │   ├── db.ts                         # Sequelize instance + connection
│   │   ├── config/
│   │   │   └── database.config.ts        # DB connection config per environment
│   │   └── migrations/
│   │       ├── 20260101000001-create-organizations.ts
│   │       ├── 20260101000002-create-roles.ts
│   │       ├── 20260101000003-create-users.ts
│   │       ├── 20260101000004-create-projects.ts
│   │       ├── 20260101000005-create-risks.ts
│   │       ├── 20260101000006-create-risk-assessments.ts
│   │       ├── 20260101000007-create-risk-treatments.ts
│   │       ├── 20260101000008-create-controls.ts
│   │       ├── 20260101000009-create-audit-logs.ts
│   │       ├── 20260101000010-create-frameworks.ts
│   │       ├── 20260101000011-create-vendors.ts
│   │       ├── 20260101000012-create-policies.ts
│   │       ├── 20260101000013-create-tasks.ts
│   │       ├── 20260101000014-create-files.ts
│   │       ├── 20260101000015-create-notifications.ts
│   │       └── 20260101000016-seed-default-roles.ts
│   │
│   ├── domain.layer/                     # Domain definitions
│   │   ├── models/                      # Sequelize model definitions
│   │   │   ├── user/
│   │   │   │   ├── user.model.ts         # User Sequelize model
│   │   │   │   └── user.types.ts         # User-specific types
│   │   │   ├── role/
│   │   │   │   └── role.model.ts
│   │   │   ├── organization/
│   │   │   │   └── organization.model.ts
│   │   │   ├── project/
│   │   │   │   └── project.model.ts
│   │   │   ├── risk/
│   │   │   │   └── risk.model.ts
│   │   │   ├── riskAssessment/
│   │   │   │   └── riskAssessment.model.ts
│   │   │   ├── riskTreatment/
│   │   │   │   └── riskTreatment.model.ts
│   │   │   ├── control/
│   │   │   │   └── control.model.ts
│   │   │   ├── auditLog/
│   │   │   │   └── auditLog.model.ts
│   │   │   ├── framework/
│   │   │   │   └── framework.model.ts
│   │   │   ├── vendor/
│   │   │   │   └── vendor.model.ts
│   │   │   ├── policy/
│   │   │   │   └── policy.model.ts
│   │   │   ├── task/
│   │   │   │   └── task.model.ts
│   │   │   ├── file/
│   │   │   │   └── file.model.ts
│   │   │   └── notification/
│   │   │       └── notification.model.ts
│   │   ├── validations/                 # Zod request validation schemas
│   │   │   ├── auth.validation.ts
│   │   │   ├── risk.validation.ts
│   │   │   ├── project.validation.ts
│   │   │   ├── assessment.validation.ts
│   │   │   ├── treatment.validation.ts
│   │   │   └── user.validation.ts
│   │   └── exceptions/                  # Custom error classes
│   │       ├── AppError.ts               # Base application error
│   │       ├── NotFoundError.ts
│   │       ├── ValidationError.ts
│   │       ├── UnauthorizedError.ts
│   │       └── ForbiddenError.ts
│   │
│   ├── routes/                           # Express route definitions
│   │   ├── index.ts                      # Route aggregator
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── organization.routes.ts
│   │   ├── project.routes.ts
│   │   ├── risk.routes.ts
│   │   ├── assessment.routes.ts
│   │   ├── treatment.routes.ts
│   │   ├── control.routes.ts
│   │   ├── framework.routes.ts
│   │   ├── dashboard.routes.ts
│   │   ├── auditLog.routes.ts
│   │   └── file.routes.ts
│   │
│   ├── controllers/                      # Request/response handlers
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── organization.controller.ts
│   │   ├── project.controller.ts
│   │   ├── risk.controller.ts
│   │   ├── assessment.controller.ts
│   │   ├── treatment.controller.ts
│   │   ├── control.controller.ts
│   │   ├── framework.controller.ts
│   │   ├── dashboard.controller.ts
│   │   ├── auditLog.controller.ts
│   │   └── file.controller.ts
│   │
│   ├── services/                         # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── organization.service.ts
│   │   ├── project.service.ts
│   │   ├── risk.service.ts
│   │   ├── assessment.service.ts
│   │   ├── treatment.service.ts
│   │   ├── control.service.ts
│   │   ├── framework.service.ts
│   │   ├── dashboard.service.ts
│   │   ├── auditLog.service.ts
│   │   ├── file.service.ts
│   │   ├── email.service.ts
│   │   └── cache.service.ts
│   │
│   ├── repositories/                     # Data access layer
│   │   ├── user.repository.ts
│   │   ├── organization.repository.ts
│   │   ├── project.repository.ts
│   │   ├── risk.repository.ts
│   │   ├── assessment.repository.ts
│   │   ├── treatment.repository.ts
│   │   ├── control.repository.ts
│   │   ├── framework.repository.ts
│   │   ├── auditLog.repository.ts
│   │   └── file.repository.ts
│   │
│   ├── middleware/                       # Express middleware
│   │   ├── auth.middleware.ts            # JWT verification
│   │   ├── role.middleware.ts            # Role-based authorization
│   │   ├── validate.middleware.ts        # Zod schema validation
│   │   ├── rateLimiter.middleware.ts     # Rate limiting
│   │   ├── tenant.middleware.ts          # Organization scoping
│   │   ├── auditLog.middleware.ts        # Automatic audit logging
│   │   └── errorHandler.middleware.ts    # Global error handler
│   │
│   ├── utils/                            # Utility functions
│   │   ├── jwt.utils.ts                  # Token generation/verification
│   │   ├── password.utils.ts             # Hashing helpers
│   │   ├── pagination.utils.ts           # Pagination helpers
│   │   └── logger.ts                     # Winston logger config
│   │
│   ├── types/                            # Shared TypeScript types
│   │   ├── express.d.ts                  # Express type extensions
│   │   └── environment.d.ts             # ENV variable types
│   │
│   ├── package.json                      # Backend dependencies
│   └── tsconfig.json                     # TypeScript configuration
│
├── docker-compose.yml                    # Docker services (PostgreSQL, Redis)
├── package.json                          # Root package.json (workspaces)
├── .env.example                          # Environment variable template
├── .gitignore                            # Git ignore rules
├── .prettierrc                           # Prettier configuration
├── .husky/                               # Git hooks
│   └── pre-commit                        # Lint-staged on commit
└── README.md                             # Project documentation
```

---

## Key Directory Explanations

### `Clients/src/domain/`
Pure TypeScript with no framework dependencies. Defines what the application is about: entities, value types, and contracts. Can be shared between frontend and backend in the future.

### `Clients/src/application/`
Contains the application's "use cases" expressed as React hooks, state management, and configuration. This layer knows about React and Redux but not about HTTP or UI components.

### `Clients/src/infrastructure/`
Handles communication with the outside world. The Axios instance with interceptors lives here, managing token injection, refresh flows, and error normalization.

### `Clients/src/presentation/`
Everything the user sees and interacts with. Pages compose components and use hooks from the application layer. Components are organized as common (reusable) and layout (structural).

### `Servers/domain.layer/`
Contains Sequelize model definitions, validation schemas, and custom exceptions. This is the server's domain knowledge expressed through data models and business rules.

### `Servers/routes/ → controllers/ → services/ → repositories/`
The four backend layers following a strict dependency chain. Each layer only calls the layer directly below it.

### `Servers/middleware/`
Cross-cutting concerns that apply to multiple routes: authentication, authorization, validation, rate limiting, and audit logging.
