import React from "react";
import Navbar from "../components/Navbar";
import SimplePaper from "../components/profile/SimplePaper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfilePic from "../images/ProfilePic.png";
import Typography from "@mui/material/Typography";
import TabsIcon from "../components/profile/TabsIcon";
import TabsIconWithText from "../components/profile/TabsIconWithText";
import israel from "../images/israel.png";
import { useRecoilValue,useRecoilState } from "recoil";
import { _Vouchers,first_name,last_name, user_email, _User } from "../services/atom";

function Profile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = useRecoilState(_User);



  const voucherData = useRecoilValue(_Vouchers); // recoile testing voucher data

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
          <img src={israel} style={{ width: "20px" }} />
          {user.street}, {user.city}
        </Typography>
      </div>
      {isMobile ? <TabsIcon /> : <TabsIconWithText />}
    </div>
  );
}

export default Profile;
