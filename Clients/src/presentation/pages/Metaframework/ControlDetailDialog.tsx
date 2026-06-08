import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, Chip, LinearProgress, Tabs, Tab, Badge, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, MenuItem, Alert, IconButton, Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon, Link as LinkIcon,
} from "@mui/icons-material";
import { useState } from "react";
import {
  useCommonControl, useMappingsForControl,
  useImplementations, useUpdateImplementation,
  type StrMapping,
} from "../../../infrastructure/api/metaframework.api";
import ControlEvidencePanel from "./ControlEvidencePanel";

interface ControlDetailDialogProps {
  open: boolean;
  onClose: () => void;
  controlId: string;
}

const WEIGHT_COLORS: Record<string, string> = {
  critical: "#DC2626",
  high: "#EA580C",
  medium: "#CA8A04",
  low: "#16A34A",
};

const STRM_COLORS: Record<string, string> = {
  equal_to: "#059669",
  subset_of: "#2563EB",
  superset_of: "#7C3AED",
  intersects_with: "#CA8A04",
  no_relationship: "#9CA3AF",
};

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null;
}

export default function ControlDetailDialog({ open, onClose, controlId }: ControlDetailDialogProps) {
  const [tab, setTab] = useState(0);
  const { data: control, isLoading: ctrlLoading } = useCommonControl(controlId);
  const { data: mappings, isLoading: mapLoading } = useMappingsForControl(controlId);
  const { data: impls } = useImplementations();
  const updateImpl = useUpdateImplementation();

  const impl = impls?.implementations?.find((i) => i.commonControlId === controlId);
  const [editStatus, setEditStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<string>(impl?.status || "not_started");
  const [newNotes, setNewNotes] = useState(impl?.implementationNotes || "");
  const [saveError, setSaveError] = useState("");

  if (ctrlLoading) return <LinearProgress />;
  if (!control) return null;

  const handleSave = async () => {
    try {
      setSaveError("");
      await updateImpl.mutateAsync({ controlId, status: newStatus, implementationNotes: newNotes || undefined });
      setEditStatus(false);
    } catch {
      setSaveError("Failed to update implementation");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
          <Chip label={control.code} size="small" color="primary" variant="outlined" />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>{control.title}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Chip label={control.domain} size="small" variant="outlined" />
          <Chip
            label={control.controlWeight}
            size="small"
            sx={{
              color: "#fff",
              backgroundColor: WEIGHT_COLORS[control.controlWeight] || "#6B7280",
            }}
          />
          {impl && (
            <Chip
              label={impl.status.replace(/_/g, " ")}
              size="small"
              color={impl.status === "implemented" ? "success" : impl.status === "in_progress" ? "info" : "default"}
            />
          )}
        </Box>
      </DialogTitle>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 2 }}>
        <Tab label="Overview" />
        <Tab label={`Mapped Requirements (${mappings?.length || 0})`} />
        <Tab label="Implementation" />
        <Tab
          label={
            <Badge badgeContent={impl?.evidenceIds?.length || 0} color="primary" size="small" sx={{ "& .MuiBadge-badge": { fontSize: "0.6rem", height: 16, minWidth: 16 } }}>
              <Typography variant="body2">Evidence & Monitoring</Typography>
            </Badge>
          }
        />
      </Tabs>

      <DialogContent dividers>
        <TabPanel value={tab} index={0}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
              <Typography variant="overline" color="text.secondary">Description</Typography>
              <Typography variant="body2">{control.description || "No description"}</Typography>
            </Box>
            <Box>
              <Typography variant="overline" color="text.secondary">Objective</Typography>
              <Typography variant="body2">{control.objective || "No objective defined"}</Typography>
            </Box>
            <Box>
              <Typography variant="overline" color="text.secondary">Assessment Criteria</Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {control.assessmentCriteria || "No criteria defined"}
              </Typography>
            </Box>
            {control.evidenceRequestList && control.evidenceRequestList.length > 0 && (
              <Box>
                <Typography variant="overline" color="text.secondary">Evidence Requests</Typography>
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
                  {control.evidenceRequestList.map((ev, i) => (
                    <Chip key={i} label={ev} size="small" variant="outlined" icon={<LinkIcon />} />
                  ))}
                </Box>
              </Box>
            )}
            {control.implementationGuidance && (
              <Box>
                <Typography variant="overline" color="text.secondary">Implementation Guidance</Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{control.implementationGuidance}</Typography>
              </Box>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          {mapLoading ? (
            <LinearProgress />
          ) : !mappings || mappings.length === 0 ? (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <Typography color="text.secondary">No STRM mappings for this control yet</Typography>
            </Box>
          ) : (
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Requirement</TableCell>
                    <TableCell>Framework</TableCell>
                    <TableCell>STRM Type</TableCell>
                    <TableCell>Strength</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mappings.map((m: StrMapping) => {
                    const req = m.requirement;
                    const reg = req?.regulation;
                    return (
                      <TableRow key={m.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {req?.code && `${req.code}: `}{req?.title || "Unknown"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {reg ? (
                            <Chip label={`${reg.code}`} size="small" variant="outlined" />
                          ) : "--"}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={m.relationshipType.replace(/_/g, " ")}
                            size="small"
                            sx={{
                              backgroundColor: `${STRM_COLORS[m.relationshipType]}18`,
                              color: STRM_COLORS[m.relationshipType],
                              fontWeight: 600,
                              border: `1px solid ${STRM_COLORS[m.relationshipType]}44`,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Box
                              sx={{
                                width: 48,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: "#E5E7EB",
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  width: `${m.strength * 10}%`,
                                  height: "100%",
                                  backgroundColor: m.strength >= 8 ? "#059669" : m.strength >= 5 ? "#CA8A04" : "#EF4444",
                                  borderRadius: 3,
                                }}
                              />
                            </Box>
                            <Typography variant="caption">{m.strength}/10</Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>

        <TabPanel value={tab} index={2}>
          {!editStatus ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="overline" color="text.secondary">Status</Typography>
                <Tooltip title="Edit">
                  <IconButton size="small" onClick={() => { setNewStatus(impl?.status || "not_started"); setNewNotes(impl?.implementationNotes || ""); setEditStatus(true); }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                {impl ? (
                  <Chip
                    label={impl.status.replace(/_/g, " ")}
                    color={impl.status === "implemented" ? "success" : impl.status === "in_progress" ? "info" : impl.status === "needs_rework" ? "warning" : "default"}
                    size="medium"
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">Not started</Typography>
                )}
              </Box>
              {impl?.implementationNotes && (
                <Box>
                  <Typography variant="overline" color="text.secondary">Notes</Typography>
                  <Typography variant="body2">{impl.implementationNotes}</Typography>
                </Box>
              )}
              {impl?.dueDate && (
                <Box>
                  <Typography variant="overline" color="text.secondary">Due Date</Typography>
                  <Typography variant="body2">{impl.dueDate}</Typography>
                </Box>
              )}
              {impl?.completedAt && (
                <Box>
                  <Typography variant="overline" color="text.secondary">Completed</Typography>
                  <Typography variant="body2">{new Date(impl.completedAt).toLocaleDateString()}</Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {saveError && <Alert severity="error">{saveError}</Alert>}
              <TextField
                select
                label="Status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                fullWidth
                size="small"
              >
                {[
                  "not_started", "draft", "in_progress",
                  "awaiting_review", "awaiting_approval",
                  "implemented", "needs_rework", "not_applicable",
                ].map((s) => (
                  <MenuItem key={s} value={s}>
                    {s.replace(/_/g, " ")}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Notes"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                fullWidth
                multiline
                rows={3}
                size="small"
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" size="small" onClick={handleSave} disabled={updateImpl.isPending}>
                  {updateImpl.isPending ? "Saving..." : "Save"}
                </Button>
                <Button variant="outlined" size="small" onClick={() => setEditStatus(false)}>Cancel</Button>
              </Box>
            </Box>
          )}
        </TabPanel>

        <TabPanel value={tab} index={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <ControlEvidencePanel
                controlId={controlId}
                evidenceIds={impl?.evidenceIds || []}
                onUpdateEvidence={(ids) => {
                  setSaveError("");
                  updateImpl.mutate(
                    { controlId, evidenceIds: ids },
                    {
                      onError: () => setSaveError("Failed to update evidence links"),
                    },
                  );
                }}
              />
            </Box>

            <Divider />

            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, display: "block", mb: 1 }}>
                Collection Status
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" color="text.secondary">Evidence Collected:</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {impl?.evidenceIds?.length || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">/</Typography>
                <Typography variant="body2" color="text.secondary">Requested:</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {control.evidenceRequestList?.length || 0}
                </Typography>
              </Box>
              {control.evidenceRequestList && control.evidenceRequestList.length > 0 && (
                <Box sx={{ mt: 1.5 }}>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(
                      ((impl?.evidenceIds?.length || 0) / control.evidenceRequestList.length) * 100,
                      100,
                    )}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#E5E7EB",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        backgroundColor:
                          (impl?.evidenceIds?.length || 0) >= control.evidenceRequestList.length
                            ? "#059669"
                            : (impl?.evidenceIds?.length || 0) > 0
                              ? "#CA8A04"
                              : "#EF4444",
                      },
                    }}
                  />
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1.5 }}>
                    {control.evidenceRequestList.map((ev, i) => {
                      const collected = (impl?.evidenceIds?.length || 0) >= i + 1;
                      return (
                        <Chip
                          key={i}
                          label={ev}
                          size="small"
                          variant="outlined"
                          color={collected ? "success" : "default"}
                          icon={collected ? undefined : undefined}
                        />
                      );
                    })}
                  </Box>
                </Box>
              )}
            </Box>

            <Divider />

            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, display: "block", mb: 1 }}>
                Implementation Due Date
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  type="date"
                  size="small"
                  value={impl?.dueDate ? impl.dueDate.split("T")[0] : ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateImpl.mutate({ controlId, dueDate: val || null });
                  }}
                  sx={{ minWidth: 180 }}
                  InputLabelProps={{ shrink: true }}
                />
                {impl?.dueDate && new Date(impl.dueDate) < new Date() && (
                  <Chip label="OVERDUE" size="small" color="error" />
                )}
              </Box>
            </Box>
          </Box>
        </TabPanel>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
