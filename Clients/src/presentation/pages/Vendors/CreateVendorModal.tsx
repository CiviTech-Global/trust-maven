import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box,
} from "@mui/material";
import { useCreateVendor, useUpdateVendor, type VendorItem } from "../../../infrastructure/api/vendors.api";

interface CreateVendorModalProps {
  open: boolean;
  onClose: () => void;
  editVendor?: VendorItem | null;
}

const RISK_LEVELS = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export default function CreateVendorModal({ open, onClose, editVendor }: CreateVendorModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [riskLevel, setRiskLevel] = useState("medium");
  const [contactEmail, setContactEmail] = useState("");

  const createVendor = useCreateVendor();
  const updateVendor = useUpdateVendor();

  useEffect(() => {
    if (editVendor) {
      setName(editVendor.name);
      setDescription(editVendor.description || "");
      setRiskLevel(editVendor.riskLevel);
      setContactEmail((editVendor.contactInfo as any)?.email || "");
    }
  }, [editVendor]);

  const handleSubmit = async () => {
    if (!name) return;
    const payload = {
      name,
      description: description || undefined,
      riskLevel,
      contactInfo: contactEmail ? { email: contactEmail } : undefined,
    };

    if (editVendor) {
      await updateVendor.mutateAsync({ id: editVendor.id, ...payload });
    } else {
      await createVendor.mutateAsync(payload);
    }
    handleClose();
  };

  const handleClose = () => {
    setName(""); setDescription(""); setRiskLevel("medium"); setContactEmail("");
    onClose();
  };

  const isSubmitting = createVendor.isPending || updateVendor.isPending;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editVendor ? "Edit Vendor" : "Add Vendor"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Vendor Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={2} fullWidth />
          <TextField select label="Risk Level" value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)} fullWidth>
            {RISK_LEVELS.map((r) => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
          </TextField>
          <TextField label="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} type="email" fullWidth />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!name || isSubmitting}>
          {isSubmitting ? "Saving..." : editVendor ? "Save Changes" : "Add Vendor"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
