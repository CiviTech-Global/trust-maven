# System Architecture

## High-Level Architecture

TrustMaven follows a clean architecture pattern on both frontend and backend, ensuring separation of concerns, testability, and maintainability.

### System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                            │
│                                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────────────┐  │
│  │  React SPA  │  │ Redux Store  │  │  TanStack Query Cache     │  │
│  │  (Vite)     │  │ (Auth/UI)    │  │  (Server State)           │  │
│  └──────┬──────┘  └──────────────┘  └───────────────────────────┘  │
│         │                                                           │
│  ┌──────┴──────────────────────────────────────────────────┐        │
│  │  Axios Instance (Interceptors, Token Injection, Retry)  │        │
│  └──────┬──────────────────────────────────────────────────┘        │
└─────────┼───────────────────────────────────────────────────────────┘
          │ HTTPS
          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      API GATEWAY (Express 5)                         │
│                                                                     │
│  ┌──────────┐ ┌────────┐ ┌───────────┐ ┌────────┐ ┌────────────┐  │
│  │  CORS    │ │ Helmet │ │ Rate Limit│ │  Auth  │ │ Validation │  │
│  │  Filter  │ │ Headers│ │ Middleware│ │  JWT   │ │    (Zod)   │  │
│  └──────────┘ └────────┘ └───────────┘ └────────┘ └────────────┘  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                      ROUTES (/api/v1/*)                      │    │
│  └──────┬──────────────────────────────────────────────────────┘    │
│         │                                                           │
│  ┌──────▼──────────────────────────────────────────────────────┐    │
│  │                      CONTROLLERS                             │    │
│  │         (Request parsing, response formatting)               │    │
│  └──────┬──────────────────────────────────────────────────────┘    │
│         │                                                           │
│  ┌──────▼──────────────────────────────────────────────────────┐    │
│  │                      SERVICES                                │    │
│  │         (Business logic, orchestration)                      │    │
│  └──────┬──────────────────────────────────────────────────────┘    │
│         │                                                           │
│  ┌──────▼──────────────────────────────────────────────────────┐    │
│  │                    REPOSITORIES                              │    │
│  │         (Data access, query building)                        │    │
│  └──────┬─────────────────────────┬────────────────────────────┘    │
└─────────┼─────────────────────────┼────────────────────────────────┘
          │                         │
          ▼                         ▼
┌──────────────────┐      ┌──────────────────┐
│   PostgreSQL 16  │      │     Redis 7      │
│                  │      │                  │
│  - User data     │      │  - Token cache   │
│  - Risk records  │      │  - Rate limits   │
│  - Audit logs    │      │  - Session data  │
│  - All entities  │      │  - Query cache   │
└──────────────────┘      └──────────────────┘
```

---

## Backend Architecture

### Layered Architecture

The backend follows a strict layered architecture where dependencies flow inward (toward the domain):

```
Routes → Controllers → Services → Repositories → Models
```

#### Routes
- Define HTTP endpoints and HTTP method mappings
- Apply middleware (auth, validation, rate limiting)
- Delegate to controllers
- No business logic

#### Controllers
- Parse request parameters, body, and query strings
- Call appropriate service methods
- Format and return HTTP responses
- Handle HTTP-specific concerns (status codes, headers)
- No direct database access

#### Services
- Contain all business logic and orchestration
- Enforce business rules and domain constraints
- Coordinate between multiple repositories
- Trigger side effects (audit logging, notifications)
- Unit-testable without HTTP or database dependencies

#### Repositories
- Encapsulate all data access logic
- Build and execute database queries via Sequelize
- Handle query optimization and pagination
- Return domain entities (not raw database rows)
- Abstract the ORM from the service layer

#### Models
- Sequelize model definitions with TypeScript decorators
- Define table structure, constraints, and associations
- Provide type-safe entity representations
- Located in `domain.layer/models/`

### Backend Flow Example (Create Risk)

```
POST /api/v1/risks
    │
    ├── Auth Middleware (verify JWT, extract user)
    ├── Validation Middleware (Zod schema check)
    │
    ▼
RiskController.create(req, res)
    │
    ▼
RiskService.createRisk(data, user)
    ├── Validate business rules
    ├── RiskRepository.create(data)
    ├── AuditLogService.log(action)
    │
    ▼
Response: 201 Created { risk: {...} }
```

---

## Frontend Architecture

### Clean Architecture Layers

The frontend applies clean architecture principles adapted for React:

```
Presentation → Application → Infrastructure → Domain
```

#### Domain Layer (`src/domain/`)
- TypeScript types, interfaces, and enums
- Entity models and value objects
- Zero dependencies on external libraries
- Defines the "what" of the application

#### Application Layer (`src/application/`)
- Custom React hooks for business operations
- Redux store configuration and slices
- React contexts for shared state
- Route configuration and query client setup
- Utility functions and validation schemas
- Orchestrates domain entities with infrastructure

#### Infrastructure Layer (`src/infrastructure/`)
- Axios instance with interceptors
- API service classes (HTTP communication)
- Token management (injection, refresh flow)
- External service integrations
- Handles the "how" of data transfer

#### Presentation Layer (`src/presentation/`)
- React components (pages and shared components)
- MUI theme configuration
- Layout components (sidebar, header, navigation)
- Styling and visual presentation
- User interaction handling

---

## API Design

### RESTful Conventions

All API endpoints follow REST conventions with consistent patterns:

- **Base URL**: `/api/v1/`
- **Versioning**: URL-based versioning for backward compatibility
- **Resource naming**: Plural nouns (`/risks`, `/projects`, `/users`)
- **Nested resources**: For strong parent-child relationships (`/risks/:id/assessments`)
- **HTTP methods**: GET (read), POST (create), PUT (update), DELETE (remove)

### Response Format

All responses follow a consistent envelope structure:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable error message",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

### Pagination

- Query parameters: `?page=1&limit=20`
- Default limit: 20, maximum limit: 100
- Response includes `meta` with pagination details

### Filtering and Sorting

- Filter via query parameters: `?domain=financial&status=identified`
- Sort via: `?sort=created_at&order=desc`
- Search via: `?search=keyword`

---

## Multi-Tenancy

TrustMaven implements a **shared-schema multi-tenancy** model:

### Design

- All tenant-scoped tables include an `organization_id` column
- Every query is scoped to the authenticated user's organization
- Middleware automatically injects `organization_id` into all queries
- Database indexes on `organization_id` ensure query performance
- No data leakage between tenants

### Implementation

```typescript
// Middleware extracts org from authenticated user
const tenantScope = (req, res, next) => {
  req.organizationId = req.user.organizationId;
  next();
};

// Repository automatically applies scope
class RiskRepository {
  async findAll(organizationId: string, filters: RiskFilters) {
    return Risk.findAll({
      where: { organization_id: organizationId, ...filters }
    });
  }
}
```

### Tenant Isolation Rules

- Users can only belong to one organization
- All CRUD operations are scoped by `organization_id`
- Admin operations are scoped to the user's own organization
- Cross-tenant data access is architecturally impossible

---

## Security Architecture

### Authentication

| Mechanism | Details |
|-----------|---------|
| Access Token | JWT, 15-minute expiry, sent in Authorization header |
| Refresh Token | JWT, 7-day expiry, HTTP-only secure cookie |
| Password Storage | bcrypt with 12 salt rounds |
| Token Revocation | Redis-based blacklist for logout/password change |

### Authorization

- Role-based access control (RBAC) enforced at middleware level
- Permissions defined per role in the `roles` table (JSONB)
- Route-level permission checks before controller execution
- Resource-level ownership checks in service layer

### HTTP Security

| Protection | Implementation |
|------------|---------------|
| CORS | Whitelist of allowed origins |
| Headers | Helmet.js (CSP, HSTS, X-Frame-Options, etc.) |
| Rate Limiting | express-rate-limit (100 req/15 min general, 5 req/15 min auth) |
| Input Validation | Zod schemas on all request bodies |
| SQL Injection | Parameterized queries via Sequelize ORM |
| XSS | Input sanitization + Content-Security-Policy |
| CSRF | SameSite cookies + token-based auth |

### Data Security

- All passwords hashed with bcrypt (never stored in plaintext)
- Sensitive data encrypted at rest (database-level encryption)
- Audit trail for all data modifications
- PII handled in compliance with data protection requirements
- Environment variables for all secrets and configuration

---

## Caching Strategy

### Redis Cache Layers

1. **Session/Token Cache** - Refresh token storage and blacklisted tokens
2. **Rate Limit Counters** - Per-user and per-IP request counts
3. **Query Cache** - Frequently accessed, rarely changing data (org settings, role definitions)
4. **Dashboard Cache** - Pre-computed dashboard statistics (5-minute TTL)

### Cache Invalidation

- Write-through pattern for critical data
- TTL-based expiration for non-critical caches
- Event-driven invalidation on data mutations
- Manual cache clear via admin interface

---

## Error Handling

### Backend Error Chain

```
Route → Controller → Service → Repository
                                    │
                         Throws domain exceptions
                                    │
                    ▼                ▼
            Service catches and wraps
                    │
                    ▼
         Controller formats HTTP response
                    │
                    ▼
      Global error handler (catch-all)
```

### Error Categories

| Category | HTTP Code | Example |
|----------|-----------|---------|
| Validation | 400 | Invalid request body |
| Authentication | 401 | Missing or expired token |
| Authorization | 403 | Insufficient permissions |
| Not Found | 404 | Resource does not exist |
| Conflict | 409 | Duplicate email registration |
| Rate Limited | 429 | Too many requests |
| Server Error | 500 | Unexpected failures |

---

## Scalability Considerations

While the MVP targets a single-server deployment, the architecture supports future scaling:

- **Stateless API servers** - Horizontal scaling behind a load balancer
- **Database connection pooling** - Sequelize connection pool configuration
- **Redis clustering** - For distributed caching and session management
- **Background jobs** - Bull queue integration for async processing
- **File storage** - Abstract interface supporting local and cloud (S3) storage
