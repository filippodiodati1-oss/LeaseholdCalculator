import { PillNavItem } from "./PillNav";

interface PillNavSectionsProps {
  calculatorRef: React.RefObject<HTMLDivElement | null>;
  faqRef: React.RefObject<HTMLDivElement | null>;
}

export const createPillNavItems = ({
  calculatorRef,
  faqRef,
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
];
