import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';


export default function NoPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Link href="/" variant="body2">
              <Button variant="contained">Back Home</Button>
            </Link>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://www.vizion.com/wp-content/uploads/2018/09/shutterstock_479042983-636x344.jpg"
              alt=""
              width={500} height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

 