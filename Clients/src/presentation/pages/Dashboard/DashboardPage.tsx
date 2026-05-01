import { Box, Typography, Card, CardContent, LinearProgress, List, ListItem, ListItemText, Chip, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Warning as RiskIcon,
  Shield as ShieldIcon,
  FolderOpen as ProjectIcon,
  Assignment as TreatmentIcon,
} from "@mui/icons-material";
import { useDashboardStats, useDashboardTrends, useOverdueTreatments } from "../../../infrastructure/api/dashboard.api";
import StatCard from "../../components/common/StatCard";
import RiskChip from "../../components/common/RiskChip";
import RiskMatrix from "../../components/common/RiskMatrix";
import TrendChart from "../../components/common/TrendChart";

const DOMAIN_COLORS: Record<string, string> = {
  financial: "#D97706",
  cybersecurity: "#E11D48",
  strategic: "#7C3AED",
  operational: "#0284C7",
  regulatory: "#059669",
};

const DOMAIN_LABELS: Record<string, string> = {
  financial: "Financial",
  cybersecurity: "Cybersecurity",
  strategic: "Strategic",
  operational: "Operational",
  regulatory: "Regulatory",
};

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();
  const { data: trends } = useDashboardTrends();
  const { data: overdueTreatments } = useOverdueTreatments();

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h1" sx={{ mb: 3 }}>Dashboard</Typography>
        <LinearProgress />
      </Box>
    );
  }

  const totalDomainRisks = stats?.risksByDomain?.reduce((sum, d) => sum + parseInt(d.count), 0) || 0;

  const matrixPoints = (stats?.recentRisks || [])
    .filter((r: any) => r.assessments?.length > 0)
    .map((r: any) => ({
      likelihood: r.assessments[0].likelihood,
      impact: r.assessments[0].impact,
      count: 1,
    }));

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>Dashboard</Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Total Risks"
            value={stats?.totalRisks ?? 0}
            color="#4338CA"
            icon={<RiskIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Critical Risks"
            value={stats?.criticalRisks ?? 0}
            color="#E11D48"
            icon={<ShieldIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Active Projects"
            value={stats?.activeProjects ?? 0}
            color="#0284C7"
            icon={<ProjectIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Open Treatments"
            value={stats?.openTreatments ?? 0}
            color="#D97706"
            icon={<TreatmentIcon />}
          />
        </Grid>
      </Grid>

      {overdueTreatments && overdueTreatments.length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
            {overdueTreatments.length} Overdue Treatment{overdueTreatments.length > 1 ? "s" : ""}
          </Typography>
          {overdueTreatments.slice(0, 5).map((t: any) => (
            <Typography key={t.id} variant="body2">
              {t.risk?.title} - {t.description} (due {new Date(t.dueDate).toLocaleDateString()})
              {t.responsible && ` - ${t.responsible.firstName} ${t.responsible.lastName}`}
            </Typography>
          ))}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {trends && trends.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h3" sx={{ mb: 2 }}>Risk Trends (6 Months)</Typography>
                <TrendChart data={trends} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Risk Distribution by Domain
              </Typography>
              {totalDomainRisks === 0 ? (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                  No risks to display. Load demo data to see the dashboard in action.
                </Typography>
              ) : (
                <Box>
                  <Box sx={{ display: "flex", borderRadius: 1, overflow: "hidden", height: 32, mb: 2 }}>
                    {stats?.risksByDomain?.map((d) => {
                      const pct = (parseInt(d.count) / totalDomainRisks) * 100;
                      return (
                        <Box
                          key={d.domain}
                          sx={{
                            width: `${pct}%`,
                            backgroundColor: DOMAIN_COLORS[d.domain] || "#94A3B8",
                            minWidth: pct > 0 ? 4 : 0,
                            transition: "width 0.3s",
                          }}
                        />
                      );
                    })}
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {stats?.risksByDomain?.map((d) => (
                      <Box key={d.domain} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: DOMAIN_COLORS[d.domain] }} />
                        <Typography variant="body2">
                          {DOMAIN_LABELS[d.domain] || d.domain} ({d.count})
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Recent Risks
              </Typography>
              {!stats?.recentRisks?.length ? (
                <Typography variant="body1" color="text.secondary">No recent risks</Typography>
              ) : (
                <List disablePadding>
                  {stats.recentRisks.map((risk: any) => (
                    <ListItem key={risk.id} divider sx={{ px: 0 }}>
                      <ListItemText
                        primary={risk.title}
                        secondary={
                          <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                            <RiskChip value={risk.domain} type="domain" />
                            <RiskChip value={risk.status} type="status" />
                            {risk.assessments?.[0] && (
                              <Chip
                                label={`Score: ${risk.assessments[0].likelihood * risk.assessments[0].impact}`}
                                size="small"
                                sx={{ fontSize: "0.7rem" }}
                              />
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Risk Matrix
              </Typography>
              {matrixPoints.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No assessed risks yet
                </Typography>
              ) : (
                <RiskMatrix points={matrixPoints} />
              )}
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2 }}>Risks by Status</Typography>
              {!stats?.risksByStatus?.length ? (
                <Typography variant="body1" color="text.secondary">No risks</Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {stats.risksByStatus.map((s) => (
                    <Box key={s.status} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <RiskChip value={s.status} type="status" />
                      <Typography variant="body2" fontWeight={600}>{s.count}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
