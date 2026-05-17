import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Grid,
  Chip,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  Lightbulb as TipIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useFrameworkRecommendation, useAdoptRegulation } from "../../../infrastructure/api/complianceHub.api";

const INDUSTRIES = [
  "technology", "saas", "fintech", "finance", "banking", "insurance",
  "healthcare", "pharma", "manufacturing", "retail", "energy",
  "government", "education", "consulting", "other",
];

const SIZES = [
  { value: "startup", label: "Startup (1-50)" },
  { value: "small", label: "Small (51-200)" },
  { value: "medium", label: "Medium (201-1000)" },
  { value: "large", label: "Large (1001-5000)" },
  { value: "enterprise", label: "Enterprise (5000+)" },
];

const JURISDICTIONS = ["US", "EU", "UK", "International", "Asia-Pacific"];

export default function FrameworkRecommender() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");
  const [jurisdictions, setJurisdictions] = useState<string[]>([]);
  const [toast, setToast] = useState<{ severity: "success" | "error"; message: string } | null>(null);

  const showResults = activeStep === 2;
  const orgProfile = showResults ? { industry, size, jurisdictions } : null;

  const { data: recommendation, isLoading } = useFrameworkRecommendation(orgProfile);
  const adoptMutation = useAdoptRegulation();

  const handleNext = () => {
    if (activeStep < 2) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const handleAdopt = async (regulationId: string) => {
    try {
      await adoptMutation.mutateAsync({ regulationId });
      setToast({ severity: "success", message: "Framework adopted successfully" });
    } catch (err: any) {
      setToast({ severity: "error", message: err.response?.data?.message || "Failed to adopt" });
    }
  };

  const toggleJurisdiction = (j: string) => {
    setJurisdictions((prev) =>
      prev.includes(j) ? prev.filter((x) => x !== j) : [...prev, j]
    );
  };

  return (
    <Box>
      <Button startIcon={<BackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Typography variant="h4" fontWeight={700} gutterBottom>
        Framework Recommender
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Answer a few questions about your organization and get an intelligent framework stack recommendation
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        <Step><StepLabel>Industry & Size</StepLabel></Step>
        <Step><StepLabel>Jurisdictions</StepLabel></Step>
        <Step><StepLabel>Recommendations</StepLabel></Step>
      </Stepper>

      {activeStep === 0 && (
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  {INDUSTRIES.map((i) => (
                    <MenuItem key={i} value={i}>
                      {i.charAt(0).toUpperCase() + i.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Organization Size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {SIZES.map((s) => (
                    <MenuItem key={s.value} value={s.value}>
                      {s.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                variant="contained"
                endIcon={<NextIcon />}
                onClick={handleNext}
                disabled={!industry || !size}
              >
                Next
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {activeStep === 1 && (
        <Card>
          <CardContent>
            <Typography variant="body1" fontWeight={500} gutterBottom>
              Where does your organization operate?
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
              {JURISDICTIONS.map((j) => (
                <Chip
                  key={j}
                  label={j}
                  onClick={() => toggleJurisdiction(j)}
                  color={jurisdictions.includes(j) ? "primary" : "default"}
                  variant={jurisdictions.includes(j) ? "filled" : "outlined"}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button onClick={handleBack}>Back</Button>
              <Button
                variant="contained"
                endIcon={<NextIcon />}
                onClick={handleNext}
                disabled={jurisdictions.length === 0}
              >
                Get Recommendations
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {activeStep === 2 && (
        <>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : recommendation ? (
            <>
              {recommendation.recommended.length === 0 ? (
                <Alert severity="info" sx={{ mb: 3 }}>
                  No additional frameworks recommended. You may already have comprehensive coverage.
                </Alert>
              ) : (
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  {recommendation.recommended.map((reg, i) => (
                    <Grid item xs={12} md={6} key={reg.id}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="h6" fontWeight={600}>
                              {reg.name}
                            </Typography>
                            <Chip label={reg.type} size="small" />
                          </Box>
                          <Box sx={{ display: "flex", gap: 0.5, mb: 2 }}>
                            <Chip label={reg.category.replace(/_/g, " ")} size="small" variant="outlined" />
                            {reg.jurisdiction && (
                              <Chip label={reg.jurisdiction} size="small" variant="outlined" />
                            )}
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}>
                            <TipIcon color="info" sx={{ mt: 0.3, fontSize: 18 }} />
                            <Typography variant="body2" color="text.secondary">
                              {recommendation.reasoning[i]}
                            </Typography>
                          </Box>
                          <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            fullWidth
                            onClick={() => handleAdopt(reg.id)}
                            disabled={adoptMutation.isPending}
                          >
                            Adopt
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Coverage Matrix */}
              {recommendation.coverageMatrix.length > 0 && (
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Coverage Matrix
                    </Typography>
                    {recommendation.coverageMatrix.map((cm) => (
                      <Box key={cm.area} sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight={600}>{cm.area}</Typography>
                        <Box sx={{ display: "flex", gap: 0.5, mt: 0.5, flexWrap: "wrap" }}>
                          {cm.frameworks.map((f) => (
                            <Chip key={f} label={f} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              )}

              <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 3 }}>
                <Button onClick={handleBack}>Adjust Profile</Button>
              </Box>
            </>
          ) : null}
        </>
      )}

      <Snackbar
        open={!!toast}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast?.severity} onClose={() => setToast(null)} variant="filled">
          {toast?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
