import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Card, CardContent, LinearProgress,
  List, ListItem, ListItemText, Chip, useTheme,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Warning as RiskIcon, Shield as ShieldIcon, FolderOpen as ProjectIcon,
  Assignment as TreatmentIcon, Lan as IntegrationIcon, AccountTree as EntityIcon,
  Gavel as FrameworkIcon, Description as PolicyIcon, Store as VendorIcon,
  TrendingUp as FairIcon, FolderZip as EvidenceIcon, AltRoute as WorkflowIcon,
  Verified as TrustIcon, Notifications as ActivityIcon,
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

import PageHeader from "../../components/common/PageHeader";
import SectionCard from "../../components/common/SectionCard";
import StatCard from "../../components/common/StatCard";
import StatusChip from "../../components/common/StatusChip";
import RiskMatrix from "../../components/common/RiskMatrix";
import TrendChart from "../../components/common/TrendChart";
import AlertBanner from "../../components/common/AlertBanner";

const DOMAIN_META: Record<string, { label: string; color: string }> = {
  financial: { label: "Financial", color: "#D97706" },
  cybersecurity: { label: "Cybersecurity", color: "#E11D48" },
  strategic: { label: "Strategic", color: "#7C3AED" },
  operational: { label: "Operational", color: "#0284C7" },
  regulatory: { label: "Regulatory", color: "#059669" },
};

function SkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <Grid container spacing={2.5}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Skeleton variant="text" width="60%" height={16} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="40%" height={32} />
              <Skeleton variant="text" width="30%" height={14} sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function GaugeCircle({ value, size = 80, strokeWidth = 6, color }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const gaugeColor = color || (value >= 80 ? "#059669" : value >= 50 ? "#D97706" : "#E11D48");
  return (
    <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `${strokeWidth}px solid`,
          borderColor: gaugeColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" fontWeight={700}>{value}%</Typography>
      </Box>
    </Box>
  );
}

