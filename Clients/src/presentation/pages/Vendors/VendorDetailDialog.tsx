import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Chip, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Alert, IconButton,
} from "@mui/material";
import {
  Close as CloseIcon, Add as AddIcon,
  Link as LinkIcon,
  Event as EventIcon,
  Person as PersonIcon,
  CheckCircle as ActiveIcon,
  Block as InactiveIcon,
} from "@mui/icons-material";
import {
  useVendor, useVendorAssessments,
  useCreateVendorAssessment, type VendorItem,
} from "../../../infrastructure/api/vendors.api";
import { useEvidence } from "../../../infrastructure/api/evidence.api";
import VendorRiskTab from "./VendorRiskTab";

interface VendorDetailDialogProps {
  vendorId: string | null;
  onClose: () => void;
}

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return value === index ? <Box sx={{ py: 2 }}>{children}</Box> : null;
}

export default function VendorDetailDialog({ vendorId, onClose }: VendorDetailDialogProps) {
  const [tab, setTab] = useState(0);

  const { data: vendor, isLoading, error } = useVendor(vendorId);
  const { data: assessments, isLoading: assessmentsLoading } = useVendorAssessments(vendorId);
  const { data: evidence, isLoading: evidenceLoading } = useEvidence(
    vendorId ? { entityType: "vendor", entityId: vendorId } : undefined,
  );
  const createAssessment = useCreateVendorAssessment();

  const handleCreateAssessment = async () => {
    if (!vendorId) return;
    await createAssessment.mutateAsync({
      vendorId,
      title: `Assessment - ${new Date().toLocaleDateString()}`,
      assessmentType: "security",
    });
  };

  if (!vendorId) return null;

  return (
    <Dialog open={!!vendorId} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {vendor?.name || "Vendor Details"}
          {vendor && (
            <Chip
              label={vendor.status}
              size="small"
              color={vendor.status === "active" ? "success" : "default"}
              variant="outlined"
            />
          )}
        </Box>
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>

      {isLoading && <LinearProgress />}
      {error && <Alert severity="error" sx={{ mx: 2 }}>Failed to load vendor details</Alert>}

      {vendor && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              <Tab label="Overview" />
              <Tab label="Assessments" />
              <Tab label="Risk Trend" />
              <Tab label="Evidence" />
            </Tabs>
          </Box>

          <DialogContent dividers>
            <TabPanel value={tab} index={0}>
              <OverviewTab vendor={vendor} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h3">Vendor Assessments</Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleCreateAssessment}
                  disabled={createAssessment.isPending}
                >
                  {createAssessment.isPending ? "Creating..." : "New Assessment"}
                </Button>
              </Box>
              {assessmentsLoading ? (
                <LinearProgress />
              ) : !assessments || assessments.length === 0 ? (
                <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>
                  No assessments yet
                </Typography>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Risk Rating</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assessments.map((a) => (
                        <TableRow key={a.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>{a.title}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={a.assessmentType} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>{a.score != null ? `${a.score}/100` : "--"}</TableCell>
                          <TableCell>
                            {a.riskRating ? (
                              <Chip label={a.riskRating} size="small" color={
                                a.riskRating === "critical" || a.riskRating === "high" ? "error" :
                                a.riskRating === "medium" ? "warning" : "success"
                              } />
                            ) : "--"}
                          </TableCell>
                          <TableCell>
                            <Chip label={a.status} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {a.assessedAt ? new Date(a.assessedAt).toLocaleDateString() : new Date(a.createdAt).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </TabPanel>
            <TabPanel value={tab} index={2}>
              {vendorId && <VendorRiskTab vendorId={vendorId} />}
            </TabPanel>
            <TabPanel value={tab} index={3}>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Linked Evidence ({evidence?.length ?? 0})
              </Typography>
              {evidenceLoading ? (
                <LinearProgress />
              ) : !evidence || evidence.length === 0 ? (
                <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>
                  No evidence linked to this vendor
                </Typography>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Uploaded By</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {evidence.map((e) => (
                        <TableRow key={e.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <LinkIcon fontSize="small" color="primary" />
                              {e.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={e.fileType || "document"} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <Chip label={e.status} size="small" color={e.status === "approved" ? "success" : "default"} variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <PersonIcon fontSize="small" color="action" />
                              {e.uploadedBy
                                ? `${e.uploadedBy.firstName} ${e.uploadedBy.lastName}`
                                : e.uploadedById?.slice(0, 8) || "--"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <EventIcon fontSize="small" />
                              {new Date(e.createdAt).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </TabPanel>
          </DialogContent>
        </>
      )}

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function OverviewTab({ vendor }: { vendor: VendorItem }) {
  const contactInfo = vendor.contactInfo as Record<string, unknown> | null;

  const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Box sx={{ display: "flex", py: 0.75, borderBottom: "1px solid", borderColor: "divider" }}>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 160, fontWeight: 500 }}>{label}</Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );

  const RISK_COLORS: Record<string, string> = {
    critical: "#9F1239", high: "#9A3412", medium: "#92400E", low: "#065F46",
  };
  const RISK_BG: Record<string, string> = {
    critical: "#FEE2E2", high: "#FED7AA", medium: "#FEF3C7", low: "#D1FAE5",
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2 }}>General Information</Typography>
      <Row label="Name" value={vendor.name} />
      <Row label="Description" value={vendor.description || "--"} />
      <Row
        label="Risk Level"
        value={
          <Chip
            label={vendor.riskLevel}
            size="small"
            sx={{
              backgroundColor: RISK_BG[vendor.riskLevel] || "#F1F5F9",
              color: RISK_COLORS[vendor.riskLevel] || "#475569",
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          />
        }
      />
      <Row
        label="Status"
        value={
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {vendor.status === "active" ? <ActiveIcon fontSize="small" color="success" /> : <InactiveIcon fontSize="small" color="disabled" />}
            <Chip label={vendor.status} size="small" color={vendor.status === "active" ? "success" : "default"} variant="outlined" />
          </Box>
        }
      />
      <Row
        label="Contact Email"
        value={contactInfo?.email ? String(contactInfo.email) : "--"}
      />

      <Typography variant="h3" sx={{ mt: 3, mb: 2 }}>Contract Information</Typography>
      <Row label="Contract Start" value={contactInfo?.contractStart ? String(contactInfo.contractStart) : "--"} />
      <Row label="Contract End" value={contactInfo?.contractEnd ? String(contactInfo.contractEnd) : "--"} />
      <Row
        label="Renewal Status"
        value={contactInfo?.renewalStatus ? String(contactInfo.renewalStatus) : "--"}
      />
      <Row label="Vendor Contact" value={contactInfo?.vendorContact ? String(contactInfo.vendorContact) : "--"} />

      <Typography variant="h3" sx={{ mt: 3, mb: 2 }}>Timeline</Typography>
      <Row label="Created" value={new Date(vendor.createdAt).toLocaleString()} />
      <Row label="Last Updated" value={new Date(vendor.updatedAt).toLocaleString()} />
    </Box>
  );
}
