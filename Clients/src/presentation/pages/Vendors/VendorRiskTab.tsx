import { useState } from "react";
import {
  Box, Typography, Button, Card, CardContent, Chip, TextField, MenuItem,
  LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import {
  Download as DownloadIcon, TrendingUp as TrendIcon,
  Assignment as QuestionnaireIcon, Warning as WarningIcon,
} from "@mui/icons-material";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from "recharts";
import {
  useVendorRiskTrend, useOverdueAssessments, useScoreQuestionnaire,
} from "../../../infrastructure/api/integrations.api";

interface VendorRiskTabProps {
  vendorId: string;
}

export default function VendorRiskTab({ vendorId }: VendorRiskTabProps) {
  const { data: riskTrend, isLoading: trendLoading } = useVendorRiskTrend(vendorId);
  const { data: overdueList, isLoading: overdueLoading } = useOverdueAssessments();
  const scoreQuestionnaire = useScoreQuestionnaire();
  const [qType, setQType] = useState("standard");
  const [scoringResult, setScoringResult] = useState<string | null>(null);
  const [scoringAnswers, setScoringAnswers] = useState<string>("");

  const handleGenerate = async () => {
    try {
      const mod = await import("../../../infrastructure/api/integrations.api");
      const result = await mod.useGenerateQuestionnaire(qType).refetch();
      if (result.data) {
        setScoringAnswers(JSON.stringify(result.data, null, 2));
      }
    } catch { /* ignore */ }
  };

  const handleScore = async () => {
    try {
      let questionnaire;
      try {
        questionnaire = JSON.parse(scoringAnswers);
      } catch {
        setScoringResult("Invalid JSON format");
        return;
      }
      const result = await scoreQuestionnaire.mutateAsync({ vendorId, questionnaire });
      setScoringResult(JSON.stringify(result, null, 2));
    } catch (err: any) {
      setScoringResult(err?.response?.data?.message || "Scoring failed");
    }
  };

  const vendorTrend = riskTrend?.filter((item: any) => item.vendorId === vendorId);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Risk Trend Chart */}
      <Card>
        <CardContent>
          <Typography variant="h3" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <TrendIcon /> Risk Trend
          </Typography>
          {trendLoading ? (
            <LinearProgress />
          ) : !vendorTrend || vendorTrend.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>No risk trend data available</Typography>
          ) : (
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vendorTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(val: string) => val ? new Date(val).toLocaleDateString() : ""}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="riskScore" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} name="Risk Score" />
                  <Line type="monotone" dataKey="inherentRisk" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} name="Inherent Risk" />
                  <Line type="monotone" dataKey="residualRisk" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} name="Residual Risk" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Overdue Assessments */}
      <Card>
        <CardContent>
          <Typography variant="h3" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <WarningIcon color="warning" /> Overdue Assessments
          </Typography>
          {overdueLoading ? (
            <LinearProgress />
          ) : !overdueList || overdueList.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 2, textAlign: "center" }}>No overdue assessments</Typography>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Assessment</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {overdueList.filter((o: any) => o.vendorId === vendorId || !o.vendorId).map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>{item.vendorName || vendorId}</Typography>
                      </TableCell>
                      <TableCell>{item.title || item.assessmentType || "Assessment"}</TableCell>
                      <TableCell>
                        <Typography variant="body2" color="error.main" fontWeight={600}>
                          {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={item.status || "overdue"} size="small" color="error" />
                      </TableCell>
                    </TableRow>
                  ))}
                  {overdueList.filter((o: any) => o.vendorId === vendorId || !o.vendorId).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Typography color="text.secondary">No overdue items for this vendor</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Questionnaire Auto-Scoring */}
      <Card>
        <CardContent>
          <Typography variant="h3" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <QuestionnaireIcon /> Questionnaire Auto-Scoring
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
              <TextField
                select label="Questionnaire Type" value={qType}
                onChange={(e) => setQType(e.target.value)}
                size="small" sx={{ minWidth: 200 }}
              >
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="security">Security</MenuItem>
                <MenuItem value="privacy">Privacy</MenuItem>
                <MenuItem value="diligence">Due Diligence</MenuItem>
              </TextField>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleGenerate}
              >
                Generate Template
              </Button>
            </Box>
            <TextField
              label="Questionnaire JSON"
              value={scoringAnswers}
              onChange={(e) => setScoringAnswers(e.target.value)}
              multiline
              rows={6}
              fullWidth
              size="small"
              placeholder='[{"question": "...", "answer": "..."}]'
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleScore}
                disabled={scoreQuestionnaire.isPending || !scoringAnswers}
              >
                {scoreQuestionnaire.isPending ? "Scoring..." : "Score Questionnaire"}
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setScoringAnswers("");
                  setScoringResult(null);
                }}
              >
                Clear
              </Button>
            </Box>
          </Box>

          {scoringResult && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>Result</Typography>
              <Box
                component="pre"
                sx={{
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: "grey.100",
                  fontSize: "0.8rem",
                  overflow: "auto",
                  maxHeight: 200,
                }}
              >
                {scoringResult}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
