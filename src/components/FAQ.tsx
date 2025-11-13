// src/components/FAQ.tsx
import React from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does lease extension work?",
    answer:
      "A lease extension increases the number of years on your property lease. You pay a premium to the landlord, and in return, your lease is extended, often by 90 years on top of your remaining lease. This improves the value of your home and makes it easier to sell.",
  },
  {
    question: "What is marriage value?",
    answer:
      "Marriage value is the extra value created when a leaseholder extends the lease. It only applies when the lease has less than 80 years remaining. The landlord is entitled to a share of this added value, usually split 50/50.",
  },
  {
    question: "How is ground rent calculated?",
    answer:
      "Ground rent is the annual amount you pay the freeholder. When calculating a lease extension premium, future ground rent is taken into account to determine the total cost.",
  },
  {
    question: "What is the typical deferment rate?",
    answer:
      "The deferment rate is a percentage used to discount future payments to their present value. It reflects the interest the landlord could earn elsewhere. Typically, it ranges from 4% to 7%.",
  },
  {
    question: "Can I extend before 80 years?",
    answer:
      "Yes, you can extend your lease at any time. However, extending before it drops below 80 years can be cheaper because marriage value may not apply yet.",
  },
  {
    question: "How do I pay the premium?",
    answer:
      "The premium can be paid as a single lump sum, usually at the end of the lease extension process. In some cases, your solicitor may arrange a structured payment plan with the landlord.",
  },
  {
    question: "Do I need a surveyor?",
    answer:
      "It’s highly recommended. A qualified surveyor calculates the premium accurately and ensures you are paying a fair price for your lease extension.",
  },
  {
    question: "How long does the process take?",
    answer:
      "Typically, it takes between 3 and 6 months from instruction to completion. The exact time depends on negotiation with the landlord and the complexity of the property ownership.",
  },
  {
    question: "Is legal advice required?",
    answer:
      "Yes. You need a solicitor to handle the legal paperwork and serve the formal notices. This protects you and ensures the lease extension is legally binding.",
  },
  {
    question: "What if the landlord refuses?",
    answer:
      "If the landlord refuses, you can apply to the First-tier Tribunal (Property Chamber) to have the premium determined legally. This guarantees a fair process even if negotiations fail.",
  },
];

const FAQ: React.FC = () => {
  const mid = Math.ceil(faqData.length / 2);
  const leftItems = faqData.slice(0, mid);
  const rightItems = faqData.slice(mid);

  const renderColumn = (items: FAQItem[]) =>
    items.map((item, idx) => (
      <Accordion
        key={idx}
        elevation={0}
        sx={{
          background: "transparent",
          boxShadow: "none",
          border: "none",
          "&::before": { display: "none" },
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            px: 0,
            minHeight: 48,
            "&::before": { display: "none" },
            "&.Mui-expanded": { minHeight: 48 },
            "& .MuiAccordionSummary-content": {
              margin: 0,
              alignItems: "center",
            },
          }}
        >
          <Typography sx={{ fontWeight: 600, textAlign: "left" }}>
            {item.question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, py: 1.5, "& > *": { m: 0 } }}>
          <Typography sx={{ textAlign: "left" }}>{item.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    ));

  return (
    <Box
      sx={{
        maxWidth: 1440,
        mx: "auto",
        mt: 12,
        px: { xs: 2, md: 4 },
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 6, textAlign: "left" }}
      >
        FAQs
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 6 },
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {renderColumn(leftItems)}
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {renderColumn(rightItems)}
        </Box>
      </Box>
    </Box>
  );
};

export default FAQ;
