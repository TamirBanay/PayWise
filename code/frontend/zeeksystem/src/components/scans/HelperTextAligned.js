import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"; // Import Button from Material-UI
import { useState } from "react";
export default function HelperTextAligned(props) {
  const [sirialNumber, setSirialNumber] = useState();
  const handleSaveVoucher = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:8000/api/createVoucher/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        voucherID: sirialNumber,
        walletID: 1000 + props.userID,
        voucherCategory: "Category A",
        storeType: "Store B",
        ammount: "100",
        redeemed: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("sucsses", data);
        props.getWallet();
        props.handleClose();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handleChange = (e) => {
    setSirialNumber(e.target.value);
  };

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 2 },
      }}
    >
      <TextField
        id="demo-helper-text-aligned"
        label="הכנס מס סיריאלי"
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleSaveVoucher}>
        שלח
      </Button>
    </Box>
  );
}
