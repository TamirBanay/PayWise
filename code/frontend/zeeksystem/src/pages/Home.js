import React from "react";
import { Button,  } from '@mui/material';
import Link from '@mui/material/Link';

function Home() {
  return (
    <div>
      <h1>welcome home</h1>
      <Link href="/signin" variant="body2">
              <Button variant="contained">Sign me in</Button>
            </Link>
    </div>
  );
}

export default Home;
