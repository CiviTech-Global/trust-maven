import { useState } from "react";
import { Card, CardContent, Typography, Box, SvgIconProps, useTheme } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
  accentColor?: string;
  icon?: React.ReactElement<SvgIconProps>;
  decorativeIcon?: React.ReactElement<SvgIconProps>;
  trend?: string;
  trendDirection?: "up" | "down";
  subtitle?: string;
  onClick?: () => void;
}

export default function StatCard({
  label,
  value,
  color,
  accentColor,
  icon,
  decorativeIcon,
  trend,
  trendDirection,
  subtitle,
  onClick,
}: StatCardProps) {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const accent = color || accentColor || theme.palette.primary.main;

  return (
    <Card
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      sx={{
        position: "relative",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease",
        "&:hover": onClick
          ? {
              borderColor: `${accent}44`,
              boxShadow: `0 4px 16px ${accent}14`,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${accent}06 100%)`,
            }
          : {},
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${accent}, ${accent}44)`,
          opacity: isHovered ? 1 : 0.7,
          transition: "opacity 0.2s ease",
        },
      }}
    >
      {decorativeIcon && (
        <Box
          sx={{
            position: "absolute",
            bottom: "-12px",
            right: "-12px",
            opacity: isHovered ? 0.08 : 0.04,
            transform: isHovered ? "translateY(-4px)" : "translateY(0px)",
            zIndex: 0,
            pointerEvents: "none",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            "& .MuiSvgIcon-root": { fontSize: 72 },
            color: accent,
          }}
        >
          {decorativeIcon}
        </Box>
      )}
      <CardContent
        sx={{
          p: "16px 20px",
          "&:last-child": { pb: "16px" },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "text.tertiary",
                mb: 0.5,
                display: "block",
              }}
            >
              {label}
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                color: "text.primary",
                fontSize: "1.5rem",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {value}
            </Typography>
          </Box>
          {icon && (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: `${accent}14`,
                color: accent,
                flexShrink: 0,
                ml: 2,
                "& .MuiSvgIcon-root": { fontSize: 20 },
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
        {(subtitle || trend) && (
          <Box sx={{ mt: "auto", pt: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
            {subtitle && (
              <Typography variant="caption" sx={{ color: "text.tertiary", fontWeight: 400, fontSize: "0.7rem" }}>
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.25, ml: "auto" }}>
                {trendDirection === "up" && <ArrowDropUpIcon sx={{ fontSize: 16, color: "#059669" }} />}
                {trendDirection === "down" && <ArrowDropDownIcon sx={{ fontSize: 16, color: "#DC2626" }} />}
                <Typography
                  variant="caption"
                  sx={{
                    color: trendDirection === "up" ? "#059669" : trendDirection === "down" ? "#DC2626" : "text.tertiary",
                    fontWeight: 600,
                    fontSize: "0.7rem",
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
