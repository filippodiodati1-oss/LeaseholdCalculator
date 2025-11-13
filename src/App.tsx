import React, { useEffect, useState, useMemo, useRef } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createAppTheme } from "./theme";

import Hero from "./components/Hero";
import CalculatorCard from "./components/CalculatorCard";
import Footer from "./components/Footer";
import Results from "./components/Results";
import Value from "./components/Value";
import Money from "./components/Money";
import Wait from "./components/Wait";
import Risk from "./components/Risk";
import Aurora from "./components/Aurora";
import FAQ from "./components/FAQ";
import PillNav from "./components/PillNav";
import { createPillNavItems } from "./components/PillNavSections";

import { computePremium } from "./lib/computePremium";
import { getRelativityRate } from "./lib/relativityData";

import logoLight from "./assets/logo-light.svg";
import logoDark from "./assets/logo-dark.svg";

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const [remainingLeaseYears, setRemainingLeaseYears] = useState(70);
  const [groundRent, setGroundRent] = useState(500);
  const [currentValue, setCurrentValue] = useState(500_000);
  const standardDefermentRate = 5;

  const calculatorRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) setMode(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

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

  const pillItems = createPillNavItems({
    calculatorRef,
    faqRef,
  });

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
        logoLight={logoLight}
        logoDark={logoDark}
        items={pillItems}
        themeMode={mode}
        toggleTheme={() => setMode(mode === "light" ? "dark" : "light")}
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
            gap: { xs: 2, md: 6 },
            maxWidth: 1440,
            mx: "auto",
            width: "100%",
          }}
        >
          <Box
            sx={{ flexBasis: { xs: "100%", md: "40%" } }}
            ref={calculatorRef}
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

          <Box
            sx={{
              flexBasis: { xs: "100%", md: "60%" },
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, md: 4 },
            }}
          >
            <Results results={{ total: results.total }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 2, md: 4 },
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
                gap: { xs: 2, md: 4 },
              }}
            >
              <Wait
                propertyValue={currentValue}
                remainingYearsArray={[3, 5, 10]}
                annualGroundRent={groundRent}
                defermentRatePct={standardDefermentRate}
                relativityRate={getRelativityRate(remainingLeaseYears)}
                sx={{ flexBasis: { md: "50%" }, mt: 0, mb: 0 }}
              />
              <Risk
                remainingLeaseYears={remainingLeaseYears}
                totalPremium={results.total}
                sx={{ flexBasis: { md: "50%" }, mt: 0, mb: 0 }}
              />
            </Box>
          </Box>
        </Box>

        <Box ref={faqRef} sx={{ mb: 16 }}>
          <FAQ />
        </Box>

        <Footer themeMode={mode} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
