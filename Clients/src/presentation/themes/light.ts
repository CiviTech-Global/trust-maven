import { createTheme } from "@mui/material/styles";

const purple = {
  50: "#F5F3FF",
  100: "#EDE9FE",
  200: "#DDD6FE",
  300: "#C4B5FD",
  400: "#A78BFA",
  500: "#7C3AED",
  600: "#6D28D9",
  700: "#5B21B6",
  800: "#4C1D95",
  900: "#3B0764",
};

const teal = {
  50: "#F0FDFA",
  100: "#CCFBF1",
  200: "#99F6E4",
  300: "#5EEAD4",
  400: "#2DD4BF",
  500: "#14B8A6",
  600: "#0D9488",
  700: "#0F766E",
  800: "#115E59",
  900: "#134E4A",
};

const neutral = {
  50: "#F8FAFC",
  100: "#F1F5F9",
  200: "#E2E8F0",
  300: "#CBD5E1",
  400: "#94A3B8",
  500: "#64748B",
  600: "#475569",
  700: "#334155",
  800: "#1E293B",
  900: "#0F172A",
};

const emerald = {
  50: "#ECFDF5",
  100: "#D1FAE5",
  200: "#A7F3D0",
  500: "#10B981",
  600: "#059669",
  700: "#047857",
  800: "#065F46",
  900: "#064E3B",
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: purple[500],
      light: purple[400],
      dark: purple[600],
      contrastText: "#FFFFFF",
      50: purple[50],
      100: purple[100],
      200: purple[200],
      300: purple[300],
      400: purple[400],
      500: purple[500],
      600: purple[600],
      700: purple[700],
      800: purple[800],
      900: purple[900],
    },
    secondary: {
      main: teal[600],
      light: teal[400],
      dark: teal[700],
      contrastText: "#FFFFFF",
      50: teal[50],
      100: teal[100],
      200: teal[200],
      300: teal[300],
      400: teal[400],
      500: teal[500],
      600: teal[600],
      700: teal[700],
      800: teal[800],
      900: teal[900],
    },
    error: {
      main: "#DC2626",
      light: "#FCA5A5",
      dark: "#991B1B",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#D97706",
      light: "#FCD34D",
      dark: "#92400E",
      contrastText: "#FFFFFF",
    },
    success: {
      main: emerald[600],
      light: emerald[200],
      dark: emerald[800],
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#2563EB",
      light: "#93C5FD",
      dark: "#1E40AF",
      contrastText: "#FFFFFF",
    },
    background: {
      default: neutral[50],
      paper: "#FFFFFF",
    },
    text: {
      primary: neutral[900],
      secondary: neutral[600],
      disabled: neutral[400],
    },
    divider: neutral[200],
    action: {
      hover: neutral[50],
      selected: purple[50],
      focus: "rgba(124, 58, 237, 0.12)",
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.2, color: neutral[900] },
    h2: { fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3, color: neutral[900] },
    h3: { fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.4, color: neutral[900] },
    h4: { fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.4, color: neutral[900] },
    h5: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.5, color: neutral[800] },
    h6: { fontSize: "0.9375rem", fontWeight: 600, lineHeight: 1.5, color: neutral[800] },
    body1: { fontSize: "0.9375rem", lineHeight: 1.6, color: neutral[800] },
    body2: { fontSize: "0.875rem", lineHeight: 1.5, color: neutral[600] },
    caption: { fontSize: "0.75rem", lineHeight: 1.4, color: neutral[400] },
    overline: { fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: neutral[500] },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: neutral[50],
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: `${neutral[300]} transparent`,
        },
        "*::-webkit-scrollbar": {
          width: 6,
          height: 6,
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          background: neutral[300],
          borderRadius: 3,
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: neutral[400],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 18px",
          fontSize: "0.875rem",
          fontWeight: 600,
          transition: "all 0.2s ease",
        },
        containedPrimary: {
          boxShadow: "0 1px 3px rgba(124, 58, 237, 0.15)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
          },
        },
        containedSecondary: {
          boxShadow: "0 1px 3px rgba(13, 148, 136, 0.15)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(13, 148, 136, 0.25)",
          },
        },
        outlined: {
          borderWidth: 1.5,
          "&:hover": {
            borderWidth: 1.5,
          },
        },
        sizeSmall: {
          padding: "5px 12px",
          fontSize: "0.8125rem",
        },
        sizeLarge: {
          padding: "10px 24px",
          fontSize: "0.9375rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${neutral[200]}`,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
          transition: "box-shadow 0.2s ease, border-color 0.2s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
            borderColor: neutral[200],
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
          "&:last-child": {
            paddingBottom: "24px",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#FFFFFF",
            transition: "box-shadow 0.2s ease, border-color 0.2s ease",
            "&.Mui-focused": {
              boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.08)",
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          borderSpacing: 0,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: neutral[50],
            color: neutral[600],
            fontWeight: 600,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            borderBottom: `1px solid ${neutral[200]}`,
            padding: "10px 16px",
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root": {
            transition: "background-color 0.15s ease",
            "&:hover": {
              backgroundColor: purple[50],
            },
            "&:last-child .MuiTableCell-body": {
              borderBottom: "none",
            },
          },
          "& .MuiTableCell-body": {
            padding: "12px 16px",
            fontSize: "0.875rem",
            color: neutral[800],
            borderBottom: `1px solid ${neutral[100]}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: "0.75rem",
          height: 26,
        },
        filled: {
          "&.MuiChip-colorSuccess": {
            backgroundColor: emerald[50],
            color: emerald[800],
          },
          "&.MuiChip-colorWarning": {
            backgroundColor: "#FFFBEB",
            color: "#92400E",
          },
          "&.MuiChip-colorError": {
            backgroundColor: "#FEF2F2",
            color: "#991B1B",
          },
          "&.MuiChip-colorInfo": {
            backgroundColor: "#EFF6FF",
            color: "#1D4ED8",
          },
        },
        outlined: {
          borderWidth: 1.5,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.125rem",
          fontWeight: 700,
          padding: "24px 24px 8px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "12px 24px 24px",
          gap: 8,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 56,
          "@media (min-width: 600px)": {
            minHeight: 56,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderBottom: `1px solid ${neutral[200]}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: `1px solid ${neutral[200]}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 6,
          backgroundColor: neutral[100],
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "12px 16px",
          fontSize: "0.875rem",
        },
        standardSuccess: {
          backgroundColor: emerald[50],
          color: emerald[800],
        },
        standardWarning: {
          backgroundColor: "#FFFBEB",
          color: "#92400E",
        },
        standardError: {
          backgroundColor: "#FEF2F2",
          color: "#991B1B",
        },
        standardInfo: {
          backgroundColor: "#EFF6FF",
          color: "#1D4ED8",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 6,
          padding: "6px 10px",
          fontSize: "0.75rem",
          fontWeight: 500,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.875rem",
          minHeight: 48,
          "&.Mui-selected": {
            color: purple[500],
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: purple[500],
          height: 3,
          borderRadius: "3px 3px 0 0",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "2px 10px",
          padding: "8px 10px",
          transition: "all 0.15s ease",
          "&.Mui-selected": {
            backgroundColor: purple[50],
            color: purple[600],
            "& .MuiListItemIcon-root": {
              color: purple[600],
            },
            "&:hover": {
              backgroundColor: purple[100],
            },
          },
          "&:hover": {
            backgroundColor: neutral[100],
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 34,
          color: neutral[400],
          transition: "color 0.15s ease",
          "& .MuiSvgIcon-root": {
            fontSize: 20,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
          border: `1px solid ${neutral[200]}`,
          marginTop: 4,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: "2px 4px",
          padding: "8px 12px",
          fontSize: "0.875rem",
          "&:hover": {
            backgroundColor: neutral[50],
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 44,
          height: 24,
          padding: 0,
          "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: 2,
            transitionDuration: "300ms",
            "&.Mui-checked": {
              transform: "translateX(20px)",
              color: "#fff",
              "& + .MuiSwitch-track": {
                backgroundColor: purple[500],
                opacity: 1,
                border: 0,
              },
            },
          },
          "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 20,
            height: 20,
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          },
          "& .MuiSwitch-track": {
            borderRadius: 12,
            backgroundColor: neutral[300],
            opacity: 1,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          borderRadius: 10,
          minWidth: 20,
          height: 20,
          fontSize: "0.7rem",
          fontWeight: 700,
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          "& .MuiAlert-filledSuccess": {
            backgroundColor: emerald[600],
          },
        },
      },
    },
  },
});
