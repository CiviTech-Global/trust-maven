import { Box, Typography, Button, Card, CardContent } from "@mui/material";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 400,
          flexDirection: "column",
          gap: 2,
        }}
      >
        {icon && <Box sx={{ color: "text.secondary", opacity: 0.5 }}>{icon}</Box>}
        <Typography variant="h3" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
        {actionLabel && onAction && (
          <Button variant="outlined" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
