import { useMemo } from "react";
import {
  Box, Typography, Card, CardContent, LinearProgress,
  Grid2 as Grid,
} from "@mui/material";
import {
  Security as ControlIcon, CheckCircle as ImplementedIcon,
  Gavel as RegulationIcon, TrendingUp as ComplianceIcon,
  AssessmentOutlined, Warning as RiskIcon, Store as VendorIcon,
  Description as PolicyIcon, Lan as IntegrationIcon,
} from "@mui/icons-material";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import {
  useCommonControls, useImplementations, useUnifiedCompliance,
} from "../../../infrastructure/api/metaframework.api";
import { useDashboardStats, useDashboardTrends } from "../../../infrastructure/api/dashboard.api";
import { useVendors } from "../../../infrastructure/api/vendors.api";
import { usePolicies } from "../../../infrastructure/api/policies.api";
import { useIntegrationDashboardSummary } from "../../../infrastructure/api/integrations.api";
import { useEvidenceSummary } from "../../../infrastructure/api/evidence.api";
import StatCard from "../../components/common/StatCard";
import EmptyState from "../../components/common/EmptyState";

const PIE_COLORS = {
  implemented: "#10B981", in_progress: "#F59E0B", not_started: "#EF4444",
};

const WEIGHT_COLORS: Record<string, string> = {
  low: "#16A34A", medium: "#CA8A04", high: "#EA580C", critical: "#DC2626",
};

const STATUS_LABELS: Record<string, string> = {
  implemented: "Implemented", in_progress: "In Progress", not_started: "Not Started",
};

const DOMAIN_COLORS: Record<string, string> = {
  financial: "#D97706", cybersecurity: "#E11D48", strategic: "#7C3AED",
  operational: "#0284C7", regulatory: "#059669",
};

const RISK_LEVEL_COLORS: Record<string, string> = {
  critical: "#DC2626", high: "#EA580C", medium: "#CA8A04", low: "#16A34A",
};

