import Navbar from "../components/Navbar";
import TabsVouchers from "../components/wallet/TabsVouchers";
import IconTabs from "../components/wallet/IconTabs";
import TabsBottomNav from "../components/TabsBottomNav";
function Wallet() {
  return (
    <div>
      <Navbar />
      {/* <TabsVouchers /> */}
      <IconTabs />
      <TabsBottomNav />
    </div>
  );
}

export default Wallet;
