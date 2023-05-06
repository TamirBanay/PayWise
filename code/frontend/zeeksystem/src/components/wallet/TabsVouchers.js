import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Popover from "../dashboard/Popover";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Vouchers, first_name, last_name } from "../../services/atom";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import Voucher from "../dashboard/Voucher";
import Typography from "@mui/joy/Typography";

export default function TabsUnderlineExample(props) {
  const [openUsedVouchers, setOpenUsedVouchers] = React.useState(false);
  const [openNotUsedVouchers, setOpenNotUsedVouchers] = React.useState(true);
  const [onClickVoucher, setOnClickVoucher] = useState(true);
  const [vouchers, setVouchers] = useRecoilState(Vouchers);
  const [walletID, setWalletID] = useState();

  const handlleOpenUsedVouchers = () => {
    setOpenUsedVouchers(!openUsedVouchers);
    setOpenNotUsedVouchers(false);
  };

  const handleOpenNotUsed = () => {
    setOpenNotUsedVouchers(!openNotUsedVouchers);
    setOpenUsedVouchers(false);
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
              right: 35, // change to `0` to stretch to the edge.
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
      <p></p>
      <p></p>

      {openNotUsedVouchers ? (
        vouchers.filter((voucher) => voucher.fields.redeemed === false).length >
        0 ? (
          vouchers
            .filter((voucher) => voucher.fields.redeemed === false)
            .map((voucher) => (
              <Voucher
                voucher={voucher.fields}
                key={voucher.pk}
                vID={voucher.pk}
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
            .map((voucher) => (
              <Voucher
                voucher={voucher.fields}
                key={voucher.pk}
                vID={voucher.pk}
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
    </Tabs>
  );
}
