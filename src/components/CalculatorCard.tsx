// src/components/CalculatorCard.tsx
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Slider,
  InputAdornment,
  useTheme,
  styled,
  SxProps,
  Theme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface CalculatorCardProps {
  remainingLeaseYears: number;
  setRemainingLeaseYears: (value: number) => void;
  groundRent: number;
  setGroundRent: (value: number) => void;
  currentValue: number;
  setCurrentValue: (value: number) => void;
  sx?: SxProps<Theme>;
}

const marks = [
  { value: 1, label: "1" },
  { value: 80, label: "80" },
  { value: 90, label: "90" },
  { value: 100, label: "100" },
  { value: 120, label: "120+" },
];

// Frosted Glass Container (consistent with Results.tsx)
const FrostedGlassBox = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === "light";

  const lightBg = "rgba(255,255,255,0.42)";
  const darkBg = "rgba(28,28,28,0.28)";

  const lightBorder = "rgba(255,255,255,0.4)";
  const darkBorder = "rgba(255,255,255,0.05)";

  return {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    backgroundColor: isLight ? lightBg : darkBg,
    padding: theme.spacing(4, 8),
    boxShadow: "none",
    border: `1.5px solid ${isLight ? lightBorder : darkBorder}`,
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

// Info box consistent with Results.tsx styling
const InfoBox = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === "light";
  return {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: isLight ? "rgba(255,255,255,0.42)" : "rgba(28,28,28,0.28)",
    borderRadius: theme.spacing(1.5),
    border: `1px solid ${
      isLight ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"
    }`,
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(2),
      color: isLight ? "rgba(69,69,69,0.5)" : "#FFFFFF",
    },
    "& .MuiTypography-root": {
      color: isLight ? "#454545" : "rgba(255,255,255,0.7)",
      fontWeight: 400,
    },
    "& .MuiTypography-root strong": {
      fontWeight: 700,
      color: isLight ? "#454545" : "#FFFFFF",
    },
  };
});

// TextField consistent with Results.tsx styling
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
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "&[type=number]": {
        "-moz-appearance": "textfield",
      },
    },
    "& .MuiInputAdornment-root": {
      color: theme.palette.text.secondary,
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
  const isLight = theme.palette.mode === "light";

  const baseRadius = 5;
  const desktopRadius = theme.spacing(baseRadius * 0.8);
  const mobileRadius = theme.spacing(baseRadius * 0.5);

  const sliderColor = isLight ? "#111111" : "#FFFFFF";
  const hoverEffectColor = isLight
    ? "rgba(17,17,17,0.05)"
    : "rgba(255,255,255,0.1)";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: number) => void
  ) => {
    const raw = e.target.value.replace(/,/g, "");
    const num = Number(raw);
    setValue(num || 0);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const raw = e.target.value.replace(/,/g, "");
    Number(raw); // no state update needed
  };

  return (
    <FrostedGlassBox
      sx={{
        ...sx,
        borderRadius: { xs: mobileRadius, md: desktopRadius },
        p: { xs: 4, md: 8 },
      }}
    >
      {/* Lease Years Slider */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "24px",
            color: theme.palette.text.primary,
          }}
        >
          Lease Years Remaining
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "16px",
            color: isLight ? "#454545" : "rgba(255,255,255,0.7)",
            mb: 2,
          }}
        >
          Current years left on your lease
        </Typography>
        <Slider
          value={remainingLeaseYears}
          onChange={(e, value) => setRemainingLeaseYears(value as number)}
          step={1}
          marks={marks}
          min={1}
          max={120}
          valueLabelDisplay="on"
          sx={{
            color: sliderColor,
            "& .MuiSlider-markLabel": {
              fontSize: "12px",
              color: isLight ? "#454545" : "rgba(255,255,255,0.7)",
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: sliderColor,
              color: isLight ? "#FFFFFF" : "#000000",
            },
            "& .MuiSlider-thumb:hover": {
              boxShadow: `0px 0px 0px 8px ${hoverEffectColor}`,
            },
            "& .MuiSlider-thumb.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px ${hoverEffectColor}`,
            },
          }}
        />
      </Box>

      {/* Ground Rent Input */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "24px",
            color: theme.palette.text.primary,
          }}
        >
          Ground Rent
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "16px",
            color: isLight ? "#454545" : "rgba(255,255,255,0.7)",
            mb: 2,
          }}
        >
          How much ground rent do you pay per year?
        </Typography>
        <StyledTextField
          fullWidth
          variant="outlined"
          value={formatNumber(groundRent)}
          onChange={(e) => handleChange(e, setGroundRent)}
          onBlur={handleBlur}
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
            fontSize: "24px",
            color: theme.palette.text.primary,
          }}
        >
          Property Value (Forecast)
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "16px",
            color: isLight ? "#454545" : "rgba(255,255,255,0.7)",
            mb: 2,
          }}
        >
          What is the estimated value *after* the lease is extended?
        </Typography>
        <StyledTextField
          fullWidth
          variant="outlined"
          value={formatNumber(currentValue)}
          onChange={(e) => handleChange(e, setCurrentValue)}
          onBlur={handleBlur}
          type="text"
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
        />
      </Box>

      <InfoBox>
        <InfoOutlinedIcon />
        <Typography variant="body2">
          For this simulator, we use a standard **5% deferment rate**, which is
          the legal standard for flats in England and Wales.
        </Typography>
      </InfoBox>
    </FrostedGlassBox>
  );
};

export default CalculatorCard;
