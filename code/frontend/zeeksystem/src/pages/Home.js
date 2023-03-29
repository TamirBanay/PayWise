import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { Redirect } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Navbar from "../components/Navbar";

import { Button } from "@mui/material";

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
          <Link href="/login" variant="body2">
            <Button variant="contained" onClick={logOut}>
              Logout
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
