import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box,
} from "@mui/material";
import { useUpdateRisk } from "../../../infrastructure/api/risks.api";
import { useProjects } from "../../../infrastructure/api/projects.api";
import { useUsers } from "../../../infrastructure/api/users.api";
import type { Risk } from "../../../domain/interfaces";
import { RiskDomain, RiskStatus } from "../../../domain/enums";

interface EditRiskModalProps {
  open: boolean;
  onClose: () => void;
  risk: Risk;
}

const DOMAINS = [
  { value: "financial", label: "Financial" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "strategic", label: "Strategic" },
  { value: "operational", label: "Operational" },
  { value: "regulatory", label: "Regulatory" },
];

const STATUSES = [
  { value: "identified", label: "Identified" },
  { value: "assessed", label: "Assessed" },
  { value: "treated", label: "Treated" },
  { value: "accepted", label: "Accepted" },
  { value: "closed", label: "Closed" },
];

export default function EditRiskModal({ open, onClose, risk }: EditRiskModalProps) {
  const [title, setTitle] = useState(risk.title);
  const [description, setDescription] = useState(risk.description || "");
  const [domain, setDomain] = useState(risk.domain);
  const [status, setStatus] = useState(risk.status);
  const [projectId, setProjectId] = useState(risk.projectId || "");
  const [ownerId, setOwnerId] = useState(risk.ownerId || "");
  const updateRisk = useUpdateRisk();
  const { data: projects } = useProjects();
  const { data: users } = useUsers();

  useEffect(() => {
    setTitle(risk.title);
    setDescription(risk.description || "");
    setDomain(risk.domain);
    setStatus(risk.status);
    setProjectId(risk.projectId || "");
    setOwnerId(risk.ownerId || "");
  }, [risk]);

  const handleSubmit = async () => {
    if (!title || !domain) return;
    await updateRisk.mutateAsync({
      id: risk.id,
      title,
      description: description || undefined,
      domain,
      status,
      projectId: projectId || undefined,
      ownerId: ownerId || undefined,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Risk</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth />
          <TextField select label="Domain" value={domain} onChange={(e) => setDomain(e.target.value as RiskDomain)} required fullWidth>
            {DOMAINS.map((d) => <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>)}
          </TextField>
          <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value as RiskStatus)} fullWidth>
            {STATUSES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
          </TextField>
          <TextField select label="Project (optional)" value={projectId} onChange={(e) => setProjectId(e.target.value)} fullWidth>
            <MenuItem value="">None</MenuItem>
            {projects?.map((p) => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </TextField>
          <TextField select label="Owner (optional)" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} fullWidth>
            <MenuItem value="">None</MenuItem>
            {users?.map((u: any) => <MenuItem key={u.id} value={u.id}>{u.firstName} {u.lastName}</MenuItem>)}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!title || !domain || updateRisk.isPending}>
          {updateRisk.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
