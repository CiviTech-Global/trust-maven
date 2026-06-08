import { Card, CardContent, Typography, Box, SxProps, Theme } from "@mui/material";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
  disableHover?: boolean;
}

export default function SectionCard({
  title,
  subtitle,
  action,
  children,
  sx,
  contentSx,
  disableHover = false,
}: SectionCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...(disableHover && {
          "&:hover": {
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
            borderColor: "divider",
            background: "none",
          },
        }),
        ...sx,
      }}
    >
      {(title || action) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: "20px",
            pt: "20px",
            pb: subtitle ? 0.5 : "12px",
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            {title && (
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="caption" sx={{ color: "text.tertiary", mt: 0.25, display: "block" }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {action && <Box sx={{ flexShrink: 0, ml: 2 }}>{action}</Box>}
        </Box>
      )}
      <CardContent
        sx={{
          flex: 1,
          p: "20px",
          "&:last-child": { pb: "20px" },
          ...(title && { pt: subtitle ? "8px" : 0 }),
          ...contentSx,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}
