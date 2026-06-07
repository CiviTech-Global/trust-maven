import { useState, useEffect } from "react";
import {
  Box, Typography, Card, CardContent, TextField, Button, Alert, Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/redux/store";
import axiosInstance from "../../../infrastructure/api/axiosInstance";
import MfaSettings from "./MfaSettings";
import { useOrganization, useUpdateOrganization } from "../../../infrastructure/api/organization.api";

export default function SettingsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { data: org } = useOrganization();
  const updateOrg = useUpdateOrganization();
  const [orgName, setOrgName] = useState("");

  useEffect(() => {
    if (org?.name) setOrgName(org.name);
  }, [org]);

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

  const handleOrgSave = async () => {
    if (!orgName || !orgName.trim()) return;
    try {
      await updateOrg.mutateAsync({ name: orgName.trim() });
      setMessage({ type: "success", text: "Organization updated successfully" });
    } catch {
      setMessage({ type: "error", text: "Failed to update organization" });
    }
  };

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>Settings</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 600 }}>
        <Card>
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField label="Organization Name" value={orgName} onChange={(e) => setOrgName(e.target.value)} fullWidth />
              <Button variant="contained" onClick={handleOrgSave} disabled={updateOrg.isPending || !orgName.trim()} sx={{ alignSelf: "flex-start" }}>
                {updateOrg.isPending ? "Saving..." : "Save Organization"}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <MfaSettings />
      </Box>
    </Box>
  );
}
