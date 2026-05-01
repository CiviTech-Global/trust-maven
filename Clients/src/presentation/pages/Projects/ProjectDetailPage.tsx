import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Chip, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Alert, IconButton,
} from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { useProject } from "../../../infrastructure/api/projects.api";
import { useRisks } from "../../../infrastructure/api/risks.api";
import RiskChip from "../../components/common/RiskChip";
import RiskMatrix from "../../components/common/RiskMatrix";
import Grid from "@mui/material/Grid2";

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  active: "Active",
  on_hold: "On Hold",
  completed: "Completed",
  archived: "Archived",
};

const STATUS_COLORS: Record<string, "default" | "primary" | "success" | "warning" | "info"> = {
  draft: "default",
  active: "success",
  on_hold: "warning",
  completed: "info",
  archived: "default",
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, error } = useProject(id || null);
  const { data: risks } = useRisks({ projectId: id || undefined });

  if (isLoading) return <LinearProgress />;
  if (error || !project) return <Alert severity="error">Project not found</Alert>;

  const matrixPoints = (risks || [])
    .filter((r: any) => r.assessments?.length > 0)
    .map((r: any) => ({
      likelihood: r.assessments[0].likelihood,
      impact: r.assessments[0].impact,
      count: 1,
    }));

  const treatmentStats = (risks || []).reduce(
    (acc: any, r: any) => {
      const treatments = r.treatments || [];
      acc.total += treatments.length;
      acc.completed += treatments.filter((t: any) => t.status === "completed").length;
      return acc;
    },
    { total: 0, completed: 0 }
  );

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <IconButton onClick={() => navigate("/projects")}>
          <BackIcon />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1">{project.name}</Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Chip
              label={STATUS_LABELS[project.status] || project.status}
              size="small"
              color={STATUS_COLORS[project.status] || "default"}
            />
            {project.startDate && (
              <Chip label={`Start: ${new Date(project.startDate).toLocaleDateString()}`} size="small" variant="outlined" />
            )}
            {project.endDate && (
              <Chip label={`End: ${new Date(project.endDate).toLocaleDateString()}`} size="small" variant="outlined" />
            )}
          </Box>
        </Box>
      </Box>

      {project.description && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="body1">{project.description}</Typography>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Total Risks</Typography>
              <Typography variant="h1" sx={{ color: "#4338CA", mt: 1 }}>{risks?.length || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Treatment Progress</Typography>
              <Typography variant="h1" sx={{ color: "#059669", mt: 1 }}>
                {treatmentStats.total > 0 ? `${treatmentStats.completed}/${treatmentStats.total}` : "0/0"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 1 }}>Risk Matrix</Typography>
              {matrixPoints.length > 0 ? <RiskMatrix points={matrixPoints} /> : (
                <Typography variant="body2" color="text.secondary">No assessed risks</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h3" sx={{ mb: 2 }}>Project Risks</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Domain</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Owner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {risks?.map((risk: any) => {
                  const assessment = risk.assessments?.[0];
                  const score = assessment ? assessment.likelihood * assessment.impact : null;
                  return (
                    <TableRow key={risk.id} hover sx={{ cursor: "pointer" }} onClick={() => navigate(`/risks/${risk.id}`)}>
                      <TableCell><Typography variant="body1" fontWeight={500}>{risk.title}</Typography></TableCell>
                      <TableCell><RiskChip value={risk.domain} type="domain" /></TableCell>
                      <TableCell><RiskChip value={risk.status} type="status" /></TableCell>
                      <TableCell>
                        {score !== null ? (
                          <Typography variant="body2" fontWeight={600} sx={{
                            color: score >= 15 ? "#E11D48" : score >= 10 ? "#D97706" : "#059669",
                          }}>{score}</Typography>
                        ) : <Typography variant="body2" color="text.secondary">--</Typography>}
                      </TableCell>
                      <TableCell>{risk.owner ? `${risk.owner.firstName} ${risk.owner.lastName}` : "--"}</TableCell>
                    </TableRow>
                  );
                })}
                {(!risks || risks.length === 0) && (
                  <TableRow><TableCell colSpan={5} align="center">No risks in this project</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
