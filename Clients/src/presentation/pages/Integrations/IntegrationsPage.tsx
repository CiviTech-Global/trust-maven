import { useState } from "react";
import {
  Box, Typography, Button, Card, CardContent, CardActions, Chip, IconButton, Tooltip, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, MenuItem, LinearProgress, Alert, Switch,
} from "@mui/material";
import {
  Add as AddIcon, Cloud as CloudIcon, Code as CodeIcon, Security as SecurityIcon,
  Public as PublicIcon, Edit as EditIcon, Delete as DeleteIcon,
  Sync as SyncIcon, Science as ScienceIcon, History as HistoryIcon,
} from "@mui/icons-material";
import {
  useIntegrations, useIntegrationDashboardSummary, useAvailableConnectors,
  useCreateIntegration, useUpdateIntegration, useDeleteIntegration,
  useTestIntegrationConnection, useSyncIntegration, useIntegrationHistory,
  type Integration, type AvailableConnector,
} from "../../../infrastructure/api/integrations.api";
import StatCard from "../../components/common/StatCard";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const CONNECTOR_ICONS: Record<string, React.ReactNode> = {
  aws: <CloudIcon />,
  github: <CodeIcon />,
  okta: <SecurityIcon />,
};

function getConnectorIcon(type: string) {
  return CONNECTOR_ICONS[type] || <PublicIcon />;
}

const CONNECTOR_CONFIG_FIELDS: Record<string, { key: string; label: string; type: string }[]> = {
  aws: [
    { key: "accessKeyId", label: "Access Key ID", type: "text" },
    { key: "secretAccessKey", label: "Secret Access Key", type: "password" },
    { key: "region", label: "Region", type: "text" },
  ],
  github: [
    { key: "token", label: "Personal Access Token", type: "password" },
    { key: "organization", label: "Organization", type: "text" },
  ],
  okta: [
    { key: "domain", label: "Domain", type: "text" },
    { key: "apiToken", label: "API Token", type: "password" },
  ],
  generic: [
    { key: "endpoint", label: "Endpoint URL", type: "text" },
    { key: "apiKey", label: "API Key", type: "password" },
  ],
};

function ConfigFormFields({ connectorType, config, onChange }: {
  connectorType: string;
  config: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  const fields = CONNECTOR_CONFIG_FIELDS[connectorType] || CONNECTOR_CONFIG_FIELDS.generic;
  if (!fields) return null;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {fields.map((f) => (
        <TextField
          key={f.key}
          label={f.label}
          type={f.type}
          value={config[f.key] || ""}
          onChange={(e) => onChange(f.key, e.target.value)}
          fullWidth
          size="small"
        />
      ))}
    </Box>
  );
}

