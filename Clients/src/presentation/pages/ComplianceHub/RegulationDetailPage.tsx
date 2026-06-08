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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  ExpandMore as ExpandMoreIcon,
  ArrowBack as BackIcon,
  Add as AddIcon,
  CheckCircleOutline,
  CancelOutlined,
  Visibility,
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

export default function RegulationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [adoptDialogOpen, setAdoptDialogOpen] = useState(false);
  const [jumpstartDialogOpen, setJumpstartDialogOpen] = useState(false);
  const [targetDate, setTargetDate] = useState("");
  const [toast, setToast] = useState<{ severity: "success" | "error"; message: string } | null>(null);
  const [mappingViewerReqId, setMappingViewerReqId] = useState<string | null>(null);

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

          <Button
            size="small"
            variant="outlined"
            startIcon={<Visibility />}
            onClick={() => setMappingViewerReqId(req.id)}
            sx={{ mb: 2 }}
          >
            View Common Controls
          </Button>

          {orgReg && impl && (
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={impl.status}
                  label="Status"
                  onChange={(e) => handleStatusChange(impl.id, e.target.value)}
                >
                  <MenuItem value="not_started">Not Started</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="implemented">Implemented</MenuItem>
                  <MenuItem value="not_applicable">Not Applicable</MenuItem>
                </Select>
              </FormControl>
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
