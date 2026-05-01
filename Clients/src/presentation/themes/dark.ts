import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366F1",
      light: "#818CF8",
      dark: "#4338CA",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#94A3B8",
      light: "#CBD5E1",
      dark: "#64748B",
    },
    error: {
      main: "#F43F5E",
      light: "#FDA4AF",
      dark: "#E11D48",
    },
    warning: {
      main: "#F59E0B",
      light: "#FCD34D",
      dark: "#D97706",
    },
    success: {
      main: "#10B981",
      light: "#6EE7B7",
      dark: "#059669",
    },
    info: {
      main: "#38BDF8",
      light: "#7DD3FC",
      dark: "#0284C7",
    },
    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },
    text: {
      primary: "#F1F5F9",
      secondary: "#94A3B8",
    },
    divider: "#334155",
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontSize: "1.875rem", fontWeight: 700, letterSpacing: "-0.015em" },
    h2: { fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.01em" },
    h3: { fontSize: "1.25rem", fontWeight: 600 },
    h4: { fontSize: "1.125rem", fontWeight: 600 },
    body1: { fontSize: "0.875rem", lineHeight: 1.5 },
    body2: { fontSize: "0.75rem", lineHeight: 1.4 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "8px 16px",
          fontSize: "0.875rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: "1px solid #334155",
          boxShadow: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});
