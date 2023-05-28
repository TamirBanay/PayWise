import React, { useEffect, useState } from "react";
import Quagga from "quagga";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { _User } from "../../services/atom";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import AlertDialogModal from "../dashboard/AlertDialogModal";
import { FitScreen } from "@mui/icons-material";
import "./ScanComponent.css";
const ScanPage = () => {
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const [serialNumber, setSerialNumber] = useState();
  const [user, setUser] = useRecoilState(_User);
  const [allVouchers, setAllVouchers] = useState();

  const handleBackHome = () => {
    history.push("/");
  };
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

  const handleSaveVoucher = async () => {
    const serialNumberExists = allVouchers.some(
      (voucher) => voucher.pk == serialNumber
    );
    if (!serialNumberExists) {
      console.log("the voucher is not exist in the system");
      alert("וואוצר מס' " + serialNumber + " לא קיים במערכת");
    } else {
      const voucher = allVouchers.find((voucher) => voucher.pk == serialNumber);
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
        });
      getAllVouchers().catch((error) => {
        console.log("error", error);
      });
      console.log("the voucher add successfully");
    }
  };
  useEffect(() => {
    getAllVouchers();
  }, []);

  useEffect(() => {
    if (serialNumber) {
      handleSaveVoucher();
    }
  }, [serialNumber]);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",

          target: document.querySelector("#camera"),
          constraints: {
            width: "385",
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader",
            "2of5_reader",
            "code_93_reader",
          ],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.log(err);
          setRedirect(true);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      setSerialNumber(parseInt(result.codeResult.code));
      setRedirect(true);
      Quagga.stop();
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="mainContainer">
      <div id="interactive" className="viewport">
        <video
          className="videoCamera"
          autoPlay={true}
          preload="auto"
          src=""
          muted={true}
          playsInline={true}
        ></video>
        <canvas className="drawingBuffer"></canvas>
      </div>

      <Button variant="contained" onClick={handleBackHome} sx={{ ml: 20 }}>
        ביטול{" "}
      </Button>
    </div>
  );
};

export default ScanPage;
