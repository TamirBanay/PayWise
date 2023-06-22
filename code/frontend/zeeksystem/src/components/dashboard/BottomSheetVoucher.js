import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
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
import Grid from "@mui/material/Grid";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function BottomSheetVoucher(props) {
  const location = useLocation();
  const { pathname } = location;
  const [voucherIsOpen, setVoucherIsOpen] = useRecoilState(_voucherIsOpen);
  const [anchorEl, setAnchorEl] = React.useState(false);
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setVoucherIsOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    props.getWallet();
    setVoucherIsOpen(false);
  };
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

  const hendleDelete = async (event) => {
    event.preventDefault();
    await fetch(`api/deletVouchers/${props.vID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    props.getWallet();
    setVoucherIsOpen(!voucherIsOpen);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    
    <Root>
      {/* <CssBaseline /> */}
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          },
        }}
      />
      <Box
        sx={{ textAlign: "center", pt: 1, backgroundColor: "#fff" }}
        onClick={toggleDrawer(true)}
      >
        <EllipsisList
          voucher={props.voucher}
          key={props.vID}
          vID={props.vID}
          openVoucher={props.openVoucher}
          handleClick={handleClick}
          open={open}
          img={img}
        />
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {/* <StyledBox
          sx={{
            position: "absolute",
            // top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            51 results
          </Typography>
        </StyledBox> */}
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
            // bgcolor: "#000",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <Puller />
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
          {/* <Skeleton variant="rectangular" height="100%" /> */}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

BottomSheetVoucher.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default BottomSheetVoucher;
