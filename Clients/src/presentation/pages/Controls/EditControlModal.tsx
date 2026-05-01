import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box,
} from "@mui/material";
import { useUpdateControl } from "../../../infrastructure/api/controls.api";
import { useRisks } from "../../../infrastructure/api/risks.api";
import { useUsers } from "../../../infrastructure/api/users.api";
import type { Control } from "../../../domain/interfaces";

interface EditControlModalProps {
  open: boolean;
  onClose: () => void;
  control: Control;
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

export default function EditControlModal({ open, onClose, control }: EditControlModalProps) {
  const [title, setTitle] = useState(control.title);
  const [description, setDescription] = useState(control.description || "");
  const [type, setType] = useState(control.type);
  const [effectiveness, setEffectiveness] = useState(control.effectiveness);
  const [riskId, setRiskId] = useState(control.riskId || "");
  const [ownerId, setOwnerId] = useState(control.ownerId || "");
  const [designEffectiveness, setDesignEffectiveness] = useState(control.designEffectiveness || "effective");
  const [operatingEffectiveness, setOperatingEffectiveness] = useState(control.operatingEffectiveness || "effective");
  const [testingMethod, setTestingMethod] = useState((control as any).testingMethod || "");
  const [testFrequency, setTestFrequency] = useState((control as any).testFrequency || "");
  const updateControl = useUpdateControl();
  const { data: risks } = useRisks();
  const { data: users } = useUsers();

  useEffect(() => {
    setTitle(control.title);
    setDescription(control.description || "");
    setType(control.type);
    setEffectiveness(control.effectiveness);
    setRiskId(control.riskId || "");
    setOwnerId(control.ownerId || "");
    setDesignEffectiveness(control.designEffectiveness || "effective");
    setOperatingEffectiveness(control.operatingEffectiveness || "effective");
    setTestingMethod((control as any).testingMethod || "");
    setTestFrequency((control as any).testFrequency || "");
  }, [control]);

  const handleSubmit = async () => {
    if (!title || !type) return;
    await updateControl.mutateAsync({
      id: control.id,
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
    } as any);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Control</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth />
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!title || !type || updateControl.isPending}>
          {updateControl.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
