import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StarRateIcon from "@mui/icons-material/StarRate";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import FlexRowRatio from "../dashboard/FlexRowRatio";

export default function TabsIcon() {
  const [openPersonalDetails, setOpenPersonalDetails] = React.useState(false);
  const [openfavorite, setOpenfavorite] = React.useState(false);
  const [openWallet, setOpenWallet] = React.useState(true);

  const handleopenWallet = () => {
    setOpenWallet(!openWallet);
    setOpenfavorite(false);
    setOpenPersonalDetails(false);
  };

  const handleOpenfavorite = () => {
    setOpenfavorite(!openfavorite);
    setOpenWallet(false);
    setOpenPersonalDetails(false);
  };

  const handleOpenPersonalDetails = () => {
    setOpenPersonalDetails(!openPersonalDetails);
    setOpenWallet(false);
    setOpenfavorite(false);
  };

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
        sx={{ borderRadius: "lg", width: "300px", direction: "rtl" }}
      >
        <TabList>
          <Tab>
            <AccountBalanceWalletIcon onClick={handleopenWallet} />
          </Tab>
          <Tab>
            <StarRateIcon onClick={handleOpenfavorite} />
          </Tab>

          <Tab onClick={handleOpenPersonalDetails}>
            <PersonPinIcon />
          </Tab>
        </TabList>
        {openPersonalDetails ? "הפרטים שלי" : ""}
        {openfavorite ? "המועדפים שלי" : ""}
        {openWallet ? (
          <div style={{ marginTop: "10px" }}>
            <FlexRowRatio />
          </div>
        ) : (
          ""
        )}
      </Tabs>
    </div>
  );
}
