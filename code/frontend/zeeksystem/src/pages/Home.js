import React, { useEffect } from "react";
import { Button } from "@mui/material";
import Link from "@mui/material/Link";

function Home() {
  useEffect(() => {
    (
       async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();

      console.log(content);
    })();
  });

  return (
    <div>
      <h1>welcome home</h1>
      <Link href="/login" variant="body2">
        <Button variant="contained">Sign me in</Button>
      </Link>
    </div>
  );
}

export default Home;
