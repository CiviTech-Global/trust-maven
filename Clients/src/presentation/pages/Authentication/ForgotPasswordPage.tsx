import { useState } from "react";
import {
  Box, Card, CardContent, TextField, Typography, Button, Alert
} from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from "../../../infrastructure/api/axiosInstance";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset email");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
      <Card sx={{ maxWidth: 440, width: "100%", mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>Reset Password</Typography>
          {sent ? (
            <>
              <Alert severity="success" sx={{ mb: 2 }}>
                If an account with that email exists, a reset link has been sent.
              </Alert>
              <Button component={Link} to="/login" fullWidth variant="contained">
                Back to Login
              </Button>
            </>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <TextField
                label="Email" type="email" fullWidth required
                value={email} onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mb: 1 }}>
                Send Reset Link
              </Button>
              <Button component={Link} to="/login" fullWidth variant="text">
                Back to Login
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
