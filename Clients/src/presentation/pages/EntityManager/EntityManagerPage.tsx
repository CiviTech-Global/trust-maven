import { useState } from "react";
import {
  Box, Typography, Button, Card, CardContent, Chip, TextField, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, LinearProgress, Alert, IconButton, Tooltip, List, ListItemButton,
  ListItemText, ListItemIcon, Collapse, Paper, Divider,
} from "@mui/material";
import {
  Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon,
  AccountTree as TreeIcon, Business as BusinessIcon,
  ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon,
  Calculate as CalculateIcon, Link as LinkIcon,
} from "@mui/icons-material";
import {
  useEntityTree, useEntity, useEntityAncestors, useEntityRisks,
  useCreateEntity, useUpdateEntity, useDeleteEntity, useRollupEntityScore,
  type EntityItem,
} from "../../../infrastructure/api/integrations.api";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const ENTITY_TYPES = [
  "business_unit", "subsidiary", "department", "system", "application", "asset", "process", "data_asset",
];

function EntityTypeChip({ type }: { type: string }) {
  return (
    <Chip
      label={type.replace(/_/g, " ")}
      size="small"
      variant="outlined"
      sx={{ textTransform: "capitalize" }}
    />
  );
}

function EntityTreeNode({ node, selectedId, onSelect, depth = 0 }: {
  node: EntityItem;
  selectedId: string | null;
  onSelect: (id: string) => void;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <Box>
      <ListItemButton
        selected={selectedId === node.id}
        onClick={() => onSelect(node.id)}
        sx={{ pl: 2 + depth * 3, borderRadius: 1, my: 0.25 }}
      >
        {hasChildren ? (
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }} sx={{ mr: 0.5 }}>
            {expanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
          </IconButton>
        ) : (
          <Box sx={{ width: 28, mr: 0.5 }} />
        )}
        <ListItemIcon sx={{ minWidth: 32 }}>
          <BusinessIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={node.name}
          primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: selectedId === node.id ? 600 : 400 }}
          secondary={
            <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}>
              <EntityTypeChip type={node.type} />
              {node.riskScore !== null && (
                <Chip label={`Score: ${node.riskScore}`} size="small" sx={{ fontWeight: 600, height: 22, fontSize: "0.65rem" }} />
              )}
              {node.children && (
                <Typography variant="caption" color="text.secondary">{node.children.length} children</Typography>
              )}
            </Box>
          }
        />
      </ListItemButton>
      {hasChildren && expanded && (
        <Collapse in={expanded}>
          {node.children!.map((child) => (
            <EntityTreeNode key={child.id} node={child} selectedId={selectedId} onSelect={onSelect} depth={depth + 1} />
          ))}
        </Collapse>
      )}
    </Box>
  );
}

