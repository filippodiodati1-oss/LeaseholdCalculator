import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

export interface PillNavItem {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

interface PillNavProps {
  logoLight: string;
  logoDark: string;
  items: PillNavItem[];
  themeMode?: "light" | "dark";
  toggleTheme?: () => void;
}

const PillNav: React.FC<PillNavProps> = ({
  logoLight,
  logoDark,
  items,
  themeMode = "light",
  toggleTheme,
}) => {
  const textColor = themeMode === "light" ? "#111111" : "#FFFFFF";
  const logo = themeMode === "light" ? logoLight : logoDark;

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1440,
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // stack logo on mobile
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 2,
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: { xs: 3, md: 0 }, // more spacing on mobile
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Company Logo"
            sx={{ height: { xs: 40, md: 32 } }} // 20% smaller on desktop
          />
        </Box>

        {/* Pills + Theme Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
            px: 1,
            borderRadius: "50px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.10)",
            py: 0.5,
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

          {toggleTheme && (
            <IconButton onClick={toggleTheme} sx={{ color: textColor }}>
              {themeMode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PillNav;
