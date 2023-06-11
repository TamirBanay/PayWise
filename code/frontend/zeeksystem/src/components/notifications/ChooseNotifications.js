import { useState } from "react";
import { Box, Typography, List, ListItem, Checkbox } from "@mui/material";
import { _Vouchers } from "../../services/atom";
import { useRecoilState } from "recoil";
import Divider from "@mui/joy/Divider";

function CheckboxGroup(props) {
  const [vouchers, setVouchers] = useRecoilState(_Vouchers);

  return (
    <Box sx={{ width: "90%" }}>
      {/* <Divider
        sx={{
          borderBottom: "0.5px solid black",
          height: 1,
          // left: "10%",
          width: "100%",
        }}
      /> */}
      <p></p>
      <Typography
        sx={{ direction: "rtl" }}
        id="sandwich-group"
        level="body2"
        fontWeight="lg"
        mb={1}
      >
        בחר מתי להתחיל לקבל התראות יומיות
      </Typography>
      <Box
        role="group"
        aria-labelledby="sandwich-group"
        sx={{ mr: "-9%", direction: "rtl" }}
      >
        <List size="sm">
          <ListItem sx={{ mt: -2 }}>
            <Checkbox
              label="חודש לפני"
              checked={props.selectedValue === "חודש לפני"}
              onChange={() => props.handleChange("חודש לפני")}
            />
            חודש לפני
          </ListItem>
          <ListItem sx={{ mt: -3 }}>
            <Checkbox
              label="שבוע לפני"
              checked={props.selectedValue === "שבוע לפני"}
              onChange={() => props.handleChange("שבוע לפני")}
            />
            שבוע לפני
          </ListItem>
          <ListItem sx={{ mt: -3 }}>
            <Checkbox
              label="יום לפני"
              checked={props.selectedValue === "יום לפני"}
              onChange={() => props.handleChange("יום לפני")}
            />
            יום לפני
          </ListItem>
          <ListItem sx={{ mt: -3 }}>
            <Checkbox
              label="ללא התראות"
              checked={props.selectedValue === "ללא התראות"}
              onChange={() => props.handleChange("ללא התראות")}
            />
            ללא התראות
          </ListItem>
        </List>
      </Box>

      {/* <Divider
        sx={{
          borderBottom: "0.5px solid black",
          height: 1,
          // left: "5%",
          // width: "100%",
        }}
      /> */}
      <p></p>
    </Box>
  );
}

export default CheckboxGroup;
