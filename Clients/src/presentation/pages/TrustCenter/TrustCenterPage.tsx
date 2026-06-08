import { useState, useRef } from "react";
import {
  Box, Typography, Button, Card, CardContent, TextField, Switch, FormControlLabel,
  Dialog, DialogTitle, DialogContent, DialogActions, Chip, Avatar, Divider,
  LinearProgress, Alert, Checkbox, FormGroup, IconButton, Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon, Add as AddIcon,
  Visibility as PreviewIcon, Public as PublicIcon, Lock as LockIcon,
  OpenInNew as OpenInNewIcon, Upload as UploadIcon, Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  useTrustCenterConfig, useUpdateTrustCenterConfig, useToggleTrustCenterPublic, usePublicTrustCenter,
  type TrustCenterConfig, type TrustCenterBadge,
} from "../../../infrastructure/api/integrations.api";
import { useFrameworks } from "../../../infrastructure/api/frameworks.api";
import {
  useCommonControls, useImplementations, useUnifiedCompliance,
  type ControlImplementation, type CommonControl,
} from "../../../infrastructure/api/metaframework.api";
import EmptyState from "../../components/common/EmptyState";



function ComplianceGauge({ value }: { value: number }) {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const color = value >= 80 ? "#4caf50" : value >= 50 ? "#ff9800" : "#f44336";
  return (
    <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e0e0e0" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <Typography sx={{ position: "absolute", fontWeight: 700, fontSize: 24 }}>
        {Math.round(value)}%
      </Typography>
    </Box>
  );
}

