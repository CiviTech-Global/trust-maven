import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  ExpandMore as ExpandMoreIcon,
  ArrowBack as BackIcon,
  Add as AddIcon,
  CheckCircleOutline,
  CancelOutlined,
  Visibility,
  AttachFile as AttachFileIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  Policy as PolicyIcon,
} from "@mui/icons-material";
import { useRegulation, RegulationRequirementItem } from "../../../infrastructure/api/regulationCatalog.api";
import {
  useAdoptedRegulations,
  useAdoptRegulation,
  useImplementationStatus,
  useUpdateRequirementImpl,
} from "../../../infrastructure/api/complianceHub.api";
import {
  useJumpstartCoverage,
} from "../../../infrastructure/api/metaframework.api";
import {
  useEvidence,
  useCreateEvidence,
  type EvidenceItem,
} from "../../../infrastructure/api/evidence.api";
import { usePolicies } from "../../../infrastructure/api/policies.api";
import type { Policy } from "../../../domain/interfaces";
import StrMappingViewer from "../Metaframework/StrMappingViewer";

function ComplianceGauge({ percent }: { percent: number }) {
  const color = percent >= 80 ? "#10B981" : percent >= 50 ? "#F59E0B" : "#EF4444";
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <Box sx={{ position: "relative", width: 120, height: 120 }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
        />
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, color, lineHeight: 1 }}>
          {percent}%
        </Typography>
      </Box>
    </Box>
  );
}

