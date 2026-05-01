import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Chip, Card, CardContent,
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Alert, IconButton,
} from "@mui/material";
import { ArrowBack as BackIcon, Add as AddIcon } from "@mui/icons-material";
import { useRisk } from "../../../infrastructure/api/risks.api";
import { useAssessments } from "../../../infrastructure/api/assessments.api";
import { useTreatments } from "../../../infrastructure/api/treatments.api";
import { useControls } from "../../../infrastructure/api/controls.api";
import { useEntityAuditLogs } from "../../../infrastructure/api/auditLogs.api";
import RiskChip from "../../components/common/RiskChip";
import AssessRiskModal from "./AssessRiskModal";
import TreatRiskModal from "./TreatRiskModal";

export default function RiskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [assessOpen, setAssessOpen] = useState(false);
  const [treatOpen, setTreatOpen] = useState(false);

  const { data: risk, isLoading, error } = useRisk(id || null);
  const { data: assessments } = useAssessments(id || null);
  const { data: treatments } = useTreatments(id || null);
  const { data: controls } = useControls({ riskId: id || undefined });
  const { data: auditLogs } = useEntityAuditLogs("risk", id || null);

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
                  <TableCell>Likelihood</TableCell>
                  <TableCell>Impact</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Methodology</TableCell>
                  <TableCell>Assessor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assessments?.map((a: any) => (
                  <TableRow key={a.id}>
                    <TableCell>{new Date(a.assessedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{a.likelihood}</TableCell>
                    <TableCell>{a.impact}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600} sx={{
                        color: a.likelihood * a.impact >= 15 ? "#E11D48" : a.likelihood * a.impact >= 10 ? "#D97706" : "#059669",
                      }}>
                        {a.likelihood * a.impact}
                      </Typography>
                    </TableCell>
                    <TableCell>{a.methodology || "--"}</TableCell>
                    <TableCell>{a.assessor ? `${a.assessor.firstName} ${a.assessor.lastName}` : "--"}</TableCell>
                  </TableRow>
                ))}
                {(!assessments || assessments.length === 0) && (
                  <TableRow><TableCell colSpan={6} align="center">No assessments yet</TableCell></TableRow>
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
                  <TableCell>Responsible</TableCell>
                  <TableCell>Due Date</TableCell>
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
                    <TableCell>{t.responsible ? `${t.responsible.firstName} ${t.responsible.lastName}` : "--"}</TableCell>
                    <TableCell>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "--"}</TableCell>
                  </TableRow>
                ))}
                {(!treatments || treatments.length === 0) && (
                  <TableRow><TableCell colSpan={5} align="center">No treatments yet</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {tab === 3 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Effectiveness</TableCell>
                <TableCell>Owner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {controls?.map((c: any) => (
                <TableRow key={c.id}>
                  <TableCell>{c.title}</TableCell>
                  <TableCell><Chip label={c.type} size="small" /></TableCell>
                  <TableCell>
                    <Chip
                      label={c.effectiveness?.replace("_", " ")}
                      size="small"
                      color={c.effectiveness === "effective" ? "success" : c.effectiveness === "ineffective" ? "error" : "warning"}
                    />
                  </TableCell>
                  <TableCell>{c.owner ? `${c.owner.firstName} ${c.owner.lastName}` : "--"}</TableCell>
                </TableRow>
              ))}
              {(!controls || controls.length === 0) && (
                <TableRow><TableCell colSpan={4} align="center">No linked controls</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
    </Box>
  );
}
