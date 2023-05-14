import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Popover from "../dashboard/Popover";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { _Vouchers, _User, first_name, last_name } from "../../services/atom";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import Voucher from "../dashboard/Voucher";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material";

export default function TabsUnderlineExample(props) {
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
      const response = await fetch(
        `http://localhost:8000/api/getVouchers/${walletID}`
      );
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
      const response = await fetch("http://localhost:8000/api/user", {
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

  return (
    <Tabs aria-label="tabs" defaultValue={0} direction="rtl">
      <TabList
        variant="plain"
        sx={{
          "--List-padding": "0px",
          "--List-radius": "0px",
          "--ListItem-minHeight": "48px",
          [`& .${tabClasses.root}`]: {
            boxShadow: "none",
            fontWeight: "md",
            [`&.${tabClasses.selected}::before`]: {
              content: '""',
              display: "block",
              position: "absolute",
              left: 30, // change to `0` to stretch to the edge.
              right: 30, // change to `0` to stretch to the edge.
              bottom: 0,
              height: 3,
              bgcolor: "primary.400",
            },
          },
        }}
      >
        <Tab sx={{ right: 10 }} onChange={handleOpenNotUsed}>
          זיכויים שלא מומשו{" - "}
          {
            vouchers.filter((voucher) => voucher.fields.redeemed === false)
              .length
          }
        </Tab>
        <Tab sx={{ right: 40 }} onChange={handlleOpenUsedVouchers}>
          זכויים שמומשו{" - "}
          {
            vouchers.filter((voucher) => voucher.fields.redeemed === true)
              .length
          }
        </Tab>
      </TabList>
      <p></p>
      {openAllUsedVouchers ? (
        <Button sx={{ marginLeft: 25 }} onClick={handlleOpenAllUsedVouchers}>
          הצג הכל
        </Button>
      ) : (
        <Button sx={{ marginLeft: 25 }} onClick={handlleOpenAllUsedVouchers}>
          הצג פחות
        </Button>
      )}

      <p></p>

      {openNotUsedVouchers ? (
        vouchers.filter((voucher) => voucher.fields.redeemed === false).length >
        0 ? (
          vouchers
            .filter((voucher) => voucher.fields.redeemed === false)
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
            <Typography>כל הזיכויים מומשו</Typography>
            <BrowserNotSupportedIcon fontSize="large" sx={{ mt: 1 }} />
          </Typography>
        )
      ) : (
        ""
      )}

      {openUsedVouchers ? (
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
            <Typography>אין זיכויים </Typography>
            <BrowserNotSupportedIcon fontSize="large" sx={{ mt: 1 }} />
          </Typography>
        )
      ) : (
        ""
      )}
    </Tabs>
  );
}
