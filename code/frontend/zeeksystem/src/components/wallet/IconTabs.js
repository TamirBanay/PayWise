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
import {
  _Vouchers,
  _User,
  first_name,
  last_name,
  _voucherIsOpen,
} from "../../services/atom";
import Typography from "@mui/joy/Typography";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import Popover from "../dashboard/Popover";
import { Button } from "@mui/material";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import BottomSheetVoucher from "../dashboard/BottomSheetVoucher";
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
  const [voucherIsOpen, setVoucherIsOpen] = useRecoilState(_voucherIsOpen);
  const color = "red";
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
  const walletLength = vouchers.filter(
    (voucher) =>
      currentDate < new Date(voucher.fields.dateOfExpiry) &&
      voucher.fields.redeemed == false
  ).length;
  return (
    <div
    //  style={{ filter: voucherIsOpen ? "blur(4px)" : "" }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        // aria-label="icon tabs example"
        variant="fullWidth"
        TabIndicatorProps={{
          title: "indicator",
          sx: { backgroundColor: "white" },
        }}
        sx={{
          // position: "fixed",
          mt: "1%",
          direction: "rtl",
        }}
      >
        <Tab
          icon={<SellIcon sx={{ color: "#fff" }} />}
          aria-label="notUsedVouchers"
          value={"notUsedVouchers"}
        />
        <Tab
          icon={<AccessTimeIcon sx={{ color: "#fff" }} />}
          aria-label="expiredVouchers"
          value={"expiredVouchers"}
        />

        <Tab
          icon={
            <CreditScoreIcon
              sx={{
                // mt: "20%",
                color: "#fff",
                // "&.MuiIcon-colorAction	": {},
              }}
            />
          }
          aria-label="redeemedVouchers"
          value={"redeemedVouchers"}
        />
      </Tabs>
      <p></p>
      <p></p>

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
            .map((voucher) => (
              <BottomSheetVoucher
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
              <BottomSheetVoucher
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
              <BottomSheetVoucher
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
