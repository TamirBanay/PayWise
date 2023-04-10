import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import FlexRowRatio from "../dashboard/FlexRowRatio";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StarRateIcon from "@mui/icons-material/StarRate";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import ChartPie from "../dashboard/ChartPie";
export default function TabsIconWithText() {
  const [openPersonalDetails, setOpenPersonalDetails] = React.useState(false);
  const [openfavorite, setOpenfavorite] = React.useState(false);
  const [openWallet, setOpenWallet] = React.useState(true);
  const [openChart, setOpenChart] = React.useState(false);

  const handleOpenChart = () => {
    setOpenWallet(false);
    setOpenfavorite(false);
    setOpenPersonalDetails(false);
    setOpenChart(!openChart);
  };

  const handleOpenWallet = () => {
    setOpenWallet(!openWallet);
    setOpenfavorite(false);
    setOpenPersonalDetails(false);
    setOpenChart(false);
  };

  const handleOpenfavorite = () => {
    setOpenfavorite(!openfavorite);
    setOpenWallet(false);
    setOpenPersonalDetails(false);
    setOpenChart(false);
  };

  const handleOpenPersonalDetails = () => {
    setOpenPersonalDetails(!openPersonalDetails);
    setOpenWallet(false);
    setOpenfavorite(false);
    setOpenChart(false);
  };
  return (
    <div>
      <Tabs
        aria-label="Icon tabs"
        defaultValue={0}
        sx={{
          mb: 2,
          borderRadius: "lg",
          width: "70%",
          marginLeft: "380px",
          marginTop: "15px",
          direction: "rtl",
        }}
      >
        <TabList>
          <Tab onClick={handleOpenWallet}>
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
          <Tab onClick={handleOpenChart}>
            <ListItemDecorator>
              <DataSaverOffIcon color="warning" />
            </ListItemDecorator>
            דיאגרמה{" "}
          </Tab>
        </TabList>
        {openChart ? <ChartPie /> : ""}
        {openPersonalDetails ? "שמי תמיר בנאי  " : ""}
        {openfavorite ? "המועדפים שלי" : ""}
        {openWallet ? (
          <div style={{ marginTop: "10px" }}>
            <FlexRowRatio width="300px" />
          </div>
        ) : (
          ""
        )}
      </Tabs>
    </div>
  );
}
