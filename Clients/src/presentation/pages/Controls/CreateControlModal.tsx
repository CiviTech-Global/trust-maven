import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box,
} from "@mui/material";
import { useCreateControl } from "../../../infrastructure/api/controls.api";
import { useRisks } from "../../../infrastructure/api/risks.api";
import { useUsers } from "../../../infrastructure/api/users.api";

interface CreateControlModalProps {
  open: boolean;
  onClose: () => void;
}

const TYPES = [
  { value: "preventive", label: "Preventive" },
  { value: "detective", label: "Detective" },
  { value: "corrective", label: "Corrective" },
];

const EFFECTIVENESS = [
  { value: "effective", label: "Effective" },
  { value: "partially_effective", label: "Partially Effective" },
  { value: "ineffective", label: "Ineffective" },
];

const TESTING_METHODS = [
  { value: "inquiry", label: "Inquiry" },
  { value: "observation", label: "Observation" },
  { value: "inspection", label: "Inspection" },
  { value: "reperformance", label: "Reperformance" },
];

const TEST_FREQUENCIES = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "semi_annually", label: "Semi-Annually" },
  { value: "annually", label: "Annually" },
];

export default function CreateControlModal({ open, onClose }: CreateControlModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [effectiveness, setEffectiveness] = useState("effective");
  const [riskId, setRiskId] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [designEffectiveness, setDesignEffectiveness] = useState("effective");
  const [operatingEffectiveness, setOperatingEffectiveness] = useState("effective");
  const [testingMethod, setTestingMethod] = useState("");
  const [testFrequency, setTestFrequency] = useState("");
  const createControl = useCreateControl();
  const { data: risks } = useRisks();
  const { data: users } = useUsers();
  const [objective, setObjective] = useState("");

  const handleSubmit = async () => {
    if (!title || !type) return;
    await createControl.mutateAsync({
      title,
      description: description || undefined,
      type,
      effectiveness,
      riskId: riskId || undefined,
      ownerId: ownerId || undefined,
      designEffectiveness,
      operatingEffectiveness,
      testingMethod: testingMethod || undefined,
      testFrequency: testFrequency || undefined,
      objective: objective || undefined,
    } as any);
    resetAndClose();
  };

  const resetAndClose = () => {
    setTitle(""); setDescription(""); setType(""); setEffectiveness("effective");
    setRiskId(""); setOwnerId("");
    setDesignEffectiveness("effective"); setOperatingEffectiveness("effective");
    setTestingMethod(""); setTestFrequency(""); setObjective("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={resetAndClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Control</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth />
          <TextField label="Control Objective" value={objective} onChange={(e) => setObjective(e.target.value)} multiline rows={2} fullWidth />
          <TextField select label="Type" value={type} onChange={(e) => setType(e.target.value)} required fullWidth>
            {TYPES.map((t) => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
          </TextField>
          <TextField select label="Design Effectiveness" value={designEffectiveness} onChange={(e) => setDesignEffectiveness(e.target.value)} fullWidth>
            {EFFECTIVENESS.map((e) => <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>)}
          </TextField>
          <TextField select label="Operating Effectiveness" value={operatingEffectiveness} onChange={(e) => setOperatingEffectiveness(e.target.value)} fullWidth>
            {EFFECTIVENESS.map((e) => <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>)}
          </TextField>
          <TextField select label="Testing Method (optional)" value={testingMethod} onChange={(e) => setTestingMethod(e.target.value)} fullWidth>
            <MenuItem value="">None</MenuItem>
            {TESTING_METHODS.map((t) => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
          </TextField>
          <TextField select label="Test Frequency (optional)" value={testFrequency} onChange={(e) => setTestFrequency(e.target.value)} fullWidth>
            <MenuItem value="">None</MenuItem>
            {TEST_FREQUENCIES.map((f) => <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>)}
          </TextField>
          <TextField select label="Linked Risk (optional)" value={riskId} onChange={(e) => setRiskId(e.target.value)} fullWidth>
            <MenuItem value="">None</MenuItem>
            {risks?.map((r) => <MenuItem key={r.id} value={r.id}>{r.title}</MenuItem>)}
          </TextField>
          <TextField select label="Owner (optional)" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} fullWidth>
            <MenuItem value="">Default (me)</MenuItem>
            {users?.map((u: any) => <MenuItem key={u.id} value={u.id}>{u.firstName} {u.lastName}</MenuItem>)}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetAndClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!title || !type || createControl.isPending}>
          {createControl.isPending ? "Creating..." : "Create Control"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
