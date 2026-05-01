import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box,
} from "@mui/material";
import { useCreateUser } from "../../../infrastructure/api/users.api";

interface InviteUserModalProps {
  open: boolean;
  onClose: () => void;
}

const ROLES = [
  { value: "admin", label: "Admin" },
  { value: "risk_manager", label: "Risk Manager" },
  { value: "analyst", label: "Analyst" },
  { value: "auditor", label: "Auditor" },
  { value: "viewer", label: "Viewer" },
];

export default function InviteUserModal({ open, onClose }: InviteUserModalProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("viewer");
  const createUser = useCreateUser();

  const handleSubmit = async () => {
    if (!email || !firstName || !lastName) return;
    await createUser.mutateAsync({ email, firstName, lastName });
    resetAndClose();
  };

  const resetAndClose = () => {
    setEmail(""); setFirstName(""); setLastName(""); setRole("viewer");
    onClose();
  };

  return (
    <Dialog open={open} onClose={resetAndClose} maxWidth="sm" fullWidth>
      <DialogTitle>Invite User</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
          <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required fullWidth />
          <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required fullWidth />
          <TextField select label="Role" value={role} onChange={(e) => setRole(e.target.value)} fullWidth>
            {ROLES.map((r) => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetAndClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!email || !firstName || !lastName || createUser.isPending}>
          {createUser.isPending ? "Inviting..." : "Invite User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
