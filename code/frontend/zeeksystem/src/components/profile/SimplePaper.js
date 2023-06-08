import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function SimplePaper() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          width: "100%",
          height: 150,
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          background: "#0091B0",
        }}
      />
    </Box>
  );
}
