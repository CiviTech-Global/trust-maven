import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

export default function ProjectsPage() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Projects</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          New Project
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
            No projects yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create a project to organize and manage related risks
          </Typography>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Create First Project
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
