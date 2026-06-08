import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, Chip, LinearProgress, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Alert, Divider, TextField,
} from "@mui/material";
import { useState } from "react";
import { usePolicy } from "../../../infrastructure/api/policies.api";
import {
  useDefaultWorkflow, useExecuteTransition, useExecutionHistory,
} from "../../../infrastructure/api/workflow.api";
import { useCommonControls, useUnifiedCompliance } from "../../../infrastructure/api/metaframework.api";
import { useEvidence } from "../../../infrastructure/api/evidence.api";

interface PolicyDetailDialogProps {
  open: boolean;
  onClose: () => void;
  policyId: string;
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  draft: { bg: "#F1F5F9", color: "#475569" },
  review: { bg: "#FEF3C7", color: "#92400E" },
  approved: { bg: "#D1FAE5", color: "#065F46" },
  retired: { bg: "#FEE2E2", color: "#9F1239" },
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  review: "Review",
  approved: "Approved",
  retired: "Retired",
};

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null;
}

export default function PolicyDetailDialog({ open, onClose, policyId }: PolicyDetailDialogProps) {
  const [tab, setTab] = useState(0);
  const [controlSearch, setControlSearch] = useState("");
  const [comment, setComment] = useState("");
  const [transitionError, setTransitionError] = useState("");

  const { data: policy, isLoading } = usePolicy(policyId);
  const { data: workflow, isLoading: wfLoading } = useDefaultWorkflow("policy");
  const executeTransition = useExecuteTransition();
  const { data: execHistory, isLoading: historyLoading } = useExecutionHistory(
    workflow?.id || null,
    policyId,
  );
  const { data: controls, isLoading: controlsLoading } = useCommonControls(
    controlSearch ? { search: controlSearch } : undefined,
  );
  const { data: evidenceItems, isLoading: evidenceLoading } = useEvidence({
    entityType: "policy",
    entityId: policyId,
  });
  const { data: compliance, isLoading: complianceLoading } = useUnifiedCompliance();

  if (isLoading) return <LinearProgress />;
  if (!policy) return null;

  const availableTransitions = workflow?.transitions?.filter(
    (t) => t.from === policy.status,
  ) || [];

  const handleTransition = async (toState: string) => {
    if (!workflow) return;
    try {
      setTransitionError("");
      await executeTransition.mutateAsync({
        workflowId: workflow.id,
        entityType: "policy",
        entityId: policy.id,
        fromState: policy.status,
        toState,
        comment: comment || undefined,
      });
      setComment("");
    } catch {
      setTransitionError("Failed to execute transition");
    }
  };

  const nextReviewDate = policy.approvedAt
    ? new Date(new Date(policy.approvedAt).getTime() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
    : "--";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>{policy.title}</Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Chip
            label={STATUS_LABELS[policy.status] || policy.status}
            size="small"
            sx={{
              backgroundColor: STATUS_COLORS[policy.status]?.bg || "#F1F5F9",
              color: STATUS_COLORS[policy.status]?.color || "#475569",
              fontWeight: 500,
            }}
          />
          <Chip label={`v${policy.version}`} size="small" variant="outlined" />
        </Box>
      </DialogTitle>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 2 }}>
        <Tab label="Overview" />
        <Tab label="Workflow Transitions" />
        <Tab label={`Controls (${controls?.length || 0})`} />
        <Tab label={`Regulations (${compliance?.regulations?.length || 0})`} />
        <Tab label={`Evidence (${evidenceItems?.length || 0})`} />
        <Tab label="Review History" />
      </Tabs>

      <DialogContent dividers>
        <TabPanel value={tab} index={0}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
              <Typography variant="overline" color="text.secondary">Content</Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {policy.content || "No content"}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Box>
                <Typography variant="overline" color="text.secondary">Version</Typography>
                <Typography variant="body2">v{policy.version}</Typography>
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary">Status</Typography>
                <Box>
                  <Chip
                    label={STATUS_LABELS[policy.status] || policy.status}
                    size="small"
                    sx={{
                      backgroundColor: STATUS_COLORS[policy.status]?.bg || "#F1F5F9",
                      color: STATUS_COLORS[policy.status]?.color || "#475569",
                      fontWeight: 500,
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary">Owner</Typography>
                <Typography variant="body2">
                  {policy.owner ? `${policy.owner.firstName} ${policy.owner.lastName}` : "Unassigned"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary">Approved At</Typography>
                <Typography variant="body2">
                  {policy.approvedAt ? new Date(policy.approvedAt).toLocaleDateString() : "--"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary">Created</Typography>
                <Typography variant="body2">{new Date(policy.createdAt).toLocaleDateString()}</Typography>
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary">Updated</Typography>
                <Typography variant="body2">{new Date(policy.updatedAt).toLocaleDateString()}</Typography>
              </Box>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          {wfLoading ? (
            <LinearProgress />
          ) : !workflow ? (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <Typography color="text.secondary">No workflow configured for policies</Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {transitionError && <Alert severity="error">{transitionError}</Alert>}
              <Typography variant="overline" color="text.secondary">Available Transitions</Typography>
              {availableTransitions.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No transitions available from the current state
                </Typography>
              ) : (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {availableTransitions.map((t) => (
                    <Button
                      key={`${t.from}-${t.to}`}
                      variant="contained"
                      size="small"
                      onClick={() => handleTransition(t.to)}
                      disabled={executeTransition.isPending}
                    >
                      {t.label || `Move to ${t.to}`}
                    </Button>
                  ))}
                </Box>
              )}
              {availableTransitions.some((t) => t.requireComment) && (
                <TextField
                  label="Comment (required)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  multiline
                  rows={2}
                  size="small"
                  fullWidth
                />
              )}
              <Divider />
              <Typography variant="overline" color="text.secondary">Execution History</Typography>
              {historyLoading ? (
                <LinearProgress />
              ) : !execHistory || execHistory.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No history yet</Typography>
              ) : (
                <TableContainer sx={{ maxHeight: 300 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>By</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {execHistory.map((h: any) => (
                        <TableRow key={h.id} hover>
                          <TableCell>
                            <Chip
                              label={STATUS_LABELS[h.fromState] || h.fromState}
                              size="small"
                              sx={{ backgroundColor: STATUS_COLORS[h.fromState]?.bg, color: STATUS_COLORS[h.fromState]?.color }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={STATUS_LABELS[h.toState] || h.toState}
                              size="small"
                              sx={{ backgroundColor: STATUS_COLORS[h.toState]?.bg, color: STATUS_COLORS[h.toState]?.color }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{h.transitionedBy || "--"}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{h.comment || "--"}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{new Date(h.createdAt).toLocaleDateString()}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Search controls"
              value={controlSearch}
              onChange={(e) => setControlSearch(e.target.value)}
              size="small"
              fullWidth
            />
            {controlsLoading ? (
              <LinearProgress />
            ) : !controls || controls.length === 0 ? (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography color="text.secondary">No common controls found</Typography>
              </Box>
            ) : (
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Domain</TableCell>
                      <TableCell>Weight</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {controls.map((c: any) => (
                      <TableRow key={c.id} hover>
                        <TableCell>
                          <Chip label={c.code} size="small" color="primary" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>{c.title}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={c.domain} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Chip label={c.controlWeight} size="small" variant="outlined" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tab} index={3}>
          {complianceLoading ? (
            <LinearProgress />
          ) : !compliance?.regulations || compliance.regulations.length === 0 ? (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <Typography color="text.secondary">No regulations found</Typography>
            </Box>
          ) : (
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Compliance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {compliance.regulations.map((r: any) => (
                    <TableRow key={r.regulationId} hover>
                      <TableCell>
                        <Chip label={r.regulationCode} size="small" color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>{r.regulationName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 80, height: 6, borderRadius: 3, bgcolor: "#E5E7EB", overflow: "hidden" }}>
                            <Box
                              sx={{
                                width: `${r.compliancePercent}%`,
                                height: "100%",
                                borderRadius: 3,
                                bgcolor: r.compliancePercent >= 80 ? "#059669" : r.compliancePercent >= 50 ? "#CA8A04" : "#EF4444",
                              }}
                            />
                          </Box>
                          <Typography variant="caption">{r.compliancePercent}%</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>

        <TabPanel value={tab} index={4}>
          {evidenceLoading ? (
            <LinearProgress />
          ) : !evidenceItems || evidenceItems.length === 0 ? (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <Typography color="text.secondary">No evidence linked to this policy</Typography>
            </Box>
          ) : (
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Uploaded By</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {evidenceItems.map((e: any) => (
                    <TableRow key={e.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>{e.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={e.status} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {e.uploadedBy ? `${e.uploadedBy.firstName} ${e.uploadedBy.lastName}` : "--"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{new Date(e.createdAt).toLocaleDateString()}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>

        <TabPanel value={tab} index={5}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
              <Typography variant="overline" color="text.secondary">Next Review Due</Typography>
              <Typography variant="body2">{nextReviewDate}</Typography>
            </Box>
            <Divider />
            <Typography variant="overline" color="text.secondary">Past Reviews</Typography>
            {historyLoading ? (
              <LinearProgress />
            ) : !execHistory || execHistory.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No review history available</Typography>
            ) : (
              <TableContainer sx={{ maxHeight: 300 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Transition</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Comment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {execHistory.map((h: any) => (
                      <TableRow key={h.id} hover>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Chip
                              label={STATUS_LABELS[h.fromState] || h.fromState}
                              size="small"
                              sx={{ backgroundColor: STATUS_COLORS[h.fromState]?.bg, color: STATUS_COLORS[h.fromState]?.color }}
                            />
                            <Typography variant="caption">&rarr;</Typography>
                            <Chip
                              label={STATUS_LABELS[h.toState] || h.toState}
                              size="small"
                              sx={{ backgroundColor: STATUS_COLORS[h.toState]?.bg, color: STATUS_COLORS[h.toState]?.color }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{new Date(h.createdAt).toLocaleDateString()}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{h.comment || "--"}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </TabPanel>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
