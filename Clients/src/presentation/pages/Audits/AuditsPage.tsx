import { useState } from "react";
import {
  Box, Typography, Button, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Chip, LinearProgress, Alert,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Visibility as ViewIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAudits, useDeleteAudit } from "../../../infrastructure/api/auditMgmt.api";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import CreateAuditModal from "./CreateAuditModal";

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "planned", label: "Planned" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const TYPE_OPTIONS = [
  { value: "", label: "All Types" },
  { value: "internal", label: "Internal" },
  { value: "external", label: "External" },
];

const STATUS_COLORS: Record<string, "default" | "primary" | "success" | "warning" | "error"> = {
  planned: "default",
  in_progress: "primary",
  completed: "success",
  cancelled: "error",
};

export default function AuditsPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [auditType, setAuditType] = useState("");
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: audits, isLoading, error } = useAudits({
    status: status || undefined,
    auditType: auditType || undefined,
    search: search || undefined,
  });
  const deleteMutation = useDeleteAudit();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Audits</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          Create Audit
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load audits</Alert>}

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ minWidth: 160 }}>
          {STATUS_OPTIONS.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
        </TextField>
        <TextField select label="Type" value={auditType} onChange={(e) => setAuditType(e.target.value)} sx={{ minWidth: 160 }}>
          {TYPE_OPTIONS.map((t) => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
        </TextField>
        <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search audits..." sx={{ flex: 1 }} />
      </Box>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!audits || audits.length === 0) ? (
        <EmptyState
          title="No audits yet"
          description="Create your first audit to track findings and compliance"
          actionLabel="Create Audit"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Lead Auditor</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {audits?.map((audit) => (
                <TableRow key={audit.id} hover sx={{ cursor: "pointer" }} onClick={() => navigate(`/audits/${audit.id}`)}>
                  <TableCell>
                    <Typography variant="body1" fontWeight={500}>{audit.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={audit.auditType} size="small" variant="outlined" sx={{ textTransform: "capitalize" }} />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={audit.status.replace("_", " ")}
                      size="small"
                      color={STATUS_COLORS[audit.status] || "default"}
                      sx={{ textTransform: "capitalize" }}
                    />
                  </TableCell>
                  <TableCell>
                    {audit.leadAuditor ? `${audit.leadAuditor.firstName} ${audit.leadAuditor.lastName}` : "--"}
                  </TableCell>
                  <TableCell>{new Date(audit.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{audit.endDate ? new Date(audit.endDate).toLocaleDateString() : "--"}</TableCell>
                  <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                    <Tooltip title="View">
                      <IconButton size="small" onClick={() => navigate(`/audits/${audit.id}`)}>
                        <ViewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteId(audit.id)}>
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

      <CreateAuditModal open={createOpen} onClose={() => setCreateOpen(false)} />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Audit"
        message="Are you sure? All findings for this audit will also be deleted."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteMutation.isPending}
      />
    </Box>
  );
}
