import React from "react";
import {
  Box,
  Typography,
  IconButton,
  styled,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

interface RiskProps {
  sx?: SxProps<Theme>;
  shareUrl?: string;
  remainingLeaseYears?: number;
  totalPremium?: number;
}

const PillIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "strokeColor",
})<{ strokeColor: string }>(({ theme, strokeColor }) => ({
  borderRadius: "50px",
  border: `1px solid ${strokeColor}`,
  backgroundColor: "rgba(255,255,255,0.05)",
  padding: theme.spacing(1.5),
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
}));

const Risk: React.FC<RiskProps> = ({
  sx,
  shareUrl,
  remainingLeaseYears,
  totalPremium,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const currentURL = shareUrl || window.location.href;

  const message = `Check out my lease extension result!
Remaining years: ${remainingLeaseYears ?? "?"}
Premium: £${totalPremium ?? "?"}
See more: ${currentURL}`;

  const encodedMessage = encodeURIComponent(message);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedMessage}`,
    email: `mailto:?subject=Lease Extension Result&body=${encodedMessage}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentURL
    )}`,
  };

  const strokeColor = isLight ? "#111111" : "#FFFFFF";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentURL);
    alert("Link copied to clipboard!");
  };

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
        Share your results
      </Typography>

      <Typography
        sx={{
          fontWeight: 400,
          fontSize: "16px",
          mb: 4,
          color: isLight ? "#454545" : "rgba(255,255,255,0.7)",
          maxWidth: 520,
          textAlign: "center",
        }}
      >
        Scan the QR code or use one of the buttons below to share your lease
        extension results.
      </Typography>

      {/* QR Code */}
      <Box sx={{ mb: 4 }}>
        <QRCodeCanvas
          value={currentURL}
          size={120}
          fgColor={isLight ? "#111111" : "#FFFFFF"}
          bgColor="transparent"
        />
      </Box>

      {/* Share Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <PillIconButton
          strokeColor={strokeColor}
          onClick={() => window.open(shareLinks.whatsapp, "_blank")}
        >
          <WhatsAppIcon sx={{ color: strokeColor }} />
        </PillIconButton>

        <PillIconButton
          strokeColor={strokeColor}
          onClick={() => window.open(shareLinks.email, "_blank")}
        >
          <EmailIcon sx={{ color: strokeColor }} />
        </PillIconButton>

        <PillIconButton
          strokeColor={strokeColor}
          onClick={() => window.open(shareLinks.facebook, "_blank")}
        >
          <FacebookIcon sx={{ color: strokeColor }} />
        </PillIconButton>

        <PillIconButton strokeColor={strokeColor} onClick={copyToClipboard}>
          <ContentCopyIcon sx={{ color: strokeColor }} />
        </PillIconButton>
      </Box>
    </FrostedGlassBox>
  );
};

export default Risk;
