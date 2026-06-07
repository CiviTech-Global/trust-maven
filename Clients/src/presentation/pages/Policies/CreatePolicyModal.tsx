import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box,
} from "@mui/material";
import { useCreatePolicy } from "../../../infrastructure/api/policies.api";
import { useUsers } from "../../../infrastructure/api/users.api";

interface CreatePolicyModalProps {
  open: boolean;
  onClose: () => void;
}

const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "approved", label: "Approved" },
  { value: "retired", label: "Retired" },
];

export default function CreatePolicyModal({ open, onClose }: CreatePolicyModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [version, setVersion] = useState("1.0");
  const [status, setStatus] = useState("draft");
  const [ownerId, setOwnerId] = useState("");
  const createPolicy = useCreatePolicy();
  const { data: users } = useUsers();

  const handleSubmit = async () => {
    if (!title) return;
    await createPolicy.mutateAsync({
      title,
      content: content || undefined,
      version,
      status,
      ownerId: ownerId || undefined,
    });
    resetAndClose();
  };

  const resetAndClose = () => {
    setTitle(""); setContent(""); setVersion("1.0"); setStatus("draft"); setOwnerId("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={resetAndClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Policy</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
          <TextField label="Content" value={content} onChange={(e) => setContent(e.target.value)} multiline rows={6} fullWidth />
          <TextField label="Version" value={version} onChange={(e) => setVersion(e.target.value)} fullWidth />
          <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} fullWidth>
            {STATUSES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
          </TextField>
          <TextField select label="Owner (optional)" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} fullWidth>
            <MenuItem value="">Default (me)</MenuItem>
            {users?.map((u: any) => <MenuItem key={u.id} value={u.id}>{u.firstName} {u.lastName}</MenuItem>)}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetAndClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!title || createPolicy.isPending}>
          {createPolicy.isPending ? "Creating..." : "Create Policy"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
