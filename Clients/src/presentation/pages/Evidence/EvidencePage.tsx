import { useState } from "react";
import {
  Box, Typography, Button, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Chip, LinearProgress, Alert, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from "@mui/icons-material";
import { useEvidence, useEvidenceSummary, useCreateEvidence, useUpdateEvidence, useDeleteEvidence, type EvidenceItem } from "../../../infrastructure/api/evidence.api";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  draft: { bg: "#F1F5F9", color: "#475569" },
  submitted: { bg: "#DBEAFE", color: "#1E40AF" },
  approved: { bg: "#D1FAE5", color: "#065F46" },
  rejected: { bg: "#FEE2E2", color: "#9F1239" },
};

export default function EvidencePage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [entityType, setEntityType] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<EvidenceItem | null>(null);

  const { data: items, isLoading, error } = useEvidence({
    status: statusFilter || undefined,
    entityType: entityType || undefined,
    search: search || undefined,
  });
  const { data: summary } = useEvidenceSummary();
  const deleteMutation = useDeleteEvidence();

  const detailItem = detailId ? items?.find((i: EvidenceItem) => i.id === detailId) : null;

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Evidence Collection</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          Add Evidence
        </Button>
      </Box>

      {summary && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2, mb: 3 }}>
          <Card><CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h2">{summary.total}</Typography>
            <Typography variant="body2" color="text.secondary">Total</Typography>
          </CardContent></Card>
          <Card><CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h2">{summary.draft}</Typography>
            <Typography variant="body2" color="text.secondary">Draft</Typography>
          </CardContent></Card>
          <Card><CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h2">{summary.submitted}</Typography>
            <Typography variant="body2" color="text.secondary">Submitted</Typography>
          </CardContent></Card>
          <Card sx={{ borderLeft: "4px solid #059669" }}><CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ color: "#059669" }}>{summary.approved}</Typography>
            <Typography variant="body2" color="text.secondary">Approved</Typography>
          </CardContent></Card>
          <Card sx={{ borderLeft: "4px solid #E11D48" }}><CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ color: "#E11D48" }}>{summary.rejected}</Typography>
            <Typography variant="body2" color="text.secondary">Rejected</Typography>
          </CardContent></Card>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load evidence</Alert>}

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField select label="Entity Type" value={entityType} onChange={(e) => setEntityType(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="risk">Risk</MenuItem>
          <MenuItem value="control">Control</MenuItem>
          <MenuItem value="project">Project</MenuItem>
          <MenuItem value="audit">Audit</MenuItem>
        </TextField>
        <TextField select label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ minWidth: 140 }}>
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="submitted">Submitted</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </TextField>
        <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search evidence..." sx={{ flex: 1 }} />
      </Box>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!items || items.length === 0) ? (
        <EmptyState title="No evidence collected" description="Upload evidence documents for risks, controls, and audits" actionLabel="Add Evidence" onAction={() => setCreateOpen(true)} />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Uploaded By</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((item: EvidenceItem) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight={500}>{item.title}</Typography>
                    {item.description && <Typography variant="body2" color="text.secondary">{item.description}</Typography>}
                  </TableCell>
                  <TableCell><Chip label={item.entityType} size="small" /></TableCell>
                  <TableCell>
                    <Chip label={item.status} size="small" sx={{ backgroundColor: STATUS_COLORS[item.status]?.bg, color: STATUS_COLORS[item.status]?.color, fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>{item.uploadedBy ? `${item.uploadedBy.firstName} ${item.uploadedBy.lastName}` : "--"}</TableCell>
                  <TableCell><Typography variant="body2" color="text.secondary">{new Date(item.createdAt).toLocaleDateString()}</Typography></TableCell>
                  <TableCell align="right">
                    <Tooltip title="View">
                      <IconButton size="small" onClick={() => setDetailId(item.id)}><ViewIcon fontSize="small" /></IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => setEditItem(item)}><EditIcon fontSize="small" /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteId(item.id)}><DeleteIcon fontSize="small" /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <EvidenceModal open={createOpen} onClose={() => setCreateOpen(false)} />
      {editItem && <EvidenceModal open={true} onClose={() => setEditItem(null)} editItem={editItem} />}

      <Dialog open={!!detailId} onClose={() => setDetailId(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Evidence Detail</DialogTitle>
        <DialogContent>
          {detailItem && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <Typography variant="h3">{detailItem.title}</Typography>
              {detailItem.description && <Typography variant="body1">{detailItem.description}</Typography>}
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <Box><Typography variant="body2" color="text.secondary">Entity Type</Typography><Chip label={detailItem.entityType} size="small" /></Box>
                <Box><Typography variant="body2" color="text.secondary">Status</Typography><Chip label={detailItem.status} size="small" /></Box>
                <Box><Typography variant="body2" color="text.secondary">Uploaded By</Typography><Typography variant="body1">{detailItem.uploadedBy?.firstName} {detailItem.uploadedBy?.lastName}</Typography></Box>
                <Box><Typography variant="body2" color="text.secondary">Date</Typography><Typography variant="body1">{new Date(detailItem.createdAt).toLocaleDateString()}</Typography></Box>
              </Box>
              {detailItem.notes && <Box><Typography variant="body2" color="text.secondary">Notes</Typography><Typography variant="body1">{detailItem.notes}</Typography></Box>}
              {detailItem.filePath && <Button variant="outlined" component="a" href={detailItem.filePath} target="_blank">View File</Button>}
            </Box>
          )}
        </DialogContent>
        <DialogActions><Button onClick={() => setDetailId(null)}>Close</Button></DialogActions>
      </Dialog>

      <ConfirmDialog open={!!deleteId} title="Delete Evidence" message="Are you sure?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} loading={deleteMutation.isPending} />
    </Box>
  );
}

function EvidenceModal({ open, onClose, editItem }: { open: boolean; onClose: () => void; editItem?: EvidenceItem | null }) {
  const [title, setTitle] = useState(editItem?.title || "");
  const [description, setDescription] = useState(editItem?.description || "");
  const [entityType, setEntityType] = useState(editItem?.entityType || "risk");
  const [entityId, setEntityId] = useState(editItem?.entityId || "");
  const [status, setStatus] = useState(editItem?.status || "draft");
  const [notes, setNotes] = useState(editItem?.notes || "");

  const createEvidence = useCreateEvidence();
  const updateEvidence = useUpdateEvidence();

  const handleSubmit = async () => {
    if (!title || !entityType || !entityId) return;
    if (editItem) {
      await updateEvidence.mutateAsync({ id: editItem.id, title, description, status, notes });
    } else {
      await createEvidence.mutateAsync({ title, description: description || undefined, entityType, entityId, status, notes: notes || undefined });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editItem ? "Edit Evidence" : "Add Evidence"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={2} fullWidth />
          <TextField select label="Entity Type" value={entityType} onChange={(e) => setEntityType(e.target.value)} required fullWidth>
            <MenuItem value="risk">Risk</MenuItem>
            <MenuItem value="control">Control</MenuItem>
            <MenuItem value="project">Project</MenuItem>
            <MenuItem value="audit">Audit</MenuItem>
          </TextField>
          <TextField label="Entity ID" value={entityId} onChange={(e) => setEntityId(e.target.value)} required fullWidth helperText="ID of the risk, control, project, or audit" />
          <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} fullWidth>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="submitted">Submitted</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>
          <TextField label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} multiline rows={2} fullWidth />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!title || !entityType || !entityId}>
          {editItem ? "Save Changes" : "Add Evidence"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
