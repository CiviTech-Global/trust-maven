import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box,
} from "@mui/material";
import { useUpdatePolicy } from "../../../infrastructure/api/policies.api";
import { useUsers } from "../../../infrastructure/api/users.api";
import type { Policy } from "../../../domain/interfaces";

interface EditPolicyModalProps {
  open: boolean;
  onClose: () => void;
  policy: Policy;
}

const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "approved", label: "Approved" },
  { value: "retired", label: "Retired" },
];

export default function EditPolicyModal({ open, onClose, policy }: EditPolicyModalProps) {
  const [title, setTitle] = useState(policy.title);
  const [content, setContent] = useState(policy.content || "");
  const [version, setVersion] = useState(policy.version);
  const [status, setStatus] = useState(policy.status);
  const [ownerId, setOwnerId] = useState(policy.ownerId || "");
  const updatePolicy = useUpdatePolicy();
  const { data: users } = useUsers();

  useEffect(() => {
    setTitle(policy.title);
    setContent(policy.content || "");
    setVersion(policy.version);
    setStatus(policy.status);
    setOwnerId(policy.ownerId || "");
  }, [policy]);

  const handleSubmit = async () => {
    if (!title) return;
    await updatePolicy.mutateAsync({
      id: policy.id,
      title,
      content: content || undefined,
      version,
      status,
      ownerId: ownerId || undefined,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Policy</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
          <TextField label="Content" value={content} onChange={(e) => setContent(e.target.value)} multiline rows={6} fullWidth />
          <TextField label="Version" value={version} onChange={(e) => setVersion(e.target.value)} fullWidth />
          <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} fullWidth>
            {STATUSES.map((s) => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
          </TextField>
          <TextField select label="Owner (optional)" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} fullWidth>
            <MenuItem value="">None</MenuItem>
            {users?.map((u: any) => <MenuItem key={u.id} value={u.id}>{u.firstName} {u.lastName}</MenuItem>)}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!title || updatePolicy.isPending}>
          {updatePolicy.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
