import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"; // Import Button from Material-UI
import { useEffect, useState } from "react";
import { _Vouchers, _User } from "../../services/atom";
import { useRecoilState } from "recoil";
import AlertNotification from "../AlertNotification";

export default function HelperTextAligned(props) {
  const [serialNumber, setSerialNumber] = useState(" ");
  const [user, setUser] = useRecoilState(_User);
  const [vouchers, setVouchers] = useRecoilState(_Vouchers);
  const [systemVouchers, setSystemVOuchers] = useState();
  const [allVouchers, setAllVouchers] = useState();
  const [errorMsg, setErrorMsg] = useState("")
  const [errorTitle, setErrorTitle] = useState("")
  const [voucherExist, setVoucherExist] = useState(false);

  const getAllVouchers = async () => {
    try {
      const response = await fetch(`api/getAllVouchers/`);
      const data = await response.json();
      const allVouchersArray = JSON.parse(data.MOCK_vouchers);
      setAllVouchers(allVouchersArray);
    } catch (error) {
      console.error("Error retrieving all vouchers:", error);
    }
  };

  const getSystemVouchers = async () => {
    try {
      const response = await fetch(`api/getVouchers/`);
      const data = await response.json();
      const allVouchersArray = JSON.parse(data.vouchers);
      setSystemVOuchers(allVouchersArray);
    } catch (error) {
      console.error("Error retrieving all vouchers:", error);
    }
  };

  const handleSaveVoucher = async (event) => {
    const serialNumberExistsAtMock = allVouchers.some(
      (voucher) => voucher.pk == serialNumber
    );
    const serialNumberExistsAtSystem = systemVouchers.some(
      (voucher) => voucher.pk == serialNumber
    );
    if (!serialNumberExistsAtMock) {
      setErrorTitle("שובר לא נמצא")
      setErrorMsg(`מצטערים, שובר מספר: ${serialNumber} אינו קיים במערכת. אנא נסו מספר אחר`)
      setVoucherExist(true);
    }
    else if (serialNumberExistsAtSystem) {
      setErrorTitle("שובר כבר בשימוש")
      setErrorMsg(`מצטערים, שובר מספר: ${serialNumber} נמצא כבר בשימוש. לשאלות ניתן ליצור קשר עם תמיכת PayWise`)
      setVoucherExist(true);
    } else {
      const voucher = allVouchers.find((voucher) => voucher.pk == serialNumber);
      const currentDate = new Date();
      const expiryDate = new Date(voucher.fields.dateOfExpiry);
      expiryDate.setDate(expiryDate.getDate() + 1);
      if (currentDate > expiryDate) {
        setErrorTitle("שובר פג תוקף")
        setErrorMsg(`מצטערים, שובר מספר: ${serialNumber} פג תוקף. אנא נסו מספר אחר`)
        setVoucherExist(true);
      }
      else {
        event.preventDefault();
        await fetch("api/createVoucher/", {
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
            dateOfExpiry: voucher.fields.dateOfExpiry,
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
  }



    const handleChange = (e) => {
      setSerialNumber(e.target.value);
    };
    useEffect(() => {
      getAllVouchers();
      getSystemVouchers();
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
        {voucherExist ? (
          <AlertNotification
            voucherExist={voucherExist}
            setVoucherExist={setVoucherExist}
            title={errorTitle}
            mainText={errorMsg}
            setErrorMsg={setErrorMsg}
            setErrorTitle={setErrorTitle}
          ></AlertNotification>
        ) : (
          <></>
        )}
      </Box>
    );
  }
