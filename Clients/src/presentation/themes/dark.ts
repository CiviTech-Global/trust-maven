import { createTheme } from "@mui/material/styles";

const indigo = {
  50: "#1E1B4B",
  100: "#312E81",
  200: "#3730A3",
  300: "#4338CA",
  400: "#6366F1",
  500: "#818CF8",
  600: "#A5B4FC",
  700: "#C7D2FE",
  800: "#E0E7FF",
  900: "#EEF2FF",
};

const teal = {
  50: "#134E4A",
  100: "#115E59",
  200: "#0F766E",
  300: "#0D9488",
  400: "#14B8A6",
  500: "#2DD4BF",
  600: "#5EEAD4",
  700: "#99F6E4",
  800: "#CCFBF1",
  900: "#F0FDFA",
};

const neutral = {
  50: "#0B0F1A",
  100: "#0F172A",
  200: "#1E293B",
  300: "#334155",
  400: "#475569",
  500: "#64748B",
  600: "#94A3B8",
  700: "#CBD5E1",
  800: "#E2E8F0",
  900: "#F1F5F9",
};

const emerald = {
  50: "#022C22",
  100: "#064E3B",
  200: "#065F46",
  500: "#10B981",
  600: "#34D399",
  700: "#6EE7B7",
  800: "#A7F3D0",
  900: "#D1FAE5",
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: indigo[500],
      light: indigo[400],
      dark: indigo[600],
      contrastText: neutral[900],
      50: indigo[50],
      100: indigo[100],
      200: indigo[200],
      300: indigo[300],
      400: indigo[400],
      500: indigo[500],
      600: indigo[600],
      700: indigo[700],
      800: indigo[800],
      900: indigo[900],
    },
    secondary: {
      main: teal[500],
      light: teal[400],
      dark: teal[600],
      contrastText: neutral[900],
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
      main: "#F87171",
      light: "#FCA5A5",
      dark: "#EF4444",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FBBF24",
      light: "#FCD34D",
      dark: "#F59E0B",
      contrastText: neutral[50],
    },
    success: {
      main: emerald[500],
      light: emerald[600],
      dark: emerald[200],
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#60A5FA",
      light: "#93C5FD",
      dark: "#3B82F6",
      contrastText: neutral[50],
    },
    background: {
      default: neutral[100],
      paper: neutral[200],
    },
    text: {
      primary: neutral[900],
      secondary: neutral[600],
      disabled: neutral[500],
    },
    divider: neutral[300],
    action: {
      hover: neutral[300],
      selected: "rgba(129, 140, 248, 0.12)",
      focus: "rgba(129, 140, 248, 0.2)",
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
    caption: { fontSize: "0.75rem", lineHeight: 1.4, color: neutral[500] },
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
          backgroundColor: neutral[100],
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
          boxShadow: "0 1px 3px rgba(129, 140, 248, 0.15)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(129, 140, 248, 0.25)",
          },
        },
        containedSecondary: {
          boxShadow: "0 1px 3px rgba(45, 212, 191, 0.15)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(45, 212, 191, 0.25)",
          },
        },
        outlined: {
          borderWidth: 1.5,
          "&:hover": {
            borderWidth: 1.5,
            backgroundColor: "rgba(129, 140, 248, 0.08)",
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
          border: `1px solid ${neutral[300]}`,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
          transition: "box-shadow 0.2s ease, border-color 0.2s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
            borderColor: neutral[300],
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
            backgroundColor: neutral[50],
            transition: "box-shadow 0.2s ease, border-color 0.2s ease",
            "&.Mui-focused": {
              boxShadow: "0 0 0 3px rgba(129, 140, 248, 0.12)",
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
        notchedOutline: {
          borderColor: neutral[300],
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
            backgroundColor: neutral[200],
            color: neutral[600],
            fontWeight: 600,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            borderBottom: `1px solid ${neutral[300]}`,
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
              backgroundColor: "rgba(129, 140, 248, 0.04)",
            },
            "&:last-child .MuiTableCell-body": {
              borderBottom: "none",
            },
          },
          "& .MuiTableCell-body": {
            padding: "12px 16px",
            fontSize: "0.875rem",
            color: neutral[800],
            borderBottom: `1px solid ${neutral[300]}`,
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
            backgroundColor: "#451A03",
            color: "#FCD34D",
          },
          "&.MuiChip-colorError": {
            backgroundColor: "#450A0A",
            color: "#FCA5A5",
          },
          "&.MuiChip-colorInfo": {
            backgroundColor: indigo[50],
            color: indigo[700],
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
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
          border: `1px solid ${neutral[300]}`,
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
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          borderBottom: `1px solid ${neutral[300]}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: neutral[100],
          borderRight: `1px solid ${neutral[300]}`,
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
          backgroundColor: neutral[200],
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
          backgroundColor: "#451A03",
          color: "#FCD34D",
        },
        standardError: {
          backgroundColor: "#450A0A",
          color: "#FCA5A5",
        },
        standardInfo: {
          backgroundColor: indigo[50],
          color: indigo[700],
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
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
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
            color: indigo[500],
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: indigo[500],
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
            backgroundColor: "rgba(129, 140, 248, 0.12)",
            color: indigo[500],
            "& .MuiListItemIcon-root": {
              color: indigo[500],
            },
            "&:hover": {
              backgroundColor: "rgba(129, 140, 248, 0.18)",
            },
          },
          "&:hover": {
            backgroundColor: neutral[200],
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 34,
          color: neutral[500],
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
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
          border: `1px solid ${neutral[300]}`,
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
            backgroundColor: neutral[200],
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
                backgroundColor: indigo[500],
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
            backgroundColor: emerald[500],
          },
        },
      },
    },
  },
});
