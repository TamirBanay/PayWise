import React from "react";
import Navbar from "../components/Navbar";
import SimplePaper from "../components/profile/SimplePaper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfilePic from "../images/profile.jpg";
import Typography from "@mui/material/Typography";
import israel from "../images/israel.png";
import { useEffect, useState } from "react";
import UpdateUserDetails from "../components/profile/UpdateUserDetails";
import { useRecoilValue, useRecoilState } from "recoil";
import Popover from "@mui/material/Popover";
import Select from "@mui/material/Select";

import {
  _Vouchers,
  first_name,
  last_name,
  user_email,
  _User,
} from "../services/atom";
import EditIcon from "@mui/icons-material/Edit";
function Profile(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = useRecoilState(_User);
  const [editProfileDetails, setEditProfileDetails] = useState(false);
  const [messegeToSuccess, setMessegeToSuccess] = useState(false);
  const [user_id, setUserId] = useState();

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

  const handlleChangeDetailsUser = () => {
    setEditProfileDetails(!editProfileDetails);
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
          marginLeft: isMobile ? "-30px" : "1100px",
        }}
      >
        <img
          src={ProfilePic}
          style={{
            width: isMobile ? "120px" : "150px",
            height: isMobile ? "120px" : "150px",
            borderRadius: "50%",
            border: "3px solid white",
            position: "absolute",
          }}
        />
      </div>
      <EditIcon sx={{ marginLeft: 37 }} onClick={handlleChangeDetailsUser} />

      <div
        style={{
          marginLeft: isMobile ? "-35px" : "1100px",
          marginTop: "-20px",
        }}
      >
        <Typography
          align="center"
          variant="inherit"
          style={{ color: "#C4C4C4" }}
        >
          {user.email}
        </Typography>

        <Typography align="center" variant="h5" style={{ color: "#23476" }}>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography
          align="center"
          variant="inherit"
          style={{ color: "#23476" }}
        >
          {" "}
          <img src={israel} style={{ width: "20px" }} /> {user.street},{" "}
          {user.city}
        </Typography>
      </div>
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
      <div style={{ textAlign: "center", marginTop: 20, fontSize: 20 }}>
        {" "}
        {messegeToSuccess ? "הפרטים עודכנו בהצלחה " : ""}
      </div>
    </div>
  );
}

export default Profile;
