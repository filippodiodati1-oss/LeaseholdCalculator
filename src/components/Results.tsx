import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  styled,
  SxProps,
  Theme,
} from "@mui/material";

interface ResultsProps {
  results: {
    total?: number;
  };
  sx?: SxProps<Theme>;
}

// Safe number formatting
const formatNumber = (num?: number) => {
  if (typeof num !== "number" || !Number.isFinite(num)) return "£0";
  const roundedNum = Math.round(num);
  return "£" + roundedNum.toLocaleString("en-GB");
};

// Styled Box with frosted glass effect (static styles)
const FrostedGlassBox = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === "light";

  return {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    padding: theme.spacing(2, 6),
    backgroundColor: isLight ? "rgba(255,255,255,0.42)" : "rgba(28,28,28,0.28)", // UPDATED: dark mode opacity 28%
    border: `1px solid ${
      isLight ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"
    }`,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "none",
  };
});

const Results: React.FC<ResultsProps> = ({ results, sx }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLight = theme.palette.mode === "light";

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(isMobile ? 40 : 64);

  useEffect(() => {
    const adjustFont = () => {
      if (!containerRef.current || !textRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const textEl = textRef.current;

      let newFontSize = isMobile ? 40 : 64;
      textEl.style.fontSize = `${newFontSize}px`;

      while (
        (textEl.scrollWidth > containerWidth ||
          textEl.scrollHeight > containerHeight) &&
        newFontSize > 12
      ) {
        newFontSize -= 1;
        textEl.style.fontSize = `${newFontSize}px`;
      }

      setFontSize(newFontSize);
    };

    adjustFont();
    window.addEventListener("resize", adjustFont);
    return () => window.removeEventListener("resize", adjustFont);
  }, [results, isMobile]);

  return (
    <FrostedGlassBox
      ref={containerRef}
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        height: { xs: "auto", md: 200 },
        justifyContent: "center",
        borderRadius: { xs: theme.spacing(2.5), md: theme.spacing(5) }, // half radius on mobile
      }}
    >
      <Box ref={textRef}>
        <Typography
          sx={{
            fontWeight: 800,
            color: theme.palette.text.primary,
            fontSize: `${fontSize}px`,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            transition: "font-size 0.1s ease",
          }}
        >
          {formatNumber(results.total)}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontWeight: 400,
          fontSize: { xs: "16px", md: "16px" },
          color: isLight ? "#454545" : "rgba(255,255,255,0.7)", // subtitle
        }}
      >
        Estimated lease extension cost today, based on your property value,
        lease length, and ground rent.
      </Typography>
    </FrostedGlassBox>
  );
};

export default Results;
