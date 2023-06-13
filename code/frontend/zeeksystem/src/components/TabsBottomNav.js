import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Link from "@mui/material/Link";
import { useRecoilState } from "recoil";
import { _tabsValue, _Vouchers } from "../services/atom";
import { useLocation } from "react-router-dom";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Badge from "@mui/material/Badge";

export default function TabsBottomNav() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);

  const [vouchers, setVouchers] = useRecoilState(_Vouchers);
  const [value, setValue] = useRecoilState(_tabsValue);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ paddingBottom: "104px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        sx={{
          pb: "2%",
          direction: "rtl",
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 999,
          bgcolor: "#F8F8F8	",

          "& .MuiTabs-indicator": {
            top: 0,
          },
        }}
      >
        <Tab
          value={"home"}
          icon={<HomeOutlinedIcon sx={{ mt: "5%" }} />}
          label="בית"
          href="/#/"
        />
        <Tab
          value={"profile"}
          icon={<Person2OutlinedIcon sx={{ mt: "5%" }} />}
          label="פרופיל"
          href="/#/profile"
        />
        <Tab
          value={"wallet"}
          icon={
            <Badge
              sx={{ mt: "5%" }}
              badgeContent={
                vouchers.filter(
                  (voucher) =>
                    voucher.fields.redeemed === false &&
                    currentDate < new Date(voucher.fields.dateOfExpiry)
                ).length
              }
              color="error"
            >
              <WalletOutlinedIcon />
            </Badge>
          }
          label="ארנק"
          href="/#/wallet"
        />
      </Tabs>
    </div>
  );
}
