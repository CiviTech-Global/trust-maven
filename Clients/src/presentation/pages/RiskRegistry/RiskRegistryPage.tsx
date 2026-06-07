import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, LinearProgress, Alert, Link, Checkbox, Paper,
} from "@mui/material";
import {
  Add as AddIcon,
  Assessment as AssessIcon,
  MedicalServices as TreatIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import { useRisks, useDeleteRisk, useBulkUpdateRisks, useBulkDeleteRisks } from "../../../infrastructure/api/risks.api";
import RiskChip from "../../components/common/RiskChip";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import CreateRiskModal from "./CreateRiskModal";
import AssessRiskModal from "./AssessRiskModal";
import TreatRiskModal from "./TreatRiskModal";
import EditRiskModal from "./EditRiskModal";
import axiosInstance from "../../../infrastructure/api/axiosInstance";
import { downloadFile } from "../../../application/utils/download";

const DOMAINS = [
  { value: "", label: "All Domains" },
  { value: "financial", label: "Financial" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "strategic", label: "Strategic" },
  { value: "operational", label: "Operational" },
  { value: "regulatory", label: "Regulatory" },
];

const STATUSES = [
  { value: "", label: "All Statuses" },
  { value: "identified", label: "Identified" },
  { value: "assessed", label: "Assessed" },
  { value: "treated", label: "Treated" },
  { value: "accepted", label: "Accepted" },
  { value: "closed", label: "Closed" },
];

export default function RiskRegistryPage() {
  const navigate = useNavigate();
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [assessRisk, setAssessRisk] = useState<{ id: string; title: string } | null>(null);
  const [treatRisk, setTreatRisk] = useState<{ id: string; title: string } | null>(null);
  const [deleteRisk, setDeleteRisk] = useState<string | null>(null);
  const [editRisk, setEditRisk] = useState<any | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState("");
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  const { data: risks, isLoading, error } = useRisks({
    domain: domain || undefined,
    status: status || undefined,
    search: search || undefined,
  });
  const deleteMutation = useDeleteRisk();
  const bulkUpdate = useBulkUpdateRisks();
  const bulkDelete = useBulkDeleteRisks();

  const handleDelete = async () => {
    if (!deleteRisk) return;
    await deleteMutation.mutateAsync(deleteRisk);
    setDeleteRisk(null);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? (risks || []).map((r: any) => r.id) : []);
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleBulkStatus = async () => {
    if (!bulkStatus || !selectedIds.length) return;
    await bulkUpdate.mutateAsync({ ids: selectedIds, data: { status: bulkStatus } });
    setSelectedIds([]);
    setBulkStatus("");
  };

  const handleBulkDelete = async () => {
    await bulkDelete.mutateAsync(selectedIds);
    setSelectedIds([]);
    setBulkDeleteConfirm(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Risk Registry</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={async () => {
              const response = await axiosInstance.get("/export/risks", { responseType: "blob" });
              const date = new Date().toISOString().split("T")[0];
              downloadFile(new Blob([response.data]), `risks-${date}.csv`);
            }}
          >
            Export CSV
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
            Add Risk
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load risks</Alert>}

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField select label="Domain" value={domain} onChange={(e) => setDomain(e.target.value)} sx={{ minWidth: 160 }}>
          {DOMAINS.map((d) => <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>)}
        </TextField>
        <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ minWidth: 160 }}>
          {STATUSES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
        </TextField>
        <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search risks..." sx={{ flex: 1 }} />
      </Box>

      {selectedIds.length > 0 && (
        <Paper elevation={2} sx={{ p: 1.5, mb: 2, display: "flex", alignItems: "center", gap: 2, bgcolor: "primary.main", color: "white" }}>
          <CheckIcon fontSize="small" />
          <Typography variant="body2" fontWeight={600}>{selectedIds.length} selected</Typography>
          <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
            <TextField
              select size="small" value={bulkStatus}
              onChange={(e) => setBulkStatus(e.target.value)}
              sx={{ minWidth: 140, "& .MuiInputBase-root": { color: "white", borderColor: "white" }, "& .MuiSvgIcon-root": { color: "white" } }}
            >
              <MenuItem value="">Change status...</MenuItem>
              <MenuItem value="identified">Identified</MenuItem>
              <MenuItem value="assessed">Assessed</MenuItem>
              <MenuItem value="treated">Treated</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </TextField>
            <Button size="small" variant="contained" color="secondary" disabled={!bulkStatus || bulkUpdate.isPending} onClick={handleBulkStatus}>
              Apply
            </Button>
            <Button size="small" variant="outlined" color="inherit" onClick={() => setBulkDeleteConfirm(true)}>
              Delete All
            </Button>
            <Button size="small" variant="outlined" color="inherit" onClick={() => setSelectedIds([])}>
              Clear
            </Button>
          </Box>
        </Paper>
      )}

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!risks || risks.length === 0) ? (
        <EmptyState
          title="No risks registered yet"
          description="Start by adding your first risk to the registry"
          actionLabel="Create First Risk"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedIds.length > 0 && selectedIds.length < (risks || []).length}
                    checked={(risks || []).length > 0 && selectedIds.length === (risks || []).length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Domain</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {risks?.map((risk: any) => {
                const latestAssessment = risk.assessments?.[0];
                const score = latestAssessment ? latestAssessment.likelihood * latestAssessment.impact : null;
                return (
                  <TableRow key={risk.id} hover selected={selectedIds.includes(risk.id)}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedIds.includes(risk.id)} onChange={() => handleSelectOne(risk.id)} />
                    </TableCell>
                    <TableCell>
                      <Link
                        component="button"
                        variant="body1"
                        fontWeight={500}
                        underline="hover"
                        onClick={() => navigate(`/risks/${risk.id}`)}
                        sx={{ textAlign: "left" }}
                      >
                        {risk.title}
                      </Link>
                    </TableCell>
                    <TableCell><RiskChip value={risk.domain} type="domain" /></TableCell>
                    <TableCell><RiskChip value={risk.status} type="status" /></TableCell>
                    <TableCell>
                      {score !== null ? (
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{ color: score >= 15 ? "#E11D48" : score >= 10 ? "#D97706" : score >= 5 ? "#0284C7" : "#059669" }}
                        >
                          {score}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">--</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {risk.owner ? `${risk.owner.firstName} ${risk.owner.lastName}` : "--"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(risk.updatedAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => setEditRisk(risk)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Assess">
                        <IconButton size="small" onClick={() => setAssessRisk({ id: risk.id, title: risk.title })}>
                          <AssessIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Treat">
                        <IconButton size="small" onClick={() => setTreatRisk({ id: risk.id, title: risk.title })}>
                          <TreatIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => setDeleteRisk(risk.id)}>
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

      <CreateRiskModal open={createOpen} onClose={() => setCreateOpen(false)} />

      {assessRisk && (
        <AssessRiskModal
          open={true}
          onClose={() => setAssessRisk(null)}
          riskId={assessRisk.id}
          riskTitle={assessRisk.title}
        />
      )}

      {treatRisk && (
        <TreatRiskModal
          open={true}
          onClose={() => setTreatRisk(null)}
          riskId={treatRisk.id}
          riskTitle={treatRisk.title}
        />
      )}

      {editRisk && (
        <EditRiskModal open={true} onClose={() => setEditRisk(null)} risk={editRisk} />
      )}

      <ConfirmDialog
        open={!!deleteRisk}
        title="Delete Risk"
        message="Are you sure you want to delete this risk? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteRisk(null)}
        loading={deleteMutation.isPending}
      />

      <ConfirmDialog
        open={bulkDeleteConfirm}
        title="Delete Selected Risks"
        message={`Are you sure you want to delete ${selectedIds.length} risks? This action cannot be undone.`}
        onConfirm={handleBulkDelete}
        onCancel={() => setBulkDeleteConfirm(false)}
        loading={bulkDelete.isPending}
      />
    </Box>
  );
}
