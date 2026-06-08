import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmColor?: "primary" | "secondary" | "error" | "success" | "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  hideCancel?: boolean;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  confirmColor = "error",
  onConfirm,
  onCancel,
  loading = false,
  hideCancel = false,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onCancel}
      maxWidth="xs"
      fullWidth
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.4)" } },
      }}
    >
      <DialogTitle sx={{ fontSize: "1.125rem", fontWeight: 700, pb: 1 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.6 }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {!hideCancel && (
          <Button onClick={onCancel} disabled={loading} variant="outlined" color="inherit">
            Cancel
          </Button>
        )}
        <Button
          onClick={onConfirm}
          color={confirmColor}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {loading ? "Deleting..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