export default function IntegrationsPage() {
  const [filterConnector, setFilterConnector] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editIntegration, setEditIntegration] = useState<Integration | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; success: boolean; message: string } | null>(null);

  const { data: integrations, isLoading, error } = useIntegrations({
    connectorType: filterConnector || undefined,
    status: filterStatus || undefined,
  });
  const { data: summary } = useIntegrationDashboardSummary();
  const { data: availableConnectors } = useAvailableConnectors();
  const createIntegration = useCreateIntegration();
  const updateIntegration = useUpdateIntegration();
  const deleteIntegration = useDeleteIntegration();
  const testConnection = useTestIntegrationConnection();
  const syncIntegration = useSyncIntegration();
  const { data: history } = useIntegrationHistory(historyId);
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleTest = async (id: string) => {
    try {
      const result = await testConnection.mutateAsync(id);
      setTestResult({ id, success: true, message: result.message || "Connection successful" });
    } catch (err: any) {
      setTestResult({ id, success: false, message: err?.response?.data?.message || "Connection failed" });
    }
  };

  const handleSync = async (id: string) => {
    try {
      await syncIntegration.mutateAsync(id);
    } catch { /* ignore */ }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteIntegration.mutateAsync(deleteId);
    setDeleteId(null);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Integrations</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          Add Integration
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load integrations</Alert>}

      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <Box sx={{ flex: "1 1 220px", minWidth: 200 }}>
          <StatCard label="Total" value={summary?.total ?? 0} icon={<PublicIcon />} />
        </Box>
        <Box sx={{ flex: "1 1 220px", minWidth: 200 }}>
          <StatCard label="Connected" value={summary?.connected ?? 0} accentColor="#059669" icon={<SyncIcon />} />
        </Box>
        <Box sx={{ flex: "1 1 220px", minWidth: 200 }}>
          <StatCard label="Disconnected" value={summary?.disconnected ?? 0} accentColor="#6B7280" icon={<PublicIcon />} />
        </Box>
        <Box sx={{ flex: "1 1 220px", minWidth: 200 }}>
          <StatCard
            label="Last Sync"
            value={summary?.lastSyncAt ? new Date(summary.lastSyncAt).toLocaleDateString() : "N/A"}
            icon={<HistoryIcon />}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField select label="Connector Type" value={filterConnector} onChange={(e) => setFilterConnector(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="">All Types</MenuItem>
          {availableConnectors?.map((c) => <MenuItem key={c.type} value={c.type}>{c.name}</MenuItem>)}
        </TextField>
        <TextField select label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="connected">Connected</MenuItem>
          <MenuItem value="disconnected">Disconnected</MenuItem>
          <MenuItem value="error">Error</MenuItem>
        </TextField>
      </Box>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!integrations || integrations.length === 0) ? (
        <EmptyState
          title="No integrations configured"
          description="Connect your tools and services to automate evidence collection"
          actionLabel="Add Integration"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {integrations?.map((integration) => {
            const connectorName = availableConnectors?.find((c) => c.type === integration.connectorType)?.name || integration.connectorType;
            return (
              <Box key={integration.id} sx={{ width: { xs: "100%", sm: "calc(50% - 8px)", md: "calc(33.333% - 11px)" }, minWidth: 300 }}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                      <Box sx={{ color: integration.status === "connected" ? "#059669" : integration.status === "error" ? "#DC2626" : "#6B7280" }}>
                        {getConnectorIcon(integration.connectorType)}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body1" fontWeight={600} noWrap>{integration.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{connectorName}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Chip
                        label={integration.status}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          backgroundColor: integration.status === "connected" ? "#D1FAE5" : integration.status === "error" ? "#FEE2E2" : "#F1F5F9",
                          color: integration.status === "connected" ? "#065F46" : integration.status === "error" ? "#991B1B" : "#475569",
                        }}
                      />
                      <Chip
                        label={integration.connectorType}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Last sync: {integration.lastSyncAt ? new Date(integration.lastSyncAt).toLocaleString() : "Never"}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                    <Tooltip title="Test Connection">
                      <IconButton size="small" color="primary" onClick={() => handleTest(integration.id)}>
                        <ScienceIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Sync Now">
                      <IconButton size="small" color="primary" onClick={() => handleSync(integration.id)}>
                        <SyncIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="History">
                      <IconButton size="small" onClick={() => { setHistoryId(integration.id); setHistoryOpen(true); }}>
                        <HistoryIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Box sx={{ flex: 1 }} />
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => setEditIntegration(integration)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteId(integration.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Box>
            );
          })}
        </Box>
      )}

      {testResult && (
        <Alert
          severity={testResult.success ? "success" : "error"}
          sx={{ mt: 2 }}
          onClose={() => setTestResult(null)}
        >
          {testResult.message}
        </Alert>
      )}

      <CreateIntegrationDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        availableConnectors={availableConnectors || []}
        onSubmit={async (values) => {
          await createIntegration.mutateAsync(values);
          setCreateOpen(false);
        }}
        loading={createIntegration.isPending}
      />

      {editIntegration && (
        <EditIntegrationDialog
          integration={editIntegration}
          onClose={() => setEditIntegration(null)}
          onSubmit={async (values) => {
            await updateIntegration.mutateAsync({ id: editIntegration.id, ...values });
            setEditIntegration(null);
          }}
          loading={updateIntegration.isPending}
        />
      )}

      <Dialog open={historyOpen} onClose={() => setHistoryOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Sync History</DialogTitle>
        <DialogContent>
          {!history || history.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 2, textAlign: "center" }}>No sync history available</Typography>
          ) : (
            <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
              <Box component="thead">
                <Box component="tr" sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Box component="th" sx={{ textAlign: "left", p: 1, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>Event</Box>
                  <Box component="th" sx={{ textAlign: "left", p: 1, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>Status</Box>
                  <Box component="th" sx={{ textAlign: "left", p: 1, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>Message</Box>
                  <Box component="th" sx={{ textAlign: "left", p: 1, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>Date</Box>
                </Box>
              </Box>
              <Box component="tbody">
                {history?.map((event) => (
                  <Box component="tr" key={event.id} sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Box component="td" sx={{ p: 1 }}>
                      <Chip label={event.eventType} size="small" variant="outlined" />
                    </Box>
                    <Box component="td" sx={{ p: 1 }}>
                      <Chip
                        label={event.status}
                        size="small"
                        color={event.status === "success" ? "success" : event.status === "failed" ? "error" : "warning"}
                      />
                    </Box>
                    <Box component="td" sx={{ p: 1 }}>
                      <Typography variant="body2">{event.message || "--"}</Typography>
                    </Box>
                    <Box component="td" sx={{ p: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(event.collectedAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHistoryOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Integration"
        message="Are you sure you want to delete this integration? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteIntegration.isPending}
      />
    </Box>
  );
}

function CreateIntegrationDialog({ open, onClose, availableConnectors, onSubmit, loading }: {
  open: boolean;
  onClose: () => void;
  availableConnectors: AvailableConnector[];
  onSubmit: (values: { connectorType: string; name: string; config: Record<string, string> }) => void;
  loading: boolean;
}) {
  const [connectorType, setConnectorType] = useState("");
  const [name, setName] = useState("");
  const [config, setConfig] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    if (!connectorType || !name) return;
    onSubmit({ connectorType, name, config });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Integration</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            select label="Connector Type" value={connectorType}
            onChange={(e) => { setConnectorType(e.target.value); setConfig({}); }}
            fullWidth size="small" required
          >
            {availableConnectors.map((c) => (
              <MenuItem key={c.type} value={c.type}>{c.name} — {c.description}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Integration Name" value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth size="small" required
          />
          {connectorType && (
            <ConfigFormFields
              connectorType={connectorType}
              config={config}
              onChange={(key, value) => setConfig((prev) => ({ ...prev, [key]: value }))}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading || !connectorType || !name}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function EditIntegrationDialog({ integration, onClose, onSubmit, loading }: {
  integration: Integration;
  onClose: () => void;
  onSubmit: (values: { name: string; config: Record<string, any>; isActive: boolean }) => void;
  loading: boolean;
}) {
  const [name, setName] = useState(integration.name);
  const [config, setConfig] = useState<Record<string, string>>(integration.config || {});
  const [isActive, setIsActive] = useState(integration.isActive);

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Integration</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth size="small" />
          <ConfigFormFields
            connectorType={integration.connectorType}
            config={config}
            onChange={(key, value) => setConfig((prev) => ({ ...prev, [key]: value }))}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">Active</Typography>
            <Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={() => onSubmit({ name, config, isActive })} variant="contained" disabled={loading || !name}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
