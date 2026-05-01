import { Chip } from "@mui/material";

const DOMAIN_COLORS: Record<string, { bg: string; color: string }> = {
  financial: { bg: "#FEF3C7", color: "#92400E" },
  cybersecurity: { bg: "#FEE2E2", color: "#9F1239" },
  strategic: { bg: "#EDE9FE", color: "#5B21B6" },
  operational: { bg: "#DBEAFE", color: "#1E40AF" },
  regulatory: { bg: "#D1FAE5", color: "#065F46" },
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  identified: { bg: "#F1F5F9", color: "#475569" },
  assessed: { bg: "#DBEAFE", color: "#1D4ED8" },
  treated: { bg: "#D1FAE5", color: "#059669" },
  accepted: { bg: "#FEF3C7", color: "#D97706" },
  closed: { bg: "#F1F5F9", color: "#94A3B8" },
};

const LABEL_MAP: Record<string, string> = {
  financial: "Financial",
  cybersecurity: "Cybersecurity",
  strategic: "Strategic",
  operational: "Operational",
  regulatory: "Regulatory",
  identified: "Identified",
  assessed: "Assessed",
  treated: "Treated",
  accepted: "Accepted",
  closed: "Closed",
};

interface RiskChipProps {
  value: string;
  type: "domain" | "status";
  size?: "small" | "medium";
}

export default function RiskChip({ value, type, size = "small" }: RiskChipProps) {
  const colors = type === "domain" ? DOMAIN_COLORS[value] : STATUS_COLORS[value];
  const label = LABEL_MAP[value] || value;

  return (
    <Chip
      label={label}
      size={size}
      sx={{
        backgroundColor: colors?.bg || "#F1F5F9",
        color: colors?.color || "#475569",
        fontWeight: 500,
        fontSize: "0.75rem",
      }}
    />
  );
}
