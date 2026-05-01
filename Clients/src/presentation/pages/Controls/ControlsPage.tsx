import { useState } from "react";
import {
  Box, Typography, Button, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Chip, LinearProgress, Alert,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useControls, useDeleteControl } from "../../../infrastructure/api/controls.api";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import CreateControlModal from "./CreateControlModal";

const TYPES = [
  { value: "", label: "All Types" },
  { value: "preventive", label: "Preventive" },
  { value: "detective", label: "Detective" },
  { value: "corrective", label: "Corrective" },
];

const EFFECTIVENESS_OPTIONS = [
  { value: "", label: "All Effectiveness" },
  { value: "effective", label: "Effective" },
  { value: "partially_effective", label: "Partially Effective" },
  { value: "ineffective", label: "Ineffective" },
];

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  preventive: { bg: "#DBEAFE", color: "#1E40AF" },
  detective: { bg: "#FEF3C7", color: "#92400E" },
  corrective: { bg: "#EDE9FE", color: "#5B21B6" },
};

const EFFECTIVENESS_COLORS: Record<string, { bg: string; color: string }> = {
  effective: { bg: "#D1FAE5", color: "#065F46" },
  partially_effective: { bg: "#FEF3C7", color: "#92400E" },
  ineffective: { bg: "#FEE2E2", color: "#9F1239" },
};

const EFFECTIVENESS_LABELS: Record<string, string> = {
  effective: "Effective",
  partially_effective: "Partially Effective",
  ineffective: "Ineffective",
};

const TYPE_LABELS: Record<string, string> = {
  preventive: "Preventive",
  detective: "Detective",
  corrective: "Corrective",
};

export default function ControlsPage() {
  const [type, setType] = useState("");
  const [effectiveness, setEffectiveness] = useState("");
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: controls, isLoading, error } = useControls({
    type: type || undefined,
    effectiveness: effectiveness || undefined,
    search: search || undefined,
  });
  const deleteMutation = useDeleteControl();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Controls</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          Add Control
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load controls</Alert>}

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField select label="Type" value={type} onChange={(e) => setType(e.target.value)} sx={{ minWidth: 160 }}>
          {TYPES.map((t) => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
        </TextField>
        <TextField select label="Effectiveness" value={effectiveness} onChange={(e) => setEffectiveness(e.target.value)} sx={{ minWidth: 200 }}>
          {EFFECTIVENESS_OPTIONS.map((e) => <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>)}
        </TextField>
        <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search controls..." sx={{ flex: 1 }} />
      </Box>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!controls || controls.length === 0) ? (
        <EmptyState
          title="No controls yet"
          description="Add controls to track risk mitigation measures"
          actionLabel="Create First Control"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Effectiveness</TableCell>
                <TableCell>Linked Risk</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {controls?.map((control: any) => (
                <TableRow key={control.id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight={500}>{control.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={TYPE_LABELS[control.type] || control.type}
                      size="small"
                      sx={{
                        backgroundColor: TYPE_COLORS[control.type]?.bg || "#F1F5F9",
                        color: TYPE_COLORS[control.type]?.color || "#475569",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={EFFECTIVENESS_LABELS[control.effectiveness] || control.effectiveness}
                      size="small"
                      sx={{
                        backgroundColor: EFFECTIVENESS_COLORS[control.effectiveness]?.bg || "#F1F5F9",
                        color: EFFECTIVENESS_COLORS[control.effectiveness]?.color || "#475569",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {control.risk?.title || "--"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {control.owner ? `${control.owner.firstName} ${control.owner.lastName}` : "--"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(control.updatedAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteId(control.id)}>
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

      <CreateControlModal open={createOpen} onClose={() => setCreateOpen(false)} />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Control"
        message="Are you sure you want to delete this control? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteMutation.isPending}
      />
    </Box>
  );
}
