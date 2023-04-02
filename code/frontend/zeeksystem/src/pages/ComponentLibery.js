import React from "react";
import zaraImg from "../images/zaraLogo.png";
import Dashboard from "../components/dashboard/Dashboard";
import AddRefundButton from "../components/dashboard/AddRefundButton";
import FlexRowRatio from "../components/dashboard/FlexRowRatio";
import Navbar from "../components/Navbar";
import Divider from "@mui/joy/Divider";
import { styled, alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function ComponentLibery() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Navbar />
      <Dashboard />
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
