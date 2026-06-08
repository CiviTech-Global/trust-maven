import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    status: {
      info: PaletteColor & { bg: string; text: string; border: string };
      success: PaletteColor & { bg: string; text: string; border: string };
      error: PaletteColor & { bg: string; text: string; border: string };
      warning: PaletteColor & { bg: string; text: string; border: string };
    };
    risk: {
      critical: { main: string; bg: string; text: string; border: string };
      high: { main: string; bg: string; text: string; border: string };
      medium: { main: string; bg: string; text: string; border: string };
      low: { main: string; bg: string; text: string; border: string };
      veryLow: { main: string; bg: string; text: string; border: string };
    };
    brand: {
      primary: string;
      primaryHover: string;
      primaryLight: string;
      primaryDark: string;
    };
    other: {
      icon: string;
      line: string;
      fill: string;
      grid: string;
    };
  }

  interface PaletteOptions {
    status?: {
      info?: { main?: string; light?: string; bg?: string; text?: string; border?: string };
      success?: { main?: string; light?: string; bg?: string; text?: string; border?: string };
      error?: { main?: string; light?: string; bg?: string; text?: string; border?: string };
      warning?: { main?: string; light?: string; bg?: string; text?: string; border?: string };
    };
    risk?: {
      critical?: { main?: string; bg?: string; text?: string; border?: string };
      high?: { main?: string; bg?: string; text?: string; border?: string };
      medium?: { main?: string; bg?: string; text?: string; border?: string };
      low?: { main?: string; bg?: string; text?: string; border?: string };
      veryLow?: { main?: string; bg?: string; text?: string; border?: string };
    };
    brand?: {
      primary?: string;
      primaryHover?: string;
      primaryLight?: string;
      primaryDark?: string;
    };
    other?: {
      icon?: string;
      line?: string;
      fill?: string;
      grid?: string;
    };
  }
}
