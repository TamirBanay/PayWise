import React from "react";
import Navbar from "../components/Navbar";
import SimplePaper from "../components/profile/SimplePaper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfilePic from "../images/ProfilePic.png";
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

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const content = await response.json();
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
      <SimplePaper />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          marginTop: "-115px",
          marginLeft: isMobile ? "110px" : "1100px",
        }}
      >
        <img
          src={ProfilePic}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "3px solid white",
            position: "absolute",
          }}
        />
      </div>

      <div
        style={{
          marginLeft: isMobile ? "-35px" : "1100px",
          marginTop: "-25px",
        }}
      >
        <Typography
          align="center"
          variant="h5"
          style={{ color: "#23476", marginLeft: 130 }}
        >
          {user.first_name} {user.last_name}
        </Typography>

        <Divider sx={{ borderBottom: "1.5px solid black", height: 20 }} />
      </div>
      <TabsProfile
        updateDetails={handlleChangeDetailsUser}
        handlleShowPersonalDetails={handlleShowPersonalDetails}
      />
      <Divider sx={{ borderBottom: "1.5px solid black", height: 20 }} />

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
    </div>
  );
}

export default Profile;
