import { useState } from "react";
import {
  Box, Typography, Button, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Chip, LinearProgress, Alert, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, TrendingUp as TrendIcon } from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { useKRIs, useKRISummary, useDeleteKRI, useKRIHistory, type KRIItem, type KRIHistoryPoint } from "../../../infrastructure/api/kris.api";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import CreateKRIModal from "./CreateKRIModal";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "financial", label: "Financial" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "operational", label: "Operational" },
  { value: "regulatory", label: "Regulatory" },
  { value: "strategic", label: "Strategic" },
];

const STATUS_FILTER = [
  { value: "", label: "All Statuses" },
  { value: "green", label: "Green (OK)" },
  { value: "amber", label: "Amber (Warning)" },
  { value: "red", label: "Red (Breach)" },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  green: { bg: "#D1FAE5", color: "#065F46" },
  amber: { bg: "#FEF3C7", color: "#92400E" },
  red: { bg: "#FEE2E2", color: "#9F1239" },
};

export default function KRIsPage() {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editKRI, setEditKRI] = useState<KRIItem | null>(null);
  const [trendKRI, setTrendKRI] = useState<KRIItem | null>(null);

  const { data: kris, isLoading, error } = useKRIs({
    category: category || undefined,
    status: status || undefined,
    search: search || undefined,
  });
  const { data: summary } = useKRISummary();
  const deleteMutation = useDeleteKRI();
  const { data: historyData } = useKRIHistory(trendKRI?.id || null);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Key Risk Indicators</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          Add KRI
        </Button>
      </Box>

      {summary && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, mb: 3 }}>
          <Card><CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h2">{summary.total}</Typography>
            <Typography variant="body2" color="text.secondary">Total KRIs</Typography>
          </CardContent></Card>
          <Card sx={{ borderLeft: "4px solid #059669" }}><CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ color: "#059669" }}>{summary.green}</Typography>
            <Typography variant="body2" color="text.secondary">Within Tolerance</Typography>
          </CardContent></Card>
          <Card sx={{ borderLeft: "4px solid #D97706" }}><CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ color: "#D97706" }}>{summary.amber}</Typography>
            <Typography variant="body2" color="text.secondary">Warning</Typography>
          </CardContent></Card>
          <Card sx={{ borderLeft: "4px solid #E11D48" }}><CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ color: "#E11D48" }}>{summary.red}</Typography>
            <Typography variant="body2" color="text.secondary">Breached</Typography>
          </CardContent></Card>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load KRIs</Alert>}

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} sx={{ minWidth: 160 }}>
          {CATEGORIES.map((c) => <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>)}
        </TextField>
        <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ minWidth: 160 }}>
          {STATUS_FILTER.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
        </TextField>
        <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search KRIs..." sx={{ flex: 1 }} />
      </Box>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!kris || kris.length === 0) ? (
        <EmptyState
          title="No KRIs defined"
          description="Create Key Risk Indicators to monitor risk thresholds proactively"
          actionLabel="Create First KRI"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Current Value</TableCell>
                <TableCell>Thresholds (G/A/R)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Linked Risk</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kris?.map((kri) => (
                <TableRow key={kri.id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight={500}>{kri.name}</Typography>
                    {kri.unit && <Typography variant="body2" color="text.secondary">Unit: {kri.unit}</Typography>}
                  </TableCell>
                  <TableCell><Chip label={kri.category} size="small" /></TableCell>
                  <TableCell>
                    <Typography fontWeight={600} sx={{ color: STATUS_COLORS[kri.status]?.color || "#475569" }}>
                      {kri.currentValue}{kri.unit ? ` ${kri.unit}` : ""}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {kri.thresholdGreen} / {kri.thresholdAmber} / {kri.thresholdRed}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={kri.status.toUpperCase()}
                      size="small"
                      sx={{
                        backgroundColor: STATUS_COLORS[kri.status]?.bg || "#F1F5F9",
                        color: STATUS_COLORS[kri.status]?.color || "#475569",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>{kri.risk?.title || "--"}</TableCell>
                  <TableCell><Chip label={kri.frequency} size="small" variant="outlined" /></TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {kri.lastUpdatedValue ? new Date(kri.lastUpdatedValue).toLocaleDateString() : "--"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Trends">
                      <IconButton size="small" onClick={() => setTrendKRI(kri)}>
                        <TrendIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => setEditKRI(kri)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteId(kri.id)}>
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

      <CreateKRIModal open={createOpen} onClose={() => setCreateOpen(false)} />

      {editKRI && (
        <CreateKRIModal open={true} onClose={() => setEditKRI(null)} editKRI={editKRI} />
      )}

      <Dialog open={!!trendKRI} onClose={() => setTrendKRI(null)} maxWidth="md" fullWidth>
        <DialogTitle>KRI Trend: {trendKRI?.name}</DialogTitle>
        <DialogContent>
          {!historyData || historyData.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
              No historical data yet. Values will be tracked automatically as you update the KRI.
            </Typography>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Card><CardContent sx={{ textAlign: "center", py: 2 }}>
                  <Typography variant="h3">{historyData[historyData.length - 1]?.value}{trendKRI?.unit ? ` ${trendKRI.unit}` : ""}</Typography>
                  <Typography variant="body2" color="text.secondary">Current Value</Typography>
                </CardContent></Card>
                <Card><CardContent sx={{ textAlign: "center", py: 2 }}>
                  <Typography variant="h3">{Math.min(...historyData.map((h: KRIHistoryPoint) => h.value))}</Typography>
                  <Typography variant="body2" color="text.secondary">Min</Typography>
                </CardContent></Card>
                <Card><CardContent sx={{ textAlign: "center", py: 2 }}>
                  <Typography variant="h3">{Math.max(...historyData.map((h: KRIHistoryPoint) => h.value))}</Typography>
                  <Typography variant="body2" color="text.secondary">Max</Typography>
                </CardContent></Card>
                <Card><CardContent sx={{ textAlign: "center", py: 2 }}>
                  <Typography variant="h3">{historyData.length}</Typography>
                  <Typography variant="body2" color="text.secondary">Data Points</Typography>
                </CardContent></Card>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historyData.map((h: KRIHistoryPoint) => ({
                  date: new Date(h.recordedAt).toLocaleDateString(),
                  value: h.value,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="value" stroke="#4338CA" strokeWidth={2} dot={{ fill: "#4338CA", r: 4 }} name="Value" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTrendKRI(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete KRI"
        message="Are you sure you want to delete this Key Risk Indicator?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteMutation.isPending}
      />
    </Box>
  );
}
