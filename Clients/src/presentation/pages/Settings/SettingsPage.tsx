import { useState } from "react";
import {
  Box, Typography, Card, CardContent, TextField, Button, Alert, Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/redux/store";
import axiosInstance from "../../../infrastructure/api/axiosInstance";

export default function SettingsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await axiosInstance.put(`/users/${user?.id}`, { firstName, lastName });
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch {
      setMessage({ type: "error", text: "Failed to update profile" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>Settings</Typography>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h3" sx={{ mb: 2 }}>Profile</Typography>

          {message && <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth />
            <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth />
            <TextField label="Email" value={user?.email || ""} fullWidth disabled />
            <Button variant="contained" onClick={handleSave} disabled={saving} sx={{ alignSelf: "flex-start" }}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h3" sx={{ mb: 2 }}>Organization</Typography>
          <TextField label="Organization" value={user?.organizationId || ""} fullWidth disabled />
        </CardContent>
      </Card>
    </Box>
  );
}
