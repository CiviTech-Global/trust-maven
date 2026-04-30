import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0F766E",
      light: "#14B8A6",
      dark: "#0A5A54",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#64748B",
      light: "#94A3B8",
      dark: "#334155",
    },
    error: {
      main: "#DC2626",
      light: "#FCA5A5",
      dark: "#991B1B",
    },
    warning: {
      main: "#EA580C",
      light: "#FDBA74",
      dark: "#C2410C",
    },
    success: {
      main: "#16A34A",
      light: "#86EFAC",
      dark: "#15803D",
    },
    info: {
      main: "#2563EB",
      light: "#93C5FD",
      dark: "#1D4ED8",
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
