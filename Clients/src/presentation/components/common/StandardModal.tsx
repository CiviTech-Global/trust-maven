import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface StandardModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
  submitColor?: "primary" | "secondary" | "error" | "success" | "warning" | "info";
  maxWidth?: string;
  hideFooter?: boolean;
  hideSubmit?: boolean;
  showCancel?: boolean;
  customFooter?: React.ReactNode;
}

export default function StandardModal({
  open,
  onClose,
  title,
  description,
  children,
  onSubmit,
  submitText = "Save",
  cancelText = "Cancel",
  isSubmitting = false,
  submitColor = "primary",
  maxWidth = "600px",
  hideFooter = false,
  hideSubmit = false,
  showCancel = true,
  customFooter,
}: StandardModalProps) {
  const theme = useTheme();
  const contentHeight = `calc(90vh - 180px)`;
  const bgSurface = (theme.palette as any).background?.surface || theme.palette.background.paper;
  const bgGradient = (theme.palette as any).background?.gradientStop || theme.palette.background.default;

  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") onClose();
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `min(${maxWidth}, calc(100vw - 48px))`,
          maxHeight: "calc(100vh - 48px)",
          bgcolor: "background.paper",
          borderRadius: "12px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          outline: "none",
        }}
      >
        {/* Header — inspired by VerifyWise gradient */}
        <Box
          sx={{
            px: 3,
            py: 2.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            background: theme.palette.mode === "dark"
              ? `linear-gradient(135deg, ${bgSurface} 0%, ${bgGradient} 100%)`
              : "linear-gradient(135deg, #F8FAFB 0%, #F3F5F8 100%)",
            borderRadius: "12px 12px 0 0",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "text.primary",
                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>
            {description && (
              <Typography
                sx={{
                  fontSize: "0.8125rem",
                  color: "text.secondary",
                  mt: 0.5,
                  lineHeight: 1.4,
                }}
              >
                {description}
              </Typography>
            )}
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ mt: 0.25, color: "text.disabled", flexShrink: 0 }}
            aria-label="Close modal"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box
          sx={{
            px: 3,
            py: 2.5,
            overflow: "auto",
            flex: 1,
            minHeight: 0,
            maxHeight: contentHeight,
          }}
        >
          {children}
        </Box>

        {/* Footer */}
        {!hideFooter && (
          <Box
            sx={{
              px: 3,
              py: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1.5,
              background: theme.palette.mode === "dark"
                ? `linear-gradient(135deg, ${bgGradient} 0%, ${bgSurface} 100%)`
                : "linear-gradient(135deg, #F3F5F8 0%, #F8FAFB 100%)",
              borderRadius: "0 0 12px 12px",
            }}
          >
            {customFooter || (
              <>
                {showCancel && (
                  <Button
                    onClick={onClose}
                    disabled={isSubmitting}
                    variant="outlined"
                    color="inherit"
                    size="medium"
                  >
                    {cancelText}
                  </Button>
                )}
                {!hideSubmit && onSubmit && (
                  <Button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    variant="contained"
                    color={submitColor}
                    size="medium"
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress size={16} sx={{ mr: 0.75 }} color="inherit" />
                        Saving...
                      </>
                    ) : (
                      submitText
                    )}
                  </Button>
                )}
              </>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
}
