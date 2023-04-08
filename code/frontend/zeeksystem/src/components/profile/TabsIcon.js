import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StarRateIcon from "@mui/icons-material/StarRate";
import PersonPinIcon from "@mui/icons-material/PersonPin";

export default function TabsIcon() {
  return (
    <div
      style={{
        display: "flex",
        marginLeft: "15px",
        marginTop: "15px",
      }}
    >
      <Tabs
        aria-label="Icon tabs"
        defaultValue={0}
        sx={{ borderRadius: "lg", width: "300px" }}
      >
        <TabList>
          <Tab>
            <AccountBalanceWalletIcon />
          </Tab>
          <Tab>
            <StarRateIcon />
          </Tab>
          <Tab>
            <PersonPinIcon />
          </Tab>
        </TabList>
      </Tabs>
    </div>
  );
}
