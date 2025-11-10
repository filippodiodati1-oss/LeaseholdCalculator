// src/App.tsx
import React, { useEffect, useState, useMemo, useRef } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createAppTheme } from "./theme";

import Hero from "./components/Hero";
import CalculatorCard from "./components/CalculatorCard";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import Results from "./components/Results";
import Value from "./components/Value";
import Money from "./components/Money";
import Wait from "./components/Wait";
import Risk from "./components/Risk";
import Aurora from "./components/Aurora"; // WebGL Aurora Background
import FAQ from "./components/FAQ";
import PillNav, { PillNavItem } from "./components/PillNav";

import { computePremium } from "./lib/computePremium";
import { getRelativityRate } from "./lib/relativityData";

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark"); // default to dark
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const [remainingLeaseYears, setRemainingLeaseYears] = useState(70);
  const [groundRent, setGroundRent] = useState(500);
  const [currentValue, setCurrentValue] = useState(500_000);
  const standardDefermentRate = 5;

  const calculatorRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);

  // Load theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) setMode(stored);
  }, []);

  // Save theme
  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  // Premium calculation
  const results = useMemo(() => {
    const relativity = getRelativityRate(remainingLeaseYears);
    return computePremium({
      propertyValue: currentValue,
      remainingYears: remainingLeaseYears,
      annualGroundRent: groundRent,
      defermentRatePct: standardDefermentRate,
      relativityRate: relativity,
    });
  }, [currentValue, remainingLeaseYears, groundRent]);

  const currentLeaseValue = Math.round(
    currentValue * getRelativityRate(remainingLeaseYears)
  );

  const afterExtensionValue = Math.round(currentValue);

  // Scroll helper
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Middle pill items only
  const pillItems: PillNavItem[] = [
    { label: "Calculator", onClick: () => scrollTo(calculatorRef) },
    { label: "FAQ", onClick: () => scrollTo(faqRef) },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Aurora Background */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <Aurora
          colorStops={["#FF9466", "#B19EEF", "#5227FF"]}
          amplitude={1.2}
          blend={0.5}
          speed={1.0}
          opacity={mode === "light" ? 0.4 : 1}
        />
      </Box>

      {/* PillNav */}
      <PillNav
        logo={
          mode === "light" ? "/assets/logo-light.svg" : "/assets/logo-dark.svg"
        }
        logoAlt="Company Logo"
        items={pillItems}
        themeMode={mode}
        themeToggle={<ThemeToggle theme={mode} setTheme={setMode} />}
      />

      {/* Main Layout */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          color: "text.primary",
          px: { xs: 2, md: 4 },
          py: 3,
          position: "relative",
        }}
      >
        <Hero themeMode={mode} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
            maxWidth: 1440,
            mx: "auto",
            width: "100%",
          }}
        >
          {/* LEFT COLUMN – Calculator */}
          <Box
            sx={{ flexBasis: { xs: "100%", md: "40%" } }}
            ref={calculatorRef}
          >
            <Box
              sx={{
                position: { xs: "static", md: "sticky" },
                top: { md: 120 },
              }}
            >
              <CalculatorCard
                remainingLeaseYears={remainingLeaseYears}
                setRemainingLeaseYears={setRemainingLeaseYears}
                groundRent={groundRent}
                setGroundRent={setGroundRent}
                currentValue={currentValue}
                setCurrentValue={setCurrentValue}
              />
            </Box>
          </Box>

          {/* RIGHT COLUMN – Results */}
          <Box
            sx={{
              flexBasis: { xs: "100%", md: "60%" },
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Results results={{ total: results.total }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              <Value
                currentLeaseValue={currentLeaseValue}
                afterExtensionValue={afterExtensionValue}
                totalPremium={results.total}
                remainingLeaseYears={remainingLeaseYears}
                sx={{ flexBasis: { md: "50%" } }}
              />
              <Money
                marriageValue={results.marriageValue}
                groundRentComp={results.grc}
                pvc={results.pvc}
                totalPremium={results.total}
                sx={{ flexBasis: { md: "50%" } }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              <Wait
                propertyValue={currentValue}
                remainingYearsArray={[3, 5, 10]}
                annualGroundRent={groundRent}
                defermentRatePct={standardDefermentRate}
                relativityRate={getRelativityRate(remainingLeaseYears)}
                sx={{ flexBasis: { md: "50%" } }}
              />
              <Risk sx={{ flexBasis: { md: "50%" } }} />
            </Box>
          </Box>
        </Box>

        {/* FAQ */}
        <Box ref={faqRef} sx={{ mb: 16 }}>
          <FAQ />
        </Box>

        {/* Footer */}
        <Footer themeMode={mode} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
