import { createTheme } from "@mui/material/styles";

// ---------------------------------------------------------------------------
// Dark mode palette — inspired by VerifyWise's palette-driven approach
// ---------------------------------------------------------------------------

const status = {
  success: { bg: "#022C22", text: "#34D399", border: "#065F46" },
  error: { bg: "#450A0A", text: "#F87171", border: "#991B1B" },
  warning: { bg: "#451A03", text: "#FBBF24", border: "#92400E" },
  info: { bg: "#0C1929", text: "#60A5FA", border: "#1E3A5F" },
};

const risk = {
  critical: { bg: "#450A0A", text: "#F87171", border: "#991B1B" },
  high: { bg: "#431407", text: "#FB923C", border: "#7C2D12" },
  medium: { bg: "#451A03", text: "#FBBF24", border: "#92400E" },
  low: { bg: "#022C22", text: "#34D399", border: "#065F46" },
  veryLow: { bg: "#0F2E2A", text: "#2DD4BF", border: "#115E59" },
};

const brand = {
  primary: "#818CF8",
  primaryHover: "#6366F1",
  primaryLight: "rgba(129, 140, 248, 0.12)",
  primaryDark: "#A5B4FC",
  secondary: "#2DD4BF",
  secondaryHover: "#14B8A6",
  secondaryLight: "rgba(45, 212, 191, 0.12)",
};

const text = {
  primary: "#F1F5F9",
  secondary: "#94A3B8",
  tertiary: "#64748B",
  disabled: "#475569",
  accent: "#818CF8",
  icon: "#94A3B8",
  muted: "#475569",
};

const background = {
  main: "#1E293B",
  alt: "#FCFCFD",
  modal: "#1E293B",
  fill: "#1E293B",
  accent: "#0F172A",
  hover: "#334155",
  selected: "rgba(129, 140, 248, 0.12)",
  surface: "#1E293B",
  gradientStop: "#1A2235",
  page: "#0F172A",
};

const border = {
  light: "#334155",
  dark: "#475569",
};

