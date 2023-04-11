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
        // justifyContent: "center",
        // alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: isMobile ? "80%" : "90%",
          height: isMobile ? 150 : 170,
          marginLeft: isMobile ? "13px" : "40px",
          marginTop: isMobile ? "-13px" : "-20px",
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          background: "#FAEB46",
        }}
      />
    </Box>
  );
}
