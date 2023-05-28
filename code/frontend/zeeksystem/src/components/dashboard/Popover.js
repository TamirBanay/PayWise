import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Voucher from "./Voucher";
import VoucherPage from "./VoucherPage";
import { useLocation } from "react-router-dom";
import fashionDef from "../../images/fashion.jpg";
import retailDef from "../../images/retail.jpg";
import electronicsDef from "../../images/electronics.jpg";
import zara from "../../images/zara.png";
import fox from "../../images/fox.jpg";
import AmericanEagle from "../../images/AmericanEagle.jpg";
import bug from "../../images/bug.jpg";
import alam from "../../images/alam.jpg";
import ikea from "../../images/ikea.jpg";
import ace from "../../images/ACE.jpg";
import store from "../../images/store.jpg";
import { useEffect, useState } from "react";
import EllipsisList from "../dashboard/EllipsisList";
import NotificationsIcon from "@mui/icons-material/Notifications";
export default function BasicPopover(props) {
  const location = useLocation();
  const { pathname } = location;

  const [anchorEl, setAnchorEl] = React.useState(false);

  const hendleDelete = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:8000/api/deletVouchers/${props.vID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    props.getWallet();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    props.getWallet();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [img, setImg] = useState();
  const setImgToVOucher = () => {
    const name = props.voucher.storeName;
    const type = props.voucher.storeType;
    if (type == "אופנה")
      if (name == "FOX") setImg(fox);
      else if (name == "ZARA") setImg(zara);
      else if (name == "American Eagle") setImg(AmericanEagle);
      else setImg(fashionDef);
    else if (type == "אלקטרוניקה")
      if (name == "BUG") setImg(bug);
      else if (name == "א.ל.מ") setImg(alam);
      else setImg(electronicsDef);
    else if (type == "קמעונאות")
      if (name == "IKEA") setImg(ikea);
      else if (name == "ACE") setImg(ace);
      else setImg(retailDef);
    else setImg(store);
  };

  useEffect(() => {
    setImgToVOucher();
  }, []);

  return (
    <div>
      {props.voucher.redeemed && location.pathname == "/" ? (
        ""
      ) : (
        <div>
          <EllipsisList
            voucher={props.voucher}
            key={props.vID}
            vID={props.vID}
            openVoucher={props.openVoucher}
            handleClick={handleClick}
            open={open}
            img={img}
          />

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            style={{
              transform: "translateX(-9px)", // adjust this value to move the Popover more to the left
            }}
          >
            <VoucherPage
              voucher={props.voucher}
              key={props.vID}
              vID={props.vID}
              handleClick={handleClick}
              open={open}
              delete={hendleDelete}
              getWallet={props.getWallet}
              img={img}
            />
          </Popover>
        </div>
      )}
    </div>
  );
}
