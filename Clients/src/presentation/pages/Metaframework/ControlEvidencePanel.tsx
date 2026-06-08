import { useState } from "react";
import {
  Box, Typography, Button, Chip, IconButton, Tooltip, LinearProgress, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem,
  ListItemText, ListItemButton,
} from "@mui/material";
import { Add as AddIcon, RemoveCircleOutline as RemoveIcon } from "@mui/icons-material";
import {
  useEvidence, useCreateEvidence, useUpdateEvidence,
  type EvidenceItem,
} from "../../../infrastructure/api/evidence.api";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  draft: { bg: "#F1F5F9", color: "#475569" },
  submitted: { bg: "#DBEAFE", color: "#1E40AF" },
  approved: { bg: "#D1FAE5", color: "#065F46" },
  rejected: { bg: "#FEE2E2", color: "#9F1239" },
};

interface ControlEvidencePanelProps {
  controlId: string;
  evidenceIds: string[];
  onUpdateEvidence: (ids: string[]) => void;
}

export default function ControlEvidencePanel({
  controlId,
  evidenceIds,
  onUpdateEvidence,
}: ControlEvidencePanelProps) {
  const [attachOpen, setAttachOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [createTitle, setCreateTitle] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [mode, setMode] = useState<"search" | "create">("search");
  const [error, setError] = useState("");

  const { data: linkedEvidence, isLoading: linkedLoading } = useEvidence({
    entityType: "common_control",
    entityId: controlId,
  });

  const { data: searchResults, isLoading: searchLoading } = useEvidence(
    searchTerm ? { search: searchTerm } : undefined,
  );

  const createEvidence = useCreateEvidence();
  const updateEvidence = useUpdateEvidence();

  const unlinkedEvidence = (searchResults || []).filter(
    (e: EvidenceItem) => e.entityType !== "common_control",
  );

  const handleLinkExisting = async (evidenceId: string) => {
    try {
      setError("");
      await updateEvidence.mutateAsync({
        id: evidenceId,
        entityType: "common_control",
        entityId: controlId,
      });
      const newIds = evidenceIds.includes(evidenceId)
        ? evidenceIds
        : [...evidenceIds, evidenceId];
      onUpdateEvidence(newIds);
      setAttachOpen(false);
    } catch {
      setError("Failed to link evidence");
    }
  };

  const handleCreateAndLink = async () => {
    if (!createTitle.trim()) return;
    try {
      setError("");
      const created = await createEvidence.mutateAsync({
        title: createTitle.trim(),
        description: createDescription.trim() || undefined,
        entityType: "common_control",
        entityId: controlId,
        status: "draft",
      });
      const newIds = [...evidenceIds, created.id];
      onUpdateEvidence(newIds);
      setAttachOpen(false);
      setCreateTitle("");
      setCreateDescription("");
    } catch {
      setError("Failed to create evidence");
    }
  };

  const handleRemove = (evidenceId: string) => {
    const newIds = evidenceIds.filter((id) => id !== evidenceId);
    onUpdateEvidence(newIds);
  };

  const handleCloseAttach = () => {
    setAttachOpen(false);
    setSearchTerm("");
    setCreateTitle("");
    setCreateDescription("");
    setError("");
    setMode("search");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600 }}>
          Linked Evidence ({linkedEvidence?.length || 0})
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setAttachOpen(true)}
        >
          Attach Evidence
        </Button>
      </Box>

      {linkedLoading && <LinearProgress sx={{ mb: 1 }} />}

      {!linkedLoading && (!linkedEvidence || linkedEvidence.length === 0) ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
          No evidence linked to this control
        </Typography>
      ) : (
        <List disablePadding>
          {linkedEvidence?.map((item: EvidenceItem) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <Tooltip title="Remove">
                  <IconButton edge="end" size="small" color="error" onClick={() => handleRemove(item.id)}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              }
              sx={{ borderBottom: "1px solid", borderColor: "divider", py: 1 }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" fontWeight={600}>{item.title}</Typography>
                    <Chip
                      label={item.status}
                      size="small"
                      sx={{
                        backgroundColor: STATUS_COLORS[item.status]?.bg,
                        color: STATUS_COLORS[item.status]?.color,
                        fontWeight: 600,
                        fontSize: "0.65rem",
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {item.uploadedBy
                      ? `${item.uploadedBy.firstName} ${item.uploadedBy.lastName}`
                      : "Unknown"}{" "}
                    &middot; {new Date(item.createdAt).toLocaleDateString()}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={attachOpen} onClose={handleCloseAttach} maxWidth="sm" fullWidth>
        <DialogTitle>Attach Evidence</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Button
              size="small"
              variant={mode === "search" ? "contained" : "outlined"}
              onClick={() => setMode("search")}
            >
              Search Existing
            </Button>
            <Button
              size="small"
              variant={mode === "create" ? "contained" : "outlined"}
              onClick={() => setMode("create")}
            >
              Create New
            </Button>
          </Box>

          {mode === "search" ? (
            <Box>
              <TextField
                label="Search evidence by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              {searchLoading && <LinearProgress sx={{ mb: 1 }} />}
              {!searchLoading && (!unlinkedEvidence || unlinkedEvidence.length === 0) ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
                  {searchTerm ? "No unlinked evidence found" : "Type to search for evidence"}
                </Typography>
              ) : (
                <List disablePadding sx={{ maxHeight: 300, overflow: "auto" }}>
                  {unlinkedEvidence.map((item: EvidenceItem) => (
                    <ListItem key={item.id} disablePadding>
                      <ListItemButton onClick={() => handleLinkExisting(item.id)}>
                        <ListItemText
                          primary={item.title}
                          secondary={`${item.entityType} · ${item.uploadedBy?.firstName || "Unknown"}`}
                        />
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            backgroundColor: STATUS_COLORS[item.status]?.bg,
                            color: STATUS_COLORS[item.status]?.color,
                            fontWeight: 600,
                            fontSize: "0.65rem",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Title"
                value={createTitle}
                onChange={(e) => setCreateTitle(e.target.value)}
                fullWidth
                required
                size="small"
              />
              <TextField
                label="Description"
                value={createDescription}
                onChange={(e) => setCreateDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
                size="small"
              />
              <Button
                variant="contained"
                onClick={handleCreateAndLink}
                disabled={!createTitle.trim() || createEvidence.isPending}
              >
                {createEvidence.isPending ? "Creating..." : "Create & Link"}
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAttach}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
