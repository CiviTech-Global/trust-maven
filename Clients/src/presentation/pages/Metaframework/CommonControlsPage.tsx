import { useState, useMemo } from "react";
import {
  Box, Typography, TextField, MenuItem, LinearProgress, Alert,
  Card, CardContent, CardActionArea, Chip, Grid2 as Grid,
} from "@mui/material";
import {
  ShieldOutlined, DomainOutlined, Link as LinkIcon,
  CheckCircleOutline, AssignmentOutlined,
} from "@mui/icons-material";
import {
  useCommonControls, useDomains, useImplementations,
  type CommonControl,
} from "../../../infrastructure/api/metaframework.api";
import StatCard from "../../components/common/StatCard";
import EmptyState from "../../components/common/EmptyState";
import ControlDetailDialog from "./ControlDetailDialog";

const WEIGHT_COLORS: Record<string, string> = {
  critical: "#DC2626",
  high: "#EA580C",
  medium: "#CA8A04",
  low: "#16A34A",
};

const DOMAIN_COLORS = [
  "#6366F1", "#8B5CF6", "#A855F7", "#D946EF", "#EC4899",
  "#F43F5E", "#EF4444", "#F97316", "#F59E0B", "#EAB308",
  "#84CC16", "#22C55E", "#10B981", "#14B8A6", "#06B6D4",
  "#0EA5E9", "#3B82F6", "#2563EB", "#7C3AED", "#6D28D9",
];

function hashDomain(domain: string): number {
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = ((hash << 5) - hash) + domain.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function ControlCard({
  control,
  implStatus,
  mappingCount,
  onClick,
}: {
  control: CommonControl;
  implStatus?: string;
  mappingCount?: number;
  onClick: () => void;
}) {
  const color = DOMAIN_COLORS[hashDomain(control.domain) % DOMAIN_COLORS.length];

  return (
    <Card
      sx={{
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transform: "translateY(-1px)",
        },
      }}
    >
      <CardActionArea onClick={onClick} sx={{ pt: 2, pb: 1.5, px: 2, height: "100%" }}>
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Chip label={control.code} size="small" color="primary" variant="outlined" />
            <Chip
              label={control.controlWeight}
              size="small"
              sx={{
                color: "#fff",
                backgroundColor: WEIGHT_COLORS[control.controlWeight] || "#6B7280",
                fontWeight: 600,
                fontSize: "0.65rem",
              }}
            />
          </Box>

          <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5, lineHeight: 1.3 }}>
            {control.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.4,
            }}
          >
            {control.objective || control.description || ""}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Chip
              icon={<DomainOutlined sx={{ fontSize: 14 }} />}
              label={control.domain}
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.7rem" }}
            />
            {implStatus && (
              <Chip
                label={implStatus.replace(/_/g, " ")}
                size="small"
                color={implStatus === "implemented" ? "success" : implStatus === "in_progress" ? "info" : "default"}
                sx={{ fontSize: "0.7rem" }}
              />
            )}
            {mappingCount !== undefined && mappingCount > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, ml: "auto" }}>
                <LinkIcon sx={{ fontSize: 13, color: "text.disabled" }} />
                <Typography variant="caption" color="text.disabled">{mappingCount}</Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function CommonControlsPage() {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [selectedControlId, setSelectedControlId] = useState<string | null>(null);

  const { data: controls, isLoading, error } = useCommonControls({
    search: search || undefined,
    domain: domainFilter || undefined,
  });
  const { data: domains } = useDomains();
  const { data: impls } = useImplementations();

  const implMap = useMemo(() => {
    const map = new Map<string, string>();
    impls?.implementations?.forEach((i) => map.set(i.commonControlId, i.status));
    return map;
  }, [impls]);

  const summary = impls?.summary;

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Common Controls Library
      </Typography>

      {summary && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              label="Total Controls"
              value={summary.total}
              icon={<ShieldOutlined />}
              accentColor="#6366F1"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              label="Domains"
              value={domains?.length || 0}
              icon={<DomainOutlined />}
              accentColor="#8B5CF6"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              label="Implemented"
              value={summary.implemented}
              icon={<CheckCircleOutline />}
              accentColor="#10B981"
              trend={summary.implemented > 0 ? `+${summary.implemented}` : undefined}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              label="Compliance"
              value={`${summary.compliancePercent}%`}
              icon={<AssignmentOutlined />}
              accentColor={summary.compliancePercent >= 80 ? "#10B981" : summary.compliancePercent >= 50 ? "#F59E0B" : "#EF4444"}
            />
          </Grid>
        </Grid>
      )}

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          select
          label="Domain"
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Domains</MenuItem>
          {domains?.map((d) => (
            <MenuItem key={d} value={d}>{d}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Search controls..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: 250 }}
          placeholder="Search by code, title, or description..."
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load common controls
        </Alert>
      )}

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!controls || controls.length === 0) ? (
        <EmptyState
          title="No controls found"
          description={search || domainFilter ? "Try adjusting your filters" : "Common controls library is empty"}
          icon={<ShieldOutlined />}
        />
      ) : (
        <Grid container spacing={2}>
          {controls?.map((control) => (
            <Grid key={control.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <ControlCard
                control={control}
                implStatus={implMap.get(control.id)}
                onClick={() => setSelectedControlId(control.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {selectedControlId && (
        <ControlDetailDialog
          open={!!selectedControlId}
          onClose={() => setSelectedControlId(null)}
          controlId={selectedControlId}
        />
      )}
    </Box>
  );
}
