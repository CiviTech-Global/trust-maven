# Frontend Architecture

## Overview

The TrustMaven frontend is a React Single Page Application (SPA) built with TypeScript, organized using Clean Architecture principles adapted for the React ecosystem. This ensures separation of concerns, testability, and maintainability as the application scales.

---

## Clean Architecture Layers

The frontend source code is organized into four layers, with dependencies flowing inward (presentation depends on application, which depends on infrastructure, which depends on domain).

```
┌─────────────────────────────────────────────────────┐
│                  PRESENTATION                        │
│   Pages, Components, Themes, Styles                 │
├─────────────────────────────────────────────────────┤
│                  APPLICATION                         │
│   Hooks, Redux, Contexts, Config, Utils, Validation │
├─────────────────────────────────────────────────────┤
│                  INFRASTRUCTURE                      │
│   API Services, Axios Instance, External Adapters   │
├─────────────────────────────────────────────────────┤
│                     DOMAIN                           │
│   Types, Interfaces, Enums, Entity Models           │
└─────────────────────────────────────────────────────┘
```

---

## Domain Layer (`src/domain/`)

The domain layer contains pure TypeScript definitions with zero external dependencies. It defines the core concepts of the application.

### Types (`domain/types/`)

```typescript
// domain/types/risk.types.ts
export type RiskDomain = 'financial' | 'cybersecurity' | 'ai_governance' | 'operational' | 'regulatory';
export type RiskStatus = 'identified' | 'assessed' | 'treated' | 'accepted' | 'closed';
export type TreatmentStrategy = 'avoid' | 'mitigate' | 'transfer' | 'accept';
export type TreatmentStatus = 'planned' | 'in_progress' | 'completed';
export type ControlType = 'preventive' | 'detective' | 'corrective';
export type ControlEffectiveness = 'effective' | 'partially_effective' | 'ineffective';
export type ProjectStatus = 'active' | 'completed' | 'archived';
```

### Interfaces (`domain/interfaces/`)

```typescript
// domain/interfaces/risk.interface.ts
export interface IRisk {
  id: string;
  organizationId: string;
  projectId: string | null;
  title: string;
  description: string | null;
  domain: RiskDomain;
  status: RiskStatus;
  owner: IUserSummary | null;
  project: IProjectSummary | null;
  latestAssessment: IRiskAssessmentSummary | null;
  treatmentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IRiskCreatePayload {
  title: string;
  description?: string;
  domain: RiskDomain;
  projectId?: string;
  ownerId?: string;
}
```

### Enums (`domain/enums/`)

```typescript
// domain/enums/roles.enum.ts
export enum UserRole {
  ADMIN = 'admin',
  RISK_MANAGER = 'risk_manager',
  ANALYST = 'analyst',
  AUDITOR = 'auditor',
  VIEWER = 'viewer',
}
```

### Models (`domain/models/`)

Domain entity models that represent the core business objects, used across all layers.

---

## Application Layer (`src/application/`)

The application layer orchestrates domain entities with infrastructure services. It contains the application's business logic expressed through hooks, state management, and configuration.

### Custom Hooks (`application/hooks/`)

```typescript
// application/hooks/useRisks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { riskService } from '../../infrastructure/api/riskService';
import { IRiskCreatePayload, RiskFilters } from '../../domain/interfaces/risk.interface';

export const useRisks = (filters?: RiskFilters) => {
  return useQuery({
    queryKey: ['risks', filters],
    queryFn: () => riskService.getAll(filters),
    staleTime: 30_000, // 30 seconds
  });
};

export const useCreateRisk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IRiskCreatePayload) => riskService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['risks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useRiskById = (id: string) => {
  return useQuery({
    queryKey: ['risks', id],
    queryFn: () => riskService.getById(id),
    enabled: !!id,
  });
};
```

```typescript
// application/hooks/useAuth.ts
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { login, logout, setTokens } from '../redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  return {
    user,
    isAuthenticated,
    isLoading,
    login: (credentials: LoginPayload) => dispatch(login(credentials)),
    logout: () => dispatch(logout()),
    hasPermission: (permission: string) => checkPermission(user?.role, permission),
    hasRole: (roles: UserRole[]) => roles.includes(user?.role?.name),
  };
};
```

Additional hooks include:
- `useProjects` - Project CRUD operations
- `useAssessments` - Risk assessment operations
- `useTreatments` - Treatment plan operations
- `useUsers` - User management
- `useDashboard` - Dashboard data fetching
- `useAuditLogs` - Audit log retrieval
- `useNotifications` - Real-time notifications

