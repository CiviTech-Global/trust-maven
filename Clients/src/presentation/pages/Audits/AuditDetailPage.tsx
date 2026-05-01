import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Chip, Card, CardContent, IconButton, Tooltip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Alert,
} from "@mui/material";
import { ArrowBack, Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useAuditById, useDeleteFinding } from "../../../infrastructure/api/auditMgmt.api";
import CreateFindingModal from "./CreateFindingModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const SEVERITY_COLORS: Record<string, { bg: string; color: string }> = {
  critical: { bg: "#FEE2E2", color: "#9F1239" },
  high: { bg: "#FED7AA", color: "#9A3412" },
  medium: { bg: "#FEF3C7", color: "#92400E" },
  low: { bg: "#D1FAE5", color: "#065F46" },
  informational: { bg: "#E0E7FF", color: "#3730A3" },
};

const STATUS_COLORS: Record<string, "default" | "primary" | "success" | "warning" | "error"> = {
  open: "error",
  in_remediation: "warning",
  remediated: "primary",
  accepted: "default",
  closed: "success",
};

export default function AuditDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [createFindingOpen, setCreateFindingOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ auditId: string; findingId: string } | null>(null);

  const { data: audit, isLoading, error } = useAuditById(id!);
  const deleteFinding = useDeleteFinding();

  const handleDeleteFinding = async () => {
    if (!deleteTarget) return;
    await deleteFinding.mutateAsync(deleteTarget);
    setDeleteTarget(null);
  };

  if (isLoading) return <LinearProgress />;
  if (error || !audit) return <Alert severity="error">Audit not found</Alert>;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <IconButton onClick={() => navigate("/audits")}><ArrowBack /></IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1">{audit.title}</Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
            <Chip label={audit.auditType} size="small" variant="outlined" sx={{ textTransform: "capitalize" }} />
            <Chip label={audit.status.replace("_", " ")} size="small" color={STATUS_COLORS[audit.status] || "default"} sx={{ textTransform: "capitalize" }} />
          </Box>
        </Box>
      </Box>

      {audit.description && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>Description</Typography>
            <Typography>{audit.description}</Typography>
          </CardContent>
        </Card>
      )}

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, mb: 3 }}>
        <Card><CardContent>
          <Typography variant="body2" color="text.secondary">Lead Auditor</Typography>
          <Typography fontWeight={500}>{audit.leadAuditor ? `${audit.leadAuditor.firstName} ${audit.leadAuditor.lastName}` : "--"}</Typography>
        </CardContent></Card>
        <Card><CardContent>
          <Typography variant="body2" color="text.secondary">Start Date</Typography>
          <Typography fontWeight={500}>{new Date(audit.startDate).toLocaleDateString()}</Typography>
        </CardContent></Card>
        <Card><CardContent>
          <Typography variant="body2" color="text.secondary">End Date</Typography>
          <Typography fontWeight={500}>{audit.endDate ? new Date(audit.endDate).toLocaleDateString() : "--"}</Typography>
        </CardContent></Card>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h3">Findings ({audit.findings?.length || 0})</Typography>
        <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => setCreateFindingOpen(true)}>
          Add Finding
        </Button>
      </Box>

      {(!audit.findings || audit.findings.length === 0) ? (
        <Alert severity="info">No findings recorded for this audit</Alert>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Responsible</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {audit.findings.map((finding) => (
                <TableRow key={finding.id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight={500}>{finding.title}</Typography>
                    {finding.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {finding.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={finding.severity}
                      size="small"
                      sx={{
                        backgroundColor: SEVERITY_COLORS[finding.severity]?.bg,
                        color: SEVERITY_COLORS[finding.severity]?.color,
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={finding.status.replace("_", " ")} size="small" color={STATUS_COLORS[finding.status] || "default"} sx={{ textTransform: "capitalize" }} />
                  </TableCell>
                  <TableCell>
                    {finding.responsible ? `${finding.responsible.firstName} ${finding.responsible.lastName}` : "--"}
                  </TableCell>
                  <TableCell>
                    {finding.dueDate ? new Date(finding.dueDate).toLocaleDateString() : "--"}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteTarget({ auditId: audit.id, findingId: finding.id })}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CreateFindingModal open={createFindingOpen} onClose={() => setCreateFindingOpen(false)} auditId={id!} />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Finding"
        message="Are you sure you want to delete this finding?"
        onConfirm={handleDeleteFinding}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteFinding.isPending}
      />
    </Box>
  );
}
