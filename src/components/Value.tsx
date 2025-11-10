// src/components/Value.tsx
import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useTheme,
  styled,
  SxProps,
  Theme,
} from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

interface ValueProps {
  currentLeaseValue: number;
  afterExtensionValue: number;
  totalPremium: number;
  remainingLeaseYears: number;
  sx?: SxProps<Theme>;
}

// Frosted glass box
const FrostedGlassBox = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === "light";
  return {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    padding: theme.spacing(3, 5),
    backgroundColor: isLight ? "rgba(255,255,255,0.42)" : "rgba(28,28,28,0.28)",
    borderRadius: theme.spacing(2.5),
    boxShadow: "none",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: isLight
      ? "1.5px solid rgba(255,255,255,0.4)"
      : "1.5px solid rgba(255,255,255,0.05)",
  };
});

// Format numbers as £
const formatNumber = (num?: number) =>
  typeof num === "number" && Number.isFinite(num)
    ? "£" + Math.round(num).toLocaleString("en-GB")
    : "£0";

// Format axis numbers as K
const formatAxisNumber = (num: number) =>
  num >= 1000 ? `${Math.round(num / 1000)}K` : `${num}`;

const Value: React.FC<ValueProps> = ({
  currentLeaseValue,
  afterExtensionValue,
  totalPremium,
  sx,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const baseRadius = 5;
  const desktopRadius = theme.spacing(baseRadius);
  const mobileRadius = theme.spacing(baseRadius / 2);

  // Colors
  const firstBarColor = isLight
    ? "rgba(17,17,17,0.8)"
    : "rgba(255,255,255,0.8)";
  const secondBarColor = "rgba(104,66,255,0.8)";
  const axisTextColor = isLight ? "#454545" : "#FFFFFF";
  const gridStroke = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)";

  const data = [
    { name: "Current Lease Value", value: currentLeaseValue },
    { name: "After Extension Value", value: afterExtensionValue },
  ];

  const tableData = [
    {
      label: "Current Lease Value",
      value: currentLeaseValue,
      color: firstBarColor,
    },
    {
      label: "After Extension Value",
      value: afterExtensionValue,
      color: secondBarColor,
    },
    {
      label: "Total Equity Gain",
      value: afterExtensionValue - currentLeaseValue,
      isTotal: true,
    },
  ];

  return (
    <FrostedGlassBox
      sx={{
        ...sx,
        borderRadius: { xs: mobileRadius, md: desktopRadius },
        p: { xs: 3, md: 5 },
        width: "100%",
      }}
    >
      {/* Titles */}
      <Box sx={{ textAlign: "left", mb: 2 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            mb: "8px",
            color: axisTextColor,
          }}
        >
          Property value over time
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "16px",
            color: axisTextColor,
            maxWidth: 480,
          }}
        >
          An estimated projection of your property's value, now and after the
          lease extension.
        </Typography>
      </Box>

      {/* Chart */}
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid stroke={gridStroke} strokeDasharray="4 2" />
            <XAxis
              dataKey="name"
              tick={{ fill: axisTextColor }}
              tickFormatter={() => ""}
            />
            <YAxis
              tick={{ fill: axisTextColor }}
              tickFormatter={formatAxisNumber}
            />
            <Tooltip
              formatter={(value: number) => `£${value.toLocaleString("en-GB")}`}
              contentStyle={{
                backgroundColor: isLight ? "#fff" : "#FFFFFF",
                border: "none",
                borderRadius: "8px",
              }}
              labelStyle={{
                color: isLight ? "#000" : "#111111",
                fontWeight: 600,
              }}
              itemStyle={{ color: isLight ? "#000" : "#111111" }}
              cursor={{
                fill: isLight ? "rgba(17,17,17,0.1)" : "rgba(255,255,255,0.05)",
              }}
            />
            <Bar dataKey="value" barSize={60} radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? firstBarColor : secondBarColor}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Table */}
      <TableContainer
        sx={{ boxShadow: "none", background: "transparent", mt: 3 }}
      >
        <Table>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow
                key={row.label}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  fontWeight: row.isTotal ? 600 : 500,
                }}
              >
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "inherit",
                    color: axisTextColor,
                    borderBottom: row.isTotal
                      ? "none"
                      : `1px solid ${gridStroke}`,
                    paddingY: 0,
                    paddingX: 0,
                    height: "48px",
                  }}
                >
                  {!row.isTotal && row.color && (
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: 3,
                        backgroundColor: row.color,
                        mr: 1.5,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {row.label}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "inherit",
                    color: axisTextColor,
                    borderBottom: row.isTotal
                      ? "none"
                      : `1px solid ${gridStroke}`,
                    paddingY: 0,
                    paddingX: 0,
                    height: "48px",
                  }}
                >
                  {formatNumber(row.value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FrostedGlassBox>
  );
};

export default Value;
