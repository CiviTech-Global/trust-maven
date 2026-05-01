import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box,
} from "@mui/material";
import { useUpdateProject } from "../../../infrastructure/api/projects.api";
import type { Project } from "../../../domain/interfaces";
import { ProjectStatus } from "../../../domain/enums";

interface EditProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: Project;
}

const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "on_hold", label: "On Hold" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

export default function EditProjectModal({ open, onClose, project }: EditProjectModalProps) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || "");
  const [status, setStatus] = useState(project.status);
  const [startDate, setStartDate] = useState(project.startDate || "");
  const [endDate, setEndDate] = useState(project.endDate || "");
  const updateProject = useUpdateProject();

  useEffect(() => {
    setName(project.name);
    setDescription(project.description || "");
    setStatus(project.status);
    setStartDate(project.startDate || "");
    setEndDate(project.endDate || "");
  }, [project]);

  const handleSubmit = async () => {
    if (!name) return;
    await updateProject.mutateAsync({
      id: project.id,
      name,
      description: description || undefined,
      status,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth />
          <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus)} fullWidth>
            {STATUSES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
          </TextField>
          <TextField label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
          <TextField label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!name || updateProject.isPending}>
          {updateProject.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
