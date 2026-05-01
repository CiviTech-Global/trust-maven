import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, Chip, LinearProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import { CheckCircle as CoveredIcon, Cancel as GapIcon } from "@mui/icons-material";
import { useComplianceCoverage } from "../../../infrastructure/api/frameworks.api";

interface FrameworkDetailModalProps {
  open: boolean;
  onClose: () => void;
  frameworkId: string;
}

export default function FrameworkDetailModal({ open, onClose, frameworkId }: FrameworkDetailModalProps) {
  const { data: coverage, isLoading } = useComplianceCoverage(frameworkId);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        {coverage ? `${coverage.framework.name} ${coverage.framework.version || ""}` : "Framework Coverage"}
      </DialogTitle>
      <DialogContent>
        {isLoading && <LinearProgress />}
        {coverage && (
          <Box>
            <Box sx={{ display: "flex", gap: 4, mb: 3, p: 2, backgroundColor: "#F8FAFC", borderRadius: 1 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h2" sx={{ color: coverage.coveragePercent >= 80 ? "#059669" : coverage.coveragePercent >= 50 ? "#D97706" : "#E11D48" }}>
                  {coverage.coveragePercent}%
                </Typography>
                <Typography variant="body2" color="text.secondary">Coverage</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h2">{coverage.coveredCount}</Typography>
                <Typography variant="body2" color="text.secondary">Covered</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h2" sx={{ color: "#E11D48" }}>{coverage.gaps.length}</Typography>
                <Typography variant="body2" color="text.secondary">Gaps</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h2">{coverage.totalRequirements}</Typography>
                <Typography variant="body2" color="text.secondary">Total</Typography>
              </Box>
            </Box>

            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width={40}>#</TableCell>
                    <TableCell>Requirement</TableCell>
                    <TableCell width={100}>Status</TableCell>
                    <TableCell>Mapped Controls</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coverage.requirementDetails.map((req, idx) => (
                    <TableRow key={req.id} sx={{ backgroundColor: req.covered ? undefined : "#FEF2F2" }}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>{req.title}</Typography>
                        {req.description && <Typography variant="body2" color="text.secondary">{req.description}</Typography>}
                      </TableCell>
                      <TableCell>
                        {req.covered ? (
                          <Chip icon={<CoveredIcon />} label="Covered" size="small" color="success" variant="outlined" />
                        ) : (
                          <Chip icon={<GapIcon />} label="Gap" size="small" color="error" variant="outlined" />
                        )}
                      </TableCell>
                      <TableCell>
                        {req.controls.length > 0 ? (
                          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                            {req.controls.map((c: any) => (
                              <Chip key={c.id} label={c.title} size="small" variant="outlined" />
                            ))}
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary">No controls mapped</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
