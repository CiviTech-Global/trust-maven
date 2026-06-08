import { useState } from "react";
import {
  Box, Typography, Button, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Chip, LinearProgress, Alert,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from "@mui/icons-material";
import { usePolicies, useDeletePolicy } from "../../../infrastructure/api/policies.api";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import CreatePolicyModal from "./CreatePolicyModal";
import EditPolicyModal from "./EditPolicyModal";
import PolicyDetailDialog from "./PolicyDetailDialog";

const STATUS_FILTERS = [
  { value: "", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "approved", label: "Approved" },
  { value: "retired", label: "Retired" },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  draft: { bg: "#F1F5F9", color: "#475569" },
  review: { bg: "#FEF3C7", color: "#92400E" },
  approved: { bg: "#D1FAE5", color: "#065F46" },
  retired: { bg: "#FEE2E2", color: "#9F1239" },
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  review: "Review",
  approved: "Approved",
  retired: "Retired",
};

export default function PoliciesPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editPolicy, setEditPolicy] = useState<any | null>(null);
  const [detailPolicyId, setDetailPolicyId] = useState<string | null>(null);

  const { data: policies, isLoading, error } = usePolicies({
    status: statusFilter || undefined,
    search: search || undefined,
  });
  const deleteMutation = useDeletePolicy();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Policies</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          Add Policy
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load policies</Alert>}

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField select label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ minWidth: 160 }}>
          {STATUS_FILTERS.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
        </TextField>
        <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search policies..." sx={{ flex: 1 }} />
      </Box>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!policies || policies.length === 0) ? (
        <EmptyState
          title="No policies yet"
          description="Create policies to define your organization's security and compliance requirements"
          actionLabel="Create First Policy"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Approved At</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policies?.map((policy: any) => (
                <TableRow key={policy.id} hover>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline", color: "primary.main" } }}
                      onClick={() => setDetailPolicyId(policy.id)}
                    >
                      {policy.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">v{policy.version}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={STATUS_LABELS[policy.status] || policy.status}
                      size="small"
                      sx={{
                        backgroundColor: STATUS_COLORS[policy.status]?.bg || "#F1F5F9",
                        color: STATUS_COLORS[policy.status]?.color || "#475569",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {policy.owner ? `${policy.owner.firstName} ${policy.owner.lastName}` : "--"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {policy.approvedAt ? new Date(policy.approvedAt).toLocaleDateString() : "--"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(policy.updatedAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View">
                      <IconButton size="small" onClick={() => setDetailPolicyId(policy.id)}>
                        <ViewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => setEditPolicy(policy)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteId(policy.id)}>
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

      <CreatePolicyModal open={createOpen} onClose={() => setCreateOpen(false)} />

      {editPolicy && (
        <EditPolicyModal open={true} onClose={() => setEditPolicy(null)} policy={editPolicy} />
      )}

      {detailPolicyId && (
        <PolicyDetailDialog open={true} onClose={() => setDetailPolicyId(null)} policyId={detailPolicyId} />
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Policy"
        message="Are you sure you want to delete this policy? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteMutation.isPending}
      />
    </Box>
  );
}
