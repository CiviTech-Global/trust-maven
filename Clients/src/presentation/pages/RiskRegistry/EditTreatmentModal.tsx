import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box,
} from "@mui/material";
import { useUpdateTreatment } from "../../../infrastructure/api/treatments.api";
import type { RiskTreatment } from "../../../domain/interfaces";
import { TreatmentStrategy } from "../../../domain/enums";

interface EditTreatmentModalProps {
  open: boolean;
  onClose: () => void;
  riskId: string;
  treatment: RiskTreatment;
}

const STRATEGIES = [
  { value: "avoid", label: "Avoid" },
  { value: "mitigate", label: "Mitigate" },
  { value: "transfer", label: "Transfer" },
  { value: "accept", label: "Accept" },
];

const STATUSES = [
  { value: "planned", label: "Planned" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function EditTreatmentModal({ open, onClose, riskId, treatment }: EditTreatmentModalProps) {
  const [strategy, setStrategy] = useState(treatment.strategy);
  const [description, setDescription] = useState(treatment.description);
  const [status, setStatus] = useState(treatment.status);
  const [dueDate, setDueDate] = useState(treatment.dueDate || "");
  const updateTreatment = useUpdateTreatment();

  useEffect(() => {
    setStrategy(treatment.strategy);
    setDescription(treatment.description);
    setStatus(treatment.status);
    setDueDate(treatment.dueDate || "");
  }, [treatment]);

  const handleSubmit = async () => {
    if (!strategy || !description) return;
    await updateTreatment.mutateAsync({
      riskId,
      treatmentId: treatment.id,
      strategy,
      description,
      status,
      dueDate: dueDate || undefined,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Treatment</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField select label="Strategy" value={strategy} onChange={(e) => setStrategy(e.target.value as TreatmentStrategy)} required fullWidth>
            {STRATEGIES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
          </TextField>
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} required fullWidth />
          <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} fullWidth>
            {STATUSES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
          </TextField>
          <TextField label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!strategy || !description || updateTreatment.isPending}>
          {updateTreatment.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
