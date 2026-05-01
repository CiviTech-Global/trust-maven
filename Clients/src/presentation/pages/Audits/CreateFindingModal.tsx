import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem,
} from "@mui/material";
import { useCreateFinding } from "../../../infrastructure/api/auditMgmt.api";

interface Props {
  open: boolean;
  onClose: () => void;
  auditId: string;
}

const SEVERITIES = ["critical", "high", "medium", "low", "informational"];

export default function CreateFindingModal({ open, onClose, auditId }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [remediationNotes, setRemediationNotes] = useState("");

  const createFinding = useCreateFinding();

  const handleSubmit = async () => {
    if (!title || !severity) return;
    await createFinding.mutateAsync({
      auditId,
      title,
      description: description || undefined,
      severity,
      dueDate: dueDate || undefined,
      remediationNotes: remediationNotes || undefined,
    } as any);
    onClose();
    setTitle(""); setDescription(""); setSeverity("medium"); setDueDate(""); setRemediationNotes("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Finding</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "8px !important" }}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={2} fullWidth />
        <TextField select label="Severity" value={severity} onChange={(e) => setSeverity(e.target.value)}>
          {SEVERITIES.map((s) => <MenuItem key={s} value={s} sx={{ textTransform: "capitalize" }}>{s}</MenuItem>)}
        </TextField>
        <TextField label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} />
        <TextField label="Remediation Notes" value={remediationNotes} onChange={(e) => setRemediationNotes(e.target.value)} multiline rows={2} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!title || createFinding.isPending}>
          {createFinding.isPending ? "Adding..." : "Add Finding"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
