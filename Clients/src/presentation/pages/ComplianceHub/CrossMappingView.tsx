import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Alert,
} from "@mui/material";
import {
  CompareArrows as MappingIcon,
} from "@mui/icons-material";
import { useRegulations, useFrameworkOverlap } from "../../../infrastructure/api/regulationCatalog.api";

export default function CrossMappingView() {
  const [regId1, setRegId1] = useState<string>("");
  const [regId2, setRegId2] = useState<string>("");

  const { data: regulations } = useRegulations();
  const { data: overlap, isLoading: overlapLoading } = useFrameworkOverlap(
    regId1 || null,
    regId2 || null
  );

  const relevanceColor = (rel: string) => {
    switch (rel) {
      case "high": return "success";
      case "medium": return "warning";
      case "low": return "default";
      default: return "default";
    }
  };

  const typeLabel = (type: string) => {
    switch (type) {
      case "equivalent": return "Equivalent";
      case "overlapping": return "Overlapping";
      case "related": return "Related";
      case "partial": return "Partial";
      default: return type;
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Cross-Framework Mapping
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Compare requirements between two frameworks to identify overlaps and coverage
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={5}>
              <FormControl fullWidth>
                <InputLabel>Framework 1</InputLabel>
                <Select
                  value={regId1}
                  label="Framework 1"
                  onChange={(e) => setRegId1(e.target.value)}
                >
                  {regulations?.map((reg) => (
                    <MenuItem key={reg.id} value={reg.id} disabled={reg.id === regId2}>
                      {reg.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2} sx={{ textAlign: "center" }}>
              <MappingIcon sx={{ fontSize: 32, color: "text.secondary" }} />
            </Grid>
            <Grid item xs={12} md={5}>
              <FormControl fullWidth>
                <InputLabel>Framework 2</InputLabel>
                <Select
                  value={regId2}
                  label="Framework 2"
                  onChange={(e) => setRegId2(e.target.value)}
                >
                  {regulations?.map((reg) => (
                    <MenuItem key={reg.id} value={reg.id} disabled={reg.id === regId1}>
                      {reg.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {overlapLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {overlap && (
        <>
          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h3" fontWeight={700} color="primary.main">
                    {overlap.overlapPercentage}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Overlap Coverage
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h3" fontWeight={700}>
                    {overlap.mappings.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mapped Requirements
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h5" fontWeight={700}>
                    {overlap.regulation1.totalRequirements} / {overlap.regulation2.totalRequirements}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Requirements
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Mapping Table */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Requirement Mappings
              </Typography>
              {overlap.mappings.length === 0 ? (
                <Alert severity="info">No cross-mappings found between these frameworks.</Alert>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>{overlap.regulation1.name}</TableCell>
                        <TableCell align="center">Mapping</TableCell>
                        <TableCell>{overlap.regulation2.name}</TableCell>
                        <TableCell align="center">Relevance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {overlap.mappings.map((m, i) => (
                        <TableRow key={i} hover>
                          <TableCell>
                            <Chip label={m.source.code} size="small" sx={{ mr: 1 }} />
                            <Typography variant="body2" component="span">
                              {m.source.title}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={typeLabel(m.mappingType)}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip label={m.target.code} size="small" sx={{ mr: 1 }} />
                            <Typography variant="body2" component="span">
                              {m.target.title}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={m.relevance}
                              size="small"
                              color={relevanceColor(m.relevance) as any}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {regId1 && regId2 && !overlapLoading && !overlap && (
        <Alert severity="info">Select two different frameworks to see their cross-mapping analysis.</Alert>
      )}
    </Box>
  );
}
