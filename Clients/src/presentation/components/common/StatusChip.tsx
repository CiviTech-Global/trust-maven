import { Chip, ChipProps } from "@mui/material";

const DOMAIN_CONFIG: Record<string, { bg: string; color: string; border: string }> = {
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
  investment: { bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0" },
  enterprise: { bg: "#FAF5FF", color: "#7C3AED", border: "#E9D5FF" },
};

const STATUS_LABELS: Record<string, string> = {
  identified: "Identified",
  assessed: "Assessed",
  treated: "Treated",
  accepted: "Accepted",
  closed: "Closed",
  draft: "Draft",
  active: "Active",
  on_hold: "On Hold",
  completed: "Completed",
  archived: "Archived",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  healthy: "Healthy",
  at_risk: "At Risk",
  failing: "Failing",
  not_monitored: "Not Monitored",
  pass: "Pass",
  fail: "Fail",
  error: "Error",
  in_progress: "In Progress",
  open: "Open",
  in_remediation: "In Remediation",
  remediated: "Remediated",
  planned: "Planned",
  cancelled: "Cancelled",
  retired: "Retired",
  reviewed: "Reviewed",
  published: "Published",
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
};

const AUTO_LABEL_MAP: Record<string, string> = {};

for (const [key, label] of Object.entries(STATUS_LABELS)) {
  AUTO_LABEL_MAP[key.toLowerCase()] = key;
  AUTO_LABEL_MAP[label.toLowerCase()] = key;
}

interface StatusChipProps extends Omit<ChipProps, "color"> {
  value: string;
  type?: "domain" | "status";
  variant?: "filled" | "outlined";
}

function resolveConfig(value: string, type?: "domain" | "status") {
  const normalized = value.toLowerCase();
  if (type === "domain" || DOMAIN_CONFIG[normalized]) {
    return { ...DOMAIN_CONFIG[normalized], label: STATUS_LABELS[normalized] || value };
  }
  if (type === "status") {
    return { label: STATUS_LABELS[normalized] || value };
  }
  return { label: STATUS_LABELS[normalized] || value };
}

export default function StatusChip({ value, type, variant = "outlined", sx, ...props }: StatusChipProps) {
  const config = resolveConfig(value, type);

  if (type === "domain" || DOMAIN_CONFIG[value?.toLowerCase()]) {
    const domain = DOMAIN_CONFIG[value?.toLowerCase()];
    if (domain) {
      return (
        <Chip
          label={config.label}
          variant={variant}
          size="small"
          sx={{
            borderColor: domain.border,
            backgroundColor: domain.bg,
            color: domain.color,
            fontWeight: 600,
            fontSize: "0.6875rem",
            height: 26,
            "& .MuiChip-label": { px: 1.2 },
            ...sx,
          }}
          {...props}
        />
      );
    }
  }

  return (
    <Chip
      label={config.label}
      variant={variant}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: "0.6875rem",
        height: 26,
        "& .MuiChip-label": { px: 1.2 },
        ...sx,
      }}
      {...props}
    />
  );
}
