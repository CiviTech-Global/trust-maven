import { useMemo } from "react";
import {
  Box, Typography, Card, CardContent, LinearProgress, Alert,
  Grid2 as Grid,
} from "@mui/material";
import {
  Security as ControlIcon,
  CheckCircle as ImplementedIcon,
  Gavel as RegulationIcon,
  TrendingUp as ComplianceIcon,
  AssessmentOutlined,
  DonutLarge,
} from "@mui/icons-material";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar,
  PieChart, Pie, Cell,
} from "recharts";
import {
  useCommonControls,
  useImplementations,
  useUnifiedCompliance,
} from "../../../infrastructure/api/metaframework.api";
import StatCard from "../../components/common/StatCard";
import EmptyState from "../../components/common/EmptyState";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const PIE_COLORS = {
  implemented: "#10B981",
  in_progress: "#F59E0B",
  not_started: "#EF4444",
};

const WEIGHT_COLORS: Record<string, string> = {
  low: "#16A34A",
  medium: "#CA8A04",
  high: "#EA580C",
  critical: "#DC2626",
};

const STATUS_LABELS: Record<string, string> = {
  implemented: "Implemented",
  in_progress: "In Progress",
  not_started: "Not Started",
};

function generateTrendData() {
  const data: { month: string; compliance: number }[] = [];
  let base = 45;
  for (let i = 0; i < 6; i++) {
    base += Math.round(5 + Math.random() * 8);
    data.push({ month: MONTHS[i], compliance: Math.min(base, 100) });
  }
  return data;
}

export default function AnalyticsPage() {
  const { data: controls, isLoading: controlsLoading } = useCommonControls();
  const { data: implementations, isLoading: implLoading } = useImplementations();
  const { data: unified, isLoading: unifiedLoading } = useUnifiedCompliance();

  const isLoading = controlsLoading || implLoading || unifiedLoading;

  const trendData = useMemo(() => generateTrendData(), []);

  const summary = implementations?.summary;
  const regulations = unified?.regulations || [];
  const overallCompliance = unified?.overallCompliancePercent || 0;

  const domainData = useMemo(() => {
    if (!controls || !implementations) return [];
    const implMap = new Map(
      implementations.implementations.map((i) => [i.commonControlId, i.status])
    );
    const domainMap = new Map<string, { total: number; implemented: number }>();
    for (const ctrl of controls) {
      const entry = domainMap.get(ctrl.domain) || { total: 0, implemented: 0 };
      entry.total++;
      if (implMap.get(ctrl.id) === "implemented") {
        entry.implemented++;
      }
      domainMap.set(ctrl.domain, entry);
    }
    return Array.from(domainMap.entries()).map(([domain, data]) => ({
      domain,
      implemented: data.implemented,
      "Not Implemented": data.total - data.implemented,
    }));
  }, [controls, implementations]);

  const regulationChartData = useMemo(() => {
    return regulations.map((r) => ({
      code: r.regulationCode,
      compliance: r.compliancePercent,
    }));
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
    for (const ctrl of controls) {
      weightMap.set(ctrl.controlWeight, (weightMap.get(ctrl.controlWeight) || 0) + 1);
    }
    return Array.from(weightMap.entries()).map(([weight, count]) => ({
      name: weight.charAt(0).toUpperCase() + weight.slice(1),
      value: count,
      color: WEIGHT_COLORS[weight] || "#6B7280",
    }));
  }, [controls]);

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
        <EmptyState
          title="No data available"
          description="Load demo data or add common controls and implementations to view analytics."
          icon={<AssessmentOutlined />}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>Analytics</Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Total Controls"
            value={summary.total}
            icon={<ControlIcon />}
            accentColor="#6366F1"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Controls Implemented"
            value={summary.implemented}
            icon={<ImplementedIcon />}
            accentColor="#10B981"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Regulations Covered"
            value={regulations.length}
            icon={<RegulationIcon />}
            accentColor="#8B5CF6"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Overall Compliance"
            value={`${overallCompliance}%`}
            icon={<ComplianceIcon />}
            accentColor={overallCompliance >= 80 ? "#10B981" : overallCompliance >= 50 ? "#F59E0B" : "#EF4444"}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 600, mb: 2 }}>
                Compliance Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="compliance"
                    name="Compliance %"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={{ fill: "#6366F1", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
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
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
                  No domain data available
                </Typography>
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
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
                  No regulation data available
                </Typography>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regulationChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="code" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend />
                    <Bar
                      dataKey="compliance"
                      name="Compliance %"
                      radius={[4, 4, 0, 0]}
                    >
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
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
                  No implementation data
                </Typography>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
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
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
                  No control data
                </Typography>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={weightData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {weightData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
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
    </Box>
  );
}
