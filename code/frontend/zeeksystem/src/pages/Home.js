import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ChartPie from "../components/dashboard/ChartPie";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  _Vouchers,
  first_name,
  last_name,
  user_email,
  _User,
  _Redirect,
  _addMenu,
} from "../services/atom";
import { useRecoilState } from "recoil";
import Popover from "../components/dashboard/Popover";
import { useHistory } from "react-router-dom";
import payWiseLogo from "../images/payWiseLogo.png";
import Typography from "@mui/joy/Typography";
import TabsBottomNav from "../components/TabsBottomNav";
import BasicSpeedDial from "../components/dashboard/BasicSpeedDial";
function Home(props) {
  const [anchorAddRedundMenu, setAnchorAddRedundMenu] =
    useRecoilState(_addMenu);
  const [firstName, setFirstName] = useRecoilState(first_name);
  const [lastName, setLastName] = useRecoilState(last_name);
  const [usrEmail, setUsrEmail] = useRecoilState(user_email);
  const [user, setUser] = useRecoilState(_User);
  const history = useHistory();
  const [redirect, setRedirect] = useRecoilState(_Redirect);
  const [userID, setUserId] = useState(1000);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [vouchers, setVouchers] = useRecoilState(_Vouchers);
  const [walletID, setWalletID] = useState();

  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() - 1);
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
  const logOut = async () => {
    await fetch("api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    setRedirect(true);
    history.push("/login");
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const content = await response.json();

        setUserId(content.id);
        setWalletID(content.id + 1000); // Update walletID based on fetched user data
        setUser(content);
        setFirstName(content.first_name);
        setLastName(content.last_name);
        setUsrEmail(content.email);
        const jwtCookie = document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("jwt="));
        // console.log(jwtCookie);
      } else {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (walletID) {
      // Only call getVoucher if walletID is truthy
      getWallet();
    }
  }, [walletID]); // Add walletID as a dependency
  if (redirect) {
    return <Redirect to="/login" />;
  }
  const [onClickVoucher, setOnClickVoucher] = useState(true);
  const handleOpenVoucher = () => {
    setOnClickVoucher(!onClickVoucher);
  };

  const walletLength = vouchers.filter(
    (voucher) =>
      currentDate < new Date(voucher.fields.dateOfExpiry) &&
      voucher.fields.redeemed == false
  ).length;

  return (
    <div>
      <Navbar
        logOut={logOut}
        walletLength={walletLength}
        userID={userID}
        getWallet={getWallet}
      />
      {walletLength <= 0 ? (
        <div>
          <img
            src={payWiseLogo}
            style={{ width: "80%", marginLeft: "10%", marginTop: "20%" }}
          />
          <Typography sx={{ ml: "15%", mt: "10% " }} level="h5" mb={2}>
            <AddRoundedIcon color="primary" fontSize="large" />
            כדי להוסיף זיכוי לחץ על{" "}
          </Typography>
        </div>
      ) : (
        <div>
          {" "}
          <ChartPie />
          <p></p>
          <div>
            <Divider sx={{ borderBottom: "1.5px solid black" }} />
            {/* <br /> */}

            {onClickVoucher
              ? vouchers.length > 0 &&
                vouchers
                  .filter(
                    (voucher) =>
                      currentDate < new Date(voucher.fields.dateOfExpiry)
                  )
                  .map((voucher) => (
                    <Popover
                      voucher={voucher.fields}
                      key={voucher.pk}
                      vID={voucher.pk}
                      openVoucher={handleOpenVoucher}
                      getWallet={getWallet}
                    />
                  ))
              : ""}
          </div>{" "}
        </div>
      )}
      <BasicSpeedDial userID={userID} getWallet={getWallet} />
      <div style={{ paddingBottom: "0.5%" }}>
        <TabsBottomNav />
      </div>
    </div>
  );
}

export default Home;
