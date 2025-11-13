// src/components/CalculatorCard.tsx
import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
  styled,
  SxProps,
  Theme,
} from "@mui/material";

interface CalculatorCardProps {
  remainingLeaseYears: number;
  setRemainingLeaseYears: (value: number) => void;
  groundRent: number;
  setGroundRent: (value: number) => void;
  currentValue: number;
  setCurrentValue: (value: number) => void;
  sx?: SxProps<Theme>;
}

// Frosted Glass Container
const FrostedGlassBox = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === "light";
  return {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    backgroundColor: isLight ? "rgba(255,255,255,0.42)" : "rgba(28,28,28,0.28)",
    padding: theme.spacing(4, 8),
    boxShadow: "none",
    border: `1.5px solid ${
      isLight ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"
    }`,
    borderRadius: theme.spacing(5),
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "inherit",
      zIndex: -1,
    },
  };
});

// Styled TextField
const StyledTextField = styled(TextField)(({ theme }) => {
  const isLight = theme.palette.mode === "light";
  const bgColor = isLight ? "rgba(255,255,255,0.42)" : "rgba(28,28,28,0.28)";
  const borderColor = isLight
    ? "rgba(255,255,255,0.4)"
    : "rgba(255,255,255,0.05)";
  return {
    "& .MuiOutlinedInput-root": {
      backgroundColor: bgColor,
      borderRadius: theme.spacing(1),
      "& fieldset": {
        borderColor: borderColor,
      },
      "&:hover fieldset": {
        borderColor: isLight ? "#454545" : "#FFFFFF",
      },
      "&.Mui-focused fieldset": {
        borderColor: isLight ? "#454545" : "#FFFFFF",
        borderWidth: "1px",
      },
    },
    "& .MuiInputBase-input": {
      color: theme.palette.text.primary,
      textAlign: "left", // ✅ aligned left
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "&[type=number]": {
        "-moz-appearance": "textfield",
      },
    },
    "& .MuiInputAdornment-root": {
      color: "rgba(255,255,255,0.5)", // ✅ £ sign with 50% opacity
    },
  };
});

// Number formatting utility
const formatNumber = (value: number) =>
  Number.isFinite(value) ? new Intl.NumberFormat("en-GB").format(value) : "0";

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  remainingLeaseYears,
  setRemainingLeaseYears,
  groundRent,
  setGroundRent,
  currentValue,
  setCurrentValue,
  sx,
}) => {
  const theme = useTheme();

  return (
    <FrostedGlassBox
      sx={{
        ...sx,
        borderRadius: { xs: theme.spacing(2.5), md: theme.spacing(5) },
        p: { xs: 4, md: 8 },
        width: { md: "90%" },
        mx: { md: "auto" },
      }}
    >
      {/* Lease Years Input */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            mb: "8px",
            color: theme.palette.text.primary,
          }}
        >
          How many years remain on your lease?
        </Typography>

        <StyledTextField
          type="text"
          value={
            remainingLeaseYears === 0 ? "" : remainingLeaseYears.toString()
          }
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(raw)) {
              setRemainingLeaseYears(raw === "" ? 0 : Number(raw));
            }
          }}
          onBlur={() => {
            if (remainingLeaseYears < 1) setRemainingLeaseYears(1);
            if (remainingLeaseYears > 120) setRemainingLeaseYears(120);
          }}
          fullWidth
        />
      </Box>

      {/* Ground Rent Input */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            mb: "8px",
            color: theme.palette.text.primary,
          }}
        >
          How much ground rent do you pay per year?
        </Typography>
        <StyledTextField
          fullWidth
          variant="outlined"
          value={formatNumber(groundRent)}
          onChange={(e) =>
            setGroundRent(Number(e.target.value.replace(/,/g, "")) || 0)
          }
          type="text"
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
        />
      </Box>

      {/* Property Value Input */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            mb: "8px",
            color: theme.palette.text.primary,
          }}
        >
          What is the estimated property value after the lease is extended?
        </Typography>
        <StyledTextField
          fullWidth
          variant="outlined"
          value={formatNumber(currentValue)}
          onChange={(e) =>
            setCurrentValue(Number(e.target.value.replace(/,/g, "")) || 0)
          }
          type="text"
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
        />
      </Box>
    </FrostedGlassBox>
  );
};

export default CalculatorCard;
