import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  setCredentials,
  setSessionStatus,
  logout,
} from "../redux/slices/authSlice";
import { CircularProgress, Box } from "@mui/material";
import axiosInstance from "../../infrastructure/api/axiosInstance";
import DashboardLayout from "../../presentation/components/layout/DashboardLayout";

const LoginPage = lazy(
  () => import("../../presentation/pages/Authentication/LoginPage")
);
const RegisterPage = lazy(
  () => import("../../presentation/pages/Authentication/RegisterPage")
);
const ForgotPasswordPage = lazy(
  () => import("../../presentation/pages/Authentication/ForgotPasswordPage")
);
const ResetPasswordPage = lazy(
  () => import("../../presentation/pages/Authentication/ResetPasswordPage")
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
const KRIsPage = lazy(
  () => import("../../presentation/pages/KRIs/KRIsPage")
);
const VendorsPage = lazy(
  () => import("../../presentation/pages/Vendors/VendorsPage")
);
const FrameworksPage = lazy(
  () => import("../../presentation/pages/Frameworks/FrameworksPage")
);
const SettingsPage = lazy(
  () => import("../../presentation/pages/Settings/SettingsPage")
);
const ControlMonitoringPage = lazy(
  () => import("../../presentation/pages/Controls/ControlMonitoringPage")
);
const AuditsPage = lazy(
  () => import("../../presentation/pages/Audits/AuditsPage")
);
const AuditDetailPage = lazy(
  () => import("../../presentation/pages/Audits/AuditDetailPage")
);
const ReportsPage = lazy(
  () => import("../../presentation/pages/Reports/ReportsPage")
);
const ReportBuilderPage = lazy(
  () => import("../../presentation/pages/Reports/ReportBuilderPage")
);
const ComplianceHubPage = lazy(
  () => import("../../presentation/pages/ComplianceHub/ComplianceHubPage")
);
const RegulationCatalogPage = lazy(
  () => import("../../presentation/pages/ComplianceHub/RegulationCatalogPage")
);
const RegulationDetailPage = lazy(
  () => import("../../presentation/pages/ComplianceHub/RegulationDetailPage")
);
const CrossMappingView = lazy(
  () => import("../../presentation/pages/ComplianceHub/CrossMappingView")
);
const PoliciesPage = lazy(
  () => import("../../presentation/pages/Policies/PoliciesPage")
);
const FrameworkRecommender = lazy(
  () => import("../../presentation/pages/ComplianceHub/FrameworkRecommender")
);
const EvidencePage = lazy(
  () => import("../../presentation/pages/Evidence/EvidencePage")
);
const ComplianceScorecardPage = lazy(
  () => import("../../presentation/pages/ComplianceScorecard/ComplianceScorecardPage")
);
const CommonControlsPage = lazy(
  () => import("../../presentation/pages/Metaframework/CommonControlsPage")
);
const EvidenceMonitoringPage = lazy(
  () => import("../../presentation/pages/Metaframework/EvidenceMonitoringPage")
);
const UnifiedCompliancePage = lazy(
  () => import("../../presentation/pages/Metaframework/UnifiedCompliancePage")
);
const AnalyticsPage = lazy(
  () => import("../../presentation/pages/Metaframework/AnalyticsPage")
);
const WorkflowBuilderPage = lazy(
  () => import("../../presentation/pages/WorkflowBuilder/WorkflowBuilderPage")
);
const IntegrationsPage = lazy(
  () => import("../../presentation/pages/Integrations/IntegrationsPage")
);
const EntityManagerPage = lazy(
  () => import("../../presentation/pages/EntityManager/EntityManagerPage")
);
const TrustCenterPage = lazy(
  () => import("../../presentation/pages/TrustCenter/TrustCenterPage")
);
const CopilotPage = lazy(
  () => import("../../presentation/pages/Copilot/CopilotPage")
);

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { accessToken, isAuthenticated, sessionStatus } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (accessToken && sessionStatus === "idle") {
      dispatch(setSessionStatus("checking"));
      axiosInstance
        .get("/auth/me")
        .then((res) => {
          dispatch(
            setCredentials({
              user: res.data.data,
              accessToken: accessToken,
            })
          );
          dispatch(setSessionStatus("valid"));
        })
        .catch(() => {
          dispatch(logout());
          dispatch(setSessionStatus("invalid"));
        });
    }
  }, [accessToken, sessionStatus, dispatch]);

  if (sessionStatus === "checking") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated && sessionStatus !== "checking") {
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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
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
          <Route path="kris" element={<KRIsPage />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="policies" element={<PoliciesPage />} />
          <Route path="frameworks" element={<FrameworksPage />} />
          <Route path="common-controls" element={<CommonControlsPage />} />
          <Route path="common-controls/monitoring" element={<EvidenceMonitoringPage />} />
          <Route path="common-controls/compliance" element={<UnifiedCompliancePage />} />
          <Route path="common-controls/analytics" element={<AnalyticsPage />} />
          <Route path="compliance-hub" element={<ComplianceHubPage />} />
          <Route path="compliance-hub/regulations" element={<RegulationCatalogPage />} />
          <Route path="compliance-hub/regulations/:id" element={<RegulationDetailPage />} />
          <Route path="compliance-hub/cross-mapping" element={<CrossMappingView />} />
          <Route path="compliance-hub/recommend" element={<FrameworkRecommender />} />
          <Route path="compliance-scorecard" element={<ComplianceScorecardPage />} />
          <Route path="evidence" element={<EvidencePage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="controls/monitoring" element={<ControlMonitoringPage />} />
          <Route path="audits" element={<AuditsPage />} />
          <Route path="audits/:id" element={<AuditDetailPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="reports/builder" element={<ReportBuilderPage />} />
          <Route path="reports/builder/:id" element={<ReportBuilderPage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
          <Route path="entities" element={<EntityManagerPage />} />
          <Route path="trust-center" element={<TrustCenterPage />} />
          <Route path="workflows" element={<WorkflowBuilderPage />} />
          <Route path="copilot" element={<CopilotPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
