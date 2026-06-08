import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, LinearProgress, List, ListItem, ListItemText, Chip, Alert, useTheme, IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Warning as RiskIcon, Shield as ShieldIcon, FolderOpen as ProjectIcon,
  Assignment as TreatmentIcon, Lan as IntegrationIcon, AccountTree as EntityIcon,
  Gavel as FrameworkIcon, Description as PolicyIcon, Store as VendorIcon,
  TrendingUp as FairIcon, FolderZip as EvidenceIcon, AltRoute as WorkflowIcon,
  Verified as TrustIcon, Notifications as ActivityIcon,
  ArrowForward as ArrowIcon,
} from "@mui/icons-material";
import { useDashboardStats, useDashboardTrends, useDashboardActivity, useOverdueTreatments } from "../../../infrastructure/api/dashboard.api";
import { useControlCoverage } from "../../../infrastructure/api/coverage.api";
import { useIntegrationDashboardSummary } from "../../../infrastructure/api/integrations.api";
import { useEntityTree } from "../../../infrastructure/api/integrations.api";
import { useComplianceHubDashboard } from "../../../infrastructure/api/complianceHub.api";
import { useVendors } from "../../../infrastructure/api/vendors.api";
import { usePolicies } from "../../../infrastructure/api/policies.api";
import { useFairExposureSummary } from "../../../infrastructure/api/integrations.api";
import { useEvidenceSummary } from "../../../infrastructure/api/evidence.api";
import { useWorkflows } from "../../../infrastructure/api/workflow.api";
import { useTrustCenterConfig } from "../../../infrastructure/api/integrations.api";
import { useExposureSummary } from "../../../infrastructure/api/riskQuantification.api";
import StatCard from "../../components/common/StatCard";
import RiskChip from "../../components/common/RiskChip";
import RiskMatrix from "../../components/common/RiskMatrix";
import TrendChart from "../../components/common/TrendChart";

const DOMAIN_COLORS: Record<string, string> = {
  financial: "#D97706", cybersecurity: "#E11D48", strategic: "#7C3AED",
  operational: "#0284C7", regulatory: "#059669",
};

