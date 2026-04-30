import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const stats = [
  { label: "Total Risks", value: "0", color: "#0F766E" },
  { label: "Critical Risks", value: "0", color: "#DC2626" },
  { label: "Active Projects", value: "0", color: "#2563EB" },
  { label: "Open Treatments", value: "0", color: "#EA580C" },
];

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography
                  variant="h1"
                  sx={{ color: stat.color, mt: 1 }}
                >
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Risk Distribution by Domain
              </Typography>
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.secondary",
                }}
              >
                Chart placeholder - integrate charting library
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Recent Activity
              </Typography>
              <Typography variant="body1" color="text.secondary">
                No recent activity to display
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
