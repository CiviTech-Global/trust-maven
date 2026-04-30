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
const ProjectsPage = lazy(
  () => import("../../presentation/pages/Projects/ProjectsPage")
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
          <Route path="projects" element={<ProjectsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
