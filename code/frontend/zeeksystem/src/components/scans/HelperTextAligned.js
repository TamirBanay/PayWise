import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"; // Import Button from Material-UI
import { useState } from "react";
import {_User} from "../../services/atom"
import { useRecoilState } from "recoil";


export default function HelperTextAligned(props) {
  const [sirialNumber, setSirialNumber] = useState();
  const [user, setUser] = useRecoilState(_User) 
  const [allVouchers, setAllVouchers] = useState();

  const getAllVouchers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/getAllVouchers/`
      );
      const data = await response.json();
      setAllVouchers(data)
    } catch (error) {
      console.error("Error retrieving all vouchers:", error);
    }
  };
 
 
 
  const handleSaveVoucher = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:8000/api/createVoucher/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        voucherID: sirialNumber,
        walletID: 1000 + user.id,
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
    getAllVouchers().then(console.log(allVouchers))
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
