import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography, IconButton,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useCreateFramework } from "../../../infrastructure/api/frameworks.api";

interface CreateFrameworkModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateFrameworkModal({ open, onClose }: CreateFrameworkModalProps) {
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState<{ id: string; title: string }[]>([]);
  const [newReqTitle, setNewReqTitle] = useState("");

  const createFramework = useCreateFramework();

  const handleAddRequirement = () => {
    if (!newReqTitle.trim()) return;
    setRequirements([...requirements, { id: `req-${Date.now()}`, title: newReqTitle.trim() }]);
    setNewReqTitle("");
  };

  const handleRemoveRequirement = (id: string) => {
    setRequirements(requirements.filter((r) => r.id !== id));
  };

  const handleSubmit = async () => {
    if (!name) return;
    await createFramework.mutateAsync({
      name,
      version: version || undefined,
      description: description || undefined,
      requirements,
    });
    handleClose();
  };

  const handleClose = () => {
    setName(""); setVersion(""); setDescription(""); setRequirements([]); setNewReqTitle("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Compliance Framework</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 2 }}>
            <TextField label="Framework Name" value={name} onChange={(e) => setName(e.target.value)} required
              placeholder="e.g., SOC 2 Type II, ISO 27001, NIST CSF" />
            <TextField label="Version" value={version} onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g., 2024, v2.0" />
          </Box>
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={2} fullWidth />

          <Typography variant="h3" sx={{ mt: 2 }}>Requirements / Controls</Typography>
          <Typography variant="body2" color="text.secondary">
            Add the requirements that need to be satisfied. You can map controls to each requirement later.
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="Requirement title"
              value={newReqTitle}
              onChange={(e) => setNewReqTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddRequirement())}
              fullWidth
              placeholder="e.g., CC6.1 - Logical and Physical Access Controls"
            />
            <Button variant="outlined" onClick={handleAddRequirement} disabled={!newReqTitle.trim()}>
              <AddIcon />
            </Button>
          </Box>

          {requirements.length > 0 && (
            <Box sx={{ maxHeight: 300, overflow: "auto", border: "1px solid #E2E8F0", borderRadius: 1, p: 1 }}>
              {requirements.map((req, idx) => (
                <Box key={req.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 0.5, borderBottom: idx < requirements.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <Typography variant="body2">{idx + 1}. {req.title}</Typography>
                  <IconButton size="small" onClick={() => handleRemoveRequirement(req.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
          <Typography variant="body2" color="text.secondary">
            {requirements.length} requirement{requirements.length !== 1 ? "s" : ""} added
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!name || createFramework.isPending}>
          {createFramework.isPending ? "Creating..." : "Create Framework"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
