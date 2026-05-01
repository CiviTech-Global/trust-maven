import { Card, CardContent, Typography, Box } from "@mui/material";

interface StatCardProps {
  label: string;
  value: string | number;
  color: string;
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, color, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h1" sx={{ color, mt: 1 }}>
              {value}
            </Typography>
          </Box>
          {icon && (
            <Box sx={{ color, opacity: 0.7 }}>{icon}</Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
