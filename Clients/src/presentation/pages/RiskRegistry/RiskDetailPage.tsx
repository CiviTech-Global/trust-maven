import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Chip, Card, CardContent,
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Alert, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip,
} from "@mui/material";
import {
  ArrowBack as BackIcon, Add as AddIcon, Edit as EditIcon,
  CheckCircle as ApproveIcon, Cancel as RejectIcon, Delete as DeleteIcon,
} from "@mui/icons-material";
import { useRisk } from "../../../infrastructure/api/risks.api";
import { useAssessments } from "../../../infrastructure/api/assessments.api";
import { useTreatments } from "../../../infrastructure/api/treatments.api";
import { useControls } from "../../../infrastructure/api/controls.api";
import { useEntityAuditLogs } from "../../../infrastructure/api/auditLogs.api";
import RiskChip from "../../components/common/RiskChip";
import AssessRiskModal from "./AssessRiskModal";
import TreatRiskModal from "./TreatRiskModal";
import EditRiskModal from "./EditRiskModal";
import EditTreatmentModal from "./EditTreatmentModal";
import { useApproveAssessment, useRejectAssessment } from "../../../infrastructure/api/assessments.api";
import { useApproveTreatment, useRejectTreatment } from "../../../infrastructure/api/treatments.api";
import { useRiskControlMappings, useAddRiskControlMapping, useRemoveRiskControlMapping } from "../../../infrastructure/api/riskControlMappings.api";


