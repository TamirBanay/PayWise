import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import DoneIcon from "@mui/icons-material/Done";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SellIcon from "@mui/icons-material/Sell";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { _Vouchers, _User, first_name, last_name } from "../../services/atom";
import Typography from "@mui/joy/Typography";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import Popover from "../dashboard/Popover";
import { Button } from "@mui/material";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
export default function IconTabs() {
  const [value, setValue] = React.useState("notUsedVouchers");
  const [openUsedVouchers, setOpenUsedVouchers] = React.useState(false);
  const [openNotUsedVouchers, setOpenNotUsedVouchers] = React.useState(true);
  const [onClickVoucher, setOnClickVoucher] = useState(true);
  const [vouchers, setVouchers] = useRecoilState(_Vouchers);
  const [walletID, setWalletID] = useState();
  const [openAllUsedVouchers, setOpenAllUsedVouchers] = useState(true);
  const [openAllNotUsedVouchers, setOpenAllNotUsedVouchers] = useState(false);
  const [user, setUser] = useRecoilState(_User);

  const getWallet = async () => {
    try {
      const response = await fetch(`api/getVouchers/${walletID}`);
      const data = await response.json();

      const vouchersArray = JSON.parse(data.vouchers);
      const matchingVouchers = vouchersArray.filter(
        (voucher) => voucher.fields.walletID === walletID
      );

      setVouchers(matchingVouchers);
    } catch (error) {
      console.error("Error retrieving vouchers:", error);
    }
  };
  const fetchUserData = async () => {
    try {
      const response = await fetch("api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const content = await response.json();

        setWalletID(content.id + 1000); // Update walletID based on fetched user data
        setUser(content);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (walletID) {
      // Only call getVoucher if walletID is truthy
      getWallet();
    }
  }, [walletID]);
  const handleOpenVoucher = () => {
    setOnClickVoucher(!onClickVoucher);
  };
  const handlleOpenUsedVouchers = () => {
    setOpenUsedVouchers(!openUsedVouchers);
    setOpenNotUsedVouchers(false);
  };

  const handleOpenNotUsed = () => {
    setOpenNotUsedVouchers(!openNotUsedVouchers);
    setOpenUsedVouchers(false);
  };
  const handlleOpenAllUsedVouchers = () => {
    // setOpenAllNotUsedVouchers(!openAllUsedVouchers);
    setOpenAllUsedVouchers(!openAllUsedVouchers);
  };
  const handleOpenAllNotUsedVouchers = () => {
    setOpenAllUsedVouchers(!openAllUsedVouchers);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  // const expiryDate = new Date(voucher.fields.dateOfExpiry);

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon tabs example"
        sx={{ direction: "rtl", width: "85%" }}
        variant="fullWidth"
      >
        <Tab
          icon={<SellIcon color="primary" />}
          aria-label="notUsedVouchers"
          value={"notUsedVouchers"}
        />
        <Tab
          icon={<AccessTimeIcon color="error" />}
          aria-label="expiredVouchers"
          value={"expiredVouchers"}
        />
        <Tab
          icon={<CreditScoreIcon color="success" />}
          aria-label="redeemedVouchers"
          value={"redeemedVouchers"}
        />
      </Tabs>
      <p></p>
      <p></p>

      {openAllUsedVouchers ? (
        <Button sx={{ ml: "68%" }} onClick={handlleOpenAllUsedVouchers}>
          הצג הכל
        </Button>
      ) : (
        <Button sx={{ ml: "66%" }} onClick={handlleOpenAllUsedVouchers}>
          הצג פחות
        </Button>
      )}
      {value == "notUsedVouchers" ? (
        vouchers.filter(
          (voucher) =>
            voucher.fields.redeemed === false &&
            currentDate < new Date(voucher.fields.dateOfExpiry)
        ).length > 0 ? (
          vouchers
            .filter(
              (voucher) =>
                voucher.fields.redeemed === false &&
                currentDate < new Date(voucher.fields.dateOfExpiry)
            )
            .slice(0, !openAllUsedVouchers ? vouchers.length : 3) // limit to 3 vouchers if openAllUsedVouchers is not true
            .map((voucher) => (
              <Popover
                voucher={voucher.fields}
                key={voucher.pk}
                vID={voucher.pk}
                openVoucher={handleOpenVoucher}
                getWallet={getWallet}
              />
            ))
        ) : (
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography>אין זיכויים פעילים</Typography>
            <BrowserNotSupportedIcon fontSize="large" sx={{ mt: 1 }} />
          </Typography>
        )
      ) : (
        ""
      )}
      {value == "redeemedVouchers" ? (
        vouchers.filter((voucher) => voucher.fields.redeemed === true).length >
        0 ? (
          vouchers
            .filter((voucher) => voucher.fields.redeemed === true)
            .slice(0, openAllUsedVouchers ? 3 : vouchers.length)
            .map((voucher) => (
              <Popover
                voucher={voucher.fields}
                key={voucher.pk}
                vID={voucher.pk}
                openVoucher={handleOpenVoucher}
                getWallet={getWallet}
              />
            ))
        ) : (
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography>אין זיכויים שמומשו</Typography>
            <BrowserNotSupportedIcon fontSize="large" sx={{ mt: 1 }} />
          </Typography>
        )
      ) : (
        ""
      )}
      {value == "expiredVouchers" ? (
        vouchers.filter(
          (voucher) =>
            currentDate > new Date(voucher.fields.dateOfExpiry) &&
            voucher.fields.redeemed == false
        ).length > 0 ? (
          vouchers
            .filter(
              (voucher) =>
                currentDate > new Date(voucher.fields.dateOfExpiry) &&
                voucher.fields.redeemed == false
            )
            .slice(0, !openAllUsedVouchers ? vouchers.length : 3) // limit to 3 vouchers if openAllUsedVouchers is not true
            .map((voucher) => (
              <Popover
                voucher={voucher.fields}
                key={voucher.pk}
                vID={voucher.pk}
                openVoucher={handleOpenVoucher}
                getWallet={getWallet}
              />
            ))
        ) : (
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography> אין זיכויים פגי תוקף</Typography>
            <BrowserNotSupportedIcon fontSize="large" sx={{ mt: 1 }} />
          </Typography>
        )
      ) : (
        ""
      )}
    </div>
  );
}