### Redux Store (`application/redux/`)

```typescript
// application/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'accessToken', 'refreshToken'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

#### Auth Slice (`slices/authSlice.ts`)
- `user` - Current user object
- `accessToken` - JWT access token
- `refreshToken` - JWT refresh token
- `isAuthenticated` - Boolean auth state
- `isLoading` - Auth operation in progress
- Actions: `login`, `logout`, `setTokens`, `updateProfile`

#### UI Slice (`slices/uiSlice.ts`)
- `sidebarOpen` - Sidebar collapsed/expanded state
- `theme` - Light/dark mode preference
- `notifications` - Toast notification queue
- Actions: `toggleSidebar`, `setTheme`, `showNotification`, `dismissNotification`

### Contexts (`application/contexts/`)

```typescript
// application/contexts/OrganizationContext.tsx
// Provides organization-level data to nested components without prop drilling
```

### Configuration (`application/config/`)

```typescript
// application/config/routes.tsx
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Dashboard = lazy(() => import('../../presentation/pages/Dashboard'));
const RiskRegistry = lazy(() => import('../../presentation/pages/RiskRegistry'));
const RiskDetail = lazy(() => import('../../presentation/pages/RiskRegistry/RiskDetail'));
const Projects = lazy(() => import('../../presentation/pages/Projects'));
const Settings = lazy(() => import('../../presentation/pages/Settings'));
const UserManagement = lazy(() => import('../../presentation/pages/UserManagement'));
const Login = lazy(() => import('../../presentation/pages/Authentication/Login'));

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'risks', element: <RiskRegistry /> },
      { path: 'risks/:id', element: <RiskDetail /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:id', element: <ProjectDetail /> },
      { path: 'settings', element: <Settings /> },
      { path: 'users', element: <UserManagement />, roles: ['admin'] },
      { path: 'audit-logs', element: <AuditLogs />, roles: ['admin', 'auditor'] },
    ],
  },
];
```

```typescript
// application/config/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Utilities (`application/utils/`)

- `formatDate` - Date formatting helpers
- `calculateRiskScore` - Risk score computation
- `getRiskSeverityColor` - Color coding by risk level
- `exportToCsv` - CSV export utility
- `debounce` / `throttle` - Performance utilities

### Validation Schemas (`application/validations/`)

```typescript
// application/validations/risk.validation.ts
import { z } from 'zod';

export const createRiskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(255),
  description: z.string().optional(),
  domain: z.enum(['financial', 'cybersecurity', 'ai_governance', 'operational', 'regulatory']),
  projectId: z.string().uuid().optional(),
  ownerId: z.string().uuid().optional(),
});

export const assessmentSchema = z.object({
  likelihood: z.number().int().min(1).max(5),
  impact: z.number().int().min(1).max(5),
  methodology: z.string().optional(),
  notes: z.string().optional(),
});
```

---

## Infrastructure Layer (`src/infrastructure/`)

The infrastructure layer handles all external communication and technical concerns.

### Axios Instance (`infrastructure/api/axiosInstance.ts`)

```typescript
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { store } from '../../application/redux/store';
import { setTokens, logout } from '../../application/redux/slices/authSlice';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: inject access token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401, refresh token flow
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = store.getState().auth;
        const response = await axios.post('/api/v1/auth/refresh', { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;

        store.dispatch(setTokens({ accessToken, refreshToken: newRefreshToken }));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
```

### API Service Classes (`infrastructure/api/`)

Each domain entity has a corresponding service class:

```typescript
// infrastructure/api/riskService.ts
import axiosInstance from './axiosInstance';
import { IRisk, IRiskCreatePayload, RiskFilters } from '../../domain/interfaces/risk.interface';
import { PaginatedResponse } from '../../domain/interfaces/common.interface';

class RiskService {
  private basePath = '/risks';

  async getAll(filters?: RiskFilters): Promise<PaginatedResponse<IRisk>> {
    const { data } = await axiosInstance.get(this.basePath, { params: filters });
    return data;
  }

  async getById(id: string): Promise<IRisk> {
    const { data } = await axiosInstance.get(`${this.basePath}/${id}`);
    return data.data;
  }

  async create(payload: IRiskCreatePayload): Promise<IRisk> {
    const { data } = await axiosInstance.post(this.basePath, payload);
    return data.data;
  }

  async update(id: string, payload: Partial<IRiskCreatePayload>): Promise<IRisk> {
    const { data } = await axiosInstance.put(`${this.basePath}/${id}`, payload);
    return data.data;
  }

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`${this.basePath}/${id}`);
  }
}

export const riskService = new RiskService();
```