export default function EntityManagerPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editEntity, setEditEntity] = useState<EntityItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: tree, isLoading: treeLoading, error: treeError } = useEntityTree();
  const { data: selectedEntity } = useEntity(selectedId);
  const { data: ancestors } = useEntityAncestors(selectedId);
  const { data: entityRisks } = useEntityRisks(selectedId);
  const createEntity = useCreateEntity();
  const updateEntity = useUpdateEntity();
  const deleteEntity = useDeleteEntity();
  const rollupScore = useRollupEntityScore();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteEntity.mutateAsync(deleteId);
    setDeleteId(null);
    if (selectedId === deleteId) setSelectedId(null);
  };

  const handleRollup = async (id: string) => {
    try {
      await rollupScore.mutateAsync(id);
    } catch { /* ignore */ }
  };

  const allEntities = tree || [];
  const flatEntities: EntityItem[] = [];
  const flatten = (items: EntityItem[]) => {
    items.forEach((item) => { flatEntities.push(item); if (item.children) flatten(item.children); });
  };
  flatten(allEntities);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Entity Manager</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          Add Entity
        </Button>
      </Box>

      {treeError && <Alert severity="error" sx={{ mb: 2 }}>Failed to load entities</Alert>}

      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ width: { xs: "100%", md: "41.666%" } }}>
          <Card>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <TreeIcon fontSize="small" /> Entity Hierarchy
              </Typography>
              {treeLoading ? (
                <LinearProgress />
              ) : !allEntities.length ? (
                <EmptyState
                  title="No entities"
                  description="Create your first entity to start building your organizational hierarchy"
                  actionLabel="Add Entity"
                  onAction={() => setCreateOpen(true)}
                />
              ) : (
                <List dense sx={{ maxHeight: 600, overflow: "auto" }}>
                  {allEntities.map((node) => (
                    <EntityTreeNode key={node.id} node={node} selectedId={selectedId} onSelect={setSelectedId} />
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "58.333%" } }}>
          {selectedId && selectedEntity ? (
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                  <Box>
                    <Typography variant="h3">{selectedEntity.name}</Typography>
                    <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                      <EntityTypeChip type={selectedEntity.type} />
                      {selectedEntity.riskScore !== null && (
                        <Chip
                          label={`Risk Score: ${selectedEntity.riskScore}`}
                          size="small"
                          color={selectedEntity.riskScore >= 15 ? "error" : selectedEntity.riskScore >= 10 ? "warning" : "success"}
                        />
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <Tooltip title="Rollup Score">
                      <IconButton size="small" color="primary" onClick={() => handleRollup(selectedEntity.id)}>
                        <CalculateIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => setEditEntity(selectedEntity)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteId(selectedEntity.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {ancestors && ancestors.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5, fontWeight: 600 }}>Ancestor Chain</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
                      {ancestors.map((a, i) => (
                        <Box key={a.id} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Chip label={a.name} size="small" variant="outlined" onClick={() => setSelectedId(a.id)} sx={{ cursor: "pointer" }} />
                          {i < ancestors.length - 1 && <ChevronRightIcon sx={{ fontSize: 14, color: "text.disabled" }} />}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}

                <Divider sx={{ my: 2 }} />

                <Typography variant="h4" sx={{ mb: 1, fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
                  <LinkIcon fontSize="small" /> Linked Risks ({entityRisks?.length || 0})
                </Typography>
                {!entityRisks || entityRisks.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">No risks linked to this entity</Typography>
                ) : (
                  <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
                    <Box component="thead">
                      <Box component="tr" sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Box component="th" sx={{ textAlign: "left", p: 0.5, fontWeight: 600, fontSize: "0.75rem" }}>Title</Box>
                        <Box component="th" sx={{ textAlign: "left", p: 0.5, fontWeight: 600, fontSize: "0.75rem" }}>Status</Box>
                        <Box component="th" sx={{ textAlign: "left", p: 0.5, fontWeight: 600, fontSize: "0.75rem" }}>Score</Box>
                      </Box>
                    </Box>
                    <Box component="tbody">
                      {entityRisks.map((r: any) => (
                        <Box component="tr" key={r.id} sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Box component="td" sx={{ p: 0.5 }}>
                            <Typography variant="body2" fontWeight={500}>{r.title}</Typography>
                          </Box>
                          <Box component="td" sx={{ p: 0.5 }}>
                            <Chip label={r.status} size="small" />
                          </Box>
                          <Box component="td" sx={{ p: 0.5 }}>
                            <Typography variant="body2">{r.riskScore ?? "--"}</Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}

                {selectedEntity.attributes && Object.keys(selectedEntity.attributes).length > 0 && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h4" sx={{ mb: 1, fontSize: "0.9rem", fontWeight: 600 }}>Attributes</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      {Object.entries(selectedEntity.attributes).map(([key, value]) => (
                        <Box key={key} sx={{ display: "flex", gap: 1 }}>
                          <Typography variant="body2" fontWeight={600} sx={{ minWidth: 120 }}>{key}:</Typography>
                          <Typography variant="body2">{String(value)}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400, border: "2px dashed", borderColor: "divider" }}>
              <Typography variant="body1" color="text.secondary">Select an entity from the hierarchy to view details</Typography>
            </Paper>
          )}
        </Box>
      </Box>

      <CreateEntityDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        entities={flatEntities}
        onSubmit={async (values) => {
          await createEntity.mutateAsync(values);
          setCreateOpen(false);
        }}
        loading={createEntity.isPending}
      />

      {editEntity && (
        <EditEntityDialog
          entity={editEntity}
          entities={flatEntities}
          onClose={() => setEditEntity(null)}
          onSubmit={async (values) => {
            await updateEntity.mutateAsync({ id: editEntity.id, ...values });
            setEditEntity(null);
          }}
          loading={updateEntity.isPending}
        />
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Entity"
        message="Are you sure you want to delete this entity? Children will be reassigned to the parent."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteEntity.isPending}
      />
    </Box>
  );
}

function CreateEntityDialog({ open, onClose, entities, onSubmit, loading }: {
  open: boolean;
  onClose: () => void;
  entities: EntityItem[];
  onSubmit: (values: { name: string; type: string; parentId?: string | null; attributes?: Record<string, any> }) => void;
  loading: boolean;
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [parentId, setParentId] = useState<string>("");
  const [attrKey, setAttrKey] = useState("");
  const [attrValue, setAttrValue] = useState("");
  const [attributes, setAttributes] = useState<Record<string, string>>({});

  const addAttribute = () => {
    if (!attrKey) return;
    setAttributes((prev) => ({ ...prev, [attrKey]: attrValue }));
    setAttrKey("");
    setAttrValue("");
  };

  const handleSubmit = () => {
    if (!name || !type) return;
    onSubmit({
      name,
      type,
      parentId: parentId || null,
      attributes: Object.keys(attributes).length > 0 ? attributes : undefined,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Entity</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth size="small" required />
          <TextField select label="Type" value={type} onChange={(e) => setType(e.target.value)} fullWidth size="small" required>
            {ENTITY_TYPES.map((t) => <MenuItem key={t} value={t}>{t.replace(/_/g, " ")}</MenuItem>)}
          </TextField>
          <TextField select label="Parent Entity" value={parentId} onChange={(e) => setParentId(e.target.value)} fullWidth size="small">
            <MenuItem value="">None (root entity)</MenuItem>
            {entities.map((e) => <MenuItem key={e.id} value={e.id}>{e.name} ({e.type})</MenuItem>)}
          </TextField>
          <Box>
            <Typography variant="caption" fontWeight={600} sx={{ mb: 0.5, display: "block" }}>Attributes (optional)</Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField size="small" placeholder="Key" value={attrKey} onChange={(e) => setAttrKey(e.target.value)} />
              <TextField size="small" placeholder="Value" value={attrValue} onChange={(e) => setAttrValue(e.target.value)} />
              <Button size="small" variant="outlined" onClick={addAttribute} disabled={!attrKey}>Add</Button>
            </Box>
            {Object.entries(attributes).map(([k, v]) => (
              <Box key={k} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Chip label={`${k}: ${v}`} size="small" onDelete={() => {
                  const next = { ...attributes };
                  delete next[k];
                  setAttributes(next);
                }} />
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading || !name || !type}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function EditEntityDialog({ entity, entities, onClose, onSubmit, loading }: {
  entity: EntityItem;
  entities: EntityItem[];
  onClose: () => void;
  onSubmit: (values: { name: string; type: string; parentId?: string | null; attributes?: Record<string, any> }) => void;
  loading: boolean;
}) {
  const [name, setName] = useState(entity.name);
  const [type, setType] = useState(entity.type);
  const [parentId, setParentId] = useState(entity.parentId || "");
  const [attributes, setAttributes] = useState<Record<string, string>>((entity.attributes || {}) as Record<string, string>);
  const [attrKey, setAttrKey] = useState("");
  const [attrValue, setAttrValue] = useState("");

  const addAttribute = () => {
    if (!attrKey) return;
    setAttributes((prev) => ({ ...prev, [attrKey]: attrValue }));
    setAttrKey("");
    setAttrValue("");
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Entity</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth size="small" required />
          <TextField select label="Type" value={type} onChange={(e) => setType(e.target.value)} fullWidth size="small" required>
            {ENTITY_TYPES.map((t) => <MenuItem key={t} value={t}>{t.replace(/_/g, " ")}</MenuItem>)}
          </TextField>
          <TextField select label="Parent Entity" value={parentId} onChange={(e) => setParentId(e.target.value)} fullWidth size="small">
            <MenuItem value="">None (root entity)</MenuItem>
            {entities.filter((e) => e.id !== entity.id).map((e) => <MenuItem key={e.id} value={e.id}>{e.name} ({e.type})</MenuItem>)}
          </TextField>
          <Box>
            <Typography variant="caption" fontWeight={600} sx={{ mb: 0.5, display: "block" }}>Attributes</Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField size="small" placeholder="Key" value={attrKey} onChange={(e) => setAttrKey(e.target.value)} />
              <TextField size="small" placeholder="Value" value={attrValue} onChange={(e) => setAttrValue(e.target.value)} />
              <Button size="small" variant="outlined" onClick={addAttribute} disabled={!attrKey}>Add</Button>
            </Box>
            {Object.entries(attributes).map(([k, v]) => (
              <Box key={k} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Chip label={`${k}: ${v}`} size="small" onDelete={() => {
                  const next = { ...attributes };
                  delete next[k];
                  setAttributes(next);
                }} />
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={() => onSubmit({ name, type, parentId: parentId || null, attributes })} variant="contained" disabled={loading || !name || !type}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
