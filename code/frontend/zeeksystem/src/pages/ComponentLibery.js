import React from "react";
import zaraImg from "../images/zaraLogo.png";
import Dashboard from "../components/dashboard/Dashboard";
import AddRefundButton from "../components/dashboard/AddRefundButton";
import Profile from "./Profile";
import InteractiveCard from "../components/dashboard/InteractiveCard";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Navbar from "../components/Navbar";

function ComponentLibery() {
  return (
    <div>
      {/* <h1>Welcome to the Component Libery</h1> */}
      <Navbar />
      {/* <InteractiveCard /> */}
    </div>
  );
}

export default ComponentLibery;
