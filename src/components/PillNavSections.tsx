// src/components/PillNavSections.tsx
import React from "react";
import { PillNavItem } from "./PillNav";

interface PillNavSectionsProps {
  calculatorRef: React.RefObject<HTMLDivElement>;
  faqRef: React.RefObject<HTMLDivElement>;
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

export const createPillNavItems = ({
  calculatorRef,
  faqRef,
  mode,
  setMode,
}: PillNavSectionsProps): PillNavItem[] => [
  {
    label: "Calculator",
    onClick: () =>
      calculatorRef.current?.scrollIntoView({ behavior: "smooth" }),
    isActive: true,
  },
  {
    label: "FAQ",
    onClick: () => faqRef.current?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    label: mode === "light" ? "Dark Mode" : "Light Mode",
    onClick: () => setMode(mode === "light" ? "dark" : "light"),
  },
];
