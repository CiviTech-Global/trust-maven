import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box, Typography, Slider,
} from "@mui/material";
import { useCreateVendorAssessment, type VendorItem } from "../../../infrastructure/api/vendors.api";

interface VendorAssessmentModalProps {
  open: boolean;
  onClose: () => void;
  vendor: VendorItem;
}

const ASSESSMENT_TYPES = [
  { value: "security", label: "Security Assessment" },
  { value: "privacy", label: "Privacy Assessment" },
  { value: "compliance", label: "Compliance Assessment" },
  { value: "operational", label: "Operational Assessment" },
  { value: "financial", label: "Financial Assessment" },
];

const RISK_RATINGS = [
  { value: "negligible", label: "Negligible" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

export default function VendorAssessmentModal({ open, onClose, vendor }: VendorAssessmentModalProps) {
  const [title, setTitle] = useState("");
  const [assessmentType, setAssessmentType] = useState("security");
  const [riskRating, setRiskRating] = useState("medium");
  const [score, setScore] = useState(50);
  const [summary, setSummary] = useState("");
  const [nextReviewDate, setNextReviewDate] = useState("");

  const createAssessment = useCreateVendorAssessment();

  const handleSubmit = async () => {
    if (!title) return;
    await createAssessment.mutateAsync({
      vendorId: vendor.id,
      title,
      assessmentType,
      riskRating,
      score,
      summary: summary || undefined,
      nextReviewDate: nextReviewDate || undefined,
    });
    handleClose();
  };

  const handleClose = () => {
    setTitle(""); setAssessmentType("security"); setRiskRating("medium");
    setScore(50); setSummary(""); setNextReviewDate("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assess Vendor: {vendor.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Assessment Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth
            placeholder="e.g., Annual Security Review 2026" />
          <TextField select label="Assessment Type" value={assessmentType} onChange={(e) => setAssessmentType(e.target.value)} fullWidth>
            {ASSESSMENT_TYPES.map((t) => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
          </TextField>
          <TextField select label="Risk Rating" value={riskRating} onChange={(e) => setRiskRating(e.target.value)} fullWidth>
            {RISK_RATINGS.map((r) => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
          </TextField>
          <Box>
            <Typography variant="body2" gutterBottom>Score: {score}/100</Typography>
            <Slider value={score} onChange={(_, v) => setScore(v as number)} min={0} max={100} valueLabelDisplay="auto" />
          </Box>
          <TextField label="Summary / Notes" value={summary} onChange={(e) => setSummary(e.target.value)} multiline rows={3} fullWidth />
          <TextField label="Next Review Date" type="date" value={nextReviewDate} onChange={(e) => setNextReviewDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!title || createAssessment.isPending}>
          {createAssessment.isPending ? "Saving..." : "Submit Assessment"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
