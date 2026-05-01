import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem,
} from "@mui/material";
import { useCreateAudit } from "../../../infrastructure/api/auditMgmt.api";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateAuditModal({ open, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [auditType, setAuditType] = useState("internal");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [scope, setScope] = useState("");

  const createAudit = useCreateAudit();

  const handleSubmit = async () => {
    if (!title || !startDate) return;
    await createAudit.mutateAsync({
      title,
      description: description || undefined,
      auditType,
      startDate,
      endDate: endDate || undefined,
      scope: scope || undefined,
    } as any);
    onClose();
    setTitle(""); setDescription(""); setAuditType("internal"); setStartDate(""); setEndDate(""); setScope("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Audit</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "8px !important" }}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={2} fullWidth />
        <TextField select label="Audit Type" value={auditType} onChange={(e) => setAuditType(e.target.value)}>
          <MenuItem value="internal">Internal</MenuItem>
          <MenuItem value="external">External</MenuItem>
        </TextField>
        <TextField label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} required />
        <TextField label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} InputLabelProps={{ shrink: true }} />
        <TextField label="Scope" value={scope} onChange={(e) => setScope(e.target.value)} multiline rows={2} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!title || !startDate || createAudit.isPending}>
          {createAudit.isPending ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