const shadows = {
  card: "0 1px 3px rgba(0, 0, 0, 0.15)",
  cardHover: "0 4px 12px rgba(0, 0, 0, 0.25)",
  button: "0 1px 3px rgba(129, 140, 248, 0.15)",
  buttonHover: "0 4px 12px rgba(129, 140, 248, 0.25)",
  dialog: "0 20px 60px rgba(0, 0, 0, 0.4)",
  menu: "0 10px 40px rgba(0, 0, 0, 0.3)",
  tooltip: "0 4px 12px rgba(0, 0, 0, 0.3)",
  modal: "0 25px 60px rgba(0, 0, 0, 0.4)",
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: brand.primary,
      light: "#A5B4FC",
      dark: brand.primaryDark,
      contrastText: "#0F172A",
    },
    secondary: {
      main: brand.secondary,
      light: "#5EEAD4",
      dark: brand.secondaryHover,
      contrastText: "#0F172A",
    },
    status: {
      info: { main: status.info.text, light: status.info.border, bg: status.info.bg, text: status.info.text, border: status.info.border },
      success: { main: status.success.text, light: status.success.border, bg: status.success.bg, text: status.success.text, border: status.success.border },
      error: { main: status.error.text, light: status.error.border, bg: status.error.bg, text: status.error.text, border: status.error.border },
      warning: { main: status.warning.text, light: status.warning.border, bg: status.warning.bg, text: status.warning.text, border: status.warning.border },
    },
    risk: {
      critical: { main: risk.critical.text, bg: risk.critical.bg, text: risk.critical.text, border: risk.critical.border },
      high: { main: risk.high.text, bg: risk.high.bg, text: risk.high.text, border: risk.high.border },
      medium: { main: risk.medium.text, bg: risk.medium.bg, text: risk.medium.text, border: risk.medium.border },
      low: { main: risk.low.text, bg: risk.low.bg, text: risk.low.text, border: risk.low.border },
      veryLow: { main: risk.veryLow.text, bg: risk.veryLow.bg, text: risk.veryLow.text, border: risk.veryLow.border },
    },
    error: { main: status.error.text, light: status.error.border, dark: "#EF4444", contrastText: "#FFFFFF" },
    warning: { main: status.warning.text, light: status.warning.border, dark: "#F59E0B", contrastText: "#0F172A" },
    success: { main: status.success.text, light: status.success.border, dark: "#10B981", contrastText: "#FFFFFF" },
    info: { main: status.info.text, light: status.info.border, dark: "#3B82F6", contrastText: "#FFFFFF" },
    background: {
      default: background.page,
      paper: background.surface,
    },
    text: {
      primary: text.primary,
      secondary: text.secondary,
      disabled: text.disabled,
    },
    divider: border.light,
    action: {
      hover: background.hover,
      selected: background.selected,
      focus: `rgba(129, 140, 248, 0.2)`,
      disabled: text.disabled,
      disabledBackground: background.fill,
    },
    other: {
      icon: text.icon,
      line: border.light,
      fill: background.fill,
      grid: text.tertiary,
    },
    brand: {
      primary: brand.primary,
      primaryHover: brand.primaryHover,
      primaryLight: brand.primaryLight,
      primaryDark: brand.primaryDark,
    },
  },
  shadows: [
    "none",
    shadows.card,
    "0 1px 5px rgba(0,0,0,0.2)",
    "0 1px 8px rgba(0,0,0,0.22)",
    shadows.cardHover,
    "0 4px 16px rgba(0,0,0,0.25)",
    "0 6px 20px rgba(0,0,0,0.28)",
    "0 8px 24px rgba(0,0,0,0.3)",
    "0 10px 30px rgba(0,0,0,0.32)",
    shadows.dialog,
    shadows.menu,
    shadows.modal,
    shadows.tooltip,
    shadows.card, shadows.card, shadows.card, shadows.card, shadows.card,
    shadows.card, shadows.card, shadows.card, shadows.card, shadows.card,
    shadows.card, shadows.card,
  ],
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.2, color: text.primary },
    h2: { fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3, color: text.primary },
    h3: { fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.4, color: text.primary },
    h4: { fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.4, color: text.primary },
    h5: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.5, color: text.primary },
    h6: { fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.5, color: text.primary },
    body1: { fontSize: "0.875rem", lineHeight: 1.6, color: text.primary },
    body2: { fontSize: "0.875rem", lineHeight: 1.5, color: text.secondary },
    caption: { fontSize: "0.75rem", lineHeight: 1.4, color: text.tertiary },
    overline: { fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: text.tertiary },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: background.page,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: `${border.light} transparent`,
        },
        "*::-webkit-scrollbar": { width: 6, height: 6 },
        "*::-webkit-scrollbar-track": { background: "transparent" },
        "*::-webkit-scrollbar-thumb": { background: border.light, borderRadius: 3 },
        "*::-webkit-scrollbar-thumb:hover": { background: border.dark },
      },
    },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 18px",
          fontSize: "0.875rem",
          fontWeight: 600,
          transition: "all 0.15s ease",
          "&:hover": { transform: "translateY(-1px)" },
          "&:focus": { outline: "none" },
        },
        containedPrimary: {
          boxShadow: shadows.button,
          "&:hover": {
            boxShadow: shadows.buttonHover,
            backgroundColor: brand.primaryHover,
          },
        },
        containedSecondary: {
          boxShadow: "0 1px 3px rgba(45, 212, 191, 0.15)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(45, 212, 191, 0.25)",
            backgroundColor: brand.secondaryHover,
          },
        },
        outlined: {
          borderWidth: 1.5,
          "&:hover": { borderWidth: 1.5, backgroundColor: "rgba(129, 140, 248, 0.06)" },
        },
        sizeSmall: { padding: "5px 12px", fontSize: "0.8125rem", minHeight: 28 },
        sizeLarge: { padding: "10px 24px", fontSize: "0.875rem", minHeight: 44 },
      },
    },
    MuiIconButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: { padding: 6, transition: "none", "&:hover": { backgroundColor: background.hover } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: `1px solid ${border.light}`,
          background: `linear-gradient(135deg, ${background.surface} 0%, ${background.gradientStop} 100%)`,
          boxShadow: shadows.card,
          transition: "box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease",
          "&:hover": {
            boxShadow: shadows.cardHover,
            borderColor: border.dark,
            background: `linear-gradient(135deg, ${background.surface} 0%, ${background.accent} 100%)`,
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: { padding: "20px", "&:last-child": { paddingBottom: "20px" } },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: background.surface,
            "&.Mui-focused": { boxShadow: "0 0 0 3px rgba(129, 140, 248, 0.1)" },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: border.light, borderWidth: 1 },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: border.dark },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: brand.primary, borderWidth: 1.5 },
        },
      },
    },
    MuiSelect: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiTable: { styleOverrides: { root: { borderCollapse: "separate", borderSpacing: 0 } } },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: background.fill,
            color: text.secondary,
            fontWeight: 600,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            borderBottom: `1px solid ${border.light}`,
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
            "&:hover": { backgroundColor: "rgba(129, 140, 248, 0.04)" },
            "&:last-child .MuiTableCell-body": { borderBottom: "none" },
          },
          "& .MuiTableCell-body": {
            padding: "12px 16px",
            fontSize: "0.875rem",
            color: text.primary,
            borderBottom: `1px solid ${border.light}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 500, fontSize: "0.75rem", height: 26 },
        filled: {
          "&.MuiChip-colorSuccess": { backgroundColor: status.success.bg, color: status.success.text },
          "&.MuiChip-colorWarning": { backgroundColor: status.warning.bg, color: "#FCD34D" },
          "&.MuiChip-colorError": { backgroundColor: status.error.bg, color: status.error.text },
          "&.MuiChip-colorInfo": { backgroundColor: status.info.bg, color: status.info.text },
        },
        outlined: { borderWidth: 1.5 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: shadows.dialog,
          border: `1px solid ${border.light}`,
          background: background.surface,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: { root: { fontSize: "1.125rem", fontWeight: 700, padding: "24px 24px 8px" } },
    },
    MuiDialogContent: { styleOverrides: { root: { padding: "16px 24px" } } },
    MuiDialogActions: { styleOverrides: { root: { padding: "12px 24px 24px", gap: 8 } } },
    MuiToolbar: {
      styleOverrides: {
        root: { minHeight: 56, "@media (min-width: 600px)": { minHeight: 56 } },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          borderBottom: `1px solid ${border.light}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: { paper: { borderRight: `1px solid ${border.light}` } },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 4, height: 6, backgroundColor: background.fill },
        bar: { borderRadius: 4 },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 8, padding: "12px 16px", fontSize: "0.875rem" },
        standardSuccess: { backgroundColor: status.success.bg, color: status.success.text },
        standardWarning: { backgroundColor: status.warning.bg, color: "#FCD34D" },
        standardError: { backgroundColor: status.error.bg, color: status.error.text },
        standardInfo: { backgroundColor: status.info.bg, color: status.info.text },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 6,
          padding: "6px 10px",
          fontSize: "0.75rem",
          fontWeight: 500,
          boxShadow: shadows.tooltip,
        },
      },
    },
    MuiTab: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.875rem",
          minHeight: 48,
          "&.Mui-selected": { color: brand.primary },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: brand.primary, height: 3, borderRadius: "3px 3px 0 0" },
      },
    },
    MuiListItemButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: "2px 8px",
          padding: "8px 10px",
          transition: "all 0.15s ease",
          "&.Mui-selected": {
            backgroundColor: background.selected,
            color: brand.primary,
            "& .MuiListItemIcon-root": { color: brand.primary },
            "&:hover": { backgroundColor: "rgba(129, 140, 248, 0.18)" },
          },
          "&:hover": { backgroundColor: background.hover },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 34,
          color: text.icon,
          "& .MuiSvgIcon-root": { fontSize: 20 },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          boxShadow: shadows.menu,
          border: `1px solid ${border.light}`,
          marginTop: 4,
        },
      },
    },
    MuiMenuItem: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: "2px 4px",
          padding: "8px 12px",
          fontSize: "0.875rem",
          "&:hover": { backgroundColor: background.hover },
        },
      },
    },
    MuiSwitch: { defaultProps: { disableRipple: true } },
    MuiCheckbox: { defaultProps: { disableRipple: true } },
    MuiRadio: { defaultProps: { disableRipple: true } },
    MuiAvatar: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiBadge: {
      styleOverrides: {
        badge: { borderRadius: 10, minWidth: 20, height: 20, fontSize: "0.7rem", fontWeight: 700 },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          "& button": { borderRadius: 6, color: text.tertiary },
          "& .Mui-selected": { backgroundColor: background.selected, color: brand.primary, "&:hover": { backgroundColor: "rgba(129, 140, 248, 0.18)" } },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: { root: { backgroundColor: background.fill, borderRadius: 6 } },
    },
  },
});
