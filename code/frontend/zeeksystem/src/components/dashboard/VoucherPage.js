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
        <div
        // variant="outlined"
        // sx={{ width: 320, borderRadius: 20, direction: "rtl" }}
        >
          <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
            {props.voucher.storeName}
          </Typography>
          <Typography level="body2" sx={{ pb: "2%" }}>
            בתוקף עד: {props.voucher.dateOfExpiry.slice(0, 10)}
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
                openDeleteAlert={openDeleteAlert}
                setOpenDeleteAlert={setOpenDeleteAlert}
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
              right: "65%",
            }}
          >
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
                textButton={googleMapsOrWaze ? "google Maps" : "Wase"}
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
            {/* if the daysBeforeAlert == 0 show not notifications icon, else show notification icon whit badge*/}
            {selectedValue == "ללא התראות" ? (
              <NotificationsOffIcon onClick={handleOpenAlerts} />
            ) : (
              <Badge badgeContent={badgeContent} color="primary">
                <NotificationsIcon onClick={handleOpenAlerts} />
              </Badge>
            )}
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
                  {amount} ₪
                </Typography>
              </Typography>

              <Typography fontSize="sm" fontWeight="sm">
                מס' שובר: {props.vID}
              </Typography>
            </div>
            {/* if im in wallet page and the voucher is redeemed show v icon  or if the voucher expiry show X icon*/}
            {location.pathname == "/wallet" &&
            props.voucher.redeemed == true ? (
              <Typography sx={{ mr: "auto" }}>
                <DoneIcon color="success" fontSize="large" />
              </Typography>
            ) : currentDate > new Date(props.voucher.dateOfExpiry) &&
              props.voucher.redeemed == false ? (
              <Typography sx={{ mr: "auto", mt: "auto" }}>
                <ClearIcon color="error" fontSize="large" />
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
        </div>
      ) : (
        /* /////////////////////////////////////////////////// */
        <div
        // variant="outlined"
        // sx={{ width: 320, borderRadius: 20, direction: "rtl" }}
        >
          <Avatar
            // variant="square"
            size="lg"
            sx={{
              left: "80%",
              top: "9%",
              position: "absolute",
              boxShadow: "0.5px 0.5px 3px 0px  ",
              "& .MuiAvatar-img	": {
                // height: "90%",
              },
            }}
            onClick={handleOpenWebApp}
            src={props.img}
          />
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

          <Typography
            level="h3"
            sx={{ mt: "8%", ml: "7%", textAlign: "right", width: "70%" }}
            fontWeight="sm"
          >
            {props.voucher.storeName}
          </Typography>
          {/* <Typography
            fontSize="md"
            fontWeight="lg"
            sx={{ direction: "rtl", mr: "25%", textAlign: "right" }}
          > */}
          <Typography
            level="body2"
            fontSize="lg"
            fontWeight="sm"
            sx={{
              width: "20%",
              position: "fixed",
              mt: "-10%",
              "&.MuiTypography-body2	": {
                fontSize: "30px",
              },
            }}
          >
            ₪{amount}
          </Typography>


          <Typography
            fontSize="md"
            fontWeight="sm"
            level="body2"
            sx={{
              width: "50%",
              position: "fixed",
              mt: "2%",
              ml: "21%",
              textAlign: "right",
            }}
          >
            {" "}
            בתוקף עד: {props.voucher.dateOfExpiry.slice(0, 10)}
          </Typography>
          <Typography
            level="body2"
            fontSize="md"
            fontWeight="sm"
            sx={{
              mt: "9%",
              ml: "21%",
              textAlign: "right",
              width: "50%",
              position: "absolute",
            }}
          >
            מס' שובר: {props.vID}
          </Typography>
          <IconButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{
              position: "absolute",
              top: "64%",
              // width: "10%",
              right: "22%",
            }}
          >
            מחיקת זיכוי
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
          </IconButton>
          <IconButton
            // aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="md"
            sx={{
              position: "absolute",
              top: "40%",
              // width: "10%",
              right: "22%",
            }}
          >
            נווט
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

          <IconButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{
              position: "absolute",
              top: "52%",
              // width: "10%",
              right: "22%",
            }}
          >
            הגדרת התראות
            {selectedValue == "ללא התראות" ? (
              <NotificationsOffIcon onClick={handleOpenAlerts} />
            ) : (
              <Badge badgeContent={badgeContent} color="primary">
                <NotificationsIcon onClick={handleOpenAlerts} />
              </Badge>
            )}
          </IconButton>

          <Box sx={{ display: "flex", borderRadius: 10 }}>
            <div></div>
            {/* if im in wallet page and the voucher is redeemed show v icon or if the voucher expiry show X*/}
            {location.pathname == "/wallet" &&
            props.voucher.redeemed == true ? (
              <Typography sx={{ mr: "auto", mt: "auto" }}>
                <DoneIcon color="success" fontSize="large" />
              </Typography>
            ) : currentDate > new Date(props.voucher.dateOfExpiry) &&
              props.voucher.redeemed == false ? (
              <Typography sx={{ mr: "auto", mt: "auto" }}>
                <ClearIcon color="error" fontSize="large" />
              </Typography>
            ) : (
              <Button
                variant="solid"
                size="sm"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{
                  borderRadius: 25,
                  height: "50px",
                  mt: "62%",
                  width: "90%",
                  fontWeight: 600,
                  ml: "5%",
                }}
                onClick={handlleRedeemdVoucher}
              >
                מימוש
              </Button>
            )}
          </Box>
        </div>
      )}
    </div>
  );
}
