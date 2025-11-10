// src/components/Footer.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface FooterProps {
  themeMode: "light" | "dark";
}

const Footer: React.FC<FooterProps> = ({ themeMode }) => {
  const isLight = themeMode === "light";

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        pt: 6, // increased top padding
        pb: 3,
        px: { xs: 2, md: 4 },
        background: "transparent", // remove frost
        borderTop: "3px solid transparent",
        borderImage:
          "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.2), rgba(255,255,255,0)) 1",
      }}
    >
      <Box
        sx={{
          maxWidth: 1440,
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {/* LEFT: Logo */}
        <Box>
          <img
            src={isLight ? "/assets/logo-light.svg" : "/assets/logo-dark.svg"}
            alt="Company Logo"
            style={{ height: 40 }}
          />
        </Box>

        {/* RIGHT: Texts */}
        <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
          <Typography
            sx={{
              fontSize: "14px",
              color: isLight ? "#111111" : "#FFFFFF",
              fontWeight: 400,
            }}
          >
            © 2025 All rights reserved
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              color: isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
              fontWeight: 300,
              maxWidth: 600,
              mt: 0.5,
            }}
          >
            This calculation is not intended to replace legal or professional
            advice. It is a demonstrative tool providing only an indicative
            value.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
