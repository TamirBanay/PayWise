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
import ChooseNotifications from "../notifications/ChooseNotifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import { _Vouchers, _badgeContent } from "../../services/atom";
import { useRecoilState } from "recoil";
import Badge from "@mui/material/Badge";
import ClearIcon from "@mui/icons-material/Clear";
import AlertDialogModal from "./AlertDialogModal";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Avatar from "@mui/joy/Avatar";
import Grid from "@mui/material/Grid";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
export default function BasicCard(props) {
  const location = useLocation();
  const { pathname } = location;
  const [openAlerts, setOpenNotifications] = useState(false);
  const [vouchers, setVouchers] = useRecoilState(_Vouchers);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  const [selectedValue, setSelectedValue] = useState("");
  const [badgeContent, setBadgeContent] = useState();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [moveToOtheApp, setMoveToOtheApp] = useState(false);
  const [googleMapsOrWaze, setGoogleMapsOrWaze] = useState(true);
  const [moveToWebPage, setMoveToWebPage] = useState(false);
  const amount = props.voucher.ammount.toString().split(".00");
  const handleNavigateGoogleMaps = () => {
    window.location.href = `https://www.google.com/maps/search/?api=1&query=${props.voucher.storeName}`;
  };
  const handleNavigateWaze = () => {
    window.location.href = `https://waze.com/ul?q=${props.voucher.storeName}`;
  };
  const handleMoveToStoreWeb = () => {
    if (props.voucher.storeName == "ZARA") {
      window.location.href = `https://www.zara.com/il/`;
    } else if (props.voucher.storeName == "ACE") {
      window.location.href = `https://www.ace.co.il/`;
    } else if (props.voucher.storeName == "א.ל.מ") {
      window.location.href = `https://www.alm.co.il/`;
    } else if (props.voucher.storeName == "American Eagle") {
      window.location.href = `https://aeo.co.il/il_he/`;
    } else if (props.voucher.storeName == "FOX") {
      window.location.href = `https://www.foxgroup.co.il/`;
    } else if (props.voucher.storeName == "BUG") {
      window.location.href = `https://www.bug.co.il/`;
    }
  };
  const handleOpenWebApp = () => {
    setMoveToWebPage(!moveToWebPage);
  };
  const handleOpenExternalApplication = () => {
    setMoveToOtheApp(!moveToOtheApp);
  };

  const handleChangeAletrBeforeDelete = () => {
    setOpenDeleteAlert(!openDeleteAlert);
  };
  useEffect(() => {
    if (props.voucher.daysBeforeAlert === 1) {
      setSelectedValue("יום לפני");
      setBadgeContent("D");
    } else if (props.voucher.daysBeforeAlert === 7) {
      setSelectedValue("שבוע לפני");
      setBadgeContent("W");
    } else if (props.voucher.daysBeforeAlert === 30) {
      setSelectedValue("חודש לפני");
      setBadgeContent("M");
    } else {
      setSelectedValue("ללא התראות");
    }
  }, [props.voucher.daysBeforeAlert]);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleChangeAlert = async (event) => {
    props.getWallet();
    let newAlertDay = 0;
    if (selectedValue === "יום לפני") {
      newAlertDay = 1;
      setBadgeContent("D");
    } else if (selectedValue === "שבוע לפני") {
      newAlertDay = 7;
      setBadgeContent("W");
    } else if (selectedValue === "חודש לפני") {
      newAlertDay = 30;
      setBadgeContent("M");
    } else {
      newAlertDay = 0;
      setBadgeContent();
    }

    setOpenNotifications(!openAlerts);
    fetch(`api/change_days_before_alert/${props.vID}`, {
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

    props.getWallet();
  };

  const handlleRedeemdVoucher = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`api/voucher_redeemed/${props.vID}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          redeemed: true,
        }),
      });

      if (response.ok) {
        // Redemption successful, update wallet
        props.getWallet();
        console.log(
          "Voucher redeemed successfully. Status: " + response.status
        );
      } else {
        // Redemption failed, log error
        console.error("Voucher redemption failed. Status: " + response.status);
      }
    } catch (error) {
      // Error occurred during the redemption process
      console.error("An error occurred during voucher redemption:", error);
    }
  };

  const handleOpenAlerts = () => {
    setOpenNotifications(!openAlerts);
  };
  return (
    <div>
      {/* if the alert page is open */}
      {openAlerts ? (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          // variant="outlined"
          sx={{ width: "90%", borderRadius: 20, direction: "rtl" }}
        >
          <Grid item sx={{ marginTop: "22px" }}>
            <Typography level="h2" fontSize="lg">
              {props.voucher.storeName}
            </Typography>{" "}
            <Typography level="body2">
              בתוקף עד: {props.voucher.dateOfExpiry.slice(0, 10)}
            </Typography>
          </Grid>
          <Grid item mt="22px">
            {" "}
            <IconButton
              aria-label="bookmark Bahamas Islands"
              variant="plain"
              color="neutral"
              size="sm"
            >
              <ArrowBackIosNewOutlinedIcon onClick={handleOpenAlerts} />
            </IconButton>
          </Grid>
          <ChooseNotifications
            handleChange={handleChange}
            setSelectedValue={setSelectedValue}
            selectedValue={selectedValue}
          />
          <Grid item width="90%">
            {location.pathname == "/wallet" &&
            props.voucher.redeemed == true ? (
              <Button
                variant="contained"
                disabled
                size="lg"
                color="#B3B3B3"
                aria-label="Explore Bahamas Islands"
                sx={{
                  height: "50px",
                  width: "93%",
                  fontSize: "16px",
                  bgcolor: "#E6E6E6",
                }}
              >
                הגדר
              </Button>
            ) : currentDate > new Date(props.voucher.dateOfExpiry) &&
              props.voucher.redeemed == false ? (
              <Button
                variant="contained"
                disabled
                size="lg"
                color="#B3B3B3"
                aria-label="Explore Bahamas Islands"
                sx={{
                  height: "50px",
                  width: "93%",
                  fontSize: "16px",
                  bgcolor: "#E6E6E6",
                }}
              >
                הגדר
              </Button>
            ) : (
              <Button
                variant="solid"
                size="lg"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{
                  height: "50px",
                  width: "93%",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
                onClick={handleChangeAlert}
              >
                הגדר
              </Button>
            )}
          </Grid>
        </Grid>
      ) : (
        /* /////////////////////////////////////////////////// */
        <Grid
          sx={{ marginTop: "8px" }}
          container
          direction="row-reverse"
          // justifyContent="space-between"
          alignItems="flex-end"
          spacing={2}
        >
          <Grid item alignSelf="start">
            <Avatar
              size="lg"
              sx={{
                // position: "absolute",
                boxShadow: "0.5px 0.5px 3px 0px  ",
              }}
              onClick={handleOpenWebApp}
              src={props.img}
            />
          </Grid>

          <Grid item alignSelf="start" sx={{ width: "50%" }}>
            <Typography level="h5" textAlign="end">
              {props.voucher.storeName}
            </Typography>
            <Typography
              fontSize="sm"
              fontWeight="sm"
              level="body2"
              sx={{
                textAlign: "right",
              }}
            >
              {" "}
              בתוקף עד: {props.voucher.dateOfExpiry.slice(0, 10)}
            </Typography>{" "}
            <Typography
              level="body2"
              fontSize="sm"
              fontWeight="sm"
              sx={{
                textAlign: "right",
              }}
            >
              מס' שובר: {props.vID}
            </Typography>
          </Grid>

          <Grid item alignSelf="start" sx={{ width: "30%" }} alignItems="start">
            <Typography
              level="body2"
              fontSize="sm"
              // fontWeight="sm"

              sx={{
                "&.MuiTypography-body2	": {
                  fontSize: "20px",
                  color: "#000",
                },
              }}
            >
              ₪{amount}
            </Typography>{" "}
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Divider
              sx={{
                border: "solid 0.1px",
              }}
              variant="fullWidth"
            />
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="flex-end"
            spacing={1}
            sx={{ marginTop: "8px" }}
          >
            <Grid item>
              <IconButton variant="plain" color="neutral" size="md">
                נווט&nbsp;
                <LocationOnIcon onClick={handleOpenExternalApplication} />
                {moveToOtheApp ? (
                  <AlertDialogModal
                    function={
                      googleMapsOrWaze
                        ? handleNavigateGoogleMaps
                        : handleNavigateWaze
                    }
                    mainText={
                      googleMapsOrWaze
                        ? "לחיצה על google Maps תנתק אותך מאפליקציית - PayWise"
                        : "לחיצה על Waze תנתק אותך מאפליקציית - PayWise"
                    }
                    title={"נווט ל - " + props.voucher.storeName}
                    variant="plain"
                    textButton={googleMapsOrWaze ? "google Maps" : "Waze"}
                    isOpen={true}
                    setOpenDeleteAlert={setMoveToOtheApp}
                    openDeleteAlert={moveToOtheApp}
                    titleIcon={"navigate"}
                    googleMapsOrWaze={googleMapsOrWaze}
                    setGoogleMapsOrWaze={setGoogleMapsOrWaze}
                  />
                ) : (
                  ""
                )}
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
              >
                הגדרת התראות &nbsp;
                {selectedValue == "ללא התראות" ? (
                  <NotificationsOffIcon onClick={handleOpenAlerts} />
                ) : (
                  <Badge badgeContent={badgeContent} color="primary">
                    <NotificationsIcon onClick={handleOpenAlerts} />
                  </Badge>
                )}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
              >
                מחיקת זיכוי&nbsp;&nbsp;
                <DeleteForeverIcon onClick={handleChangeAletrBeforeDelete} />
                {openDeleteAlert ? (
                  <AlertDialogModal
                    function={props.delete}
                    mainText={"האם למחוק את זיכוי?"}
                    title={"מחיקת זיכוי"}
                    variant="plain"
                    textButton={"מחק"}
                    isOpen={openDeleteAlert}
                    openDeleteAlert={openDeleteAlert}
                    setOpenDeleteAlert={setOpenDeleteAlert}
                  />
                ) : (
                  ""
                )}
              </IconButton>{" "}
            </Grid>
          </Grid>

          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            // alignItems="stretch"
            sx={{ width: "90%" }}
          >
            {/* if im in wallet page and the voucher is redeemed show v icon or if the voucher expiry show X*/}
            {location.pathname == "/wallet" &&
            props.voucher.redeemed == true ? (
              <Grid item sx={{ mt: "28px" }}>
                <Button
                  variant="contained"
                  disabled
                  size="lg"
                  color="#B3B3B3"
                  aria-label="Explore Bahamas Islands"
                  sx={{
                    height: "50px",
                    width: "93%",
                    fontSize: "16px",
                    bgcolor: "#E6E6E6",
                  }}
                  onClick={handlleRedeemdVoucher}
                >
                  מימוש
                </Button>
              </Grid>
            ) : currentDate > new Date(props.voucher.dateOfExpiry) &&
              props.voucher.redeemed == false ? (
              <Grid item sx={{ mt: "28px" }}>
                {" "}
                <Button
                  variant="contained"
                  disabled
                  size="sm"
                  color="#B3B3B3"
                  aria-label="Explore Bahamas Islands"
                  sx={{
                    height: "50px",
                    width: "93%",
                    fontWeight: 600,
                    fontSize: "16px",
                    bgcolor: "#E6E6E6",
                  }}
                  onClick={handlleRedeemdVoucher}
                >
                  מימוש
                </Button>
              </Grid>
            ) : (
              <Grid item sx={{ mt: "28px" }}>
                <Button
                  variant="solid"
                  size="sm"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{
                    height: "50px",
                    width: "93%",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                  onClick={handlleRedeemdVoucher}
                >
                  מימוש
                </Button>
              </Grid>
            )}
          </Grid>

          {moveToWebPage ? (
            <AlertDialogModal
              function={handleMoveToStoreWeb}
              mainText={"עבור לעמוד הבית של " + props.voucher.storeName}
              title={"התנתקות מ - payWise"}
              variant="plain"
              textButton={"עבור"}
              isOpen={moveToWebPage}
              openDeleteAlert={moveToWebPage}
              setOpenDeleteAlert={setMoveToWebPage}
              titleIcon={"web"}
            />
          ) : (
            ""
          )}
        </Grid>
      )}
    </div>
  );
}
