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

export default function CreateControlModal({ open, onClose }: CreateControlModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [effectiveness, setEffectiveness] = useState("effective");
  const [riskId, setRiskId] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const createControl = useCreateControl();
  const { data: risks } = useRisks();
  const { data: users } = useUsers();

  const handleSubmit = async () => {
    if (!title || !type) return;
    await createControl.mutateAsync({
      title,
      description: description || undefined,
      type,
      effectiveness,
      riskId: riskId || undefined,
      ownerId: ownerId || undefined,
    });
    resetAndClose();
  };

  const resetAndClose = () => {
    setTitle(""); setDescription(""); setType(""); setEffectiveness("effective");
    setRiskId(""); setOwnerId("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={resetAndClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Control</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth />
          <TextField select label="Type" value={type} onChange={(e) => setType(e.target.value)} required fullWidth>
            {TYPES.map((t) => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
          </TextField>
          <TextField select label="Effectiveness" value={effectiveness} onChange={(e) => setEffectiveness(e.target.value)} fullWidth>
            {EFFECTIVENESS.map((e) => <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>)}
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
