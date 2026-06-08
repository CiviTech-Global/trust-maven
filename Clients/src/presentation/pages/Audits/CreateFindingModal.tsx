import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem,
} from "@mui/material";
import { useCreateFinding, useUpdateFinding } from "../../../infrastructure/api/auditMgmt.api";
import { useUsers } from "../../../infrastructure/api/users.api";
import type { AuditFinding } from "../../../domain/interfaces";

interface Props {
  open: boolean;
  onClose: () => void;
  auditId: string;
  editItem?: AuditFinding | null;
}

const SEVERITIES = ["critical", "high", "medium", "low", "informational"];
const STATUSES = ["open", "in_remediation", "remediated", "accepted", "closed"];

export default function CreateFindingModal({ open, onClose, auditId, editItem }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [status, setStatus] = useState("open");
  const [responsibleId, setResponsibleId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const { data: users } = useUsers();
  const createFinding = useCreateFinding();
  const updateFinding = useUpdateFinding();

  useEffect(() => {
    if (open) {
      setTitle(editItem?.title || "");
      setDescription(editItem?.description || "");
      setRecommendation(editItem?.recommendation || "");
      setSeverity(editItem?.severity || "medium");
      setStatus(editItem?.status || "open");
      setResponsibleId(editItem?.responsibleId || "");
      setDueDate(editItem?.dueDate?.split("T")[0] || "");
    }
  }, [open, editItem]);

  const handleSubmit = async () => {
    if (!title || !severity) return;
    const payload = {
      title,
      description: description || null,
      recommendation: recommendation || null,
      severity,
      status,
      responsibleId: responsibleId || null,
      dueDate: dueDate || null,
    };
    if (editItem) {
      await updateFinding.mutateAsync({ auditId, findingId: editItem.id, ...payload });
    } else {
      await createFinding.mutateAsync({ auditId, ...payload } as any);
    }
    onClose();
  };

  const isPending = createFinding.isPending || updateFinding.isPending;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editItem ? "Edit Finding" : "Add Finding"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "8px !important" }}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={2} fullWidth />
        <TextField label="Recommendation" value={recommendation} onChange={(e) => setRecommendation(e.target.value)} multiline rows={2} fullWidth />
        <TextField select label="Severity" value={severity} onChange={(e) => setSeverity(e.target.value)}>
          {SEVERITIES.map((s) => <MenuItem key={s} value={s} sx={{ textTransform: "capitalize" }}>{s}</MenuItem>)}
        </TextField>
        <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => <MenuItem key={s} value={s} sx={{ textTransform: "capitalize" }}>{s.replace("_", " ")}</MenuItem>)}
        </TextField>
        <TextField select label="Assigned To" value={responsibleId} onChange={(e) => setResponsibleId(e.target.value)}>
          <MenuItem value="">Unassigned</MenuItem>
          {users?.map((u) => (
            <MenuItem key={u.id} value={u.id}>{u.firstName} {u.lastName}</MenuItem>
          ))}
        </TextField>
        <TextField label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!title || isPending}>
          {isPending ? "Saving..." : editItem ? "Save Changes" : "Add Finding"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
