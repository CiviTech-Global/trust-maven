import { useState } from "react";
import {
  Box, Typography, Button, Card, CardContent, TextField, MenuItem,
  LinearProgress, Alert, Chip,
} from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from "recharts";
import {
  Science as ScienceIcon, PlayArrow as SimulateIcon,
} from "@mui/icons-material";
import {
  useFairAnalyses, useCreateFairAnalysis, useUpdateFairAnalysis,
  useDeleteFairAnalysis, useSimulateFairAnalysis, useFairExposureSummary,
  type FairAnalysis,
} from "../../../infrastructure/api/integrations.api";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const METHODOLOGIES = [
  "standard_fair", "simplified_fair", "detailed_fair",
];

interface FairAnalysisPanelProps {
  riskId: string;
}

export default function FairAnalysisPanel({ riskId }: FairAnalysisPanelProps) {
  const { data: analyses, isLoading, error } = useFairAnalyses(riskId);
  const createAnalysis = useCreateFairAnalysis();
  const updateAnalysis = useUpdateFairAnalysis();
  const deleteAnalysis = useDeleteFairAnalysis();
  const simulate = useSimulateFairAnalysis();
  const { data: exposureSummary } = useFairExposureSummary();
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [editMethodology, setEditMethodology] = useState("");
  const [editLefMin, setEditLefMin] = useState("");
  const [editLefMax, setEditLefMax] = useState("");
  const [editLefLikely, setEditLefLikely] = useState("");
  const [editLefDist, setEditLefDist] = useState("triangular");
  const [editLmMin, setEditLmMin] = useState("");
  const [editLmMax, setEditLmMax] = useState("");
  const [editLmLikely, setEditLmLikely] = useState("");
  const [editLmDist, setEditLmDist] = useState("triangular");
  const [editRuns, setEditRuns] = useState("10000");

  if (isLoading) return <LinearProgress />;
  if (error) return <Alert severity="error">Failed to load FAIR analyses</Alert>;

  const startCreate = () => {
    setEditMethodology("standard_fair");
    setEditLefMin("1");
    setEditLefMax("100");
    setEditLefLikely("10");
    setEditLefDist("triangular");
    setEditLmMin("1000");
    setEditLmMax("1000000");
    setEditLmLikely("50000");
    setEditLmDist("triangular");
    setEditRuns("10000");
    setCreateOpen(true);
  };

  const startEdit = (a: FairAnalysis) => {
    const lef = a.lossEventFrequency || {};
    const lm = a.lossMagnitude || {};
    setEditMethodology(a.methodology);
    setEditLefMin(String(lef.min ?? ""));
    setEditLefMax(String(lef.max ?? ""));
    setEditLefLikely(String(lef.mostLikely ?? ""));
    setEditLefDist(lef.distribution || "triangular");
    setEditLmMin(String(lm.min ?? ""));
    setEditLmMax(String(lm.max ?? ""));
    setEditLmLikely(String(lm.mostLikely ?? ""));
    setEditLmDist(lm.distribution || "triangular");
    setEditRuns(String(a.simulationRuns || 10000));
    setEditingId(a.id);
    setCreateOpen(false);
  };

  const handleSave = async () => {
    const payload = {
      riskId,
      methodology: editMethodology,
      lossEventFrequency: {
        min: Number(editLefMin),
        max: Number(editLefMax),
        mostLikely: Number(editLefLikely),
        distribution: editLefDist,
      },
      lossMagnitude: {
        min: Number(editLmMin),
        max: Number(editLmMax),
        mostLikely: Number(editLmLikely),
        distribution: editLmDist,
      },
      simulationRuns: Number(editRuns),
    };

    if (editingId) {
      await updateAnalysis.mutateAsync({ id: editingId, ...payload });
      setEditingId(null);
    } else {
      await createAnalysis.mutateAsync(payload);
      setCreateOpen(false);
    }
  };

  const handleSimulate = async (id: string) => {
    try {
      await simulate.mutateAsync(id);
    } catch { /* ignore */ }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteAnalysis.mutateAsync(deleteId);
    setDeleteId(null);
  };

  const renderForm = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2, p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
      <Typography variant="h4" sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
        {editingId ? "Edit FAIR Analysis" : "New FAIR Analysis"}
      </Typography>
      <TextField select label="Methodology" value={editMethodology} onChange={(e) => setEditMethodology(e.target.value)} size="small" fullWidth>
        {METHODOLOGIES.map((m) => <MenuItem key={m} value={m}>{m.replace(/_/g, " ")}</MenuItem>)}
      </TextField>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>Loss Event Frequency</Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField label="Min" type="number" value={editLefMin} onChange={(e) => setEditLefMin(e.target.value)} size="small" sx={{ flex: 1 }} />
        <TextField label="Max" type="number" value={editLefMax} onChange={(e) => setEditLefMax(e.target.value)} size="small" sx={{ flex: 1 }} />
        <TextField label="Most Likely" type="number" value={editLefLikely} onChange={(e) => setEditLefLikely(e.target.value)} size="small" sx={{ flex: 1 }} />
      </Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>Loss Magnitude</Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField label="Min" type="number" value={editLmMin} onChange={(e) => setEditLmMin(e.target.value)} size="small" sx={{ flex: 1 }} />
        <TextField label="Max" type="number" value={editLmMax} onChange={(e) => setEditLmMax(e.target.value)} size="small" sx={{ flex: 1 }} />
        <TextField label="Most Likely" type="number" value={editLmLikely} onChange={(e) => setEditLmLikely(e.target.value)} size="small" sx={{ flex: 1 }} />
      </Box>
      <TextField label="Simulation Runs" type="number" value={editRuns} onChange={(e) => setEditRuns(e.target.value)} size="small" fullWidth />
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" startIcon={<ScienceIcon />} onClick={handleSave} disabled={createAnalysis.isPending || updateAnalysis.isPending}>
          {editingId ? "Update" : "Create"} Analysis
        </Button>
        <Button variant="outlined" onClick={() => { setCreateOpen(false); setEditingId(null); }}>Cancel</Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      {exposureSummary && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h4" sx={{ fontSize: "0.9rem", fontWeight: 600, mb: 1.5 }}>Exposure Summary</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Total ALE</Typography>
                <Typography variant="body1" fontWeight={700}>
                  ${exposureSummary.totalALE?.toLocaleString() || "0"}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Avg ALE</Typography>
                <Typography variant="body1" fontWeight={700}>
                  ${exposureSummary.averageALE?.toLocaleString() || "0"}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Risks Analyzed</Typography>
                <Typography variant="body1" fontWeight={700}>{exposureSummary.riskCount || 0}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {(!analyses || analyses.length === 0) ? (
        <EmptyState
          title="No FAIR analysis"
          description="Run a FAIR quantitative analysis to estimate loss exposure"
          actionLabel="Run FAIR Analysis"
          onAction={startCreate}
          icon={<ScienceIcon />}
        />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" startIcon={<ScienceIcon />} onClick={startCreate}>
              New Analysis
            </Button>
          </Box>
          {analyses.map((analysis) => {
            const simResults = analysis.simulationResults;
            const chartData = simResults?.distribution?.map((bucket: any, i: number) => ({
              name: `$${(bucket.range?.[0] || i * 10000).toLocaleString()}`,
              value: bucket.count || 0,
            })) || [];
            const percentiles = simResults?.percentiles || {};

            return (
              <Card key={analysis.id}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Chip label={analysis.methodology.replace(/_/g, " ")} size="small" color="primary" />
                      <Chip label={`${analysis.simulationRuns} runs`} size="small" variant="outlined" />
                    </Box>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Button size="small" startIcon={<SimulateIcon />} onClick={() => handleSimulate(analysis.id)} disabled={simulate.isPending}>
                        Run Simulation
                      </Button>
                      <Button size="small" onClick={() => startEdit(analysis)}>Edit</Button>
                      <Button size="small" color="error" onClick={() => setDeleteId(analysis.id)}>Delete</Button>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="text.secondary">ALE (Annual Loss Expectancy)</Typography>
                      <Typography variant="h5" fontWeight={700} color="primary">
                        ${analysis.annualLossExpectancy?.toLocaleString() ?? "—"}
                      </Typography>
                    </Box>
                    {percentiles.p5 !== undefined && (
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary">P5</Typography>
                        <Typography variant="body1" fontWeight={600}>${Number(percentiles.p5).toLocaleString()}</Typography>
                      </Box>
                    )}
                    {percentiles.p50 !== undefined && (
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary">P50 (Median)</Typography>
                        <Typography variant="body1" fontWeight={600}>${Number(percentiles.p50).toLocaleString()}</Typography>
                      </Box>
                    )}
                    {percentiles.p95 !== undefined && (
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary">P95</Typography>
                        <Typography variant="body1" fontWeight={600}>${Number(percentiles.p95).toLocaleString()}</Typography>
                      </Box>
                    )}
                  </Box>

                  {chartData.length > 0 && (
                    <Box sx={{ height: 250, mt: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Distribution</Typography>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <RechartsTooltip />
                          <Bar dataKey="value" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  )}

                  {analysis.annualLossExpectancy !== null && !chartData.length && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      Click "Run Simulation" to generate Monte Carlo results
                    </Alert>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      {createOpen && renderForm()}
      {editingId && renderForm()}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete FAIR Analysis"
        message="Are you sure you want to delete this analysis?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteAnalysis.isPending}
      />
    </Box>
  );
}
