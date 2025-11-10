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
    answer: "When you extend your lease...",
  },
  { question: "What is marriage value?", answer: "Marriage value is..." },
  { question: "How is ground rent calculated?", answer: "Ground rent is..." },
  {
    question: "What is the typical deferment rate?",
    answer: "The deferment rate...",
  },
  { question: "Can I extend before 80 years?", answer: "Yes, but..." },
  { question: "How do I pay the premium?", answer: "Payment is usually..." },
  { question: "Do I need a surveyor?", answer: "It is recommended..." },
  { question: "How long does the process take?", answer: "Typically..." },
  { question: "Is legal advice required?", answer: "While not mandatory..." },
  {
    question: "What if the landlord refuses?",
    answer: "There are legal routes...",
  },
];

const FAQ: React.FC = () => {
  const mid = Math.ceil(faqData.length / 2);
  const leftItems = faqData.slice(0, mid);
  const rightItems = faqData.slice(mid);

  return (
    <Box
      sx={{
        maxWidth: 1440,
        mx: "auto",
        mt: 12, // extra spacing from above
        px: { xs: 2, md: 4 },
        width: "100%",
      }}
    >
      {/* FAQ Title */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 6, textAlign: "left" }} // Left-aligned
      >
        FAQ
      </Typography>

      {/* Two columns */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Left Column */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {leftItems.map((item, idx) => (
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
                  "&::before": { display: "none" },
                }}
              >
                <Typography sx={{ fontWeight: 600, textAlign: "left" }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                <Typography sx={{ textAlign: "left" }}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {rightItems.map((item, idx) => (
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
                  "&::before": { display: "none" },
                }}
              >
                <Typography sx={{ fontWeight: 600, textAlign: "left" }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                <Typography sx={{ textAlign: "left" }}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FAQ;
