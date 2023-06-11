import React from "react";
import Navbar from "../components/Navbar";
import SimplePaper from "../components/profile/SimplePaper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import male from "../images/male.jpeg";
import other from "../images/other.jpeg";
import female from "../images/female.jpeg";
import TabsBottomNav from "../components/TabsBottomNav";
import Typography from "@mui/material/Typography";
import israel from "../images/israel.png";
import { useEffect, useState } from "react";
import UpdateUserDetails from "../components/profile/UpdateUserDetails";
import { useRecoilValue, useRecoilState } from "recoil";
import Popover from "@mui/material/Popover";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import InfoIcon from "@mui/icons-material/Info";
import TabsProfile from "../components/profile/TabsProfile";
import EditIcon from "@mui/icons-material/Edit";
import PersonalDetails from "../components/profile/PersonalDetails";
import BasicSpeedDial from "../components/dashboard/BasicSpeedDial";

import {
  _Vouchers,
  first_name,
  last_name,
  user_email,
  _User,
} from "../services/atom";
function Profile(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = useRecoilState(_User);
  const [editProfileDetails, setEditProfileDetails] = useState(false);
  const [messegeToSuccess, setMessegeToSuccess] = useState(false);
  const [user_id, setUserId] = useState();
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [vouchers, setVouchers] = useRecoilState(_Vouchers);
  const [walletID, setWalletID] = useState();

  const getWallet = async () => {
    try {
      const response = await fetch(`api/getVouchers/${walletID}`);
      const data = await response.json();

      const vouchersArray = JSON.parse(data.vouchers);
      const matchingVouchers = vouchersArray.filter(
        (voucher) => voucher.fields.walletID === walletID
      );

      setVouchers(matchingVouchers);
    } catch (error) {
      console.error("Error retrieving vouchers:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const content = await response.json();
        setWalletID(content.id + 1000); // Update walletID based on fetched user data

        setUserId(content.id);
        setUser(content);
      } else {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  const handlleShowPersonalDetails = () => {
    setShowPersonalDetails(!showPersonalDetails);
    setEditProfileDetails(false);
  };
  const handlleChangeDetailsUser = () => {
    setEditProfileDetails(!editProfileDetails);
    setShowPersonalDetails(false);
  };
  useEffect(() => {
    let timeoutId;

    if (messegeToSuccess) {
      timeoutId = setTimeout(() => {
        setMessegeToSuccess(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [messegeToSuccess]);

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "150px",
          marginTop: "10%",
          marginLeft: "5%",
        }}
      >
        <img
          src={
            user.gender == "זכר" ? male : user.gender == "נקבה" ? female : other
          }
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "5px solid white",
            position: "absolute",
          }}
        />
      </div>

      <div
        style={{
          marginLeft: "10%",
          marginTop: "-20px",
        }}
      >
        <Typography
          align="center"
          variant="h5"
          style={{ color: "#23476", marginLeft: "-7%" }}
        >
          {user.first_name} {user.last_name}
        </Typography>
      </div>
      <div style={{ paddingTop: "8%" }}></div>
      <TabsProfile
        updateDetails={handlleChangeDetailsUser}
        handlleShowPersonalDetails={handlleShowPersonalDetails}
      />
      {/* <Divider sx={{ borderBottom: "1.5px solid black", height: 20 }} /> */}

      {editProfileDetails ? (
        <UpdateUserDetails
          setEditProfileDetails={setEditProfileDetails}
          editProfileDetails={editProfileDetails}
          handlleChangeDetailsUser={handlleChangeDetailsUser}
          messegeToSuccess={messegeToSuccess}
          setMessegeToSuccess={setMessegeToSuccess}
          fetchUser={fetchUserData}
        />
      ) : (
        ""
      )}
      {showPersonalDetails ? <PersonalDetails /> : ""}
      <div style={{ textAlign: "center", marginTop: 20, fontSize: 20 }}>
        {" "}
        {messegeToSuccess ? "הפרטים עודכנו בהצלחה " : ""}
      </div>

      <TabsBottomNav />
    </div>
  );
}

export default Profile;
