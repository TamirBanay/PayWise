import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Badge from "@mui/joy/Badge";

export default function EllipsisList(props) {
  const amount = props.voucher.ammount.toString().split(".00");
  return (
    <Box sx={{ width: "87%", direction: "rtl", position: "static" }}>
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ "--ListItemDecorator-size": "56px" }}
      >
        <Avatar
          size="lg"
          sx={{
            position: "absolute",
            left: "97%",
            // mt: "1%",
            boxShadow: "0px 0px 3px 0px  ",
            "& .MuiAvatar-circular	": {},
          }}
          src={props.img}
        />

        <ListItem onClick={props.handleClick}>
          <ListItemContent>
            <Typography
              level="h6"
              sx={{ width: "50%", textAlign: "right", mr: "5%" }}
            >
              {" "}
              {props.voucher.storeName}
            </Typography>
            <Typography
              sx={{
                mr: "84.5%",
                mt: "-7%",
                textAlign: "left",
                width: "15%",
                "&.MuiTypography-h6	": {
                  // fontWeight: "bold",
                },
              }}
              level="h6"
              fontWeight="sm"
            >
              {" "}
              ₪{amount}
            </Typography>
            <Typography
              level="body2"
              sx={{
                mt: "0%",
                mb: "0%",
                mr: "5%",
                width: "40%",
                textAlign: "right",
              }}
            >
              {props.voucher.dateOfExpiry.slice(0, 10)}
            </Typography>
          </ListItemContent>
        </ListItem>
        <div style={{ paddingBottom: "3%" }}></div>
        <Divider sx={{ borderBottom: "0.5px solid black", right: "8%" }} />
      </List>
    </Box>
  );
}
