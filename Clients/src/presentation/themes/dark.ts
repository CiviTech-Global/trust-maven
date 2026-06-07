import { createTheme } from "@mui/material/styles";

const coral = {
  50: "#2A0D14",
  100: "#4D1422",
  200: "#701B30",
  300: "#93223E",
  400: "#B6294C",
  500: "#E94560",
  600: "#ED6078",
  700: "#F17B90",
  800: "#F5A0B0",
  900: "#FCD9E0",
};

const blue = {
  50: "#0A1428",
  100: "#0F1E3C",
  200: "#0F3460",
  300: "#144A84",
  400: "#1960A8",
  500: "#1E76CC",
  600: "#3A8FE0",
  700: "#60A8EA",
  800: "#90C4F2",
  900: "#C8E2FA",
};

const neutral = {
  50: "#14142B",
  100: "#1A1A2E",
  200: "#16213E",
  300: "#1E2648",
  400: "#2A3658",
  500: "#5A6A84",
  600: "#70809E",
  700: "#8A96B0",
  800: "#B0B8D0",
  900: "#F9F9F9",
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: coral[500],
      light: coral[400],
      dark: coral[600],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: blue[200],
      light: blue[100],
      dark: blue[300],
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
      main: "#22C55E",
      light: "#86EFAC",
      dark: "#16A34A",
    },
    info: {
      main: blue[500],
      light: blue[400],
      dark: blue[600],
    },
    background: {
      default: neutral[100],
      paper: neutral[300],
    },
    text: {
      primary: neutral[900],
      secondary: neutral[700],
      disabled: neutral[500],
    },
    divider: blue[200],
    action: {
      hover: neutral[300],
      selected: "rgba(233, 69, 96, 0.15)",
      focus: "rgba(233, 69, 96, 0.2)",
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
    body2: { fontSize: "0.8125rem", lineHeight: 1.5, color: neutral[700] },
    caption: { fontSize: "0.75rem", lineHeight: 1.4, color: neutral[600] },
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
          scrollbarColor: "rgba(233, 69, 96, 0.25) transparent",
        },
        "*::-webkit-scrollbar": {
          width: 6,
          height: 6,
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "rgba(233, 69, 96, 0.25)",
          borderRadius: 3,
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: "rgba(233, 69, 96, 0.4)",
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
          boxShadow: "0 2px 8px rgba(233, 69, 96, 0.25)",
          "&:hover": {
            boxShadow: "0 4px 14px rgba(233, 69, 96, 0.35)",
          },
        },
        containedSecondary: {
          boxShadow: "0 2px 8px rgba(15, 52, 96, 0.3)",
          "&:hover": {
            boxShadow: "0 4px 14px rgba(15, 52, 96, 0.4)",
          },
        },
        outlined: {
          borderWidth: 1.5,
          "&:hover": {
            borderWidth: 1.5,
            backgroundColor: "rgba(233, 69, 96, 0.08)",
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
          border: "1px solid",
          borderColor: blue[200],
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.15)",
          transition: "box-shadow 0.2s ease, border-color 0.2s ease",
          "&:hover": {
            borderColor: blue[300],
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
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
            backgroundColor: neutral[50],
            transition: "box-shadow 0.2s ease, border-color 0.2s ease",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            },
            "&.Mui-focused": {
              boxShadow: "0 0 0 3px rgba(233, 69, 96, 0.15)",
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
        notchedOutline: {
          borderColor: blue[200],
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
            backgroundColor: neutral[300],
            color: neutral[700],
            fontWeight: 600,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            borderBottom: "1px solid",
            borderColor: blue[200],
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
              backgroundColor: "rgba(233, 69, 96, 0.04)",
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
            borderColor: blue[200],
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
            backgroundColor: "#052E16",
            color: "#86EFAC",
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
            backgroundColor: blue[50],
            color: blue[700],
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
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3)",
          padding: "8px",
          border: "1px solid",
          borderColor: blue[200],
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
          backgroundColor: "rgba(22, 33, 62, 0.8)",
          borderBottom: "1px solid",
          borderColor: blue[200],
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: neutral[100],
          borderRight: "1px solid",
          borderColor: blue[200],
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
          borderRadius: 12,
          padding: "12px 16px",
          fontSize: "0.875rem",
        },
        standardSuccess: {
          backgroundColor: "#052E16",
          color: "#86EFAC",
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
          backgroundColor: blue[50],
          color: blue[700],
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
            color: coral[500],
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: coral[500],
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
            backgroundColor: "rgba(233, 69, 96, 0.12)",
            color: coral[500],
            "& .MuiListItemIcon-root": {
              color: coral[500],
            },
            "&:hover": {
              backgroundColor: "rgba(233, 69, 96, 0.18)",
            },
          },
          "&:hover": {
            backgroundColor: neutral[300],
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 34,
          color: neutral[600],
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
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)",
          border: "1px solid",
          borderColor: blue[200],
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
            backgroundColor: neutral[300],
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
                backgroundColor: coral[500],
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
            backgroundColor: blue[200],
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
            backgroundColor: "#22C55E",
          },
        },
      },
    },
  },
});
