import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Voucher from "./Voucher";
import VoucherPage from "./VoucherPage";
export default function BasicPopover(props) {
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
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {props.voucher.redeemed ? (
        ""
      ) : (
        <div>
          <Voucher
            voucher={props.voucher}
            key={props.vID}
            vID={props.vID}
            openVoucher={props.openVoucher}
            handleClick={handleClick}
            open={open}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
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
            />
          </Popover>
        </div>
      )}
    </div>
  );
}
