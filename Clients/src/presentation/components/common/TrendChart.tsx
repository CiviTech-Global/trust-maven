import { useTheme } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TrendChartProps {
  data: { month: string; count: string | number }[];
}

export default function TrendChart({ data }: TrendChartProps) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const chartData = data.map((d) => ({
    month: new Date(d.month).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
    count: typeof d.count === "string" ? parseInt(d.count) : d.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke={theme.palette.text.secondary} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke={theme.palette.text.secondary} />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke={primaryColor}
          strokeWidth={2}
          dot={{ fill: primaryColor, r: 4 }}
          name="Risks"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
