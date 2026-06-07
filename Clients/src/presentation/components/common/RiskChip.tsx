import { Chip } from "@mui/material";

const DOMAIN_COLORS: Record<string, { bg: string; color: string }> = {
  financial: { bg: "#FEF3C7", color: "#92400E" },
  cybersecurity: { bg: "#FEE2E2", color: "#9F1239" },
  strategic: { bg: "#EDE9FE", color: "#5B21B6" },
  operational: { bg: "#DBEAFE", color: "#1E40AF" },
  regulatory: { bg: "#D1FAE5", color: "#065F46" },
};

export const DOMAIN_PALETTE = {
  financial: { bg: "#FFFBEB", color: "#B45309", border: "#FDE68A" },
  cybersecurity: { bg: "#FEF2F2", color: "#B91C1C", border: "#FECACA" },
  strategic: { bg: "#F5F3FF", color: "#6D28D9", border: "#DDD6FE" },
  operational: { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
  regulatory: { bg: "#ECFDF5", color: "#047857", border: "#A7F3D0" },
  reputational: { bg: "#FFF1F2", color: "#BE123C", border: "#FECDD3" },
  dataPrivacy: { bg: "#F8FAFC", color: "#475569", border: "#E2E8F0" },
  innovation: { bg: "#FDF4FF", color: "#A21CAF", border: "#F5D0FE" },
  esg: { bg: "#ECFCCB", color: "#4D7C0F", border: "#BEF264" },
  modelMl: { bg: "#F0F9FF", color: "#0369A1", border: "#BAE6FD" },
  socialMedia: { bg: "#FFF7ED", color: "#C2410C", border: "#FED7AA" },
  investment: { bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0" },
  enterprise: { bg: "#FAF5FF", color: "#7C3AED", border: "#E9D5FF" },
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  identified: { bg: "#F1F5F9", color: "#475569" },
  assessed: { bg: "#EFF6FF", color: "#1D4ED8" },
  treated: { bg: "#ECFDF5", color: "#047857" },
  accepted: { bg: "#FFFBEB", color: "#B45309" },
  closed: { bg: "#F1F5F9", color: "#94A3B8" },
};

const LABEL_MAP: Record<string, string> = {
  financial: "Financial",
  cybersecurity: "Cybersecurity",
  strategic: "Strategic",
  operational: "Operational",
  regulatory: "Regulatory",
  reputational: "Reputational",
  dataPrivacy: "Data Privacy",
  innovation: "Innovation",
  esg: "ESG",
  modelMl: "Model/ML",
  socialMedia: "Social Media",
  investment: "Investment",
  enterprise: "Enterprise",
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
  const palette = type === "domain" ? DOMAIN_PALETTE[value as keyof typeof DOMAIN_PALETTE] : undefined;
  const colors = type === "domain" ? DOMAIN_COLORS[value] : STATUS_COLORS[value];
  const label = LABEL_MAP[value] || value;

  if (type === "domain" && palette) {
    return (
      <Chip
        label={label}
        size={size}
        variant="outlined"
        sx={{
          borderColor: palette.border,
          backgroundColor: palette.bg,
          color: palette.color,
          fontWeight: 600,
          fontSize: "0.6875rem",
          height: 26,
          "& .MuiChip-label": { px: 1.2 },
        }}
      />
    );
  }

  return (
    <Chip
      label={label}
      size={size}
      sx={{
        backgroundColor: colors?.bg || "#F1F5F9",
        color: colors?.color || "#475569",
        fontWeight: 600,
        fontSize: "0.6875rem",
        height: 26,
        "& .MuiChip-label": { px: 1.2 },
      }}
    />
  );
}
