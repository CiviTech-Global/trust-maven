import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4338CA",
      light: "#6366F1",
      dark: "#312E81",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#475569",
      light: "#94A3B8",
      dark: "#1E293B",
    },
    error: {
      main: "#E11D48",
      light: "#FDA4AF",
      dark: "#9F1239",
    },
    warning: {
      main: "#D97706",
      light: "#FCD34D",
      dark: "#92400E",
    },
    success: {
      main: "#059669",
      light: "#6EE7B7",
      dark: "#065F46",
    },
    info: {
      main: "#0284C7",
      light: "#7DD3FC",
      dark: "#075985",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },
    divider: "#E2E8F0",
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
          border: "1px solid #E2E8F0",
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