export default function RiskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [assessOpen, setAssessOpen] = useState(false);
  const [treatOpen, setTreatOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTreatment, setEditTreatment] = useState<any | null>(null);
  const [linkControlOpen, setLinkControlOpen] = useState(false);

  const { data: risk, isLoading, error } = useRisk(id || null);
  const { data: assessments } = useAssessments(id || null);
  const { data: treatments } = useTreatments(id || null);
  const { data: controls } = useControls({ riskId: id || undefined });
  const { data: auditLogs } = useEntityAuditLogs("risk", id || null);
  const { data: riskControlMappings } = useRiskControlMappings(id || null);
  const { data: allControls } = useControls();
  const approveAssessment = useApproveAssessment();
  const rejectAssessment = useRejectAssessment();
  const approveTreatment = useApproveTreatment();
  const rejectTreatment = useRejectTreatment();
  const addControlMapping = useAddRiskControlMapping();
  const removeControlMapping = useRemoveRiskControlMapping();

  if (isLoading) return <LinearProgress />;
  if (error || !risk) return <Alert severity="error">Risk not found</Alert>;

  const latestAssessment = (risk as any).assessments?.[0];
  const score = latestAssessment ? latestAssessment.likelihood * latestAssessment.impact : null;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <IconButton onClick={() => navigate("/risks")}>
          <BackIcon />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1">{risk.title}</Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <RiskChip value={risk.domain} type="domain" />
            <RiskChip value={risk.status} type="status" />
            {score !== null && (
              <Chip
                label={`Score: ${score}`}
                size="small"
                sx={{
                  fontWeight: 600,
                  backgroundColor: score >= 15 ? "#FEE2E2" : score >= 10 ? "#FEF3C7" : "#DBEAFE",
                  color: score >= 15 ? "#9F1239" : score >= 10 ? "#92400E" : "#1E40AF",
                }}
              />
            )}
          </Box>
        </Box>
        <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setEditOpen(true)}>
          Edit
        </Button>
      </Box>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}>
        <Tab label="Overview" />
        <Tab label={`Assessments (${assessments?.length || 0})`} />
        <Tab label={`Treatments (${treatments?.length || 0})`} />
        <Tab label={`Controls (${controls?.length || 0})`} />
        <Tab label="History" />
      </Tabs>

      {tab === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2 }}>Details</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Description</Typography>
                <Typography variant="body1">{risk.description || "No description"}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Owner</Typography>
                <Typography variant="body1">
                  {(risk as any).owner ? `${(risk as any).owner.firstName} ${(risk as any).owner.lastName}` : "--"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Project</Typography>
                <Typography variant="body1">{(risk as any).project?.name || "--"}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Created</Typography>
                <Typography variant="body1">{new Date(risk.createdAt).toLocaleDateString()}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Risk Appetite Threshold</Typography>
                <Typography variant="body1">
                  {(risk as any).riskAppetiteThreshold || "--"}
                  {score !== null && (risk as any).riskAppetiteThreshold && score > (risk as any).riskAppetiteThreshold && (
                    <Chip label="Exceeds Appetite" size="small" color="error" sx={{ ml: 1 }} />
                  )}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {tab === 1 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAssessOpen(true)}>
              Add Assessment
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Likelihood</TableCell>
                  <TableCell>Impact</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Assessor</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assessments?.map((a: any) => (
                  <TableRow key={a.id}>
                    <TableCell>{new Date(a.assessedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip label={a.assessmentType || "inherent"} size="small" color={a.assessmentType === "residual" ? "secondary" : "primary"} />
                    </TableCell>
                    <TableCell>{a.likelihood}</TableCell>
                    <TableCell>{a.impact}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600} sx={{
                        color: a.likelihood * a.impact >= 15 ? "#E11D48" : a.likelihood * a.impact >= 10 ? "#D97706" : "#059669",
                      }}>
                        {a.likelihood * a.impact}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={a.approvalStatus || "draft"}
                        size="small"
                        color={a.approvalStatus === "approved" ? "success" : a.approvalStatus === "rejected" ? "error" : a.approvalStatus === "pending_approval" ? "warning" : "default"}
                      />
                    </TableCell>
                    <TableCell>{a.assessor ? `${a.assessor.firstName} ${a.assessor.lastName}` : "--"}</TableCell>
                    <TableCell align="right">
                      {a.approvalStatus !== "approved" && (
                        <Tooltip title="Approve">
                          <IconButton size="small" color="success" onClick={() => id && approveAssessment.mutateAsync({ riskId: id, assessmentId: a.id })}>
                            <ApproveIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {a.approvalStatus !== "rejected" && (
                        <Tooltip title="Reject">
                          <IconButton size="small" color="error" onClick={() => id && rejectAssessment.mutateAsync({ riskId: id, assessmentId: a.id })}>
                            <RejectIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {(!assessments || assessments.length === 0) && (
                  <TableRow><TableCell colSpan={8} align="center">No assessments yet</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {tab === 2 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setTreatOpen(true)}>
              Add Treatment
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Strategy</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Approval</TableCell>
                  <TableCell>Responsible</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {treatments?.map((t: any) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <Chip label={t.strategy} size="small" />
                    </TableCell>
                    <TableCell>{t.description}</TableCell>
                    <TableCell>
                      <Chip
                        label={t.status}
                        size="small"
                        color={t.status === "completed" ? "success" : t.status === "in_progress" ? "info" : "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={t.approvalStatus || "draft"}
                        size="small"
                        color={t.approvalStatus === "approved" ? "success" : t.approvalStatus === "rejected" ? "error" : t.approvalStatus === "pending_approval" ? "warning" : "default"}
                      />
                    </TableCell>
                    <TableCell>{t.responsible ? `${t.responsible.firstName} ${t.responsible.lastName}` : "--"}</TableCell>
                    <TableCell>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "--"}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => setEditTreatment(t)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {t.approvalStatus !== "approved" && (
                        <Tooltip title="Approve">
                          <IconButton size="small" color="success" onClick={() => id && approveTreatment.mutateAsync({ riskId: id, treatmentId: t.id })}>
                            <ApproveIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {t.approvalStatus !== "rejected" && (
                        <Tooltip title="Reject">
                          <IconButton size="small" color="error" onClick={() => id && rejectTreatment.mutateAsync({ riskId: id, treatmentId: t.id })}>
                            <RejectIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {(!treatments || treatments.length === 0) && (
                  <TableRow><TableCell colSpan={7} align="center">No treatments yet</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {tab === 3 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setLinkControlOpen(true)}>
              Link Control
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Effectiveness</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {riskControlMappings?.map((m: any) => (
                  <TableRow key={m.id}>
                    <TableCell>{m.control?.title}</TableCell>
                    <TableCell><Chip label={m.control?.type} size="small" /></TableCell>
                    <TableCell>
                      <Chip
                        label={m.control?.effectiveness?.replace("_", " ")}
                        size="small"
                        color={m.control?.effectiveness === "effective" ? "success" : m.control?.effectiveness === "ineffective" ? "error" : "warning"}
                      />
                    </TableCell>
                    <TableCell>{m.control?.owner ? `${m.control.owner.firstName} ${m.control.owner.lastName}` : "--"}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Unlink">
                        <IconButton size="small" color="error" onClick={() => id && removeControlMapping.mutateAsync({ riskId: id, controlId: m.id })}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {(!riskControlMappings || riskControlMappings.length === 0) && (
                  <TableRow><TableCell colSpan={5} align="center">No linked controls</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {linkControlOpen && (
            <Dialog open={true} onClose={() => setLinkControlOpen(false)} maxWidth="sm" fullWidth>
              <DialogTitle>Link Control to Risk</DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 1 }}>
                  {allControls?.filter((c: any) => !riskControlMappings?.some((m: any) => m.controlId === c.id)).map((c: any) => (
                    <Box key={c.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1, borderBottom: "1px solid #eee" }}>
                      <Box>
                        <Typography variant="body1" fontWeight={500}>{c.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{c.type}</Typography>
                      </Box>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={async () => {
                          if (id) {
                            await addControlMapping.mutateAsync({ riskId: id, controlId: c.id });
                          }
                        }}
                      >
                        Link
                      </Button>
                    </Box>
                  ))}
                  {allControls?.filter((c: any) => !riskControlMappings?.some((m: any) => m.controlId === c.id)).length === 0 && (
                    <Typography color="text.secondary" sx={{ py: 2, textAlign: "center" }}>No available controls to link</Typography>
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setLinkControlOpen(false)}>Close</Button>
              </DialogActions>
            </Dialog>
          )}
        </Box>
      )}

      {tab === 4 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Changes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditLogs?.map((log: any) => (
                <TableRow key={log.id}>
                  <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{log.user ? `${log.user.firstName} ${log.user.lastName}` : "--"}</TableCell>
                  <TableCell>
                    <Chip
                      label={log.action}
                      size="small"
                      color={log.action === "create" ? "success" : log.action === "delete" ? "error" : "info"}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis" }}>
                      {Object.keys(log.changes || {}).length > 0 ? JSON.stringify(log.changes) : "--"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              {(!auditLogs || auditLogs.length === 0) && (
                <TableRow><TableCell colSpan={4} align="center">No history</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {assessOpen && id && (
        <AssessRiskModal open={true} onClose={() => setAssessOpen(false)} riskId={id} riskTitle={risk.title} />
      )}
      {treatOpen && id && (
        <TreatRiskModal open={true} onClose={() => setTreatOpen(false)} riskId={id} riskTitle={risk.title} />
      )}
      {editOpen && risk && (
        <EditRiskModal open={true} onClose={() => setEditOpen(false)} risk={risk} />
      )}
      {editTreatment && id && (
        <EditTreatmentModal open={true} onClose={() => setEditTreatment(null)} riskId={id} treatment={editTreatment} />
      )}
    </Box>
  );
}
