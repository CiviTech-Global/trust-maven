import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box, Typography,
} from "@mui/material";
import { useCreateTreatment } from "../../../infrastructure/api/treatments.api";

interface TreatRiskModalProps {
  open: boolean;
  onClose: () => void;
  riskId: string;
  riskTitle: string;
}

const STRATEGIES = [
  { value: "avoid", label: "Avoid" },
  { value: "mitigate", label: "Mitigate" },
  { value: "transfer", label: "Transfer" },
  { value: "accept", label: "Accept" },
];

export default function TreatRiskModal({ open, onClose, riskId, riskTitle }: TreatRiskModalProps) {
  const [strategy, setStrategy] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const createTreatment = useCreateTreatment();

  const handleSubmit = async () => {
    if (!strategy || !description) return;
    await createTreatment.mutateAsync({
      riskId,
      strategy,
      description,
      dueDate: dueDate || undefined,
    });
    setStrategy(""); setDescription(""); setDueDate("");
    onClose();
  };

  const handleClose = () => {
    setStrategy(""); setDescription(""); setDueDate("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Treatment Plan</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {riskTitle}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField select label="Strategy" value={strategy} onChange={(e) => setStrategy(e.target.value)} required fullWidth>
            {STRATEGIES.map((s) => (
              <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
            ))}
          </TextField>
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} required fullWidth />
          <TextField label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} fullWidth slotProps={{ inputLabel: { shrink: true } }} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!strategy || !description || createTreatment.isPending}>
          {createTreatment.isPending ? "Creating..." : "Create Treatment"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
