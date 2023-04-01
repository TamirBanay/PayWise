import React from "react";
import zaraImg from "../images/zaraLogo.png";
import Dashboard from "../components/dashboard/Dashboard";
import AddRefundButton from "../components/dashboard/AddRefundButton";
import FlexRowRatio from "../components/dashboard/FlexRowRatio";
import Navbar from "../components/Navbar";
import Divider from "@mui/joy/Divider";

function ComponentLibery() {
  return (
    <div>
      {/* <h1>Welcome to the Component Libery</h1> */}
      <Navbar />
      <Dashboard />
      <p></p>
      {/* <Divider orientation="horizontal">זיכויים קרובים</Divider> <p></p> */}
      <FlexRowRatio />
      <p></p>
      <Divider orientation="horizontal" />
    </div>
  );
}

export default ComponentLibery;
