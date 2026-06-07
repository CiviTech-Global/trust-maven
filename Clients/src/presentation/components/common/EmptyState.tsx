import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { InboxOutlined } from "@mui/icons-material";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <Card sx={{ border: "2px dashed", borderColor: "divider" }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 360,
          flexDirection: "column",
          gap: 2,
          py: 6,
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: "action.hover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.disabled",
            mb: 1,
          }}
        >
          {icon || <InboxOutlined sx={{ fontSize: 32 }} />}
        </Box>
        <Typography
          variant="h4"
          sx={{ color: "text.primary", fontWeight: 600, textAlign: "center" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", textAlign: "center", maxWidth: 420 }}
        >
          {description}
        </Typography>
        {actionLabel && onAction && (
          <Button variant="contained" onClick={onAction} sx={{ mt: 1 }}>
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
