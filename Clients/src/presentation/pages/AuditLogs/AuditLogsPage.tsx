import { useState } from "react";
import {
  Box, Typography, Button, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, LinearProgress, Alert, IconButton, Collapse,
} from "@mui/material";
import {
  Download as DownloadIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
} from "@mui/icons-material";
import { useAuditLogs } from "../../../infrastructure/api/auditLogs.api";
import axiosInstance from "../../../infrastructure/api/axiosInstance";
import { downloadFile } from "../../../application/utils/download";

const ENTITY_TYPES = [
  { value: "", label: "All Entities" },
  { value: "risk", label: "Risk" },
  { value: "risk_treatment", label: "Treatment" },
  { value: "project", label: "Project" },
  { value: "control", label: "Control" },
];

const ACTION_COLORS: Record<string, "success" | "info" | "error" | "default"> = {
  create: "success",
  update: "info",
  delete: "error",
};

export default function AuditLogsPage() {
  const [entityType, setEntityType] = useState("");
  const [page, setPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const { data, isLoading, error } = useAuditLogs({
    entityType: entityType || undefined,
    page,
    limit: 25,
  });

  const handleExport = async () => {
    const response = await axiosInstance.get("/export/audit-logs", { responseType: "blob" });
    const date = new Date().toISOString().split("T")[0];
    downloadFile(new Blob([response.data]), `audit-logs-${date}.csv`);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Audit Logs</Typography>
        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport}>
          Export CSV
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load audit logs</Alert>}

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField select label="Entity Type" value={entityType} onChange={(e) => { setEntityType(e.target.value); setPage(1); }} sx={{ minWidth: 160 }}>
          {ENTITY_TYPES.map((t) => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
        </TextField>
      </Box>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={40} />
              <TableCell>Date/Time</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Entity Type</TableCell>
              <TableCell>Entity ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.logs?.map((log) => (
              <>
                <TableRow key={log.id} hover>
                  <TableCell>
                    {Object.keys(log.changes || {}).length > 0 && (
                      <IconButton size="small" onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}>
                        {expandedRow === log.id ? <CollapseIcon fontSize="small" /> : <ExpandIcon fontSize="small" />}
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{new Date(log.createdAt).toLocaleString()}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {log.user ? `${log.user.firstName} ${log.user.lastName}` : "--"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={log.action} size="small" color={ACTION_COLORS[log.action] || "default"} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{log.entityType}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.7rem" }}>
                      {log.entityId.slice(0, 8)}...
                    </Typography>
                  </TableCell>
                </TableRow>
                {expandedRow === log.id && (
                  <TableRow key={`${log.id}-expanded`}>
                    <TableCell colSpan={6} sx={{ py: 0 }}>
                      <Collapse in={true}>
                        <Box sx={{ p: 2, backgroundColor: "background.default", borderRadius: 1, my: 1 }}>
                          <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Changes</Typography>
                          <pre style={{ fontSize: "0.75rem", margin: 0, whiteSpace: "pre-wrap" }}>
                            {JSON.stringify(log.changes, null, 2)}
                          </pre>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
            {(!data?.logs || data.logs.length === 0) && !isLoading && (
              <TableRow><TableCell colSpan={6} align="center">No audit logs found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {data?.pagination && data.pagination.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
          <Button disabled={page <= 1} onClick={() => setPage(page - 1)} size="small">Previous</Button>
          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            Page {data.pagination.page} of {data.pagination.totalPages}
          </Typography>
          <Button disabled={page >= data.pagination.totalPages} onClick={() => setPage(page + 1)} size="small">Next</Button>
        </Box>
      )}
    </Box>
  );
}
