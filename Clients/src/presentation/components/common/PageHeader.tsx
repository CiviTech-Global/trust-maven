import { Box, Typography, SxProps, Theme } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function PageHeader({ title, subtitle, action, sx }: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
        ...sx,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "1.625rem",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              mt: 0.5,
              color: "text.secondary",
              fontSize: "0.875rem",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>{action}</Box>}
    </Box>
  );
}
