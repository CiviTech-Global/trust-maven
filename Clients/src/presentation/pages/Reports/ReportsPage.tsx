import { useState } from "react";
import {
  Box, Typography, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Chip, LinearProgress, Alert,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useReportTemplates, useDeleteReportTemplate } from "../../../infrastructure/api/reports.api";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const ENTITY_LABELS: Record<string, string> = {
  risk: "Risks",
  control: "Controls",
  audit: "Audits",
  vendor: "Vendors",
  kri: "KRIs",
};

export default function ReportsPage() {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: templates, isLoading, error } = useReportTemplates();
  const deleteMutation = useDeleteReportTemplate();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Reports</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/reports/builder")}>
          New Report
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load report templates</Alert>}
      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!templates || templates.length === 0) ? (
        <EmptyState
          title="No report templates"
          description="Create custom reports to analyze your risk and compliance data"
          actionLabel="Create First Report"
          onAction={() => navigate("/reports/builder")}
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Entity Type</TableCell>
                <TableCell>Columns</TableCell>
                <TableCell>Filters</TableCell>
                <TableCell>Shared</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {templates?.map((template) => (
                <TableRow key={template.id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight={500}>{template.name}</Typography>
                    {template.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {template.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip label={ENTITY_LABELS[template.entityType] || template.entityType} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{template.columns?.length || 0}</TableCell>
                  <TableCell>{template.filters?.length || 0}</TableCell>
                  <TableCell>
                    <Chip label={template.isShared ? "Shared" : "Private"} size="small" color={template.isShared ? "primary" : "default"} variant="outlined" />
                  </TableCell>
                  <TableCell>
                    {template.createdBy ? `${template.createdBy.firstName} ${template.createdBy.lastName}` : "--"}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => navigate(`/reports/builder/${template.id}`)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteId(template.id)}>
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

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Report Template"
        message="Are you sure you want to delete this report template?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteMutation.isPending}
      />
    </Box>
  );
}
