// src/components/PillNav.tsx
import React from "react";
import { Box, Button } from "@mui/material";

export interface PillNavItem {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

interface PillNavProps {
  logo: string;
  logoAlt: string;
  items: PillNavItem[];
  themeMode?: "light" | "dark";
  themeToggle?: React.ReactNode;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt,
  items,
  themeMode = "light",
  themeToggle,
}) => {
  const textColor = themeMode === "light" ? "#111111" : "#FFFFFF";

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* max width wrapper */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1440px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 2,
        }}
      >
        {/* LEFT — Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt={logoAlt} style={{ height: 40 }} />
        </Box>

        {/* CENTER — Frosted Pills */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            px: 1, // internal padding between buttons
            borderRadius: "50px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.10)",
            py: 0.5, // vertical padding for the container
          }}
        >
          {items.map((item) => (
            <Button
              key={item.label}
              onClick={item.onClick}
              sx={{
                textTransform: "none",
                fontSize: "15px",
                color: textColor,
                borderRadius: "40px",
                px: 2,
                py: 0.75,
                background: "transparent",
                "&:hover": {
                  background:
                    themeMode === "light"
                      ? "rgba(0,0,0,0.05)"
                      : "rgba(255,255,255,0.15)",
                  color: textColor,
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* RIGHT — Theme Toggle */}
        <Box>{themeToggle}</Box>
      </Box>
    </Box>
  );
};

export default PillNav;
