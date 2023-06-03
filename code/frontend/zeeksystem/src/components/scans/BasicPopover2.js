import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HelperTextAligned from "./HelperTextAligned";
import InsertSirialNumber from "./InsertSirialNumber";
import { useEffect, useState } from "react";
import { _Vouchers, _User, _addVoucherSucceeded } from "../../services/atom";
import { useRecoilState } from "recoil";

export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    props.handleAddRefundMenuClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="text" onClick={handleClick}>
        <Typography color="black" sx={{ ml: "20%" }}>
          הוספה ידנית
        </Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ ml: "-10", width: "100%" }}
      >
        <InsertSirialNumber
          userID={props.userID}
          handleClose={handleClose}
          getWallet={props.getWallet}
        />
      </Popover>
    </div>
  );
}
