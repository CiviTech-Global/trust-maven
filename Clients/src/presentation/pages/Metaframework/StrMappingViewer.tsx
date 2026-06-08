import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, Chip, Card, CardContent, LinearProgress,
} from "@mui/material";
import {
  useMappingsForRequirement, type StrMapping,
} from "../../../infrastructure/api/metaframework.api";
import EmptyState from "../../components/common/EmptyState";

interface StrMappingViewerProps {
  requirementId: string;
  open: boolean;
  onClose: () => void;
}

const STRM_COLORS: Record<string, string> = {
  equal_to: "#059669",
  subset_of: "#2563EB",
  superset_of: "#7C3AED",
  intersects_with: "#CA8A04",
  no_relationship: "#9CA3AF",
};

function StrengthBar({ strength }: { strength: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Box
        sx={{
          flex: 1,
          height: 8,
          borderRadius: 4,
          backgroundColor: "#E5E7EB",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${strength * 10}%`,
            height: "100%",
            backgroundColor: strength >= 8 ? "#059669" : strength >= 5 ? "#CA8A04" : "#EF4444",
            borderRadius: 4,
            transition: "width 0.4s ease",
          }}
        />
      </Box>
      <Typography variant="caption" sx={{ minWidth: 32, textAlign: "right" }}>
        {strength}/10
      </Typography>
    </Box>
  );
}

export default function StrMappingViewer({ requirementId, open, onClose }: StrMappingViewerProps) {
  const { data: mappings, isLoading } = useMappingsForRequirement(requirementId);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          STRM Mappings for this Requirement
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <LinearProgress />
        ) : !mappings || mappings.length === 0 ? (
          <EmptyState
            title="No STRM Mappings"
            description="This requirement has no mapped common controls in the STRM framework yet."
          />
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {mappings.map((m: StrMapping) => (
              <Card key={m.id} variant="outlined">
                <CardContent>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1.5 }}>
                    {m.commonControl && (
                      <>
                        <Chip
                          label={m.commonControl.code}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Typography variant="body1" fontWeight={600}>
                          {m.commonControl.title}
                        </Typography>
                      </>
                    )}
                    <Box sx={{ flex: 1 }} />
                    <Chip
                      label={m.relationshipType.replace(/_/g, " ")}
                      size="small"
                      sx={{
                        backgroundColor: `${STRM_COLORS[m.relationshipType]}18`,
                        color: STRM_COLORS[m.relationshipType],
                        fontWeight: 600,
                        border: `1px solid ${STRM_COLORS[m.relationshipType]}44`,
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 1.5 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                      Strength
                    </Typography>
                    <StrengthBar strength={m.strength} />
                  </Box>

                  {m.rationale && (
                    <Box>
                      <Typography variant="overline" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                        Rationale
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {m.rationale}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
