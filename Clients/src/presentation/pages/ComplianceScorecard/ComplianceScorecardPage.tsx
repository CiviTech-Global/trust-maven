import {
  Box, Typography, Card, CardContent, LinearProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Gavel as RegulationIcon,
  CheckCircle as CompliantIcon,
  Warning as PartialIcon,
  Error as NonCompliantIcon,
  HelpOutline as UnknownIcon,
} from "@mui/icons-material";
import { useFrameworks } from "../../../infrastructure/api/frameworks.api";
import { useAdoptedRegulations } from "../../../infrastructure/api/complianceHub.api";
import StatCard from "../../components/common/StatCard";

export default function ComplianceScorecardPage() {
  const theme = useTheme();
  const { data: frameworks, isLoading: frameworksLoading } = useFrameworks();
  const { data: orgRegs, isLoading: regsLoading } = useAdoptedRegulations();
  const isLoading = frameworksLoading || regsLoading;

  const allItems = [
    ...(frameworks || []).map((f: any) => ({
      id: f.id, name: f.name, type: "framework",
      compliance: f.coveragePercent ? (f.coveragePercent >= 80 ? "compliant" : f.coveragePercent >= 50 ? "partial" : "non_compliant") : "unknown",
      score: f.coveragePercent || 0,
    })),
    ...(orgRegs || []).map((r: any) => ({
      id: r.id, name: r.regulation?.name || r.regulationId, type: "regulation",
      compliance: r.status === "active" ? "unknown" : r.status === "planned" ? "partial" : "non_compliant",
      score: 0,
    })),
  ];

  const compliant = allItems.filter((i) => i.compliance === "compliant").length;
  const partial = allItems.filter((i) => i.compliance === "partial").length;
  const nonCompliant = allItems.filter((i) => i.compliance === "non_compliant").length;
  const overallScore = allItems.length > 0 ? Math.round(allItems.reduce((sum, i) => sum + i.score, 0) / allItems.length) : 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#059669";
    if (score >= 50) return "#D97706";
    return "#E11D48";
  };

  const complianceChip = (status: string, score: number) => {
    const defaultConfig = { label: "Unknown", color: "default" as const, icon: <UnknownIcon /> };
    const config: Record<string, { label: string; color: "success" | "warning" | "error" | "default"; icon: any }> = {
      compliant: { label: "Compliant", color: "success", icon: <CompliantIcon /> },
      partial: { label: "Partial", color: "warning", icon: <PartialIcon /> },
      non_compliant: { label: "Non-Compliant", color: "error", icon: <NonCompliantIcon /> },
      unknown: defaultConfig,
    };
    const c = config[status] || defaultConfig;
    return <Chip icon={c.icon} label={`${c.label} (${score}%)`} color={c.color} size="small" />;
  };

  if (isLoading) {
    return <Box><Typography variant="h1" sx={{ mb: 3 }}>Compliance Scorecard</Typography><LinearProgress /></Box>;
  }

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>Compliance Scorecard</Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Overall Score" value={`${overallScore}%`} color={theme.palette.primary.main} icon={<RegulationIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Compliant" value={compliant} color="#059669" icon={<CompliantIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Partial" value={partial} color="#D97706" icon={<PartialIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Non-Compliant" value={nonCompliant} color="#E11D48" icon={<NonCompliantIcon />} />
        </Grid>
      </Grid>

      {allItems.length === 0 ? (
        <Alert severity="info">No frameworks or regulations mapped yet. Load demo data or map regulations to see your compliance scorecard.</Alert>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2 }}>Compliance Status</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allItems.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Typography variant="body1" fontWeight={500}>{item.name}</Typography>
                      </TableCell>
                      <TableCell><Chip label={item.type} size="small" variant="outlined" /></TableCell>
                      <TableCell>{complianceChip(item.compliance, item.score)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={item.score}
                            sx={{ flex: 1, height: 8, borderRadius: 4, "& .MuiLinearProgress-bar": { backgroundColor: getScoreColor(item.score) } }}
                          />
                          <Typography variant="body2" fontWeight={600}>{item.score}%</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
