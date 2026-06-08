import { Card, CardContent, Typography, Box, SvgIconProps, useTheme } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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

export default function StatCard({ label, value, color, accentColor, icon, trend, trendDirection, subtitle, onClick }: StatCardProps) {
  const theme = useTheme();
  const accent = color || accentColor || theme.palette.primary.main;
  return (
    <Card
      onClick={onClick}
      sx={{
        position: "relative",
        overflow: "visible",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": onClick ? {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        } : {},
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 12,
          right: 12,
          height: 3,
          background: `linear-gradient(90deg, ${accent}, ${accent}66)`,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
        },
      }}
    >
      <CardContent sx={{ pt: 3, pb: "20px !important", flex: 1, display: "flex", flexDirection: "column" }}>
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
          </Box>
          {icon && (
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
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
        {(subtitle || trend) && (
          <Box sx={{ mt: "auto", pt: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
            {subtitle && (
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 400 }}>
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
                {trendDirection === "up" && <ArrowDropUpIcon sx={{ fontSize: 16, color: "#059669" }} />}
                {trendDirection === "down" && <ArrowDropDownIcon sx={{ fontSize: 16, color: "#DC2626" }} />}
                <Typography
                  variant="caption"
                  sx={{
                    color: trendDirection === "up" ? "#059669" : trendDirection === "down" ? "#DC2626" : "text.secondary",
                    fontWeight: 600,
                  }}
                >
                  {trend}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
