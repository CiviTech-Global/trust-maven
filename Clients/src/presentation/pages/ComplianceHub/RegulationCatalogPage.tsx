import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  ArrowBack as BackIcon,
} from "@mui/icons-material";
import { useRegulations } from "../../../infrastructure/api/regulationCatalog.api";
import { useAdoptedRegulations } from "../../../infrastructure/api/complianceHub.api";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "information_security", label: "Information Security" },
  { value: "privacy", label: "Privacy & Data Protection" },
  { value: "risk_management", label: "Risk Management" },
  { value: "financial_audit", label: "Financial & Audit" },
];

export default function RegulationCatalogPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const { data: regulations, isLoading } = useRegulations({
    category: category || undefined,
    search: search || undefined,
  });
  const { data: adopted } = useAdoptedRegulations();

  const adoptedIds = new Set(adopted?.map((a) => a.regulationId) || []);

  const typeColor = (type: string) => {
    switch (type) {
      case "standard": return "primary";
      case "regulation": return "error";
      case "framework": return "info";
      default: return "default";
    }
  };

  return (
    <Box>
      <Button startIcon={<BackIcon />} onClick={() => navigate("/compliance-hub")} sx={{ mb: 2 }}>
        Back to Compliance Hub
      </Button>

      <Typography variant="h4" fontWeight={700} gutterBottom>
        Regulation Catalog
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Browse available frameworks, standards, and regulations
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search regulations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />
        <TextField
          select
          size="small"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {CATEGORIES.map((c) => (
            <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
          ))}
        </TextField>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {regulations?.map((reg) => (
            <Grid item xs={12} md={6} lg={4} key={reg.id}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  "&:hover": { boxShadow: 4 },
                  border: adoptedIds.has(reg.id) ? 2 : 0,
                  borderColor: "success.main",
                }}
                onClick={() => navigate(`/compliance-hub/regulations/${reg.id}`)}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {reg.name}
                    </Typography>
                    {adoptedIds.has(reg.id) && (
                      <Chip label="Adopted" size="small" color="success" />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.5, mb: 2, flexWrap: "wrap" }}>
                    <Chip label={reg.type} size="small" color={typeColor(reg.type) as any} />
                    <Chip label={reg.category.replace(/_/g, " ")} size="small" variant="outlined" />
                    {reg.jurisdiction && (
                      <Chip label={reg.jurisdiction} size="small" variant="outlined" />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}>
                    {reg.description}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      {reg.issuer} - v{reg.version}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
