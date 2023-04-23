import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FlexRowRatio from "../components/dashboard/FlexRowRatio";
import ChartPie from "../components/dashboard/ChartPie";
import Divider from "@mui/material/Divider";
import Voucher from "../components/dashboard/Voucher";
// import { first_name } from "../services/AppStates";
import { useRecoilState } from "recoil";




function Home() {
  const [walletID, setWalletID] = useState();
  // const [name, setName] = useRecoilState(first_name);
  const [redirect, setRedirect] = useState(false);
  const [userID, setUserId] = useState(1000);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [vouchers, setVouchers] = useState([]);

 
  
  const getVoucher = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/getVouchers/${walletID}`
      );
      const data = await response.json();
      console.log(data);

      const vouchersArray = JSON.parse(data.vouchers);
      const matchingVouchers = vouchersArray.filter(
        (voucher) => voucher.fields.walletID === walletID
      );
      // console.log(walletID);
      // console.log(vouchersArray[0].fields.ammount); // an array of voucher objects in JSON format
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
  };

  useEffect(() => {
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
          // setName(content.first_name);
          console.log(content);
        } else {
          setRedirect(true);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (walletID) {
      // Only call getVoucher if walletID is truthy
      getVoucher();
    }
  }, [walletID]); // Add walletID as a dependency

  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Navbar logOut={logOut} userID={userID} />
      <ChartPie />
      <p></p>
      {isMobile ? (
        <div>
          <Divider orientation="horizontal">זיכויים קרובים</Divider>

          <p></p>

          {vouchers.length > 0 &&
            vouchers.map((voucher) => (
              <Voucher voucher={voucher.fields} key={voucher.pk} vID={voucher.pk} />
            ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
