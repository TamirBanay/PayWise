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
export default function BasicCard(props) {
  const location = useLocation();
  const { pathname } = location;
  const [openAlerts, setOpenNotifications] = useState(false);
  const [vouchers, setVouchers] = useRecoilState(_Vouchers);
  const currentDate = new Date();
  const [selectedValue, setSelectedValue] = useState("");
  const [badgeContent, setBadgeContent] = useState();

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

    props.getWallet();
  };

  const handlleRedeemdVoucher = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/voucher_redeemed/${props.vID}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            redeemed: true,
          }),
        }
      );

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
                  {props.voucher.ammount} ₪
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
              <Typography sx={{ mr: "auto" }}>
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
                openDeleteAlert={openDeleteAlert}
                setOpenDeleteAlert={setOpenDeleteAlert}
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
            {selectedValue == "ללא התראות" ? (
              <NotificationsOffIcon onClick={handleOpenAlerts} />
            ) : (
              <Badge badgeContent={badgeContent} color="primary">
                <NotificationsIcon onClick={handleOpenAlerts} />
              </Badge>
            )}
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
            {/* if im in wallet page and the voucher is redeemed show v icon or if the voucher expiry show X*/}
            {location.pathname == "/wallet" &&
            props.voucher.redeemed == true ? (
              <Typography sx={{ mr: "auto" }}>
                <DoneIcon color="success" fontSize="large" />
              </Typography>
            ) : currentDate > new Date(props.voucher.dateOfExpiry) &&
              props.voucher.redeemed == false ? (
              <Typography sx={{ mr: "auto" }}>
                <ClearIcon color="error" fontSize="large" />
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
