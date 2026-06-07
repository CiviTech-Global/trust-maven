import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box, Typography, CircularProgress, Tooltip, Card, CardContent,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useCreateTreatment } from "../../../infrastructure/api/treatments.api";
import { useAiTreatmentSuggestion } from "../../../infrastructure/api/ai.api";

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
  const [costEstimate, setCostEstimate] = useState("");
  const [progress, setProgress] = useState(0);
  const createTreatment = useCreateTreatment();
  const { data: aiSuggestion, isFetching: aiLoading, refetch: getAiSuggestion } = useAiTreatmentSuggestion(riskId);

  const handleAiSuggest = async () => {
    const result = await getAiSuggestion();
    const first = result.data?.suggestedStrategies?.[0];
    if (first) {
      setStrategy(first.strategy);
      setDescription(`AI-recommended ${first.label.toLowerCase()} strategy: ${first.reasoning}`);
    }
  };

  const handleSubmit = async () => {
    if (!strategy || !description) return;
    await createTreatment.mutateAsync({
      riskId,
      strategy,
      description,
      dueDate: dueDate || undefined,
      costEstimate: costEstimate ? parseFloat(costEstimate) : undefined,
      progress: progress || undefined,
    });
    setStrategy(""); setDescription(""); setDueDate(""); setCostEstimate(""); setProgress(0);
    onClose();
  };

  const handleClose = () => {
    setStrategy(""); setDescription(""); setDueDate(""); setCostEstimate(""); setProgress(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Treatment Plan</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {riskTitle}
        </Typography>

        <Tooltip title="Get AI-recommended treatment strategies based on risk domain, score, and historical patterns">
          <Button
            size="small"
            variant="outlined"
            startIcon={aiLoading ? <CircularProgress size={16} /> : <AutoAwesomeIcon />}
            onClick={handleAiSuggest}
            disabled={aiLoading}
            sx={{ mb: 2 }}
          >
            AI Suggest Treatment
          </Button>
        </Tooltip>

        {aiSuggestion?.suggestedStrategies && (
          <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {aiSuggestion.suggestedStrategies.map((s) => (
              <Card key={s.strategy} variant="outlined" sx={{ flex: 1, minWidth: 180, cursor: "pointer", "&:hover": { borderColor: "primary.main" } }} onClick={() => { setStrategy(s.strategy); setDescription(`AI-recommended ${s.label.toLowerCase()} strategy: ${s.reasoning}`); }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                  <Typography variant="body2" fontWeight={600}>{s.label}</Typography>
                  <Typography variant="caption" color="text.secondary">{s.reasoning}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField select label="Strategy" value={strategy} onChange={(e) => setStrategy(e.target.value)} required fullWidth>
            {STRATEGIES.map((s) => (
              <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
            ))}
          </TextField>
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} required fullWidth />
          <TextField label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} fullWidth slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Cost Estimate ($)" type="number" value={costEstimate} onChange={(e) => setCostEstimate(e.target.value)} fullWidth />
          <TextField label="Progress %" type="number" value={progress} onChange={(e) => setProgress(Math.min(100, Math.max(0, Number(e.target.value))))} fullWidth />
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
