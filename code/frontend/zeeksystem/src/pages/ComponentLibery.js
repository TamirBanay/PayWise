import React from "react";
import Card from "../components/dashboard/Card";
import zaraImg from "../images/zaraLogo.png";
import Dashboard from "../components/dashboard/Dashboard";
import AddRefundButton from "../components/dashboard/AddRefundButton";
import Profile from "./Profile";
function ComponentLibery() {
  return (
    <div>
      <h1>Welcome to the Component Libery</h1>
      <Card logo={zaraImg} name="ZARA" date="20.5.23" price="20" />
      <Dashboard />
      <AddRefundButton />
    </div>
  );
}

export default ComponentLibery;
