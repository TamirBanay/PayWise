import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import Divider from "@mui/material/Divider";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ChooseNotifications from "../notifications/ChooseNotifications";
import AlertDialogModal from "./AlertDialogModal";
export default function BasicCard(props) {
  const location = useLocation();
  const { pathname } = location;
  const [openAlerts, setOpenNotifications] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState("שבוע לפני");
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const handleChangeAletrBeforeDelete = () => {
    setOpenDeleteAlert(!openDeleteAlert);
  };
  const handleChangeAlert = async (event) => {
    let newAlertDay = 0;
    if (selectedValue === "יום לפני") {
      newAlertDay = 1;
    } else if (selectedValue === "שבוע לפני") {
      newAlertDay = 7;
    } else if (selectedValue === "חודש לפני") {
      newAlertDay = 30;
    } else {
      newAlertDay = 0;
    }
    setOpenNotifications(!openAlerts);
    fetch(`http://localhost:8000/api/change_days_before_alert/${props.vID}`, {
      method: "POST",
      body: JSON.stringify({ daysBeforeAlert: newAlertDay }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response from the API
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlleRedeemdVoucher = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/voucher_redeemed/${props.vID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            redeemed: true,
          }),
        }
      );

      if (response.ok) {
        props.getWallet();
        console.log("redeemed: sucsee " + response.status);
      } else {
        console.error("redeemed failed:" + error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpenAlerts = () => {
    setOpenNotifications(!openAlerts);
  };
  return (
    <div>
      {/* if its the vocher page or the alert page*/}
      {openAlerts ? (
        <Card
          variant="outlined"
          sx={{ width: 320, borderRadius: 5, direction: "rtl" }}
        >
          <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
            {props.voucher.storeName}
          </Typography>
          <Typography level="body2">
            {" "}
            {props.voucher.dateOfExpiry.slice(0, 10)}
          </Typography>
          <IconButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{
              position: "absolute",
              top: "0.5rem",
              width: "10%",
              right: "88%",
            }}
          >
            <DeleteForeverIcon onClick={handleChangeAletrBeforeDelete} />
            {openDeleteAlert ? (
              <AlertDialogModal
                function={props.delete}
                mainText={"האם למחוק את זיכוי?"}
                title={"מחיקת זיכוי"}
                variant="plain"
                textButton={"מחק"}
                isOpen={openDeleteAlert}
              />
            ) : (
              ""
            )}
          </IconButton>

          <IconButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{
              position: "absolute",
              top: "0.5rem",
              width: "10%",
              right: "77%",
            }}
          >
            <NotificationsIcon onClick={handleOpenAlerts} />
          </IconButton>

          <ChooseNotifications
            handleChange={handleChange}
            setSelectedValue={setSelectedValue}
            selectedValue={selectedValue}
          />
          <Box sx={{ display: "flex" }}>
            <div>
              <Typography
                fontSize="md"
                fontWeight="lg"
                sx={{ direction: "rtl" }}
              >
                מחיר: {"  "}
                <Typography fontSize="md" fontWeight="lg">
                  {props.voucher.ammount} ₪
                </Typography>
              </Typography>

              <Typography fontSize="sm" fontWeight="sm">
                מס' שובר: {props.vID}
              </Typography>
            </div>
            {/* if im in wallet page and the voucher is redeemed show v icon */}
            {location.pathname == "/wallet" &&
            props.voucher.redeemed == true ? (
              <Typography sx={{ mr: "auto" }}>
                <DoneIcon color="success" fontSize="large" />
              </Typography>
            ) : (
              <Button
                variant="solid"
                size="sm"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ mr: "auto", fontWeight: 600 }}
                onClick={handleChangeAlert}
              >
                הגדר
              </Button>
            )}
          </Box>
        </Card>
      ) : (
        <Card
          variant="outlined"
          sx={{ width: 320, borderRadius: 5, direction: "rtl" }}
        >
          <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
            {props.voucher.storeName}
          </Typography>
          <Typography level="body2">
            {" "}
            {props.voucher.dateOfExpiry.slice(0, 10)}
          </Typography>
          <IconButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{
              position: "absolute",
              top: "0.5rem",
              width: "10%",
              right: "88%",
            }}
          >
            <DeleteForeverIcon onClick={handleChangeAletrBeforeDelete} />
            {openDeleteAlert ? (
              <AlertDialogModal
                function={props.delete}
                mainText={"האם למחוק את זיכוי?"}
                title={"מחיקת זיכוי"}
                variant="plain"
                textButton={"מחק"}
                isOpen={openDeleteAlert}
              />
            ) : (
              ""
            )}
          </IconButton>

          <IconButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{
              position: "absolute",
              top: "0.5rem",
              width: "10%",
              right: "77%",
            }}
          >
            <NotificationsIcon onClick={handleOpenAlerts} />
          </IconButton>

          <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
            <img src={props.img} srcSet={props.img} loading="lazy" alt="" />
          </AspectRatio>

          <Box sx={{ display: "flex" }}>
            <div>
              <Typography
                fontSize="md"
                fontWeight="lg"
                sx={{ direction: "rtl" }}
              >
                מחיר: {"  "}
                <Typography fontSize="md" fontWeight="lg">
                  {props.voucher.ammount} ₪
                </Typography>
              </Typography>

              <Typography fontSize="sm" fontWeight="sm">
                מס' שובר: {props.vID}
              </Typography>
            </div>
            {/* if im in wallet page and the voucher is redeemed show v icon */}
            {location.pathname == "/wallet" &&
            props.voucher.redeemed == true ? (
              <Typography sx={{ mr: "auto" }}>
                <DoneIcon color="success" fontSize="large" />
              </Typography>
            ) : (
              <Button
                variant="solid"
                size="sm"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ mr: "auto", fontWeight: 600 }}
                onClick={handlleRedeemdVoucher}
              >
                מימוש
              </Button>
            )}
          </Box>
        </Card>
      )}
    </div>
  );
}