const DOMAIN_LABELS: Record<string, string> = {
  financial: "Financial", cybersecurity: "Cybersecurity", strategic: "Strategic",
  operational: "Operational", regulatory: "Regulatory",
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { data: stats, isLoading } = useDashboardStats();
  const { data: trends } = useDashboardTrends();
  const { data: overdueTreatments } = useOverdueTreatments();
  const { data: coverage } = useControlCoverage();
  const { data: integrationSummary } = useIntegrationDashboardSummary();
  const { data: entities } = useEntityTree();
  const { data: complianceDashboard } = useComplianceHubDashboard();
  const { data: vendors } = useVendors();
  const { data: policies } = usePolicies();
  const { data: fairExposure } = useFairExposureSummary();
  const { data: quantExposure } = useExposureSummary();
  const { data: evidenceSummary } = useEvidenceSummary();
  const { data: workflows } = useWorkflows();
  const { data: trustConfig } = useTrustCenterConfig();
  const { data: activity } = useDashboardActivity(8);

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h1" sx={{ mb: 3 }}>Dashboard</Typography>
        <LinearProgress />
      </Box>
    );
  }

  const totalDomainRisks = stats?.risksByDomain?.reduce((sum, d) => sum + parseInt(d.count), 0) || 0;
  const entityCount = entities?.length || 0;
  const highRiskVendors = vendors?.filter(v => v.riskLevel === "critical" || v.riskLevel === "high")?.length || 0;
  const totalALE = quantExposure?.totalALE ?? fairExposure?.totalALE ?? 0;
  const evidenceCollected = evidenceSummary ? (evidenceSummary.submitted || 0) + (evidenceSummary.approved || 0) : 0;
  const evidenceTotal = evidenceSummary?.total || 0;
  const evidencePct = evidenceTotal > 0 ? Math.round((evidenceCollected / evidenceTotal) * 100) : 0;
  const certificationCount = trustConfig?.certifications?.length || 0;

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

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <StatCard label="Total Risks" value={stats?.totalRisks ?? 0} color={theme.palette.primary.main} icon={<RiskIcon />} onClick={() => navigate("/risks")} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <StatCard label="Critical" value={stats?.criticalRisks ?? 0} color="#E11D48" icon={<ShieldIcon />} onClick={() => navigate("/risks")} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <StatCard label="Active Projects" value={stats?.activeProjects ?? 0} color="#0284C7" icon={<ProjectIcon />} onClick={() => navigate("/projects")} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <StatCard label="Open Treatments" value={stats?.openTreatments ?? 0} color="#D97706" icon={<TreatmentIcon />} onClick={() => navigate("/risks")} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <StatCard label="Integrations" value={integrationSummary?.connected ?? 0} color="#6366F1" icon={<IntegrationIcon />} subtitle={`${integrationSummary?.total ?? 0} total`} onClick={() => navigate("/integrations")} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <StatCard label="Entities" value={entityCount} color="#8B5CF6" icon={<EntityIcon />} onClick={() => navigate("/entities")} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <StatCard label="Frameworks" value={complianceDashboard?.adoptedRegulations?.length ?? 0} color="#059669" icon={<FrameworkIcon />} onClick={() => navigate("/compliance-hub")} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <StatCard label="Policies" value={policies?.length ?? 0} color="#0D9488" icon={<PolicyIcon />} onClick={() => navigate("/policies")} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <StatCard label="Vendors" value={vendors?.length ?? 0} color="#D97706" icon={<VendorIcon />} subtitle={highRiskVendors > 0 ? `${highRiskVendors} high-risk` : undefined} onClick={() => navigate("/vendors")} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <StatCard label="FAIR ALE" value={`$${(totalALE / 1000).toFixed(0)}k`} color="#7C3AED" icon={<FairIcon />} onClick={() => navigate("/risks")} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <StatCard label="Evidence" value={`${evidencePct}%`} color="#0284C7" icon={<EvidenceIcon />} subtitle={`${evidenceCollected}/${evidenceTotal}`} onClick={() => navigate("/evidence")} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
          <StatCard label="Workflows" value={workflows?.length ?? 0} color="#EC4899" icon={<WorkflowIcon />} onClick={() => navigate("/workflows")} />
        </Grid>
      </Grid>

      {overdueTreatments && overdueTreatments.length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }} action={
          <Tooltip title="View all risks"><IconButton size="small" color="inherit" onClick={() => navigate("/risks")}><ArrowIcon /></IconButton></Tooltip>
        }>
          <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
            {overdueTreatments.length} Overdue Treatment{overdueTreatments.length > 1 ? "s" : ""}
          </Typography>
          {overdueTreatments.slice(0, 3).map((t: any) => (
            <Typography key={t.id} variant="body2">
              {t.risk?.title} - {t.description} (due {new Date(t.dueDate).toLocaleDateString()})
            </Typography>
          ))}
        </Alert>
      )}

      {trustConfig?.isPublic && (
        <Alert severity="success" sx={{ mb: 3 }} icon={<TrustIcon />} action={
          <Tooltip title="Manage Trust Center"><IconButton size="small" color="inherit" onClick={() => navigate("/trust-center")}><ArrowIcon /></IconButton></Tooltip>
        }>
          Trust Center is <strong>public</strong> with {certificationCount} certification{certificationCount !== 1 ? "s" : ""}
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
              <Typography variant="h3" sx={{ mb: 2 }}>Risk Distribution by Domain</Typography>
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
                        <Box key={d.domain} sx={{ width: `${pct}%`, backgroundColor: DOMAIN_COLORS[d.domain] || "#94A3B8", minWidth: pct > 0 ? 4 : 0, transition: "width 0.3s" }} />
                      );
                    })}
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {stats?.risksByDomain?.map((d) => (
                      <Box key={d.domain} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: DOMAIN_COLORS[d.domain] }} />
                        <Typography variant="body2">{DOMAIN_LABELS[d.domain] || d.domain} ({d.count})</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
              <Typography variant="h3">Recent Risks</Typography>
              <Chip label="View all" size="small" clickable onClick={() => navigate("/risks")} />
            </CardContent>
            <CardContent sx={{ pt: 0 }}>
              {!stats?.recentRisks?.length ? (
                <Typography variant="body1" color="text.secondary">No recent risks</Typography>
              ) : (
                <List disablePadding>
                  {stats.recentRisks.map((risk: any) => (
                    <ListItem key={risk.id} divider sx={{ px: 0, cursor: "pointer" }} onClick={() => navigate(`/risks/${risk.id}`)}>
                      <ListItemText primary={risk.title} secondary={
                        <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                          <RiskChip value={risk.domain} type="domain" />
                          <RiskChip value={risk.status} type="status" />
                          {risk.assessments?.[0] && (
                            <Chip label={`Score: ${risk.assessments[0].likelihood * risk.assessments[0].impact}`} size="small" sx={{ fontSize: "0.7rem" }} />
                          )}
                        </Box>
                      } />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {activity && activity.length > 0 && (
            <Card sx={{ mt: 3 }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
                <Typography variant="h3">Recent Activity</Typography>
                <Chip label="View all" size="small" clickable onClick={() => navigate("/audit-logs")} />
              </CardContent>
              <CardContent sx={{ pt: 0 }}>
                <List disablePadding>
                  {activity.slice(0, 5).map((a: any) => (
                    <ListItem key={a.id} divider sx={{ px: 0 }}>
                      <ListItemText primary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <ActivityIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                          <Typography variant="body2" fontWeight={500}>{a.action || a.eventType}</Typography>
                          <Chip label={a.entityType} size="small" variant="outlined" sx={{ fontSize: "0.65rem" }} />
                        </Box>
                      } secondary={
                        <Typography variant="caption" color="text.secondary">
                          by {a.user?.firstName} {a.user?.lastName} · {new Date(a.createdAt).toLocaleString()}
                        </Typography>
                      } />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2 }}>Risk Matrix</Typography>
              {matrixPoints.length === 0 ? (
                <Typography variant="body1" color="text.secondary">No assessed risks yet</Typography>
              ) : (
                <RiskMatrix points={matrixPoints} />
              )}
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2 }}>Control Coverage</Typography>
              {!coverage ? (
                <Typography variant="body2" color="text.secondary">Loading...</Typography>
              ) : (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box sx={{ position: "relative", width: 80, height: 80 }}>
                      <Box sx={{ width: 80, height: 80, borderRadius: "50%", border: "6px solid", borderColor: coverage.coveragePercent >= 80 ? "#059669" : coverage.coveragePercent >= 50 ? "#D97706" : "#E11D48", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="h3" fontWeight={700}>{coverage.coveragePercent}%</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2">{coverage.coveredRisks} of {coverage.totalRisks} risks covered</Typography>
                      <Typography variant="body2" color="error">{coverage.gaps} uncovered risk{coverage.gaps !== 1 ? "s" : ""}</Typography>
                      {coverage.highRiskGaps > 0 && (
                        <Chip label={`${coverage.highRiskGaps} high-risk gap${coverage.highRiskGaps !== 1 ? "s" : ""}`} color="error" size="small" sx={{ mt: 0.5 }} />
                      )}
                    </Box>
                  </Box>
                  {coverage.gapDetails?.length > 0 && (
                    <Box sx={{ maxHeight: 120, overflow: "auto" }}>
                      {coverage.gapDetails.slice(0, 5).map((g: any) => (
                        <Typography key={g.id} variant="caption" display="block" color="text.secondary">{g.title} (Score: {g.score})</Typography>
                      ))}
                    </Box>
                  )}
                </Box>
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

          {complianceDashboard && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h3" sx={{ mb: 2 }}>Compliance Score</Typography>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <Box sx={{ width: 80, height: 80, borderRadius: "50%", border: "6px solid", borderColor: complianceDashboard.overallScore >= 80 ? "#059669" : complianceDashboard.overallScore >= 50 ? "#D97706" : "#E11D48", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Typography variant="h3" fontWeight={700}>{complianceDashboard.overallScore}%</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">Overall compliance across {complianceDashboard.adoptedRegulations.length} framework{complianceDashboard.adoptedRegulations.length !== 1 ? "s" : ""}</Typography>
                </Box>
                {complianceDashboard.areaScores?.slice(0, 3).map((a) => (
                  <Box key={a.area} sx={{ mb: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.25 }}>
                      <Typography variant="caption">{a.area}</Typography>
                      <Typography variant="caption" fontWeight={600}>{a.score}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={a.score} sx={{ height: 6, borderRadius: 3 }} color={a.score >= 70 ? "success" : a.score >= 40 ? "warning" : "error"} />
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {trustConfig && (
            <Card sx={{ mt: 3 }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <TrustIcon sx={{ color: trustConfig.isPublic ? "#059669" : "text.secondary", fontSize: 28 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>Trust Center</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {trustConfig.isPublic ? "Public · " : "Private · "}
                      {certificationCount} certification{certificationCount !== 1 ? "s" : ""}
                    </Typography>
                  </Box>
                </Box>
                <Chip label="Manage" size="small" clickable onClick={() => navigate("/trust-center")} />
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