function JumpstartPreviewDialog({
  open,
  regulationId,
  regulationName,
  onProceed,
  onClose,
}: {
  open: boolean;
  regulationId: string;
  regulationName: string;
  onProceed: () => void;
  onClose: () => void;
}) {
  const { data: coverage, isLoading, isError } = useJumpstartCoverage(regulationId);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Jumpstart Preview: {regulationName}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <LinearProgress />
        ) : isError || !coverage ? (
          <Typography color="error">Failed to load jumpstart coverage data.</Typography>
        ) : (
          <>
            <Box sx={{ display: "flex", gap: 3, mb: 3, alignItems: "center" }}>
              <ComplianceGauge percent={coverage.coveragePercent} />
              <Grid container spacing={2} sx={{ flex: 1 }}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="body2" color="text.secondary">Total Requirements</Typography>
                  <Typography variant="h5" fontWeight={700}>{coverage.totalRequirements}</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Covered <CheckCircleOutline sx={{ fontSize: 14, color: "success.main", verticalAlign: "middle", ml: 0.5 }} />
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="success.main">{coverage.coveredCount}</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Uncovered <CancelOutlined sx={{ fontSize: 14, color: "error.main", verticalAlign: "middle", ml: 0.5 }} />
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="error.main">{coverage.uncoveredCount}</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="body2" color="text.secondary">Coverage %</Typography>
                  <Typography variant="h5" fontWeight={700}>{coverage.coveragePercent}%</Typography>
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: "success.main", fontWeight: 600 }}>
                  Covered Requirements ({coverage.coveredCount})
                </Typography>
                <Box
                  sx={{
                    maxHeight: 260,
                    overflow: "auto",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  {coverage.covered.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                      No covered requirements
                    </Typography>
                  ) : (
                    coverage.covered.map((item) => (
                      <Box
                        key={item.requirementId}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1,
                          p: 1.5,
                          borderBottom: "1px solid",
                          borderColor: "divider",
                          "&:last-child": { borderBottom: 0 },
                          bgcolor: "#F0FDF4",
                        }}
                      >
                        <CheckCircleOutline sx={{ fontSize: 18, color: "success.main", mt: 0.3, flexShrink: 0 }} />
                        <Box>
                          <Typography variant="caption" fontWeight={600} color="success.dark">
                            {item.requirementCode}
                          </Typography>
                          <Typography variant="body2">{item.requirementTitle}</Typography>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: "error.main", fontWeight: 600 }}>
                  Uncovered Requirements ({coverage.uncoveredCount})
                </Typography>
                <Box
                  sx={{
                    maxHeight: 260,
                    overflow: "auto",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  {coverage.uncovered.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                      No uncovered requirements
                    </Typography>
                  ) : (
                    coverage.uncovered.map((item) => (
                      <Box
                        key={item.requirementId}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1,
                          p: 1.5,
                          borderBottom: "1px solid",
                          borderColor: "divider",
                          "&:last-child": { borderBottom: 0 },
                          bgcolor: "#FEF2F2",
                        }}
                      >
                        <CancelOutlined sx={{ fontSize: 18, color: "error.main", mt: 0.3, flexShrink: 0 }} />
                        <Box>
                          <Typography variant="caption" fontWeight={600} color="error.dark">
                            {item.requirementCode}
                          </Typography>
                          <Typography variant="body2">{item.requirementTitle}</Typography>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={onProceed}
          disabled={!coverage || isLoading || isError}
        >
          Proceed with Adoption
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const EVIDENCE_STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  draft: { bg: "#F1F5F9", color: "#475569" },
  submitted: { bg: "#DBEAFE", color: "#1E40AF" },
  approved: { bg: "#D1FAE5", color: "#065F46" },
  rejected: { bg: "#FEE2E2", color: "#9F1239" },
};

function RequirementEvidenceDialog({
  open,
  requirementId,
  onClose,
}: {
  open: boolean;
  requirementId: string;
  onClose: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [createTitle, setCreateTitle] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [mode, setMode] = useState<"search" | "create">("search");
  const [error, setError] = useState("");

  const { data: linkedEvidence, isLoading: linkedLoading } = useEvidence({
    entityType: "requirement",
    entityId: requirementId,
  });

  const { data: searchResults, isLoading: searchLoading } = useEvidence(
    searchTerm ? { search: searchTerm } : undefined,
  );

  const createEvidence = useCreateEvidence();

  const unlinkedEvidence = (searchResults || []).filter(
    (e: EvidenceItem) => e.entityId !== requirementId,
  );

  const handleLinkExisting = async (evidenceId: string) => {
    try {
      setError("");
      await createEvidence.mutateAsync({
        title: searchResults?.find((e: EvidenceItem) => e.id === evidenceId)?.title || "Linked evidence",
        entityType: "requirement",
        entityId: requirementId,
      });
      onClose();
    } catch {
      setError("Failed to link evidence");
    }
  };

  const handleCreateAndLink = async () => {
    if (!createTitle.trim()) return;
    try {
      setError("");
      await createEvidence.mutateAsync({
        title: createTitle.trim(),
        description: createDescription.trim() || undefined,
        entityType: "requirement",
        entityId: requirementId,
        status: "draft",
      });
      onClose();
      setCreateTitle("");
      setCreateDescription("");
    } catch {
      setError("Failed to create evidence");
    }
  };

  const handleClose = () => {
    onClose();
    setSearchTerm("");
    setCreateTitle("");
    setCreateDescription("");
    setError("");
    setMode("search");
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Evidence for Requirement</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Linked evidence list */}
        {linkedLoading ? (
          <LinearProgress sx={{ mb: 2 }} />
        ) : (
          <>
            <Typography variant="subtitle2" gutterBottom>
              Linked Evidence ({linkedEvidence?.length || 0})
            </Typography>
            {!linkedEvidence || linkedEvidence.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ py: 1, mb: 2 }}>
                No evidence linked to this requirement
              </Typography>
            ) : (
              <List disablePadding sx={{ mb: 2, maxHeight: 200, overflow: "auto" }}>
                {linkedEvidence.map((item: EvidenceItem) => (
                  <ListItem key={item.id} sx={{ borderBottom: "1px solid", borderColor: "divider", py: 0.5 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="body2" fontWeight={600}>{item.title}</Typography>
                          <Chip
                            label={item.status}
                            size="small"
                            sx={{
                              backgroundColor: EVIDENCE_STATUS_COLORS[item.status]?.bg,
                              color: EVIDENCE_STATUS_COLORS[item.status]?.color,
                              fontWeight: 600,
                              fontSize: "0.65rem",
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {item.uploadedBy
                            ? `${item.uploadedBy.firstName} ${item.uploadedBy.lastName}`
                            : "Unknown"}{" "}
                          &middot; {new Date(item.createdAt).toLocaleDateString()}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </>
        )}

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Button
            size="small"
            variant={mode === "search" ? "contained" : "outlined"}
            onClick={() => setMode("search")}
          >
            Search Existing
          </Button>
          <Button
            size="small"
            variant={mode === "create" ? "contained" : "outlined"}
            onClick={() => setMode("create")}
          >
            Create New
          </Button>
        </Box>

        {mode === "search" ? (
          <Box>
            <TextField
              label="Search evidence by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />
            {searchLoading && <LinearProgress sx={{ mb: 1 }} />}
            {!searchLoading && (!unlinkedEvidence || unlinkedEvidence.length === 0) ? (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
                {searchTerm ? "No unlinked evidence found" : "Type to search for evidence"}
              </Typography>
            ) : (
              <List disablePadding sx={{ maxHeight: 300, overflow: "auto" }}>
                {unlinkedEvidence.map((item: EvidenceItem) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton onClick={() => handleLinkExisting(item.id)}>
                      <ListItemText
                        primary={item.title}
                        secondary={`${item.entityType} · ${item.uploadedBy?.firstName || "Unknown"}`}
                      />
                      <Chip
                        label={item.status}
                        size="small"
                        sx={{
                          backgroundColor: EVIDENCE_STATUS_COLORS[item.status]?.bg,
                          color: EVIDENCE_STATUS_COLORS[item.status]?.color,
                          fontWeight: 600,
                          fontSize: "0.65rem",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Title"
              value={createTitle}
              onChange={(e) => setCreateTitle(e.target.value)}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Description"
              value={createDescription}
              onChange={(e) => setCreateDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
              size="small"
            />
            <Button
              variant="contained"
              onClick={handleCreateAndLink}
              disabled={!createTitle.trim() || createEvidence.isPending}
            >
              {createEvidence.isPending ? "Creating..." : "Create & Link"}
            </Button>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function LinkedPoliciesSection({ requirementCode }: { requirementCode: string }) {
  const { data: policies, isLoading } = usePolicies({ search: requirementCode });

  const relevantPolicies = (policies || []).slice(0, 5);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" fontWeight={600} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <PolicyIcon sx={{ fontSize: 16 }} />
        Linked Policies
      </Typography>
      {isLoading ? (
        <LinearProgress sx={{ mb: 1 }} />
      ) : relevantPolicies.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
          No policies linked to this requirement
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {relevantPolicies.map((p: Policy) => (
            <Chip
              key={p.id}
              label={p.title}
              size="small"
              variant="outlined"
              icon={<PolicyIcon sx={{ fontSize: 14 }} />}
              sx={{ fontSize: "0.75rem" }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default function RegulationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [adoptDialogOpen, setAdoptDialogOpen] = useState(false);
  const [jumpstartDialogOpen, setJumpstartDialogOpen] = useState(false);
  const [targetDate, setTargetDate] = useState("");
  const [toast, setToast] = useState<{ severity: "success" | "error"; message: string } | null>(null);
  const [mappingViewerReqId, setMappingViewerReqId] = useState<string | null>(null);
  const [evidenceDialogReqId, setEvidenceDialogReqId] = useState<string | null>(null);

  const { data: regulationData, isLoading } = useRegulation(id || null);
  const { data: adopted } = useAdoptedRegulations();
  const adoptMutation = useAdoptRegulation();
  const updateImpl = useUpdateRequirementImpl();

  const orgReg = adopted?.find((a) => a.regulationId === id);
  const { data: implStatus } = useImplementationStatus(orgReg?.id || null);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!regulationData) {
    return <Typography>Regulation not found</Typography>;
  }

  const { regulation, requirements } = regulationData;

  const handleAdopt = async () => {
    try {
      await adoptMutation.mutateAsync({
        regulationId: id!,
        targetComplianceDate: targetDate || undefined,
      });
      setAdoptDialogOpen(false);
      setToast({ severity: "success", message: `${regulation.name} adopted successfully` });
    } catch (err: any) {
      setToast({ severity: "error", message: err.response?.data?.message || "Failed to adopt regulation" });
    }
  };

  const handleJumpstartProceed = () => {
    setJumpstartDialogOpen(false);
    setAdoptDialogOpen(true);
  };

  const handleStatusChange = async (implId: string, status: string) => {
    try {
      await updateImpl.mutateAsync({ implId, status });
    } catch (err: any) {
      setToast({ severity: "error", message: "Failed to update status" });
    }
  };

  const getImplForReq = (reqId: string) => {
    if (!implStatus) return null;
    const found = implStatus.requirements.find((r: any) => r.id === reqId);
    return found?.implementation || null;
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "implemented": return "success";
      case "in_progress": return "warning";
      case "not_applicable": return "default";
      default: return "error";
    }
  };

  const renderRequirement = (req: RegulationRequirementItem, depth: number = 0) => {
    const impl = getImplForReq(req.id);
    const hasChildren = req.children && req.children.length > 0;

    return (
      <Accordion key={req.id} sx={{ ml: depth * 2 }} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
            <Chip label={req.code} size="small" variant="outlined" />
            <Typography variant="body2" fontWeight={500} sx={{ flex: 1 }}>
              {req.title}
            </Typography>
            {orgReg && impl && (
              <Chip
                label={impl.status.replace(/_/g, " ")}
                size="small"
                color={statusColor(impl.status) as any}
                sx={{ mr: 1 }}
              />
            )}
            <EvidenceCountBadge requirementId={req.id} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {req.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {req.description}
            </Typography>
          )}

          {req.keyQuestions && req.keyQuestions.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" fontWeight={600} gutterBottom>Key Questions:</Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {req.keyQuestions.map((q, i) => (
                  <li key={i}><Typography variant="body2">{q}</Typography></li>
                ))}
              </ul>
            </Box>
          )}

          {req.evidenceExamples && req.evidenceExamples.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" fontWeight={600} gutterBottom>Evidence Examples:</Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {req.evidenceExamples.map((e, i) => (
                  <li key={i}><Typography variant="body2">{e}</Typography></li>
                ))}
              </ul>
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Visibility />}
              onClick={() => setMappingViewerReqId(req.id)}
            >
              View Common Controls
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AttachFileIcon />}
              onClick={() => setEvidenceDialogReqId(req.id)}
            >
              Add Evidence
            </Button>
          </Box>

          <LinkedPoliciesSection requirementCode={req.code} />

          {orgReg && impl && (
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
              {impl.status === "not_started" && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => handleStatusChange(impl.id, "in_progress")}
                >
                  Start Work
                </Button>
              )}
              {impl.status === "in_progress" && (
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleStatusChange(impl.id, "implemented")}
                >
                  Mark Complete
                </Button>
              )}
              {impl.status === "implemented" && (
                <Chip
                  icon={<CheckCircleIcon />}
                  label="Verified"
                  color="success"
                  size="small"
                  variant="filled"
                />
              )}
            </Box>
          )}

          {hasChildren && (
            <Box sx={{ mt: 2 }}>
              {req.children!.map((child) => renderRequirement(child, depth + 1))}
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    );
  };

  function EvidenceCountBadge({ requirementId }: { requirementId: string }) {
    const { data: evidence } = useEvidence({ entityType: "requirement", entityId: requirementId });
    const count = evidence?.length || 0;
    if (count === 0) return null;
    return (
      <Tooltip title={`${count} evidence item${count === 1 ? "" : "s"}`}>
        <Chip
          icon={<AttachFileIcon sx={{ fontSize: 14 }} />}
          label={count}
          size="small"
          variant="outlined"
          sx={{ fontSize: "0.7rem", mr: 1 }}
        />
      </Tooltip>
    );
  }

  return (
    <Box>
      <Button startIcon={<BackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {regulation.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Chip label={regulation.type} size="small" />
            <Chip label={regulation.category.replace(/_/g, " ")} size="small" variant="outlined" />
            {regulation.jurisdiction && (
              <Chip label={regulation.jurisdiction} size="small" variant="outlined" />
            )}
            <Chip label={`v${regulation.version}`} size="small" variant="outlined" />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {regulation.description}
          </Typography>
        </Box>
        {!orgReg && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setJumpstartDialogOpen(true)}
          >
            Adopt
          </Button>
        )}
      </Box>

      {/* Compliance Summary */}
      {implStatus && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 6, md: 2 }}>
                <Typography variant="body2" color="text.secondary">Total</Typography>
                <Typography variant="h5" fontWeight={700}>{implStatus.summary.totalRequirements}</Typography>
              </Grid>
              <Grid size={{ xs: 6, md: 2 }}>
                <Typography variant="body2" color="text.secondary">Implemented</Typography>
                <Typography variant="h5" fontWeight={700} color="success.main">{implStatus.summary.implemented}</Typography>
              </Grid>
              <Grid size={{ xs: 6, md: 2 }}>
                <Typography variant="body2" color="text.secondary">In Progress</Typography>
                <Typography variant="h5" fontWeight={700} color="warning.main">{implStatus.summary.inProgress}</Typography>
              </Grid>
              <Grid size={{ xs: 6, md: 2 }}>
                <Typography variant="body2" color="text.secondary">Not Started</Typography>
                <Typography variant="h5" fontWeight={700} color="error.main">{implStatus.summary.notStarted}</Typography>
              </Grid>
              <Grid size={{ xs: 6, md: 2 }}>
                <Typography variant="body2" color="text.secondary">N/A</Typography>
                <Typography variant="h5" fontWeight={700}>{implStatus.summary.notApplicable}</Typography>
              </Grid>
              <Grid size={{ xs: 6, md: 2 }}>
                <Typography variant="body2" color="text.secondary">Compliance</Typography>
                <Typography variant="h5" fontWeight={700}>{implStatus.summary.compliancePercent}%</Typography>
              </Grid>
            </Grid>
            <LinearProgress
              variant="determinate"
              value={implStatus.summary.compliancePercent}
              sx={{ height: 8, borderRadius: 4, mt: 2 }}
              color={implStatus.summary.compliancePercent >= 70 ? "success" : implStatus.summary.compliancePercent >= 40 ? "warning" : "error"}
            />
          </CardContent>
        </Card>
      )}

      {/* Requirement Tree */}
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Requirements ({requirements.length})
      </Typography>
      {requirements.map((req) => renderRequirement(req))}

      {/* Jumpstart Preview Dialog */}
      <JumpstartPreviewDialog
        open={jumpstartDialogOpen}
        regulationId={id!}
        regulationName={regulation.name}
        onProceed={handleJumpstartProceed}
        onClose={() => setJumpstartDialogOpen(false)}
      />

      {/* Target Date Dialog */}
      <Dialog open={adoptDialogOpen} onClose={() => setAdoptDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Adopt {regulation.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This will create implementation tracking records for all {requirements.length} requirements.
          </Typography>
          <TextField
            label="Target Compliance Date"
            type="date"
            fullWidth
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdoptDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAdopt}
            disabled={adoptMutation.isPending}
          >
            {adoptMutation.isPending ? "Adopting..." : "Adopt"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* STRM Mapping Viewer */}
      <StrMappingViewer
        requirementId={mappingViewerReqId || ""}
        open={!!mappingViewerReqId}
        onClose={() => setMappingViewerReqId(null)}
      />

      {/* Evidence Dialog */}
      <RequirementEvidenceDialog
        open={!!evidenceDialogReqId}
        requirementId={evidenceDialogReqId || ""}
        onClose={() => setEvidenceDialogReqId(null)}
      />

      <Snackbar
        open={!!toast}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast?.severity} onClose={() => setToast(null)} variant="filled">
          {toast?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
