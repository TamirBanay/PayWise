import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { Redirect } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Navbar from "../components/Navbar";
import AddRefundButton from "../components/dashboard/AddRefundButton";
import { Button } from "@mui/material";
import Card from "../components/dashboard/Card";
import zaraImg from "../images/zaraLogo.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, alpha, useTheme } from "@mui/material/styles";

function Home() {
  const [name, setName] = useState(null);
  const [redirect, setRedirect] = React.useState(false);


  const logOut = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    return <Redirect to="/login" />;
  };
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      setName(content.name);
      console.log();
      if (content.detail == "Unauthenticated!") {
        setRedirect(true);
      }
    })();
  });

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      {redirect ? (
        <></>
      ) : (
        <div>
          <Navbar />
          {/* <h1>Home</h1> */}
          {/* <Link href="/login" variant="body2">
            <Button variant="contained" onClick={logOut}>
              Logout
            </Button>
          </Link> */}

          <Dashboard />
        </div>
      )}
    </div>
  );
}

export default Home;
