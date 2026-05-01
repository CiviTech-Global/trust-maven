import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DashboardLayout from "../../presentation/components/layout/DashboardLayout";

const LoginPage = lazy(
  () => import("../../presentation/pages/Authentication/LoginPage")
);
const RegisterPage = lazy(
  () => import("../../presentation/pages/Authentication/RegisterPage")
);
const DashboardPage = lazy(
  () => import("../../presentation/pages/Dashboard/DashboardPage")
);
const RiskRegistryPage = lazy(
  () => import("../../presentation/pages/RiskRegistry/RiskRegistryPage")
);
const RiskDetailPage = lazy(
  () => import("../../presentation/pages/RiskRegistry/RiskDetailPage")
);
const ProjectsPage = lazy(
  () => import("../../presentation/pages/Projects/ProjectsPage")
);
const ProjectDetailPage = lazy(
  () => import("../../presentation/pages/Projects/ProjectDetailPage")
);
const ControlsPage = lazy(
  () => import("../../presentation/pages/Controls/ControlsPage")
);
const UserManagementPage = lazy(
  () => import("../../presentation/pages/UserManagement/UserManagementPage")
);
const AuditLogsPage = lazy(
  () => import("../../presentation/pages/AuditLogs/AuditLogsPage")
);
const SettingsPage = lazy(
  () => import("../../presentation/pages/Settings/SettingsPage")
);

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="risks" element={<RiskRegistryPage />} />
          <Route path="risks/:id" element={<RiskDetailPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailPage />} />
          <Route path="controls" element={<ControlsPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
