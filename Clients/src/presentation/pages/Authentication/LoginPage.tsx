import { useState, FormEvent, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../application/redux/slices/authSlice";
import axiosInstance from "../../../infrastructure/api/axiosInstance";

interface SsoInfo {
  hasSaml: boolean;
  hasOidc: boolean;
  organizationId: string;
  organizationName: string;
  samlEntryPoint: string | null;
  oidcDiscoveryUrl: string | null;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ssoInfo, setSsoInfo] = useState<SsoInfo | null>(null);
  const [checkingSso, setCheckingSso] = useState(false);
  const [ssoLoading, setSsoLoading] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaToken, setMfaToken] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [mfaLoading, setMfaLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!email || !email.includes("@")) {
      setSsoInfo(null);
      return;
    }
    const timer = setTimeout(async () => {
      setCheckingSso(true);
      try {
        const { data } = await axiosInstance.post("/auth/sso/login", { email });
        if (data.success && data.data && (data.data.hasSaml || data.data.hasOidc)) {
          setSsoInfo(data.data);
        } else {
          setSsoInfo(null);
        }
      } catch {
        setSsoInfo(null);
      } finally {
        setCheckingSso(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [email]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      if (data.data?.mfaRequired) {
        setMfaRequired(true);
        setMfaToken(data.data.mfaToken);
        setLoading(false);
        return;
      }
      dispatch(
        setCredentials({
          user: data.data.user,
          accessToken: data.data.accessToken,
        })
      );
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleMfaSubmit = async () => {
    setError("");
    setMfaLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/mfa/complete", {
        mfaToken,
        code: mfaCode,
      });
      dispatch(
        setCredentials({
          user: data.data.user,
          accessToken: data.data.accessToken,
        })
      );
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "MFA verification failed");
    } finally {
      setMfaLoading(false);
    }
  };

  const handleSsoSaml = async () => {
    if (!ssoInfo?.samlEntryPoint) return;
    setSsoLoading(true);
    setError("");
    try {
      const { data } = await axiosInstance.post("/auth/sso/saml/callback", {
        SAMLResponse: "initiated",
        organizationId: ssoInfo.organizationId,
        email,
      });
      dispatch(
        setCredentials({
          user: data.data.user,
          accessToken: data.data.accessToken,
        })
      );
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "SSO login failed");
    } finally {
      setSsoLoading(false);
    }
  };

  const handleSsoOidc = async () => {
    if (!ssoInfo?.oidcDiscoveryUrl) return;
    window.location.href = ssoInfo.oidcDiscoveryUrl;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h2" sx={{ mb: 1 }}>
            TrustMaven
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to your risk management platform
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {ssoInfo && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Enterprise SSO detected for <strong>{ssoInfo.organizationName}</strong>
            </Alert>
          )}

          {mfaRequired ? (
            <Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                Enter the 6-digit code from your authenticator app
              </Alert>
              <TextField
                fullWidth
                label="Authentication Code"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                placeholder="000000"
                required
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleMfaSubmit}
                disabled={mfaCode.length !== 6 || mfaLoading}
                size="large"
              >
                {mfaLoading ? "Verifying..." : "Verify Code"}
              </Button>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              {!ssoInfo && (
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ mb: 3 }}
                />
              )}
              {!ssoInfo && (
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  size="large"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              )}
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                <Link to="/forgot-password" style={{ color: "primary.main" }}>
                  Forgot Password?
                </Link>
              </Typography>
            </form>
          )}

          {checkingSso && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress size={20} />
            </Box>
          )}

          {ssoInfo && (
            <>
              <Divider sx={{ my: 2 }}>Enterprise SSO</Divider>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {ssoInfo.hasSaml && (
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleSsoSaml}
                    disabled={ssoLoading}
                  >
                    {ssoLoading ? "Connecting..." : "Login with SAML 2.0"}
                  </Button>
                )}
                {ssoInfo.hasOidc && (
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleSsoOidc}
                    disabled={ssoLoading}
                  >
                    Login with OpenID Connect
                  </Button>
                )}
              </Box>
            </>
          )}

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link to="/register">Create one</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
