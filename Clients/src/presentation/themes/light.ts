import { createTheme } from "@mui/material/styles";

const purple = {
  50: "#F5F3FF",
  100: "#EDE9FE",
  200: "#DDD6FE",
  300: "#C4B5FD",
  400: "#A78BFA",
  500: "#6E3BFA",
  600: "#5B21E3",
  700: "#4C1D95",
  800: "#3B0764",
  900: "#1E0A3C",
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
  50: "#F9FAFB",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: purple[500],
      light: purple[400],
      dark: purple[600],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: teal[500],
      light: teal[400],
      dark: teal[600],
    },
    error: {
      main: "#EF4444",
      light: "#FCA5A5",
      dark: "#DC2626",
    },
    warning: {
      main: "#F59E0B",
      light: "#FCD34D",
      dark: "#D97706",
    },
    success: {
      main: teal[500],
      light: teal[100],
      dark: teal[700],
    },
    info: {
      main: "#3B82F6",
      light: "#93C5FD",
      dark: "#2563EB",
    },
    background: {
      default: "#F4F7FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: neutral[300],
    },
    divider: neutral[200],
    action: {
      hover: neutral[50],
      selected: purple[50],
      focus: "rgba(110, 59, 250, 0.12)",
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.2, color: neutral[900] },
    h2: { fontSize: "1.375rem", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3, color: neutral[900] },
    h3: { fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.4, color: neutral[900] },
    h4: { fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.4, color: neutral[900] },
    h5: { fontSize: "0.9375rem", fontWeight: 600, lineHeight: 1.5, color: neutral[900] },
    h6: { fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.5, color: neutral[800] },
    body1: { fontSize: "0.875rem", lineHeight: 1.6, color: neutral[800] },
    body2: { fontSize: "0.8125rem", lineHeight: 1.5, color: neutral[500] },
    caption: { fontSize: "0.75rem", lineHeight: 1.4, color: neutral[400] },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F4F7FA",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(110, 59, 250, 0.2) transparent",
        },
        "*::-webkit-scrollbar": {
          width: 6,
          height: 6,
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "rgba(110, 59, 250, 0.2)",
          borderRadius: 3,
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: "rgba(110, 59, 250, 0.35)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 18px",
          fontSize: "0.875rem",
          fontWeight: 600,
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        containedPrimary: {
          boxShadow: "0 2px 8px rgba(110, 59, 250, 0.2)",
          "&:hover": {
            boxShadow: "0 4px 14px rgba(110, 59, 250, 0.3)",
          },
        },
        containedSecondary: {
          boxShadow: "0 2px 8px rgba(20, 184, 166, 0.2)",
          "&:hover": {
            boxShadow: "0 4px 14px rgba(20, 184, 166, 0.3)",
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
          fontSize: "1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: "none",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
          transition: "box-shadow 0.2s ease, transform 0.2s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)",
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
            borderRadius: 10,
            backgroundColor: "#FFFFFF",
            transition: "box-shadow 0.2s ease, border-color 0.2s ease",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            },
            "&.Mui-focused": {
              boxShadow: "0 0 0 3px rgba(110, 59, 250, 0.1)",
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
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
            borderBottom: "1px solid",
            borderColor: neutral[200],
            padding: "12px 16px",
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
            padding: "14px 16px",
            fontSize: "0.875rem",
            color: neutral[800],
            borderBottom: "1px solid",
            borderColor: neutral[100],
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "0.75rem",
          height: 28,
        },
        filled: {
          "&.MuiChip-colorSuccess": {
            backgroundColor: teal[50],
            color: teal[700],
          },
          "&.MuiChip-colorWarning": {
            backgroundColor: "#FFFBEB",
            color: "#92400E",
          },
          "&.MuiChip-colorError": {
            backgroundColor: "#FEF2F2",
            color: "#B91C1C",
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
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)",
          padding: "8px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.125rem",
          fontWeight: 700,
          padding: "20px 24px 8px",
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
          padding: "12px 24px 20px",
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
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(255, 255, 255, 0.72)",
          borderBottom: "1px solid",
          borderColor: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none",
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
          borderRadius: 12,
          padding: "12px 16px",
          fontSize: "0.875rem",
        },
        standardSuccess: {
          backgroundColor: teal[50],
          color: teal[800],
        },
        standardWarning: {
          backgroundColor: "#FFFBEB",
          color: "#92400E",
        },
        standardError: {
          backgroundColor: "#FEF2F2",
          color: "#B91C1C",
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
          borderRadius: 8,
          padding: "8px 12px",
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
            color: purple[500],
            "& .MuiListItemIcon-root": {
              color: purple[500],
            },
            "&:hover": {
              backgroundColor: purple[100],
            },
          },
          "&:hover": {
            backgroundColor: neutral[50],
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
          borderRadius: 14,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.06)",
          border: "1px solid",
          borderColor: neutral[100],
          marginTop: 4,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
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
            backgroundColor: teal[500],
          },
        },
      },
    },
  },
});
