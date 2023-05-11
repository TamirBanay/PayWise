import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"; // Import Button from Material-UI
import { useEffect, useState } from "react";
import { _User } from "../../services/atom";
import { useRecoilState } from "recoil";

export default function HelperTextAligned(props) {
  const [serialNumber, setSerialNumber] = useState();
  const [user, setUser] = useRecoilState(_User);
  const [allVouchers, setAllVouchers] = useState();

  const getAllVouchers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/getAllVouchers/`);
      const data = await response.json();
      const allVouchersArray = JSON.parse(data.MOCK_vouchers);
      setAllVouchers(allVouchersArray);
    } catch (error) {
      console.error("Error retrieving all vouchers:", error);
    }
  };

  const handleSaveVoucher = async (event) => {
    const serialNumberExists = allVouchers.some(
      (voucher) => voucher.pk == serialNumber
    );
    if (!serialNumberExists) {
      console.log("the voucher is not exist in the system");
    } else {
      const voucher = allVouchers.find((voucher) => voucher.pk == serialNumber);
      event.preventDefault();
      await fetch("http://localhost:8000/api/createVoucher/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voucherID: serialNumber,
          walletID: 1000 + user.id,
          voucherCategory: voucher.fields.voucherCategory,
          storeType: voucher.fields.storeType,
          ammount: voucher.fields.ammount,
          redeemed: voucher.fields.redeemed,
          storeName: voucher.fields.storeName,
          dateOfExpiry: voucher.fields.dateOfExpiry
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("sucsses", data);
          props.getWallet();
          props.handleClose();
        });
      getAllVouchers().catch((error) => {
        console.log("error", error);
      });
    }
  };
  const handleChange = (e) => {
    setSerialNumber(e.target.value);
  };
  useEffect(() => {
    getAllVouchers();
  }, []);

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
