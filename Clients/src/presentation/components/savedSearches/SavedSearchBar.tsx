import { useState } from "react";
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Menu, MenuItem, Typography } from "@mui/material";
import { BookmarkAdd as SaveIcon, Bookmark as SavedIcon } from "@mui/icons-material";
import { useSavedSearches, type SavedSearch } from "../../../infrastructure/api/savedSearches.api";

interface SavedSearchBarProps {
  page: string;
  currentFilters: Record<string, string>;
  onApply: (filters: Record<string, string>) => void;
}

export default function SavedSearchBar({ page, currentFilters, onApply }: SavedSearchBarProps) {
  const { searches, saveSearch, deleteSearch } = useSavedSearches(page);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSave = () => {
    if (!saveName.trim()) return;
    saveSearch(saveName.trim(), currentFilters);
    setSaveName("");
    setSaveOpen(false);
  };

  const handleApply = (search: SavedSearch) => {
    onApply(search.filters);
    setAnchorEl(null);
  };

  const hasActiveFilters = Object.values(currentFilters).some((v) => v);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {hasActiveFilters && (
        <Button size="small" startIcon={<SaveIcon />} onClick={() => setSaveOpen(true)}>
          Save Search
        </Button>
      )}
      {searches.length > 0 && (
        <>
          <Button size="small" startIcon={<SavedIcon />} onClick={(e) => setAnchorEl(e.currentTarget)}>
            Saved ({searches.length})
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            {searches.map((s) => (
              <MenuItem key={s.id} sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                <Box onClick={() => handleApply(s)} sx={{ flex: 1 }}>
                  <Typography variant="body2">{s.name}</Typography>
                </Box>
                <Chip label="Apply" size="small" color="primary" onClick={() => handleApply(s)} sx={{ ml: 1 }} />
                <Chip label="Del" size="small" color="error" onClick={() => deleteSearch(s.id)} />
              </MenuItem>
            ))}
          </Menu>
        </>
      )}

      <Dialog open={saveOpen} onClose={() => setSaveOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Save Current Search</DialogTitle>
        <DialogContent>
          <TextField autoFocus label="Search Name" value={saveName} onChange={(e) => setSaveName(e.target.value)} fullWidth sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={!saveName.trim()}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
