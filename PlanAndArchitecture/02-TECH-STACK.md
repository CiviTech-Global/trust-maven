# Technology Stack

## Overview

TrustMaven uses a modern, TypeScript-first PERN stack optimized for developer productivity, type safety, and enterprise-grade reliability.

---

## Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI library with concurrent features |
| TypeScript | 5.4+ | Static type safety |
| Vite | 6 | Build tool and dev server |
| MUI (Material UI) | 6 | Component library and design system |
| Redux Toolkit | 2 | Global state management (auth, UI) |
| TanStack Query | 5 | Server state management and caching |
| React Router | 7 | Client-side routing with lazy loading |
| Axios | latest | HTTP client with interceptors |
| Zod | latest | Runtime schema validation |
| Recharts | latest | Data visualization and charts |

### Frontend Rationale

- **React 19** provides concurrent rendering capabilities and improved performance for data-heavy dashboards.
- **MUI 6** delivers a comprehensive, accessible component library ideal for enterprise B2B applications with complex data tables, forms, and navigation patterns.
- **Redux Toolkit 2** manages authentication state and UI preferences that need to persist across the application, while **TanStack Query 5** handles all server-side data fetching, caching, and synchronization.
- **Vite 6** offers near-instant HMR and optimized production builds.

---

## Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20 LTS | Runtime environment |
| Express | 5 | Web framework |
| TypeScript | 5.4+ | Static type safety |
| Sequelize | 6 | ORM for PostgreSQL |
| sequelize-typescript | latest | Decorator-based model definitions |
| PostgreSQL | 16 | Primary relational database |
| Redis | 7 | Caching and session management |
| Zod | latest | Request validation |
| multer | latest | File upload handling |
| node-cron | latest | Scheduled tasks |

### Backend Rationale

- **Express 5** brings async error handling support and improved routing.
- **Sequelize 6 with sequelize-typescript** provides decorator-based model definitions that align well with TypeScript class patterns and offer strong migration support.
- **PostgreSQL 16** delivers JSONB support for flexible schema fields, robust indexing, and enterprise-grade reliability.
- **Redis 7** handles token blacklisting, rate limiting, and frequently-accessed data caching.

---

## Authentication & Security

| Technology | Purpose |
|------------|---------|
| jsonwebtoken (JWT) | Access and refresh token generation/verification |
| bcrypt | Password hashing (12 salt rounds) |
| Role-based middleware | Route-level authorization |
| Helmet | HTTP security headers |
| cors | Cross-origin resource sharing configuration |
| express-rate-limit | API rate limiting |
| hpp | HTTP parameter pollution protection |

### Auth Flow

1. User authenticates with email/password
2. Server issues short-lived access token (15 min) and long-lived refresh token (7 days)
3. Access token sent in Authorization header for API requests
4. Refresh token stored in HTTP-only cookie
5. Token refresh endpoint provides seamless session extension
6. Role-based middleware validates permissions on protected routes

---

## Testing

| Technology | Purpose | Scope |
|------------|---------|-------|
| Vitest | Unit and integration tests | Frontend |
| React Testing Library | Component testing | Frontend |
| Jest | Unit and integration tests | Backend |
| Supertest | HTTP endpoint testing | Backend |
| MSW (Mock Service Worker) | API mocking | Frontend |

### Testing Strategy

- **Unit tests** for business logic, utilities, and isolated functions
- **Integration tests** for API endpoints and database operations
- **Component tests** for critical UI components and user flows
- Minimum 80% coverage target for business-critical paths

---

## Development Tools

| Tool | Version/Config | Purpose |
|------|---------------|---------|
| ESLint | 9 (flat config) | Code linting and static analysis |
| Prettier | latest | Code formatting |
| Docker Compose | latest | Local development environment |
| Husky | latest | Git hooks management |
| lint-staged | latest | Pre-commit linting on staged files |
| concurrently | latest | Run client and server simultaneously |
| nodemon | latest | Backend auto-restart on changes |

### ESLint Configuration

ESLint 9 uses the new flat config format (`eslint.config.js`) with:
- TypeScript-aware rules via `@typescript-eslint`
- React-specific rules via `eslint-plugin-react` and `eslint-plugin-react-hooks`
- Import ordering via `eslint-plugin-import`
- Accessibility via `eslint-plugin-jsx-a11y`

---

## Infrastructure (Local Development)

Docker Compose orchestrates the following services for local development:

```yaml
services:
  postgres:
    image: postgres:16
    ports: 5432:5432
    volumes: postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports: 6379:6379
```

### Environment Configuration

- `.env.example` provides template for required environment variables
- Separate `.env` files for development, testing, and production
- Secrets managed via environment variables (never committed to source control)

---

## Package Management

- **npm** workspaces for monorepo management
- Root `package.json` defines workspace structure
- Shared dependencies hoisted to root
- Individual `package.json` in `Clients/` and `Servers/`

---

## Deployment Considerations (Post-MVP)

While not in MVP scope, the stack is designed to support:
- Containerized deployment via Docker
- Cloud hosting (AWS, GCP, or Azure)
- CI/CD pipelines (GitHub Actions)
- Database migrations via Sequelize CLI
- Environment-specific configurations
