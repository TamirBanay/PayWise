import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import FlexRowRatio from "../dashboard/FlexRowRatio";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StarRateIcon from "@mui/icons-material/StarRate";
export default function TabsIconWithText() {
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
    <div>
      <Tabs
        aria-label="Icon tabs"
        defaultValue={0}
        sx={{
          mb: 2,
          borderRadius: "lg",
          width: "50%",
          marginLeft: "600px",
          marginTop: "15px",
          direction: "rtl",
        }}
      >
        <TabList>
          <Tab onClick={handleopenWallet}>
            <ListItemDecorator>
              <AccountBalanceWalletIcon color="warning" />
            </ListItemDecorator>
            הזיכויים שלי
          </Tab>
          <Tab onClick={handleOpenfavorite}>
            <ListItemDecorator>
              <StarRateIcon color="warning" />
            </ListItemDecorator>
            מועדפים
          </Tab>
          <Tab onClick={handleOpenPersonalDetails}>
            <ListItemDecorator>
              <PersonPinIcon color="warning" />
            </ListItemDecorator>
            פרטים אישיים
          </Tab>
        </TabList>
        {openPersonalDetails ? "שמי תמיר בנאי  " : ""}
        {openfavorite ? "המועדפים שלי" : ""}
        {openWallet ? (
          <div style={{ marginTop: "10px" }}>
            <FlexRowRatio width="283px" />
          </div>
        ) : (
          ""
        )}
      </Tabs>
    </div>
  );
}
