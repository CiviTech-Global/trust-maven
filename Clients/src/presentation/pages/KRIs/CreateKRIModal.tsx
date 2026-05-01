import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box, Typography,
} from "@mui/material";
import { useCreateKRI, useUpdateKRI, type KRIItem } from "../../../infrastructure/api/kris.api";
import { useRisks } from "../../../infrastructure/api/risks.api";

interface CreateKRIModalProps {
  open: boolean;
  onClose: () => void;
  editKRI?: KRIItem | null;
}

const CATEGORIES = [
  { value: "financial", label: "Financial" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "operational", label: "Operational" },
  { value: "regulatory", label: "Regulatory" },
  { value: "strategic", label: "Strategic" },
];

const FREQUENCIES = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
];

const DIRECTIONS = [
  { value: "below_is_good", label: "Lower is better (breach when above threshold)" },
  { value: "above_is_good", label: "Higher is better (breach when below threshold)" },
];

export default function CreateKRIModal({ open, onClose, editKRI }: CreateKRIModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [thresholdGreen, setThresholdGreen] = useState("");
  const [thresholdAmber, setThresholdAmber] = useState("");
  const [thresholdRed, setThresholdRed] = useState("");
  const [direction, setDirection] = useState("below_is_good");
  const [unit, setUnit] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [riskId, setRiskId] = useState("");

  const createKRI = useCreateKRI();
  const updateKRI = useUpdateKRI();
  const { data: risks } = useRisks();

  useEffect(() => {
    if (editKRI) {
      setName(editKRI.name);
      setDescription(editKRI.description || "");
      setCategory(editKRI.category);
      setCurrentValue(String(editKRI.currentValue));
      setThresholdGreen(String(editKRI.thresholdGreen));
      setThresholdAmber(String(editKRI.thresholdAmber));
      setThresholdRed(String(editKRI.thresholdRed));
      setDirection(editKRI.direction);
      setUnit(editKRI.unit || "");
      setFrequency(editKRI.frequency);
      setRiskId(editKRI.riskId || "");
    }
  }, [editKRI]);

  const handleSubmit = async () => {
    if (!name || !category || !currentValue || !thresholdGreen || !thresholdAmber || !thresholdRed) return;
    const payload = {
      name,
      description: description || undefined,
      category,
      currentValue: parseFloat(currentValue),
      thresholdGreen: parseFloat(thresholdGreen),
      thresholdAmber: parseFloat(thresholdAmber),
      thresholdRed: parseFloat(thresholdRed),
      direction,
      unit: unit || undefined,
      frequency,
      riskId: riskId || undefined,
    };

    if (editKRI) {
      await updateKRI.mutateAsync({ id: editKRI.id, ...payload });
    } else {
      await createKRI.mutateAsync(payload);
    }
    handleClose();
  };

  const handleClose = () => {
    setName(""); setDescription(""); setCategory(""); setCurrentValue("");
    setThresholdGreen(""); setThresholdAmber(""); setThresholdRed("");
    setDirection("below_is_good"); setUnit(""); setFrequency("monthly"); setRiskId("");
    onClose();
  };

  const isSubmitting = createKRI.isPending || updateKRI.isPending;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editKRI ? "Edit KRI" : "Create KRI"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={2} fullWidth />
          <TextField select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} required fullWidth>
            {CATEGORIES.map((c) => <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>)}
          </TextField>
          <TextField select label="Direction" value={direction} onChange={(e) => setDirection(e.target.value)} fullWidth>
            {DIRECTIONS.map((d) => <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>)}
          </TextField>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField label="Current Value" type="number" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} required />
            <TextField label="Unit (optional)" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="e.g., %, days, count" />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Thresholds ({direction === "below_is_good" ? "ascending: green < amber < red" : "descending: green > amber > red"})
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            <TextField label="Green" type="number" value={thresholdGreen} onChange={(e) => setThresholdGreen(e.target.value)} required
              sx={{ "& .MuiOutlinedInput-root": { borderColor: "#059669" } }} />
            <TextField label="Amber" type="number" value={thresholdAmber} onChange={(e) => setThresholdAmber(e.target.value)} required />
            <TextField label="Red" type="number" value={thresholdRed} onChange={(e) => setThresholdRed(e.target.value)} required />
          </Box>
          <TextField select label="Monitoring Frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} fullWidth>
            {FREQUENCIES.map((f) => <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>)}
          </TextField>
          <TextField select label="Linked Risk (optional)" value={riskId} onChange={(e) => setRiskId(e.target.value)} fullWidth>
            <MenuItem value="">None</MenuItem>
            {risks?.map((r: any) => <MenuItem key={r.id} value={r.id}>{r.title}</MenuItem>)}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!name || !category || !currentValue || isSubmitting}>
          {isSubmitting ? "Saving..." : editKRI ? "Save Changes" : "Create KRI"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