---

## Presentation Layer (`src/presentation/`)

The presentation layer contains all visual components and user interaction logic.

### Pages (`presentation/pages/`)

Each page corresponds to a top-level route and composes components with hooks:

- **Authentication/** - Login, Register, ForgotPassword, ResetPassword
- **Dashboard/** - Overview statistics, charts, risk matrix, recent activity
- **RiskRegistry/** - Risk list, risk detail, risk create/edit forms
- **RiskAssessment/** - Assessment form, 5x5 matrix visualization
- **Projects/** - Project list, project detail, project dashboard
- **Settings/** - Organization settings, profile settings
- **UserManagement/** - User list, invite user, role assignment

### Components (`presentation/components/`)

#### Common Components (`components/common/`)
- `DataTable` - Reusable sortable, filterable table with pagination
- `SearchInput` - Debounced search input
- `StatusBadge` - Colored status indicator
- `RiskScoreBadge` - Color-coded risk score display
- `ConfirmDialog` - Confirmation modal
- `LoadingSpinner` - Loading states
- `EmptyState` - Empty data placeholder
- `ErrorBoundary` - Error catching wrapper
- `PageHeader` - Consistent page title + actions layout

#### Layout Components (`components/layout/`)
- `AppLayout` - Main application shell (sidebar + header + content)
- `Sidebar` - Navigation sidebar with role-based menu items
- `Header` - Top bar with user menu, notifications, search
- `ProtectedRoute` - Route guard checking auth + role permissions
- `Breadcrumbs` - Contextual navigation breadcrumbs

### Themes (`presentation/themes/`)

```typescript
// presentation/themes/light.ts
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1E40AF' },     // Professional blue
    secondary: { main: '#7C3AED' },   // Purple accent
    error: { main: '#DC2626' },       // Critical risk
    warning: { main: '#F59E0B' },     // High risk
    success: { main: '#059669' },     // Low risk / completed
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500 },
      },
    },
  },
});
```

---

## Routing

### React Router 7 Configuration

```typescript
// App.tsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { routes } from './application/config/routes';
import LoadingSpinner from './presentation/components/common/LoadingSpinner';

const router = createBrowserRouter(routes);

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
```

### Protected Route

```typescript
// presentation/components/layout/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../application/hooks/useAuth';
import AppLayout from './AppLayout';

interface ProtectedRouteProps {
  roles?: UserRole[];
}

export const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user?.role?.name)) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
```

---

## State Management Strategy

### Redux Toolkit (Global/Persistent State)

Used for data that:
- Needs to persist across page refreshes (auth tokens)
- Is accessed by many unrelated components (user identity)
- Has complex update logic (auth flows)

**Slices:**
- `authSlice` - User, tokens, authentication status
- `uiSlice` - Sidebar state, theme preference, toasts

### TanStack Query (Server State)

Used for all server-side data:
- Risks, projects, users, assessments, treatments
- Dashboard statistics
- Audit logs
- Any data that originates from the API

**Benefits:**
- Automatic caching and cache invalidation
- Background refetching for stale data
- Optimistic updates for better UX
- Loading and error states handled automatically
- Deduplication of identical requests

---

## Component Patterns

### Container/Presentational Pattern

```typescript
// Container: handles data and logic
const RiskRegistryPage = () => {
  const [filters, setFilters] = useState<RiskFilters>({});
  const { data, isLoading, error } = useRisks(filters);
  const createRisk = useCreateRisk();

  return (
    <RiskRegistryView
      risks={data?.data ?? []}
      meta={data?.meta}
      isLoading={isLoading}
      error={error}
      filters={filters}
      onFilterChange={setFilters}
      onCreateRisk={createRisk.mutate}
    />
  );
};

// Presentational: pure rendering
const RiskRegistryView = ({ risks, isLoading, filters, onFilterChange, onCreateRisk }) => {
  // Pure UI rendering with props
};
```

### Custom Hook Pattern for Data Operations

Every data-fetching operation is wrapped in a custom hook that encapsulates:
- The TanStack Query configuration
- Cache invalidation logic
- Error handling
- Type safety

This keeps components clean and enables reuse across different pages.
