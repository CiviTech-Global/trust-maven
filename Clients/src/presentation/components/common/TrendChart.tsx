import { useTheme, SxProps, Theme } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface TrendChartProps {
  data: { month: string; count: string | number }[];
  height?: number;
  showArea?: boolean;
  sx?: SxProps<Theme>;
}

export default function TrendChart({ data, height = 250, showArea = true }: TrendChartProps) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const chartData = data.map((d) => ({
    month: new Date(d.month).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
    count: typeof d.count === "string" ? parseInt(d.count) : d.count,
  }));

  const tooltipStyle = {
    borderRadius: 8,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
    background: theme.palette.background.paper,
  };

  if (showArea) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={primaryColor} stopOpacity={0.12} />
              <stop offset="95%" stopColor={primaryColor} stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={{ fontWeight: 600, color: theme.palette.text.primary }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke={primaryColor}
            strokeWidth={2.5}
            fill="url(#riskGradient)"
            dot={{ fill: primaryColor, r: 3, strokeWidth: 0 }}
            activeDot={{ fill: primaryColor, r: 5, strokeWidth: 2, stroke: theme.palette.background.paper }}
            name="Risks"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={{ fontWeight: 600, color: theme.palette.text.primary }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke={primaryColor}
          strokeWidth={2.5}
          dot={{ fill: primaryColor, r: 3, strokeWidth: 0 }}
          activeDot={{ fill: primaryColor, r: 5, strokeWidth: 2, stroke: theme.palette.background.paper }}
          name="Risks"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
