import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box,
} from "@mui/material";
import { useCreateRisk } from "../../../infrastructure/api/risks.api";
import { useProjects } from "../../../infrastructure/api/projects.api";

interface CreateRiskModalProps {
  open: boolean;
  onClose: () => void;
}

const DOMAINS = [
  { value: "financial", label: "Financial" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "strategic", label: "Strategic" },
  { value: "operational", label: "Operational" },
  { value: "regulatory", label: "Regulatory" },
];

export default function CreateRiskModal({ open, onClose }: CreateRiskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [projectId, setProjectId] = useState("");
  const createRisk = useCreateRisk();
  const { data: projects } = useProjects();

  const handleSubmit = async () => {
    if (!title || !domain) return;
    await createRisk.mutateAsync({
      title,
      description: description || undefined,
      domain,
      projectId: projectId || undefined,
    });
    setTitle(""); setDescription(""); setDomain(""); setProjectId("");
    onClose();
  };

  const handleClose = () => {
    setTitle(""); setDescription(""); setDomain(""); setProjectId("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Risk</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth />
          <TextField select label="Domain" value={domain} onChange={(e) => setDomain(e.target.value)} required fullWidth>
            {DOMAINS.map((d) => (
              <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>
            ))}
          </TextField>
          <TextField select label="Project (optional)" value={projectId} onChange={(e) => setProjectId(e.target.value)} fullWidth>
            <MenuItem value="">None</MenuItem>
            {projects?.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!title || !domain || createRisk.isPending}>
          {createRisk.isPending ? "Creating..." : "Create Risk"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
