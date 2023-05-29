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
import AlertNotificationScan from "../AlertNotificationScan";

const ScanPage = () => {
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const [serialNumber, setSerialNumber] = useState();
  const [user, setUser] = useRecoilState(_User);
  const [allVouchers, setAllVouchers] = useState();
  const [systemVouchers, setSystemVOuchers] = useState();
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [voucherExist, setVoucherExist] = useState(false);

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

  const handleSaveVoucher = async () => {
    const serialNumberExists = allVouchers.some(
      (voucher) => voucher.pk == serialNumber
    );
    const serialNumberExistsAtSystem = systemVouchers.some(
      (voucher) => voucher.pk == serialNumber
    );
    if (!serialNumberExists) {
      setErrorTitle("שובר לא נמצא");
      setErrorMsg(
        `מצטערים, שובר מספר: ${serialNumber} אינו קיים במערכת. אנא נסו מספר אחר`
      );
      setVoucherExist(true);
    } else if (serialNumberExistsAtSystem) {
      setErrorTitle("שובר כבר בשימוש");
      setErrorMsg(
        `מצטערים, שובר מספר: ${serialNumber} נמצא כבר בשימוש. לשאלות ניתן ליצור קשר עם תמיכת PayWise`
      );
      setVoucherExist(true);
    } else {
      const voucher = allVouchers.find((voucher) => voucher.pk == serialNumber);
      const currentDate = new Date();
      const expiryDate = new Date(voucher.fields.dateOfExpiry);
      expiryDate.setDate(expiryDate.getDate() + 1);
      if (currentDate > expiryDate) {
        setErrorTitle("שובר פג תוקף");
        setErrorMsg(
          `מצטערים, שובר מספר: ${serialNumber} פג תוקף. אנא נסו מספר אחר`
        );
        setVoucherExist(true);
      } else {
        const voucher = allVouchers.find(
          (voucher) => voucher.pk == serialNumber
        );
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
        setRedirect(true);
        getAllVouchers().catch((error) => {
          console.log("error", error);
        });
        console.log("the voucher add successfully");
      }
    }
  };
  useEffect(() => {
    getAllVouchers();
    getSystemVouchers();
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
      if (redirect) {
        setRedirect(true);
        Quagga.stop();
      }
    });

    return () => {
      if (redirect) Quagga.stop();
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
      {voucherExist ? (
        <AlertNotificationScan
          voucherExist={voucherExist}
          setVoucherExist={setVoucherExist}
          title={errorTitle}
          mainText={errorMsg}
          setErrorMsg={setErrorMsg}
          setErrorTitle={setErrorTitle}
          redirect = {redirect}
          setRedirect = {setRedirect}
        ></AlertNotificationScan>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ScanPage;
