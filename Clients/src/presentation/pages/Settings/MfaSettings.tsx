import { useState } from "react";
import {
  Box, Typography, Card, CardContent, Button, TextField,
  Alert, LinearProgress,
} from "@mui/material";
import { Security as MfaIcon } from "@mui/icons-material";
import { useMfaStatus, useMfaSetup, useMfaEnable, useMfaDisable } from "../../../infrastructure/api/mfa.api";

export default function MfaSettings() {
  const { data: status, isLoading } = useMfaStatus();
  const mfaSetup = useMfaSetup();
  const mfaEnable = useMfaEnable();
  const mfaDisable = useMfaDisable();
  const [setupResult, setSetupResult] = useState<{ secret: string; otpauth: string } | null>(null);
  const [verifyCode, setVerifyCode] = useState("");
  const [disableCode, setDisableCode] = useState("");
  const [error, setError] = useState("");

  const handleSetup = async () => {
    setError("");
    try {
      const result = await mfaSetup.mutateAsync();
      setSetupResult(result);
    } catch (err: any) {
      setError(err.message || "Failed to initialize MFA");
    }
  };

  const handleEnable = async () => {
    setError("");
    if (!verifyCode) return;
    try {
      await mfaEnable.mutateAsync(verifyCode);
      setSetupResult(null);
      setVerifyCode("");
    } catch (err: any) {
      setError(err.message || "Failed to enable MFA");
    }
  };

  const handleDisable = async () => {
    setError("");
    try {
      await mfaDisable.mutateAsync(disableCode || undefined);
      setDisableCode("");
    } catch (err: any) {
      setError(err.message || "Failed to disable MFA");
    }
  };

  if (isLoading) return <LinearProgress />;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <MfaIcon color="primary" />
          <Typography variant="h4">Two-Factor Authentication (MFA)</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

        {status?.isEnabled ? (
          <Box>
            <Alert severity="success" sx={{ mb: 2 }}>MFA is currently enabled</Alert>
            <TextField
              label="Current MFA code (to disable)"
              value={disableCode}
              onChange={(e) => setDisableCode(e.target.value)}
              placeholder="000000"
              sx={{ mr: 1, mb: 1 }}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={handleDisable}
              disabled={mfaDisable.isPending}
            >
              {mfaDisable.isPending ? "Disabling..." : "Disable MFA"}
            </Button>
          </Box>
        ) : setupResult ? (
          <Box>
            <Alert severity="info" sx={{ mb: 2 }}>
              Scan the QR code or enter the secret in your authenticator app, then enter the 6-digit code below
            </Alert>
            <Box sx={{ mb: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Scan with Authenticator App:
              </Typography>
              <Box
                sx={{
                  display: "inline-block",
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  backgroundColor: "white",
                }}
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(setupResult.otpauth)}`}
                  alt="MFA QR Code"
                  width={180}
                  height={180}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </Box>
              <Typography variant="caption" display="block" sx={{ mt: 1, color: "text.secondary" }}>
                Or enter manually: <code>{setupResult.secret}</code>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                label="Verification Code"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                placeholder="000000"
                sx={{ width: 200 }}
              />
              <Button
                variant="contained"
                onClick={handleEnable}
                disabled={verifyCode.length !== 6 || mfaEnable.isPending}
              >
                {mfaEnable.isPending ? "Verifying..." : "Verify & Enable"}
              </Button>
              <Button onClick={() => setSetupResult(null)}>Cancel</Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add an extra layer of security to your account by enabling two-factor authentication.
            </Typography>
            <Button variant="contained" onClick={handleSetup} disabled={mfaSetup.isPending}>
              {mfaSetup.isPending ? "Preparing..." : "Set Up MFA"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
