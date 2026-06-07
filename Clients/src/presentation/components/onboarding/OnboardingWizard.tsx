import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Stepper, Step, StepLabel, Button, Typography, Box, Card, CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ScienceIcon from "@mui/icons-material/Science";
import { useDemoDataStatus, useCreateDemoData } from "../../../infrastructure/api/demoData.api";

const STEPS = ["Welcome", "Create a Project", "Adopt a Framework", "Load Demo Data", "Done"];

const ONBOARDING_KEY = "trustmaven_onboarding_complete";

export default function OnboardingWizard() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { data: demoStatus } = useDemoDataStatus();
  const createDemo = useCreateDemoData();

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed) {
      const timer = setTimeout(() => setOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setOpen(false);
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleLoadDemo = async () => {
    await createDemo.mutateAsync();
    handleNext();
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <AutoAwesomeIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
            <Typography variant="h4" gutterBottom>Welcome to TrustMaven!</Typography>
            <Typography variant="body1" color="text.secondary">
              Let's get you set up in just a few steps. We'll help you create your first project,
              adopt a compliance framework, and load sample data so you can explore the platform.
            </Typography>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <FolderOpenIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
            <Typography variant="h4" gutterBottom>Create Your First Project</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Projects help you organize risks by initiative, department, or compliance program.
              Start by creating a project to group your risk management activities.
            </Typography>
            <Button variant="contained" onClick={() => { navigate("/projects"); handleNext(); }}>
              Go to Projects
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CheckCircleIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
            <Typography variant="h4" gutterBottom>Adopt a Compliance Framework</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              TrustMaven includes pre-built compliance frameworks (ISO 27001, SOC 2, GDPR, NIST CSF, and more).
              Use our Framework Recommender to find the right frameworks for your organization.
            </Typography>
            <Button variant="contained" onClick={() => { navigate("/compliance-hub/recommend"); handleNext(); }}>
              Open Framework Recommender
            </Button>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <ScienceIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
            <Typography variant="h4" gutterBottom>Load Demo Data</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Want to see TrustMaven in action? Load demo data with sample risks, controls, projects,
              and compliance data to explore the platform's full capabilities.
            </Typography>
            {demoStatus?.hasDemoData ? (
              <Typography variant="body2" color="success.main">Demo data is already loaded!</Typography>
            ) : (
              <Button variant="contained" onClick={handleLoadDemo} disabled={createDemo.isPending}>
                {createDemo.isPending ? "Loading..." : "Load Demo Data"}
              </Button>
            )}
          </Box>
        );
      case 4:
        return (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CheckCircleIcon sx={{ fontSize: 64, color: "success.main", mb: 2 }} />
            <Typography variant="h4" gutterBottom>You're All Set!</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Your TrustMaven workspace is ready. Here are some suggested next steps:
            </Typography>
            <Box component="ul" sx={{ textAlign: "left", maxWidth: 400, mx: "auto" }}>
              <Typography component="li" variant="body2">Create your first risk in the Risk Registry</Typography>
              <Typography component="li" variant="body2">Set up controls and map them to risks</Typography>
              <Typography component="li" variant="body2">Configure KRIs for key risk indicators</Typography>
              <Typography component="li" variant="body2">Invite team members from User Management</Typography>
              <Typography component="li" variant="body2">Explore the Compliance Hub for gap analysis</Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth disableEscapeKeyDown>
      <DialogTitle>
        <Stepper activeStep={activeStep} sx={{ mt: 1 }}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      <DialogContent>
        <Card variant="outlined">
          <CardContent>{renderStep()}</CardContent>
        </Card>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, justifyContent: "space-between" }}>
        <Button onClick={handleSkip} color="inherit">
          Skip Setup
        </Button>
        <Box>
          {activeStep > 0 && activeStep < STEPS.length - 1 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep < STEPS.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              {activeStep === 3 && demoStatus?.hasDemoData ? "Next" : "Skip"}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleComplete}>
              Get Started
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
