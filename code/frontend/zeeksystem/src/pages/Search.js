import React from "react";
import zaraImg from "../images/zaraLogo.png";
import Dashboard from "../components/dashboard/Dashboard";
import AddRefundButton from "../components/dashboard/AddRefundButton";
import FlexRowRatio from "../components/dashboard/FlexRowRatio";
import Navbar from "../components/Navbar";
import Divider from "@mui/joy/Divider";
import { styled, alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tags from "../components/Tags";

function Search() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Navbar />
      <Tags />
    </div>
  );
}

export default Search;
