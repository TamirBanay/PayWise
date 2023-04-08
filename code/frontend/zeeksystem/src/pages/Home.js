import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FlexRowRatio from "../components/dashboard/FlexRowRatio";
import ChartPie from "../components/dashboard/ChartPie";
import Divider from "@mui/material/Divider";

function Home() {
  const [name, setName] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const logOut = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    setRedirect(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.ok) {
          const content = await response.json();
          setName(content.name);
        } else {
          setRedirect(true);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <ChartPie />
      <p></p>
      {isMobile ? (
        <div>
          <Divider orientation="horizontal">זיכויים קרובים</Divider>
          <p></p>
          <FlexRowRatio />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
