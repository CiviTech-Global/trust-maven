import { useState } from "react";
import {
  Box, Typography, Button, TextField, MenuItem, Chip, IconButton,
  Tooltip, Paper, Card, CardContent, Switch, FormControlLabel,
  Alert, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Dialog, DialogTitle, DialogContent,
  DialogActions, Select, InputLabel, FormControl,
  ListItemText, ListItemButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Add as AddIcon, Delete as DeleteIcon,
  ContentCopy as CloneIcon, FileUpload as ImportIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowIcon, Settings as SettingsIcon,
  Build as BuildIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import {
  useWorkflows, useWorkflow, useCreateWorkflow, useUpdateWorkflow,
  useDeleteWorkflow, useCloneWorkflow, useSetDefaultWorkflow,
  useImportWorkflow, useValidateWorkflow,
  useGetTransitions, useExecuteTransition,
} from "../../../infrastructure/api/workflow.api";
import type { EntityType, WorkflowState, WorkflowTransition } from "../../../domain/interfaces/workflow";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const ENTITY_TYPES: { value: EntityType; label: string }[] = [
  { value: "policy", label: "Policy" },
  { value: "common_control_implementation", label: "Common Control Implementation" },
  { value: "requirement_implementation", label: "Requirement Implementation" },
  { value: "risk", label: "Risk" },
  { value: "vendor_assessment", label: "Vendor Assessment" },
];

const STATE_TYPE_OPTIONS = [
  { value: "initial", label: "Initial", color: "#4CAF50" },
  { value: "active", label: "Active", color: "#2196F3" },
  { value: "terminal", label: "Terminal", color: "#9E9E9E" },
];

const DEFAULT_COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#F44336", "#9C27B0", "#00BCD4", "#795548", "#607D8B"];

export default function WorkflowBuilderPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<"list" | "editor">("list");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [cloneOpen, setCloneOpen] = useState(false);
  const [cloneName, setCloneName] = useState("");
  const [importOpen, setImportOpen] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedTransitionIdx, setSelectedTransitionIdx] = useState<number | null>(null);
  const [testingState, setTestingState] = useState("");
  const [testResult, setTestResult] = useState<string | null>(null);
  const [entityTypeFilter, setEntityTypeFilter] = useState("");

  const { data: workflows, isLoading } = useWorkflows(entityTypeFilter || undefined);
  const { data: workflow } = useWorkflow(selectedId);
  const createMutation = useCreateWorkflow();
  const updateMutation = useUpdateWorkflow();
  const deleteMutation = useDeleteWorkflow();
  const cloneMutation = useCloneWorkflow();
  const setDefaultMutation = useSetDefaultWorkflow();
  const importMutation = useImportWorkflow();
  const validateMutation = useValidateWorkflow();
  const executeTransitionMutation = useExecuteTransition();

  const workflowId = selectedId;
  const { data: allowedTransitions } = useGetTransitions(
    testingState && workflowId ? workflowId : null,
    testingState || null
  );

  const handleCreate = async () => {
    const wf = await createMutation.mutateAsync({
      name: "New Workflow",
      entityType: "policy",
      states: [
        { name: "draft", label: "Draft", color: "#9E9E9E", type: "initial" as const },
        { name: "approved", label: "Approved", color: "#4CAF50", type: "terminal" as const },
      ],
      transitions: [
        { from: "draft", to: "approved", label: "Approve" },
      ],
    });
    setSelectedId(wf.id);
    setEditMode("editor");
  };

  const handleSelectWorkflow = (id: string) => {
    setSelectedId(id);
    setEditMode("editor");
    setSelectedState(null);
    setSelectedTransitionIdx(null);
    setTestingState("");
    setTestResult(null);
  };

  const handleBack = () => {
    setEditMode("list");
    setSelectedId(null);
  };

  const handleSave = async () => {
    if (!workflow) return;
    await updateMutation.mutateAsync(workflow as any);
  };

  const handleAddState = () => {
    if (!workflow) return;
    const colors = DEFAULT_COLORS.filter(
      (c) => !workflow.states.some((s) => s.color === c)
    );
    const newState = {
      name: "",
      label: "",
      color: colors[0] || "#2196F3",
      type: "active" as const,
    };
    updateMutation.mutate({
      id: workflow.id,
      states: [...workflow.states, newState],
    } as any);
  };

  const handleUpdateState = (index: number, updates: Partial<WorkflowState>) => {
    if (!workflow) return;
    const states = [...workflow.states];
    states[index] = { ...states[index]!, ...updates } as WorkflowState;
    updateMutation.mutate({ id: workflow.id, states } as any);
  };

  const handleDeleteState = (index: number) => {
    if (!workflow) return;
    const state = workflow.states[index]!;
    const states = workflow.states.filter((_, i) => i !== index);
    const transitions = workflow.transitions.filter(
      (t) => t.from !== state.name && t.to !== state.name
    );
    updateMutation.mutate({ id: workflow.id, states, transitions } as any);
    setSelectedState(null);
  };

  const handleAddTransition = () => {
    if (!workflow || workflow.states.length < 2) return;
    const newT = {
      from: workflow.states[0]!.name,
      to: workflow.states[1]!.name,
      label: "",
      requireComment: false,
    };
    updateMutation.mutate({
      id: workflow.id,
      transitions: [...workflow.transitions, newT],
    } as any);
  };

  const handleUpdateTransition = (index: number, updates: Partial<WorkflowTransition>) => {
    if (!workflow) return;
    const transitions = [...workflow.transitions];
    transitions[index] = { ...transitions[index]!, ...updates } as WorkflowTransition;
    updateMutation.mutate({ id: workflow.id, transitions } as any);
  };

  const handleDeleteTransition = (index: number) => {
    if (!workflow) return;
    const transitions = workflow.transitions.filter((_, i) => i !== index);
    updateMutation.mutate({ id: workflow.id, transitions } as any);
    setSelectedTransitionIdx(null);
  };

  const handleValidate = async () => {
    if (!workflow) return;
    const result = await validateMutation.mutateAsync({
      states: workflow.states,
      transitions: workflow.transitions,
    });
    setTestResult(
      result.valid
        ? "Workflow definition is valid!"
        : `Validation errors:\n- ${result.errors.join("\n- ")}`
    );
  };

  const handleTestTransition = async () => {
    if (!workflow || !testingState) return;
    const toState = prompt("Enter target state to test:");
    if (!toState) return;
    const result = await executeTransitionMutation.mutateAsync({
      workflowId: workflow.id,
      entityType: workflow.entityType,
      entityId: "00000000-0000-0000-0000-000000000000",
      fromState: testingState,
      toState,
      comment: "Test transition from workflow builder",
    });
    setTestResult(
      result.success
        ? `SUCCESS: ${result.message}`
        : `FAILED: ${result.message}`
    );
  };

  const handleClone = async () => {
    if (!selectedId || !cloneName) return;
    await cloneMutation.mutateAsync({ id: selectedId, name: cloneName });
    setCloneOpen(false);
    setCloneName("");
  };

  const handleImport = async () => {
    try {
      const json = JSON.parse(importJson);
      await importMutation.mutateAsync(json);
      setImportOpen(false);
      setImportJson("");
    } catch {
      setTestResult("Invalid JSON format");
    }
  };

  if (editMode === "list") {
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h1">Workflows</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" startIcon={<ImportIcon />} onClick={() => setImportOpen(true)}>
              Import
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
              Create Workflow
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            select label="Entity Type" value={entityTypeFilter}
            onChange={(e) => setEntityTypeFilter(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All Types</MenuItem>
            {ENTITY_TYPES.map((et) => (
              <MenuItem key={et.value} value={et.value}>{et.label}</MenuItem>
            ))}
          </TextField>
        </Box>

        {!isLoading && (!workflows || workflows.length === 0) ? (
          <EmptyState
            title="No workflows yet"
            description="Create custom workflow definitions for compliance processes"
            actionLabel="Create First Workflow"
            onAction={handleCreate}
          />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Entity Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Default</TableCell>
                  <TableCell>Version</TableCell>
                  <TableCell>States</TableCell>
                  <TableCell>Updated</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workflows?.map((wf: any) => (
                  <TableRow key={wf.id} hover sx={{ cursor: "pointer" }} onClick={() => handleSelectWorkflow(wf.id)}>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>{wf.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={wf.entityType} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={wf.isActive ? "Active" : "Inactive"}
                        size="small"
                        color={wf.isActive ? "success" : "default"}
                      />
                    </TableCell>
                    <TableCell>
                      {wf.isDefault ? <CheckIcon color="primary" fontSize="small" /> : "--"}
                    </TableCell>
                    <TableCell>v{wf.version}</TableCell>
                    <TableCell>{wf.states?.length || 0}</TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(wf.updatedAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <Tooltip title="Clone">
                        <IconButton size="small" onClick={() => { setCloneOpen(true); setCloneName(`${wf.name} (Copy)`); }}>
                          <CloneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {!wf.isDefault && (
                        <Tooltip title="Set as Default">
                          <IconButton size="small" onClick={() => setDefaultMutation.mutate(wf.id)}>
                            <CheckIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => setDeleteId(wf.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog open={cloneOpen} onClose={() => setCloneOpen(false)}>
          <DialogTitle>Clone Workflow</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus fullWidth label="New Name" value={cloneName}
              onChange={(e) => setCloneName(e.target.value)}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCloneOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleClone}>Clone</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={importOpen} onClose={() => setImportOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Import Workflow</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus fullWidth multiline rows={10}
              label="Paste workflow JSON"
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              sx={{ mt: 1 }}
              placeholder='{ "name": "...", "states": [...], "transitions": [...] }'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setImportOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleImport}>Import</Button>
          </DialogActions>
        </Dialog>

        <ConfirmDialog
          open={!!deleteId}
          title="Delete Workflow"
          message="Are you sure you want to delete this workflow? This action cannot be undone."
          onConfirm={async () => {
            if (deleteId) await deleteMutation.mutateAsync(deleteId);
            setDeleteId(null);
          }}
          onCancel={() => setDeleteId(null)}
          loading={deleteMutation.isPending}
        />
      </Box>
    );
  }

  if (!workflow) {
    return <Typography>Loading workflow...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button onClick={handleBack} size="small">&larr; Back</Button>
          <Typography variant="h1">{workflow.name}</Typography>
          <Chip label={`v${workflow.version}`} size="small" variant="outlined" />
          {workflow.isDefault && <Chip label="Default" size="small" color="primary" />}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" startIcon={<BuildIcon />} onClick={handleValidate}>
            Validate
          </Button>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h3" sx={{ mb: 1, fontSize: "1rem", fontWeight: 600 }}>
              Workflow Properties
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
              <TextField
                label="Name" size="small" value={workflow.name}
                onChange={(e) => updateMutation.mutate({ id: workflow.id, name: e.target.value } as any)}
                sx={{ minWidth: 250 }}
              />
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Entity Type</InputLabel>
                <Select
                  value={workflow.entityType}
                  label="Entity Type"
                  onChange={(e) => updateMutation.mutate({ id: workflow.id, entityType: e.target.value } as any)}
                >
                  {ENTITY_TYPES.map((et) => (
                    <MenuItem key={et.value} value={et.value}>{et.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={workflow.isDefault}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDefaultMutation.mutate(workflow.id);
                      }
                    }}
                  />
                }
                label="Default for type"
              />
            </Box>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h3" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                States
              </Typography>
              <Button size="small" startIcon={<AddIcon />} onClick={handleAddState}>
                Add State
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "flex-start" }}>
              {workflow.states.map((state, idx) => (
                <Card
                  key={idx}
                  variant="outlined"
                  sx={{
                    minWidth: 180,
                    borderLeft: 4,
                    borderLeftColor: state.color,
                    cursor: "pointer",
                    bgcolor: selectedState === state.name ? "action.selected" : "background.paper",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                  onClick={() => { setSelectedState(state.name); setSelectedTransitionIdx(null); }}
                >
                  <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body1" fontWeight={600}>
                        {state.label || state.name || "New State"}
                      </Typography>
                      <Chip
                        label={state.type}
                        size="small"
                        sx={{
                          backgroundColor: STATE_TYPE_OPTIONS.find((o) => o.value === state.type)?.color || "#999",
                          color: "#fff",
                          fontSize: "0.65rem",
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                      {state.name || "(no key)"}
                    </Typography>
                    {state.assigneeRole && (
                      <Typography variant="caption" color="text.secondary">
                        Role: {state.assigneeRole}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h3" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                Transitions
              </Typography>
              <Button size="small" startIcon={<AddIcon />} onClick={handleAddTransition}>
                Add Transition
              </Button>
            </Box>
            {workflow.transitions.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No transitions defined. Add at least one transition between states.</Typography>
            ) : (
              <Box>
                {workflow.transitions.map((t, idx) => (
                  <ListItemButton
                    key={idx}
                    selected={selectedTransitionIdx === idx}
                    onClick={() => { setSelectedTransitionIdx(idx); setSelectedState(null); }}
                    sx={{ borderRadius: 1, mb: 0.5 }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Chip label={t.from} size="small" variant="outlined" />
                          <ArrowIcon fontSize="small" color="action" />
                          <Chip label={t.to} size="small" variant="outlined" />
                          <Typography variant="body2" fontWeight={500} sx={{ ml: 1 }}>
                            {t.label || "(no label)"}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                ))}
              </Box>
            )}
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h3" sx={{ mb: 1, fontSize: "1rem", fontWeight: 600 }}>
              Testing Panel
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", flexWrap: "wrap" }}>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Current State</InputLabel>
                <Select
                  value={testingState}
                  label="Current State"
                  onChange={(e) => setTestingState(e.target.value)}
                >
                  {workflow.states.map((s, i) => (
                    <MenuItem key={i} value={s.name}>{s.label || s.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="outlined" size="small" onClick={handleTestTransition}>
                Test Transition
              </Button>
            </Box>
            {testingState && allowedTransitions && (allowedTransitions as any)?.length > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Allowed transitions from "{testingState}":
                </Typography>
                <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
                  {(allowedTransitions as any[]).map((t: any, i: number) => (
                    <Chip key={i} label={`${t.to} (${t.label || "→"})`} size="small" />
                  ))}
                </Box>
              </Box>
            )}
            {testResult && (
              <Alert severity={testResult.startsWith("SUCCESS") || testResult.startsWith("Workflow definition is valid") ? "success" : "info"} sx={{ mt: 1 }} onClose={() => setTestResult(null)}>
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{testResult}</Typography>
              </Alert>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {selectedState && (() => {
            const idx = workflow.states.findIndex((s) => s.name === selectedState);
            if (idx === -1) return null;
            const state = workflow.states[idx]!;
            return (
              <Paper sx={{ p: 2 }}>
                <Typography variant="h3" sx={{ mb: 2, fontSize: "1rem", fontWeight: 600 }}>
                  State Properties
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Key" size="small" value={state.name}
                    onChange={(e) => handleUpdateState(idx, { name: e.target.value })}
                  />
                  <TextField
                    label="Label" size="small" value={state.label}
                    onChange={(e) => handleUpdateState(idx, { label: e.target.value })}
                  />
                  <TextField
                    label="Color" size="small" value={state.color}
                    onChange={(e) => handleUpdateState(idx, { color: e.target.value })}
                  />
                  <FormControl size="small">
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={state.type}
                      label="Type"
                      onChange={(e) => handleUpdateState(idx, { type: e.target.value as any })}
                    >
                      {STATE_TYPE_OPTIONS.map((o) => (
                        <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Assignee Role" size="small" value={state.assigneeRole || ""}
                    onChange={(e) => handleUpdateState(idx, { assigneeRole: e.target.value || undefined })}
                    placeholder="e.g. admin, risk_manager"
                  />
                  <Button
                    color="error" variant="outlined" size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteState(idx)}
                  >
                    Delete State
                  </Button>
                </Box>
              </Paper>
            );
          })()}

          {selectedTransitionIdx !== null && workflow.transitions[selectedTransitionIdx] && (() => {
            const t = workflow.transitions[selectedTransitionIdx]!;
            return (
              <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="h3" sx={{ mb: 2, fontSize: "1rem", fontWeight: 600 }}>
                  Transition Properties
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <FormControl size="small">
                    <InputLabel>From State</InputLabel>
                    <Select
                      value={t.from}
                      label="From State"
                      onChange={(e) => handleUpdateTransition(selectedTransitionIdx, { from: e.target.value })}
                    >
                      {workflow.states.map((s, i) => (
                        <MenuItem key={i} value={s.name}>{s.label || s.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small">
                    <InputLabel>To State</InputLabel>
                    <Select
                      value={t.to}
                      label="To State"
                      onChange={(e) => handleUpdateTransition(selectedTransitionIdx, { to: e.target.value })}
                    >
                      {workflow.states.map((s, i) => (
                        <MenuItem key={i} value={s.name}>{s.label || s.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Label" size="small" value={t.label}
                    onChange={(e) => handleUpdateTransition(selectedTransitionIdx, { label: e.target.value })}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={t.requireComment || false}
                        onChange={(e) => handleUpdateTransition(selectedTransitionIdx, { requireComment: e.target.checked })}
                      />
                    }
                    label="Require Comment"
                  />
                  <TextField
                    label="Allowed Roles (comma-separated)" size="small"
                    value={t.allowedRoles?.join(", ") || ""}
                    onChange={(e) => handleUpdateTransition(selectedTransitionIdx, {
                      allowedRoles: e.target.value ? e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) : undefined,
                    })}
                  />
                  <Button
                    color="error" variant="outlined" size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteTransition(selectedTransitionIdx)}
                  >
                    Delete Transition
                  </Button>
                </Box>
              </Paper>
            );
          })()}

          {!selectedState && selectedTransitionIdx === null && (
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <SettingsIcon sx={{ fontSize: 40, color: "text.disabled", mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Select a state or transition to edit its properties
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
