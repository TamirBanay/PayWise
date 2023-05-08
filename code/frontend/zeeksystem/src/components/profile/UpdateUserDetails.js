import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function FormPropsTextFields(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-helperText"
          label="שם"
          defaultValue={props.data.first_name}
        />
        <TextField
          id="outlined-helperText"
          label="שם משפחה"
          defaultValue={props.data.last_name}
        />
        <TextField
          id="outlined-helperText"
          label="מייל"
          defaultValue={props.data.email}
        />
        <TextField
          id="outlined-helperText"
          label="מין"
          defaultValue={props.data.gender}
        />{" "}
        <TextField
          id="outlined-helperText"
          label="עיר"
          defaultValue={props.data.city}
        />
        <TextField
          id="outlined-helperText"
          label="רחוב"
          defaultValue={props.data.street}
        />{" "}
        <TextField
          id="outlined-helperText"
          label="מס' בית"
          defaultValue={props.data.houseNumber}
        />{" "}
        <TextField
          id="outlined-helperText"
          label="תאריך לידה "
          defaultValue={props.data.dateOfBirth}
          type="date"
        />
      </div>
      <Button variant="contained">שלח</Button>
    </Box>
  );
}
