import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"; // Import Button from Material-UI

export default function HelperTextAligned() {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 2 },
      }}
    >
      <TextField
        helperText="הכנס מס סיריאלי "
        id="demo-helper-text-aligned"
        label="מס סיריאלי"
      />
      <Button variant="contained" color="primary">
        שלח 
      </Button>
    </Box>
  );
}
