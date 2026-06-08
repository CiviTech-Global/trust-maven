import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Chip, Card, CardContent, IconButton, Tooltip, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Tabs, Tab, LinearProgress, Alert,
} from "@mui/material";
import {
  ArrowBack, Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon,
  PersonRemove as PersonRemoveIcon, OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import { useAuditById, useDeleteFinding, useUpdateAudit } from "../../../infrastructure/api/auditMgmt.api";
import { useEvidence } from "../../../infrastructure/api/evidence.api";
import { useUsers } from "../../../infrastructure/api/users.api";
import CreateFindingModal from "./CreateFindingModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const AUDIT_STATUS_COLORS: Record<string, "default" | "primary" | "success" | "warning" | "error"> = {
  planned: "default",
  in_progress: "primary",
  completed: "success",
  cancelled: "error",
};

const FINDING_STATUS_COLORS: Record<string, "default" | "primary" | "success" | "warning" | "error"> = {
  open: "error",
  in_remediation: "warning",
  remediated: "primary",
  accepted: "default",
  closed: "success",
};

const SEVERITY_COLORS: Record<string, { bg: string; color: string }> = {
  critical: { bg: "#FEE2E2", color: "#9F1239" },
  high: { bg: "#FED7AA", color: "#9A3412" },
  medium: { bg: "#FEF3C7", color: "#92400E" },
  low: { bg: "#D1FAE5", color: "#065F46" },
  informational: { bg: "#E0E7FF", color: "#3730A3" },
};

const EVIDENCE_STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  draft: { bg: "#F1F5F9", color: "#475569" },
  submitted: { bg: "#DBEAFE", color: "#1E40AF" },
  approved: { bg: "#D1FAE5", color: "#065F46" },
  rejected: { bg: "#FEE2E2", color: "#9F1239" },
};

export default function AuditDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [createFindingOpen, setCreateFindingOpen] = useState(false);
  const [editFinding, setEditFinding] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ auditId: string; findingId: string } | null>(null);

  const { data: audit, isLoading, error } = useAuditById(id!);
  const { data: evidence, isLoading: evidenceLoading } = useEvidence({ entityType: "audit", entityId: id });
  const { data: users } = useUsers();
  const deleteFinding = useDeleteFinding();
  const updateAudit = useUpdateAudit();

  const handleDeleteFinding = async () => {
    if (!deleteTarget) return;
    await deleteFinding.mutateAsync(deleteTarget);
    setDeleteTarget(null);
  };

  const auditorIds: string[] = (audit as any)?.auditorIds || [];
  const auditors: { id: string; firstName: string; lastName: string; email: string }[] = (audit as any)?.auditors || [];

  const handleAssignAuditor = async (userId: string) => {
    if (!audit) return;
    if (!auditorIds.includes(userId)) {
      await updateAudit.mutateAsync({ id: audit.id, auditorIds: [...auditorIds, userId] as any });
    }
  };

  const handleUnassignAuditor = async (userId: string) => {
    if (!audit) return;
    await updateAudit.mutateAsync({ id: audit.id, auditorIds: auditorIds.filter((x) => x !== userId) as any });
  };

  const availableUsers = users?.filter((u) => !auditorIds.includes(u.id)) || [];

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
            <Chip
              label={audit.status.replace("_", " ")}
              size="small"
              color={AUDIT_STATUS_COLORS[audit.status] || "default"}
              sx={{ textTransform: "capitalize" }}
            />
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
          <Typography variant="body2" color="text.secondary">Planned Start</Typography>
          <Typography fontWeight={500}>{new Date(audit.startDate).toLocaleDateString()}</Typography>
        </CardContent></Card>
        <Card><CardContent>
          <Typography variant="body2" color="text.secondary">End Date</Typography>
          <Typography fontWeight={500}>{audit.endDate ? new Date(audit.endDate).toLocaleDateString() : "--"}</Typography>
        </CardContent></Card>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h3" sx={{ mb: 2 }}>Auditors</Typography>
          {auditors.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {auditors.map((a) => (
                <Chip
                  key={a.id}
                  label={`${a.firstName} ${a.lastName}`}
                  onDelete={() => handleUnassignAuditor(a.id)}
                  deleteIcon={<PersonRemoveIcon />}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>No auditors assigned</Typography>
          )}
          <TextField
            select
            label="Add Auditor"
            size="small"
            sx={{ minWidth: 240 }}
            value=""
            onChange={(e) => {
              const val = e.target.value;
              if (val) handleAssignAuditor(val);
            }}
          >
            <MenuItem value="">-- Select user --</MenuItem>
            {availableUsers.map((u) => (
              <MenuItem key={u.id} value={u.id}>{u.firstName} {u.lastName} ({u.email})</MenuItem>
            ))}
          </TextField>
        </CardContent>
      </Card>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}>
        <Tab label={`Findings (${audit.findings?.length || 0})`} />
        <Tab label={`Evidence (${evidence?.length || 0})`} />
      </Tabs>

      {tab === 0 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
                    <TableCell>Assigned To</TableCell>
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
                        <Chip
                          label={finding.status.replace("_", " ")}
                          size="small"
                          color={FINDING_STATUS_COLORS[finding.status] || "default"}
                          sx={{ textTransform: "capitalize" }}
                        />
                      </TableCell>
                      <TableCell>
                        {finding.responsible ? `${finding.responsible.firstName} ${finding.responsible.lastName}` : "--"}
                      </TableCell>
                      <TableCell>
                        {finding.dueDate ? new Date(finding.dueDate).toLocaleDateString() : "--"}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => setEditFinding(finding)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
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
        </Box>
      )}

      {tab === 1 && (
        <Box>
          {evidenceLoading ? (
            <LinearProgress sx={{ mb: 2 }} />
          ) : !evidence || evidence.length === 0 ? (
            <Alert severity="info">No evidence linked to this audit</Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Uploaded By</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {evidence.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Typography variant="body1" fontWeight={500}>{item.title}</Typography>
                        {item.description && <Typography variant="body2" color="text.secondary">{item.description}</Typography>}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{ backgroundColor: EVIDENCE_STATUS_COLORS[item.status]?.bg, color: EVIDENCE_STATUS_COLORS[item.status]?.color, fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>{item.uploadedBy ? `${item.uploadedBy.firstName} ${item.uploadedBy.lastName}` : "--"}</TableCell>
                      <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="View in Evidence">
                          <IconButton size="small" onClick={() => navigate("/evidence")}>
                            <OpenInNewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

      {createFindingOpen && (
        <CreateFindingModal open={true} onClose={() => setCreateFindingOpen(false)} auditId={id!} />
      )}
      {editFinding && (
        <CreateFindingModal open={true} onClose={() => setEditFinding(null)} auditId={id!} editItem={editFinding} />
      )}

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
