import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

import PersonPinIcon from "@mui/icons-material/PersonPin";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StarRateIcon from "@mui/icons-material/StarRate";
export default function TabsIconWithText() {
    
  return (
    <div>
      <Tabs
        aria-label="Icon tabs"
        defaultValue={0}
        sx={{
          mb: 2,
          borderRadius: "lg",
          width: "50%",
          marginLeft: "350px",
          marginTop: "15px",
        }}
      >
        <TabList>
          <Tab>
            <ListItemDecorator>
              <AccountBalanceWalletIcon color="warning" />
            </ListItemDecorator>
            My refunds
          </Tab>
          <Tab>
            <ListItemDecorator>
              <StarRateIcon color="warning" />
            </ListItemDecorator>
            Favorite
          </Tab>
          <Tab>
            <ListItemDecorator>
              <PersonPinIcon color="warning" />
            </ListItemDecorator>
            Personal details
          </Tab>
        </TabList>
      </Tabs>
    </div>
  );
}
