import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover"; // Import Popover component
import Button from "@mui/material/Button"; // Import Button component
import { styled, alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem component

export default function FormPropsTextFields() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(true);

  // Function to handle opening the popover
  const handleOpenPopover = (event) => {
    setAnchorEl(!anchorEl);
  };

  // Function to handle closing the popover
  const handleClosePopover = () => {
    setAnchorEl(anchorEl);
  };

  // Function to handle menu item click
  const handleMenuItemClick = () => {
    handleClosePopover, handleOpenInsertManuallyScan;
  };

  // Determine if popover is open
  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      {/* Popover component */}
      <Popover
        sx={{ marginLeft: isMobile ? "30px" : "160px", marginTop: "40px" }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* Content of the popover */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            width: isMobile ? "250px" : "300px",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center content vertically
          }}
          noValidate
          autoComplete="on"
        >
          <div>
            <TextField required id="outlined-required" label="שם החנות" />
            <TextField required id="outlined-required" label="מחיר" />
            <TextField
              required
              id="outlined-required"
              label="תאריך תפוגה"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField required id="outlined-required" label="קוד קופון" />
          </div>
          <Button variant="contained" color="primary">
            שלח
          </Button>
        </Box>
      </Popover>
      {/* Menu item */}
      <MenuItem onClick={handleMenuItemClick}>הוספה ידנית</MenuItem>
    </React.Fragment>
  );
}
