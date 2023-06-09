import Navbar from "../components/Navbar";
import IconTabs from "../components/wallet/IconTabs";
import TabsBottomNav from "../components/TabsBottomNav";
import BasicSpeedDial from "../components/dashboard/BasicSpeedDial";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import {
  _Vouchers,
  first_name,
  last_name,
  user_email,
  _User,
} from "../services/atom";
function Wallet() {
  // const [userID, setUserId] = useState(1000);
  const [vouchers, setVouchers] = useRecoilState(_Vouchers);
  const [walletID, setWalletID] = useState();
  const [user, setUser] = useRecoilState(_User);
  const [user_id, setUserId] = useState();

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
        setUser(content);
        setUserId(content.id);
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
  return (
    <div>
      <Navbar />
      <IconTabs />
      <BasicSpeedDial userID={user_id} getWallet={getWallet} />
      <TabsBottomNav />
    </div>
  );
}

export default Wallet;
