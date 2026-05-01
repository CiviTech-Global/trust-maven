import { useState } from "react";
import {
  Box, Typography, Button, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Chip, LinearProgress, Alert, Card, CardContent,
  LinearProgress as MuiLinearProgress,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Visibility as ViewIcon } from "@mui/icons-material";
import { useFrameworks, useComplianceSummary, useDeleteFramework, type ComplianceSummary } from "../../../infrastructure/api/frameworks.api";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import CreateFrameworkModal from "./CreateFrameworkModal";
import FrameworkDetailModal from "./FrameworkDetailModal";

function CoverageBar({ percent }: { percent: number }) {
  const color = percent >= 80 ? "#059669" : percent >= 50 ? "#D97706" : "#E11D48";
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 150 }}>
      <Box sx={{ flex: 1 }}>
        <MuiLinearProgress
          variant="determinate"
          value={percent}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "#E2E8F0",
            "& .MuiLinearProgress-bar": { backgroundColor: color, borderRadius: 4 },
          }}
        />
      </Box>
      <Typography variant="body2" fontWeight={600} sx={{ color, minWidth: 40 }}>
        {percent}%
      </Typography>
    </Box>
  );
}

export default function FrameworksPage() {
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewFrameworkId, setViewFrameworkId] = useState<string | null>(null);

  const { data: frameworks, isLoading, error } = useFrameworks({ search: search || undefined });
  const { data: complianceSummary } = useComplianceSummary();
  const deleteMutation = useDeleteFramework();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
  };

  const getSummaryForFramework = (id: string): ComplianceSummary | undefined => {
    return complianceSummary?.find((s) => s.id === id);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Compliance Frameworks</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          Add Framework
        </Button>
      </Box>

      {complianceSummary && complianceSummary.length > 0 && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 2, mb: 3 }}>
          {complianceSummary.map((s) => (
            <Card key={s.id} sx={{ cursor: "pointer" }} onClick={() => setViewFrameworkId(s.id)}>
              <CardContent>
                <Typography variant="body1" fontWeight={600}>{s.name} {s.version}</Typography>
                <CoverageBar percent={s.coveragePercent} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {s.coveredCount}/{s.totalRequirements} requirements covered
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load frameworks</Alert>}

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search frameworks..." sx={{ flex: 1 }} />
      </Box>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!frameworks || frameworks.length === 0) ? (
        <EmptyState
          title="No frameworks added"
          description="Add compliance frameworks to track control coverage and identify gaps"
          actionLabel="Add Framework"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Framework</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Requirements</TableCell>
                <TableCell>Coverage</TableCell>
                <TableCell>Gaps</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {frameworks?.map((fw) => {
                const summary = getSummaryForFramework(fw.id);
                const gaps = summary ? summary.totalRequirements - summary.coveredCount : 0;
                return (
                  <TableRow key={fw.id} hover>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>{fw.name}</Typography>
                    </TableCell>
                    <TableCell>{fw.version || "--"}</TableCell>
                    <TableCell>{fw.requirements?.length || 0}</TableCell>
                    <TableCell>
                      {summary ? <CoverageBar percent={summary.coveragePercent} /> : "--"}
                    </TableCell>
                    <TableCell>
                      {gaps > 0 ? (
                        <Chip label={`${gaps} gaps`} size="small" color="warning" />
                      ) : summary ? (
                        <Chip label="Full coverage" size="small" color="success" />
                      ) : "--"}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Coverage">
                        <IconButton size="small" color="primary" onClick={() => setViewFrameworkId(fw.id)}>
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => setDeleteId(fw.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CreateFrameworkModal open={createOpen} onClose={() => setCreateOpen(false)} />
      {viewFrameworkId && <FrameworkDetailModal open={true} onClose={() => setViewFrameworkId(null)} frameworkId={viewFrameworkId} />}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Framework"
        message="This will remove the framework and all control mappings. Continue?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteMutation.isPending}
      />
    </Box>
  );
}
