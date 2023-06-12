import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ScanVoucher from "../../pages/ScanVoucher";
import InsertSirialNumber from "../scans/InsertSirialNumber";
import Popover from "@mui/material/Popover";

export default function BasicSpeedDial(props) {
  const [openInsertSerialNumber, setOpenInsertSerialNumber] =
    React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOpenScan = () => {
    window.location.href = "/#/ScanVoucher";
  };
  const actions = [
    {
      icon: <QrCodeScannerOutlinedIcon onClick={handleOpenScan} />,
      name: "scan",
    },
    {
      icon: <CreateOutlinedIcon onClick={handleClick} />,
      name: "menually",
    },
  ];

  return (
    <Box
      sx={{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: props.walletLength <= 0 ? "25%" : "-4%",
        left: props.walletLength <= 0 ? "40%" : "4%",
      }}
    >
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ ml: props.walletLength <= 0 ? "-13%" : "10%", width: "100%" }}
      >
        <InsertSirialNumber
          userID={props.userID}
          handleClose={handleClose}
          getWallet={props.getWallet}
        />
      </Popover>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={<SpeedDialIcon />}
        direction={props.walletLength <= 0 ? "down" : "up"}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
        {openInsertSerialNumber ? (
          <Popover id={id} open={open} anchorEl={anchorEl}>
            <InsertSirialNumber
              userID={props.userID}
              handleClose={handleClose}
              getWallet={props.getWallet}
            />
          </Popover>
        ) : (
          ""
        )}
      </SpeedDial>
    </Box>
  );
}
