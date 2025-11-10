// src/components/Risk.tsx
import React from "react";
import {
  Box,
  Typography,
  useTheme,
  styled,
  SxProps,
  Theme,
  Button,
} from "@mui/material";

// ------------------------------------------------------------
// Frosted Glass Box — identical to Wait + Value styling
// ------------------------------------------------------------
const FrostedGlassBox = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === "light";
  const bgColor = isLight ? "rgba(255,255,255,0.42)" : "rgba(28,28,28,0.28)";

  return {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    padding: theme.spacing(4, 6),
    backgroundColor: bgColor,
    boxShadow: "none",
    border: `1.5px solid ${
      isLight ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"
    }`,
    borderRadius: theme.spacing(5),
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "inherit",
      zIndex: -1,
    },
  };
});

// ------------------------------------------------------------
// CTA Button — same look as existing version
// ------------------------------------------------------------
const StyledCtaButton = styled(Button)(({ theme }) => {
  const isLight = theme.palette.mode === "light";

  return {
    background: isLight
      ? "#2B2B2B"
      : "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.05))",
    color: "#FFFFFF",
    border: `1px solid ${isLight ? "#2B2B2B" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: 500,
    padding: "12px 18px",
    transition: "all 0.2s ease",
    "&:hover": {
      background: isLight
        ? "#3A3A3A"
        : "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.1))",
      borderColor: isLight ? "#3A3A3A" : "rgba(255,255,255,0.2)",
    },
  };
});

interface RiskProps {
  sx?: SxProps<Theme>;
}

const Risk: React.FC<RiskProps> = ({ sx }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const baseRadius = 5;
  const desktopRadius = theme.spacing(baseRadius * 0.8);
  const mobileRadius = theme.spacing(baseRadius * 0.5);

  return (
    <FrostedGlassBox
      sx={{
        ...sx,
        mt: 4,
        mb: 6,
        borderRadius: { xs: mobileRadius, md: desktopRadius },
        p: { xs: 3, md: 6 },
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "18px",
          mb: 1,
          color: isLight ? "#454545" : "#FFFFFF",
        }}
      >
        Got questions?
      </Typography>

      <Typography
        sx={{
          fontWeight: 400,
          fontSize: "16px",
          mb: 3,
          color: isLight ? "#454545" : "rgba(255,255,255,0.7)",
          maxWidth: 520,
        }}
      >
        A quick chat with one of our lease extension specialists can save you
        time, stress, and thousands in unexpected costs.
      </Typography>

      <StyledCtaButton fullWidth>Talk to a specialist</StyledCtaButton>
    </FrostedGlassBox>
  );
};

export default Risk;
