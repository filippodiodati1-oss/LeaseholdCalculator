// src/components/Results.tsx
import React, { useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  styled,
  SxProps,
  Theme,
} from "@mui/material";
import CountUp from "./CountUp";

interface ResultsProps {
  results: {
    total?: number;
  };
  sx?: SxProps<Theme>;
}

// Frosted Glass Box
const FrostedGlassBox = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === "light";
  return {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    padding: theme.spacing(2, 6),
    backgroundColor: isLight ? "rgba(255,255,255,0.42)" : "rgba(28,28,28,0.28)",
    border: `1px solid ${
      isLight ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"
    }`,
    borderRadius: theme.spacing(5),
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "none",
  };
});

// Function to get subtitle based on the total amount
const getSubtitle = (total: number) => {
  if (total <= 15000) {
    return [
      "Extending your lease today will cost enough to buy your dignity…if sold in tiny installments.",
    ];
  }
  if (total <= 30000) {
    return [
      "Extending your lease today will cost enough to rent a tiny island…with no neighbors.",
    ];
  }
  if (total <= 60000) {
    return [
      "Extending your lease today will cost enough to cover adulting…times a few extra zeros.",
    ];
  }
  if (total <= 90000) {
    return [
      "Extending your lease today will cost enough to buy your entire dignity…plus interest.",
    ];
  }
  return [
    "Extending your lease today will cost enough to make you question why money can’t just grow on trees.",
  ];
};

const Results: React.FC<ResultsProps> = ({ results, sx }) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const isLight = theme.palette.mode === "light";

  const total = results.total || 0;
  const subtitleLines = getSubtitle(total);

  return (
    <FrostedGlassBox
      ref={containerRef}
      sx={{
        ...sx,
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // horizontal on desktop
        gap: 4,
        width: "100%",
        height: { xs: "auto", md: 200 },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "center" },
        borderRadius: { xs: theme.spacing(2.5), md: theme.spacing(5) },
      }}
    >
      {/* Total number */}
      <Box sx={{ flexBasis: { xs: "100%", md: "40%" } }}>
        <Typography
          sx={{
            fontWeight: 800,
            color: theme.palette.text.primary,
            fontSize: { xs: 40, md: 64 },
            lineHeight: 1.2,
            display: "inline-flex",
            alignItems: "baseline",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.6em",
              marginRight: "4px",
            }}
          >
            £
          </span>
          <CountUp
            from={0}
            to={total}
            separator=","
            duration={0.5}
            quick={true}
            className="count-up-text"
          />
        </Typography>
      </Box>

      {/* Subtitle */}
      <Box sx={{ flexBasis: { xs: "100%", md: "60%" } }}>
        {subtitleLines.map((line, index) => (
          <Typography
            key={index}
            sx={{
              fontWeight: 400,
              fontSize: { xs: "16px", md: "16px" },
              color: isLight ? "#454545" : "rgba(255,255,255,0.7)",
            }}
          >
            {line}
          </Typography>
        ))}
      </Box>
    </FrostedGlassBox>
  );
};

export default Results;
