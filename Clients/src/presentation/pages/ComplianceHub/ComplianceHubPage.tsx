import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useComplianceHubDashboard, useAdoptedRegulations } from "../../../infrastructure/api/complianceHub.api";

export default function ComplianceHubPage() {
  const navigate = useNavigate();
  const { data: dashboard, isLoading: dashLoading } = useComplianceHubDashboard();
  const { data: adopted } = useAdoptedRegulations();

  if (dashLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  const hasAdopted = adopted && adopted.length > 0;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Compliance Hub
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Unified view across all adopted regulations and frameworks
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/compliance-hub/recommend")}
          >
            Framework Recommender
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/compliance-hub/regulations")}
          >
            Manage Regulations
          </Button>
        </Box>
      </Box>

      {!hasAdopted ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          No regulations adopted yet. Browse the regulation catalog and adopt frameworks to start tracking compliance.
        </Alert>
      ) : null}

      {/* Overall Score */}
      {dashboard && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: "center", py: 3 }}>
                <Box sx={{ position: "relative", display: "inline-flex", mb: 1 }}>
                  <CircularProgress
                    variant="determinate"
                    value={dashboard.overallScore}
                    size={100}
                    thickness={6}
                    color={dashboard.overallScore >= 70 ? "success" : dashboard.overallScore >= 40 ? "warning" : "error"}
                  />
                  <Box
                    sx={{
                      top: 0, left: 0, bottom: 0, right: 0,
                      position: "absolute",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <Typography variant="h5" fontWeight={700}>
                      {dashboard.overallScore}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" fontWeight={600}>Overall Compliance</Typography>
                <Typography variant="body2" color="text.secondary">
                  Across {dashboard.adoptedRegulations.length} regulation(s)
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Compliance by Area
                </Typography>
                {dashboard.areaScores.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">No area scores available</Typography>
                ) : (
                  dashboard.areaScores.map((area) => (
                    <Box key={area.area} sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="body2" fontWeight={500}>{area.area}</Typography>
                        <Typography variant="body2" fontWeight={600}>{area.score}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={area.score}
                        color={area.score >= 70 ? "success" : area.score >= 40 ? "warning" : "error"}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Adopted Regulations Table */}
      {dashboard && dashboard.adoptedRegulations.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Adopted Regulations
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Regulation</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">Requirements</TableCell>
                    <TableCell align="center">Implemented</TableCell>
                    <TableCell align="center">Compliance</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboard.adoptedRegulations.map((reg) => (
                    <TableRow key={reg.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>{reg.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{reg.code}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={reg.category.replace(/_/g, " ")} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell align="center">{reg.totalRequirements}</TableCell>
                      <TableCell align="center">{reg.implemented}</TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={reg.compliance >= 70 ? <CheckIcon /> : <WarningIcon />}
                          label={`${reg.compliance}%`}
                          size="small"
                          color={reg.compliance >= 70 ? "success" : reg.compliance >= 40 ? "warning" : "error"}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          onClick={() => navigate(`/compliance-hub/regulations/${reg.id}`)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Top Gaps */}
      {dashboard && dashboard.topGaps.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Top Gaps
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Requirement</TableCell>
                    <TableCell>Regulation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboard.topGaps.map((gap, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Chip label={gap.code} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>{gap.requirement}</TableCell>
                      <TableCell>{gap.regulation}</TableCell>
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
