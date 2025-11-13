// src/components/Wait.tsx
import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useTheme,
  styled,
  SxProps,
  Theme,
} from "@mui/material";
import { computePremium } from "../lib/computePremium";

interface WaitProps {
  propertyValue: number;
  remainingYearsArray: number[];
  annualGroundRent: number;
  defermentRatePct: number;
  relativityRate: number;
  sx?: SxProps<Theme>;
}

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

const formatNumber = (num?: number) =>
  typeof num === "number" && Number.isFinite(num)
    ? "£" + Math.round(num).toLocaleString("en-GB")
    : "£0";

const Wait: React.FC<WaitProps> = ({
  propertyValue,
  remainingYearsArray,
  annualGroundRent,
  defermentRatePct,
  relativityRate,
  sx,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const dividerColor = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)";

  const estimates = remainingYearsArray.map((years) => {
    const premium = computePremium({
      propertyValue,
      remainingYears: years,
      annualGroundRent,
      defermentRatePct,
      relativityRate,
    });
    return Math.round(premium.total * 1.025);
  });

  return (
    <FrostedGlassBox sx={{ ...sx }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "18px",
          mb: 1,
          color: isLight ? "#454545" : "#FFFFFF",
        }}
      >
        What happens if you wait?
      </Typography>

      <Typography
        sx={{
          fontWeight: 400,
          fontSize: "16px",
          mb: 3,
          color: isLight ? "#454545" : "rgba(255,255,255,0.7)",
        }}
      >
        Every year your lease shortens, the premium rises — especially once it
        drops under 80 years, when marriage value becomes significant.
      </Typography>

      <TableContainer sx={{ background: "transparent" }}>
        <Table>
          <TableBody>
            {remainingYearsArray.map((years, index) => (
              <TableRow key={years}>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    color: isLight ? "#454545" : "#FFFFFF",
                    borderBottom:
                      index === remainingYearsArray.length - 1
                        ? "none"
                        : `1px solid ${dividerColor}`,
                    padding: 0,
                    paddingRight: "16px",
                    height: "56px",
                  }}
                >
                  Waiting {years} years:
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 600,
                    color: isLight ? "#454545" : "#FFFFFF",
                    borderBottom:
                      index === remainingYearsArray.length - 1
                        ? "none"
                        : `1px solid ${dividerColor}`,
                    padding: 0,
                    paddingLeft: "16px",
                    height: "56px",
                  }}
                >
                  {formatNumber(estimates[index])}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        sx={{
          fontSize: "12px",
          fontStyle: "italic",
          mt: 2,
          color: isLight ? "#454545" : "rgba(255,255,255,0.5)",
        }}
      >
        * Inflation adjusted at 2.5% per year
      </Typography>
    </FrostedGlassBox>
  );
};

export default Wait;