export default function TrustCenterPage() {
  const { data: config, isLoading, error } = useTrustCenterConfig();
  const updateConfig = useUpdateTrustCenterConfig();
  const togglePublic = useToggleTrustCenterPublic();
  const { data: frameworks } = useFrameworks();
  const { data: controlsData } = useCommonControls();
  const { data: implementationsData } = useImplementations();
  const { data: complianceData } = useUnifiedCompliance();
  const [previewOpen, setPreviewOpen] = useState(false);
  const { data: publicConfig } = usePublicTrustCenter(
    previewOpen && config?.isPublic ? config?.id || null : null,
  );
  const [editOpen, setEditOpen] = useState(false);
  const [certDialogOpen, setCertDialogOpen] = useState(false);
  const [certName, setCertName] = useState("");
  const [certDate, setCertDate] = useState("");
  const [badgeDialogOpen, setBadgeDialogOpen] = useState(false);
  const [badgeName, setBadgeName] = useState("");
  const badgeFileRef = useRef<HTMLInputElement>(null);

  if (isLoading) return <LinearProgress />;
  if (error) return <Alert severity="error">Failed to load Trust Center configuration</Alert>;
  if (!config) return <EmptyState title="No configuration" description="Trust Center configuration not found" />;

  const controls = controlsData ?? [];
  const implementations = implementationsData?.implementations ?? [];
  const compliancePercent = complianceData?.overallCompliancePercent ?? 0;

  const implByControlId: Record<string, ControlImplementation> = {};
  for (const impl of implementations) {
    implByControlId[impl.commonControlId] = impl;
  }

  const controlsByDomain: Record<string, CommonControl[]> = {};
  for (const ctrl of controls) {
    const domain = ctrl.domain || "Other";
    if (!controlsByDomain[domain]) controlsByDomain[domain] = [];
    controlsByDomain[domain].push(ctrl);
  }

  const domainProgress: Record<string, { total: number; implemented: number }> = {};
  for (const [domain, ctrls] of Object.entries(controlsByDomain)) {
    let implemented = 0;
    for (const ctrl of ctrls) {
      const impl = implByControlId[ctrl.id];
      if (impl?.status === "implemented") implemented++;
    }
    domainProgress[domain] = { total: ctrls.length, implemented };
  }

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

  const handleAddBadge = (file: File | null) => {
    if (!file || !badgeName) return;
    const reader = new FileReader();
    reader.onload = () => {
      const newBadge: TrustCenterBadge = { name: badgeName, imageUrl: reader.result as string };
      updateConfig.mutateAsync({ badges: [...(config.badges || []), newBadge] });
      setBadgeName("");
      setBadgeDialogOpen(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBadge = (index: number) => {
    const updated = config.badges.filter((_: any, i: number) => i !== index);
    updateConfig.mutateAsync({ badges: updated });
  };

  const publicPageUrl = `${window.location.origin}/trust-center/public/${config.id}`;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h1">Trust Center</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {config.isPublic && (
            <Button
              variant="text"
              startIcon={<OpenInNewIcon />}
              href={publicPageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Public Page
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<PreviewIcon />}
            onClick={() => setPreviewOpen(true)}
          >
            Preview
          </Button>
          <Button variant="contained" startIcon={<EditIcon />} onClick={() => setEditOpen(true)}>
            Edit
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ flex: { md: 2 }, display: "flex", flexDirection: "column", gap: 3 }}>
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

          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 2, fontSize: "0.9rem", fontWeight: 600 }}>
                Control Status
              </Typography>
              {controls.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No controls found</Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {Object.entries(domainProgress).map(([domain, progress]) => {
                    const pct = progress.total > 0 ? (progress.implemented / progress.total) * 100 : 0;
                    return (
                      <Box key={domain}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{domain}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {progress.implemented}/{progress.total}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "grey.200",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: pct >= 80 ? "success.main" : pct >= 50 ? "warning.main" : "error.main",
                            },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 2, fontSize: "0.9rem", fontWeight: 600 }}>
                Compliance Score
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <ComplianceGauge value={compliancePercent} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Overall compliance across all frameworks
                  </Typography>
                  {complianceData?.regulations && complianceData.regulations.length > 0 && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      {complianceData.regulations.slice(0, 5).map((reg) => (
                        <Box key={reg.regulationId} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 500, minWidth: 100 }}>
                            {reg.regulationCode}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={reg.compliancePercent}
                            sx={{ flex: 1, height: 6, borderRadius: 3 }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ minWidth: 36, textAlign: "right" }}>
                            {Math.round(reg.compliancePercent)}%
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { md: 1 }, display: "flex", flexDirection: "column", gap: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 1.5, fontSize: "0.9rem", fontWeight: 600 }}>
                Incident Response
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {config.vulnerabilityPolicyUrl ? (
                  <Typography variant="body2">
                    <strong>Vuln. Policy:</strong>{" "}
                    <a href={config.vulnerabilityPolicyUrl} target="_blank" rel="noopener noreferrer">
                      {config.vulnerabilityPolicyUrl}
                    </a>
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">No vulnerability policy URL</Typography>
                )}
                {config.incidentResponseContact ? (
                  <Typography variant="body2"><strong>IR Contact:</strong> {config.incidentResponseContact}</Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">No incident response contact</Typography>
                )}
                {config.bugBountyUrl ? (
                  <Typography variant="body2">
                    <strong>Bug Bounty:</strong>{" "}
                    <a href={config.bugBountyUrl} target="_blank" rel="noopener noreferrer">
                      {config.bugBountyUrl}
                    </a>
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">No bug bounty program</Typography>
                )}
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                <Typography variant="h4" sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  Security Badges
                </Typography>
                <Button size="small" startIcon={<AddIcon />} onClick={() => setBadgeDialogOpen(true)}>Add</Button>
              </Box>
              {config.badges && config.badges.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  {config.badges.map((badge: TrustCenterBadge, i: number) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                        position: "relative",
                      }}
                    >
                      <Tooltip title={badge.name}>
                        <Avatar
                          src={badge.imageUrl}
                          variant="rounded"
                          sx={{ width: 64, height: 64, cursor: "pointer" }}
                          onClick={() => {
                            const a = document.createElement("a");
                            a.href = badge.imageUrl;
                            a.download = `${badge.name}.png`;
                            a.click();
                          }}
                        />
                      </Tooltip>
                      <Typography variant="caption" sx={{ fontSize: "0.65rem", textAlign: "center" }}>
                        {badge.name}
                      </Typography>
                      <IconButton
                        size="small"
                        sx={{ position: "absolute", top: -8, right: -8, bgcolor: "background.paper", boxShadow: 1 }}
                        onClick={() => handleRemoveBadge(i)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">No badges added</Typography>
              )}
            </CardContent>
          </Card>

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
        frameworks={frameworks ?? []}
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

      <Dialog open={badgeDialogOpen} onClose={() => setBadgeDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add Security Badge</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Badge Name"
              value={badgeName}
              onChange={(e) => setBadgeName(e.target.value)}
              fullWidth
              size="small"
              required
            />
            <input
              ref={badgeFileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleAddBadge(file);
              }}
            />
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={() => badgeFileRef.current?.click()}
              disabled={!badgeName}
            >
              Upload Image
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBadgeDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Trust Center Preview</DialogTitle>
        <DialogContent>
          {config.isPublic ? (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                {(publicConfig?.companyLogo || config.companyLogo) ? (
                  <Avatar src={publicConfig?.companyLogo || config.companyLogo || undefined} sx={{ width: 48, height: 48 }} />
                ) : (
                  <Avatar sx={{ width: 48, height: 48, bgcolor: "primary.main" }}>
                    {(publicConfig?.companyName || config.companyName)?.[0] || "?"}
                  </Avatar>
                )}
                <Typography variant="h4">{publicConfig?.companyName || config.companyName || "Trust Center"}</Typography>
              </Box>

              {(publicConfig?.description || config.description) && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {publicConfig?.description || config.description}
                </Typography>
              )}

              <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, mb: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Compliance Score</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <ComplianceGauge value={compliancePercent} />
                    <Typography variant="body2" color="text.secondary">
                      {compliancePercent >= 80
                        ? "Strong compliance posture"
                        : compliancePercent >= 50
                          ? "Moderate compliance posture"
                          : "Compliance improvements needed"}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {config.selectedFrameworkIds && config.selectedFrameworkIds.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Certified Frameworks</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {config.selectedFrameworkIds.map((fid) => {
                      const fw = frameworks?.find((f) => f.id === fid);
                      return fw ? (
                        <Chip key={fid} label={`${fw.name} ${fw.version}`} color="success" variant="outlined" />
                      ) : null;
                    })}
                  </Box>
                </Box>
              )}

              {config.certifications && config.certifications.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Certifications</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {config.certifications.map((cert: any, i: number) => (
                      <Chip key={i} label={`${cert.name}${cert.date ? ` (${cert.date})` : ""}`} color="success" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}

              {Object.keys(domainProgress).length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Control Status</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {Object.entries(domainProgress).map(([domain, progress]) => {
                      const pct = progress.total > 0 ? (progress.implemented / progress.total) * 100 : 0;
                      return (
                        <Box key={domain}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.25 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{domain}</Typography>
                            <Typography variant="caption">{Math.round(pct)}%</Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={pct}
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              )}

              {(config.vulnerabilityPolicyUrl || config.incidentResponseContact || config.bugBountyUrl) && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Incident Response</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    {config.vulnerabilityPolicyUrl && (
                      <Typography variant="body2">
                        <strong>Vulnerability Policy:</strong>{" "}
                        <a href={config.vulnerabilityPolicyUrl} target="_blank" rel="noopener noreferrer">
                          {config.vulnerabilityPolicyUrl}
                        </a>
                      </Typography>
                    )}
                    {config.incidentResponseContact && (
                      <Typography variant="body2"><strong>IR Contact:</strong> {config.incidentResponseContact}</Typography>
                    )}
                    {config.bugBountyUrl && (
                      <Typography variant="body2">
                        <strong>Bug Bounty:</strong>{" "}
                        <a href={config.bugBountyUrl} target="_blank" rel="noopener noreferrer">
                          {config.bugBountyUrl}
                        </a>
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}

              {config.badges && config.badges.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Security Badges</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                    {config.badges.map((badge: TrustCenterBadge, i: number) => (
                      <Tooltip key={i} title={badge.name}>
                        <Avatar src={badge.imageUrl} variant="rounded" sx={{ width: 48, height: 48 }} />
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              )}

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {config.supportEmail && (
                  <Typography variant="body2">Support: {config.supportEmail}</Typography>
                )}
                {config.supportUrl && (
                  <Typography variant="body2">
                    <a href={config.supportUrl} target="_blank" rel="noopener noreferrer">{config.supportUrl}</a>
                  </Typography>
                )}
              </Box>
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

function EditTrustCenterDialog({ open, config, frameworks, onClose, onSubmit, loading }: {
  open: boolean;
  config: TrustCenterConfig;
  frameworks: { id: string; name: string; version: string }[];
  onClose: () => void;
  onSubmit: (values: Partial<TrustCenterConfig>) => void;
  loading: boolean;
}) {
  const [companyName, setCompanyName] = useState(config.companyName || "");
  const [description, setDescription] = useState(config.description || "");
  const [supportEmail, setSupportEmail] = useState(config.supportEmail || "");
  const [supportUrl, setSupportUrl] = useState(config.supportUrl || "");
  const [selectedFrameworkIds, setSelectedFrameworkIds] = useState<string[]>(config.selectedFrameworkIds || []);
  const [vulnerabilityPolicyUrl, setVulnerabilityPolicyUrl] = useState(config.vulnerabilityPolicyUrl || "");
  const [incidentResponseContact, setIncidentResponseContact] = useState(config.incidentResponseContact || "");
  const [bugBountyUrl, setBugBountyUrl] = useState(config.bugBountyUrl || "");

  const handleFrameworkToggle = (id: string) => {
    setSelectedFrameworkIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id],
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Trust Center</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} fullWidth size="small" />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth size="small" multiline rows={3} />
          <TextField label="Support Email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} fullWidth size="small" type="email" />
          <TextField label="Support URL" value={supportUrl} onChange={(e) => setSupportUrl(e.target.value)} fullWidth size="small" />

          <Divider />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Framework Selection</Typography>
          <Typography variant="caption" color="text.secondary">
            Select frameworks to display as certified on the public page
          </Typography>
          {frameworks.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No frameworks available</Typography>
          ) : (
            <FormGroup>
              {frameworks.map((fw) => (
                <FormControlLabel
                  key={fw.id}
                  control={
                    <Checkbox
                      checked={selectedFrameworkIds.includes(fw.id)}
                      onChange={() => handleFrameworkToggle(fw.id)}
                      size="small"
                    />
                  }
                  label={`${fw.name} (${fw.version})`}
                />
              ))}
            </FormGroup>
          )}

          <Divider />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Incident Response</Typography>
          <TextField
            label="Vulnerability Disclosure Policy URL"
            value={vulnerabilityPolicyUrl}
            onChange={(e) => setVulnerabilityPolicyUrl(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Incident Response Contact"
            value={incidentResponseContact}
            onChange={(e) => setIncidentResponseContact(e.target.value)}
            fullWidth
            size="small"
            placeholder="security@example.com"
          />
          <TextField
            label="Bug Bounty URL"
            value={bugBountyUrl}
            onChange={(e) => setBugBountyUrl(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button
          onClick={() => onSubmit({
            companyName,
            description,
            supportEmail,
            supportUrl,
            selectedFrameworkIds,
            vulnerabilityPolicyUrl,
            incidentResponseContact,
            bugBountyUrl,
          })}
          variant="contained"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
