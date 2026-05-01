import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box,
} from "@mui/material";
import { useCreateProject } from "../../../infrastructure/api/projects.api";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "on_hold", label: "On Hold" },
];

export default function CreateProjectModal({ open, onClose }: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("draft");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const createProject = useCreateProject();

  const handleSubmit = async () => {
    if (!name) return;
    await createProject.mutateAsync({
      name,
      description: description || undefined,
      status,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
    setName(""); setDescription(""); setStatus("draft"); setStartDate(""); setEndDate("");
    onClose();
  };

  const handleClose = () => {
    setName(""); setDescription(""); setStatus("draft"); setStartDate(""); setEndDate("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>New Project</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth />
          <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} fullWidth>
            {STATUSES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
          </TextField>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} fullWidth slotProps={{ inputLabel: { shrink: true } }} />
            <TextField label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} fullWidth slotProps={{ inputLabel: { shrink: true } }} />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!name || createProject.isPending}>
          {createProject.isPending ? "Creating..." : "Create Project"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
