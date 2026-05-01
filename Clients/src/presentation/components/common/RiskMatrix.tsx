import { Box, Typography } from "@mui/material";

interface RiskPoint {
  likelihood: number;
  impact: number;
  count: number;
}

interface RiskMatrixProps {
  points: RiskPoint[];
}

function getCellColor(likelihood: number, impact: number): string {
  const score = likelihood * impact;
  if (score >= 15) return "#FEE2E2";
  if (score >= 10) return "#FEF3C7";
  if (score >= 5) return "#DBEAFE";
  return "#D1FAE5";
}

export default function RiskMatrix({ points }: RiskMatrixProps) {
  const grid: number[][] = Array.from({ length: 5 }, () => Array(5).fill(0) as number[]);
  for (const p of points) {
    if (p.likelihood >= 1 && p.likelihood <= 5 && p.impact >= 1 && p.impact <= 5) {
      const row = grid[5 - p.likelihood];
      const col = p.impact - 1;
      if (row && row[col] !== undefined) row[col] = row[col] + p.count;
    }
  }

  return (
    <Box>
      <Box sx={{ display: "flex", mb: 0.5 }}>
        <Box sx={{ width: 24 }} />
        {[1, 2, 3, 4, 5].map((i) => (
          <Box key={i} sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary" fontSize="0.65rem">
              {i}
            </Typography>
          </Box>
        ))}
      </Box>
      {grid.map((row, rowIdx) => (
        <Box key={rowIdx} sx={{ display: "flex", mb: "2px" }}>
          <Box sx={{ width: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="body2" color="text.secondary" fontSize="0.65rem">
              {5 - rowIdx}
            </Typography>
          </Box>
          {row.map((count: number, colIdx: number) => (
            <Box
              key={colIdx}
              sx={{
                flex: 1,
                aspectRatio: "1",
                backgroundColor: getCellColor(5 - rowIdx, colIdx + 1),
                borderRadius: 0.5,
                mx: "1px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 28,
              }}
            >
              {count > 0 && (
                <Typography variant="body2" fontWeight={600} fontSize="0.7rem">
                  {count}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
        <Typography variant="body2" color="text.secondary" fontSize="0.6rem" sx={{ ml: 3 }}>
          Impact →
        </Typography>
      </Box>
    </Box>
  );
}
