import * as React from "react";
import Popover from "@mui/material/Popover";
import VoucherPage from "./VoucherPage";
import { useLocation } from "react-router-dom";
import fashionDef from "../../images/fashion.jpg";
import retailDef from "../../images/retail.jpg";
import electronicsDef from "../../images/electronics.jpg";
import zara from "../../images/zara.png";
import fox from "../../images/fox.jpg";
import AmericanEagle from "../../images/AmericanEagle.png";
import bug from "../../images/bug.jpg";
import alam from "../../images/alam.jpg";
import ikea from "../../images/ikea.jpg";
import ace from "../../images/ACE.png";
import store from "../../images/store.jpg";
import { useEffect, useState } from "react";
import EllipsisList from "../dashboard/EllipsisList";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { _voucherIsOpen } from "../../services/atom";
import { useRecoilState } from "recoil";

export default function BasicPopover(props) {
  const location = useLocation();
  const { pathname } = location;
  const [voucherIsOpen, setVoucherIsOpen] = useRecoilState(_voucherIsOpen);

  const [anchorEl, setAnchorEl] = React.useState(false);

  const hendleDelete = async (event) => {
    event.preventDefault();
    await fetch(`api/deletVouchers/${props.vID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    props.getWallet();
    setVoucherIsOpen(!voucherIsOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setVoucherIsOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    props.getWallet();
    setVoucherIsOpen(false);
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
            onClick={props.handleCardVoucher}
            anchorEl={anchorEl}
            onClose={handleClose}
            PaperProps={{
              sx: { borderRadius: 5 }, // Apply the borderRadius style to the Paper component
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            style={{
              transform: "translateX(-9px)",
              // adjust this value to move the Popover more to the left
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
