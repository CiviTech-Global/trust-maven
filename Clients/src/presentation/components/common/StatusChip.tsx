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
  in_progress: "In Progress",
  open: "Open",
  in_remediation: "In Remediation",
  remediated: "Remediated",
  planned: "Planned",
  cancelled: "Cancelled",
  retired: "Retired",
  reviewed: "Reviewed",
  published: "Published",
  resolved: "Resolved",
  confirmed: "Confirmed",
  blocked: "Blocked",
  superseded: "Superseded",
  expired: "Expired",
  deferred: "Deferred",
  mitigated: "Mitigated",
  investigated: "Investigated",
};

const LABEL_TO_VARIANT: Record<string, "success" | "warning" | "error" | "info" | "default"> = {
  approved: "success",
  completed: "success",
  confirmed: "success",
  resolved: "success",
  active: "success",
  treated: "success",
  pass: "success",
  healthy: "success",
  mitigated: "success",
  remediated: "success",
  published: "success",
  closed: "info",
  reviewed: "info",
  planned: "info",
  investigated: "info",
  in_progress: "warning",
  pending: "warning",
  on_hold: "warning",
  deferred: "warning",
  expired: "warning",
  at_risk: "warning",
  assessed: "warning",
  blocked: "error",
  rejected: "error",
  failing: "error",
  fail: "error",
  open: "error",
  cancelled: "error",
  retired: "error",
  superseded: "error",
  draft: "default",
  archived: "default",
  identified: "default",
  accepted: "default",
  not_monitored: "default",
  error: "error",
  in_remediation: "warning",
};

const VARIANT_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  success: { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  warning: { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
  error: { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
  info: { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
  default: { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" },
};

function resolveVariant(value: string): keyof typeof VARIANT_COLORS {
  const normalized = value.toLowerCase().trim();
  const exactMatch = LABEL_TO_VARIANT[normalized];
  if (exactMatch) return exactMatch;
  for (const [key, variant] of Object.entries(LABEL_TO_VARIANT)) {
    if (normalized.includes(key)) return variant;
  }
  return "default";
}

interface StatusChipProps extends Omit<ChipProps, "color"> {
  value: string;
  type?: "domain" | "status";
}

export default function StatusChip({ value, type, sx, ...props }: StatusChipProps) {
  const normalized = value.toLowerCase();

  if (type === "domain" || DOMAIN_CONFIG[normalized]) {
    const domain = DOMAIN_CONFIG[normalized];
    if (domain) {
      return (
        <Chip
          label={STATUS_LABELS[normalized] || value}
          variant="outlined"
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

  const variant = resolveVariant(value);
  const colors = VARIANT_COLORS[variant]!;

  return (
    <Chip
      label={STATUS_LABELS[normalized] || value}
      size="small"
      sx={{
        backgroundColor: colors.bg,
        color: colors.color,
        border: `1px solid ${colors.border}`,
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
