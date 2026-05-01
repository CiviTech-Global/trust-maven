import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TrendChartProps {
  data: { month: string; count: string | number }[];
}

export default function TrendChart({ data }: TrendChartProps) {
  const chartData = data.map((d) => ({
    month: new Date(d.month).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
    count: typeof d.count === "string" ? parseInt(d.count) : d.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#4338CA"
          strokeWidth={2}
          dot={{ fill: "#4338CA", r: 4 }}
          name="Risks"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
