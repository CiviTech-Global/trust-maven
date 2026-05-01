import { useState } from "react";
import {
  Box, Typography, Button, Card, CardContent, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem,
} from "@mui/material";
import { MonitorHeart as MonitorIcon } from "@mui/icons-material";
import { useMonitoringDashboard, useFailingControls, useRecordMonitoringEvent } from "../../../infrastructure/api/controlMonitoring.api";
import { useControls } from "../../../infrastructure/api/controls.api";

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  healthy: { bg: "#D1FAE5", color: "#065F46", label: "Healthy" },
  at_risk: { bg: "#FEF3C7", color: "#92400E", label: "At Risk" },
  failing: { bg: "#FEE2E2", color: "#9F1239", label: "Failing" },
  not_monitored: { bg: "#F1F5F9", color: "#475569", label: "Not Monitored" },
};

const EVENT_STATUS_OPTIONS = [
  { value: "pass", label: "Pass" },
  { value: "fail", label: "Fail" },
  { value: "error", label: "Error" },
  { value: "skipped", label: "Skipped" },
];

export default function ControlMonitoringPage() {
  const [recordOpen, setRecordOpen] = useState(false);
  const [selectedControlId, setSelectedControlId] = useState("");
  const [eventStatus, setEventStatus] = useState("pass");
  const [eventNotes, setEventNotes] = useState("");

  const { data: dashboard, isLoading: dashLoading } = useMonitoringDashboard();
  const { data: failingControls } = useFailingControls();
  const { data: allControls } = useControls();
  const recordEvent = useRecordMonitoringEvent();

  const handleRecord = async () => {
    if (!selectedControlId || !eventStatus) return;
    await recordEvent.mutateAsync({
      controlId: selectedControlId,
      status: eventStatus,
      notes: eventNotes || undefined,
    });
    setRecordOpen(false);
    setSelectedControlId("");
    setEventStatus("pass");
    setEventNotes("");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Control Monitoring</Typography>
        <Button variant="contained" startIcon={<MonitorIcon />} onClick={() => setRecordOpen(true)}>
          Record Check
        </Button>
      </Box>

      {dashLoading && <LinearProgress sx={{ mb: 2 }} />}

      {dashboard && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2, mb: 3 }}>
          {(["healthy", "at_risk", "failing", "not_monitored", "overdue"] as const).map((key) => (
            <Card key={key} sx={{ borderLeft: `4px solid ${STATUS_COLORS[key]?.color || "#6366F1"}` }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h2" sx={{ color: STATUS_COLORS[key]?.color || "#6366F1" }}>
                  {dashboard.counts[key]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {key === "overdue" ? "Overdue" : STATUS_COLORS[key]?.label || key}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Typography variant="h3" sx={{ mb: 2 }}>Failing & At-Risk Controls</Typography>

      {(!failingControls || failingControls.length === 0) ? (
        <Alert severity="success">All monitored controls are healthy</Alert>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Control</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Consecutive Failures</TableCell>
                <TableCell>Last Monitored</TableCell>
                <TableCell>Next Test Due</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {failingControls.map((ctrl: any) => (
                <TableRow key={ctrl.id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight={500}>{ctrl.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={STATUS_COLORS[ctrl.monitoringStatus]?.label || ctrl.monitoringStatus}
                      size="small"
                      sx={{
                        backgroundColor: STATUS_COLORS[ctrl.monitoringStatus]?.bg,
                        color: STATUS_COLORS[ctrl.monitoringStatus]?.color,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>{ctrl.consecutiveFailures}</TableCell>
                  <TableCell>
                    {ctrl.lastMonitoredAt ? new Date(ctrl.lastMonitoredAt).toLocaleDateString() : "--"}
                  </TableCell>
                  <TableCell>
                    {ctrl.nextTestDue ? new Date(ctrl.nextTestDue).toLocaleDateString() : "--"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={recordOpen} onClose={() => setRecordOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Record Monitoring Check</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "8px !important" }}>
          <TextField
            select
            label="Control"
            value={selectedControlId}
            onChange={(e) => setSelectedControlId(e.target.value)}
            fullWidth
          >
            {allControls?.map((c: any) => (
              <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Result"
            value={eventStatus}
            onChange={(e) => setEventStatus(e.target.value)}
          >
            {EVENT_STATUS_OPTIONS.map((s) => (
              <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Notes"
            value={eventNotes}
            onChange={(e) => setEventNotes(e.target.value)}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRecordOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleRecord}
            disabled={!selectedControlId || recordEvent.isPending}
          >
            {recordEvent.isPending ? "Recording..." : "Record"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
