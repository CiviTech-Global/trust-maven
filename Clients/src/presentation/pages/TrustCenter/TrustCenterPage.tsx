import { useState } from "react";
import {
  Box, Typography, Button, Card, CardContent, TextField, Switch, FormControlLabel,
  Dialog, DialogTitle, DialogContent, DialogActions, Chip, Avatar, Divider, LinearProgress, Alert,
} from "@mui/material";
import {
  Edit as EditIcon, Add as AddIcon,
  Visibility as PreviewIcon, Public as PublicIcon, Lock as LockIcon,
} from "@mui/icons-material";
import {
  useTrustCenterConfig, useUpdateTrustCenterConfig, useToggleTrustCenterPublic, usePublicTrustCenter,
  type TrustCenterConfig,
} from "../../../infrastructure/api/integrations.api";
import EmptyState from "../../components/common/EmptyState";

export default function TrustCenterPage() {
  const { data: config, isLoading, error } = useTrustCenterConfig();
  const updateConfig = useUpdateTrustCenterConfig();
  const togglePublic = useToggleTrustCenterPublic();
  const [previewOpen, setPreviewOpen] = useState(false);
  const { data: publicConfig } = usePublicTrustCenter(
    previewOpen && config?.isPublic ? config?.id || null : null,
  );
  const [editOpen, setEditOpen] = useState(false);
  const [certDialogOpen, setCertDialogOpen] = useState(false);
  const [certName, setCertName] = useState("");
  const [certDate, setCertDate] = useState("");

  if (isLoading) return <LinearProgress />;
  if (error) return <Alert severity="error">Failed to load Trust Center configuration</Alert>;
  if (!config) return <EmptyState title="No configuration" description="Trust Center configuration not found" />;

  const handleTogglePublic = async () => {
    try {
      await togglePublic.mutateAsync();
    } catch { /* ignore */ }
  };

  const handleAddCert = () => {
    if (!certName) return;
    const newCert = { name: certName, date: certDate || new Date().toISOString().split("T")[0] };
    updateConfig.mutateAsync({ certifications: [...(config.certifications || []), newCert] });
    setCertName("");
    setCertDate("");
    setCertDialogOpen(false);
  };

  const handleRemoveCert = (index: number) => {
    const updated = config.certifications.filter((_: any, i: number) => i !== index);
    updateConfig.mutateAsync({ certifications: updated });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Trust Center</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<PreviewIcon />}
            onClick={() => setPreviewOpen(true)}
            disabled={!config.isPublic}
          >
            Preview
          </Button>
          <Button variant="contained" startIcon={<EditIcon />} onClick={() => setEditOpen(true)}>
            Edit
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ flex: { md: 2 } }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                {config.companyLogo ? (
                  <Avatar src={config.companyLogo} sx={{ width: 56, height: 56 }} />
                ) : (
                  <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main", fontSize: 24 }}>
                    {config.companyName?.[0] || "?"}
                  </Avatar>
                )}
                <Box>
                  <Typography variant="h3">{config.companyName || "Your Company"}</Typography>
                  <Typography variant="body2" color="text.secondary">{config.description || "No description"}</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.isPublic}
                      onChange={handleTogglePublic}
                      disabled={togglePublic.isPending}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      {config.isPublic ? <PublicIcon fontSize="small" color="success" /> : <LockIcon fontSize="small" />}
                      <Typography variant="body2">{config.isPublic ? "Public" : "Private"}</Typography>
                    </Box>
                  }
                />
                <Typography variant="caption" color="text.secondary">
                  {config.isPublic ? "Your Trust Center is publicly accessible" : "Only internal users can view"}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h4" sx={{ mb: 1.5, fontSize: "0.9rem", fontWeight: 600 }}>Support</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {config.supportEmail && (
                  <Typography variant="body2"><strong>Email:</strong> {config.supportEmail}</Typography>
                )}
                {config.supportUrl && (
                  <Typography variant="body2"><strong>URL:</strong> {config.supportUrl}</Typography>
                )}
                {!config.supportEmail && !config.supportUrl && (
                  <Typography variant="body2" color="text.secondary">No support information configured</Typography>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                <Typography variant="h4" sx={{ fontSize: "0.9rem", fontWeight: 600 }}>Certifications</Typography>
                <Button size="small" startIcon={<AddIcon />} onClick={() => setCertDialogOpen(true)}>Add</Button>
              </Box>
              {config.certifications && config.certifications.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {config.certifications.map((cert: any, i: number) => (
                    <Chip
                      key={i}
                      label={`${cert.name}${cert.date ? ` (${cert.date})` : ""}`}
                      onDelete={() => handleRemoveCert(i)}
                      variant="outlined"
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">No certifications added</Typography>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { md: 1 } }}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 1.5, fontSize: "0.9rem", fontWeight: 600 }}>Controls</Typography>
              {config.controls && config.controls.length > 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  {config.controls.map((ctrl: any, i: number) => (
                    <Chip key={i} label={ctrl.title || ctrl.name || `Control ${i + 1}`} size="small" />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">No controls published</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      <EditTrustCenterDialog
        open={editOpen}
        config={config}
        onClose={() => setEditOpen(false)}
        onSubmit={async (values) => {
          await updateConfig.mutateAsync(values);
          setEditOpen(false);
        }}
        loading={updateConfig.isPending}
      />

      <Dialog open={certDialogOpen} onClose={() => setCertDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add Certification</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField label="Certification Name" value={certName} onChange={(e) => setCertName(e.target.value)} fullWidth size="small" required />
            <TextField label="Date" type="date" value={certDate} onChange={(e) => setCertDate(e.target.value)} fullWidth size="small" InputLabelProps={{ shrink: true }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCertDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCert} variant="contained" disabled={!certName}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Trust Center Preview</DialogTitle>
        <DialogContent>
          {config.isPublic && publicConfig ? (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                {publicConfig.companyLogo ? (
                  <Avatar src={publicConfig.companyLogo} sx={{ width: 48, height: 48 }} />
                ) : (
                  <Avatar sx={{ width: 48, height: 48, bgcolor: "primary.main" }}>
                    {publicConfig.companyName?.[0] || "?"}
                  </Avatar>
                )}
                <Typography variant="h4">{publicConfig.companyName || "Trust Center"}</Typography>
              </Box>
              {publicConfig.description && (
                <Typography variant="body1" sx={{ mb: 2 }}>{publicConfig.description}</Typography>
              )}
              {publicConfig.certifications && publicConfig.certifications.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Certifications</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {publicConfig.certifications.map((cert: any, i: number) => (
                      <Chip key={i} label={`${cert.name}${cert.date ? ` (${cert.date})` : ""}`} color="success" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}
              {publicConfig.supportEmail && (
                <Typography variant="body2" sx={{ mb: 0.5 }}>Support: {publicConfig.supportEmail}</Typography>
              )}
              {publicConfig.supportUrl && (
                <Typography variant="body2"><a href={publicConfig.supportUrl} target="_blank" rel="noopener noreferrer">{publicConfig.supportUrl}</a></Typography>
              )}
            </Box>
          ) : (
            <Typography color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
              Trust Center is currently private. Enable public access to see the preview.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function EditTrustCenterDialog({ open, config, onClose, onSubmit, loading }: {
  open: boolean;
  config: TrustCenterConfig;
  onClose: () => void;
  onSubmit: (values: Partial<TrustCenterConfig>) => void;
  loading: boolean;
}) {
  const [companyName, setCompanyName] = useState(config.companyName || "");
  const [description, setDescription] = useState(config.description || "");
  const [supportEmail, setSupportEmail] = useState(config.supportEmail || "");
  const [supportUrl, setSupportUrl] = useState(config.supportUrl || "");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Trust Center</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} fullWidth size="small" />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth size="small" multiline rows={3} />
          <TextField label="Support Email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} fullWidth size="small" type="email" />
          <TextField label="Support URL" value={supportUrl} onChange={(e) => setSupportUrl(e.target.value)} fullWidth size="small" />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={() => onSubmit({ companyName, description, supportEmail, supportUrl })} variant="contained" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