function StatCardsRow() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { data: stats } = useDashboardStats();
  const { data: integrationSummary } = useIntegrationDashboardSummary();
  const { data: entities } = useEntityTree();
  const { data: complianceDashboard } = useComplianceHubDashboard();
  const { data: vendors } = useVendors();
  const { data: policies } = usePolicies();
  const { data: fairExposure } = useFairExposureSummary();
  const { data: quantExposure } = useExposureSummary();
  const { data: evidenceSummary } = useEvidenceSummary();
  const { data: workflows } = useWorkflows();

  const entityCount = entities?.length || 0;
  const highRiskVendors = vendors?.filter((v: any) => v.riskLevel === "critical" || v.riskLevel === "high")?.length || 0;
  const totalALE = quantExposure?.totalALE ?? fairExposure?.totalALE ?? 0;
  const evidenceCollected = evidenceSummary ? (evidenceSummary.submitted || 0) + (evidenceSummary.approved || 0) : 0;
  const evidenceTotal = evidenceSummary?.total || 0;
  const evidencePct = evidenceTotal > 0 ? Math.round((evidenceCollected / evidenceTotal) * 100) : 0;

  const cards = [
    { label: "Total Risks", value: stats?.totalRisks ?? 0, accent: theme.palette.error.main, icon: <RiskIcon />, decoIcon: <RiskIcon />, path: "/risks" },
    { label: "Critical", value: stats?.criticalRisks ?? 0, accent: theme.palette.error.main, icon: <ShieldIcon />, decoIcon: <ShieldIcon />, path: "/risks" },
    { label: "Active Projects", value: stats?.activeProjects ?? 0, accent: theme.palette.primary.main, icon: <ProjectIcon />, decoIcon: <ProjectIcon />, path: "/projects" },
    { label: "Open Treatments", value: stats?.openTreatments ?? 0, accent: theme.palette.primary.main, icon: <TreatmentIcon />, decoIcon: <TreatmentIcon />, path: "/risks" },
    { label: "Integrations", value: integrationSummary?.connected ?? 0, accent: "#06B6D4", icon: <IntegrationIcon />, decoIcon: <IntegrationIcon />, subtitle: `${integrationSummary?.total ?? 0} total`, path: "/integrations" },
    { label: "Entities", value: entityCount, accent: "#84CC16", icon: <EntityIcon />, decoIcon: <EntityIcon />, path: "/entities" },
    { label: "Frameworks", value: complianceDashboard?.adoptedRegulations?.length ?? 0, accent: theme.palette.info.main, icon: <FrameworkIcon />, decoIcon: <FrameworkIcon />, path: "/compliance-hub" },
    { label: "Policies", value: policies?.length ?? 0, accent: theme.palette.secondary.main, icon: <PolicyIcon />, decoIcon: <PolicyIcon />, path: "/policies" },
    { label: "Vendors", value: vendors?.length ?? 0, accent: theme.palette.warning.main, icon: <VendorIcon />, decoIcon: <VendorIcon />, subtitle: highRiskVendors > 0 ? `${highRiskVendors} high-risk` : undefined, path: "/vendors" },
    { label: "FAIR ALE", value: `$${(totalALE / 1000).toFixed(0)}k`, accent: "#F97316", icon: <FairIcon />, decoIcon: <FairIcon />, path: "/risks" },
    { label: "Evidence", value: `${evidencePct}%`, accent: "#8B5CF6", icon: <EvidenceIcon />, decoIcon: <EvidenceIcon />, subtitle: `${evidenceCollected}/${evidenceTotal}`, path: "/evidence" },
    { label: "Workflows", value: workflows?.length ?? 0, accent: "#EC4899", icon: <WorkflowIcon />, decoIcon: <WorkflowIcon />, path: "/workflows" },
  ];

  if (!stats) return <SkeletonGrid count={12} />;

  return (
    <Grid container spacing={2.5}>
      {cards.map((card) => (
        <Grid key={card.label} size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label={card.label}
            value={card.value}
            accentColor={card.accent}
            icon={card.icon}
            decorativeIcon={card.decoIcon}
            subtitle={card.subtitle}
            onClick={() => navigate(card.path)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

function AlertsSection() {
  const navigate = useNavigate();
  const { data: overdueTreatments } = useOverdueTreatments();
  const { data: trustConfig } = useTrustCenterConfig();

  const certificationCount = trustConfig?.certifications?.length || 0;

  return (
    <>
      {overdueTreatments && overdueTreatments.length > 0 && (
        <AlertBanner
          severity="warning"
          title={`${overdueTreatments.length} Overdue Treatment${overdueTreatments.length > 1 ? "s" : ""}`}
          description={
            <>
              {overdueTreatments.slice(0, 3).map((t: any) => (
                <span key={t.id} style={{ display: "block" }}>
                  {t.risk?.title} - {t.description} (due {new Date(t.dueDate).toLocaleDateString()})
                </span>
              ))}
            </>
          }
          actionLabel="View all risks"
          onAction={() => navigate("/risks")}
        />
      )}

      {trustConfig?.isPublic && (
        <AlertBanner
          severity="success"
          title={`Trust Center is public with ${certificationCount} certification${certificationCount !== 1 ? "s" : ""}`}
          actionLabel="Manage Trust Center"
          onAction={() => navigate("/trust-center")}
        />
      )}
    </>
  );
}

function RiskTrendsSection() {
  const { data: trends } = useDashboardTrends();

  if (!trends || trends.length === 0) return null;

  return (
    <SectionCard title="Risk Trends (6 Months)" disableHover>
      <TrendChart data={trends} showArea />
    </SectionCard>
  );
}

function ComplianceAndCoverageSection() {
  const { data: complianceDashboard } = useComplianceHubDashboard();
  const { data: coverage } = useControlCoverage();

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {/* Compliance gauge + Control coverage */}
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                {complianceDashboard && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                      Compliance Score
                    </Typography>
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                      <GaugeCircle value={complianceDashboard.overallScore} />
                      <Typography variant="caption" color="text.tertiary" sx={{ display: "block", mt: 1 }}>
                        Overall across {complianceDashboard.adoptedRegulations.length} framework{complianceDashboard.adoptedRegulations.length !== 1 ? "s" : ""}
                      </Typography>
                    </Box>
                    {complianceDashboard.areaScores?.slice(0, 3).map((a: any) => (
                      <Box key={a.area} sx={{ mb: 1.5 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.25 }}>
                          <Typography variant="caption" fontWeight={500}>{a.area}</Typography>
                          <Typography variant="caption" fontWeight={600}>{a.score}%</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={a.score}
                          sx={{ height: 5, borderRadius: 3 }}
                          color={a.score >= 70 ? "success" : a.score >= 40 ? "warning" : "error"}
                        />
                      </Box>
                    ))}
                  </Grid>
                )}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Control Coverage
                  </Typography>
                  {!coverage ? (
                    <Box sx={{ py: 4 }}>
                      <Skeleton variant="rounded" width={80} height={80} sx={{ mx: "auto", mb: 2, borderRadius: "50%" }} />
                      <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
                      <Skeleton variant="text" width="40%" sx={{ mx: "auto" }} />
                    </Box>
                  ) : (
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <GaugeCircle value={coverage.coveragePercent} size={80} strokeWidth={6} />
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {coverage.coveredRisks} of {coverage.totalRisks} risks covered
                          </Typography>
                          <Typography variant="caption" color="error">
                            {coverage.gaps} uncovered risk{coverage.gaps !== 1 ? "s" : ""}
                          </Typography>
                          {coverage.highRiskGaps > 0 && (
                            <Chip
                              label={`${coverage.highRiskGaps} high-risk gap${coverage.highRiskGaps !== 1 ? "s" : ""}`}
                              color="error"
                              size="small"
                              sx={{ mt: 0.5, fontWeight: 600 }}
                            />
                          )}
                        </Box>
                      </Box>
                      {coverage.gapDetails?.length > 0 && (
                        <Box sx={{ maxHeight: 100, overflow: "auto" }}>
                          {coverage.gapDetails.slice(0, 5).map((g: any) => (
                            <Typography key={g.id} variant="caption" display="block" color="text.tertiary" sx={{ py: 0.25 }}>
                              {g.title} (Score: {g.score})
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Risk Distribution by Domain */}
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Risk Distribution by Domain
              </Typography>
              <RiskDistributionSection />
            </CardContent>
          </Card>
        </Box>
      </Grid>

      {/* Right sidebar (4 cols) */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <RecentActivityCard />
          <RecentRisksCard />
        </Box>
      </Grid>
    </Grid>
  );
}

function RiskDistributionSection() {
  const { data: stats } = useDashboardStats();
  const totalDomainRisks = stats?.risksByDomain?.reduce((sum: number, d: any) => sum + parseInt(d.count), 0) || 0;

  if (totalDomainRisks === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
        No risks to display. Load demo data to see the dashboard in action.
      </Typography>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", borderRadius: 1, overflow: "hidden", height: 28, mb: 2 }}>
        {stats?.risksByDomain?.map((d: any) => {
          const pct = (parseInt(d.count) / totalDomainRisks) * 100;
          const meta = DOMAIN_META[d.domain];
          return (
            <Box
              key={d.domain}
              sx={{
                width: `${pct}%`,
                backgroundColor: meta?.color || "#94A3B8",
                minWidth: pct > 0 ? 4 : 0,
                transition: "width 0.3s ease",
              }}
              title={`${meta?.label || d.domain}: ${d.count} risks`}
            />
          );
        })}
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {stats?.risksByDomain?.map((d: any) => {
          const meta = DOMAIN_META[d.domain];
          return (
            <Box key={d.domain} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: meta?.color || "#94A3B8" }} />
              <Typography variant="caption" fontWeight={500}>
                {meta?.label || d.domain} ({d.count})
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function RecentActivityCard() {
  const navigate = useNavigate();
  const { data: activity } = useDashboardActivity(8);

  if (!activity || activity.length === 0) return null;

  return (
    <SectionCard
      title="Recent Activity"
      action={<Chip label="View all" size="small" clickable onClick={() => navigate("/audit-logs")} sx={{ fontWeight: 600 }} />}
    >
      <List disablePadding>
        {activity.slice(0, 5).map((a: any) => (
          <ListItem key={a.id} divider sx={{ px: 0, py: 1.25 }}>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ActivityIcon sx={{ fontSize: 16, color: "text.secondary", flexShrink: 0 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ lineHeight: 1.3 }}>
                    {a.action || a.eventType}
                  </Typography>
                  <Chip label={a.entityType} size="small" variant="outlined" sx={{ fontSize: "0.65rem", height: 20, flexShrink: 0 }} />
                </Box>
              }
              secondary={
                <Typography variant="caption" color="text.tertiary" sx={{ display: "block", mt: 0.25, ml: 3.5 }}>
                  by {a.user?.firstName} {a.user?.lastName} · {new Date(a.createdAt).toLocaleString()}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </SectionCard>
  );
}

function RecentRisksCard() {
  const navigate = useNavigate();
  const { data: stats } = useDashboardStats();

  return (
    <SectionCard
      title="Recent Risks"
      action={<Chip label="View all" size="small" clickable onClick={() => navigate("/risks")} sx={{ fontWeight: 600 }} />}
    >
      {!stats?.recentRisks?.length ? (
        <Typography variant="body2" color="text.secondary">No recent risks</Typography>
      ) : (
        <List disablePadding>
          {stats.recentRisks.map((risk: any) => (
            <ListItem
              key={risk.id}
              divider
              sx={{ px: 0, py: 1.25, cursor: "pointer", "&:hover": { bgcolor: "action.hover", borderRadius: 1 } }}
              onClick={() => navigate(`/risks/${risk.id}`)}
            >
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight={500}>
                    {risk.title}
                  </Typography>
                }
                secondary={
                  <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                    <StatusChip value={risk.domain} type="domain" />
                    <StatusChip value={risk.status} type="status" />
                    {risk.assessments?.[0] && (
                      <Chip
                        label={`Score: ${risk.assessments[0].likelihood * risk.assessments[0].impact}`}
                        size="small"
                        sx={{ fontWeight: 600, fontSize: "0.7rem" }}
                      />
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </SectionCard>
  );
}

function RiskMatrixAndStatusSection() {
  const navigate = useNavigate();
  const { data: stats } = useDashboardStats();
  const { data: trustConfig } = useTrustCenterConfig();
  const certificationCount = trustConfig?.certifications?.length || 0;

  const matrixPoints = (stats?.recentRisks || [])
    .filter((r: any) => r.assessments?.length > 0)
    .map((r: any) => ({
      likelihood: r.assessments[0].likelihood,
      impact: r.assessments[0].impact,
      count: 1,
    }));

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard title="Risk Matrix" subtitle="Likelihood vs Impact heatmap">
          {matrixPoints.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No assessed risks yet</Typography>
          ) : (
            <RiskMatrix points={matrixPoints} />
          )}
        </SectionCard>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {/* Risks by Status */}
          <SectionCard title="Risks by Status">
            {!stats?.risksByStatus?.length ? (
              <Typography variant="body2" color="text.secondary">No risks</Typography>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {stats.risksByStatus.map((s: any) => (
                  <Box key={s.status} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <StatusChip value={s.status} type="status" />
                    <Typography variant="body2" fontWeight={600}>{s.count}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </SectionCard>

          {/* Trust Center */}
          {trustConfig && (
            <SectionCard disableHover>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <TrustIcon sx={{ color: trustConfig.isPublic ? "#059669" : "text.secondary", fontSize: 28 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>Trust Center</Typography>
                    <Typography variant="caption" color="text.tertiary">
                      {trustConfig.isPublic ? "Public · " : "Private · "}
                      {certificationCount} certification{certificationCount !== 1 ? "s" : ""}
                    </Typography>
                  </Box>
                </Box>
                <Chip label="Manage" size="small" clickable onClick={() => navigate("/trust-center")} sx={{ fontWeight: 600 }} />
              </Box>
            </SectionCard>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default function DashboardPage() {
  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your GRC posture and key metrics"
      />

      {/* ROW 1: Stat Cards */}
      <Box sx={{ mb: 3 }}>
        <StatCardsRow />
      </Box>

      {/* Alerts */}
      <AlertsSection />

      {/* Risk Trends */}
      <Box sx={{ mb: 2.5 }}>
        <RiskTrendsSection />
      </Box>

      {/* ROW 2: Compliance + Coverage + Activity */}
      <Box sx={{ mb: 2.5 }}>
        <ComplianceAndCoverageSection />
      </Box>

      {/* ROW 3: Risk Matrix + Status */}
      <RiskMatrixAndStatusSection />
    </Box>
  );
}
