import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CreateIcon from "@mui/icons-material/Create";
const actions = [
  { icon: <CreateIcon />, name: "menually" },
  { icon: <QrCodeScannerIcon />, name: "scan" },
];

export default function plusButton() {
  return (
    <Box
      sx={{
        height: 50,
        transform: "translateZ(0px)",
        flexGrow: 1,
        mr: "45%",
        mt: "45%",
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
