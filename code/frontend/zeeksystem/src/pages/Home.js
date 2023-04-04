import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FlexRowRatio from "../components/dashboard/FlexRowRatio";
import Dashboard from "../components/dashboard/Dashboard";
import Divider from "@mui/joy/Divider";

function Home() {
  const [name, setName] = useState(null);
  const [redirect, setRedirect] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
      )}
    </div>
  );
}

export default Home;
