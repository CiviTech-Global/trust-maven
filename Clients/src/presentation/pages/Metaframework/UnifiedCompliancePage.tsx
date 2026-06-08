import {
  Box, Typography, LinearProgress, Alert, Chip, Card, CardContent,
  Grid2 as Grid,
} from "@mui/material";
import {
  Gavel as RegulationIcon, AssignmentOutlined,
  CheckCircleOutline, Link as LinkIcon,
} from "@mui/icons-material";
import { useUnifiedCompliance, type RegulationCompliance } from "../../../infrastructure/api/metaframework.api";
import StatCard from "../../components/common/StatCard";
import EmptyState from "../../components/common/EmptyState";

function ComplianceGauge({ percent }: { percent: number }) {
  const color = percent >= 80 ? "#10B981" : percent >= 50 ? "#F59E0B" : "#EF4444";
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
      <Box sx={{ position: "relative", width: 140, height: 140 }}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="10"
          />
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 70 70)"
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 700, color, lineHeight: 1 }}>
            {percent}%
          </Typography>
          <Typography variant="caption" color="text.secondary">Overall</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function RegulationComplianceCard({ reg }: { reg: RegulationCompliance }) {
  const color = reg.compliancePercent >= 80 ? "#10B981" : reg.compliancePercent >= 50 ? "#F59E0B" : "#EF4444";
  const totalCovered = reg.directImplementations + reg.implementedViaCommonControls;

  return (
    <Card>
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <Chip label={reg.regulationCode} size="small" color="primary" variant="outlined" />
              <Chip
                label={reg.compliancePercent >= 80 ? "Compliant" : reg.compliancePercent >= 50 ? "In Progress" : "At Risk"}
                size="small"
                sx={{
                  backgroundColor: `${color}18`,
                  color,
                  fontWeight: 600,
                  border: `1px solid ${color}44`,
                  fontSize: "0.65rem",
                }}
              />
            </Box>
            <Typography variant="body1" fontWeight={600}>{reg.regulationName}</Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color, lineHeight: 1 }}>
              {reg.compliancePercent}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 1.5 }}>
          <Box
            sx={{
              width: "100%",
              height: 8,
              borderRadius: 4,
              backgroundColor: "#E5E7EB",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${reg.compliancePercent}%`,
                height: "100%",
                backgroundColor: color,
                borderRadius: 4,
                transition: "width 0.6s ease",
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Requirements</Typography>
            <Typography variant="body2" fontWeight={600}>{reg.totalRequirements}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Covered</Typography>
            <Typography variant="body2" fontWeight={600} sx={{ color: "#10B981" }}>
              {totalCovered}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Via CCs</Typography>
            <Typography variant="body2" fontWeight={600} sx={{ color: "#6366F1" }}>
              {reg.implementedViaCommonControls}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Direct</Typography>
            <Typography variant="body2" fontWeight={600}>{reg.directImplementations}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Gaps</Typography>
            <Typography variant="body2" fontWeight={600} sx={{ color: "#EF4444" }}>
              {reg.totalRequirements - totalCovered}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function UnifiedCompliancePage() {
  const { data, isLoading, error } = useUnifiedCompliance();

  const regulations = data?.regulations || [];
  const overall = data?.overallCompliancePercent || 0;
  const totalRequirements = regulations.reduce((s, r) => s + r.totalRequirements, 0);
  const totalCovered = regulations.reduce((s, r) => s + r.directImplementations + r.implementedViaCommonControls, 0);

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>Unified Compliance</Typography>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>Failed to load compliance data</Alert>
      )}

      {!isLoading && regulations.length === 0 ? (
        <EmptyState
          title="No regulations adopted yet"
          description="Adopt regulations in the Compliance Hub to see your unified compliance status across all frameworks"
          icon={<AssignmentOutlined />}
        />
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <ComplianceGauge percent={overall} />
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <StatCard
                    label="Regulations"
                    value={regulations.length}
                    icon={<RegulationIcon />}
                    accentColor="#6366F1"
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <StatCard
                    label="Requirements"
                    value={totalRequirements}
                    icon={<AssignmentOutlined />}
                    accentColor="#8B5CF6"
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <StatCard
                    label="Covered"
                    value={totalCovered}
                    icon={<CheckCircleOutline />}
                    accentColor="#10B981"
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <StatCard
                    label="Gaps"
                    value={totalRequirements - totalCovered}
                    icon={<LinkIcon />}
                    accentColor="#EF4444"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
              Regulation Breakdown
            </Typography>
            <Chip
              label={`${overall}% overall compliance`}
              size="small"
              sx={{
                backgroundColor: overall >= 80 ? "#10B98118" : overall >= 50 ? "#F59E0B18" : "#EF444418",
                color: overall >= 80 ? "#10B981" : overall >= 50 ? "#F59E0B" : "#EF4444",
                fontWeight: 600,
              }}
            />
          </Box>

          <Grid container spacing={2}>
            {regulations.map((reg) => (
              <Grid key={reg.regulationId} size={{ xs: 12, sm: 6, lg: 4 }}>
                <RegulationComplianceCard reg={reg} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}
