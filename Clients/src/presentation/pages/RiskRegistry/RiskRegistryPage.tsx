import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

export default function RiskRegistryPage() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Risk Registry</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Risk
        </Button>
      </Box>

      <Card>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400,
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h3" color="text.secondary">
            No risks registered yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Start by adding your first risk to the registry
          </Typography>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Create First Risk
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
