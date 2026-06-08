import { useState, useMemo } from "react";
import {
  Box, Typography, TextField, MenuItem, LinearProgress, Alert, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Button,
  Grid2 as Grid,
} from "@mui/material";
import {
  ShieldOutlined, CheckCircleOutline, AssignmentOutlined, FolderZipOutlined,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  useCommonControls, useDomains, useImplementations,
  type CommonControl, type ControlImplementation,
} from "../../../infrastructure/api/metaframework.api";
import StatCard from "../../components/common/StatCard";
import EmptyState from "../../components/common/EmptyState";

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

const IMPL_COLORS: Record<string, "success" | "info" | "warning" | "error" | "default"> = {
  implemented: "success",
  in_progress: "info",
  not_started: "default",
  draft: "default",
  awaiting_review: "info",
  awaiting_approval: "info",
  needs_rework: "warning",
  not_applicable: "default",
};

export default function EvidenceMonitoringPage() {
  const navigate = useNavigate();
  const [domainFilter, setDomainFilter] = useState("");
  const [search, setSearch] = useState("");

  const { data: controls, isLoading, error } = useCommonControls({
    domain: domainFilter || undefined,
    search: search || undefined,
  });
  const { data: domains } = useDomains();
  const { data: impls } = useImplementations();

  const implMap = useMemo(() => {
    const map = new Map<string, ControlImplementation>();
    impls?.implementations?.forEach((i) => map.set(i.commonControlId, i));
    return map;
  }, [impls]);

  const totalControls = controls?.length || 0;
  const totalWithEvidence = useMemo(() => {
    if (!controls || !implMap) return 0;
    return controls.filter(
      (c) => (implMap.get(c.id)?.evidenceIds?.length || 0) > 0,
    ).length;
  }, [controls, implMap]);

  const totalEvidenceCollected = useMemo(() => {
    if (!implMap) return 0;
    let count = 0;
    implMap.forEach((i) => {
      count += i.evidenceIds?.length || 0;
    });
    return count;
  }, [implMap]);

  const totalEvidenceRequired = useMemo(() => {
    if (!controls) return 0;
    return controls.reduce(
      (acc, c) => acc + (c.evidenceRequestList?.length || 0),
      0,
    );
  }, [controls]);

  const withEvidencePercent =
    totalControls > 0
      ? Math.round((totalWithEvidence / totalControls) * 100)
      : 0;

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Control Evidence Monitoring
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Total Controls"
            value={totalControls}
            icon={<ShieldOutlined />}
            accentColor="#6366F1"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="With Evidence"
            value={totalWithEvidence}
            icon={<CheckCircleOutline />}
            accentColor={withEvidencePercent >= 80 ? "#059669" : withEvidencePercent >= 50 ? "#CA8A04" : "#EF4444"}
            trend={`${withEvidencePercent}%`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Evidence Collected"
            value={totalEvidenceCollected}
            icon={<FolderZipOutlined />}
            accentColor="#2563EB"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Evidence Required"
            value={totalEvidenceRequired}
            icon={<AssignmentOutlined />}
            accentColor="#7C3AED"
          />
        </Grid>
      </Grid>

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
          Failed to load controls
        </Alert>
      )}

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!controls || controls.length === 0) ? (
        <EmptyState
          title="No controls found"
          description={search || domainFilter ? "Try adjusting your filters" : "No common controls defined yet"}
          icon={<ShieldOutlined />}
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Control</TableCell>
                <TableCell>Domain</TableCell>
                <TableCell>Evidence</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {controls?.map((control: CommonControl) => {
                const impl = implMap.get(control.id);
                const collected = impl?.evidenceIds?.length || 0;
                const requested = control.evidenceRequestList?.length || 0;
                const progress =
                  requested > 0
                    ? Math.min((collected / requested) * 100, 100)
                    : 0;
                const statusColor =
                  collected >= requested && requested > 0
                    ? "#059669"
                    : collected > 0
                      ? "#CA8A04"
                      : "#EF4444";

                const domainColor =
                  DOMAIN_COLORS[
                    hashDomain(control.domain) % DOMAIN_COLORS.length
                  ];

                return (
                  <TableRow key={control.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Chip
                          label={control.code}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Typography variant="body2" fontWeight={500}>
                          {control.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={control.domain}
                        size="small"
                        sx={{
                          backgroundColor: `${domainColor}18`,
                          color: domainColor,
                          fontWeight: 600,
                          fontSize: "0.7rem",
                          border: `1px solid ${domainColor}44`,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 80,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: "#E5E7EB",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              width: `${progress}%`,
                              height: "100%",
                              backgroundColor: statusColor,
                              borderRadius: 4,
                              transition: "width 0.3s ease",
                            }}
                          />
                        </Box>
                        <Typography variant="caption" fontWeight={600} sx={{ color: statusColor }}>
                          {collected}/{requested}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {impl ? (
                        <Chip
                          label={impl.status.replace(/_/g, " ")}
                          size="small"
                          color={IMPL_COLORS[impl.status] || "default"}
                        />
                      ) : (
                        <Typography variant="caption" color="text.disabled">--</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {impl?.dueDate ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Typography variant="body2">
                            {new Date(impl.dueDate).toLocaleDateString()}
                          </Typography>
                          {new Date(impl.dueDate) < new Date() && (
                            <Chip label="OVERDUE" size="small" color="error" sx={{ fontSize: "0.6rem", height: 18 }} />
                          )}
                        </Box>
                      ) : (
                        <Typography variant="caption" color="text.disabled">--</Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Evidence">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/evidence?entityType=common_control&entityId=${control.id}`)}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
