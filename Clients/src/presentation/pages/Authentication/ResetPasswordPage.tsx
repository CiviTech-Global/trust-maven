import { useState } from "react";
import {
  Box, Card, CardContent, TextField, Typography, Button, Alert
} from "@mui/material";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../infrastructure/api/axiosInstance";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      await axiosInstance.post("/auth/reset-password", { token, newPassword });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  if (!token) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card sx={{ maxWidth: 440, width: "100%", mx: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Alert severity="error" sx={{ mb: 2 }}>Invalid reset link. No token provided.</Alert>
            <Button component={Link} to="/login" fullWidth variant="contained">Back to Login</Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
      <Card sx={{ maxWidth: 440, width: "100%", mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>Set New Password</Typography>
          {success ? (
            <>
              <Alert severity="success" sx={{ mb: 2 }}>Password reset successfully!</Alert>
              <Button onClick={() => navigate("/login")} fullWidth variant="contained">
                Go to Login
              </Button>
            </>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <TextField
                label="New Password" type="password" fullWidth required
                value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Confirm Password" type="password" fullWidth required
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button type="submit" fullWidth variant="contained">Reset Password</Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
