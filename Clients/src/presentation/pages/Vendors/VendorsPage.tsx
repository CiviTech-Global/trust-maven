import { useState } from "react";
import {
  Box, Typography, Button, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Chip, LinearProgress, Alert,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Assessment as AssessIcon } from "@mui/icons-material";
import { useVendors, useDeleteVendor, type VendorItem } from "../../../infrastructure/api/vendors.api";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import CreateVendorModal from "./CreateVendorModal";
import VendorAssessmentModal from "./VendorAssessmentModal";

const RISK_LEVELS = [
  { value: "", label: "All Risk Levels" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const RISK_LEVEL_COLORS: Record<string, { bg: string; color: string }> = {
  critical: { bg: "#FEE2E2", color: "#9F1239" },
  high: { bg: "#FED7AA", color: "#9A3412" },
  medium: { bg: "#FEF3C7", color: "#92400E" },
  low: { bg: "#D1FAE5", color: "#065F46" },
};

export default function VendorsPage() {
  const [riskLevel, setRiskLevel] = useState("");
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editVendor, setEditVendor] = useState<VendorItem | null>(null);
  const [assessVendor, setAssessVendor] = useState<VendorItem | null>(null);

  const { data: vendors, isLoading, error } = useVendors({
    riskLevel: riskLevel || undefined,
    search: search || undefined,
  });
  const deleteMutation = useDeleteVendor();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Vendors</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          Add Vendor
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load vendors</Alert>}

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField select label="Risk Level" value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)} sx={{ minWidth: 160 }}>
          {RISK_LEVELS.map((r) => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
        </TextField>
        <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vendors..." sx={{ flex: 1 }} />
      </Box>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!vendors || vendors.length === 0) ? (
        <EmptyState
          title="No vendors registered"
          description="Add third-party vendors to track and assess their risk"
          actionLabel="Add First Vendor"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Risk Level</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Added</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors?.map((vendor) => (
                <TableRow key={vendor.id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight={500}>{vendor.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={vendor.riskLevel}
                      size="small"
                      sx={{
                        backgroundColor: RISK_LEVEL_COLORS[vendor.riskLevel]?.bg || "#F1F5F9",
                        color: RISK_LEVEL_COLORS[vendor.riskLevel]?.color || "#475569",
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={vendor.status} size="small" color={vendor.status === "active" ? "success" : "default"} variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {vendor.description || "--"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(vendor.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Assess">
                      <IconButton size="small" color="primary" onClick={() => setAssessVendor(vendor)}>
                        <AssessIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => setEditVendor(vendor)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteId(vendor.id)}>
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

      <CreateVendorModal open={createOpen} onClose={() => setCreateOpen(false)} />
      {editVendor && <CreateVendorModal open={true} onClose={() => setEditVendor(null)} editVendor={editVendor} />}
      {assessVendor && <VendorAssessmentModal open={true} onClose={() => setAssessVendor(null)} vendor={assessVendor} />}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Vendor"
        message="Are you sure? All assessments for this vendor will also be deleted."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteMutation.isPending}
      />
    </Box>
  );
}
