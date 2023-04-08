import React from "react";
import ChartPie from "../components/dashboard/ChartPie";
import FlexRowRatio from "../components/dashboard/FlexRowRatio";
import Navbar from "../components/Navbar";
import Divider from "@mui/joy/Divider";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function ComponentLibery() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Navbar />
      <ChartPie />
      <p></p>
      {isMobile ? (
        /* if its mobile */
        <div>
          <Divider orientation="horizontal">זיכויים קרובים</Divider>
          <p></p>

          <FlexRowRatio />
        </div>
      ) : (
        /* if its normal screen */
        ""
      )}
    </div>
  );
}

export default ComponentLibery;
