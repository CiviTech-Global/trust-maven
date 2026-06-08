import { Alert, AlertProps, Typography, IconButton, Tooltip } from "@mui/material";
import { ArrowForward as ArrowIcon } from "@mui/icons-material";

interface AlertBannerProps extends Omit<AlertProps, "action"> {
  title: string;
  description?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export default function AlertBanner({
  title,
  description,
  actionLabel,
  onAction,
  severity = "warning",
  sx,
  ...alertProps
}: AlertBannerProps) {
  return (
    <Alert
      severity={severity}
      action={
        onAction ? (
          <Tooltip title={actionLabel || "View"}>
            <IconButton size="small" color="inherit" onClick={onAction} aria-label={actionLabel || "View details"}>
              <ArrowIcon />
            </IconButton>
          </Tooltip>
        ) : undefined
      }
      sx={{
        mb: 2.5,
        "& .MuiAlert-message": { width: "100%" },
        ...sx,
      }}
      {...alertProps}
    >
      <Typography variant="body2" fontWeight={600} sx={{ mb: description ? 0.5 : 0 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="caption" sx={{ display: "block", color: "inherit", opacity: 0.85 }}>
          {description}
        </Typography>
      )}
    </Alert>
  );
}
