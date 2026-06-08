import { Card, CardContent, Typography, Box, SvgIconProps, useTheme } from "@mui/material";

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
  accentColor?: string;
  icon?: React.ReactElement<SvgIconProps>;
  trend?: string;
  trendDirection?: "up" | "down";
  subtitle?: string;
  onClick?: () => void;
}

export default function StatCard({ label, value, color, accentColor, icon, trend, subtitle, onClick }: StatCardProps) {
  const theme = useTheme();
  const accent = color || accentColor || theme.palette.primary.main;
  return (
    <Card
      onClick={onClick}
      sx={{
        position: "relative",
        overflow: "visible",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        "&:hover": onClick ? {
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[4],
        } : {},
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${accent}, ${accent}88)`,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}
    >
      <CardContent sx={{ pt: 3, pb: "20px !important" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "text.secondary",
                mb: 0.5,
                display: "block",
              }}
            >
              {label}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                fontSize: "1.75rem",
                lineHeight: 1.2,
              }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" sx={{ mt: 0.25, display: "block", color: "text.secondary", fontWeight: 400 }}>
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  display: "block",
                  color: trend.startsWith("+") ? "#059669" : trend.startsWith("-") ? "#EF4444" : "text.secondary",
                  fontWeight: 500,
                }}
              >
                {trend}
              </Typography>
            )}
          </Box>
          {icon && (
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: `${accent}12`,
                color: accent,
                flexShrink: 0,
                ml: 2,
                "& .MuiSvgIcon-root": {
                  fontSize: 22,
                },
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