export default function AnalyticsPage() {
  const { data: controls, isLoading: controlsLoading } = useCommonControls();
  const { data: implementations, isLoading: implLoading } = useImplementations();
  const { data: unified, isLoading: unifiedLoading } = useUnifiedCompliance();
  const { data: dashStats } = useDashboardStats();
  const { data: trends } = useDashboardTrends();
  const { data: vendors } = useVendors();
  const { data: policies } = usePolicies();
  const { data: integrationSummary } = useIntegrationDashboardSummary();
  const { data: evidenceSummary } = useEvidenceSummary();

  const isLoading = controlsLoading || implLoading || unifiedLoading;

  const summary = implementations?.summary;
  const regulations = unified?.regulations || [];
  const overallCompliance = unified?.overallCompliancePercent || 0;

  const domainData = useMemo(() => {
    if (!controls || !implementations) return [];
    const implMap = new Map(implementations.implementations.map((i) => [i.commonControlId, i.status]));
    const domainMap = new Map<string, { total: number; implemented: number }>();
    for (const ctrl of controls) {
      const entry = domainMap.get(ctrl.domain) || { total: 0, implemented: 0 };
      entry.total++;
      if (implMap.get(ctrl.id) === "implemented") entry.implemented++;
      domainMap.set(ctrl.domain, entry);
    }
    return Array.from(domainMap.entries()).map(([domain, d]) => ({
      domain, implemented: d.implemented, "Not Implemented": d.total - d.implemented,
    }));
  }, [controls, implementations]);

  const regulationChartData = useMemo(() => {
    return regulations.map((r) => ({ code: r.regulationCode, compliance: r.compliancePercent }));
  }, [regulations]);

  const statusData = useMemo(() => {
    if (!summary) return [];
    return [
      { name: STATUS_LABELS.implemented, value: summary.implemented, color: PIE_COLORS.implemented },
      { name: STATUS_LABELS.in_progress, value: summary.inProgress, color: PIE_COLORS.in_progress },
      { name: STATUS_LABELS.not_started, value: summary.notStarted, color: PIE_COLORS.not_started },
    ].filter((d) => d.value > 0);
  }, [summary]);

  const weightData = useMemo(() => {
    if (!controls) return [];
    const weightMap = new Map<string, number>();
    for (const ctrl of controls) weightMap.set(ctrl.controlWeight, (weightMap.get(ctrl.controlWeight) || 0) + 1);
    return Array.from(weightMap.entries()).map(([w, c]) => ({
      name: w.charAt(0).toUpperCase() + w.slice(1), value: c, color: WEIGHT_COLORS[w] || "#6B7280",
    }));
  }, [controls]);

  const riskDomainData = useMemo(() => {
    if (!dashStats?.risksByDomain) return [];
    return dashStats.risksByDomain.map((d) => ({
      name: DOMAIN_COLORS[d.domain] ? (d.domain.charAt(0).toUpperCase() + d.domain.slice(1)) : d.domain,
      count: parseInt(d.count),
      fill: DOMAIN_COLORS[d.domain] || "#94A3B8",
    }));
  }, [dashStats]);

  const vendorRiskData = useMemo(() => {
    if (!vendors) return [];
    const levels = ["critical", "high", "medium", "low"];
    const counts = new Map<string, number>();
    for (const l of levels) counts.set(l, 0);
    for (const v of vendors) counts.set(v.riskLevel, (counts.get(v.riskLevel) || 0) + 1);
    return Array.from(counts.entries()).map(([level, count]) => ({
      name: level.charAt(0).toUpperCase() + level.slice(1),
      value: count,
      color: RISK_LEVEL_COLORS[level] || "#6B7280",
    })).filter(d => d.value > 0);
  }, [vendors]);

  const policyStatusData = useMemo(() => {
    if (!policies) return [];
    const counts = new Map<string, number>();
    for (const p of policies) counts.set(p.status, (counts.get(p.status) || 0) + 1);
    return Array.from(counts.entries()).map(([status, count]) => ({
      name: status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      value: count,
      fill: status === "published" ? "#10B981" : status === "draft" ? "#F59E0B" : status === "archived" ? "#6B7280" : "#3B82F6",
    }));
  }, [policies]);

  const evidenceCollected = evidenceSummary ? (evidenceSummary.submitted || 0) + (evidenceSummary.approved || 0) : 0;
  const evidenceTotal = evidenceSummary?.total || 0;

  const getBarColor = (compliance: number) => {
    if (compliance >= 80) return "#10B981";
    if (compliance >= 50) return "#F59E0B";
    return "#EF4444";
  };

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h1" sx={{ mb: 3 }}>Analytics</Typography>
        <LinearProgress />
      </Box>
    );
  }

  if (!summary || !controls || !unified) {
    return (
      <Box>
        <Typography variant="h1" sx={{ mb: 3 }}>Analytics</Typography>
        <EmptyState title="No data available" description="Load demo data or add common controls and implementations to view analytics." icon={<AssessmentOutlined />} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>Analytics</Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Total Controls" value={summary.total} icon={<ControlIcon />} accentColor="#6366F1" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Controls Implemented" value={summary.implemented} icon={<ImplementedIcon />} accentColor="#10B981" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Regulations Covered" value={regulations.length} icon={<RegulationIcon />} accentColor="#8B5CF6" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Overall Compliance" value={`${overallCompliance}%`} icon={<ComplianceIcon />} accentColor={overallCompliance >= 80 ? "#10B981" : overallCompliance >= 50 ? "#F59E0B" : "#EF4444"} />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 600, mb: 2 }}>
                Risk Trends
              </Typography>
              {!trends || trends.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>No trend data available</Typography>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" name="New Risks" stroke="#E11D48" strokeWidth={2} dot={{ fill: "#E11D48", r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 600, mb: 2 }}>
                Compliance by Domain
              </Typography>
              {domainData.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>No domain data available</Typography>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={domainData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="domain" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="implemented" name="Implemented" stackId="a" fill="#10B981" />
                    <Bar dataKey="Not Implemented" name="Not Implemented" stackId="a" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 600, mb: 2 }}>
                Regulation Compliance
              </Typography>
              {regulationChartData.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>No regulation data available</Typography>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regulationChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="code" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="compliance" name="Compliance %" radius={[4, 4, 0, 0]}>
                      {regulationChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry.compliance)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 600, mb: 2 }}>
                Implementation Status
              </Typography>
              {statusData.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>No implementation data</Typography>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                      {statusData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 600, mb: 2 }}>
                Control Weight Distribution
              </Typography>
              {weightData.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>No control data</Typography>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={weightData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                      {weightData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 600, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <RiskIcon sx={{ fontSize: 18, color: "#E11D48" }} />
                  Risk Distribution
                </Box>
              </Typography>
              {riskDomainData.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>No risk data</Typography>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={riskDomainData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={80} />
                    <Tooltip />
                    <Bar dataKey="count" name="Risks" radius={[0, 4, 4, 0]}>
                      {riskDomainData.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 600, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <VendorIcon sx={{ fontSize: 18, color: "#D97706" }} />
                  Vendor Risk Levels
                </Box>
              </Typography>
              {vendorRiskData.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>No vendor data</Typography>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={vendorRiskData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                      {vendorRiskData.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 600, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PolicyIcon sx={{ fontSize: 18, color: "#0D9488" }} />
                  Policy Status
                </Box>
              </Typography>
              {policyStatusData.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>No policy data</Typography>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={policyStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                      {policyStatusData.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 600, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IntegrationIcon sx={{ fontSize: 18, color: "#6366F1" }} />
                  Integration Health
                </Box>
              </Typography>
              {!integrationSummary ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>No integration data</Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, py: 2 }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h2" fontWeight={700}>{integrationSummary.total}</Typography>
                    <Typography variant="caption" color="text.secondary">Total Integrations</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body1" fontWeight={600} color="#10B981">{integrationSummary.connected}</Typography>
                      <Typography variant="caption" color="text.secondary">Connected</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body1" fontWeight={600} color="#F59E0B">{integrationSummary.disconnected}</Typography>
                      <Typography variant="caption" color="text.secondary">Disconnected</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body1" fontWeight={600} color="#EF4444">{integrationSummary.error}</Typography>
                      <Typography variant="caption" color="text.secondary">Error</Typography>
                    </Box>
                  </Box>
                  {evidenceTotal > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">Evidence collected: {evidenceCollected}/{evidenceTotal}</Typography>
                      <LinearProgress variant="determinate" value={evidenceTotal > 0 ? (evidenceCollected / evidenceTotal) * 100 : 0} sx={{ height: 6, borderRadius: 3, mt: 0.5 }} />
                    </Box>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
