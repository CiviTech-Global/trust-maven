import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, Slider, TextField, MenuItem,
} from "@mui/material";
import { useCreateAssessment } from "../../../infrastructure/api/assessments.api";

interface AssessRiskModalProps {
  open: boolean;
  onClose: () => void;
  riskId: string;
  riskTitle: string;
}

export default function AssessRiskModal({ open, onClose, riskId, riskTitle }: AssessRiskModalProps) {
  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(3);
  const [notes, setNotes] = useState("");
  const [assessmentType, setAssessmentType] = useState("inherent");
  const createAssessment = useCreateAssessment();

  const score = likelihood * impact;
  const scoreColor = score >= 15 ? "#E11D48" : score >= 10 ? "#D97706" : score >= 5 ? "#0284C7" : "#059669";

  const handleSubmit = async () => {
    await createAssessment.mutateAsync({
      riskId,
      likelihood,
      impact,
      methodology: "Qualitative",
      notes: notes || undefined,
      assessmentType,
    });
    setLikelihood(3); setImpact(3); setNotes(""); setAssessmentType("inherent");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assess Risk</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {riskTitle}
        </Typography>
        <TextField
          select
          label="Assessment Type"
          value={assessmentType}
          onChange={(e) => setAssessmentType(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="inherent">Inherent Risk</MenuItem>
          <MenuItem value="residual">Residual Risk</MenuItem>
        </TextField>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>Likelihood: {likelihood}</Typography>
          <Slider value={likelihood} onChange={(_, v) => setLikelihood(v as number)} min={1} max={5} step={1} marks valueLabelDisplay="auto" />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>Impact: {impact}</Typography>
          <Slider value={impact} onChange={(_, v) => setImpact(v as number)} min={1} max={5} step={1} marks valueLabelDisplay="auto" />
        </Box>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h2" sx={{ color: scoreColor }}>
            Risk Score: {score}
          </Typography>
        </Box>
        <TextField label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} multiline rows={2} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={createAssessment.isPending}>
          {createAssessment.isPending ? "Saving..." : "Save Assessment"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
