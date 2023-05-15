import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ChartPie from "../components/dashboard/ChartPie";
import Divider from "@mui/material/Divider";
import EllipsisList from "../components/dashboard/EllipsisList";
import {
  _Vouchers,
  first_name,
  last_name,
  user_email,
  _User,
  _Redirect,
} from "../services/atom";
import { useRecoilState } from "recoil";
import Popover from "../components/dashboard/Popover";
import { useHistory } from "react-router-dom";

function Home(props) {
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
  const getWallet = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/getVouchers/${walletID}`
      );
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
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    setRedirect(true);
    history.push("/login");
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user", {
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

  return (
    <div>
      <Navbar logOut={logOut} userID={userID} getWallet={getWallet} />
      <ChartPie />
      <p></p>

      <div>
        <Divider orientation="horizontal" sx={{ marginRight: 5 }}>
          זיכויים קרובים
        </Divider>

        {/* <EllipsisList /> */}

        {onClickVoucher
          ? vouchers.length > 0 &&
            vouchers
              .filter(
                (voucher) => currentDate < new Date(voucher.fields.dateOfExpiry)
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
      </div>
    </div>
  );
}

export default Home;
